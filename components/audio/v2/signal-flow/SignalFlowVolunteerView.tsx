import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DocumentationInfoCard } from "@/components/audio/v2/documentation/DocumentationInfoCard";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { SignalFlowGroup } from "@/components/audio/v2/signal-flow/SignalFlowGroup";
import type { SignalFlowVolunteerDocument } from "@/data/audio/v2/documentation/signal-flow-types";
import { audioStyles } from "@/lib/audio-styles";

interface SignalFlowVolunteerViewProps {
  document: SignalFlowVolunteerDocument;
}

export function SignalFlowVolunteerView({
  document,
}: SignalFlowVolunteerViewProps) {
  return (
    <div className="space-y-10 sm:space-y-12">
      <EquipmentSection title={document.intro.title}>
        <DocumentationInfoCard body={document.intro.body} />
      </EquipmentSection>

      {document.groups.map((group, index) => (
        <div key={group.id}>
          <SignalFlowGroup group={group} />
          {index < document.groups.length - 1 && (
            <div
              className="mt-10 border-t border-dashed border-white/[0.08] sm:mt-12"
              aria-hidden
            />
          )}
        </div>
      ))}

      <EquipmentSection title="Related Documentation">
        <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
          {document.relatedDocumentation.map((link) => (
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
    </div>
  );
}
