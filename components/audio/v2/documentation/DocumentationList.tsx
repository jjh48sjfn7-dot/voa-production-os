import { audioStyles } from "@/lib/audio-styles";

interface DocumentationListProps {
  items: string[];
}

export function DocumentationList({ items }: DocumentationListProps) {
  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad}`}>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className={`${audioStyles.body} text-slate-300`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
