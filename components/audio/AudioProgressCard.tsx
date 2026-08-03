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
  compactMobile?: boolean;
}

export function AudioProgressCard({
  title,
  description,
  stats,
  loadFromStorage,
  compactMobile = false,
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
      className={`relative overflow-hidden ${audioStyles.card} ${audioStyles.cardGlow} ${
        compactMobile ? "p-4 sm:p-6 md:p-7" : audioStyles.cardPadLg
      }`}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

      <div
        className={`relative flex flex-col sm:flex-row sm:items-start sm:justify-between ${
          compactMobile ? "gap-3 md:gap-5" : "gap-5"
        }`}
      >
        <div>
          <p className={audioStyles.label}>Progress</p>
          <h3 className={`mt-1 ${audioStyles.displayLg}`}>{title}</h3>
          {description && (
            <p
              className={`max-w-md ${audioStyles.body} ${
                compactMobile ? "mt-1 md:mt-1.5" : "mt-1.5"
              }`}
            >
              {description}
            </p>
          )}
        </div>
        <div className="text-left sm:text-right">
          <span className={audioStyles.statLg}>
            {display.percentage}
            <span className="text-xl font-semibold text-slate-500 sm:text-2xl">%</span>
          </span>
        </div>
      </div>

      <div
        className={`relative overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/[0.04] ${
          compactMobile ? "mt-3 h-1.5 md:mt-6 md:h-2.5" : "mt-6 h-2.5"
        }`}
      >
        <div
          className={`h-full rounded-full ${colors.bar} shadow-[0_0_12px_rgba(239,68,68,0.35)] transition-[width] duration-[500ms] ease-out`}
          style={{ width: `${display.percentage}%` }}
        />
      </div>

      <div
        className={`relative grid grid-cols-2 sm:grid-cols-3 ${
          compactMobile ? "mt-3 gap-3 md:mt-5 md:gap-5" : `mt-5 ${audioStyles.gridGap}`
        }`}
      >
        {[
          { label: "Completed", value: display.completed },
          { label: "Remaining", value: remaining },
          { label: "Total Tasks", value: display.total, wide: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${audioStyles.inset} ${stat.wide ? "col-span-2 sm:col-span-1" : ""} ${
              compactMobile ? "px-3 py-2.5 md:px-4 md:py-3.5" : "px-4 py-3.5"
            }`}
          >
            <p className={audioStyles.label}>{stat.label}</p>
            <p className={`mt-1 ${audioStyles.stat}`}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
