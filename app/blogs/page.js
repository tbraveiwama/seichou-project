import { Base } from "@/components/ui/Base";
import Button from "@/components/ui/Button";
import Test from "@/components/Test";
import SearchMenu from "./components/SearchMenu";
import BlogLinkList from "./components/BlogLinkList";

export default function pages() {
  return (
    <>
      <Base>
        <SearchMenu />
        <div>
          <div className="pl-4 flex gap-1 relative z-0">
            <span className="bg-sky-300 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0">
              記事
            </span>
            <span className="bg-sky-200 px-4 pt-1 text-xl rounded-t-xl text-white shrink-0">
              履歴
            </span>
          </div>
          <BlogLinkList></BlogLinkList>
        </div>
      </Base>
    </>
  );
}
