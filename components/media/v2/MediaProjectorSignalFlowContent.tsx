"use client";

import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { SignalFlowPathView } from "@/components/signal-flow/SignalFlowPathView";
import { mediaProjectorSignalFlowDocument } from "@/data/media/v2/documentation/projector-signal-flow";
import { audioStyles } from "@/lib/audio-styles";

export function MediaProjectorSignalFlowContent() {
  const doc = mediaProjectorSignalFlowDocument;

  return (
    <div>
      <AudioSubpageHeader
        backHref="/media/documentation"
        backLabel="Back to Documentation"
        title={doc.title}
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>{doc.subtitle}</p>

      <div className="mt-6 space-y-8 sm:mt-8 sm:space-y-10">
        <EquipmentSection title="Overview">
          <DocumentationInfoCard body={doc.intro} />
        </EquipmentSection>

        <EquipmentSection title="Weekly connections">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {doc.weeklyPathNote}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Permanent connections">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {doc.permanentPathNote}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Signal path">
          <SignalFlowPathView path={doc.signalPath} />
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
