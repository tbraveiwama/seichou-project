import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";
import { HTMLChanger } from "./HTMLChanger";

export default function TitleCard({
  date = null,
  title,
  views,
  updated = null,
  viewed = null,
}) {
  //titleが70文字を超える場合、以降は...で省略する
  if (title.length > 70) {
    title = title.slice(0, 70) + "......";
  }
  if (viewed) {
    return (
      <div
        className={cn(
          "p-2 bg-white rounded-xl h-16 lg:h-30 flex items-center hover:bg-gray-300 w-full",
          textSize.xs,
        )}
      >
        <div className="w-full">
          <div className="text-gray-400 px-2">
            閲覧日時:{viewed}
          </div>
          <div className="px-2 whitespace-nowrap lg:whitespace-normal overflow-x-scroll lg:wrap-break-word">
            <HTMLChanger text={title} />
          </div>
          <div className="text-gray-400 flex justify-end pr-2">
            閲覧数:{views}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "p-2 bg-white rounded-xl h-16 lg:h-30 flex items-center hover:bg-gray-300 w-full",
        textSize.xs,
      )}
    >
      <div className="w-full">
        <div className="text-gray-400 px-2">
          作成日:{date}｜最終更新日:{updated}
        </div>
        <div className="px-2 whitespace-nowrap lg:whitespace-normal overflow-x-scroll lg:wrap-break-word">
          <HTMLChanger text={title} />
        </div>
        <div className="text-gray-400 flex justify-end pr-2">
          閲覧数:{views}
        </div>
      </div>
    </div>
  );
}
