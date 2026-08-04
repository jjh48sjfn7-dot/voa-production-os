import { DocumentationDetailContent } from "@/components/audio/v2/DocumentationDetailContent";
import { documentationPages } from "@/data/audio/v2/documentation";

export function generateStaticParams() {
  return documentationPages.map((page) => ({ slug: page.id }));
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
