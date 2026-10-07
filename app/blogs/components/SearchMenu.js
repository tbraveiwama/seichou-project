import Button from "@/components/ui/Button";
import Select from "@/components/ui/Slect";
import { TitleText } from "@/components/ui/text/TitleText";
import Link from "next/link";

export default function SearchMenu() {
  return (
    <div className="flex flex-col gap-5 items-center lg:gap-9 pb-5">
      <TitleText>記事一覧</TitleText>
      <div className="flex gap-2 lg:gap-9">
        <input
          type="text"
          className="bg-white rounded-full h-8 lg:h-10 w-2/3 lg:w-120 shadow-md px-4"
        ></input>
        <Button backGroundColor="sky" textColor="white">
          検索
        </Button>
        <Select>
          <option>作成日時 ▼</option>
          <option>閲覧数 ▼</option>
        </Select>
        <Link
          href="/blogs/1/editor"
          className="hidden lg:inline"
        >
          <Button backGroundColor="orange" textColor="white">
            新規作成
          </Button>
        </Link>
      </div>
    </div>
  );
}
