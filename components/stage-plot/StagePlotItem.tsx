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
  compact?: boolean;
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

function StagePlotItemContent({
  item,
  compact,
}: {
  item: StagePlotItemData;
  compact?: boolean;
}) {
  const href = getItemHref(item);
  const showNotes = !compact && item.locationNotes && item.locationNotes.length > 0;

  const inner = (
    <>
      <SundaySetupSectionIcon emoji={item.icon} />
      <div className="min-w-0 flex-1 space-y-1.5">
        <p className="text-base font-semibold text-slate-50">{item.name}</p>
        {showNotes &&
          item.locationNotes!.map((note) => (
            <p key={note} className="text-sm leading-relaxed text-slate-400">
              {note}
            </p>
          ))}
      </div>
      {href && <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />}
    </>
  );

  const className = `flex min-h-[56px] items-start gap-3 px-4 py-3.5 sm:px-5 ${
    compact ? "py-3" : ""
  } ${audioStyles.card} ${href ? `${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.03]` : ""}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function StagePlotItem({ item, compact }: StagePlotItemProps) {
  return <StagePlotItemContent item={item} compact={compact} />;
}
