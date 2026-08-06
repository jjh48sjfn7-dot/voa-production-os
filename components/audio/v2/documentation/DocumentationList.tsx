import { InfoCard } from "@/components/shared/InfoCard";

interface DocumentationListProps {
  items: string[];
}

export function DocumentationList({ items }: DocumentationListProps) {
  return <InfoCard items={items} />;
}
