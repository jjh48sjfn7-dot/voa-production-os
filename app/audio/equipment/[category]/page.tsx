import { EquipmentCategoryContent } from "@/components/audio/v2/EquipmentCategoryContent";
import { equipmentCategories } from "@/data/audio/v2/equipment";

export function generateStaticParams() {
  return equipmentCategories.map((category) => ({ category: category.id }));
}

interface EquipmentCategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function EquipmentCategoryPage({
  params,
}: EquipmentCategoryPageProps) {
  const { category } = await params;
  return <EquipmentCategoryContent categoryId={category} />;
}
