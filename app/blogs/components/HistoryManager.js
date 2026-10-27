"use client";

import { useEffect } from "react";

//webStorageに履歴を記憶させるためのコンポーネント
export default function HistoryManager({ pageId }) {
  useEffect(() => {
    try{
    const history = localStorage.getItem("history")
      ? JSON.parse(localStorage.getItem("history"))
      : [];
    //被りを消す
    const nextHistory = [pageId, ...history.filter((id) => id !== pageId)];
    //100件までの表示
    localStorage.setItem("history", JSON.stringify(nextHistory.slice(0,100)));
    } catch(e) {
        //localStorage故障用
    }
  }, [pageId]);

  return null;
}
