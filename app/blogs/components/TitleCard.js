import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils"

export default function TitleCard({ date, title, views }) {
  return (
    <div className={cn("p-2 bg-white rounded-xl min-h-30 flex items-center hover:bg-gray-300 w-full",textSize.xs)}>
      <div className="w-full">
        <div className="text-gray-400 pl-2">{date}</div>
        <div className="px-2">{title}</div>
        <div className="text-gray-400 flex justify-end pr-2">
          閲覧数:{views}
        </div>
      </div>
    </div>
  );
}
