"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/ui/button";

export default function AppHome() {
  const router = useRouter();

  const createNewDocument = async () => {
    const { data, error } = await supabase
      .from("documents")
      .insert([{ document: "" }])
      .select()
      .single();

    if (error) {
      console.error("Failed to create document:", error.message);
      return;
    }

    if (data) {
      router.push(`/editor/${data.id}`);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to DocShare</h1>
      <Button onClick={createNewDocument}>Create New Document</Button>
      <div className="mt-6">
        <Link href="/editor" className="text-blue-600 underline">
          View All Documents
        </Link>
      </div>
    </main>
  );
}
