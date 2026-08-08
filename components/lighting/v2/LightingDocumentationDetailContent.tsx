"use client";

import { notFound } from "next/navigation";
import { LightingDmxSignalFlowContent } from "@/components/lighting/v2/LightingDmxSignalFlowContent";
import { LightingDocumentationPageView } from "@/components/lighting/v2/LightingDocumentationPageView";
import { LightingPlotContent } from "@/components/lighting/v2/LightingPlotContent";
import { getLightingDocumentationContent } from "@/data/lighting/v2/documentation/index";
import { getLightingDocumentationPage } from "@/data/lighting/v2/documentation";

interface LightingDocumentationDetailContentProps {
  slug: string;
}

export function LightingDocumentationDetailContent({
  slug,
}: LightingDocumentationDetailContentProps) {
  if (slug === "lighting-plot") {
    return <LightingPlotContent />;
  }

  if (slug === "dmx-signal-flow") {
    return <LightingDmxSignalFlowContent />;
  }

  const page = getLightingDocumentationPage(slug);
  const content = getLightingDocumentationContent(slug);

  if (!page || !content) {
    notFound();
  }

  return (
    <LightingDocumentationPageView
      title={page.title}
      icon={page.icon}
      content={content}
    />
  );
}
