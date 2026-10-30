"use client";
import { Base } from "@/components/ui/Base";
import SearchMenu from "./components/SearchMenu";
import BlogLinkList from "./components/BlogLinkList";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "../hooks/useUser";
import BlogLinkListLoading from "./components/BlogLinkListLoading";

export default function Blogs() {
  const [currentView, setCurrentView] = useState("articles");
  const [pageList, setPageList] = useState([]);
  //並べ替え・検索ワードを親が持ち、子にセッターを渡す
  const [sort, setSort] = useState("created");
  const [searchWord, setSearchWord] = useState("");
  //ロード画面
  const [isLoading, setIsLoading] = useState(true);

  //supabaseでの取得・並べ替え・検索処理
  useEffect(() => {
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
  }, [currentView, sort, searchWord]);

  const isLogin = useUser();

  const ViewTabs =
    currentView === "articles" ? (
      <>
        <span className="bg-sky-300 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0">
          記事
        </span>
        <span
          className="bg-sky-200 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0 cursor-pointer hover:bg-sky-300"
          onClick={() => {
            //並び順を強制的に「閲覧日時」に
            setSort("viewed");
            setCurrentView("history");
          }}
        >
          履歴
        </span>
      </>
    ) : (
      <>
        <span
          className="bg-sky-200 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0 cursor-pointer hover:bg-sky-300"
          onClick={() => {
            //並び順が「閲覧日時」のとき、「作成日時」に変える
            if (sort === "viewed") {
              setSort("created");
            }
            setCurrentView("articles");
          }}
        >
          記事
        </span>
        <span className="bg-sky-300 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0">
          履歴
        </span>
      </>
    );

  return (
    <>
      <Base>
        <SearchMenu
          sort={sort}
          setSort={setSort}
          setSearchWord={setSearchWord}
          isLogin={isLogin}
          currentView={currentView}
        />
        <div>
          <div className="pl-4 flex gap-1 relative z-0">{ViewTabs}</div>
          {isLoading ? (
            <BlogLinkListLoading />
          ) : (
            <BlogLinkList pageList={pageList} />
          )}
        </div>
      </Base>
    </>
  );
}
