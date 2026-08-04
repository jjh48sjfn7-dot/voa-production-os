import { audioStyles } from "@/lib/audio-styles";

interface EquipmentSectionProps {
  title: string;
  children: React.ReactNode;
}

export function EquipmentSection({ title, children }: EquipmentSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className={`${audioStyles.heading} text-slate-50`}>{title}</h2>
      {children}
    </section>
  );
}
