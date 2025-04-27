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
    <div className="w-full h-full">
      <TipTapEditor docID={id} initialContent={initialContent} />
    </div>
  );
}
