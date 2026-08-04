import { EquipmentHeader } from "@/components/audio/v2/equipment/EquipmentHeader";
import { ConnectionCardList } from "@/components/audio/v2/equipment/ConnectionCard";
import { DownloadRowList } from "@/components/audio/v2/equipment/DownloadRow";
import { EquipmentQuickChecklist } from "@/components/audio/v2/equipment/EquipmentQuickChecklist";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { EquipmentSundaySetupLink } from "@/components/audio/v2/equipment/EquipmentSundaySetupLink";
import { RelatedEquipmentList } from "@/components/audio/v2/equipment/RelatedEquipmentList";
import { TroubleshootingAccordion } from "@/components/audio/v2/equipment/TroubleshootingAccordion";
import type { EquipmentManual } from "@/data/audio/v2/equipment-manuals/types";
import { audioStyles } from "@/lib/audio-styles";

interface EquipmentManualContentProps {
  manual: EquipmentManual;
}

export function EquipmentManualContent({ manual }: EquipmentManualContentProps) {
  return (
    <div>
      <EquipmentHeader
        name={manual.name}
        backHref={manual.categoryHref}
        backLabel={`Back to ${manual.categoryTitle}`}
      />

      <div className="mt-8 space-y-8 sm:space-y-10">
        <EquipmentSection title="Purpose">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {manual.purpose}
          </p>
        </EquipmentSection>

        <EquipmentSection title="Quick Start">
          <EquipmentQuickChecklist items={manual.quickStart} />
        </EquipmentSection>

        <EquipmentSection title="Connections">
          <ConnectionCardList groups={manual.connections} />
        </EquipmentSection>

        <EquipmentSection title="Sunday Setup">
          <EquipmentSundaySetupLink
            href={manual.sundaySetup.href}
            label={manual.sundaySetup.label}
            description={manual.sundaySetup.description}
          />
        </EquipmentSection>

        <EquipmentSection title="Common Problems">
          <TroubleshootingAccordion items={manual.troubleshooting} />
        </EquipmentSection>

        <EquipmentSection title="Downloads">
          <DownloadRowList downloads={manual.downloads} />
        </EquipmentSection>

        <EquipmentSection title="Related Equipment">
          <RelatedEquipmentList items={manual.related} />
        </EquipmentSection>
      </div>
    </div>
  );
}
