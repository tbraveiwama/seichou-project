'use client'
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  const pathName = usePathname();
  let backGroundColor = "bg-sky-100";
  if(/editor$/.test(pathName)||/login$/.test(pathName)){
    backGroundColor = "bg-gray-100";
  }
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={backGroundColor}>
        {/* ヘッダー：全ページの上部に表示 */}
        <Header />
        <div className="sticky top-0 z-10 bg-sky-300">
          <Link
            href="/blogs"
            className="inline-block w-40 text-center text-lg text-white bg-blue-200 py-1 hover:bg-blue-300 "
          >
            記事一覧
          </Link>
          <Link
            href="/login"
            className="inline-block w-40 text-center text-lg text-white bg-blue-200 py-1 hover:bg-blue-300"
          >
            管理者ログイン
          </Link>
        </div>

        {/* children：各ページの本文がここに入る */}
        <main className="flex-grow">{children}</main>

        {/* フッター：全ページの下部に表示 */}
      </body>
    </html>
  );
}
