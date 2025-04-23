export default function Textarea({
  id,
  value,
  onChange,
  className,
}: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded resize-none ${className}`}
    />
  );
}
