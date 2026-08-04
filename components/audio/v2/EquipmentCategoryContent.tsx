"use client";

import { notFound } from "next/navigation";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { EquipmentItemRow } from "@/components/audio/v2/EquipmentItemRow";
import { getEquipmentCategory } from "@/data/audio/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

interface EquipmentCategoryContentProps {
  categoryId: string;
}

export function EquipmentCategoryContent({
  categoryId,
}: EquipmentCategoryContentProps) {
  const category = getEquipmentCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <AudioSubpageHeader
        backHref="/audio/equipment"
        backLabel="Back to Equipment"
        title={category.title}
      />

      <div className={`mt-4 divide-y divide-white/[0.06] sm:mt-5 ${audioStyles.card}`}>
        {category.items.map((item) => (
          <EquipmentItemRow
            key={item.id}
            title={item.title}
            href={`${category.href}/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
