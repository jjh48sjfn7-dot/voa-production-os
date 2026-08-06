import { audioStyles } from "@/lib/audio-styles";

interface InfoCardParagraphsProps {
  paragraphs: string[];
  items?: never;
}

interface InfoCardListProps {
  items: string[];
  paragraphs?: never;
}

type InfoCardProps = InfoCardParagraphsProps | InfoCardListProps;

export function InfoCard(props: InfoCardProps) {
  if (props.paragraphs) {
    return (
      <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-3`}>
        {props.paragraphs.map((paragraph) => (
          <p key={paragraph} className={`${audioStyles.body} text-slate-300`}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad}`}>
      <ul className="space-y-2">
        {props.items.map((item) => (
          <li key={item} className={`${audioStyles.body} text-slate-300`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
