import clsx from "clsx";
import { twMerge } from "tailwind-merge";

//渡されたクラスネームをマージする
export function cn(...inputs){
    return twMerge(clsx(inputs));
}