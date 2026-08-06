import { EquipmentCard } from "@/components/shared/EquipmentCard";

interface EquipmentSundaySetupLinkProps {
  href: string;
  label: string;
  description?: string;
}

export function EquipmentSundaySetupLink({
  href,
  label,
  description,
}: EquipmentSundaySetupLinkProps) {
  return (
    <EquipmentCard href={href} title={label} description={description} />
  );
}
