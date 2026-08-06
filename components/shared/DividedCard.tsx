import { audioStyles } from "@/lib/audio-styles";

interface DividedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DividedCard({ children, className }: DividedCardProps) {
  return (
    <div
      className={`divide-y divide-white/[0.06] ${audioStyles.card}${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
}
