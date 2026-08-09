import { MediaEquipmentCategoryContent } from "@/components/media/v2/MediaEquipmentCategoryContent";
import { mediaEquipmentCategories } from "@/data/media/v2/equipment";

export function generateStaticParams() {
  return mediaEquipmentCategories.map((category) => ({
    category: category.id,
  }));
}

interface MediaEquipmentCategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function MediaEquipmentCategoryPage({
  params,
}: MediaEquipmentCategoryPageProps) {
  const { category } = await params;
  return <MediaEquipmentCategoryContent categoryId={category} />;
}
