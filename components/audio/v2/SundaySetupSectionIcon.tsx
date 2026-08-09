import { ProductionIconTile } from "@/components/shared/ProductionIconTile";
import type { ProductionIconId } from "@/lib/production-icons";
import type { DepartmentAccent } from "@/lib/theme";

interface SundaySetupSectionIconProps {
  icon: ProductionIconId;
  accent?: DepartmentAccent;
}

export function SundaySetupSectionIcon({
  icon,
  accent = "audio",
}: SundaySetupSectionIconProps) {
  return <ProductionIconTile icon={icon} accent={accent} />;
}
