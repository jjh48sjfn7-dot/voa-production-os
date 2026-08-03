import { criticalEquipment } from "@/data/audio/production";
import { inventoryItems } from "@/data/audio/inventory";
import { serviceTimelineMilestones } from "@/data/dashboard/v1";
import {
  getSetupChecklistItems,
  type SetupChecklistItem,
} from "@/data/sunday-setup";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import {
  getCurrentTimelineIndex,
  getNextServiceDate,
  getServiceCountdown,
} from "@/lib/production-time";

export type ServiceCountdown = ReturnType<typeof getServiceCountdown>;

export type AudioReadiness = "ready" | "in-progress" | "not-ready";

export interface EquipmentAlert {
  id: string;
  label: string;
  detail: string;
  severity: "attention" | "pending" | "maintenance";
  href: string;
}

export interface NextStep {
  href: string;
  label: string;
  reason: string;
  icon: "setup" | "production" | "inventory" | "tf5" | "troubleshooting";
}

export interface DashboardSnapshot {
  serviceTitle: string;
  serviceDateLabel: string;
  serviceTimeLabel: string;
  countdown: ServiceCountdown;
  currentStage: (typeof serviceTimelineMilestones)[number];
  audioReadiness: AudioReadiness;
  setupProgress: { completed: number; total: number; percentage: number };
  incompleteTasks: SetupChecklistItem[];
  equipmentAlerts: EquipmentAlert[];
  nextStep: NextStep;
}

export function formatServiceDate(from: Date = new Date()): string {
  const d = getNextServiceDate(from);
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getIncompleteSetupTasks(
  checked: Record<string, boolean>
): SetupChecklistItem[] {
  return getSetupChecklistItems().filter((item) => !checked[item.id]);
}

export function getEquipmentAlerts(): EquipmentAlert[] {
  const alerts: EquipmentAlert[] = [];

  for (const item of criticalEquipment) {
    if (item.status === "attention" || item.status === "offline") {
      alerts.push({
        id: item.id,
        label: item.label,
        detail: item.detail,
        severity: item.status === "offline" ? "attention" : "attention",
        href: "/audio/production",
      });
    } else if (item.status === "standby") {
      alerts.push({
        id: item.id,
        label: item.label,
        detail: item.detail,
        severity: "pending",
        href: "/audio/diagram",
      });
    }
  }

  for (const item of inventoryItems) {
    if (item.status === "maintenance" || item.condition === "needs-service") {
      alerts.push({
        id: item.id,
        label: item.name,
        detail: item.nextService
          ? `Service due ${item.nextService}`
          : "Needs attention before service",
        severity: "maintenance",
        href: "/audio/inventory",
      });
    }
  }

  return alerts;
}

export function getAudioReadiness(
  setupPercentage: number,
  urgentAlertCount: number,
  countdown: ServiceCountdown
): AudioReadiness {
  if (countdown.isLive) {
    if (setupPercentage >= 75 && urgentAlertCount === 0) return "ready";
    return "in-progress";
  }

  if (setupPercentage === 100 && urgentAlertCount === 0) return "ready";
  if (setupPercentage > 0 || urgentAlertCount > 0) return "in-progress";
  return "not-ready";
}

export function getNextStep(
  incompleteTasks: SetupChecklistItem[],
  equipmentAlerts: EquipmentAlert[],
  setupPercentage: number,
  countdown: ServiceCountdown
): NextStep {
  if (countdown.isLive) {
    return {
      href: "/audio/production",
      label: `Open ${voaLabels.sundayExperience}`,
      reason: `${voaLabels.serviceLive} — monitor timeline, team, and gear`,
      icon: "production",
    };
  }

  if (incompleteTasks.length > 0) {
    const n = incompleteTasks.length;
    return {
      href: "/audio/setup",
      label: "Continue Pre-Service Checklist",
      reason: `${n} task${n === 1 ? "" : "s"} incomplete — ${incompleteTasks[0].label}`,
      icon: "setup",
    };
  }

  const urgent = equipmentAlerts.filter((a) => a.severity !== "pending");
  if (urgent.length > 0) {
    const n = urgent.length;
    return {
      href: "/audio/inventory",
      label: "Review Equipment",
      reason: `${n} item${n === 1 ? "" : "s"} need attention — ${urgent[0].label}`,
      icon: "inventory",
    };
  }

  if (setupPercentage < 100) {
    return {
      href: "/audio/setup",
      label: "Complete Pre-Service Checklist",
      reason: `${voaLabels.productionReady} at ${setupPercentage}%`,
      icon: "setup",
    };
  }

  const pending = equipmentAlerts.filter((a) => a.severity === "pending");
  if (pending.length > 0) {
    return {
      href: "/audio/tf5",
      label: `Open ${voaLabels.tf5}`,
      reason: `${pending[0].label} — ${pending[0].detail}`,
      icon: "tf5",
    };
  }

  return {
    href: "/audio/production",
    label: `Open ${voaLabels.sundayExperience}`,
    reason: `${voaLabels.productionReady} — review timeline and ${voaLabels.volunteerTeam}`,
    icon: "production",
  };
}

export function buildDashboardSnapshot(
  checked: Record<string, boolean>,
  setupProgress: { completed: number; total: number; percentage: number },
  now: Date = new Date()
): DashboardSnapshot {
  const countdown = getServiceCountdown(now);
  const milestoneIndex = getCurrentTimelineIndex(
    serviceTimelineMilestones.map((m) => ({ time: m.time })),
    now
  );
  const currentStage =
    milestoneIndex >= 0
      ? serviceTimelineMilestones[milestoneIndex]
      : serviceTimelineMilestones[0];

  const incompleteTasks = getIncompleteSetupTasks(checked);
  const equipmentAlerts = getEquipmentAlerts();
  const audioReadiness = getAudioReadiness(
    setupProgress.percentage,
    equipmentAlerts.filter((a) => a.severity !== "pending").length,
    countdown
  );

  return {
    serviceTitle: voaLabels.sundayExperience,
    serviceDateLabel: formatServiceDate(now),
    serviceTimeLabel: voaVenue.serviceLabel,
    countdown,
    currentStage,
    audioReadiness,
    setupProgress,
    incompleteTasks,
    equipmentAlerts,
    nextStep: getNextStep(
      incompleteTasks,
      equipmentAlerts,
      setupProgress.percentage,
      countdown
    ),
  };
}

export function audioReadinessLabel(readiness: AudioReadiness): string {
  switch (readiness) {
    case "ready":
      return "Audio Ready";
    case "in-progress":
      return "In Progress";
    case "not-ready":
      return "Not Ready";
  }
}

export function audioReadinessDetail(
  readiness: AudioReadiness,
  setupPercentage: number,
  alertCount: number
): string {
  if (readiness === "ready") {
    return `${voaLabels.tf5}, ${voaLabels.rio}, and ${voaLabels.qscMains} checked`;
  }
  if (alertCount > 0 && setupPercentage < 100) {
    return `${alertCount} gear item${alertCount === 1 ? "" : "s"} and setup tasks remaining`;
  }
  if (alertCount > 0) {
    return `${alertCount} equipment item${alertCount === 1 ? "" : "s"} need attention`;
  }
  return `${voaLabels.productionReady} at ${setupPercentage}% — finish Pre-Service tasks`;
}
