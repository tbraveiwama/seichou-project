"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import { useUser } from "@/app/hooks/useUser";

export default function EditorLink({ id }) {
  //ログインチェック
  const isLogin = useUser();
  return (
    <>
      {isLogin && (
        <Link href={`/blogs/editor?id=${id}`} className="hidden lg:inline">
          <Button backGroundColor={"orange"} textColor={"white"}>
            編集
          </Button>
        </Link>
      )}
    </>
  );
}
