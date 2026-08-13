"use client";

import type { LucideIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DocumentationChannelGroups } from "@/components/audio/v2/documentation/DocumentationChannelGroups";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { DocumentationList } from "@/components/audio/v2/documentation/DocumentationList";
import { DocumentationRelatedResources } from "@/components/audio/v2/documentation/DocumentationRelatedResources";
import { DocumentationTable } from "@/components/audio/v2/documentation/DocumentationTable";
import { SetupReferenceSequence } from "@/components/shared/SetupReferenceSequence";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import { audioStyles } from "@/lib/audio-styles";
import { referenceSequences } from "@/lib/reference-photos";
import { voaLabels } from "@/data/audio/venue";

interface DocumentationPageContentProps {
  title: string;
  icon: LucideIcon;
  content: DocumentationPageContent;
}

export function DocumentationPageView({
  title,
  icon,
  content,
}: DocumentationPageContentProps) {
  const hasTables = !!content.tableSections?.length;
  const hasChannelGroups = !!content.channelGroups?.length;
  const hasLists = !!content.listSections?.length;
  const hasInfoSections = !!content.infoSections?.length;
  const hasRelatedResources = !!content.relatedResources?.length;
  const isPlaceholder = !!content.placeholderMessage;

  function getVisualSupplement(sectionTitle?: string) {
    if (!sectionTitle || !content.visualSupplements?.length) return undefined;
    return content.visualSupplements.find(
      (supplement) => supplement.afterListSectionTitle === sectionTitle
    );
  }

  return (
    <AudioPageShell
      title={title}
      description={content.subtitle ?? `${voaLabels.audioDepartment} reference`}
      icon={icon}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Documentation", href: "/audio/documentation" },
        { label: title },
      ]}
      compactMobile
    >
      <div className="space-y-8 sm:space-y-10">
        {content.headerInfo && (
          <EquipmentSection title={content.headerInfo.title}>
            <DocumentationInfoCard body={content.headerInfo.body} />
          </EquipmentSection>
        )}

        <EquipmentSection title="Purpose">
          <p className={`${audioStyles.body} leading-relaxed text-slate-300`}>
            {content.purpose}
          </p>
        </EquipmentSection>

        {isPlaceholder && (
          <div className={`${audioStyles.card} ${audioStyles.cardPad} ${audioStyles.body} text-slate-400`}>
            {content.placeholderMessage}
          </div>
        )}

        {hasTables &&
          content.tableSections!.map((section) => (
            <EquipmentSection key={section.title} title={section.title}>
              <DocumentationTable
                columns={section.columns}
                rows={section.rows}
              />
            </EquipmentSection>
          ))}

        {hasChannelGroups && (
          <DocumentationChannelGroups groups={content.channelGroups!} />
        )}

        {hasInfoSections &&
          content.infoSections!.map((section) => (
            <EquipmentSection key={section.title} title={section.title}>
              <DocumentationInfoCard body={section.body} />
            </EquipmentSection>
          ))}

        {hasLists &&
          content.listSections!.map((section) => {
            const supplement = getVisualSupplement(section.title);

            return (
              <div key={section.title ?? section.items[0]} className="space-y-8">
                <EquipmentSection
                  title={section.title ?? "Guide"}
                >
                  <DocumentationList items={section.items} />
                </EquipmentSection>

                {supplement && (
                  <EquipmentSection
                    title={referenceSequences[supplement.sequenceKey].title}
                  >
                    <SetupReferenceSequence
                      sequence={referenceSequences[supplement.sequenceKey]}
                    />
                  </EquipmentSection>
                )}
              </div>
            );
          })}

        {hasRelatedResources && (
          <EquipmentSection title="Related Resources">
            <DocumentationRelatedResources resources={content.relatedResources!} />
          </EquipmentSection>
        )}
      </div>
    </AudioPageShell>
  );
}
