"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export function useViews(id) {
  const [views, setViews] = useState(null);
  useEffect(() => {
    const fetchViews = async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("views")
        .eq("page_id", id);
      if (!error) {
        setViews(data[0].views);
      }
    };
    fetchViews();
  },[id]);
  return views;
}
