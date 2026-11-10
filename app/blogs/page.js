"use client";
import { Base } from "@/components/ui/Base";
import SearchMenu from "./components/SearchMenu";
import BlogLinkList from "./components/BlogLinkList";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";

export default function Blogs() {
  const [currentView, setCurrentView] = useState("articles");
  //並べ替え・検索ワードを親が持ち、子にセッターを渡す
  const [sort, setSort] = useState("created");
  const [searchWord, setSearchWord] = useState("");
  //子に渡す用のsessionStorageセッター
  function sortSessionSetter(value) {
    sessionStorage.setItem("sortSession", value);
  }
  function searchWordSessionSetter(value) {
    sessionStorage.setItem("searchWordSession", value);
  }
  //復元終了までページ取得を待たせる
  const [isRestored, setIsRestored] = useState(false);

  //履歴を復元するためのuseEffect
  useEffect(() => {
    const getSessions = () => {
      setCurrentView(
        sessionStorage.getItem("currentViewSession") ?? "articles",
      );
      setSort(sessionStorage.getItem("sortSession") ?? "created");
      setSearchWord(sessionStorage.getItem("searchWordSession") ?? "");
      setIsRestored(true);
    };
    getSessions();
  }, []);

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
            //sessionStorageに入れる
            sessionStorage.setItem("currentViewSession", "history");
            sortSessionSetter("viewed");
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
              //sessionStorageに入れる
              sortSessionSetter("created");
            }
            setCurrentView("articles");
            //sessionStorageに入れる
            sessionStorage.setItem("currentViewSession", "articles");
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
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          isLogin={isLogin}
          currentView={currentView}
          sortSessionSetter={sortSessionSetter}
          searchWordSessionSetter={searchWordSessionSetter}
          isRestored={isRestored}
        />
        <div>
          <div className="pl-4 flex gap-1 relative z-0">{ViewTabs}</div>
          <BlogLinkList
            currentView={currentView}
            sort={sort}
            searchWord={searchWord}
            isRestored={isRestored}
          />
        </div>
      </Base>
    </>
  );
}
