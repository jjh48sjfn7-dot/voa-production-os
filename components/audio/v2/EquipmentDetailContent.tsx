"use client";

import { notFound } from "next/navigation";
import { EquipmentManualContent } from "@/components/audio/v2/equipment/EquipmentManualContent";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { getEquipmentManual } from "@/data/audio/v2/equipment-manuals";
import { getEquipmentItem } from "@/data/audio/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

interface EquipmentDetailContentProps {
  categoryId: string;
  slug: string;
}

export function EquipmentDetailContent({
  categoryId,
  slug,
}: EquipmentDetailContentProps) {
  const result = getEquipmentItem(categoryId, slug);
  const manual = getEquipmentManual(slug);

  if (!result) {
    notFound();
  }

  if (manual) {
    return <EquipmentManualContent manual={manual} />;
  }

  const { category, item } = result;

  return (
    <div>
      <AudioSubpageHeader
        backHref={category.href}
        backLabel={`Back to ${category.title}`}
        title={item.title}
      />

      <div className={`mt-4 sm:mt-5 ${audioStyles.card} ${audioStyles.cardPad}`}>
        <p className={`${audioStyles.body} text-slate-500`}>Details coming later</p>
      </div>
    </div>
  );
}
