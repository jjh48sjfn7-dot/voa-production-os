"use client";

import { notFound } from "next/navigation";
import { AudioPlaceholderContent } from "@/components/audio/v2/AudioPlaceholderContent";
import { getDocumentationPage } from "@/data/audio/v2/documentation";
import { voaLabels } from "@/data/audio/venue";

interface DocumentationDetailContentProps {
  slug: string;
}

export function DocumentationDetailContent({ slug }: DocumentationDetailContentProps) {
  const page = getDocumentationPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <AudioPlaceholderContent
      title={page.title}
      icon={page.icon}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Documentation", href: "/audio/documentation" },
        { label: page.title },
      ]}
    />
  );
}
