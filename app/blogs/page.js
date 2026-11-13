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
  const [ascending, setAscending] = useState(false);
  const [itemsDisplayed, setItemsDisplayed] = useState(20);
  //pageLinkListに渡す用
  const condition = {
    currentView: currentView,
    sort: sort,
    searchWord: searchWord,
    itemsDisplayed: itemsDisplayed,
    ascending: ascending,
  };
  //ページの情報を記録し格納、後でconditonと比較する用のstate（初期のページ番号は1）
  const [pageInfo, setPageInfo] = useState({ key: condition, pageNum: 1 });

  //子に渡す用のsessionStorageセッター
  function sessionSetter({
    currentView,
    sort,
    searchWord,
    pageNum,
    itemsDisplayed,
    ascending,
  }) {
    const params = {
      currentView,
      sort,
      searchWord,
      pageNum,
      itemsDisplayed,
      ascending,
    };
    const paramsArray = Object.entries(params);
    paramsArray.forEach(([key, value]) => {
      if (value !== undefined) {
        sessionStorage.setItem(`${key}Session`, JSON.stringify(value));
      }
    });
  }

  //復元終了までページ取得を待たせる
  const [isRestored, setIsRestored] = useState(false);

  //履歴を復元するためのuseEffect
  useEffect(() => {
    const getSessions = () => {
      setCurrentView(
        JSON.parse(sessionStorage.getItem("currentViewSession")) ?? "articles",
      );
      setSort(JSON.parse(sessionStorage.getItem("sortSession")) ?? "created");
      setSearchWord(
        JSON.parse(sessionStorage.getItem("searchWordSession")) ?? "",
      );
      setItemsDisplayed(
        JSON.parse(sessionStorage.getItem("itemsDisplayedSession")) ?? 20,
      );
      setAscending(
        JSON.parse(sessionStorage.getItem("ascendingSession")) ?? false,
      );
      setPageInfo({
        key: condition,
        pageNum: JSON.parse(sessionStorage.getItem("pageNumSession")) ?? 1,
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
          sessionSetter={sessionSetter}
          isRestored={isRestored}
        />
        <div>
          <ViewMenu
            currentView={currentView}
            sort={sort}
            setCurrentView={setCurrentView}
            setSort={setSort}
            sessionSetter={sessionSetter}
            ascending={ascending}
            setAscending={setAscending}
            itemsDisplayed={itemsDisplayed}
            setItemsDisplayed={setItemsDisplayed}
            isRestored={isRestored}
          />
          <BlogLinkList
            condition={condition}
            isRestored={isRestored}
            pageInfo={pageInfo}
            sessionSetter={sessionSetter}
          />
        </div>
      </Base>
    </>
  );
}
