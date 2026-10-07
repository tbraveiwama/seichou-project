import { textSize } from "@/lib/textStyle";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeaderButton({ children,link }) {
  return (
    <Link
      href={link}
      className={cn("inline-block","h-full","w-25","lg:w-40","text-center",textSize.xs,"text-white","bg-blue-200","py-1","hover:bg-blue-300")}
    >{children}</Link>
  );
}