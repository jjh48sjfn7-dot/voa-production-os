import { audioStyles } from "@/lib/audio-styles";

interface DocumentationInfoCardProps {
  body: string[];
}

export function DocumentationInfoCard({ body }: DocumentationInfoCardProps) {
  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-3`}>
      {body.map((paragraph) => (
        <p key={paragraph} className={`${audioStyles.body} text-slate-300`}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
