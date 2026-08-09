import type { LucideIcon } from "lucide-react";
import type { DepartmentAccent } from "@/lib/theme";

export interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  disabled?: boolean;
  accent?: DepartmentAccent;
  children?: NavItem[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: DepartmentAccent;
  available: boolean;
}

export interface ScheduleItem {
  team: string;
  time: string;
}

export interface QuickAccessItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface AudioSection {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
}

export interface SetupSection {
  id: string;
  title: string;
  icon?: LucideIcon;
  volunteer?: string;
  estimatedMinutes?: number;
  items: SetupItem[];
}

export type SetupItem =
  | { type: "checklist"; items: ChecklistItem[] }
  | { type: "list"; items: string[] };

export interface ProgressStats {
  completed: number;
  total: number;
  percentage: number;
}
