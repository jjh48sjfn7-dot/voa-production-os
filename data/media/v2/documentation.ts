import type { LucideIcon } from "lucide-react";
import { List, Map, Monitor, Network } from "lucide-react";

export interface MediaDocumentationPage {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const mediaDocumentationPages: MediaDocumentationPage[] = [
  {
    id: "media-plot",
    title: "Media Plot",
    href: "/media/documentation/media-plot",
    icon: Map,
  },
  {
    id: "projector-signal-flow",
    title: "Projector Signal Flow",
    href: "/media/documentation/projector-signal-flow",
    icon: Network,
  },
  {
    id: "confidence-monitor-signal-flow",
    title: "Confidence Monitor Signal Flow",
    href: "/media/documentation/confidence-monitor-signal-flow",
    icon: Monitor,
  },
  {
    id: "projection-screen-setup",
    title: "Projection Screen Setup",
    href: "/media/documentation/projection-screen-setup",
    icon: List,
  },
];

export function getMediaDocumentationPage(
  id: string
): MediaDocumentationPage | undefined {
  return mediaDocumentationPages.find((page) => page.id === id);
}

export function getMediaDocumentationPageSlugs(): string[] {
  return mediaDocumentationPages.map((page) => page.id);
}
