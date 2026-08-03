"use client";

import { useMemo } from "react";
import { BookOpen, Clock, PartyPopper, User } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { AudioProgressCard } from "@/components/audio/AudioProgressCard";
import { Accordion } from "@/components/ui/Accordion";
import { Checklist } from "@/components/checklists/Checklist";
import {
  sundaySetupSections,
  getAllChecklistItemIds,
  SETUP_ESTIMATED_MINUTES,
} from "@/data/sunday-setup";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { audioStyles } from "@/lib/audio-styles";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { departmentAccents } from "@/lib/theme";

const STORAGE_ID = "sunday-setup";

export function SetupContent() {
  const { checked, toggleItem, mounted } = useChecklist(STORAGE_ID);
  const itemIds = getAllChecklistItemIds();
  const progress = useProgress(itemIds, checked);
  const dotColor = departmentAccents.audio.bar;
  const complete = progress.percentage === 100 && progress.total > 0;

  const sectionBadges = useMemo(() => {
    return sundaySetupSections.map((section) => {
      const checklistItems = section.items
        .filter((item) => item.type === "checklist")
        .flatMap((item) => (item.type === "checklist" ? item.items : []));

      if (checklistItems.length === 0) return null;
      const completed = checklistItems.filter((i) => checked[i.id]).length;
      return (
        <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs tabular-nums text-slate-400 ring-1 ring-white/[0.06]">
          {completed}/{checklistItems.length}
        </span>
      );
    });
  }, [checked]);

  function loadProgress() {
    return calculateProgress(loadCheckedItems(STORAGE_ID), itemIds);
  }

  return (
    <AudioPageShell
      title="Pre-Service Checklist"
      description={`${voaLabels.preService} checklist for ${voaVenue.church} — trailer unload through ${voaLabels.volunteerTeam} prayer before ${voaLabels.serviceLive}.`}
      icon={BookOpen}
      compactMobile
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Pre-Service Checklist" },
      ]}
      stickyProgress={
        <div className="md:sticky md:top-[14rem] md:z-10">
          <AudioProgressCard
            compactMobile
            title={`${voaLabels.preService} Progress`}
            description={`~${SETUP_ESTIMATED_MINUTES} min estimated · progress saves locally`}
            stats={progress}
            loadFromStorage={loadProgress}
          />
        </div>
      }
    >
      {complete && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-4 animate-slide-up md:gap-4 md:p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 ring-1 ring-green-500/25">
            <PartyPopper className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-lg font-semibold text-green-400">Setup complete!</p>
            <p className="mt-1 text-sm text-slate-400">
              All checklist items done. You&apos;re ready for sound check and service.
            </p>
          </div>
        </div>
      )}

      <div className="hidden flex-wrap gap-3 md:mb-6 md:flex">
        <MetaChip icon={Clock} label="Est. time" value={`${SETUP_ESTIMATED_MINUTES} min`} />
        <MetaChip icon={User} label="Sections" value={`${sundaySetupSections.length} groups`} />
      </div>

      <div className="space-y-3">
        {sundaySetupSections.map((section, index) => (
          <Accordion
            key={section.id}
            id={section.id}
            title={section.title}
            icon={section.icon}
            badge={sectionBadges[index]}
            defaultOpen={index === 0}
            compactMobile
          >
            {(section.volunteer || section.estimatedMinutes) && (
              <div className="mb-3 flex flex-wrap gap-2 border-b border-white/[0.05] pb-3 md:mb-4 md:pb-4">
                {section.volunteer && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 ring-1 ring-white/[0.06]">
                    <User className="h-3 w-3" />
                    {section.volunteer}
                  </span>
                )}
                {section.estimatedMinutes && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 ring-1 ring-white/[0.06]">
                    <Clock className="h-3 w-3" />
                    ~{section.estimatedMinutes} min
                  </span>
                )}
              </div>
            )}

            {section.items.map((item, itemIndex) => {
              if (item.type === "checklist") {
                return (
                  <Checklist
                    key={`${section.id}-cl-${itemIndex}`}
                    id={STORAGE_ID}
                    items={item.items}
                    checked={checked}
                    onToggle={toggleItem}
                    accent="audio"
                  />
                );
              }
              return (
                <ul key={`${section.id}-list-${itemIndex}`} className="space-y-2">
                  {item.items.map((text) => (
                    <li
                      key={text}
                      className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 text-sm ${audioStyles.body}`}
                    >
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor}`} />
                      {text}
                    </li>
                  ))}
                </ul>
              );
            })}
          </Accordion>
        ))}
      </div>
    </AudioPageShell>
  );
}

function MetaChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${audioStyles.inset} px-4 py-2.5`}>
      <Icon className="h-4 w-4 text-red-400" />
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-200">{value}</span>
    </div>
  );
}
