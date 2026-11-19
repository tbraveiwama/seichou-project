import logo from "@/public/siteLogo.png";
import { textSize } from "@/lib/textStyle";
import Image from "next/image";
import LoginCheck from "./LoginCheck";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="relative flex flex-col bg-sky-300">
      <div className="flex justify-end pr-1">
        <LoginCheck />
      </div>
      <div className="relative flex flex-col items-center pb-1">
        <div className="flex items-center gap-2 lg:gap-9">
          <Image
            src={logo}
            alt="仮のロゴマーク"
            width={100}
            height={100}
            className="size-12 lg:size-24"
          />
          <span className={cn(textSize.xxxl, "text-white font-bold")}>
            いわまのブログ
          </span>
        </div>
        <div className={cn(textSize.xs, "text-white font-bold pt-1 lg:pt-4")}>
          勉強の一環でブログサイトを制作しました。
          <br className="lg:hidden" />
          主に仕事の備忘録。間違ったことも書きます。
        </div>
      </div>
    </header>
  );
}
