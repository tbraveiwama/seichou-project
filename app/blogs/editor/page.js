import { Suspense } from "react";
import EditorContent from "./components/EditorContent";

export default function EditorPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <EditorContent />
    </Suspense>
  );
}