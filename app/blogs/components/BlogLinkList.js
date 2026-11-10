"use client";
import Link from "next/link";
import TitleCard from "./TitleCard";
import { useState, useEffect } from "react";
import { toDate } from "@/lib/utils";
import BlogLinkListLoading from "./BlogLinkListLoading";
import { supabase } from "@/lib/supabase";

//supabaseで取得し、ページネーションして返す
export default function BlogLinkList({
  currentView,
  sort,
  searchWord,
  isRestored,
}) {
  const [pageList, setPageList] = useState([]);
  //ロード画面
  const [isLoading, setIsLoading] = useState(true);
  //ページ番号管理
  const [pageNum, setPageNum] = useState(1);

  //supabaseでの取得・並べ替え・検索処理
  useEffect(() => {
    //復元完了するまでは何もしない
    if (!isRestored) {
      return;
    }
    //検索ボックス内の言葉を配列化
    //[/\s+]は、一つ以上の空白を全角・半角問わずまとめて一つの空白として扱う
    const searchWordArray = searchWord.split(/\s+/).filter(Boolean);
    let query = supabase.from("pages").select("page_id,title,created,views");
    //searchWordがあるとき
    if (searchWord !== "") {
      searchWordArray.forEach((word) => {
        query = query.ilike("title", `%${word}%`);
      });
    }

    const fetchPageList = async () => {
      //ページ番号リセット
      setPageNum(1);
      //ロード画面
      setIsLoading(true);
      query = query.order(sort, { ascending: false });
      //データ取得
      const { data, error } = await query;
      if (error) console.error(error);
      //state更新
      setPageList(data ?? []);
      //ロード画面終了
      setIsLoading(false);
    };

    const fetchHistoryList = async () => {
      //ページ番号リセット
      setPageNum(1);
      setIsLoading(true);
      const historyArray = JSON.parse(localStorage.getItem("history")) ?? [];
      //履歴が空なら終了
      if (historyArray.length === 0) {
        setPageList([]);
        setIsLoading(false);
        return;
      }

      query = query.in("page_id", historyArray);
      if (sort === "viewed") {
        const { data, error } = await query;
        if (error) console.error(error);
        //supabaseが履歴順にソートしてくれないので
        const map = new Map(
          (data ?? []).map((row) => {
            return [String(row.page_id), row];
          }),
        );
        const sorted = historyArray
          .map((id) => map.get(String(id)))
          .filter(Boolean);
        setPageList(sorted);
        setIsLoading(false);
      } else {
        query = query.order(sort, { ascending: false });
        const { data, error } = await query;
        if (error) console.error(error);
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
  }, [currentView, sort, searchWord, isRestored]);

  //表示件数
  const perPage = 20;
  //ページ数
  let maxPage;
  if (pageList.length % perPage === 0) {
    maxPage = Math.trunc(pageList.length / perPage);
  } else {
    maxPage = Math.trunc(pageList.length / perPage) + 1;
  }

  //加工
  const cardList = pageList.map((e, index) => {
    //TimeStampを年月日に加工
    const created = toDate(e.created);
    //表示対象に該当するオブジェクトのみ格納
    if (index < pageNum * perPage && index >= (pageNum - 1) * perPage) {
      return (
        <Link href={`/blogs/${e.page_id}`} key={index}>
          <TitleCard date={created} title={e.title} views={e.views}></TitleCard>
        </Link>
      );
    } else {
      return null;
    }
  });

  function nextPage() {
    setPageNum(pageNum + 1);
  }

  function prevPage() {
    setPageNum(pageNum - 1);
  }

  if (isLoading) {
    return <BlogLinkListLoading />;
  } else {
    return (
      <>
        <div className="bg-gray-200 rounded-t-xl px-4 py-4 relative z-1 flex flex-col gap-6 overflow-y-scroll w-full h-[520px] lg:h-[600px]">
          {cardList}
        </div>
        <div className="bg-gray-200 rounded-b-xl py-3 z-1 gap-6 w-full h-16">
          <div className="flex flex-col items-center">
            <div className="flex gap-2">
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
            </div>
          </div>
        </div>
      </>
    );
  }
}
