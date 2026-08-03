"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { serviceTimelineMilestones } from "@/data/dashboard/v1";
import { getCurrentTimelineIndex } from "@/lib/production-time";
import { dashboardStyles } from "@/lib/dashboard-styles";
import { voaVenue } from "@/data/audio/venue";

export function ServiceTimeline() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const currentIndex = useMemo(
    () => getCurrentTimelineIndex(serviceTimelineMilestones, now),
    [now]
  );

  return (
    <div className={`${dashboardStyles.card} ${dashboardStyles.cardPad}`}>
      <div className="flex items-start gap-4">
        <div
          className={`${dashboardStyles.iconBox} bg-white/[0.04] text-slate-400`}
        >
          <Clock className={dashboardStyles.iconMd} />
        </div>
        <div>
          <h3 className={dashboardStyles.title}>Sunday Experience Timeline</h3>
          <p className={`mt-1.5 ${dashboardStyles.caption}`}>
            {voaVenue.church}
          </p>
        </div>
      </div>

      {/* Desktop horizontal */}
      <div className="mt-10 hidden md:block">
        <div className="relative flex items-start justify-between px-2">
          <div className="absolute left-8 right-8 top-5 h-px bg-white/[0.06]" />
          <div
            className="absolute left-8 top-5 h-px bg-gradient-to-r from-red-500/80 to-red-400/40 transition-all duration-700 ease-out"
            style={{
              width: `calc(${Math.max(0, currentIndex / (serviceTimelineMilestones.length - 1)) * 100}% - 4rem)`,
              maxWidth: "calc(100% - 4rem)",
            }}
          />

          {serviceTimelineMilestones.map((milestone, i) => {
            const isPast = i < currentIndex;
            const isCurrent = i === currentIndex;

            return (
              <div
                key={milestone.id}
                className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-1 lg:px-2"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 transition-all duration-500 ${
                    isCurrent
                      ? "scale-110 bg-red-500 text-white ring-red-500/40 shadow-lg shadow-red-500/25"
                      : isPast
                        ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25"
                        : "bg-[#121f33] text-slate-500 ring-white/[0.08]"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className={dashboardStyles.iconMd} />
                  ) : (
                    <span className="text-xs font-semibold">{i + 1}</span>
                  )}
                </div>
                <p className="mt-4 text-xs font-semibold tabular-nums text-red-400/90">
                  {milestone.time}
                </p>
                <p
                  className={`mt-1.5 line-clamp-2 text-center text-sm font-medium tracking-tight ${
                    isCurrent ? "text-white" : "text-slate-400"
                  }`}
                >
                  {milestone.title}
                </p>
                {isCurrent && (
                  <span className="mt-2 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-red-300 ring-1 ring-red-500/20">
                    Now
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile vertical */}
      <div className="mt-8 space-y-0 md:hidden">
        {serviceTimelineMilestones.map((milestone, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          const isLast = i === serviceTimelineMilestones.length - 1;

          return (
            <div key={milestone.id} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 transition-all duration-300 ${
                    isCurrent
                      ? "bg-red-500 text-white ring-red-500/40"
                      : isPast
                        ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25"
                        : "bg-white/[0.04] text-slate-500 ring-white/[0.08]"
                  }`}
                >
                  {isPast ? (
                    <CheckCircle2 className={dashboardStyles.iconMd} />
                  ) : (
                    <span className="text-xs font-semibold">{i + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div className="my-2 w-px flex-1 bg-white/[0.06]" />
                )}
              </div>
              <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
                <p className="text-xs font-semibold tabular-nums text-red-400/90">
                  {milestone.time}
                </p>
                <p
                  className={`mt-0.5 font-medium tracking-tight ${
                    isCurrent ? "text-white" : "text-slate-300"
                  }`}
                >
                  {milestone.title}
                </p>
                <p className={`mt-1 ${dashboardStyles.caption}`}>
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
