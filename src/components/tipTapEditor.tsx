"use client";

import { useCollaborationDocument } from "@/hooks/useCollaborationDocument";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Toolbar from "./toolbar";
import { useEffect } from "react";

export default function TipTapEditor({
  docID,
  initialContent,
}: {
  docID: string;
  initialContent: JSONContent;
}) {
  const { document, applyLocalChanges } = useCollaborationDocument(
    docID,
    initialContent
  );
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const content = editor.getJSON();
      applyLocalChanges(content);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && document) {
      editor.commands.setContent(document);
    }
  }, [editor, document]);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-screen">
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="flex-1 overflow-y-auto p-4 prose max-w-none"
      />
    </div>
  );
}
