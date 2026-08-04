import {
  AlertTriangle,
  BookOpen,
  FileText,
  Headphones,
  Home,
  Package,
  Wrench,
} from "lucide-react";
import type { NavItem } from "@/types";
import { voaLabels } from "@/data/audio/venue";

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home },
  {
    label: voaLabels.audioDepartment,
    href: "/audio",
    icon: Headphones,
    accent: "audio",
    children: [
      { label: "Sunday Setup", href: "/audio/setup", icon: BookOpen, accent: "audio" },
      { label: "Equipment", href: "/audio/equipment", icon: Wrench, accent: "audio" },
      {
        label: "Documentation",
        href: "/audio/documentation",
        icon: FileText,
        accent: "audio",
      },
      {
        label: "Troubleshooting",
        href: "/audio/troubleshooting",
        icon: AlertTriangle,
        accent: "audio",
      },
      { label: "Inventory", href: "/audio/inventory", icon: Package, accent: "audio" },
    ],
  },
];
