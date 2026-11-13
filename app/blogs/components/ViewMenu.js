"use client";

import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useRef } from "react";

export default function ViewMenu({
  currentView,
  sort,
  setCurrentView,
  setSort,
  sessionSetter,
  ascending,
  setAscending,
  itemsDisplayed,
  setItemsDisplayed,
  isRestored,
}) {
  const itemsDisplayedRef = useRef();
  useEffect(() => {
    if (isRestored) {
      //onChangeは発火しない
      itemsDisplayedRef.current.value = itemsDisplayed;
    }
  }, [isRestored]);

  //表示件数変更
  function changeItemsDisplayed() {
    if (itemsDisplayedRef.current.value === "") {
      return;
    } else if (itemsDisplayedRef.current.value <= 0) {
      itemsDisplayedRef.current.value = 1;
    }
    setItemsDisplayed(itemsDisplayedRef.current.value);
    sessionSetter({ itemsDisplayed: itemsDisplayedRef.current.value });
  }

  //並び順変更
  function changeOrder(value) {
    const isAscending = value === "ascending" ? true : false;
    setAscending(isAscending);
    sessionSetter({ ascending: isAscending });
  }

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
            //強制的に「降順」に
            setAscending(false);
            //sessionStorageに入れる
            sessionSetter({
              sort: "viewed",
              currentView: "history",
              ascending: false,
            });
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
              sessionSetter({ sort: "created" });
            }
            setCurrentView("articles");
            //sessionStorageに入れる
            sessionSetter({ currentView: "articles" });
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
      <div className="flex justify-end gap-2 lg:gap-9">
        <span
          className={cn(
            "flex",
            "flex-row",
            "items-center",
            "justify-center",
            "text-center",
            "bg-gray-300",
            "rounded-full",
            "h-8",
            "lg:h-10",
            "w-20",
            "lg:w-32",
            "shadow-md",
            "text-white",
            "whitespace-nowrap",
            "gap-1",
            "p-2",
            "shrink-0",
          )}
        >
          <span className={cn(textSize.xs, "font-bold")}>並び順:</span>
          <select
            className={cn(
              textSize.xs,
              "appearance-none font-bold rounded-full bg-gray-300 hover:bg-gray-500 h-6 w-1/2 lg:h-8 cursor-pointer text-center",
            )}
            value={ascending ? "ascending" : "descending"}
            onChange={(e) => {
              changeOrder(e.target.value);
            }}
          >
            <option value="ascending">昇順▼</option>
            <option value="descending">降順▼</option>
          </select>
        </span>
        <span
          className={cn(
            "flex",
            "flex-row",
            "items-center",
            "justify-center",
            "appearance-none",
            "text-center",
            "bg-gray-300",
            "rounded-full",
            "h-8",
            "lg:h-10",
            "w-20",
            "lg:w-32",
            "shadow-md",
            "text-white",
            "whitespace-nowrap",
            "gap-0.5",
            "lg:gap-2",
            "p-2",
            "shrink-0",
          )}
        >
          <span className={cn(textSize.xs, "font-bold")}>表示件数:</span>
          <input
            type="number"
            className="bg-white rounded-full w-1/3 text-gray-400 text-center no-spinner min-w-5"
            // value={itemsDisplayed}
            ref={itemsDisplayedRef}
            onChange={changeItemsDisplayed}
          ></input>
        </span>
      </div>
      <div className="pl-4 flex gap-1 relative z-0">{ViewTabs}</div>
    </>
  );
}
