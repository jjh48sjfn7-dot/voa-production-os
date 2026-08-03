"use client";

import { AlertOctagon, ArrowRight } from "lucide-react";
import {
  tf5DashboardStats,
  tf5Emergency,
  tf5QuickRefs,
  tf5SignalFlow,
} from "@/data/audio/tf5";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";
import { SectionHeader } from "@/components/ui/PageHeader";
import { voaLabels } from "@/data/audio/venue";
import { Accordion } from "@/components/ui/Accordion";

export function Tf5Panel() {
  const colors = departmentAccents.audio;

  return (
    <div className={audioStyles.section}>
      {/* Dashboard stat grid */}
      <section>
        <SectionHeader
          title="Console Dashboard"
          description={`${voaLabels.tf5} — ${voaLabels.foh} system overview`}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tf5DashboardStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`group relative overflow-hidden ${audioStyles.glass} ${audioStyles.cardHover} p-5 animate-fade-in`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-red-500/5 blur-2xl transition-all duration-500 group-hover:bg-red-500/10" />
                <div className="relative flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colors.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={audioStyles.label}>{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{stat.hint}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeader title="Signal Flow" description="Input to output path" />
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-3">
          {tf5SignalFlow.map((node, i) => (
            <div key={node.id} className="flex items-center gap-2 md:gap-3">
              <div
                className={`flex-1 ${audioStyles.glass} ${audioStyles.cardHover} px-4 py-3 md:min-w-[140px] md:flex-none`}
              >
                <p className="text-sm font-semibold text-slate-200">{node.label}</p>
                <p className="text-xs text-slate-500">{node.sub}</p>
              </div>
              {i < tf5SignalFlow.length - 1 && (
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-600 md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Quick Reference" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tf5QuickRefs.map((ref) => (
            <div
              key={ref.id}
              className={`${audioStyles.glass} ${audioStyles.cardHover} p-4 ${audioStyles.cardGlow}`}
            >
              <p className={audioStyles.label}>{ref.title}</p>
              <p className="mt-1 text-xl font-bold text-white">{ref.value}</p>
              {ref.hint && (
                <p className="mt-1 text-xs text-slate-500">{ref.hint}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Emergency Procedures"
          description="Use when immediate action is required"
        />
        <div className="space-y-3">
          {tf5Emergency.map((proc, index) => (
            <Accordion
              key={proc.id}
              id={`emergency-${proc.id}`}
              title={proc.title}
              icon={AlertOctagon}
              defaultOpen={index === 0}
            >
              <ol className="space-y-2">
                {proc.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-start gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 text-sm text-slate-400 ring-1 ring-white/[0.04]"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Accordion>
          ))}
        </div>
      </section>
    </div>
  );
}
