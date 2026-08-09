import { mediaEquipmentCategories } from "@/data/media/v2/equipment/categories";
import { mediaEquipmentItems } from "@/data/media/v2/equipment/items";
import type {
  EquipmentCategory,
  EquipmentCategoryItem,
  EquipmentDefinition,
} from "@/data/media/v2/equipment/types";

const equipmentBySlug = new Map(
  mediaEquipmentItems.map((item) => [item.slug, item])
);

export function getMediaEquipmentBySlug(
  slug: string
): EquipmentDefinition | undefined {
  return equipmentBySlug.get(slug);
}

export function getAllMediaEquipmentSlugs(): string[] {
  return mediaEquipmentItems.map((item) => item.slug);
}

export function getMediaEquipmentItemRouteSlugs(): string[] {
  const categorySlugs = mediaEquipmentCategories.flatMap(
    (category) => category.itemSlugs
  );
  return [...new Set([...categorySlugs, ...getAllMediaEquipmentSlugs()])];
}

export function getMediaEquipmentCategory(
  id: string
): EquipmentCategory | undefined {
  return mediaEquipmentCategories.find((category) => category.id === id);
}

export function getMediaEquipmentItemHref(slug: string): string {
  return `/media/equipment/item/${slug}`;
}

export function getMediaCategoryItems(
  categoryId: string
): EquipmentCategoryItem[] {
  const category = getMediaEquipmentCategory(categoryId);

  if (!category) {
    return [];
  }

  return category.itemSlugs.map((slug) => {
    const equipment = getMediaEquipmentBySlug(slug);

    return {
      id: equipment?.id ?? slug,
      title: equipment?.name ?? slug,
      slug,
    };
  });
}

export function getMediaEquipmentDetailParams(): {
  category: string;
  slug: string;
}[] {
  return mediaEquipmentCategories.flatMap((category) =>
    category.itemSlugs.map((slug) => ({
      category: category.id,
      slug,
    }))
  );
}

export { mediaEquipmentCategories, mediaEquipmentItems };

export type {
  EquipmentCategory,
  EquipmentCategoryItem,
  EquipmentDefinition,
} from "@/data/media/v2/equipment/types";
