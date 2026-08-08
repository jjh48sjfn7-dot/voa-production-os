import { LightingEquipmentDetailContent } from "@/components/lighting/v2/LightingEquipmentDetailContent";
import { getLightingEquipmentItemRouteSlugs } from "@/data/lighting/v2/equipment";

export function generateStaticParams() {
  return getLightingEquipmentItemRouteSlugs().map((slug) => ({ slug }));
}

interface LightingEquipmentItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LightingEquipmentItemPage({
  params,
}: LightingEquipmentItemPageProps) {
  const { slug } = await params;
  return <LightingEquipmentDetailContent slug={slug} />;
}
