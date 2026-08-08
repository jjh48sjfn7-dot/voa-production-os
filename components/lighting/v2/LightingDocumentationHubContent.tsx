"use client";

import { BookOpen } from "lucide-react";
import { LightingNavHubContent } from "@/components/lighting/v2/LightingNavHubContent";
import { lightingDocumentationPages } from "@/data/lighting/v2/documentation";

export function LightingDocumentationHubContent() {
  return (
    <LightingNavHubContent
      title="Documentation"
      description="Lighting plots, DMX flow, and fixture reference."
      icon={BookOpen}
      breadcrumbs={[
        { label: "Lighting Department", href: "/lighting" },
        { label: "Documentation" },
      ]}
      sectionTitle="Reference Guides"
      backHref="/lighting"
      backLabel="Back to Lighting Department"
      items={lightingDocumentationPages.map((page) => ({
        id: page.id,
        title: page.title,
        href: page.href,
        icon: page.icon,
      }))}
    />
  );
}
