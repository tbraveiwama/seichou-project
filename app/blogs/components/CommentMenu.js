"use client";
import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import Button from "@/components/ui/Button";
import { useEffect, useState, useRef } from "react";

//特定のページのidを受け取って、コメントを表示するコンポーネント
//URLからidを取得する機能はないので、propsで親から受け取る
export default function CommentMenu({ pageId }) {
  const [commentList, setCommentList] = useState();
  const [hasError, setHasError] = useState({
    nameError: false,
    commentError: false,
  });
  const inputRef = useRef({});

  // //コメントを取得するための変数
  // const fetchCommentList = async () => {
  //   //supabaseでの取得処理

  //   setCommentList();
  // };

  ////ページに対応するpage_idのコメントをcomment_id順に取り出し、name,comment_textを表示
  // useEffect(()=>{
  // fetchCommentList();
  // },[pageId])

  //コメント投稿関数
  function postComment() {
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

    console.log("名前:", name);
    console.log("コメント:", comment);
    inputRef.current.name.value = "";
    inputRef.current.comment.value = "";
    ////再取得
    // fetchCommentList();
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="underline">コメント</div>
      {/* コメント表示ボックス */}
      <div>
        <div>aaa:わかりやすかった</div>
        <div>bbb:役に立った</div>
      </div>
      <div className="bg-gray-200 rounded-xl p-2 flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
          <div>
            <span className="text-white">名前：</span>
            <input
              type="text"
              className="bg-white rounded-xl h-7 w-64 px-2"
              ref={(name) => {
                inputRef.current.name = name;
              }}
            ></input>
          </div>
          <div className="flex">
            <div>
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
            <span className="ml-auto">
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
