import type { LucideIcon } from "lucide-react";
import type { ProductionIconId } from "@/lib/production-icons";
import type { ReferenceSequenceKey } from "@/lib/reference-photos";

export interface DocumentationPage {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface DocumentationTableColumn {
  key: string;
  label: string;
}

export interface DocumentationTableRow {
  [key: string]: string;
}

export interface DocumentationTableSection {
  title: string;
  columns: DocumentationTableColumn[];
  rows: DocumentationTableRow[];
}

export interface DocumentationListSection {
  title?: string;
  items: string[];
}

export interface DocumentationRelatedResource {
  icon: ProductionIconId;
  title: string;
  href?: string;
  disabled?: boolean;
}

export interface DocumentationInfoSection {
  title: string;
  body: string[];
}

export interface DocumentationChannelAvailableGroup {
  type: "available";
  title: string;
  channels: string;
  status: string;
}

export interface DocumentationChannelAssignment {
  channel: number;
  fields: { label: string; value: string }[];
}

export interface DocumentationChannelAssignmentGroup {
  type: "assignments";
  title: string;
  items: DocumentationChannelAssignment[];
}

export type DocumentationChannelGroup =
  | DocumentationChannelAvailableGroup
  | DocumentationChannelAssignmentGroup;

export interface DocumentationVisualSupplement {
  afterListSectionTitle: string;
  sequenceKey: ReferenceSequenceKey;
}

export interface DocumentationPageContent {
  id: string;
  purpose: string;
  subtitle?: string;
  headerInfo?: DocumentationInfoSection;
  tableSections?: DocumentationTableSection[];
  channelGroups?: DocumentationChannelGroup[];
  listSections?: DocumentationListSection[];
  infoSections?: DocumentationInfoSection[];
  visualSupplements?: DocumentationVisualSupplement[];
  placeholderMessage?: string;
  relatedResources?: DocumentationRelatedResource[];
}
