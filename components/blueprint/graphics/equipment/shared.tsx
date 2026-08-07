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
