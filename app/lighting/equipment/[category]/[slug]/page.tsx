import { LightingEquipmentDetailContent } from "@/components/lighting/v2/LightingEquipmentDetailContent";
import { getLightingEquipmentDetailParams } from "@/data/lighting/v2/equipment";

export function generateStaticParams() {
  return getLightingEquipmentDetailParams();
}

interface LightingEquipmentDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function LightingEquipmentCategoryDetailPage({
  params,
}: LightingEquipmentDetailPageProps) {
  const { slug } = await params;
  return <LightingEquipmentDetailContent slug={slug} />;
}
