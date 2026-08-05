import { EquipmentChannelList } from "@/components/audio/v2/equipment/EquipmentChannelList";
import { EquipmentConnectionNotes } from "@/components/audio/v2/equipment/EquipmentConnectionNotes";
import { EquipmentHeader } from "@/components/audio/v2/equipment/EquipmentHeader";
import { EquipmentConnections } from "@/components/audio/v2/equipment/EquipmentConnections";
import { EquipmentDownloads } from "@/components/audio/v2/equipment/EquipmentDownloads";
import { EquipmentQuickChecklist } from "@/components/audio/v2/equipment/EquipmentQuickChecklist";
import { EquipmentRelatedList } from "@/components/audio/v2/equipment/EquipmentRelatedList";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { EquipmentSundaySetupLink } from "@/components/audio/v2/equipment/EquipmentSundaySetupLink";
import { EquipmentTroubleshooting } from "@/components/audio/v2/equipment/EquipmentTroubleshooting";
import { getEquipmentCategory } from "@/data/audio/v2/equipment";
import type { EquipmentDefinition } from "@/data/audio/v2/equipment/types";
import { audioStyles } from "@/lib/audio-styles";

interface EquipmentDetailPageProps {
  equipment: EquipmentDefinition;
}

export function EquipmentDetailPage({ equipment }: EquipmentDetailPageProps) {
  const category = getEquipmentCategory(equipment.categoryId);
  const backHref = category?.href ?? "/audio/equipment";
  const backLabel = category
    ? `Back to ${category.title}`
    : "Back to Equipment";

  const hasQuickStart = !!equipment.quickStart?.length;
  const hasInputs = !!equipment.inputs?.length;
  const hasOutputs = !!equipment.outputs?.length;
  const hasConnections = !!equipment.connections?.length;
  const hasConnectionNotes = !!equipment.connectionNotes?.length;
  const hasCommonProblems = !!equipment.commonProblems?.length;
  const hasDownloads = !!equipment.downloads?.length;
  const hasRelated = !!equipment.relatedEquipment?.length;

  return (
    <div>
      <EquipmentHeader
        name={equipment.name}
        backHref={backHref}
        backLabel={backLabel}
        image={equipment.image}
      />

      <div className="mt-8 space-y-8 sm:space-y-10">
        {equipment.purpose && (
          <EquipmentSection title="Purpose">
            <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
              {equipment.purpose}
            </p>
          </EquipmentSection>
        )}

        {hasQuickStart && (
          <EquipmentSection title="Quick Start">
            <EquipmentQuickChecklist items={equipment.quickStart!} />
          </EquipmentSection>
        )}

        {hasInputs && (
          <EquipmentSection title="Inputs">
            <EquipmentChannelList channels={equipment.inputs!} />
          </EquipmentSection>
        )}

        {hasOutputs && (
          <EquipmentSection title="Outputs">
            <EquipmentChannelList channels={equipment.outputs!} />
          </EquipmentSection>
        )}

        {hasConnections && (
          <EquipmentSection title="Connections">
            <EquipmentConnections groups={equipment.connections!} />
          </EquipmentSection>
        )}

        {equipment.sundaySetup && (
          <EquipmentSection title="Sunday Setup">
            <EquipmentSundaySetupLink
              href={equipment.sundaySetup.href}
              label={equipment.sundaySetup.label}
              description={equipment.sundaySetup.description}
            />
          </EquipmentSection>
        )}

        {hasConnectionNotes && (
          <EquipmentSection title="Connection Notes">
            <EquipmentConnectionNotes notes={equipment.connectionNotes!} />
          </EquipmentSection>
        )}

        {hasCommonProblems && (
          <EquipmentSection title="Common Problems">
            <EquipmentTroubleshooting items={equipment.commonProblems!} />
          </EquipmentSection>
        )}

        {hasDownloads && (
          <EquipmentSection title="Downloads">
            <EquipmentDownloads downloads={equipment.downloads!} />
          </EquipmentSection>
        )}

        {hasRelated && (
          <EquipmentSection title="Related Equipment">
            <EquipmentRelatedList items={equipment.relatedEquipment!} />
          </EquipmentSection>
        )}
      </div>
    </div>
  );
}
