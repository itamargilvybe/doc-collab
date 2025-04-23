"use client";

import { Suspense, use } from "react";
import Editor from "@/components/editor";

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Editor docID={id} />
    </Suspense>
  );
}
