import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Cable,
  FileText,
  List,
  Map,
  Network,
  Route,
} from "lucide-react";

export interface DocumentationPage {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const documentationPages: DocumentationPage[] = [
  {
    id: "input-patch-list",
    title: "Input Patch List",
    href: "/audio/documentation/input-patch-list",
    icon: Cable,
  },
  {
    id: "tf5-channel-list",
    title: "TF5 Channel List",
    href: "/audio/documentation/tf5-channel-list",
    icon: List,
  },
  {
    id: "output-routing",
    title: "Output Routing",
    href: "/audio/documentation/output-routing",
    icon: Route,
  },
  {
    id: "signal-flow",
    title: "Signal Flow",
    href: "/audio/documentation/signal-flow",
    icon: Network,
  },
  {
    id: "stage-plot",
    title: "Stage Plot",
    href: "/audio/documentation/stage-plot",
    icon: Map,
  },
  {
    id: "wiring-standards",
    title: "Wiring Standards",
    href: "/audio/documentation/wiring-standards",
    icon: FileText,
  },
  {
    id: "volunteer-guide",
    title: "Volunteer Guide",
    href: "/audio/documentation/volunteer-guide",
    icon: BookOpen,
  },
];

export function getDocumentationPage(id: string): DocumentationPage | undefined {
  if (id === "channel-list") {
    return documentationPages.find((page) => page.id === "tf5-channel-list");
  }

  return documentationPages.find((page) => page.id === id);
}

export function getDocumentationPageSlugs(): string[] {
  return [...documentationPages.map((page) => page.id), "channel-list"];
}
