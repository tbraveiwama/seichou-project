"use client";
import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import Button from "@/components/ui/Button";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import Swal from "sweetalert2";
import { toDate } from "@/lib/utils";
import HoverMsg from "@/components/ui/HoverMsg";


//特定のページのidを受け取って、コメントを表示するコンポーネント
//URLからidを取得する機能はないので、propsで親から受け取る
export default function CommentMenu({ pageId, isEditor = false }) {
  const [commentList, setCommentList] = useState();
  const [hasError, setHasError] = useState({
    nameError: false,
    commentError: false,
  });
  const inputRef = useRef({});

  const [isActive, setIsActive] = useState(true);

  //コメントを取得するための変数
  const fetchCommentList = async () => {
    //supabaseでの取得処理
    const { data, error } = await supabase
      .from("comments")
      .select("comment_id,name,comment_text,posted")
      .eq("page_id", pageId)
      .order("posted", { ascending: true });
    if (error) {
      console.log(error);
      return;
    }
    setCommentList(data);
  };

  //ページに対応するpage_idのコメントをcomment_id順に取り出し、name,comment_textを表示
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCommentList();
  }, [pageId]);

  const comments = commentList
    ? commentList.map((comment, index) => {
      const date = toDate(comment.posted);
      console.log(date)
        return (
          <div key={index} className="flex items-center justify-between">
            <HoverMsg msg={date}>
            <span>
              {comment.name}：{comment.comment_text}
            </span>
            </HoverMsg>
            {isEditor && (
              <button
                className="text-white bg-red-500 text-sm px-1 py-0.5 h-6 w-10 rounded-lg whitespace-nowrap text-center shrink-0 hover:bg-red-700 cursor-pointer"
                onClick={() => deleteComment(comment.comment_id)}
              >
                削除
              </button>
            )}
          </div>
        );
      })
    : null;

  //コメント投稿関数
  async function postComment() {
    const name = inputRef.current.name.value;
    const comment = inputRef.current.comment.value;
    const nextError = {
      //空のときture
      nameError: name === "",
      commentError: comment === "",
    };
    setHasError(nextError);
    // 投稿せずに終了
    if (nextError.nameError || nextError.commentError) return;

    setIsActive(false);
    const { error } = await supabase
      .from("comments")
      .insert({ name: name, comment_text: comment, page_id: pageId });
    if (error) {
      await Swal.fire({
        title: "コメントの投稿に失敗しました。",
        icon: "error",
      });
      setIsActive(true);
      console.log(error);
      return;
    }
    setIsActive(true);
    inputRef.current.name.value = "";
    inputRef.current.comment.value = "";
    //再取得
    fetchCommentList();
  }

  //削除関数
  async function deleteComment(commentId) {
    setIsActive(false);
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", commentId);
    setIsActive(true);
    if (error) {
      console.log(error);
      return;
    }
    fetchCommentList();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="underline">コメント</div>
      {/* コメント表示ボックス */}
      <div className="flex flex-col gap-2">{comments}</div>
      <div className="bg-gray-200 rounded-xl p-2 flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 lg:h-14">
          <div className="flex items-center whitespace-nowrap">
            <span className="text-white">名前：</span>
            <input
              type="text"
              className="bg-white rounded-xl h-7 w-44 px-2 lg:w-64"
              ref={(name) => {
                inputRef.current.name = name;
              }}
            ></input>
          </div>
          <div className="flex w-full items-center">
            <div className="hidden lg:flex lg:flex-col">
              {hasError.nameError && (
                <div>
                  <ErrorMessage>＊名前を入力してください</ErrorMessage>
                </div>
              )}
              {hasError.commentError && (
                <div>
                  <ErrorMessage>＊コメントを入力してください</ErrorMessage>
                </div>
              )}
            </div>
            <span className="ml-auto justify-items-end">
              <Button
                backGroundColor={"sky"}
                textColor={"white"}
                onClick={postComment}
                isActive={isActive}
              >
                投稿
              </Button>
            </span>
          </div>
        </div>
        <div className="flex flex-col lg:hidden">
          {hasError.nameError && (
            <div>
              <ErrorMessage>＊名前を入力してください</ErrorMessage>
            </div>
          )}
          {hasError.commentError && (
            <div>
              <ErrorMessage>＊コメントを入力してください</ErrorMessage>
            </div>
          )}
        </div>
        <textarea
          className="bg-white rounded-xl h-20 w-full p-2"
          ref={(comment) => {
            inputRef.current.comment = comment;
          }}
        ></textarea>
      </div>
    </div>
  );
}
