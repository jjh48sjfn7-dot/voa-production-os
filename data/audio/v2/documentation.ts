import type { LucideIcon } from "lucide-react";
import { BookOpen, FileText, List, Map, Network } from "lucide-react";

export interface DocumentationPage {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const documentationPages: DocumentationPage[] = [
  {
    id: "channel-list",
    title: "Channel List",
    href: "/audio/documentation/channel-list",
    icon: List,
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
    id: "volunteer-guide",
    title: "Volunteer Guide",
    href: "/audio/documentation/volunteer-guide",
    icon: BookOpen,
  },
  {
    id: "wiring-standards",
    title: "Wiring Standards",
    href: "/audio/documentation/wiring-standards",
    icon: FileText,
  },
];

export function getDocumentationPage(id: string): DocumentationPage | undefined {
  return documentationPages.find((page) => page.id === id);
}
