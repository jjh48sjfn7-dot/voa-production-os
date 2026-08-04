"use client";

import { notFound } from "next/navigation";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
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

  if (!result) {
    notFound();
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
