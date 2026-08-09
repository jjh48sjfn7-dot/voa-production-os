"use client";

import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { SignalFlowPathView } from "@/components/signal-flow/SignalFlowPathView";
import { lightingDmxSignalFlowDocument } from "@/data/lighting/v2/documentation/dmx-signal-flow";
import { audioStyles } from "@/lib/audio-styles";

export function LightingDmxSignalFlowContent() {
  const doc = lightingDmxSignalFlowDocument;

  return (
    <div>
      <AudioSubpageHeader
        backHref="/lighting/documentation"
        backLabel="Back to Documentation"
        title={doc.title}
        accent="lighting"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>{doc.subtitle}</p>

      <div className="mt-6 space-y-8 sm:mt-8 sm:space-y-10">
        <EquipmentSection title="Overview">
          <DocumentationInfoCard body={doc.intro} />
        </EquipmentSection>

        <EquipmentSection title="Weekly DMX run">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {doc.weeklyPathNote}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Permanent truss DMX">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {doc.permanentPathNote}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Signal path">
          <SignalFlowPathView path={doc.signalPath} accent="lighting" />
        </EquipmentSection>

        <EquipmentSection title="Teardown">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {doc.teardownNote}
          </p>
        </EquipmentSection>
      </div>
    </div>
  );
}
