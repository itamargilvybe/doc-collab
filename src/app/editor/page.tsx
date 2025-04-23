"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function DocumentsListPage() {
  const [docs, setDocs] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const { data } = await supabase
        .from("documents")
        .select("id")
        .order("created_at", { ascending: false });

      if (data) setDocs(data);
    };

    fetchDocs();
  }, []);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Documents</h1>
      <ul className="space-y-2">
        {docs.map((doc) => (
          <li key={doc.id}>
            <Link
              href={`/editor/${doc.id}`}
              className="text-blue-600 underline"
            >
              Document {doc.id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
