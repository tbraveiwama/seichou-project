"use client";
import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import Button from "@/components/ui/Button";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

//特定のページのidを受け取って、コメントを表示するコンポーネント
//URLからidを取得する機能はないので、propsで親から受け取る
export default function CommentMenu({ pageId }) {
  const [commentList, setCommentList] = useState();
  const [hasError, setHasError] = useState({
    nameError: false,
    commentError: false,
  });
  const inputRef = useRef({});

  //コメントを取得するための変数
  const fetchCommentList = async () => {
    //supabaseでの取得処理
    const { data, error } = await supabase
      .from("comments")
      .select("name,comment_text")
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

    const { error } = await supabase
      .from("comments")
      .insert({ name: name, comment_text: comment, page_id: pageId });
    if (error) {
      console.log(error);
      return;
    }

    inputRef.current.name.value = "";
    inputRef.current.comment.value = "";
    //再取得
    fetchCommentList();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="underline">コメント</div>
      {/* コメント表示ボックス */}
      <div>
        {commentList &&
          commentList.map((comment, index) => {
            return (
              <div key={index}>
                {comment.name}：{comment.comment_text}
              </div>
            );
          })}
      </div>
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
