"use client";

import { useDocument } from "@/hooks/useDoc";
import { useTextFormatting } from "@/hooks/useTextFormatting";
import Button from "@/components/ui/button";
import Textarea from "./ui/text-area";
import { Loader } from "lucide-react";

export default function Editor({ docID }: { docID: string }) {
  const { content, updateContent, loading } = useDocument(docID);
  const { applyFormat } = useTextFormatting(content, () => {}, updateContent);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(e.target.value);
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Document Editor</h1>
      <div className="mb-2 flex gap-2">
        <Button onClick={() => applyFormat("bold")}>Bold</Button>
        <Button onClick={() => applyFormat("code")}>Code</Button>
      </div>
      <div className="relative">
        <Textarea
          id="editor"
          value={content}
          onChange={handleChange}
          className="w-full h-96"
        />
        {loading && <Loader className="absolute top-1/2 left-1/2" />}
      </div>
    </main>
  );
}
