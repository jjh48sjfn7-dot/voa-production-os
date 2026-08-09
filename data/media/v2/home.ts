import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  Package,
  Wrench,
} from "lucide-react";

export interface MediaToolItem {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
}

export const mediaTodaysService = {
  title: "Sunday Setup",
  description:
    "Assemble the screen, connect display paths, and verify both outputs are ready.",
  href: "/media/setup",
};

export const mediaTools: MediaToolItem[] = [
  { id: "setup", title: "Sunday Setup", href: "/media/setup", icon: BookOpen },
  { id: "equipment", title: "Equipment", href: "/media/equipment", icon: Wrench },
  {
    id: "documentation",
    title: "Documentation",
    href: "/media/documentation",
    icon: BookOpen,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    href: "/media/troubleshooting",
    icon: AlertTriangle,
  },
  { id: "inventory", title: "Inventory", href: "/media/inventory", icon: Package },
];
