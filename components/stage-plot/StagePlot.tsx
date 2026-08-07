import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { StagePlotMap } from "@/components/stage-plot/StagePlotMap";
import { StagePlotItem } from "@/components/stage-plot/StagePlotItem";
import type { StagePlotDocument } from "@/data/stage-plot/types";
import { audioStyles } from "@/lib/audio-styles";

interface StagePlotProps {
  document: StagePlotDocument;
}

export function StagePlot({ document }: StagePlotProps) {
  return (
    <div className="space-y-10 sm:space-y-12">
      <EquipmentSection title={document.intro.title}>
        <DocumentationInfoCard body={document.intro.body} />
      </EquipmentSection>

      <EquipmentSection title="Stage Layout">
        <StagePlotMap document={document} />
      </EquipmentSection>

      <EquipmentSection title="Location Notes">
        <div className="space-y-3">
          {document.items.map((item, index) => (
            <div key={item.id}>
              <StagePlotItem item={item} />
              {index < document.items.length - 1 && (
                <div
                  className="my-4 border-t border-dashed border-white/[0.08]"
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </EquipmentSection>

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
