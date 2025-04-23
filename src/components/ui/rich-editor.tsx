// components/ui/RichEditor.tsx
import { useRef, useEffect } from "react";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export function RichEditor({ content, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== content) {
      ref.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (ref.current) {
      onChange(ref.current.innerHTML);
    }
  };

  return (
    <div
      ref={ref}
      contentEditable
      onInput={handleInput}
      className="border p-2 rounded w-full min-h-[20rem] outline-none"
    />
  );
}
