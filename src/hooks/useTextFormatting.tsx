export const useTextFormatting = (
  content: string,
  setContent: (val: string) => void,
  onChange: (val: string) => void
) => {
  const applyFormat = (tag: string) => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const formatted = tag === "code" ? `\`${selected}\`` : `**${selected}**`;

    const newContent = content.slice(0, start) + formatted + content.slice(end);
    setContent(newContent);
    onChange(newContent);
  };

  return { applyFormat };
};
