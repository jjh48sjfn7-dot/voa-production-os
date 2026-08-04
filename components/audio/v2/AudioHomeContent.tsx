"use client";

import { BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/audio/Breadcrumbs";
import { BackButton } from "@/components/audio/BackButton";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { DashboardSection } from "@/components/dashboard/DashboardSection";
import { audioTodaysService, audioTools } from "@/data/audio/v2/home";
import { voaLabels } from "@/data/audio/venue";

export function AudioHomeContent() {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumbs items={[{ label: voaLabels.audioDepartment }]} />
        <BackButton />
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
