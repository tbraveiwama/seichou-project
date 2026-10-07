import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import Button from "@/components/ui/Button";

export default function CommentMenu() {
  return (
    <div className="flex flex-col gap-4">
      <div className="underline">コメント</div>
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
            ></input>
          </div>
          <div className="flex">
            <div>
              <div>
                <ErrorMessage>＊名前を入力してください</ErrorMessage>
              </div>
              <div>
                <ErrorMessage>＊コメント本文を入力してください</ErrorMessage>
              </div>
            </div>
            <span className="ml-auto">
              <Button backGroundColor={"sky"} textColor={"white"}>
                投稿
              </Button>
            </span>
          </div>
        </div>
        <textarea className="bg-white rounded-xl h-20 w-full p-2"></textarea>
      </div>
    </div>
  );
}
