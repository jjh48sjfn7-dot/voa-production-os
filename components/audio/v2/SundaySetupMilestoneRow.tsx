import { ChevronRight } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";

interface SundaySetupMilestoneRowProps {
  title: string;
  emoji?: string;
}

export function SundaySetupMilestoneRow({ title, emoji }: SundaySetupMilestoneRowProps) {
  const colors = departmentAccents.audio;

  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card}`}
      aria-label={title}
    >
      {emoji && (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/[0.06] ${colors.iconBg}`}
        >
          <span className="text-base leading-none">{emoji}</span>
        </div>
      )}
      <p className="flex-1 text-base font-semibold text-slate-50">{title}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </div>
  );
}
