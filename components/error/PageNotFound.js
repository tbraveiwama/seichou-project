import logo from "@/public/siteLogo.png";
import Image from "next/image";

export default function PageNotFound({ children }) {
  return (
    <div className="relative h-full overflow-hidden flex flex-col items-center justify-center bg-white gap-5">
      <Image
        src={logo}
        alt="仮のロゴマーク"
        priority
        className="absolute size-100 max-w-none shrink-0 opacity-3 grayscale animate-spin [animation-duration:20s] pointer-events-none will-change-transform"
      />
      {children}
    </div>
  );
}
