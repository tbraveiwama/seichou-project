import Button from "@/components/Button";
import { ErrorMessage } from "@/components/ErrorMessage";
import Link from "next/link";

export default function blogs() {
  return (
    <>
      <div className="flex flex-col items-center py-20">
        <div class="bg-white rounded-xl px-4 py-6 w-full max-w-200">
          <div className="flex flex-col gap-6 px-20 py-4">
            <div className="text-3xl text-center">管理者用ログイン</div>
            <div className="text-center">
              <ErrorMessage>ログインがロックされました</ErrorMessage>
            </div>
            <div>
              <div className="flex">
                <span className="text-lg">ID</span>
                <ErrorMessage addClassName={"ml-auto"}>
                  IDもしくはパスワードが間違っています
                </ErrorMessage>
              </div>
              <input
                type="text"
                className="bg-gray-200 shadow-md w-full h-10 rounded-2xl"
              ></input>
            </div>
            <div>
              <div className="text-lg">パスワード</div>
              <input
                type="text"
                className="bg-gray-200 shadow-md w-full h-10 rounded-2xl"
              ></input>
            </div>
          </div>
          <div className="flex justify-end">
            <Link href="/blogs">
              <Button backGroundColor={"orange"} textColor={"white"}>
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
