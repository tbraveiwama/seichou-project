import logo from "@/public/siteLogo.png";
import Image from "next/image";

export default function NotFoundBlog() {
  return (
    <div className="relative h-full overflow-hidden flex flex-col items-center justify-center bg-white gap-5">
      <Image
        src={logo}
        alt="仮のロゴマーク"
        priority
        className="absolute size-100 max-w-none shrink-0 opacity-3 grayscale animate-spin [animation-duration:20s] pointer-events-none will-change-transform"
      />
      <div className="text-2xl text-gray-400 font-normal">File Not Found｜お探しの記事は反映に時間がかかっているか、存在しない記事です</div>
      <div className="text-xl text-gray-400 font-normal">しばらく経ってからもう一度お試しください</div>
    </div>
  );
}