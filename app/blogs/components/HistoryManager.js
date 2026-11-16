"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ViewCounter from "./ViewCounter";
import { useState } from "react";

//webStorageに履歴を記憶させるためのコンポーネント
//閲覧数登録もする
//閲覧数を返す
export default function HistoryManager({ pageId }) {
  //同期化のために
  const [isCounted, setIsCounted] = useState(false);

  useEffect(() => {
    try {
      const history = localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history"))
        : [];

      //現在時刻取得
      const now = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      const nextNow = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${pad(now.getHours())}:${pad(now.getMinutes())}`;

      //被りを消す&履歴追加
      const addedHistory = [
        { pageId: pageId, viewed: nextNow },
        ...history.filter((object) => {
          return object.pageId !== pageId;
        }),
      ];
      //100件までの表示で、LocalStorageに保存
      //閲覧日時も記録する
      localStorage.setItem(
        "history",
        JSON.stringify(addedHistory.slice(0, 100)),
      );
    } catch (e) {
      //localStorage故障用
    }

    //RPC(supabase側に作った関数を使用)
    const countUp = async () => {
      setIsCounted(false);
      const { error } = await supabase.rpc("increment_views", {
        p_page_id: Number(pageId),
      });
      if (error) {
        console.error("views更新エラー:", error);
      }
      setIsCounted(true);
    };
    countUp();
  }, [pageId]);

  if (isCounted) {
    return <ViewCounter id={pageId} />;
  } else {
    return <>取得中...</>;
  }
}
