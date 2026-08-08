import type { LucideIcon } from "lucide-react";
import { List, Map, Network, Table } from "lucide-react";

export interface LightingDocumentationPage {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const lightingDocumentationPages: LightingDocumentationPage[] = [
  {
    id: "lighting-plot",
    title: "Lighting Plot",
    href: "/lighting/documentation/lighting-plot",
    icon: Map,
  },
  {
    id: "dmx-signal-flow",
    title: "DMX Signal Flow",
    href: "/lighting/documentation/dmx-signal-flow",
    icon: Network,
  },
  {
    id: "fixture-layout",
    title: "Fixture Layout",
    href: "/lighting/documentation/fixture-layout",
    icon: Table,
  },
  {
    id: "dmx-addressing",
    title: "DMX Addressing",
    href: "/lighting/documentation/dmx-addressing",
    icon: List,
  },
];

export function getLightingDocumentationPage(
  id: string
): LightingDocumentationPage | undefined {
  return lightingDocumentationPages.find((page) => page.id === id);
}

export function getLightingDocumentationPageSlugs(): string[] {
  return lightingDocumentationPages.map((page) => page.id);
}
