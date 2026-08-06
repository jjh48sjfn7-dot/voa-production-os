"use client";

import { notFound } from "next/navigation";
import { DocumentationPageView } from "@/components/audio/v2/documentation/DocumentationPageView";
import {
  getDocumentationContent,
} from "@/data/audio/v2/documentation/content";
import {
  getDocumentationPage,
} from "@/data/audio/v2/documentation";

interface DocumentationDetailContentProps {
  slug: string;
}

export function DocumentationDetailContent({ slug }: DocumentationDetailContentProps) {
  const page = getDocumentationPage(slug);
  const content = getDocumentationContent(slug);

  if (!page || !content) {
    notFound();
  }

  return (
    <DocumentationPageView
      title={page.title}
      icon={page.icon}
      content={content}
    />
  );
}
