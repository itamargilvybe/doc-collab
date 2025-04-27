import { Suspense, use } from "react";
import Editor from "@/components/editor";
import { Loader } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import TipTapEditor from "@/components/tipTapEditor";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("documents")
    .select("document")
    .eq("id", id)
    .single();

  const initialContent = data?.document;

  return (
    // <Suspense fallback={<Loader />}>
    //   <Editor docID={id} />
    // </Suspense>
    <div className="w-full h-full">
      <TipTapEditor docID={id} initialContent={initialContent} />
    </div>
  );
}
