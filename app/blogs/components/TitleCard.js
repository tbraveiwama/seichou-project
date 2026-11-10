import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";
import { HTMLChanger } from "./HTMLChanger";

export default function TitleCard({ date, title, views }) {
  //titleが70文字を超える場合、以降は...で省略する
  if (title.length > 70) {
    title = title.slice(0, 70) + "......";
  }
  return (
    <div
      className={cn(
        "p-2 bg-white rounded-xl min-h-30 flex items-center hover:bg-gray-300 w-full",
        textSize.xs,
      )}
    >
      <div className="w-full">
        <div className="text-gray-400 pl-2">作成日:{date}</div>
        <div className="px-2"><HTMLChanger text={title}/></div>
        <div className="text-gray-400 flex justify-end pr-2">
          閲覧数:{views}
        </div>
      </div>
    </div>
  );
}
