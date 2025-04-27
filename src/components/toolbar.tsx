"use client";

import { Editor } from "@tiptap/react";

export default function Toolbar({ editor }: { editor: Editor }) {
  const buttonCls = "px-3 py-1 text-sm border rounded hover:bg-gray-100";

  return (
    <div className="flex gap-2 p-2 border-b">
      <button
        className={buttonCls}
        onClick={() => editor.chain().toggleMark("bold").run()}
      >
        <b>B</b>
      </button>
      <button
        className={buttonCls}
        onClick={() => editor.chain().toggleMark("italic").run()}
      >
        <i>I</i>
      </button>
      <button
        className={buttonCls}
        onClick={() => editor.chain().toggleMark("underline").run()}
      >
        <u>U</u>
      </button>
      <button
        className={buttonCls}
        onClick={() => editor.chain().toggleMark("code").run()}
      >
        <code>&lt;/&gt;</code>
      </button>
    </div>
  );
}
