"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/audio/Breadcrumbs";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { audioTodaysService, audioTools } from "@/data/audio/v2/home";
import { voaLabels } from "@/data/audio/venue";
import { audioStyles } from "@/lib/audio-styles";

export function AudioHomeContent() {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumbs items={[{ label: voaLabels.audioDepartment }]} />
        <Link
          href="/"
          className={`group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[13px] font-medium text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-slate-200`}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-[250ms] group-hover:-translate-x-0.5" />
          Back to Dashboard
        </Link>
      </div>

      <DashboardSection title="Today's Service">
        <DashboardRow
          href={audioTodaysService.href}
          icon={BookOpen}
          accent="audio"
          description={audioTodaysService.description}
          title={audioTodaysService.title}
        />
      </DashboardSection>

      <DashboardSection title="Audio Tools">
        <div className="divide-y divide-white/[0.06]">
          {audioTools.map((tool) => (
            <DashboardRow
              key={tool.id}
              href={tool.href}
              icon={tool.icon}
              accent="audio"
              title={tool.title}
            />
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
