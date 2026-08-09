import { MediaEquipmentDetailContent } from "@/components/media/v2/MediaEquipmentDetailContent";
import { getMediaEquipmentDetailParams } from "@/data/media/v2/equipment";

export function generateStaticParams() {
  return getMediaEquipmentDetailParams();
}

interface MediaEquipmentCategoryDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export default async function MediaEquipmentCategoryDetailPage({
  params,
}: MediaEquipmentCategoryDetailPageProps) {
  const { slug } = await params;
  return <MediaEquipmentDetailContent slug={slug} />;
}
