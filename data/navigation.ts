import {
  AlertTriangle,
  BookOpen,
  FileText,
  Headphones,
  Home,
  Lightbulb,
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
  {
    label: "Lighting Department",
    href: "/lighting",
    icon: Lightbulb,
    accent: "lighting",
    children: [
      { label: "Sunday Setup", href: "/lighting/setup", icon: BookOpen, accent: "lighting" },
      { label: "Equipment", href: "/lighting/equipment", icon: Wrench, accent: "lighting" },
      {
        label: "Documentation",
        href: "/lighting/documentation",
        icon: FileText,
        accent: "lighting",
      },
      {
        label: "Troubleshooting",
        href: "/lighting/troubleshooting",
        icon: AlertTriangle,
        accent: "lighting",
      },
      { label: "Inventory", href: "/lighting/inventory", icon: Package, accent: "lighting" },
    ],
  },
];
