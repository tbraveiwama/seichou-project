
import Image from "next/image";

export default function Header() {
  return (
    <header class="relative flex flex-col gap-3 py-2 bg-sky-300">
      <div class="flex justify-end">
        <span class="text-red-500 pr-2">管理者としてログイン中</span>
      </div>
      <div class="relative flex flex-col items-center">
        <div class="flex items-center gap-9">
          <Image src="/siteLogo.png" width={100} height={100} />
          <span class="text-5xl">サイト名(未定)</span>
        </div>
      </div>
    </header>
  );
}
