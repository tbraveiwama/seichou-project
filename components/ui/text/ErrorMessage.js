import { textSize } from "@/lib/textStyle";
import {cn} from "@/lib/utils";

export function ErrorMessage({ children, className = "" }) {
  return (
    <span className={cn("text-red-500",textSize.xs,className)}>{children}</span>
  );
}
