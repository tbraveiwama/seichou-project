"use client"
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { TitleText } from "@/components/ui/text/TitleText";
import Link from "next/link";
import { useRef } from "react";

export default function SearchMenu({ sort, setSort, setSearchWord }) {
  //ここでしか使わない、検索バーに入力された文字を取り出すためのref
  const inputRef = useRef(null);
  return (
    <div className="flex flex-col gap-5 items-center lg:gap-9 pb-5">
      <TitleText>記事一覧</TitleText>
      <div className="flex gap-2 lg:gap-9">
        <input
          type="text"
          className="bg-white rounded-full h-8 lg:h-10 w-2/3 lg:w-120 shadow-md px-4"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchWord(inputRef.current.value);
            }
          }}
        ></input>
        <Button
          backGroundColor="sky"
          textColor="white"
          onClick={() => setSearchWord(inputRef.current.value)}
        >
          検索
        </Button>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">作成日時 ▼</option>
          <option value="views">閲覧数 ▼</option>
        </Select>
        <Link href="/blogs/editor" className="hidden lg:inline">
          <Button backGroundColor="orange" textColor="white">
            新規作成
          </Button>
        </Link>
      </div>
    </div>
  );
}
