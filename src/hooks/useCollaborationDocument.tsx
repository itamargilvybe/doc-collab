"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { JSONContent } from "@tiptap/react";

export function useCollaborationDocument(
  id: string,
  initialContent: JSONContent
) {
  const [document, setDocument] = useState<JSONContent | null>(initialContent);
  const clientId = useRef<string>(crypto.randomUUID());
  const channelRef = useRef<any>(null);

  useEffect(() => {
    const channel = supabase.channel(`document-${id}`);

    channelRef.current = channel;

    channel
      .on("broadcast", { event: "doc_update" }, (payload) => {
        if (payload.payload.clientId === clientId.current) return;
        setDocument(payload.payload.document);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const broadcastContent = useCallback((newContent: JSONContent) => {
    channelRef.current?.send({
      type: "broadcast",
      event: "doc_update",
      payload: {
        clientId: clientId.current,
        document: newContent,
      },
    });
  }, []);

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  const applyLocalChanges = (newContent: JSONContent) => {
    setDocument(newContent);
    broadcastContent(newContent);

    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    saveTimeout.current = setTimeout(async () => {
      const { data, error } = await supabase
        .from("documents")
        .update({
          document: newContent,
          updated_at: new Date(),
        })
        .eq("id", id)
        .select();
    }, 1000);
  };

  return { document, applyLocalChanges };
}
