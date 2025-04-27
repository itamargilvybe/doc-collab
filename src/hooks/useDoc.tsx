import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function useDocument(id: string) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch initial document
  useEffect(() => {
    const fetchDoc = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("documents")
        .select("document")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching document:", error);
      } else if (data) {
        setContent(data.document);
      }
      setLoading(false);
    };

    fetchDoc();
  }, [id]);

  // Listen for updates from other clients
  useEffect(() => {
    const channel = supabase
      .channel("realtime:documents")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "documents",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Realtime update received:", payload);
          setContent(payload.new.document);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  // Update document content
  const updateContent = async (newContent: string) => {
    try {
      setContent(newContent);

      const { error } = await supabase
        .from("documents")
        .update({
          document: newContent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) {
        console.error("Error updating document:", error);
        // Revert the content if the update failed
        setContent(content);
      }
    } catch (error) {
      console.error("Error updating document:", error);
      // Revert the content if the update failed
      setContent(content);
    }
  };

  return { content, updateContent, loading };
}
