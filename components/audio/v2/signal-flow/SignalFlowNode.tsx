import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import {
  getEquipmentBySlug,
  getEquipmentItemHref,
} from "@/data/audio/v2/equipment";
import type { SignalFlowStep } from "@/data/audio/v2/documentation/signal-flow-types";
import { audioStyles } from "@/lib/audio-styles";

interface SignalFlowNodeProps {
  step: SignalFlowStep;
}

function getStepHref(step: SignalFlowStep): string | undefined {
  if (step.href) {
    return step.href;
  }

  if (!step.equipmentSlug) {
    return undefined;
  }

  if (!getEquipmentBySlug(step.equipmentSlug)) {
    return undefined;
  }

  return getEquipmentItemHref(step.equipmentSlug);
}

export function SignalFlowNode({ step }: SignalFlowNodeProps) {
  const href = getStepHref(step);
  const emoji = step.emoji ?? "•";

  const content = (
    <>
      <SundaySetupSectionIcon emoji={emoji} />
      <div className="min-w-0 flex-1 space-y-1">
        {step.helper && (
          <p className="text-sm text-slate-500">{step.helper}</p>
        )}
        {step.lines.map((line, index) => (
          <p
            key={line}
            className={
              index === 0
                ? "text-base font-semibold text-slate-50"
                : "text-sm text-slate-300"
            }
          >
            {line}
          </p>
        ))}
      </div>
      {href && <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card} ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.03]`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card}`}
    >
      {content}
    </div>
  );
}
