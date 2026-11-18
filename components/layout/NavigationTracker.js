//パスが変わるたびに発火しページの遷移回数を記録する
"use client";

import { markPageView } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavigationTracker() {
  const pathName = usePathname();
  useEffect(() => {
    markPageView();
  }, [pathName]);
  return null;
}
