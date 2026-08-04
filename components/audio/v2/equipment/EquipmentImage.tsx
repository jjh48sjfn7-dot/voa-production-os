import { ImageIcon } from "lucide-react";
import { audioStyles } from "@/lib/audio-styles";

interface EquipmentImageProps {
  name: string;
  src?: string;
}

export function EquipmentImage({ name, src }: EquipmentImageProps) {
  if (src) {
    return (
      <div className={`overflow-hidden rounded-2xl ${audioStyles.card}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02] ${audioStyles.card}`}
      aria-label={`${name} photo placeholder`}
    >
      <div className="flex flex-col items-center gap-2 text-slate-600">
        <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
        <p className="text-[13px] text-slate-500">Photo coming soon</p>
      </div>
    </div>
  );
}
