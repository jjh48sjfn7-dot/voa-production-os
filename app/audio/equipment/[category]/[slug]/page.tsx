import { EquipmentDetailContent } from "@/components/audio/v2/EquipmentDetailContent";
import { getEquipmentDetailParams } from "@/data/audio/v2/equipment";

export function generateStaticParams() {
  return getEquipmentDetailParams();
}

interface EquipmentDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function EquipmentDetailPage({
  params,
}: EquipmentDetailPageProps) {
  const { category, slug } = await params;
  return <EquipmentDetailContent categoryId={category} slug={slug} />;
}
