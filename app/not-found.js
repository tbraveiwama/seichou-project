// app/not-found.js
"use client";
import BlogNotFound from "@/components/error/BlogNotFound";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blogs/");

  return <BlogNotFound />
  return isBlog ? (
    <h2>この記事は見つかりません</h2>
  ) : (
    <h2>ページが見つかりません</h2>
  );
}