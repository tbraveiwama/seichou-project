import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";

export default function BlogLinkListLoading() {
  const card = [];
  for (let i = 0; i < 3; i++) {
    card.push(
      <span key={i}>
        <div
          className={cn(
            "p-2 bg-white rounded-xl min-h-30 flex items-center hover:bg-gray-300 w-full animate-pulse",
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
      </span>,
    );
  }
  return (
    <>
      <div className="bg-gray-200 rounded-t-xl px-4 py-4 relative z-1 flex flex-col gap-6 overflow-y-scroll w-full h-[520px] lg:h-[600px]">
        {card}
      </div>
      <div className="bg-gray-200 rounded-b-xl py-3 z-1 gap-6 w-full h-16">
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-gray-50 py-1 px-2 text-gray-200 border border-gray-500 text-lg shrink-0 animate-pulse"
            >
              ＜
            </button>
            <span className="bg-gray-50 py-1 px-6 text-gray-200 border border-gray-500 text-lg shrink-0 animate-pulse">
              ■■／■■
            </span>
            <button
              type="button"
              className="bg-gray-50 py-1 px-2 text-gray-200 border border-gray-500 text-lg shrink-0 animate-pulse"
            >
              ＞
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
