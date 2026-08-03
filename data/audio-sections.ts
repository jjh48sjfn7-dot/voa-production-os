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

export const audioSectionLinks = [
  { id: "production", label: voaLabels.sundayExperience, href: "/audio/production", icon: Radio },
  { id: "setup", label: "Pre-Service Checklist", href: "/audio/setup", icon: BookOpen },
  { id: "tf5", label: voaLabels.tf5, href: "/audio/tf5", icon: SlidersHorizontal },
  { id: "channels", label: "Channel List", href: "/audio/channels", icon: Mic2 },
  { id: "diagram", label: "System Diagram", href: "/audio/diagram", icon: Map },
  { id: "inventory", label: "Inventory", href: "/audio/inventory", icon: Package },
  { id: "troubleshooting", label: "Troubleshooting", href: "/audio/troubleshooting", icon: AlertTriangle },
];
