import { ImageIcon } from "lucide-react";
import { theme } from "@/lib/theme";

interface EquipmentImageProps {
  name: string;
  src?: string;
  alt?: string;
}

export function EquipmentImage({ name, src, alt }: EquipmentImageProps) {
  if (src) {
    return (
      <div
        className={`overflow-hidden rounded-2xl border ${theme.cardBorder} ${theme.surface} shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}
      >
        <div className="flex aspect-[4/3] max-h-[min(56vw,320px)] w-full items-center justify-center p-5 sm:max-h-[340px] sm:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? name}
            className="max-h-[86.5%] max-w-[86.5%] object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-[4/3] max-h-[min(56vw,320px)] w-full items-center justify-center rounded-2xl border ${theme.cardBorder} bg-[#141414]/60 sm:max-h-[340px]`}
      aria-label={`${name} photo placeholder`}
    >
      <div className="flex flex-col items-center gap-2 text-white/35">
        <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
        <p className="text-[13px] text-white/45">Photo coming soon</p>
      </div>
    </div>
  );
}
