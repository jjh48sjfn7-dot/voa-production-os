import { EquipmentSundaySetupLink } from "@/components/audio/v2/equipment/EquipmentSundaySetupLink";
import type { EquipmentSundaySetupLink as SetupLink } from "@/data/audio/v2/equipment/types";

interface EquipmentSetupLinksProps {
  links: SetupLink[];
}

export function EquipmentSetupLinks({ links }: EquipmentSetupLinksProps) {
  return (
    <div className="space-y-2">
      {links.map((link) => (
        <EquipmentSundaySetupLink
          key={link.href + link.label}
          href={link.href}
          label={link.label}
          description={link.description}
        />
      ))}
    </div>
  );
}
