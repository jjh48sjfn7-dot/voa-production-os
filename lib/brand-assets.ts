/** Official VOA Antioch brand assets — public/brand/logos */
export const brandAssets = {
  primary: "/brand/logos/voa-primary.png",
  compact: "/brand/logos/voa-compact.png",
  mark: "/brand/logos/voa-mark.png",
  markDark: "/brand/logos/voa-mark-dark.png",
  circle: "/brand/logos/voa-circle.png",
  wordmark: "/brand/logos/voa-wordmark.png",
  square: "/brand/logos/voa-square.png",
  primaryDark: "/brand/logos/voa-primary-dark.png",
  primaryLight: "/brand/logos/voa-primary-light.png",
} as const;

export type BrandAssetKey = keyof typeof brandAssets;

/** Native pixel dimensions — used for Next.js Image width/height (aspect ratio only). */
export const brandAssetDimensions: Record<
  BrandAssetKey,
  { width: number; height: number }
> = {
  primary: { width: 896, height: 361 },
  compact: { width: 790, height: 187 },
  mark: { width: 315, height: 210 },
  markDark: { width: 355, height: 215 },
  circle: { width: 211, height: 212 },
  wordmark: { width: 400, height: 187 },
  square: { width: 252, height: 220 },
  primaryDark: { width: 415, height: 215 },
  primaryLight: { width: 434, height: 215 },
};
