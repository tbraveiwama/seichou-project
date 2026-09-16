import Button from "@/components/Button";
import Card from "@/components/Card";
import EditButton from "./components/EditButton";
import { Base } from "@/components/Base";

export default function blogs() {
  return (
    <>
      <div className="flex flex-col items-center sticky top-9 z-10 bg-gray-200">
        <div>
          <EditButton>本分</EditButton>
          <EditButton>小見出し</EditButton>
          <EditButton>コード</EditButton>
        </div>
      </div>
      <Base>
        <Card>
          <div className="flex flex-col gap-2 px-8">
            <div className="font-bold text-2xl text-center text-gray-300">
              ここにタイトルを入力
            </div>
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
              <div className="bg-gray-600 rounded-xl p-2 text-white">
                コード
              </div>
            </div>
          </div>
        </Card>
        <div className="flex justify-end gap-2">
          <Button backGroundColor={"red"} textColor={"white"}>
            削除
          </Button>
          <Button backGroundColor={"orange"} textColor={"white"}>
            投稿
          </Button>
        </div>
      </Base>
    </>
  );
}
