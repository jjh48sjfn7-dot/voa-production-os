import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { StageArea } from "@/components/stage-plot/StageArea";
import type { StagePlotArea, StagePlotDocument } from "@/data/stage-plot/types";
import { audioStyles } from "@/lib/audio-styles";

type StagePlotLayoutBlock =
  | { type: "area"; area: StagePlotArea }
  | { type: "columns"; areas: StagePlotArea[] };

function buildLayoutBlocks(areas: StagePlotArea[]): StagePlotLayoutBlock[] {
  const sorted = [...areas].sort((a, b) => a.order - b.order);
  const blocks: StagePlotLayoutBlock[] = [];
  let index = 0;

  while (index < sorted.length) {
    const area = sorted[index];

    if (area.columnGroup) {
      const group = area.columnGroup;
      const columnAreas: StagePlotArea[] = [];

      while (index < sorted.length && sorted[index].columnGroup === group) {
        columnAreas.push(sorted[index]);
        index += 1;
      }

      blocks.push({ type: "columns", areas: columnAreas });
      continue;
    }

    blocks.push({ type: "area", area });
    index += 1;
  }

  return blocks;
}

interface StagePlotProps {
  document: StagePlotDocument;
}

export function StagePlot({ document }: StagePlotProps) {
  const blocks = buildLayoutBlocks(document.areas);

  return (
    <div className="space-y-8 sm:space-y-10">
      {blocks.map((block) => {
        if (block.type === "columns") {
          return (
            <div
              key={block.areas.map((area) => area.id).join("-")}
              className="grid gap-6 md:grid-cols-3 md:gap-4"
            >
              {block.areas.map((area) => (
                <StageArea key={area.id} area={area} />
              ))}
            </div>
          );
        }

        return <StageArea key={block.area.id} area={block.area} />;
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
