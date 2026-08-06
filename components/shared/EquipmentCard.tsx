import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IconTile } from "@/components/shared/IconTile";
import { audioStyles } from "@/lib/audio-styles";

interface EquipmentCardProps {
  href: string;
  title: string;
  description?: string;
  emoji?: string;
}

export function EquipmentCard({
  href,
  title,
  description,
  emoji,
}: EquipmentCardProps) {
  return (
    <Link
      href={href}
      className={`flex min-h-[56px] items-center gap-3 px-4 py-3.5 sm:px-5 ${audioStyles.card} ${audioStyles.transition} hover:border-white/[0.12] hover:bg-white/[0.03]`}
    >
      {emoji && <IconTile emoji={emoji} />}
      <div className="min-w-0 flex-1">
        <p className="text-base font-semibold text-slate-50">{title}</p>
        {description && (
          <p className="mt-0.5 text-[13px] text-slate-500">{description}</p>
        )}
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </Link>
  );
}
