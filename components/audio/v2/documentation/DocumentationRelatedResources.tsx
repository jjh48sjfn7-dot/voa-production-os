import { RelatedResources, type RelatedResourceItem } from "@/components/shared/RelatedResources";
import type { DocumentationRelatedResource } from "@/data/audio/v2/documentation/types";

interface DocumentationRelatedResourcesProps {
  resources: DocumentationRelatedResource[];
}

export function DocumentationRelatedResources({
  resources,
}: DocumentationRelatedResourcesProps) {
  const items: RelatedResourceItem[] = resources.map((resource) => ({
    title: resource.title,
    href: resource.href,
    icon: resource.icon,
    disabled: resource.disabled,
  }));

  return <RelatedResources items={items} />;
}
