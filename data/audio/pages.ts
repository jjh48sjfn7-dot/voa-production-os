import {
  AlertTriangle,
  BookOpen,
  Headphones,
  Map,
  Mic2,
  Package,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import type { AudioPageMeta } from "@/types/audio";
import { voaLabels, voaVenue } from "@/data/audio/venue";

export const audioPages: AudioPageMeta[] = [
  {
    id: "production",
    title: voaLabels.sundayExperience,
    description: `${voaVenue.church} — countdown, timeline, ${voaLabels.productionReady}, and ${voaLabels.qscMains} status.`,
    href: "/audio/production",
    icon: Radio,
  },
  {
    id: "setup",
    title: "Pre-Service Checklist",
    description: `${voaLabels.preService} setup for ${voaVenue.church} — trailer through team prayer before ${voaLabels.serviceLive}.`,
    href: "/audio/setup",
    icon: BookOpen,
  },
  {
    id: "tf5",
    title: voaLabels.tf5,
    description: `${voaLabels.foh} — ${voaLabels.rio} routing, VOA scenes, and ${voaLabels.preService} checks.`,
    href: "/audio/tf5",
    icon: SlidersHorizontal,
  },
  {
    id: "channels",
    title: "Channel List",
    description: `${voaLabels.tf5} patch sheet — ${voaLabels.stageLeft} & ${voaLabels.stageRight} inputs, gain targets, monitor sends.`,
    href: "/audio/channels",
    icon: Mic2,
  },
  {
    id: "diagram",
    title: "System Diagram",
    description: `${voaLabels.rio} → ${voaLabels.tf5} → ${voaLabels.qscMains} and monitor path.`,
    href: "/audio/diagram",
    icon: Map,
  },
  {
    id: "inventory",
    title: "Inventory",
    description: `${voaLabels.audioDepartment} asset tracking — ${voaLabels.preService} and ${voaLabels.postService} checks.`,
    href: "/audio/inventory",
    icon: Package,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: `${voaLabels.audioDepartment} diagnostic wizards for ${voaLabels.foh} and stage issues.`,
    href: "/audio/troubleshooting",
    icon: AlertTriangle,
  },
];

export const audioHubMeta = {
  title: voaLabels.audioDepartment,
  description: `${voaVenue.church} — ${voaLabels.tf5}, ${voaLabels.rio}, ${voaLabels.qscMains}, patch sheets, and ${voaLabels.sundayExperience} tools.`,
  icon: Headphones,
};

export function getAudioPage(id: string): AudioPageMeta | undefined {
  return audioPages.find((p) => p.id === id);
}
