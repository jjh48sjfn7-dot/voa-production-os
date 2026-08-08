import { LightingDocumentationDetailContent } from "@/components/lighting/v2/LightingDocumentationDetailContent";
import { getLightingDocumentationPageSlugs } from "@/data/lighting/v2/documentation";

export function generateStaticParams() {
  return getLightingDocumentationPageSlugs().map((slug) => ({ slug }));
}

interface LightingDocumentationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LightingDocumentationDetailPage({
  params,
}: LightingDocumentationDetailPageProps) {
  const { slug } = await params;
  return <LightingDocumentationDetailContent slug={slug} />;
}
