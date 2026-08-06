import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import type { DocumentationRelatedResource } from "@/data/audio/v2/documentation/types";

interface DocumentationRelatedResourcesProps {
  resources: DocumentationRelatedResource[];
}

function RelatedResourceRow({
  resource,
}: {
  resource: DocumentationRelatedResource;
}) {
  const isDisabled = resource.disabled || !resource.href;
  const rowClassName =
    "flex min-h-[52px] items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4";

  const content = (
    <>
      <span className="text-xl leading-none" aria-hidden>
        {resource.icon}
      </span>
      <p
        className={`flex-1 ${audioStyles.body} font-medium ${
          isDisabled ? "text-slate-500" : "text-slate-50"
        }`}
      >
        {resource.title}
      </p>
      {!isDisabled && (
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
      )}
    </>
  );

  if (isDisabled) {
    return (
      <div className={rowClassName} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={resource.href!}
      className={`${rowClassName} transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05]`}
    >
      {content}
    </Link>
  );
}

export function DocumentationRelatedResources({
  resources,
}: DocumentationRelatedResourcesProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {resources.map((resource) => (
        <RelatedResourceRow
          key={`${resource.title}-${resource.href ?? "disabled"}`}
          resource={resource}
        />
      ))}
    </div>
  );
}
