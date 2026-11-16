"use client";
import NotFound from "./not-found";

export default function Index() {
  //現在時刻取得
  const now = new Date();
  const nextNow = now.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  console.log(nextNow);
  return <NotFound />;
}
