import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full">
      <header>
        <Link href="/editor">⬅️ All Documents</Link>
      </header>
      <div>{children}</div>
    </div>
  );
}
