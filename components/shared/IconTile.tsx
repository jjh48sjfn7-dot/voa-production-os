import { ProductionIconTile } from "@/components/shared/ProductionIconTile";
import type { ProductionIconId } from "@/lib/production-icons";
import type { DepartmentAccent } from "@/lib/theme";

interface IconTileProps {
  icon: ProductionIconId;
  accent?: DepartmentAccent;
}

export function IconTile({ icon, accent = "audio" }: IconTileProps) {
  return <ProductionIconTile icon={icon} accent={accent} />;
}
