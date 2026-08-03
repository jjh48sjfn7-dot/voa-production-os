import { AlertTriangle, BookOpen, Map, Package } from "lucide-react";
import type { QuickAccessItem } from "@/types";

export const quickAccessItems: QuickAccessItem[] = [
  { id: "manual", label: "Volunteer Manual", icon: BookOpen },
  { id: "maps", label: "System Maps", icon: Map },
  { id: "troubleshooting", label: "Troubleshooting", icon: AlertTriangle },
  { id: "inventory", label: "Equipment Inventory", icon: Package },
];
