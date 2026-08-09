import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import { shellTokens, type DepartmentAccent } from "@/lib/theme";

interface AppSubpageHeaderProps {
  backHref: string;
  backLabel: string;
  title: string;
  accent?: DepartmentAccent;
}

export function AppSubpageHeader({
  backHref,
  backLabel,
  title,
  accent = "audio",
}: AppSubpageHeaderProps) {
  return (
    <div
      className={`${shellTokens.pageHeader.strip} ${shellTokens.pageHeader.accentBorder[accent]}`}
    >
      <div className="flex items-center gap-3">
        <Link
          href={backHref}
          className={`flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/45 ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/80`}
          aria-label={backLabel}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold text-white sm:text-lg">{title}</h1>
      </div>
    </div>
  );
}
