import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Disc3,
  Headphones,
  Mic2,
  Radio,
  SlidersHorizontal,
  VolumeX,
} from "lucide-react";

export interface TroubleshootingTopic {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const troubleshootingTopics: TroubleshootingTopic[] = [
  {
    id: "no-sound",
    title: "No Sound",
    href: "/audio/troubleshooting/no-sound",
    icon: VolumeX,
  },
  {
    id: "feedback",
    title: "Feedback",
    href: "/audio/troubleshooting/feedback",
    icon: AlertTriangle,
  },
  {
    id: "wireless",
    title: "Wireless",
    href: "/audio/troubleshooting/wireless",
    icon: Mic2,
  },
  {
    id: "playback",
    title: "Playback",
    href: "/audio/troubleshooting/playback",
    icon: Disc3,
  },
  {
    id: "monitors",
    title: "Monitors",
    href: "/audio/troubleshooting/monitors",
    icon: Headphones,
  },
  {
    id: "console",
    title: "Console",
    href: "/audio/troubleshooting/console",
    icon: SlidersHorizontal,
  },
];

export function getTroubleshootingTopic(id: string): TroubleshootingTopic | undefined {
  return troubleshootingTopics.find((topic) => topic.id === id);
}
