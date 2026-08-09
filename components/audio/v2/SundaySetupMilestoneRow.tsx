import { ChevronRight } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import { audioStyles } from "@/lib/audio-styles";
import type { ProductionIconId } from "@/lib/production-icons";
import type { DepartmentAccent } from "@/lib/theme";

interface SundaySetupMilestoneRowProps {
  title: string;
  icon?: ProductionIconId;
  accent?: DepartmentAccent;
}

export function SundaySetupMilestoneRow({
  title,
  icon,
  accent = "audio",
}: SundaySetupMilestoneRowProps) {
  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card}`}
      aria-label={title}
    >
      {icon && <SundaySetupSectionIcon icon={icon} accent={accent} />}
      <p className="flex-1 text-base font-semibold text-slate-50">{title}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </div>
  );
}
