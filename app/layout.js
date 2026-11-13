"use client";
import { useParams, usePathname } from "next/navigation";
import Header from "../components/layout/Header";
import "./globals.css";
import { cn } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";
import HeaderButton from "@/components/layout/HeaderButton";

export default function RootLayout({ children }) {
  const pathName = usePathname();

  const backGroundColor =
    pathName === "/blogs/editor" || pathName === "/blogs/login"
      ? "bg-gray-100"
      : "bg-sky-100";

  const isEditor = pathName === "/blogs/editor" ? true : false;

  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn(textSize.sm, backGroundColor,"flex h-screen flex-col")}>
        {/* ヘッダー：全ページの上部に表示 */}
        <Header />
        <div className="sticky top-0 z-10 bg-sky-300 flex h-6 md:h-8">
          {!isEditor && (
            <>
              <HeaderButton link={"/blogs"}> 記事一覧</HeaderButton>
              <HeaderButton link={"/login"}>管理者ログイン</HeaderButton>
            </>
          )}
        </div>

        {/* children：各ページの本文がここに入る */}
        <main className="flex-1 overflow-auto">{children}</main>

        {/* フッター：全ページの下部に表示 */}
      </body>
    </html>
  );
}
