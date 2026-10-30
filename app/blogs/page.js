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
  const [sort, setSort] = useState("date");
  const [searchWord, setSearchWord] = useState("");
  //ロード画面
  const [isLoading, setIsLoading] = useState(true);

  //supabaseでの取得・並べ替え・検索処理
  useEffect(() => {
    const fetchPageList = async () => {
      const { data, error } = await supabase.from("pages").select("*");
      setPageList(data);
      setIsLoading(false);
    };
    fetchPageList();
    console.log("並び順:", sort);
    console.log("検索ワード:", searchWord);
    //履歴を選択したとき
    if (currentView === "history") {
      console.log("履歴:", JSON.parse(localStorage.getItem("history")));
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
          onClick={() => setCurrentView("history")}
        >
          履歴
        </span>
      </>
    ) : (
      <>
        <span
          className="bg-sky-200 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0 cursor-pointer hover:bg-sky-300"
          onClick={() => setCurrentView("articles")}
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
