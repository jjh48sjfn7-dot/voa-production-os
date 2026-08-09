"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { BlueprintItemPanel } from "@/components/blueprint/BlueprintItemPanel";
import { ChurchBlueprint } from "@/components/blueprint/ChurchBlueprint";
import { getBlueprintItem, theaterBlueprint } from "@/data/blueprint";
import { lightingPlotDocument } from "@/data/lighting/v2/lighting-plot";
import { audioStyles } from "@/lib/audio-styles";

export function LightingPlotContent() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const selectedItem = selectedItemId
    ? getBlueprintItem(theaterBlueprint, selectedItemId)
    : undefined;

  return (
    <div>
      <AudioSubpageHeader
        backHref="/lighting/documentation"
        backLabel="Back to Documentation"
        title={lightingPlotDocument.title}
        accent="lighting"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        {lightingPlotDocument.subtitle}
      </p>

      <div className="mt-6 space-y-8 sm:mt-8 sm:space-y-10">
        <EquipmentSection title={lightingPlotDocument.intro.title}>
          <DocumentationInfoCard body={lightingPlotDocument.intro.body} />
        </EquipmentSection>

        <EquipmentSection title="Lighting layout">
          <ChurchBlueprint
            blueprint={theaterBlueprint}
            overlay="lighting"
            variant="volunteer"
            selectedItemId={selectedItemId}
            onSelectItem={(id) =>
              setSelectedItemId((current) => (current === id ? null : id))
            }
          />
        </EquipmentSection>

        {selectedItem && (
          <BlueprintItemPanel
            blueprint={theaterBlueprint}
            item={selectedItem}
            volunteerMode
            onClose={() => setSelectedItemId(null)}
          />
        )}

        {lightingPlotDocument.relatedLinks.length > 0 && (
          <EquipmentSection title="Related documentation">
            <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
              {lightingPlotDocument.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex min-h-[52px] items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5 sm:py-4"
                >
                  <p className="flex-1 text-base font-medium text-slate-50">
                    {link.title}
                  </p>
                  <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
                </Link>
              ))}
            </div>
          </EquipmentSection>
        )}
      </div>
    </div>
  );
}
