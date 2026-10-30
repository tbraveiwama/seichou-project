import clsx from "clsx";
import { twMerge } from "tailwind-merge";

//渡されたクラスネームをマージする
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//渡されたtimeStampを年月日表記にして返す
export function ToDate(timeStamp) {
  //"T"より左を取り出す
  const date = timeStamp.slice(0, timeStamp.indexOf("T"));
  //年、月、日に変える
  const nextDate = date.split("-");
  return `${nextDate[0]}年${nextDate[1]}月${nextDate[2]}日`;
}
