"use client";

import { notFound } from "next/navigation";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { EquipmentItemRow } from "@/components/audio/v2/EquipmentItemRow";
import {
  getLightingCategoryItems,
  getLightingEquipmentCategory,
  getLightingEquipmentItemHref,
} from "@/data/lighting/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

interface LightingEquipmentCategoryContentProps {
  categoryId: string;
}

export function LightingEquipmentCategoryContent({
  categoryId,
}: LightingEquipmentCategoryContentProps) {
  const category = getLightingEquipmentCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <AudioSubpageHeader
        backHref="/lighting/equipment"
        backLabel="Back to Equipment"
        title={category.title}
      />

      <div className={`mt-4 divide-y divide-white/[0.06] sm:mt-5 ${audioStyles.card}`}>
        {getLightingCategoryItems(categoryId).map((item) => (
          <EquipmentItemRow
            key={item.id}
            title={item.title}
            href={getLightingEquipmentItemHref(item.slug)}
          />
        ))}
      </div>
    </div>
  );
}
