import { Base } from "@/components/Base";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { ErrorMessage } from "@/components/ErrorMessage";
import Link from "next/link";
// py - 8;

export default function blogs() {
  return (
    <>
      <Base>
        <Card>
          <div className="text-gray-400">作成日:2026/10/7 更新:2026/10/8</div>
          <div className="font-bold text-2xl text-center">
            VirtualBoxでFreeBSDの仮想環境を作ってPHPを勉強する(1/3)　VirtualBoxインストール～SSH接続まで
          </div>
          <div className="text-gray-400 flex justify-end">閲覧数:12</div>
          <div className="flex flex-col gap-2 px-8">
            <div className="font-bold text-2xl border-b border-gray-600 pb-1">
              小見出し
            </div>
            <div>
              <p>本文</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
              <p>スクロール用</p>
            </div>
            <div className="bg-gray-600 rounded-xl p-2 text-white">コード</div>
          </div>
        </Card>
        <div className="flex justify-end gap-2 py-2">
          <Link href="/blogs/1/editor">
            <Button backGroundColor={"orange"} textColor={"white"}>
              編集
            </Button>
          </Link>
          <Link href="/blogs">
            <Button backGroundColor={"gray"} textColor={"white"}>
              戻る
            </Button>
          </Link>
        </div>
        <Card>
          <div className="flex flex-col gap-4">
            <div className="underline">コメント</div>
            <div>
              <div>aaa:わかりやすかった</div>
              <div>bbb:役に立った</div>
            </div>
            <div className="bg-gray-200 rounded-xl p-2 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-white">名前：</span>
                <input type="text" className="bg-white rounded-xl h-7"></input>
                <div>
                  <div>
                    <ErrorMessage>＊名前を入力してください</ErrorMessage>
                  </div>
                  <div>
                    <ErrorMessage>
                      ＊コメント本文を入力してください
                    </ErrorMessage>
                  </div>
                </div>
                <span className="ml-auto">
                  <Button backGroundColor={"sky"} textColor={"white"}>
                    投稿
                  </Button>
                </span>
              </div>
              <textarea className="bg-white rounded-xl h-20 w-full"></textarea>
            </div>
          </div>
        </Card>
      </Base>
    </>
  );
}
