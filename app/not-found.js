"use client";
import PageNotFound from "@/components/error/PageNotFound";
import { usePathname } from "next/navigation";

//next.js app routerの仕組み上、[id]下に個別の404エラーページを作ってSSGすることは難しそうなので、エラーページを表示してからパラメータで判断する
export default function NotFound() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blogs/");

  return isBlog ? (
    <PageNotFound>
      <div className="text-2xl text-gray-400 font-normal">
        Page Not Found｜お探しの記事は反映に時間がかかっているか、存在しない記事です
      </div>
      <div className="text-xl text-gray-400 font-normal">
        しばらく経ってからもう一度お試しください
      </div>
    </PageNotFound>
  ) : (
    <PageNotFound>
      <div className="text-2xl text-gray-400 font-normal">
        Page Not Found｜ページが見つかりません
      </div>
    </PageNotFound>
  );
}

