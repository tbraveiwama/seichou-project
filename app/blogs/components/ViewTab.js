import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";

export default function ViewTab({ children, active = false, ...props }) {
  const css = active ? "bg-sky-200 hover:bg-sky-300 cursor-pointer" : "bg-sky-300";
  return (
    <span
      className={cn(
        css,
        "text-sm lg:text-xl text-center px-4 pt-1 w-15 h-6 lg:w-20 lg:h-9 rounded-t-lg lg:rounded-t-xl text-white shrink-0 ",
      )}
      {...props}
    >
      {children}
    </span>
  );
}
