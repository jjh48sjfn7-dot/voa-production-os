import { RelatedResources, type RelatedResourceItem } from "@/components/shared/RelatedResources";
import type { DocumentationRelatedResource } from "@/data/audio/v2/documentation/types";
import type { DepartmentAccent } from "@/lib/theme";

interface DocumentationRelatedResourcesProps {
  resources: DocumentationRelatedResource[];
  accent?: DepartmentAccent;
}

export function DocumentationRelatedResources({
  resources,
  accent = "audio",
}: DocumentationRelatedResourcesProps) {
  const items: RelatedResourceItem[] = resources.map((resource) => ({
    title: resource.title,
    href: resource.href,
    icon: resource.icon,
    disabled: resource.disabled,
  }));

  return <RelatedResources items={items} accent={accent} />;
}
