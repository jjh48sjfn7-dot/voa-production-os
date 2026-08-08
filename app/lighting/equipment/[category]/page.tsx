import { LightingEquipmentCategoryContent } from "@/components/lighting/v2/LightingEquipmentCategoryContent";
import { lightingEquipmentCategories } from "@/data/lighting/v2/equipment";

export function generateStaticParams() {
  return lightingEquipmentCategories.map((category) => ({
    category: category.id,
  }));
}

interface LightingEquipmentCategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function LightingEquipmentCategoryPage({
  params,
}: LightingEquipmentCategoryPageProps) {
  const { category } = await params;
  return <LightingEquipmentCategoryContent categoryId={category} />;
}
