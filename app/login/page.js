"use client";
import Button from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Blogs() {
  const [authError, setAuthError] = useState(false);
  const [authLock, setAuthLock] = useState(false);
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const router = useRouter();

  //emailによる認証しかないので
  async function login() {
    const email = nameRef.current.value + "@seichou.project.local";
    const pass = passRef.current.value;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    });
    if (error) {
      if (error.status === 429) {
        setAuthLock(true);
      } else if (error) {
        setAuthError(true);
      }
      return;
    }

    router.push("/blogs");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/blogs"); // 必要ならページ移動
  }

  return (
    <>
      <div className="flex flex-col items-center py-20 px-2 lg:px-0">
        <div className="bg-white rounded-xl px-4 py-6 w-full max-w-200">
          <div className="flex flex-col gap-6 lg:px-20 py-4">
            <div className={cn("text-center", textSize.xxl)}>
              管理者用ログイン
            </div>
            <div className="text-center">
              {authLock && (
                <ErrorMessage>ログインがロックされました</ErrorMessage>
              )}
            </div>
            <div>
              <div className="flex">
                <span className="text-lg">ID</span>
                {authError && (
                  <ErrorMessage className={"ml-auto"}>
                    IDもしくはパスワードが間違っています
                  </ErrorMessage>
                )}
              </div>
              <input
                type="text"
                className="bg-gray-200 shadow-md w-full h-10 rounded-2xl px-2"
                ref={nameRef}
              ></input>
            </div>
            <div>
              <div className="text-lg">パスワード</div>
              <input
                type="password"
                className="bg-gray-200 shadow-md w-full h-10 rounded-2xl px-2"
                ref={passRef}
              ></input>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              backGroundColor={"orange"}
              textColor={"white"}
              onClick={login}
            >
              ログイン
            </Button>
            <button
              onClick={logout}
            >
              ログアウト（開発用）
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
