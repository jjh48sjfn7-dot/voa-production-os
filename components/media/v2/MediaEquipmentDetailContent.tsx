"use client";

import { notFound } from "next/navigation";
import { EquipmentBestPractices } from "@/components/audio/v2/equipment/EquipmentBestPractices";
import { EquipmentHeader } from "@/components/audio/v2/equipment/EquipmentHeader";
import { EquipmentPrimaryConnections } from "@/components/audio/v2/equipment/EquipmentPrimaryConnections";
import { EquipmentQuickChecklist } from "@/components/audio/v2/equipment/EquipmentQuickChecklist";
import { EquipmentRelatedList } from "@/components/audio/v2/equipment/EquipmentRelatedList";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { EquipmentSetupLinks } from "@/components/audio/v2/equipment/EquipmentSetupLinks";
import { EquipmentSpecifications } from "@/components/audio/v2/equipment/EquipmentSpecifications";
import { EquipmentTroubleshooting } from "@/components/audio/v2/equipment/EquipmentTroubleshooting";
import {
  getMediaEquipmentBySlug,
  getMediaEquipmentCategory,
} from "@/data/media/v2/equipment";
import { audioStyles } from "@/lib/audio-styles";

interface MediaEquipmentDetailContentProps {
  slug: string;
}

export function MediaEquipmentDetailContent({ slug }: MediaEquipmentDetailContentProps) {
  const equipment = getMediaEquipmentBySlug(slug);

  if (!equipment) {
    notFound();
  }

  const category = getMediaEquipmentCategory(equipment.categoryId);
  const backHref = category?.href ?? "/media/equipment";
  const backLabel = category
    ? `Back to ${category.title}`
    : "Back to Equipment";

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

        {equipment.quickStart?.length ? (
          <EquipmentSection title="Quick Start">
            <EquipmentQuickChecklist items={equipment.quickStart} />
          </EquipmentSection>
        ) : null}

        {equipment.specifications?.length ? (
          <EquipmentSection title="Specifications">
            <EquipmentSpecifications items={equipment.specifications} />
          </EquipmentSection>
        ) : null}

        {equipment.primaryConnections?.length ? (
          <EquipmentSection title="Primary Connections">
            <EquipmentPrimaryConnections
              connections={equipment.primaryConnections}
            />
          </EquipmentSection>
        ) : null}

        {equipment.setupLinks?.length ? (
          <EquipmentSection title="Related Documentation">
            <EquipmentSetupLinks links={equipment.setupLinks} />
          </EquipmentSection>
        ) : null}

        {equipment.bestPractices?.length ? (
          <EquipmentSection title="Best Practices">
            <EquipmentBestPractices practices={equipment.bestPractices} />
          </EquipmentSection>
        ) : null}

        {equipment.commonProblems?.length ? (
          <EquipmentSection title="Common Problems">
            <EquipmentTroubleshooting items={equipment.commonProblems} />
          </EquipmentSection>
        ) : null}

        {equipment.relatedEquipment?.length ? (
          <EquipmentSection title="Related Equipment">
            <EquipmentRelatedList items={equipment.relatedEquipment} />
          </EquipmentSection>
        ) : null}
      </div>
    </div>
  );
}
