"use client";
import Button from "@/components/ui/Button";
import { Base } from "@/components/ui/Base";
import Script from "next/script";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Card from "@/components/ui/Card";
import {
  keyController,
  handlePaste,
  mainText,
  code,
  minTitle,
} from "@/app/blogs/editor/lib/editUtils";
import { useEffect } from "react";
import { useRef } from "react";
import EditButton from "@/app/blogs/editor/components/EditButton";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function EditorContent() {
  const router = useRouter();

  const params = useSearchParams();
  const pageId = Number(params.get("id"));

  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    //ページIDがあればAPIを叩きデータ取得
    const fetchPage = async () => {
      const { data, error } = await supabase
        .from("pages")
        .select()
        .eq("page_id", pageId);
      titleRef.current.innerHTML = data[0].title;
      bodyRef.current.innerHTML = data[0].body_text;
    };
    if (pageId) {
      fetchPage();
    } else {
      //なければ初期文字列を表示
      titleRef.current.innerHTML = "ここにタイトルを入力";
      bodyRef.current.innerHTML = "ここにテキストを入力";
    }
  }, []);

  function back() {
    Swal.fire({
      title: "保存せずに戻りますか？",
      showDenyButton: true,
      confirmButtonText: "はい",
      denyButtonText: "いいえ",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        denyButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (pageId) {
          router.push(`/blogs/${pageId}`);
        } else {
          router.push("/blogs");
        }
      }
    });
  }

  async function register() {
    const msg = pageId
      ? "この内容で更新しますか？"
      : "この内容で投稿しますか？";
    const result = await Swal.fire({
      title: msg,
      showDenyButton: true,
      confirmButtonText: "はい",
      denyButtonText: "いいえ",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        denyButton: "order-2",
      },
    });
    if (result.isConfirmed) {
      //「はい」選択時の処理
      const title = titleRef.current.innerHTML;
      const body = bodyRef.current.innerHTML;
      if (pageId) {
        //update処理
        const now = new Date();
        const { error } = await supabase
          .from("pages")
          .update({ title: title, body_text: body, updated: now.toISOString() })
          .eq("page_id", pageId)
          .select();
        if (error) {
          console.log("APIエラー:", error);
          return;
        }
        router.push(`/blogs/${pageId}`);
      } else {
        //insert処理
        const { error } = await supabase
          .from("pages")
          .insert({ title: title, body_text: body });
        if (error) {
          console.log("APIエラー:", error);
          return;
        }
        //gitHubActions起動

        router.push("/blogs");
      }
    }
  }

  async function deletePage() {
    const result = await Swal.fire({
      title: "この記事を削除しますか？",
      showDenyButton: true,
      confirmButtonText: "はい",
      denyButtonText: "いいえ",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        denyButton: "order-2",
      },
    });
    if (result.isConfirmed) {
      const { data, error } = await supabase
        .from("pages")
        .delete()
        .eq("page_id", pageId);
      if (error) {
        console.log(error);
        return;
      }
      router.push("/blogs");
    }
  }

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
            ref={titleRef}
          ></div>
          <div
            className="px-8 text-base"
            id="body"
            contentEditable="true"
            onKeyDown={keyController}
            onPaste={handlePaste}
            ref={bodyRef}
          ></div>
        </Card>
        <div className="flex justify-end gap-2">
          <Button backGroundColor={"gray"} textColor={"white"} onClick={back}>
            戻る
          </Button>
          {!!pageId && (
            <Button
              backGroundColor={"red"}
              textColor={"white"}
              onClick={deletePage}
            >
              削除
            </Button>
          )}
          <Button
            backGroundColor={"orange"}
            textColor={"white"}
            onClick={register}
          >
            {pageId ? "更新" : "投稿"}
          </Button>
        </div>
      </Base>
    </>
  );
}
