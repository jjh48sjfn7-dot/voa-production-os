"use client";

import { useEffect, useState } from "react";
import type { ProgressStats } from "@/types";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";
import { useMounted } from "@/hooks/useMounted";

interface AudioProgressCardProps {
  title: string;
  description?: string;
  stats: ProgressStats;
  loadFromStorage?: () => ProgressStats;
}

export function AudioProgressCard({
  title,
  description,
  stats,
  loadFromStorage,
}: AudioProgressCardProps) {
  const colors = departmentAccents.audio;
  const mounted = useMounted();
  const [storedStats, setStoredStats] = useState(stats);

  useEffect(() => {
    if (loadFromStorage && mounted) {
      setStoredStats(loadFromStorage());
    }
  }, [loadFromStorage, mounted]);

  const display = loadFromStorage && mounted ? storedStats : stats;
  const remaining = display.total - display.completed;

  return (
    <div
      className={`relative overflow-hidden ${audioStyles.card} ${audioStyles.cardPadLg} ${audioStyles.cardGlow}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className={audioStyles.label}>Progress</p>
          <h3 className={`mt-1 ${audioStyles.displayLg}`}>{title}</h3>
          {description && (
            <p className={`mt-1.5 max-w-md ${audioStyles.body}`}>{description}</p>
          )}
        </div>
        <div className="text-left sm:text-right">
          <span className={audioStyles.statLg}>
            {display.percentage}
            <span className="text-xl font-semibold text-slate-500 sm:text-2xl">%</span>
          </span>
        </div>
      </div>

      <div className="relative mt-6 h-2.5 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/[0.04]">
        <div
          className={`h-full rounded-full ${colors.bar} shadow-[0_0_12px_rgba(239,68,68,0.35)] transition-[width] duration-[500ms] ease-out`}
          style={{ width: `${display.percentage}%` }}
        />
      </div>

      <div className={`relative mt-5 grid grid-cols-2 ${audioStyles.gridGap} sm:grid-cols-3`}>
        {[
          { label: "Completed", value: display.completed },
          { label: "Remaining", value: remaining },
          { label: "Total Tasks", value: display.total, wide: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${audioStyles.inset} px-4 py-3.5 ${stat.wide ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <p className={audioStyles.label}>{stat.label}</p>
            <p className={`mt-1 ${audioStyles.stat}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
