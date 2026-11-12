"use client";
import { Base } from "@/components/ui/Base";
import SearchMenu from "./components/SearchMenu";
import BlogLinkList from "./components/BlogLinkList";
import { useState, useEffect } from "react";
import { useUser } from "../hooks/useUser";
import ViewMenu from "./components/ViewMenu";

export default function Blogs() {
  //画面・並べ替え・検索ワードを親が持ち、子にセッターを渡す
  const [currentView, setCurrentView] = useState("articles");
  const [sort, setSort] = useState("created");
  const [searchWord, setSearchWord] = useState("");
  //並び順・表示件数も管理
  const [ascending,setAscending] = useState(false);
  const [itemsDisplayed,setItemsDisplayed] = useState(20);
  //pageLinkListに渡す用
  const condition = {
    currentView: currentView,
    sort: sort,
    searchWord: searchWord,
  };
  //ページの情報を記録し格納、後でconditonと比較する用のstate（初期のページ番号は1）
  const [pageInfo, setPageInfo] = useState({ key: condition, pageNum: 1 });

  //子に渡す用のsessionStorageセッター
  function currentViewSessionSetter(value) {
    sessionStorage.setItem("currentViewSession", value);
  }
  function sortSessionSetter(value) {
    sessionStorage.setItem("sortSession", value);
  }
  function searchWordSessionSetter(value) {
    sessionStorage.setItem("searchWordSession", value);
  }
  function pageNumSessionSetter(value) {
    sessionStorage.setItem("pageNumSession", value);
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
      setPageInfo({
        key: condition,
        pageNum: Number(sessionStorage.getItem("pageNumSession") ?? 1),
      });
      setIsRestored(true);
    };
    getSessions();
  }, []);

  const isLogin = useUser();

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
          <ViewMenu
            currentView={currentView}
            sort={sort}
            setCurrentView={setCurrentView}
            setSort={setSort}
            sortSessionSetter={sortSessionSetter}
            currentViewSessionSetter={currentViewSessionSetter}
            ascending={ascending}
            itemsDisplayed={itemsDisplayed}
          />
          <BlogLinkList
            condition={condition}
            isRestored={isRestored}
            pageInfo={pageInfo}
            pageNumSessionSetter={pageNumSessionSetter}
          />
        </div>
      </Base>
    </>
  );
}
