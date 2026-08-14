import {
  documentationPages,
  getDocumentationPage as getAudioDocumentationPage,
  type DocumentationPage,
} from "@/data/audio/v2/documentation";
import { getDocumentationContent as getAudioDocumentationContent } from "@/data/audio/v2/documentation/content";
import { signalFlowVolunteerDocument } from "@/data/audio/v2/documentation/signal-flow";
import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import {
  getLightingDocumentationPage,
  lightingDocumentationPages,
  type LightingDocumentationPage,
} from "@/data/lighting/v2/documentation";
import { getLightingDocumentationContent } from "@/data/lighting/v2/documentation/index";
import { lightingDmxSignalFlowDocument } from "@/data/lighting/v2/documentation/dmx-signal-flow";
import {
  getMediaDocumentationPage,
  mediaDocumentationPages,
  type MediaDocumentationPage,
} from "@/data/media/v2/documentation";
import { getMediaDocumentationContent } from "@/data/media/v2/documentation/index";
import { mediaProjectorSignalFlowDocument } from "@/data/media/v2/documentation/projector-signal-flow";
import { mediaConfidenceMonitorSignalFlowDocument } from "@/data/media/v2/documentation/confidence-monitor-signal-flow";
import type { ProductionDepartmentId } from "@/lib/production-os/departments";

export type ProductionDocumentationPage =
  | DocumentationPage
  | LightingDocumentationPage
  | MediaDocumentationPage;

export function getDepartmentDocumentationPages(
  departmentId: ProductionDepartmentId
): ProductionDocumentationPage[] {
  switch (departmentId) {
    case "audio":
      return documentationPages;
    case "lighting":
      return lightingDocumentationPages;
    case "media":
      return mediaDocumentationPages;
  }
}

export function getDocumentationPage(
  departmentId: ProductionDepartmentId,
  pageId: string
): ProductionDocumentationPage | undefined {
  switch (departmentId) {
    case "audio":
      return getAudioDocumentationPage(pageId);
    case "lighting":
      return getLightingDocumentationPage(pageId);
    case "media":
      return getMediaDocumentationPage(pageId);
  }
}

export function getDocumentationContent(
  departmentId: ProductionDepartmentId,
  pageId: string
): DocumentationPageContent | undefined {
  switch (departmentId) {
    case "audio":
      return getAudioDocumentationContent(pageId);
    case "lighting":
      return getLightingDocumentationContent(pageId);
    case "media":
      return getMediaDocumentationContent(pageId);
  }
}

/** Live Audio signal-flow document — not the placeholder content record. */
export function getAudioSignalFlowDocument() {
  return signalFlowVolunteerDocument;
}

export function getLightingDmxSignalFlowDocument() {
  return lightingDmxSignalFlowDocument;
}

export function getMediaProjectorSignalFlowDocument() {
  return mediaProjectorSignalFlowDocument;
}

export function getMediaConfidenceMonitorSignalFlowDocument() {
  return mediaConfidenceMonitorSignalFlowDocument;
}
