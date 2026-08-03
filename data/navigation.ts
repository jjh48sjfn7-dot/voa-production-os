import {
  AlertTriangle,
  BookOpen,
  Headphones,
  Home,
  Map,
  Mic2,
  Package,
  Radio,
  SlidersHorizontal,
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
      { label: voaLabels.sundayExperience, href: "/audio/production", icon: Radio, accent: "audio" },
      { label: "Pre-Service Checklist", href: "/audio/setup", icon: BookOpen, accent: "audio" },
      { label: voaLabels.tf5, href: "/audio/tf5", icon: SlidersHorizontal, accent: "audio" },
      { label: "Channel List", href: "/audio/channels", icon: Mic2, accent: "audio" },
      { label: "System Diagram", href: "/audio/diagram", icon: Map, accent: "audio" },
      { label: "Inventory", href: "/audio/inventory", icon: Package, accent: "audio" },
      { label: "Troubleshooting", href: "/audio/troubleshooting", icon: AlertTriangle, accent: "audio" },
    ],
  },
];
