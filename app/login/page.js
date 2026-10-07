import Button from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function blogs() {
  return (
    <>
      <div className="flex flex-col items-center py-20 px-2 lg:px-0">
        <div className="bg-white rounded-xl px-4 py-6 w-full max-w-200">
          <div className="flex flex-col gap-6 lg:px-20 py-4">
            <div className={cn("text-center",textSize.xxl)}>管理者用ログイン</div>
            <div className="text-center">
              <ErrorMessage>ログインがロックされました</ErrorMessage>
            </div>
            <div>
              <div className="flex">
                <span className="text-lg">ID</span>
                <ErrorMessage className={"ml-auto"}>
                  IDもしくはパスワードが間違っています
                </ErrorMessage>
              </div>
              <input
                type="text"
                className="bg-gray-200 shadow-md w-full h-10 rounded-2xl px-2"
              ></input>
            </div>
            <div>
              <div className="text-lg">パスワード</div>
              <input
                type="password"
                className="bg-gray-200 shadow-md w-full h-10 rounded-2xl px-2"
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
