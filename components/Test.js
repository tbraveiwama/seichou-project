import TitleCard from "@/app/blogs/components/TitleCard";
import Link from "next/link";

export default function Test() {
  let elements = [];
  for (let e = 0; e <= 10; e++) {
    elements.push(
      <Link href="/blogs/1" key={e}>
        <TitleCard
          date={"2026/10/7"}
          title={
            "VirtualBoxでFreeBSDの仮想環境を作ってPHPを勉強する(1/3)　VirtualBoxインストール～SSH接続まで"
          }
          views={"12"}
        ></TitleCard>
      </Link>,
    );
  }
  return <>{elements}</>;
}
