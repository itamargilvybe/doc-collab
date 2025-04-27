import { supabase } from "@/lib/supabase/client";
import createClient from "@/lib/supabase/server";

export const getDocuments = async () => {
  return supabase.from("documents").select("*");
};

export const serverGetDocuments = async () => {
  const supabase = await createClient();
  return supabase.from("documents").select("*");
};

export const createDocument = async (document: DocumentInsert) => {
  const supabase = await createClient();
  return supabase.from("documents").insert(document);
};
