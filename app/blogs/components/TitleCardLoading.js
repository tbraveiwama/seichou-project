import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";

export default function TitleCardLoading() {
  return (
    <div
      className={cn(
        "p-2 bg-white rounded-xl min-h-30 flex items-center hover:bg-gray-300 w-full animate-pulse cursor-wait",
        textSize.xs,
      )}
    >
      <div className="w-full">
        <div className="text-gray-200 pl-2 animate-pulse">■■■■-■■-■■■■</div>
        <div className="text-gray-200 px-2 animate-pulse">
          ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        </div>
        <div className="text-gray-200 flex justify-end pr-2 animate-pulse">
          ■■■:■■■
        </div>
      </div>
    </div>
  );
}
