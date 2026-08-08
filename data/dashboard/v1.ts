import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  Map,
  Mic2,
  Package,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import { voaLabels } from "@/data/audio/venue";

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  primary?: boolean;
}

export const dashboardQuickActions: QuickAction[] = [
  {
    id: "production",
    label: voaLabels.sundayExperience,
    description: "Live Sunday Experience dashboard",
    href: "/audio/production",
    icon: Radio,
    primary: true,
  },
  {
    id: "setup",
    label: "Pre-Service Checklist",
    description: `${voaLabels.preService} · Audio Department`,
    href: "/audio/setup",
    icon: BookOpen,
    primary: true,
  },
  {
    id: "tf5",
    label: voaLabels.tf5,
    description: `${voaLabels.foh} console reference`,
    href: "/audio/tf5",
    icon: SlidersHorizontal,
  },
  {
    id: "channels",
    label: "Channel List",
    description: `${voaLabels.tf5} patch sheet`,
    href: "/audio/channels",
    icon: Mic2,
  },
  {
    id: "diagram",
    label: "System Diagram",
    description: `${voaLabels.rio} → ${voaLabels.tf5} → ${voaLabels.foh}`,
    href: "/audio/diagram",
    icon: Map,
  },
  {
    id: "inventory",
    label: "Inventory",
    description: `${voaLabels.productionReady} tracking`,
    href: "/audio/inventory",
    icon: Package,
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    description: "Audio Department diagnostics",
    href: "/audio/troubleshooting",
    icon: AlertTriangle,
  },
];

export interface EmergencyCategory {
  id: string;
  label: string;
  href: string;
}

export const emergencyCategories: EmergencyCategory[] = [
  { id: "no-signal", label: "No Signal", href: "/audio/troubleshooting/no-foh-audio" },
  { id: "feedback", label: "Feedback", href: "/audio/troubleshooting/feedback" },
  { id: "wireless", label: "Wireless", href: "/audio/troubleshooting/no-wireless-microphone" },
  { id: "console", label: voaLabels.tf5, href: "/audio/tf5#emergency-no-audio" },
  { id: "power", label: "Power", href: "/audio/tf5#emergency-power" },
  { id: "stagebox", label: voaLabels.rio, href: "/audio/diagram" },
];

export interface ServiceMilestone {
  id: string;
  time: string;
  title: string;
  description: string;
}

export const serviceTimelineMilestones: ServiceMilestone[] = [
  {
    id: "pre-service",
    time: "8:00 AM",
    title: voaLabels.preService,
    description: "Trailer unload, Yamaha TF5 rack, Rio3224-D2 line check",
  },
  {
    id: "practice",
    time: "9:00 AM",
    title: "Worship Practice",
    description: "Full band sound check & monitor ring-out at FOH",
  },
  {
    id: "prayer",
    time: "9:45 AM",
    title: "Prayer",
    description: `${voaLabels.volunteerTeam} — review Sunday Experience flow`,
  },
  {
    id: "doors",
    time: "10:15 AM",
    title: "Doors Open",
    description: "Recall VOA Sunday Worship on Yamaha TF5, ambient playback",
  },
  {
    id: "service-live",
    time: "10:30 AM",
    title: voaLabels.serviceLive,
    description: "Welcome, worship, message — pastor mic live",
  },
  {
    id: "post-service",
    time: "12:15 PM",
    title: voaLabels.postService,
    description: "Teardown, inventory check, load trailer",
  },
];
