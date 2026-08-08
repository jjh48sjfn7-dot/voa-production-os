import { lightingEquipmentCategories } from "@/data/lighting/v2/equipment/categories";
import { lightingEquipmentItems } from "@/data/lighting/v2/equipment/items";
import type {
  EquipmentCategory,
  EquipmentCategoryItem,
  EquipmentDefinition,
} from "@/data/lighting/v2/equipment/types";

const equipmentBySlug = new Map(
  lightingEquipmentItems.map((item) => [item.slug, item])
);

export function getLightingEquipmentBySlug(
  slug: string
): EquipmentDefinition | undefined {
  return equipmentBySlug.get(slug);
}

export function getAllLightingEquipmentSlugs(): string[] {
  return lightingEquipmentItems.map((item) => item.slug);
}

export function getLightingEquipmentItemRouteSlugs(): string[] {
  const categorySlugs = lightingEquipmentCategories.flatMap(
    (category) => category.itemSlugs
  );
  return [...new Set([...categorySlugs, ...getAllLightingEquipmentSlugs()])];
}

export function getLightingEquipmentCategory(
  id: string
): EquipmentCategory | undefined {
  return lightingEquipmentCategories.find((category) => category.id === id);
}

export function getLightingEquipmentItemHref(slug: string): string {
  return `/lighting/equipment/item/${slug}`;
}

export function getLightingCategoryItems(
  categoryId: string
): EquipmentCategoryItem[] {
  const category = getLightingEquipmentCategory(categoryId);

  if (!category) {
    return [];
  }

  return category.itemSlugs.map((slug) => {
    const equipment = getLightingEquipmentBySlug(slug);

    return {
      id: equipment?.id ?? slug,
      title: equipment?.name ?? slug,
      slug,
    };
  });
}

export function getLightingEquipmentDetailParams(): {
  category: string;
  slug: string;
}[] {
  return lightingEquipmentCategories.flatMap((category) =>
    category.itemSlugs.map((slug) => ({
      category: category.id,
      slug,
    }))
  );
}

export { lightingEquipmentCategories, lightingEquipmentItems };

export type {
  EquipmentCategory,
  EquipmentCategoryItem,
  EquipmentDefinition,
} from "@/data/lighting/v2/equipment/types";
