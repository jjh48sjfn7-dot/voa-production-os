"use client";

import type { LucideIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DocumentationList } from "@/components/audio/v2/documentation/DocumentationList";
import { EquipmentRelatedList } from "@/components/audio/v2/equipment/EquipmentRelatedList";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import type { TroubleshootingGuide } from "@/data/audio/v2/troubleshooting/types";
import { SignalFlowPathView } from "@/components/signal-flow/SignalFlowPathView";
import { audioStyles } from "@/lib/audio-styles";

interface MediaTroubleshootingGuideViewProps {
  title: string;
  icon: LucideIcon;
  guide: TroubleshootingGuide;
}

export function MediaTroubleshootingGuideView({
  title,
  icon,
  guide,
}: MediaTroubleshootingGuideViewProps) {
  return (
    <AudioPageShell
      title={title}
      description="Start with the checks below — verify physical display paths first."
      icon={icon}
      breadcrumbs={[
        { label: "Media Department", href: "/media" },
        { label: "Troubleshooting", href: "/media/troubleshooting" },
        { label: title },
      ]}
      compactMobile
      backHref="/media"
      backLabel="Back to Media Department"
      accent="media"
    >
      <div className="space-y-8 sm:space-y-10">
        <EquipmentSection title="Problem">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {guide.problem}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Things to Check">
          <DocumentationList items={guide.checks} />
        </EquipmentSection>

        <EquipmentSection title="Signal Path">
          <SignalFlowPathView path={guide.signalPath} accent="media" />
        </EquipmentSection>

        <EquipmentSection title="Related Equipment">
          <EquipmentRelatedList items={guide.relatedEquipment} />
        </EquipmentSection>

        <EquipmentSection title="Related Documentation">
          <EquipmentRelatedList items={guide.relatedDocumentation} />
        </EquipmentSection>
      </div>
    </AudioPageShell>
  );
}
