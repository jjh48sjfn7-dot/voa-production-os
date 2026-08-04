import { ChevronRight } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import { audioStyles } from "@/lib/audio-styles";

interface SundaySetupMilestoneRowProps {
  title: string;
  emoji?: string;
}

export function SundaySetupMilestoneRow({ title, emoji }: SundaySetupMilestoneRowProps) {
  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card}`}
      aria-label={title}
    >
      {emoji && <SundaySetupSectionIcon emoji={emoji} />}
      <p className="flex-1 text-base font-semibold text-slate-50">{title}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </div>
  );
}
