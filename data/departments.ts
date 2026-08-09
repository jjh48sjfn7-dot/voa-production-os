import {
  Headphones,
  Lightbulb,
  Monitor,
  Settings,
} from "lucide-react";
import type { Department } from "@/types";
import { voaLabels } from "@/data/audio/venue";

export const departments: Department[] = [
  {
    id: "audio",
    name: voaLabels.audioDepartment,
    description: `${voaLabels.tf5}, ${voaLabels.rio}, ${voaLabels.qscMains}, and ${voaLabels.foh} mixing`,
    href: "/audio",
    icon: Headphones,
    accent: "audio",
    available: true,
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Stage lighting and DMX control",
    href: "/lighting",
    icon: Lightbulb,
    accent: "lighting",
    available: true,
  },
  {
    id: "media",
    name: "Media",
    description: "Presentation displays, projector, and screen setup",
    href: "/media",
    icon: Monitor,
    accent: "media",
    available: true,
  },
  {
    id: "operations",
    name: "Operations",
    description: `Logistics, inventory, and ${voaLabels.volunteerTeam} coordination`,
    href: "/operations",
    icon: Settings,
    accent: "operations",
    available: false,
  },
];
