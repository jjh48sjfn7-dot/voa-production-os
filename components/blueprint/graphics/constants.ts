/** Shared visual tokens for blueprint equipment illustrations */

export const BLUEPRINT_STROKE = "currentColor";
export const BLUEPRINT_STROKE_WIDTH = 1.6;
export const BLUEPRINT_STROKE_WIDTH_BOLD = 2.1;
export const BLUEPRINT_FILL = "rgba(148,163,184,0.12)";
export const BLUEPRINT_FILL_STRONG = "rgba(148,163,184,0.2)";

/**
 * Future approved raster/SVG assets may replace inline illustrations.
 * @see /docs/reference/equipment/README.md
 */
export const blueprintEquipmentAssetPaths = {
  referenceDocs: "/docs/reference/equipment",
  publicAssets: "/public/blueprint/equipment",
} as const;
