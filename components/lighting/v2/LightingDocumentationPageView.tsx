"use client";

import type { LucideIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DocumentationChannelGroups } from "@/components/audio/v2/documentation/DocumentationChannelGroups";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { DocumentationList } from "@/components/audio/v2/documentation/DocumentationList";
import { DocumentationRelatedResources } from "@/components/audio/v2/documentation/DocumentationRelatedResources";
import { DocumentationTable } from "@/components/audio/v2/documentation/DocumentationTable";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import { audioStyles } from "@/lib/audio-styles";

interface LightingDocumentationPageViewProps {
  title: string;
  icon: LucideIcon;
  content: DocumentationPageContent;
}

export function LightingDocumentationPageView({
  title,
  icon,
  content,
}: LightingDocumentationPageViewProps) {
  const hasTables = !!content.tableSections?.length;
  const hasChannelGroups = !!content.channelGroups?.length;
  const hasLists = !!content.listSections?.length;
  const hasInfoSections = !!content.infoSections?.length;
  const hasRelatedResources = !!content.relatedResources?.length;
  const isPlaceholder = !!content.placeholderMessage;

  return (
    <AudioPageShell
      title={title}
      description={content.subtitle ?? "Lighting Department reference"}
      icon={icon}
      breadcrumbs={[
        { label: "Lighting Department", href: "/lighting" },
        { label: "Documentation", href: "/lighting/documentation" },
        { label: title },
      ]}
      compactMobile
      backHref="/lighting"
      backLabel="Back to Lighting Department"
      accent="lighting"
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
          <div
            className={`${audioStyles.card} ${audioStyles.cardPad} ${audioStyles.body} text-slate-400`}
          >
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
          content.listSections!.map((section) => (
            <EquipmentSection
              key={section.title ?? section.items[0]}
              title={section.title ?? "Guide"}
            >
              <DocumentationList items={section.items} />
            </EquipmentSection>
          ))}

        {hasRelatedResources && (
          <EquipmentSection title="Related Resources">
            <DocumentationRelatedResources
              resources={content.relatedResources!}
              accent="lighting"
            />
          </EquipmentSection>
        )}
      </div>
    </AudioPageShell>
  );
}
