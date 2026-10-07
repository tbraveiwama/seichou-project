"use client";
import { usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";
import HeaderButton from "@/components/layout/HeaderButton";

export default function RootLayout({ children }) {
  const pathName = usePathname();
  let backGroundColor = "bg-sky-100";
  if (/editor$/.test(pathName) || /login$/.test(pathName)) {
    backGroundColor = "bg-gray-100";
  }
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn(textSize.sm, backGroundColor)}>
        {/* ヘッダー：全ページの上部に表示 */}
        <Header />
        <div className="sticky top-0 z-10 bg-sky-300 flex h-6 md:h-8">
          <HeaderButton link={"/blogs"}> 記事一覧</HeaderButton>
          <HeaderButton link={"/login"}>管理者ログイン</HeaderButton>
        </div>

        {/* children：各ページの本文がここに入る */}
        <main className="flex-grow">{children}</main>

        {/* フッター：全ページの下部に表示 */}
      </body>
    </html>
  );
}
