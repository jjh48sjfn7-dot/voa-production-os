"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  Play,
  Radio,
  Square,
  StickyNote,
  Users,
  Zap,
} from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { ServiceTimeline } from "@/components/dashboard/ServiceTimeline";
import {
  criticalEquipment,
  emergencyShortcuts,
  productionMeta,
  productionQuickNav,
  serviceReminders,
  volunteerAssignments,
} from "@/data/audio/production";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { getAllChecklistItemIds } from "@/data/sunday-setup";
import { inventoryItems } from "@/data/audio/inventory";
import { useProductionMode } from "@/hooks/useProductionMode";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import {
  getServiceCountdown,
} from "@/lib/production-time";
import { loadCheckedItems } from "@/lib/storage";
import { calculateProgress } from "@/lib/progress";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";

const SETUP_STORAGE = "sunday-setup";

const equipmentStatusStyles = {
  online: "text-emerald-400 bg-emerald-500/12 ring-emerald-500/20",
  standby: "text-blue-400 bg-blue-500/12 ring-blue-500/20",
  attention: "text-amber-400 bg-amber-500/12 ring-amber-500/20",
  offline: "text-red-400 bg-red-500/12 ring-red-500/20",
} as const;

export function ProductionModeContent() {
  const { active, startedAt, notes, startSunday, endSunday, setNotes, mounted } =
    useProductionMode();
  const { checked } = useChecklist(SETUP_STORAGE);
  const setupIds = getAllChecklistItemIds();
  const setupProgress = useProgress(setupIds, checked);
  const colors = departmentAccents.audio;

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const countdown = useMemo(() => getServiceCountdown(now), [now]);

  const inventorySummary = useMemo(() => {
    const inUse = inventoryItems.filter((i) => i.status === "in-use").length;
    const maintenance = inventoryItems.filter((i) => i.status === "maintenance").length;
    const available = inventoryItems.filter((i) => i.status === "available").length;
    return { inUse, maintenance, available, total: inventoryItems.length };
  }, []);

  function loadSetupProgress() {
    return calculateProgress(loadCheckedItems(SETUP_STORAGE), setupIds);
  }

  const displaySetup =
    mounted && setupProgress.total > 0 ? setupProgress : loadSetupProgress();

  return (
    <AudioPageShell
      title={productionMeta.title}
      description={productionMeta.description}
      icon={Radio}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: voaLabels.sundayExperience },
      ]}
    >
      {/* Hero: Start + Countdown */}
      <section className={`relative ${audioStyles.glass} ${audioStyles.cardPadLg} overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/[0.06] via-transparent to-transparent" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className={audioStyles.label}>{voaVenue.church}</p>
            <h2 className={`mt-1 ${audioStyles.displayLg}`}>
              {countdown.isLive ? "Service Live" : countdown.label}
            </h2>
            <p className={`mt-1 flex items-center gap-1.5 ${audioStyles.caption}`}>
              <MapPin className="h-3.5 w-3.5" />
              {voaVenue.address} · Service {voaVenue.serviceLabel}
            </p>
            {active && startedAt && (
              <p className="mt-2 text-xs text-emerald-400">
                {voaLabels.sundayExperience} started {new Date(startedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
              </p>
            )}
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {!countdown.isLive && (
              <div className="tabular-nums">
                <div className="flex items-baseline gap-1">
                  <span className={`${audioStyles.statLg} text-white`}>
                    {String(countdown.hours).padStart(2, "0")}
                  </span>
                  <span className="text-2xl text-slate-500">:</span>
                  <span className={`${audioStyles.statLg} text-white`}>
                    {String(countdown.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-2xl text-slate-500">:</span>
                  <span className={`${audioStyles.statLg} text-red-400`}>
                    {String(countdown.seconds).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-center text-xs uppercase tracking-wider text-slate-500">
                  hours · min · sec
                </p>
              </div>
            )}

            {!active ? (
              <button
                type="button"
                onClick={startSunday}
                className={audioStyles.btnPrimary}
              >
                <Play className="h-4 w-4 fill-current" />
                Start {voaLabels.sundayExperience}
              </button>
            ) : (
              <button
                type="button"
                onClick={endSunday}
                className={audioStyles.btnSecondary}
              >
                <Square className="h-4 w-4" />
                End {voaLabels.postService}
              </button>
            )}
          </div>
        </div>
      </section>

      <ServiceTimeline />

      <div className={`grid lg:grid-cols-2 ${audioStyles.gridGap}`}>
          <section className={`${audioStyles.glass} ${audioStyles.cardPad}`}>
            <h3 className={audioStyles.heading}>{voaLabels.productionReady}</h3>
            <div className="mt-4 flex items-end justify-between">
              <span className={audioStyles.stat}>{displaySetup.percentage}%</span>
              <span className={audioStyles.caption}>
                {displaySetup.completed}/{displaySetup.total} tasks
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/[0.04]">
              <div
                className={`h-full ${colors.bar} shadow-[0_0_10px_rgba(239,68,68,0.35)] transition-[width] duration-[500ms] ease-out`}
                style={{ width: `${displaySetup.percentage}%` }}
              />
            </div>
            <Link
              href="/audio/setup"
              className={`mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm ${audioStyles.link}`}
            >
              Open pre-service checklist
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>

          <section className={`${audioStyles.glass} ${audioStyles.cardPad}`}>
            <h3 className={audioStyles.heading}>{voaLabels.tf5} · {voaLabels.rio} · {voaLabels.qscMains}</h3>
            <div className="mt-3 mb-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                {inventorySummary.available} available
              </span>
              <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-400">
                {inventorySummary.inUse} in use
              </span>
              {inventorySummary.maintenance > 0 && (
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-400">
                  {inventorySummary.maintenance} service
                </span>
              )}
            </div>
            <ul className="space-y-2">
              {criticalEquipment.map((eq) => (
                <li
                  key={eq.id}
                  className={`flex items-start justify-between gap-2 rounded-lg ${audioStyles.inset} px-3 py-2.5`}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-200">{eq.label}</p>
                    <p className="text-xs text-slate-500">{eq.detail}</p>
                  </div>
                  <span className={`${audioStyles.badge} shrink-0 ring-1 ${equipmentStatusStyles[eq.status]}`}>
                    {eq.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
      </div>

      {/* Quick nav + Volunteers */}
      <div className={`grid md:grid-cols-2 ${audioStyles.gridGap}`}>
        <section>
          <h3 className={audioStyles.sectionTitle}>Quick Navigation</h3>
          <div className={`grid sm:grid-cols-2 gap-3`}>
            {productionQuickNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} href={item.href} className="group block">
                  <div className={`${audioStyles.glass} ${audioStyles.cardHover} flex items-center gap-3 ${audioStyles.cardPad}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.iconBg}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-100 group-hover:text-white">
                        {item.label}
                      </p>
                      <p className="truncate text-xs text-slate-500">{item.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <h3 className={`${audioStyles.sectionTitle} ${audioStyles.heading}`}>
            <Users className="h-5 w-5 text-slate-500" />
            {voaLabels.volunteerTeam}
          </h3>
          <div className={`${audioStyles.glass} divide-y divide-white/[0.05]`}>
            {volunteerAssignments.map((v) => (
              <div key={v.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-slate-100">{v.name}</p>
                    <p className="text-sm text-red-400/90">{v.role}</p>
                  </div>
                  <span className="text-xs text-slate-500">{v.area}</span>
                </div>
                {v.notes && (
                  <p className="mt-1.5 text-xs text-slate-500">{v.notes}</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-600">Display only — no login required</p>
        </section>
      </div>

      {/* Notes + Reminders + Emergency */}
      <div className={`grid lg:grid-cols-3 ${audioStyles.gridGap}`}>
        <section className="lg:col-span-1">
          <h3 className={`${audioStyles.sectionTitle} ${audioStyles.heading}`}>
            <StickyNote className="h-5 w-5 text-slate-500" />
            {voaLabels.volunteerTeam} Notes
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Service notes, cue changes, handoff info…"
            rows={6}
            className={`w-full resize-y rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm text-slate-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)] placeholder:text-slate-600 ${audioStyles.transition} focus:border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/15`}
          />
          <p className="mt-2 text-xs text-slate-600">Saved locally on this device</p>
        </section>

        <section>
          <h3 className={`${audioStyles.sectionTitle} ${audioStyles.heading}`}>
            <Clock className="h-5 w-5 text-slate-500" />
            Service Reminders
          </h3>
          <ul className={`${audioStyles.glass} ${audioStyles.stackSm} ${audioStyles.cardPad}`}>
            {serviceReminders.map((r) => (
              <li
                key={r.id}
                className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm ${
                  r.urgent ? "bg-amber-500/5 text-amber-100/90" : "text-slate-400"
                }`}
              >
                <Zap className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${r.urgent ? "text-amber-400" : "text-slate-500"}`} />
                {r.text}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className={`${audioStyles.sectionTitle} ${audioStyles.heading}`}>
            <AlertTriangle className="h-5 w-5 text-red-400" />
            Emergency Shortcuts
          </h3>
          <div className="space-y-2">
            {emergencyShortcuts.map((es) => (
              <Link
                key={es.id}
                href={es.href}
                className={`flex items-center justify-between rounded-xl px-4 py-3 ${audioStyles.transition} ${
                  es.severity === "high"
                    ? "bg-red-500/10 ring-1 ring-red-500/20 hover:bg-red-500/14"
                    : "bg-white/[0.03] ring-1 ring-white/[0.06] hover:bg-white/[0.05]"
                }`}
              >
                <span className="text-sm font-medium text-slate-200">{es.title}</span>
                <ArrowRight className="h-4 w-4 text-slate-500" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AudioPageShell>
  );
}
