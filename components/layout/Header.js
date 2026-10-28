import logo from "@/public/siteLogo.png"
import { textSize } from "@/lib/textStyle";
import Image from "next/image";
import { ErrorMessage } from "../ui/text/ErrorMessage";

export default function Header() {
  return (
    <header className="relative flex flex-col gap-2 bg-sky-300">
      <div className="flex justify-end pt-1 pr-1">
        <ErrorMessage>管理者としてログイン中</ErrorMessage>
      </div>
      <div className="relative flex flex-col items-center pb-2">
        <div className="flex items-center gap-2 lg:gap-9">
          <Image src={logo} alt="仮のロゴマーク" width={100} height={100} className="size-12 lg:size-24"/>
          <span className={textSize.xxxl}>サイト名(未定)</span>
        </div>
      </div>
    </header>
  );
}
