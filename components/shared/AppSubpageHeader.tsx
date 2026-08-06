import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";

interface AppSubpageHeaderProps {
  backHref: string;
  backLabel: string;
  title: string;
}

export function AppSubpageHeader({
  backHref,
  backLabel,
  title,
}: AppSubpageHeaderProps) {
  return (
    <div
      className={`sticky top-16 z-20 -mx-4 border-b border-white/[0.07] bg-[#080f1a]/95 px-4 py-2.5 backdrop-blur-xl md:-mx-0 md:px-0`}
    >
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-400 ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-slate-200`}
          aria-label={backLabel}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold text-slate-50 sm:text-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
