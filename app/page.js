"use client";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import NotFound from "./not-found";

export default function Index() {
  return (
    <NotFound />
  );
}
