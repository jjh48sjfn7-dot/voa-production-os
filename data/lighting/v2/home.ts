import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  Package,
  Wrench,
} from "lucide-react";

export interface LightingToolItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const lightingTodaysService = {
  title: "Sunday Setup",
  description: "Place floor fixtures, run DMX, and verify all nine SlimPARs.",
  href: "/lighting/setup",
};

export const lightingTools: LightingToolItem[] = [
  { id: "setup", title: "Sunday Setup", href: "/lighting/setup", icon: BookOpen },
  { id: "equipment", title: "Equipment", href: "/lighting/equipment", icon: Wrench },
  {
    id: "documentation",
    title: "Documentation",
    href: "/lighting/documentation",
    icon: BookOpen,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    href: "/lighting/troubleshooting",
    icon: AlertTriangle,
  },
  { id: "inventory", title: "Inventory", href: "/lighting/inventory", icon: Package },
];
