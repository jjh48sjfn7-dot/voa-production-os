import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface EquipmentItemRowProps {
  title: string;
  href: string;
}

export function EquipmentItemRow({ title, href }: EquipmentItemRowProps) {
  return (
    <Link
      href={href}
      className="flex min-h-[52px] items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5 sm:py-4"
    >
      <p className="flex-1 text-base font-medium text-slate-50">{title}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </Link>
  );
}
