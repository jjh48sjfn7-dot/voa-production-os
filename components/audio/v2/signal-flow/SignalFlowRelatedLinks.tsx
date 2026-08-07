import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { SignalFlowLink } from "@/data/audio/v2/documentation/signal-flow-types";
import { audioStyles } from "@/lib/audio-styles";

interface SignalFlowRelatedLinksProps {
  links: SignalFlowLink[];
  title?: string;
}

export function SignalFlowRelatedLinks({
  links,
  title = "Related Links",
}: SignalFlowRelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 pt-2">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
        {links.map((link) => (
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
    </div>
  );
}
