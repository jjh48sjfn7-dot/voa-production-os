"use client";

import type { LucideIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DocumentationList } from "@/components/audio/v2/documentation/DocumentationList";
import { EquipmentRelatedList } from "@/components/audio/v2/equipment/EquipmentRelatedList";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import type { TroubleshootingGuide } from "@/data/audio/v2/troubleshooting/types";
import { SignalFlowPathView } from "@/components/signal-flow/SignalFlowPathView";
import { audioStyles } from "@/lib/audio-styles";

interface LightingTroubleshootingGuideViewProps {
  title: string;
  icon: LucideIcon;
  guide: TroubleshootingGuide;
}

export function LightingTroubleshootingGuideView({
  title,
  icon,
  guide,
}: LightingTroubleshootingGuideViewProps) {
  return (
    <AudioPageShell
      title={title}
      description="Follow the signal path to diagnose the problem."
      icon={icon}
      breadcrumbs={[
        { label: "Lighting Department", href: "/lighting" },
        { label: "Troubleshooting", href: "/lighting/troubleshooting" },
        { label: title },
      ]}
      compactMobile
      backHref="/lighting"
      backLabel="Back to Lighting Department"
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
          <SignalFlowPathView path={guide.signalPath} />
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
