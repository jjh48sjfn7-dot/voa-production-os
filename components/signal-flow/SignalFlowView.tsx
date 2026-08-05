import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { SignalFlowPathView } from "@/components/signal-flow/SignalFlowPathView";
import type { SignalFlowDocument } from "@/data/signal-flow/types";
import { audioStyles } from "@/lib/audio-styles";

interface SignalFlowViewProps {
  document: SignalFlowDocument;
}

export function SignalFlowView({ document }: SignalFlowViewProps) {
  return (
    <div className="space-y-10 sm:space-y-12">
      {document.paths.map((path, index) => (
        <div key={path.id}>
          <SignalFlowPathView path={path} />
          {index < document.paths.length - 1 && (
            <div
              className="my-8 border-t border-dashed border-white/[0.08] sm:my-10"
              aria-hidden
            />
          )}
        </div>
      ))}

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
