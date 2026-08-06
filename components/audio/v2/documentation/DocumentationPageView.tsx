"use client";

import type { LucideIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { DocumentationList } from "@/components/audio/v2/documentation/DocumentationList";
import { DocumentationRelatedResources } from "@/components/audio/v2/documentation/DocumentationRelatedResources";
import { DocumentationTable } from "@/components/audio/v2/documentation/DocumentationTable";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";
import { audioStyles } from "@/lib/audio-styles";
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
  const hasLists = !!content.listSections?.length;
  const hasRelatedResources = !!content.relatedResources?.length;
  const isPlaceholder = !!content.placeholderMessage;

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
            <DocumentationRelatedResources resources={content.relatedResources!} />
          </EquipmentSection>
        )}
      </div>
    </AudioPageShell>
  );
}
