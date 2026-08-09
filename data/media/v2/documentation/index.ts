import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import { projectionScreenSetup } from "@/data/media/v2/documentation/content";

const mediaDocumentationContentById: Record<string, DocumentationPageContent> = {
  "projection-screen-setup": projectionScreenSetup,
};

export function getMediaDocumentationContent(
  id: string
): DocumentationPageContent | undefined {
  return mediaDocumentationContentById[id];
}

export { projectionScreenSetup };
