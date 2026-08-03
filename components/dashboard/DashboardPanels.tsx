"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Headphones,
  Package,
  Radio,
  SlidersHorizontal,
} from "lucide-react";
import { voaLabels } from "@/data/audio/venue";
import {
  audioReadinessDetail,
  audioReadinessLabel,
  type DashboardSnapshot,
  type NextStep,
} from "@/lib/dashboard-state";
import { audioStyles } from "@/lib/audio-styles";
import { dashboardStyles } from "@/lib/dashboard-styles";
import { departmentAccents } from "@/lib/theme";

const readinessStyles = {
  ready: {
    ring: "ring-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  "in-progress": {
    ring: "ring-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  "not-ready": {
    ring: "ring-red-500/30",
    bg: "bg-red-500/10",
    text: "text-red-400",
    dot: "bg-red-400",
  },
} as const;

const alertStyles = {
  attention: "text-amber-400 bg-amber-500/10 ring-amber-500/20",
  pending: "text-blue-400 bg-blue-500/10 ring-blue-500/20",
  maintenance: "text-red-400 bg-red-500/10 ring-red-500/20",
} as const;

const nextStepIcons = {
  setup: BookOpen,
  production: Radio,
  inventory: Package,
  tf5: SlidersHorizontal,
  troubleshooting: AlertTriangle,
} as const;

interface DashboardPanelsProps {
  snapshot: DashboardSnapshot;
}

export function DashboardReadinessPanel({ snapshot }: DashboardPanelsProps) {
  const styles = readinessStyles[snapshot.audioReadiness];
  const urgentCount = snapshot.equipmentAlerts.filter(
    (a) => a.severity !== "pending"
  ).length;

  return (
    <div className={`${dashboardStyles.card} ${dashboardStyles.cardPad} h-full`}>
      <p className={dashboardStyles.label}>{voaLabels.audioDepartment}</p>
      <div className="mt-4 flex items-start gap-4">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 ${styles.ring} ${styles.bg}`}
        >
          <Headphones className={`h-6 w-6 ${styles.text}`} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {audioReadinessLabel(snapshot.audioReadiness)}
            </h3>
          </div>
          <p className={`mt-2 ${dashboardStyles.body}`}>
            {audioReadinessDetail(
              snapshot.audioReadiness,
              snapshot.setupProgress.percentage,
              urgentCount
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>{voaLabels.productionReady}</span>
          <span className="tabular-nums">
            {snapshot.setupProgress.percentage}%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className={`h-full ${departmentAccents.audio.bar} transition-all duration-700 ease-out`}
            style={{ width: `${snapshot.setupProgress.percentage}%` }}
          />
        </div>
        <p className={`mt-2 ${dashboardStyles.caption}`}>
          {snapshot.setupProgress.completed} of {snapshot.setupProgress.total}{" "}
          Pre-Service checklist items
        </p>
      </div>
    </div>
  );
}

export function DashboardIncompleteTasks({ snapshot }: DashboardPanelsProps) {
  const tasks = snapshot.incompleteTasks;

  return (
    <div className={`${dashboardStyles.card} ${dashboardStyles.cardPad} h-full`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={dashboardStyles.label}>Incomplete tasks</p>
          <h3 className={`mt-1 ${dashboardStyles.title}`}>Pre-Service checklist</h3>
        </div>
        {tasks.length > 0 && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-amber-400 ring-1 ring-amber-500/20">
            {tasks.length}
          </span>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <p className="text-sm text-emerald-200/90">
            All Pre-Service checklist items complete.
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <li key={task.id}>
              <Link
                href="/audio/setup"
                className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-[border-color,background-color] duration-150 hover:border-white/[0.1] hover:bg-white/[0.04]"
              >
                <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 group-hover:text-amber-400" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                    {task.label}
                  </p>
                  <p className={`mt-0.5 ${dashboardStyles.caption}`}>
                    {task.section}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tasks.length > 5 && (
        <Link
          href="/audio/setup"
          className={`mt-4 inline-flex text-sm font-medium ${departmentAccents.audio.text} hover:underline`}
        >
          View all {tasks.length} tasks
        </Link>
      )}
    </div>
  );
}

export function DashboardEquipmentAlerts({ snapshot }: DashboardPanelsProps) {
  const alerts = snapshot.equipmentAlerts;

  return (
    <div className={`${dashboardStyles.card} ${dashboardStyles.cardPad} h-full`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={dashboardStyles.label}>Equipment status</p>
          <h3 className={`mt-1 ${dashboardStyles.title}`}>
            {alerts.length === 0 ? "All gear accounted for" : "Needs attention"}
          </h3>
        </div>
        {alerts.length > 0 && (
          <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold tabular-nums text-red-400 ring-1 ring-red-500/20">
            {alerts.length}
          </span>
        )}
      </div>

      {alerts.length === 0 ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
          <p className="text-sm text-emerald-200/90">
            {voaLabels.tf5}, {voaLabels.rio}, and {voaLabels.qscMains} online.
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id}>
              <Link
                href={alert.href}
                className={`group flex items-start justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition-[border-color,background-color] duration-150 hover:border-white/[0.1] hover:bg-white/[0.04]`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white">
                    {alert.label}
                  </p>
                  <p className={`mt-0.5 ${dashboardStyles.caption}`}>
                    {alert.detail}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${alertStyles[alert.severity]}`}
                >
                  {alert.severity === "pending" ? "Pending" : alert.severity === "maintenance" ? "Service" : "Check"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DashboardNextStep({ nextStep }: { nextStep: NextStep }) {
  const Icon = nextStepIcons[nextStep.icon];
  const colors = departmentAccents.audio;

  return (
    <Link href={nextStep.href} className={`group block ${audioStyles.cardHover}`}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-500/[0.1] via-[#121f33]/95 to-[#0c1524]/96 ${dashboardStyles.cardPad} shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-[border-color,box-shadow,transform] duration-200 hover:border-red-500/35 hover:shadow-[0_16px_48px_rgba(239,68,68,0.12)] active:scale-[0.998]`}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-500/[0.08] blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`${dashboardStyles.iconBoxLg} ${colors.iconBg} ring-red-500/15`}
            >
              <Icon className={dashboardStyles.iconLg} />
            </div>
            <div>
              <p className={dashboardStyles.eyebrow}>Next step</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {nextStep.label}
              </h3>
              <p className={`mt-1.5 max-w-xl ${dashboardStyles.body}`}>
                {nextStep.reason}
              </p>
            </div>
          </div>

          <span className={`${audioStyles.btnPrimary} sm:self-center`}>
            Continue
            <ArrowRight className={`${dashboardStyles.iconSm} transition-transform duration-200 group-hover:translate-x-0.5`} />
          </span>
        </div>
      </div>
    </Link>
  );
}
