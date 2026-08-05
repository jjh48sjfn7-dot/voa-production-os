import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { StagePlotZoneView } from "@/components/stage-plot/StagePlotZoneView";
import type { StagePlotDocument, StagePlotZone } from "@/data/stage-plot/types";
import { audioStyles } from "@/lib/audio-styles";

type StagePlotLayoutBlock =
  | { type: "zone"; zone: StagePlotZone }
  | { type: "columns"; zones: StagePlotZone[] };

function buildLayoutBlocks(zones: StagePlotZone[]): StagePlotLayoutBlock[] {
  const blocks: StagePlotLayoutBlock[] = [];
  let index = 0;

  while (index < zones.length) {
    const zone = zones[index];

    if (zone.columnGroup) {
      const group = zone.columnGroup;
      const columnZones: StagePlotZone[] = [];

      while (index < zones.length && zones[index].columnGroup === group) {
        columnZones.push(zones[index]);
        index += 1;
      }

      blocks.push({ type: "columns", zones: columnZones });
      continue;
    }

    blocks.push({ type: "zone", zone });
    index += 1;
  }

  return blocks;
}

interface StagePlotViewProps {
  document: StagePlotDocument;
}

export function StagePlotView({ document }: StagePlotViewProps) {
  const blocks = buildLayoutBlocks(document.zones);

  return (
    <div className="space-y-8 sm:space-y-10">
      {blocks.map((block) => {
        if (block.type === "columns") {
          return (
            <div
              key={block.zones.map((zone) => zone.id).join("-")}
              className="grid gap-6 md:grid-cols-3 md:gap-4"
            >
              {block.zones.map((zone) => (
                <StagePlotZoneView key={zone.id} zone={zone} />
              ))}
            </div>
          );
        }

        return <StagePlotZoneView key={block.zone.id} zone={block.zone} />;
      })}

      {document.relatedLinks.length > 0 && (
        <EquipmentSection title="Related Documentation">
          <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
            {document.relatedLinks.map((link) => (
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
  );
}
