import { Base } from "@/components/ui/Base";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { ErrorMessage } from "@/components/ui/text/ErrorMessage";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";
import CommentMenu from "../components/CommentMenu";

export default function blogs() {
  ////ページのデータを取得する
  // const pageData = fetch()
  return (
    <>
      <Base>
        <Card className="font-bold text-2xl text-center">
          <div className="text-gray-400">作成日:2026/10/7 更新:2026/10/8</div>
          <div className={cn("font-bold", textSize.lg, "text-center")}>
            VirtualBoxでFreeBSDの仮想環境を作ってPHPを勉強する(1/3)　VirtualBoxインストール～SSH接続まで
          </div>
          <div className="text-gray-400 flex justify-end">閲覧数:12</div>
          <div className="flex flex-col gap-2 px-2 lg:px-8">
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
          <Link href="/blogs/1/editor" className="hidden lg:inline">
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
          <CommentMenu />
        </Card>
      </Base>
    </>
  );
}
