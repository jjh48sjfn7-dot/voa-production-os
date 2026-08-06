import { audioStyles } from "@/lib/audio-styles";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="space-y-3">
      <h2 className={`${audioStyles.heading} text-slate-50`}>{title}</h2>
      {children}
    </section>
  );
}
