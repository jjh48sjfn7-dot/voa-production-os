"use client";

import { notFound } from "next/navigation";
import { AudioPlaceholderContent } from "@/components/audio/v2/AudioPlaceholderContent";
import { getEquipmentCategory } from "@/data/audio/v2/equipment";
import { voaLabels } from "@/data/audio/venue";

interface EquipmentCategoryContentProps {
  categoryId: string;
}

export function EquipmentCategoryContent({ categoryId }: EquipmentCategoryContentProps) {
  const category = getEquipmentCategory(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <AudioPlaceholderContent
      title={category.title}
      icon={category.icon}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Equipment", href: "/audio/equipment" },
        { label: category.title },
      ]}
    />
  );
}
