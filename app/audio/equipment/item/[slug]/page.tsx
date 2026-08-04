import { EquipmentDetailContent } from "@/components/audio/v2/EquipmentDetailContent";
import { getEquipmentItemRouteSlugs } from "@/data/audio/v2/equipment";

export function generateStaticParams() {
  return getEquipmentItemRouteSlugs().map((slug) => ({ slug }));
}

interface EquipmentItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EquipmentItemPage({ params }: EquipmentItemPageProps) {
  const { slug } = await params;
  return <EquipmentDetailContent slug={slug} />;
}
