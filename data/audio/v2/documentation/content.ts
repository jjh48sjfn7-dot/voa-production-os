import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import { inputPatchList } from "@/data/audio/v2/documentation/input-patch-list";
import { outputRouting } from "@/data/audio/v2/documentation/output-routing";
import {
  signalFlowPlaceholder,
  stagePlotPlaceholder,
} from "@/data/audio/v2/documentation/placeholders";
import { tf5ChannelList } from "@/data/audio/v2/documentation/tf5-channel-list";
import { volunteerGuide } from "@/data/audio/v2/documentation/volunteer-guide";
import { wiringStandards } from "@/data/audio/v2/documentation/wiring-standards";

const documentationContentById: Record<string, DocumentationPageContent> = {
  "input-patch-list": inputPatchList,
  "tf5-channel-list": tf5ChannelList,
  "channel-list": tf5ChannelList,
  "output-routing": outputRouting,
  "signal-flow": signalFlowPlaceholder,
  "stage-plot": stagePlotPlaceholder,
  "wiring-standards": wiringStandards,
  "volunteer-guide": volunteerGuide,
};

export function getDocumentationContent(
  id: string
): DocumentationPageContent | undefined {
  return documentationContentById[id];
}

export {
  inputPatchList,
  outputRouting,
  signalFlowPlaceholder,
  stagePlotPlaceholder,
  tf5ChannelList,
  volunteerGuide,
  wiringStandards,
};

export type {
  DocumentationInfoSection,
  DocumentationListSection,
  DocumentationPageContent,
  DocumentationRelatedResource,
  DocumentationTableColumn,
  DocumentationTableRow,
  DocumentationTableSection,
} from "@/data/audio/v2/documentation/types";
