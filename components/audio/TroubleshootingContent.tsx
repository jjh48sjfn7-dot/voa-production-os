"use client";

import { useEffect, useMemo } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { ContentBlockRenderer } from "@/components/audio/ContentBlockRenderer";
import { DiagnosticWizard } from "@/components/audio/DiagnosticWizard";
import { EmptyState } from "@/components/audio/EmptyState";
import {
  TROUBLESHOOTING_STORAGE_ID,
  troubleshootingBlocks,
  troubleshootingIssues,
  getTroubleshootingChecklistIds,
} from "@/data/audio/troubleshooting";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { useSearch } from "@/lib/search-context";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { SectionHeader } from "@/components/ui/PageHeader";

export function TroubleshootingContent() {
  const { checked, toggleItem, mounted } = useChecklist(TROUBLESHOOTING_STORAGE_ID);
  const { matchesQuery } = useSearch();
  const itemIds = getTroubleshootingChecklistIds();
  const progress = useProgress(itemIds, checked);

  const filtered = useMemo(() => {
    return troubleshootingIssues.filter(
      (issue) =>
        matchesQuery(issue.title) ||
        issue.symptoms.some((s) => matchesQuery(s))
    );
  }, [matchesQuery]);

  function loadProgress() {
    return calculateProgress(loadCheckedItems(TROUBLESHOOTING_STORAGE_ID), itemIds);
  }

  useEffect(() => {
    if (!mounted) return;
    const hash = window.location.hash.replace("#issue-", "");
    if (!hash) return;
    const el = document.getElementById(`issue-${hash}`);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [mounted]);

  return (
    <AudioPageShell
      title="Troubleshooting"
      description={`Guided diagnostics for ${voaVenue.church} ${voaLabels.audioDepartment} — no-signal, feedback, wireless, and power issues with step-by-step fixes.`}
      icon={AlertTriangle}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Troubleshooting" },
      ]}
      progress={{
        stats: progress,
        loadFromStorage: loadProgress,
        title: "Diagnostic Progress",
        description: "Track troubleshooting steps across all issues",
      }}
    >
      <section>
        <SectionHeader
          title="Diagnostic Wizards"
          description="Work through each issue step-by-step — progress saves automatically"
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No issues found"
            description="Try a different search term to find troubleshooting guides."
          />
        ) : (
          <div className="space-y-6">
            {filtered.map((issue) => (
              <div key={issue.id} id={`issue-${issue.id}`} className="scroll-mt-28">
                <DiagnosticWizard
                  issue={issue}
                  checked={checked}
                  onToggle={toggleItem}
                  storageId={TROUBLESHOOTING_STORAGE_ID}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader title="Emergency Checklist" />
        <ContentBlockRenderer
          blocks={troubleshootingBlocks}
          storageId={TROUBLESHOOTING_STORAGE_ID}
          checked={checked}
          onToggle={toggleItem}
          defaultOpenFirst={false}
        />
      </section>
    </AudioPageShell>
  );
}
