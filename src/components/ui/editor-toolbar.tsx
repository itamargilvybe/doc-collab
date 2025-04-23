export function EditorToolbar() {
  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="flex gap-2 mb-2 border-b pb-2">
      <button onClick={() => exec("bold")}>Bold</button>
      <button onClick={() => exec("italic")}>Italic</button>
      <button onClick={() => exec("insertOrderedList")}>1.</button>
      <button onClick={() => exec("insertUnorderedList")}>•</button>
      <button onClick={() => exec("formatBlock", "<h1>")}>H1</button>
      <button onClick={() => exec("formatBlock", "<pre>")}>Code</button>
    </div>
  );
}
