import { Base } from "@/components/Base";
import Button from "@/components/Button";
import Test from "@/components/Test";
import Link from "next/link";

export default function pages() {
  return (
    <>
      <Base>
        <div className="flex items-center gap-9 pb-5">
          <span className="text-5xl font-bold">記事一覧</span>
          <input
            type="text"
            className="bg-white rounded-full h-10 w-120 shadow-md"
          ></input>
          <Button backGroundColor="sky" textColor="white">
            検索
          </Button>
          <select className="appearance-none text-center bg-gray-300 rounded-full h-10 w-35 shadow-md text-xl text-white">
            <option>作成日時　▼</option>
            <option>閲覧数　▼</option>
          </select>
          <Link href="http://172.20.192.82:3000/blogs/1/editor">
            <Button backGroundColor="orange" textColor="white">
              新規作成
            </Button>
          </Link>
        </div>

        <div>
          <div className="pl-4 flex gap-1 relative z-0">
            <span className="bg-sky-300 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0">
              記事
            </span>
            <span className="bg-sky-200 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0">
              履歴
            </span>
          </div>
          <div className="bg-gray-200 rounded-xl px-4 py-4 relative z-1 flex flex-col gap-6 overflow-scroll w-full h-180">
            {/* テスト用 */}
            <Test></Test>
            <div className="flex flex-col items-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-gray-50 py-1 px-2 text-gray-500 border border-gray-500 text-lg shrink-0"
                >
                  ＜
                </button>
                <span className="bg-gray-50 py-1 px-6 text-gray-500 border border-gray-500 text-lg shrink-0">
                  １／２０
                </span>
                <button
                  type="button"
                  className="bg-gray-50 py-1 px-2 text-gray-500 border border-gray-500 text-lg shrink-0"
                >
                  ＞
                </button>
              </div>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
}
