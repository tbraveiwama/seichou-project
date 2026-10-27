import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";

export default function EditButton({ onClick,children }) {
  return (
    <button
      className={cn(
        "h-6",
        "lg:h-8",
        "w-25",
        "lg:w-40",
        "text-center",
        textSize.xs,
        "text-white",
        "bg-gray-300",
        "py-1",
        "hover:bg-gray-400",
        "cursor-pointer",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
