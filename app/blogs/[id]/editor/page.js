"use client";
import Button from "@/components/ui/Button";
import EditButton from "./components/EditButton";
import { Base } from "@/components/ui/Base";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/ui/Card";
import {
  keyController,
  handlePaste,
  mainText,
  code,
  minTitle,
} from "@/app/blogs/[id]/editor/lib/editUtils";

export default function Blogs() {
  // const router = useRouter();
  // function back() {
  //   console.log("clicked!");
  //   Swal.fire({
  //     title: "保存せずに戻りますか？",
  //     showDenyButton: true,
  //     confirmButtonText: "はい",
  //     denyButtonText: "いいえ",
  //     customClass: {
  //       actions: "my-actions",
  //       cancelButton: "order-1 right-gap",
  //       denyButton: "order-2",
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       router.push("/blogs/1");
  //     }
  //   });
  // }
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></Script>

      <div className="flex flex-col items-center sticky top-8 z-10 bg-gray-200">
        <div>
          <EditButton onClick={mainText}>本文</EditButton>
          <EditButton onClick={minTitle}>小見出し</EditButton>
          <EditButton onClick={code}>コード</EditButton>
        </div>
      </div>
      <Base>
        <Card>
          <div
            className="font-bold text-2xl text-center text-gray-300 pb-5"
            id="title"
            contentEditable="true"
            onKeyDown={keyController}
            onPaste={handlePaste}
          >
            ここにタイトルを入力
          </div>
          <div
            className="flex flex-col gap-2 px-8"
            id="body"
            contentEditable="true"
            onKeyDown={keyController}
            onPaste={handlePaste}
          >
          ここにテキストを入力
          </div>
        </Card>
        <div className="flex justify-end gap-2">
          <Button backGroundColor={"red"} textColor={"white"}>
            削除
          </Button>
          <Button backGroundColor={"orange"} textColor={"white"}>
            投稿
          </Button>
        </div>
      </Base>
    </>
  );
}
