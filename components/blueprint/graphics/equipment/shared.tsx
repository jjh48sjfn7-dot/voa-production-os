import type { ReactNode } from "react";
import {
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

/** Subtle contact shadow drawn beneath equipment in SVG space */
export function EquipmentShadow({ cx, cy, rx = 18, ry = 6 }: { cx: number; cy: number; rx?: number; ry?: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="rgba(0,0,0,0.35)"
      opacity={0.5}
    />
  );
}
