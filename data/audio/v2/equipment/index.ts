import { equipmentCategories } from "@/data/audio/v2/equipment/categories";
import { equipmentItems } from "@/data/audio/v2/equipment/items";
import type {
  EquipmentCategory,
  EquipmentCategoryItem,
  EquipmentDefinition,
} from "@/data/audio/v2/equipment/types";

const equipmentBySlug = new Map(
  equipmentItems.map((item) => [item.slug, item])
);

const equipmentSlugAliases: Record<string, string> = {
  "shure-blx-dual-receiver-1": "shure-blx-receiver",
  "shure-blx-dual-receiver-2": "shure-blx-receiver",
  "wireless-microphones": "shure-blx-receiver",
  "pastor-wireless-microphone": "shure-blx-receiver",
  "worship-leader-wireless-microphone": "shure-blx-receiver",
  "wireless-microphone-3": "shure-blx-receiver",
  "wireless-microphone-4": "shure-blx-receiver",
  "audio-playback-connection": "media-computer",
  "qsc-kw153-left": "qsc-k12-2",
  "qsc-kw153-right": "qsc-k12-2",
  "qsc-kw153": "qsc-k12-2",
  "stage-monitor-left": "qsc-k10-2",
  "stage-monitor-right": "qsc-k10-2",
  "stage-monitor": "qsc-k10-2",
};

export function getEquipmentBySlug(
  slug: string
): EquipmentDefinition | undefined {
  const resolvedSlug = equipmentSlugAliases[slug] ?? slug;
  return equipmentBySlug.get(resolvedSlug);
}

export function getAllEquipmentSlugs(): string[] {
  return equipmentItems.map((item) => item.slug);
}

export function getEquipmentItemRouteSlugs(): string[] {
  const categorySlugs = equipmentCategories.flatMap(
    (category) => category.itemSlugs
  );
  const canonicalSlugs = getAllEquipmentSlugs();

  return [...new Set([...categorySlugs, ...canonicalSlugs])];
}

export function getEquipmentCategory(
  id: string
): EquipmentCategory | undefined {
  return equipmentCategories.find((category) => category.id === id);
}

export function getEquipmentItemHref(slug: string): string {
  return `/audio/equipment/item/${slug}`;
}

export function getCategoryItems(categoryId: string): EquipmentCategoryItem[] {
  const category = getEquipmentCategory(categoryId);

  if (!category) {
    return [];
  }

  return category.itemSlugs.map((slug) => {
    const equipment = getEquipmentBySlug(slug);

    return {
      id: equipment?.id ?? slug,
      title: equipment?.name ?? formatSlugTitle(slug),
      slug,
    };
  });
}

export function getEquipmentDetailParams(): {
  category: string;
  slug: string;
}[] {
  return equipmentCategories.flatMap((category) =>
    category.itemSlugs.map((slug) => ({
      category: category.id,
      slug,
    }))
  );
}

function formatSlugTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export { equipmentCategories, equipmentItems };

export type {
  EquipmentCategory,
  EquipmentCategoryItem,
  EquipmentConnectionGroup,
  EquipmentDefinition,
  EquipmentDownload,
  EquipmentRelatedRef,
  EquipmentSundaySetupLink,
  EquipmentTroubleshootingItem,
} from "@/data/audio/v2/equipment/types";
