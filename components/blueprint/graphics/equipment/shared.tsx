import type { ReactNode } from "react";
import {
  BLUEPRINT_FILL,
  BLUEPRINT_FILL_STRONG,
  BLUEPRINT_STROKE,
  BLUEPRINT_STROKE_WIDTH,
  BLUEPRINT_STROKE_WIDTH_BOLD,
} from "@/components/blueprint/graphics/constants";

export function GraphicSvg({
  children,
  viewBox = "0 0 80 80",
  className,
}: {
  children: ReactNode;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const s = BLUEPRINT_STROKE;
export const sw = BLUEPRINT_STROKE_WIDTH;
export const swb = BLUEPRINT_STROKE_WIDTH_BOLD;
export const fill = BLUEPRINT_FILL;
export const fillStrong = BLUEPRINT_FILL_STRONG;

/** Contact shadow beneath equipment */
export function EquipmentShadow({ cx, cy, rx = 18, ry = 6 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return (
    <>
      <ellipse cx={cx} cy={cy + 0.8} rx={rx * 1.05} ry={ry * 1.1} fill="rgba(0,0,0,0.45)" opacity={0.35} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0,0,0,0.5)" opacity={0.55} />
    </>
  );
}
