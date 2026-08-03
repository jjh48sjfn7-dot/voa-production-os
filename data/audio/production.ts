import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpen,
  Map,
  Mic2,
  Package,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import { voaLabels, voaVenue } from "@/data/audio/venue";

export const PRODUCTION_STORAGE_ID = "audio-production";

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  team?: string;
}

export interface VolunteerAssignment {
  id: string;
  name: string;
  role: string;
  area: string;
  notes?: string;
}

export interface ServiceReminder {
  id: string;
  text: string;
  urgent?: boolean;
}

export interface EmergencyShortcut {
  id: string;
  title: string;
  href: string;
  severity: "high" | "medium";
}

export interface QuickNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
}

export interface EquipmentStatusItem {
  id: string;
  label: string;
  status: "online" | "standby" | "attention" | "offline";
  detail: string;
}

export const productionTimeline: TimelineEvent[] = [
  {
    id: "call",
    time: "7:45 AM",
    title: "Team call time",
    description: `${voaLabels.volunteerTeam} leads confirm arrival and trailer access.`,
    team: voaLabels.volunteerTeam,
  },
  {
    id: "arrive",
    time: "8:00 AM",
    title: voaLabels.preService,
    description: `Unlock sanctuary, open ${voaVenue.trailerLocation}.`,
    team: "David — Team Lead",
  },
  {
    id: "unload",
    time: "8:20 AM",
    title: "Unload & stage",
    description: `Roll cases, place ${voaLabels.qscMains} at ${voaLabels.foh}, run snake to ${voaLabels.rio}.`,
    team: "Load crew",
  },
  {
    id: "audio-power",
    time: "8:45 AM",
    title: "Power audio rack",
    description: `${voaLabels.tf5} → ${voaLabels.rio} → ${voaLabels.qscMains}. Load scene “VOA Pre-Service”.`,
    team: `Marcus — ${voaLabels.foh}`,
  },
  {
    id: "line-check",
    time: "9:15 AM",
    title: "Line check",
    description: "Verify all 16 active channels per patch sheet. Test playback.",
    team: "James — Stage",
  },
  {
    id: "soundcheck",
    time: "9:30 AM",
    title: "Worship sound check",
    description: `Ring out monitors at ${voaLabels.drumPosition} and ${voaLabels.keyboardPosition}.`,
    team: "Sofia — Monitors",
  },
  {
    id: "prayer",
    time: "10:00 AM",
    title: "Team prayer",
    description: `${voaLabels.volunteerTeam} — review Sunday Experience flow at ${voaLabels.centerScreen}.`,
    team: voaLabels.volunteerTeam,
  },
  {
    id: "doors",
    time: "10:15 AM",
    title: "Doors open",
    description: `Recall “VOA Sunday Worship” on ${voaLabels.tf5}. Ambient playback.`,
    team: `Marcus — ${voaLabels.foh}`,
  },
  {
    id: "service",
    time: "10:30 AM",
    title: voaLabels.serviceLive,
    description: "Welcome, worship, message. Pastor mic live at speaking.",
    team: voaLabels.audioDepartment,
  },
  {
    id: "teardown",
    time: "12:15 PM",
    title: voaLabels.postService,
    description: `Power down ${voaLabels.qscMains} first. Coil cables, inventory check, load trailer.`,
    team: voaLabels.audioDepartment,
  },
];

export const volunteerAssignments: VolunteerAssignment[] = [
  { id: "v1", name: "Daniel", role: "Audio Lead", area: `${voaLabels.foh} / coordination`, notes: "Scene recalls, team comms" },
  { id: "v2", name: "Marcus Chen", role: "FOH Engineer", area: voaLabels.tf5, notes: "Main mix, pastor mic, playback" },
  { id: "v3", name: "Sofia Reyes", role: "Monitor Engineer", area: "Wedges & IEM", notes: "Aux 1–6, drummer sub" },
  { id: "v4", name: "James Porter", role: "Stage Tech", area: `${voaLabels.rio} · ${voaLabels.stageLeft}`, notes: "Mic placement, DI checks" },
  { id: "v5", name: "David Okonkwo", role: "Team Lead", area: "Arrival & trailer", notes: "Unlock, unload, safety" },
  { id: "v6", name: "Elena Vasquez", role: "Media Liaison", area: `${voaLabels.centerScreen} / stream`, notes: "Playback levels, USB record" },
];

export const serviceReminders: ServiceReminder[] = [
  { id: "r1", text: `Recall ${voaLabels.tf5} scene “VOA Sunday Worship” before 10:15 AM`, urgent: true },
  { id: "r2", text: "Fresh AA batteries in pastor wireless — check before service", urgent: true },
  { id: "r3", text: "Mute Ch 5 (Pastor Mic) during worship set", urgent: false },
  { id: "r4", text: "Confirm USB recording armed if livestream is scheduled", urgent: false },
  { id: "r5", text: "HPF all vocals at 80–100 Hz — Antioch room builds low end", urgent: false },
  { id: "r6", text: `Power ${voaLabels.qscMains} ON last, OFF first — protect JBL SRX835P`, urgent: true },
  { id: "r7", text: `${voaLabels.postService}: return all mics to Case A, run inventory checklist`, urgent: false },
];

export const emergencyShortcuts: EmergencyShortcut[] = [
  { id: "es1", title: "No Signal on Channel", href: "/audio/troubleshooting#issue-no-signal", severity: "high" },
  { id: "es2", title: "Feedback / Ringing", href: "/audio/troubleshooting#issue-feedback", severity: "high" },
  { id: "es3", title: "Total Audio Loss", href: "/audio/tf5#emergency-no-audio", severity: "high" },
  { id: "es4", title: "Wireless Dropout", href: "/audio/troubleshooting#issue-wireless-drop", severity: "medium" },
  { id: "es5", title: "Ground Hum / Buzz", href: "/audio/troubleshooting#issue-hum", severity: "medium" },
];

export const productionQuickNav: QuickNavItem[] = [
  { id: "setup", label: "Pre-Service Checklist", href: "/audio/setup", icon: BookOpen, description: `${voaLabels.preService} tasks` },
  { id: "tf5", label: voaLabels.tf5, href: "/audio/tf5", icon: SlidersHorizontal, description: `${voaLabels.foh} console reference` },
  { id: "channels", label: "Channel List", href: "/audio/channels", icon: Mic2, description: `${voaLabels.tf5} patch sheet` },
  { id: "diagram", label: "System Diagram", href: "/audio/diagram", icon: Map, description: `${voaLabels.rio} → ${voaLabels.tf5} signal path` },
  { id: "inventory", label: "Inventory", href: "/audio/inventory", icon: Package, description: `${voaLabels.productionReady} tracking` },
  { id: "troubleshooting", label: "Troubleshooting", href: "/audio/troubleshooting", icon: AlertTriangle, description: `${voaLabels.audioDepartment} diagnostics` },
];

export const criticalEquipment: EquipmentStatusItem[] = [
  { id: "eq-tf5", label: voaLabels.tf5, status: "online", detail: "Scene: VOA Sunday Worship" },
  { id: "eq-sb1", label: `${voaLabels.rio} SB1`, status: "online", detail: `${voaLabels.stageLeft} · ${voaLabels.drumPosition} · Ch 1–16` },
  { id: "eq-sb2", label: `${voaLabels.rio} SB2`, status: "online", detail: `${voaLabels.stageRight} · ${voaLabels.keyboardPosition} · Ch 17–32` },
  { id: "eq-snake", label: "32-Ch Digital Snake", status: "online", detail: `${voaLabels.foh} rack → stage` },
  { id: "eq-amps", label: voaLabels.qscMains, status: "standby", detail: "Power on after line check" },
  { id: "eq-wireless", label: "Pastor Wireless (Shure BLX)", status: "attention", detail: "Check battery before 10:30" },
  { id: "eq-playback", label: "Mac Mini Playback", status: "online", detail: "ProPresenter → Ch 15/16" },
  { id: "eq-sub", label: "JBL SRX818S Sub", status: "standby", detail: `Crossover 80 Hz from ${voaLabels.tf5}` },
];

export const productionMeta = {
  title: voaLabels.sundayExperience,
  description: `${voaVenue.church} — ${voaLabels.preService} through ${voaLabels.postService}. Timeline, ${voaLabels.productionReady}, ${voaLabels.qscMains}, and quick access to every ${voaLabels.audioDepartment} resource.`,
};
