import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";
import type { EquipmentDownload } from "@/data/audio/v2/equipment-manuals/types";

interface DownloadRowProps {
  download: EquipmentDownload;
}

export function DownloadRow({ download }: DownloadRowProps) {
  return (
    <Link
      href={download.href}
      className="flex min-h-[52px] items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5 sm:py-4"
    >
      <p className="flex-1 text-base font-medium text-slate-50">{download.label}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </Link>
  );
}

interface DownloadRowListProps {
  downloads: EquipmentDownload[];
}

export function DownloadRowList({ downloads }: DownloadRowListProps) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      {downloads.map((download) => (
        <DownloadRow key={download.label} download={download} />
      ))}
    </div>
  );
}
