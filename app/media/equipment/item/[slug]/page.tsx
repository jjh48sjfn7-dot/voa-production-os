import { MediaEquipmentDetailContent } from "@/components/media/v2/MediaEquipmentDetailContent";
import { getMediaEquipmentItemRouteSlugs } from "@/data/media/v2/equipment";

export function generateStaticParams() {
  return getMediaEquipmentItemRouteSlugs().map((slug) => ({ slug }));
}

interface MediaEquipmentItemPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MediaEquipmentItemPage({
  params,
}: MediaEquipmentItemPageProps) {
  const { slug } = await params;
  return <MediaEquipmentDetailContent slug={slug} />;
}
