import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";

export function TitleText({children}){
    return(
        <span className={cn(textSize.xxxl,"font-bold")}>{children}</span>
    )
}