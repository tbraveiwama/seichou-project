import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";

export default function Select({ children }) {
  return (
    <select
      className={cn(
        "appearance-none",
        "text-center",
        "bg-gray-300",
        "rounded-full",
        "h-8",
        "lg:h-10",
        "w-20",
        "lg:w-32",
        "shadow-md",
        textSize.sm,
        "text-white",
      )}
    >
      {children}
    </select>
  );
}
