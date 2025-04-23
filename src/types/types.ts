import { Database as DB } from "@/types/generated";

declare global {
  type Database = DB;
  type DocumentRead = DB["public"]["Tables"]["documents"]["Row"];
  type DocumentInsert = DB["public"]["Tables"]["documents"]["Row"];
}
