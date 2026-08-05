import { ChevronDown } from "lucide-react";
import { SundaySetupSectionIcon } from "@/components/audio/v2/SundaySetupSectionIcon";
import { audioStyles } from "@/lib/audio-styles";

export function SignalFlowConnector() {
  return (
    <div className="flex justify-center py-1">
      <ChevronDown className="h-5 w-5 text-slate-600" aria-hidden />
    </div>
  );
}

interface SignalFlowLabelCardProps {
  name: string;
  emoji: string;
}

export function SignalFlowLabelCard({ name, emoji }: SignalFlowLabelCardProps) {
  return (
    <div
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card}`}
    >
      <SundaySetupSectionIcon emoji={emoji} />
      <p className="flex-1 text-base font-semibold text-slate-50">{name}</p>
    </div>
  );
}
