import { EquipmentDetailContent } from "@/components/audio/v2/EquipmentDetailContent";
import { getEquipmentDetailParams } from "@/data/audio/v2/equipment";

export function generateStaticParams() {
  return getEquipmentDetailParams();
}

interface EquipmentDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function EquipmentCategoryDetailPage({
  params,
}: EquipmentDetailPageProps) {
  const { slug } = await params;
  return <EquipmentDetailContent slug={slug} />;
}
