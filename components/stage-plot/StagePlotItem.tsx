import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import {
  getEquipmentBySlug,
  getEquipmentItemHref,
} from "@/data/audio/v2/equipment";
import type { StagePlotItemData } from "@/data/stage-plot/types";
import { audioStyles } from "@/lib/audio-styles";

interface StagePlotItemProps {
  item: StagePlotItemData;
}

function getItemHref(item: StagePlotItemData): string | undefined {
  if (item.href) {
    return item.href;
  }

  if (!item.equipmentSlug) {
    return undefined;
  }

  if (!getEquipmentBySlug(item.equipmentSlug)) {
    return undefined;
  }

  return getEquipmentItemHref(item.equipmentSlug);
}

export function StagePlotItem({ item }: StagePlotItemProps) {
  const href = getItemHref(item);

  if (href) {
    return (
      <Link
        href={href}
        className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card} ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.03]`}
      >
        <SundaySetupSectionIcon emoji={item.icon} />
        <p className="flex-1 text-base font-semibold text-slate-50">{item.name}</p>
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
      </Link>
    );
  }

  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card}`}
    >
      <SundaySetupSectionIcon emoji={item.icon} />
      <p className="flex-1 text-base font-semibold text-slate-50">{item.name}</p>
    </div>
  );
}
