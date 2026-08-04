import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  FileText,
  Package,
  Wrench,
} from "lucide-react";

export interface AudioToolItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const audioTodaysService = {
  title: "Sunday Setup",
  description: "Everything required before service begins.",
  href: "/audio/setup",
};

export const audioTools: AudioToolItem[] = [
  { id: "setup", title: "Sunday Setup", href: "/audio/setup", icon: BookOpen },
  { id: "equipment", title: "Equipment", href: "/audio/equipment", icon: Wrench },
  {
    id: "documentation",
    title: "Documentation",
    href: "/audio/documentation",
    icon: FileText,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    href: "/audio/troubleshooting",
    icon: AlertTriangle,
  },
  { id: "inventory", title: "Inventory", href: "/audio/inventory", icon: Package },
];
