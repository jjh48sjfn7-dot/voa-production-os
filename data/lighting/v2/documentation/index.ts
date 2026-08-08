import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import { dmxAddressing, fixtureLayout } from "@/data/lighting/v2/documentation/content";

const lightingDocumentationContentById: Record<string, DocumentationPageContent> = {
  "fixture-layout": fixtureLayout,
  "dmx-addressing": dmxAddressing,
};

export function getLightingDocumentationContent(
  id: string
): DocumentationPageContent | undefined {
  return lightingDocumentationContentById[id];
}

export { fixtureLayout, dmxAddressing };
