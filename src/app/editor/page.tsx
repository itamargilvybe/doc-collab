import { serverGetDocuments } from "@/db/queries/documents";
import Link from "next/link";

export default async function DocumentsListPage() {
  const { data: docs } = await serverGetDocuments();

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Documents</h1>
      <ul className="space-y-2">
        {docs?.map((doc) => (
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
