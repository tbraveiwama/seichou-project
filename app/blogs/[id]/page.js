import { Base } from "@/components/ui/Base";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { cn, toDate } from "@/lib/utils";
import { textSize } from "@/lib/textStyle";
import CommentMenu from "../components/CommentMenu";
import HistoryManager from "../components/HistoryManager";
import { supabase } from "@/lib/supabase";
import EditorLink from "../components/EditorLink";
import { HTMLChanger } from "../components/HTMLChanger";

export default async function BlogPages({ params }) {
  //パラメータからidを受け取る
  const { id } = await params;
  //ページのデータを取得する
  //supabaseでの取得
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("page_id", id);
  if (error) {
    return <div>データを取得できませんでした</div>;
  }
  const pageData = data[0];
  const created = toDate(pageData.created);
  const updated = toDate(pageData.updated);

  return (
    <>
      <Base>
        <Card>
          <div className={cn("text-gray-400",textSize.sm)}>
            作成日:{created}｜最終更新日:{updated}
          </div>
          <div className={cn("font-bold break-words", textSize.lg, "text-center px-2")}>
            <HTMLChanger text={pageData.title} />
          </div>

          <div className={cn("text-gray-400 flex justify-end",textSize.sm)}>
            閲覧数:
            <HistoryManager pageId={id} />
          </div>

          <div className={cn("flex flex-col gap-2 px-2 lg:px-8",textSize.base)}>
            <HTMLChanger text={pageData.body_text} />
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
