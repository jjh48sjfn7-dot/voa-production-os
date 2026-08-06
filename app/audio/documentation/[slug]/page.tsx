import { DocumentationDetailContent } from "@/components/audio/v2/DocumentationDetailContent";
import { getDocumentationPageSlugs } from "@/data/audio/v2/documentation";

export function generateStaticParams() {
  return getDocumentationPageSlugs().map((slug) => ({ slug }));
}

interface DocumentationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocumentationDetailPage({
  params,
}: DocumentationDetailPageProps) {
  const { slug } = await params;
  return <DocumentationDetailContent slug={slug} />;
}
