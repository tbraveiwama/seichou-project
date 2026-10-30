"use client";
import { useUser } from "@/app/hooks/useUser";
import { ErrorMessage } from "../ui/text/ErrorMessage";

export default function LoginCheck() {
  const isLogin = useUser();
  return (
    <span className={isLogin ? "" : "invisible"}>
      <ErrorMessage>管理者としてログイン中</ErrorMessage>
    </span>
  );
}
