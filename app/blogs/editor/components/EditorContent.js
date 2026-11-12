"use client";
import Button from "@/components/ui/Button";
import { Base } from "@/components/ui/Base";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Card from "@/components/ui/Card";
import {
  keyController,
  titleKeyController,
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
import { useState } from "react";
import CommentMenu from "../../components/CommentMenu";
import { cn } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";

export default function EditorContent() {
  const router = useRouter();

  const params = useSearchParams();
  const pageId = Number(params.get("id"));

  const titleRef = useRef(null);
  const bodyRef = useRef(null);

  //非活性化制御用state
  const [isActive, setIsActive] = useState(true);

  //エラーメッセージ出力用
  async function errorMsg(title, txt) {
    await Swal.fire({
      title: title,
      html: txt,
      icon: "error",
      confirmButtonText: "OK",
    });
  }

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
    const msg = pageId ? "更新" : "投稿";
    const result = await Swal.fire({
      title: `この内容で${msg}しますか？`,
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
      //非活性
      setIsActive(false);
      const title = titleRef.current.innerHTML;
      const body = bodyRef.current.innerHTML;
      //title未入力の場合返す
      console.log(title.trim());
      if (title.trim() === "<br>" || title.trim() === "") {
        await errorMsg("エラー", "タイトルが入力されていません");
        setIsActive(true);
        return;
      }
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
          await errorMsg("APIエラーが発生しました");
          setIsActive(true);
          return;
        }
      } else {
        //insert処理
        const { error } = await supabase
          .from("pages")
          .insert({ title: title, body_text: body });
        if (error) {
          console.log("APIエラー:", error);
          await errorMsg("APIエラーが発生しました");
          setIsActive(true);
          return;
        }
      }
      // supabaseEdigeFunction->gitHubActions起動
      const { error } = await supabase.functions.invoke("trigger-deploy");
      if (error) {
        console.log("デプロイエラー:", error);
        //pageIdがついていないと同じ記事を二重投稿してしまうので、対策
        await errorMsg("デプロイ時にエラーが発生しました");
        router.push("/blogs");
        return;
      }
      await Swal.fire({
        title: `${msg}完了`,
        html: `記事を${msg}しました<br>※反映まで時間がかかる場合があります`,
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push("/blogs");
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
      const resultConf = await Swal.fire({
        title: "本当に削除しますか？",
        html: "※削除された記事は復元できません",
        showDenyButton: true,
        confirmButtonText: "はい",
        denyButtonText: "いいえ",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          denyButton: "order-2",
        },
      });
      if (resultConf.isConfirmed) {
        //非活性
        setIsActive(false);
        const { error } = await supabase
          .from("pages")
          .delete()
          .eq("page_id", pageId);
        if (error) {
          console.log("APIエラー:", error);
          await errorMsg("APIエラーが発生しました");
          setIsActive(true);
          return;
        }
        // supabaseEdigeFunction->gitHubActions起動
        const { error: deployError } =
          await supabase.functions.invoke("trigger-deploy");
        if (deployError) {
          console.log("デプロイエラー:", deployError);
          await errorMsg(
            "デプロイ時にエラーが発生しました",
            "記事は削除されましたが、サイトへの反映に失敗しました",
          );
          router.push("/blogs");
          return;
        }
        //履歴から削除
        const historyArray = JSON.parse(localStorage.getItem("history"));
        if (historyArray.indexOf(String(pageId) !== -1)) {
          const index = historyArray.indexOf(String(pageId));
          historyArray.splice(index, 1);
          localStorage.setItem("history", JSON.stringify(historyArray));
        } else {
          console.log("localStorageエラー:履歴無し");
        }
        await Swal.fire({
          title: "削除しました",
          confirmButtonText: "OK",
          icon: "success",
        });

        router.push("/blogs");
      }
    }
  }

  return (
    <>
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
            className={cn(
              "font-bold text-center text-gray-300 pb-5",
              textSize.lg,
            )}
            id="title"
            contentEditable="true"
            onKeyDown={titleKeyController}
            onPaste={handlePaste}
            ref={titleRef}
          ></div>
          <div
            className="flex flex-col gap-2 px-2 lg:px-8 text-lg"
            id="body"
            contentEditable="true"
            onKeyDown={keyController}
            onPaste={handlePaste}
            ref={bodyRef}
          ></div>
        </Card>
        <div className="flex justify-end gap-2 py-2">
          <Button
            backGroundColor={"gray"}
            textColor={"white"}
            onClick={back}
            isActive={isActive}
          >
            戻る
          </Button>
          {!!pageId && (
            <Button
              backGroundColor={"red"}
              textColor={"white"}
              onClick={deletePage}
              isActive={isActive}
            >
              削除
            </Button>
          )}
          <Button
            backGroundColor={"orange"}
            textColor={"white"}
            onClick={register}
            isActive={isActive}
          >
            {!!pageId ? "更新" : "投稿"}
          </Button>
        </div>
        <Card>
          <CommentMenu pageId={pageId} isEditor={true} />
        </Card>
      </Base>
    </>
  );
}
