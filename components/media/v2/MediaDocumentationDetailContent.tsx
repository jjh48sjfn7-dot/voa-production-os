"use client";

import { notFound } from "next/navigation";
import { MediaConfidenceMonitorSignalFlowContent } from "@/components/media/v2/MediaConfidenceMonitorSignalFlowContent";
import { MediaDocumentationPageView } from "@/components/media/v2/MediaDocumentationPageView";
import { MediaPlotContent } from "@/components/media/v2/MediaPlotContent";
import { MediaProjectorSignalFlowContent } from "@/components/media/v2/MediaProjectorSignalFlowContent";
import { getMediaDocumentationContent } from "@/data/media/v2/documentation/index";
import { getMediaDocumentationPage } from "@/data/media/v2/documentation";

interface MediaDocumentationDetailContentProps {
  slug: string;
}

export function MediaDocumentationDetailContent({
  slug,
}: MediaDocumentationDetailContentProps) {
  if (slug === "media-plot") {
    return <MediaPlotContent />;
  }

  if (slug === "projector-signal-flow") {
    return <MediaProjectorSignalFlowContent />;
  }

  if (slug === "confidence-monitor-signal-flow") {
    return <MediaConfidenceMonitorSignalFlowContent />;
  }

  const page = getMediaDocumentationPage(slug);
  const content = getMediaDocumentationContent(slug);

  if (!page || !content) {
    notFound();
  }

  return (
    <MediaDocumentationPageView
      title={page.title}
      icon={page.icon}
      content={content}
    />
  );
}
