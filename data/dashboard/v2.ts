import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  Headphones,
  LayoutGrid,
  Lightbulb,
  Monitor,
  Package,
  Search,
  Settings,
  Video,
} from "lucide-react";
import type { DepartmentAccent } from "@/lib/theme";

export interface DashboardContinueItem {
  href: string;
  eyebrow: string;
  title: string;
}

export interface DashboardDepartmentItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: DepartmentAccent;
}

export interface DashboardQuickAccessItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  action?: "focus-search";
}

export const dashboardContinue: DashboardContinueItem = {
  href: "/audio/setup",
  eyebrow: "Resume where you left off",
  title: "Pre-Service Checklist",
};

export const dashboardDepartments: DashboardDepartmentItem[] = [
  {
    id: "audio",
    name: "Audio",
    description: "Sound, consoles, and stage audio",
    href: "/audio",
    icon: Headphones,
    accent: "audio",
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Stage lighting and DMX control",
    href: "#",
    icon: Lightbulb,
    accent: "lighting",
  },
  {
    id: "media",
    name: "Media",
    description: "Presentation and playback",
    href: "#",
    icon: Monitor,
    accent: "media",
  },
  {
    id: "video",
    name: "Video",
    description: "Cameras and live stream",
    href: "#",
    icon: Video,
    accent: "default",
  },
  {
    id: "stage",
    name: "Stage",
    description: "Backline, mics, and stage layout",
    href: "#",
    icon: LayoutGrid,
    accent: "operations",
  },
];

export const dashboardQuickAccess: DashboardQuickAccessItem[] = [
  { id: "inventory", label: "Inventory", href: "/audio/inventory", icon: Package },
  { id: "search", label: "Search", action: "focus-search", icon: Search },
  {
    id: "emergency",
    label: "Emergency",
    href: "/audio/troubleshooting",
    icon: AlertTriangle,
  },
  { id: "settings", label: "Settings", href: "#", icon: Settings },
];

export const dashboardContinueIcon = BookOpen;
