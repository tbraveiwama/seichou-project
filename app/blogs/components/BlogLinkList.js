"use client";
import Link from "next/link";
import TitleCard from "./TitleCard";
import { useState, useEffect } from "react";
import { toDate } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import TitleCardLoading from "./TitleCardLoading";

//supabaseで取得し、ページネーションして返す
export default function BlogLinkList({
  condition,
  isRestored,
  pageInfo,
  sessionSetter,
}) {
  //コンポーネント関数の実行中に、親を再レンダリングしてしまうとエラーが出るのでセッターは受け取らない
  //localPageInfoは、ページの情報を記録し格納、後でconditonと比較する用のstate（初期のページ番号は1）
  const [localPageInfo, setLocalPageInfo] = useState(pageInfo);
  //となると、復元用のeffectを作り、復元した後でデータを取得する必要がある(二重送信対策)
  const [localIsRestored, setLocalIsRestored] = useState(false);
  //conditonから分割代入
  const { currentView, sort, searchWord, itemsDisplayed, ascending } =
    condition;
  //可読性
  const pageNum = localPageInfo.pageNum;
  //保守性意識 キーを文字列化して一括比較
  const conditionKey = JSON.stringify(condition);
  //conditionの中身が変わったことを検知し、新しい条件・1ページ目に書き換える
  //コンポーネント関数の実行中にstateが置き換わったら、レンダリングを捨てて(returnが描画されない)もう一度再レンダリングが走る仕様
  //useEffectも、DOM反映後に実行されるものなので、レンダリングが捨てられた場合は実行されないので二重取得もしない
  if (conditionKey !== localPageInfo.key) {
    setLocalPageInfo({ key: conditionKey, pageNum: 1 });
  }

  //復元用
  useEffect(() => {
    if (isRestored) {
      //親コンポーネントで、pageInfo.pageNumはsessionStorageからとってきたが、keyは取ってきていないのでconditionを入れる
      setLocalPageInfo({ key: conditionKey, pageNum: pageInfo.pageNum });
      setLocalIsRestored(true);
    }
  }, [isRestored]);

  const [pageList, setPageList] = useState([]);
  //ロード画面
  const [isLoading, setIsLoading] = useState(true);
  //ページャーロード画面
  const [isCountLoading, setIsCountLoading] = useState(true);

  //ページ数
  const [maxPage, setMaxPage] = useState(1);

  //表示件数
  const perPage = itemsDisplayed;

  //ページャー用
  useEffect(() => {
    if (!localIsRestored) return;
    let ignore = false;
    //最大ページ数のみを非同期的に取得する
    const fetchMaxPage = async () => {
      setIsCountLoading(true);
      let queryCounter = supabase
        .from("pages")
        .select("page_id", { count: "exact" });
      const searchWordArray = searchWord.split(/\s+/).filter(Boolean);
      //searchWordがあるとき
      if (searchWord !== "") {
        searchWordArray.forEach((word) => {
          //検索ワードで絞り込み
          queryCounter = queryCounter.ilike("title", `%${word}%`);
        });
      }
      if (currentView === "history") {
        const historyArray = JSON.parse(localStorage.getItem("history")) ?? [];
        //履歴が空なら終了
        if (historyArray.length === 0) {
          setMaxPage(1);
          setIsCountLoading(false);
          return;
        }
        //pageIdだけ取り出し
        const historyIdArray = historyArray.map((history) => {
          return history.pageId;
        });
        //履歴で絞り込み
        queryCounter = queryCounter.in("page_id", historyIdArray);
      }
      const { count, error } = await queryCounter;
      //データ取得時に次のuseEffectが走っていれば、state更新は行わない
      if (ignore) return;
      if (error) {
        console.log("error:", error);
        setIsCountLoading(false);
        return;
      }
      if (count === 0) {
        setMaxPage(1);
      } else {
        setMaxPage(Math.ceil(count / perPage));
      }
      setIsCountLoading(false);
    };
    fetchMaxPage();

    return () => {
      //コールバック(次のuseEffectの実行の直前)時に実行する関数
      ignore = true;
    };
  }, [currentView, searchWord, localIsRestored, itemsDisplayed]);

  //supabaseでの取得・並べ替え・検索処理
  useEffect(() => {
    //復元完了するまでは何もしない
    if (!localIsRestored) {
      return;
    }
    let ignore = false;
    //検索ボックス内の言葉を配列化
    //[/\s+]は、一つ以上の空白を全角・半角問わずまとめて一つの空白として扱う
    const searchWordArray = searchWord.split(/\s+/).filter(Boolean);
    let query = supabase
      .from("pages")
      .select("page_id,title,created,views,updated");
    //searchWordがあるとき
    if (searchWord !== "") {
      searchWordArray.forEach((word) => {
        //検索ワードで絞り込み
        query = query.ilike("title", `%${word}%`);
      });
    }

    const fetchPageList = async () => {
      //ソート(閲覧日時はsupabaseの管理外な関係上、こちらで行う)
      query = query
        .order(sort, { ascending: ascending })
        .order("page_id", { ascending: ascending })
        .range((pageNum - 1) * perPage, pageNum * perPage - 1);
      //ロード画面
      setIsLoading(true);
      //データ取得
      const { data, error } = await query;
      if (ignore) return;
      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      //state更新
      setPageList(data ?? []);
      //ロード画面終了
      setIsLoading(false);
    };

    const fetchHistoryList = async () => {
      setIsLoading(true);
      const historyArray = JSON.parse(localStorage.getItem("history")) ?? [];
      //履歴が空なら終了
      if (historyArray.length === 0) {
        setPageList([]);
        setIsLoading(false);
        return;
      }

      //pageIdだけ取り出し
      const historyIdArray = historyArray.map((history) => {
        return history.pageId;
      });

      //履歴で絞り込み
      query = query.in("page_id", historyIdArray);
      if (sort === "viewed") {
        //pageListの各オブジェクトにviewedというプロパティを追加するための処理
        //LocalStorageの配列をpage_idがキー、viewedが値のMapで保存
        const viewedMap = new Map(
          historyArray.map((h) => [String(h.pageId), h.viewed]),
        );
        //オブジェクトの配列を受け取り、各オブジェクトに新しくviewedという項目を追加する
        //受け取ったオブジェクトの配列のオブジェクトごとのpage_idが、LocalStorageのpageIdに対応するLocalStorageのviewedを追加する
        const withViewed = (rows) =>
          rows.map((row) => ({
            ...row,
            viewed: viewedMap.get(String(row.page_id)),
          }));

        //viewedはsupabase管理外の都合上、一旦全件取得してからフィルター
        const { data, error } = await query;
        if (ignore) return;
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }
        //supabaseが履歴順にソートしてくれないので
        const map = new Map(
          (data ?? []).map((row) => {
            return [String(row.page_id), row];
          }),
        );
        const sorted = historyIdArray
          .map((id) => map.get(String(id)))
          .filter(Boolean);
        if (ascending) {
          sorted.reverse();
        }
        const filtered = sorted.slice(
          (pageNum - 1) * perPage,
          pageNum * perPage,
        );
        setPageList(withViewed(filtered));
        setIsLoading(false);
      } else {
        //閲覧日時はsupabaseの管理外なので、こちらで行う
        query = query
          .order(sort, { ascending: ascending })
          .order("page_id", { ascending: ascending })
          .range((pageNum - 1) * perPage, pageNum * perPage - 1);
        const { data, error } = await query;
        if (ignore) return;
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }
        setPageList(data ?? []);
        setIsLoading(false);
      }
    };

    switch (currentView) {
      case "articles":
        fetchPageList();
        break;
      case "history":
        fetchHistoryList();
    }
    sessionSetter({ pageNum: localPageInfo.pageNum });

    return () => {
      ignore = true;
    };
  }, [
    currentView,
    sort,
    searchWord,
    localIsRestored,
    pageNum,
    itemsDisplayed,
    ascending,
  ]);

  //加工
  let cardList;
  if (isLoading) {
    cardList = (
      <>
        <TitleCardLoading />
        <TitleCardLoading />
        <TitleCardLoading />
        <TitleCardLoading />
      </>
    );
  } else {
    if (sort === "viewed") {
      cardList = pageList.map((e) => {
        return (
          <Link href={`/blogs/${e.page_id}`} key={e.page_id}>
            <TitleCard
              title={e.title}
              views={e.views}
              viewed={e.viewed}
            ></TitleCard>
          </Link>
        );
      });
    } else {
      cardList = pageList.map((e) => {
        //TimeStampを年月日に加工
        const created = toDate(e.created);
        const updated = toDate(e.updated);
        return (
          <Link href={`/blogs/${e.page_id}`} key={e.page_id}>
            <TitleCard
              date={created}
              title={e.title}
              views={e.views}
              updated={updated}
            ></TitleCard>
          </Link>
        );
      });
    }
  }

  const pager = isCountLoading ? (
    <>
      <button
        type="button"
        className="bg-gray-50 py-1 px-2 text-gray-200 border border-gray-500 text-lg shrink-0 animate-pulse cursor-wait"
      >
        ＜
      </button>
      <span className="bg-gray-50 py-1 px-6 text-gray-200 border border-gray-500 text-lg shrink-0 animate-pulse">
        ■■／■■
      </span>
      <button
        type="button"
        className="bg-gray-50 py-1 px-2 text-gray-200 border border-gray-500 text-lg shrink-0 animate-pulse cursor-wait"
      >
        ＞
      </button>
    </>
  ) : (
    <>
      {pageNum > 1 && (
        <button
          type="button"
          className="bg-gray-50 py-1 px-2 text-gray-500 border border-gray-500 text-lg shrink-0 cursor-pointer"
          onClick={prevPage}
        >
          ＜
        </button>
      )}
      <span className="bg-gray-50 py-1 px-6 text-gray-500 border border-gray-500 text-lg shrink-0">
        {pageNum}／{maxPage}
      </span>
      {pageNum < maxPage && (
        <button
          type="button"
          className="bg-gray-50 py-1 px-2 text-gray-500 border border-gray-500 text-lg shrink-0 cursor-pointer"
          onClick={nextPage}
        >
          ＞
        </button>
      )}
    </>
  );

  function nextPage() {
    setLocalPageInfo({ key: conditionKey, pageNum: pageNum + 1 });
  }

  function prevPage() {
    setLocalPageInfo({ key: conditionKey, pageNum: pageNum - 1 });
  }

  return (
    <>
      <div className="bg-gray-200 rounded-t-xl p-2 lg:p-4 relative z-1 flex flex-col gap-4 lg:gap-6 overflow-y-scroll overflow-x-hidden w-full h-[300px] lg:h-[600px]">
        {cardList}
      </div>
      <div className="bg-gray-200 rounded-b-xl py-3 z-1 gap-6 w-full h-16">
        <div className="flex flex-col items-center">
          <div className="flex gap-2">{pager}</div>
        </div>
      </div>
    </>
  );
}
