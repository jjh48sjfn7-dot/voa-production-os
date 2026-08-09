import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import { getEquipmentItemHref } from "@/data/audio/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";
import type { ProductionIconId } from "@/lib/production-icons";
import type { DepartmentAccent } from "@/lib/theme";

interface SignalFlowEquipmentCardProps {
  name: string;
  icon: ProductionIconId;
  equipmentSlug: string;
  accent?: DepartmentAccent;
}

export function SignalFlowEquipmentCard({
  name,
  icon,
  equipmentSlug,
  accent = "audio",
}: SignalFlowEquipmentCardProps) {
  return (
    <Link
      href={getEquipmentItemHref(equipmentSlug)}
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card} ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.03]`}
    >
      <SundaySetupSectionIcon icon={icon} accent={accent} />
      <p className="flex-1 text-base font-semibold text-slate-50">{name}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </Link>
  );
}
