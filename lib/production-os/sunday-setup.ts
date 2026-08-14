import {
  getSundaySetupV2ItemIds,
  sundaySetupV2Sections,
  type SundaySetupSection,
} from "@/data/audio/v2/sunday-setup";
import {
  getLightingSetupItemIds,
  lightingSetupSections,
  type LightingSetupSection,
} from "@/data/lighting/v2/sunday-setup";
import {
  getMediaSetupItemIds,
  mediaSetupSections,
  type MediaSetupSection,
} from "@/data/media/v2/sunday-setup";
import {
  audioSundaySetupReferences,
  mediaConfidenceMonitorReferences,
  mediaSundaySetupReferences,
} from "@/lib/reference-photos";
import type { ProductionDepartmentId } from "@/lib/production-os/departments";

export type ProductionSundaySetupSection =
  | SundaySetupSection
  | LightingSetupSection
  | MediaSetupSection;

export interface ProductionSundaySetup {
  departmentId: ProductionDepartmentId;
  sections: ProductionSundaySetupSection[];
  itemIds: string[];
}

export function getDepartmentSundaySetup(
  departmentId: ProductionDepartmentId
): ProductionSundaySetup {
  switch (departmentId) {
    case "audio":
      return {
        departmentId,
        sections: sundaySetupV2Sections,
        itemIds: getSundaySetupV2ItemIds(),
      };
    case "lighting":
      return {
        departmentId,
        sections: lightingSetupSections,
        itemIds: getLightingSetupItemIds(),
      };
    case "media":
      return {
        departmentId,
        sections: mediaSetupSections,
        itemIds: getMediaSetupItemIds(),
      };
  }
}

export function getSundaySetupReferencePhotos(departmentId: ProductionDepartmentId) {
  switch (departmentId) {
    case "audio":
      return audioSundaySetupReferences;
    case "lighting":
      return {};
    case "media":
      return {
        ...mediaSundaySetupReferences,
        confidenceMonitor: mediaConfidenceMonitorReferences,
      };
  }
}
