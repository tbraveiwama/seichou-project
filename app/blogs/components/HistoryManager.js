"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ViewCounter from "./ViewCounter";
import { useState } from "react";

//webStorageに履歴を記憶させるためのコンポーネント
//閲覧数登録もする
export default function HistoryManager({ pageId }) {
  //同期化のために
  const [isCounted, setIsCounted] = useState(false);

  useEffect(() => {
    try {
      const history = localStorage.getItem("history")
        ? JSON.parse(localStorage.getItem("history"))
        : [];
      //被りを消す
      const nextHistory = [pageId, ...history.filter((id) => id !== pageId)];
      //100件までの表示
      localStorage.setItem(
        "history",
        JSON.stringify(nextHistory.slice(0, 100)),
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
