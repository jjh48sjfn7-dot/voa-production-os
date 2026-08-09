import { getProductionIcon, type ProductionIconId } from "@/lib/production-icons";
import { departmentAccents, type DepartmentAccent } from "@/lib/theme";

interface ProductionIconTileProps {
  icon: ProductionIconId;
  accent?: DepartmentAccent;
  size?: "md" | "sm";
}

export function ProductionIconTile({
  icon,
  accent = "audio",
  size = "md",
}: ProductionIconTileProps) {
  const Icon = getProductionIcon(icon);
  const colors = departmentAccents[accent];
  const boxClass =
    size === "sm"
      ? "h-10 w-10 rounded-lg"
      : "h-12 w-12 rounded-xl";
  const iconClass = size === "sm" ? "h-5 w-5" : "h-6 w-6";

  return (
    <div
      className={`flex shrink-0 items-center justify-center ring-1 ring-white/[0.06] ${boxClass} ${colors.iconBg}`}
    >
      <Icon className={`${iconClass} stroke-[1.75]`} aria-hidden />
    </div>
  );
}
