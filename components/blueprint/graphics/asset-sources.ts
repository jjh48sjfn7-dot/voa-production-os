import type { BlueprintGraphicId } from "@/data/blueprint/types";
import { blueprintEquipmentAssetPaths } from "@/components/blueprint/graphics/constants";

/**
 * Resolves optional future static asset URLs for blueprint equipment graphics.
 * Returns undefined when no local asset is registered (inline SVG is used).
 */
export function getBlueprintEquipmentAssetUrl(
  graphic: BlueprintGraphicId
): string | undefined {
  const registeredAssets: Partial<Record<BlueprintGraphicId, string>> = {
    // Example when assets are approved:
    // keyboard: `${blueprintEquipmentAssetPaths.publicAssets}/keyboard.svg`,
  };

  return registeredAssets[graphic];
}

export { blueprintEquipmentAssetPaths };
