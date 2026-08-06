import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import type { DocumentationRelatedResource } from "@/data/audio/v2/documentation/types";

interface DocumentationRelatedResourcesProps {
  resources: DocumentationRelatedResource[];
}

export function DocumentationRelatedResources({
  resources,
}: DocumentationRelatedResourcesProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {resources.map((resource) => (
        <Link
          key={resource.href}
          href={resource.href}
          className="flex min-h-[52px] items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5 sm:py-4"
        >
          <span className="text-xl leading-none" aria-hidden>
            {resource.icon}
          </span>
          <p className={`flex-1 ${audioStyles.body} font-medium text-slate-50`}>
            {resource.title}
          </p>
          <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
        </Link>
      ))}
    </div>
  );
}
