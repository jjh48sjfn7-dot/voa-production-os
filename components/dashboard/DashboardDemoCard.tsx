"use client";

import Link from "next/link";
import { ArrowRight, Target } from "lucide-react";
import { dashboardStyles } from "@/lib/dashboard-styles";
import { audioStyles } from "@/lib/audio-styles";

export function DashboardDemoCard() {
  return (
    <Link
      href="/demo"
      className={`group block animate-fade-in ${dashboardStyles.cardHover}`}
    >
      <div
        className={`relative overflow-hidden ${dashboardStyles.card} ${dashboardStyles.cardPad} ${dashboardStyles.cardHover} border-amber-500/20 bg-gradient-to-br from-amber-500/[0.08] via-[#121f33]/95 to-[#0c1524]/96`}
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-500/[0.06] blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`${dashboardStyles.iconBoxLg} bg-amber-500/15 text-amber-400 ring-amber-500/20`}
            >
              <Target className={dashboardStyles.iconLg} />
            </div>
            <div>
              <h2 className={dashboardStyles.displayLg}>Live Demo</h2>
              <p className={`mt-1.5 ${dashboardStyles.body}`}>
                Experience VOA Production OS
              </p>
            </div>
          </div>

          <span
            className={`${audioStyles.btnPrimary} shrink-0 self-start bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_4px_16px_rgba(245,158,11,0.28),inset_0_1px_0_rgba(255,255,255,0.12)] group-hover:shadow-[0_6px_20px_rgba(245,158,11,0.36)] sm:self-center`}
          >
            Start
            <ArrowRight className={`${dashboardStyles.iconSm} transition-transform duration-200 group-hover:translate-x-0.5`} />
          </span>
        </div>
      </div>
    </Link>
  );
}
