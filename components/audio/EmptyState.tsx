import type { LucideIcon } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${audioStyles.card} ${audioStyles.cardPadLg} py-16 text-center sm:py-20`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.04] text-slate-500 ring-1 ring-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className={`mt-5 ${audioStyles.displayLg}`}>{title}</h3>
      <p className={`mt-2 max-w-sm ${audioStyles.body}`}>{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
