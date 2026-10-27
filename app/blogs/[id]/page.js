import { Base } from "@/components/ui/Base";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";
import CommentMenu from "../components/CommentMenu";
import HistoryManager from "../components/HistoryManager";

export default async function BlogPages({ params }) {
  //パラメータからidを受け取る
  const { id } = await params;
  ////ページのデータを取得する
  // const pageData = fetch()
  return (
    <>
    <HistoryManager pageId={id}/>
      <Base>
        <Card className="font-bold text-2xl text-center">
          <div className="text-gray-400">作成日:2026/10/7 更新:2026/10/8</div>
          <div className={cn("font-bold", textSize.lg, "text-center")}>
           title
          </div>
          <div className="text-gray-400 flex justify-end">閲覧数:12</div>
          <div className="flex flex-col gap-2 px-2 lg:px-8">
            <div>
              bodytext
            </div>
          </div>
        </Card>
        <div className="flex justify-end gap-2 py-2">
          <Link href={`/blogs/editor?id=${id}`} className="hidden lg:inline">
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
          <CommentMenu pageId={id} />
        </Card>
      </Base>
    </>
  );
}
