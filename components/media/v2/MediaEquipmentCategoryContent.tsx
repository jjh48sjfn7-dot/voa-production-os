"use client";

import { notFound } from "next/navigation";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { EquipmentItemRow } from "@/components/audio/v2/EquipmentItemRow";
import {
  getMediaCategoryItems,
  getMediaEquipmentCategory,
  getMediaEquipmentItemHref,
} from "@/data/media/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

interface MediaEquipmentCategoryContentProps {
  categoryId: string;
}

export function MediaEquipmentCategoryContent({
  categoryId,
}: MediaEquipmentCategoryContentProps) {
  const category = getMediaEquipmentCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <AudioSubpageHeader
        backHref="/media/equipment"
        backLabel="Back to Equipment"
        title={category.title}
      />

      <div className={`mt-4 divide-y divide-white/[0.06] sm:mt-5 ${audioStyles.card}`}>
        {getMediaCategoryItems(categoryId).map((item) => (
          <EquipmentItemRow
            key={item.id}
            title={item.title}
            href={getMediaEquipmentItemHref(item.slug)}
          />
        ))}
      </div>
    </div>
  );
}
