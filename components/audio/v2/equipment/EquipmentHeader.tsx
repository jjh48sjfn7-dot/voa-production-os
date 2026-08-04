import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { EquipmentImagePlaceholder } from "@/components/audio/v2/equipment/EquipmentImagePlaceholder";

interface EquipmentHeaderProps {
  name: string;
  backHref: string;
  backLabel: string;
}

export function EquipmentHeader({
  name,
  backHref,
  backLabel,
}: EquipmentHeaderProps) {
  return (
    <>
      <AudioSubpageHeader
        backHref={backHref}
        backLabel={backLabel}
        title={name}
      />
      <div className="mt-4 sm:mt-5">
        <EquipmentImagePlaceholder name={name} />
      </div>
    </>
  );
}
