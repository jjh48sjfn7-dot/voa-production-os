"use client";

import type { LucideIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DocumentationList } from "@/components/audio/v2/documentation/DocumentationList";
import { EquipmentRelatedList } from "@/components/audio/v2/equipment/EquipmentRelatedList";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import type { TroubleshootingGuide } from "@/data/audio/v2/troubleshooting/types";
import { audioStyles } from "@/lib/audio-styles";
import { voaLabels } from "@/data/audio/venue";
import { SignalFlowPathView } from "@/components/signal-flow/SignalFlowPathView";

interface TroubleshootingGuideViewProps {
  title: string;
  icon: LucideIcon;
  guide: TroubleshootingGuide;
}

export function TroubleshootingGuideView({
  title,
  icon,
  guide,
}: TroubleshootingGuideViewProps) {
  return (
    <AudioPageShell
      title={title}
      description="Follow the signal path to diagnose the problem."
      icon={icon}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Troubleshooting", href: "/audio/troubleshooting" },
        { label: title },
      ]}
      compactMobile
    >
      <div className="space-y-8 sm:space-y-10">
        <EquipmentSection title="Problem">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {guide.problem}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Signal Path">
          <SignalFlowPathView path={guide.signalPath} />
        </EquipmentSection>

        <EquipmentSection title="Things to Check">
          <DocumentationList items={guide.checks} />
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
