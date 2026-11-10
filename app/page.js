"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";

export default function Index() {
  return (
    <span className="relative group">
      <span
        className={[
          "whitespace-nowrap",
          "rounded",
          "bg-black",
          "px-2",
          "py-1",
          "text-white",
          "absolute",
          "-top-10",
          "left-1/2",
          "-translate-x-1/2",
          "before:content-['']",
          "before:absolute",
          "before:-translate-x-1/2",
          "before:left-1/2",
          "before:top-full",
          "before:border-4",
          "before:border-transparent",
          "before:border-t-black",
          "opacity-0",
          "group-hover:opacity-100",
          "transition",
          "pointer-events-none",
        ].join(" ")}
      >
        Hello World
      </span>
      <button className="rounded border bg-white px-2 py-1 shadow transition hover:bg-gray-100">
        Button
      </button>
    </span>
  );
}
