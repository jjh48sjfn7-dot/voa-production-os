import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { EquipmentImage } from "@/components/audio/v2/equipment/EquipmentImage";
import type { DepartmentAccent } from "@/lib/theme";

interface EquipmentHeaderProps {
  name: string;
  backHref: string;
  backLabel: string;
  image?: string;
  imageAlt?: string;
  accent?: DepartmentAccent;
}

export function EquipmentHeader({
  name,
  backHref,
  backLabel,
  image,
  imageAlt,
  accent = "audio",
}: EquipmentHeaderProps) {
  return (
    <>
      <AudioSubpageHeader
        backHref={backHref}
        backLabel={backLabel}
        title={name}
        accent={accent}
      />
      <div className="mt-4 sm:mt-5">
        <EquipmentImage name={name} src={image} alt={imageAlt} />
      </div>
    </>
  );
}
