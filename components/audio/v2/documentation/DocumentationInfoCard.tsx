import { InfoCard } from "@/components/shared/InfoCard";

interface DocumentationInfoCardProps {
  body: string[];
}

export function DocumentationInfoCard({ body }: DocumentationInfoCardProps) {
  return <InfoCard paragraphs={body} />;
}
