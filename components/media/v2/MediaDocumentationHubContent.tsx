"use client";

import { BookOpen } from "lucide-react";
import { MediaNavHubContent } from "@/components/media/v2/MediaNavHubContent";
import { mediaDocumentationPages } from "@/data/media/v2/documentation";

export function MediaDocumentationHubContent() {
  return (
    <MediaNavHubContent
      title="Documentation"
      description="Media plots, signal flows, and screen setup reference."
      icon={BookOpen}
      breadcrumbs={[
        { label: "Media Department", href: "/media" },
        { label: "Documentation" },
      ]}
      sectionTitle="Reference Guides"
      backHref="/media"
      backLabel="Back to Media Department"
      items={mediaDocumentationPages.map((page) => ({
        id: page.id,
        title: page.title,
        href: page.href,
        icon: page.icon,
      }))}
    />
  );
}
