"use client";
import exam from "@/components/Test";
import Link from "next/link";
import TitleCard from "./TitleCard";
import { useState } from "react";

//受け取ったオブジェクトの配列をTitleCardに加工して、ページネーションして返す
export default function BlogLinkList() {
  console.log("render");
  const [pageNum, setPageNum] = useState(1);
  //表示件数
  const perPage = 10;
  //ページ数
  let maxPage;
  if (exam.length % perPage === 0) {
    maxPage = Math.trunc(exam.length / perPage);
  } else {
    maxPage = Math.trunc(exam.length / perPage) + 1;
  }

  //加工
  const cardList = exam.map((e, index) => {
    //表示対象に該当するオブジェクトのみ格納
    if (index < pageNum * perPage && index >= (pageNum - 1) * perPage) {
      return (
        <Link href={`/blogs/${e.id}`} key={index}>
          <TitleCard date={e.date} title={e.title} views={e.views}></TitleCard>
        </Link>
      );
    } else {
      return null;
    }
  });

  function nextPage() {
    setPageNum(pageNum + 1);
  }

  function prevPage() {
    setPageNum(pageNum - 1);
  }

  return (
    <>
      <div className="bg-gray-200 rounded-t-xl px-4 py-4 relative z-1 flex flex-col gap-6 overflow-y-scroll w-full h-[520px] lg:h-[600px]">
        {cardList}
      </div>
      <div className="bg-gray-200 rounded-b-xl py-3 z-1 gap-6 w-full h-16">
        <div className="flex flex-col items-center">
          <div className="flex gap-2">
            {pageNum > 1 && (
              <button
                type="button"
                className="bg-gray-50 py-1 px-2 text-gray-500 border border-gray-500 text-lg shrink-0"
                onClick={prevPage}
              >
                ＜
              </button>
            )}
            <span className="bg-gray-50 py-1 px-6 text-gray-500 border border-gray-500 text-lg shrink-0">
              {pageNum}／{maxPage}
            </span>
            {pageNum < maxPage && (
              <button
                type="button"
                className="bg-gray-50 py-1 px-2 text-gray-500 border border-gray-500 text-lg shrink-0"
                onClick={nextPage}
              >
                ＞
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
