"use client";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useState } from "react";

export function useUser() {
  //ログイン状態確認
  const [isLogin, setIsLogin] = useState(false);
  function handleChange(event, session) {
    setIsLogin(!!session);
  }
  //ログインチェック
  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setIsLogin(true);
      }
    };
    checkLogin();

    //コールバック。handleChangeをsupabaseに預けることで、認証情報が変わった時に実行してくれる
    const { data: listener } = supabase.auth.onAuthStateChange(handleChange);

    //クリーンアップ。預けた関数を解除する
    return () => listener.subscription.unsubscribe();
  }, []);

  return isLogin;
}
