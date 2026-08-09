import { MediaDocumentationDetailContent } from "@/components/media/v2/MediaDocumentationDetailContent";
import { getMediaDocumentationPageSlugs } from "@/data/media/v2/documentation";

export function generateStaticParams() {
  return getMediaDocumentationPageSlugs().map((slug) => ({ slug }));
}

interface MediaDocumentationDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function MediaDocumentationDetailPage({
  params,
}: MediaDocumentationDetailPageProps) {
  const { slug } = await params;
  return <MediaDocumentationDetailContent slug={slug} />;
}
