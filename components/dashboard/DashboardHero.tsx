"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, Clock, Radio } from "lucide-react";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { useMounted } from "@/hooks/useMounted";
import { buildDashboardSnapshot } from "@/lib/dashboard-state";
import {
  dashboardPrimaryGradient,
  dashboardStyles,
} from "@/lib/dashboard-styles";
import type { DashboardSnapshot } from "@/lib/dashboard-state";

interface DashboardHeroProps {
  setupProgress: { completed: number; total: number; percentage: number };
  checked: Record<string, boolean>;
}

export function DashboardHero({ setupProgress, checked }: DashboardHeroProps) {
  const mounted = useMounted();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const snapshot: DashboardSnapshot | null = useMemo(() => {
    if (!mounted) return null;
    return buildDashboardSnapshot(checked, setupProgress, now);
  }, [mounted, checked, setupProgress, now]);

  if (!mounted || !snapshot) {
    return (
      <div
        className={`${dashboardStyles.card} overflow-hidden ${dashboardStyles.cardPad}`}
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 animate-shimmer rounded-xl" />
          <div className="space-y-2">
            <div className="h-3 w-40 animate-shimmer rounded-md" />
            <div className="h-5 w-64 animate-shimmer rounded-md" />
          </div>
        </div>
        <div className="mt-8 h-14 w-56 animate-shimmer rounded-lg" />
      </div>
    );
  }

  const { countdown, currentStage, serviceDateLabel, serviceTimeLabel } =
    snapshot;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-red-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${dashboardPrimaryGradient()}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-500/[0.08] blur-3xl" />

      <div className={`relative ${dashboardStyles.cardPad}`}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className={`${dashboardStyles.iconBox} bg-red-500/15 text-red-400 ring-red-500/20`}
              >
                <Radio className={dashboardStyles.iconMd} />
              </div>
              <div>
                <p className={dashboardStyles.eyebrow}>Preparing for</p>
                {countdown.isLive && (
                  <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300 ring-1 ring-red-500/25">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                    {voaLabels.serviceLive}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.75rem] lg:text-3xl">
                {voaLabels.sundayExperience}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <Calendar className="h-4 w-4 text-red-400/80" />
                  {serviceDateLabel}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="h-4 w-4 text-red-400/80" />
                  {serviceTimeLabel} {voaLabels.serviceLive}
                </span>
              </div>
              <p className={`mt-3 ${dashboardStyles.body}`}>
                {voaVenue.church} · {currentStage.title} — {currentStage.description}
              </p>
            </div>
          </div>

          <div className="lg:text-right">
            {countdown.isLive ? (
              <div>
                <p className={dashboardStyles.label}>{voaLabels.serviceLive}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-red-400 sm:text-4xl">
                  On air
                </p>
              </div>
            ) : (
              <div>
                <p className={dashboardStyles.label}>Time remaining</p>
                <div className="mt-2 flex items-baseline gap-1 tabular-nums lg:justify-end">
                  <TimeUnit value={countdown.hours} />
                  <span className="text-xl text-slate-600">:</span>
                  <TimeUnit value={countdown.minutes} />
                  <span className="text-xl text-slate-600">:</span>
                  <TimeUnit value={countdown.seconds} accent />
                </div>
                <p className={`mt-2 ${dashboardStyles.caption}`}>
                  Until {serviceTimeLabel} {voaLabels.serviceLive}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({
  value,
  accent,
}: {
  value: number;
  accent?: boolean;
}) {
  return (
    <span
      className={`text-4xl font-semibold tracking-tight sm:text-5xl ${
        accent ? "text-red-400" : "text-white"
      }`}
    >
      {String(value).padStart(2, "0")}
    </span>
  );
}
