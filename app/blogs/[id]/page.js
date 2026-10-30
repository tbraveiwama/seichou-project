import { Base } from "@/components/ui/Base";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";
import CommentMenu from "../components/CommentMenu";
import HistoryManager from "../components/HistoryManager";
import { supabase } from "@/lib/supabase";
import EditorLink from "../components/EditorLink";
import ViewCounter from "../components/ViewCounter";

export default async function BlogPages({ params }) {
  //パラメータからidを受け取る
  const { id } = await params;
  //ページのデータを取得する
  //supabaseでの取得
  const { data, error } = await supabase
    .from("pages")
    .select()
    .eq("page_id", id);
  const pageData = data[0];

  return (
    <>
      <HistoryManager pageId={id} />
      <Base>
        <Card className="font-bold text-2xl text-center">
          <div className="text-gray-400">
            作成日:{pageData.created} 更新:{pageData.updated}
          </div>
          <div className={cn("font-bold", textSize.lg, "text-center")}>
            {pageData.title}
          </div>

          <div className="text-gray-400 flex justify-end">
            閲覧数:
            <ViewCounter id={id} />
          </div>

          <div className="flex flex-col gap-2 px-2 lg:px-8">
            {pageData.body_text}
          </div>
        </Card>
        <div className="flex justify-end gap-2 py-2">
          <EditorLink id={id} />
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

export async function generateStaticParams() {
  const { data } = await supabase.from("pages").select("page_id");
  return (data ?? []).map((d) => ({ id: String(d.page_id) }));
}
