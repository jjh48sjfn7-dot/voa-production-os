"use client";

import { notFound } from "next/navigation";
import { EquipmentDetailPage } from "@/components/audio/v2/equipment/EquipmentDetailPage";
import { getEquipmentBySlug } from "@/data/audio/v2/equipment";

interface EquipmentDetailContentProps {
  slug: string;
}

export function EquipmentDetailContent({ slug }: EquipmentDetailContentProps) {
  const equipment = getEquipmentBySlug(slug);

  if (!equipment) {
    notFound();
  }

  return <EquipmentDetailPage equipment={equipment} />;
}
