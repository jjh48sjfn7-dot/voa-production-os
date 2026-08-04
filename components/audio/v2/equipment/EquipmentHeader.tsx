import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { EquipmentImage } from "@/components/audio/v2/equipment/EquipmentImage";

interface EquipmentHeaderProps {
  name: string;
  backHref: string;
  backLabel: string;
  image?: string;
}

export function EquipmentHeader({
  name,
  backHref,
  backLabel,
  image,
}: EquipmentHeaderProps) {
  return (
    <>
      <AudioSubpageHeader
        backHref={backHref}
        backLabel={backLabel}
        title={name}
      />
      <div className="mt-4 sm:mt-5">
        <EquipmentImage name={name} src={image} />
      </div>
    </>
  );
}
