import type { LucideIcon } from "lucide-react";

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
  icon: string;
  title: string;
  href?: string;
  disabled?: boolean;
}

export interface DocumentationPageContent {
  id: string;
  purpose: string;
  subtitle?: string;
  tableSections?: DocumentationTableSection[];
  listSections?: DocumentationListSection[];
  placeholderMessage?: string;
  relatedResources?: DocumentationRelatedResource[];
}
