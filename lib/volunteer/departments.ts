import {
  PRODUCTION_DEPARTMENT_IDS,
  getProductionDepartments,
  isProductionDepartmentId,
} from "@/lib/production-os";
import type { DepartmentId } from "@/lib/volunteer/types";

export type WorkspaceDepartmentRecord = {
  department_key: string;
  source: "production_os" | "custom";
  is_active: boolean;
};

/**
 * Volunteer-available departments = active DB production_os keys
 * ∩ the file-backed Production OS registry.
 * Unmatched production_os keys are reported, not invented.
 */
export function intersectAvailableDepartmentIds(
  dbDepartments: WorkspaceDepartmentRecord[]
): {
  available: DepartmentId[];
  unmatchedProductionOsKeys: string[];
} {
  const registry = new Set(
    getProductionDepartments().map((department) => department.id)
  );
  const available: DepartmentId[] = [];
  const unmatchedProductionOsKeys: string[] = [];
  const seen = new Set<DepartmentId>();

  for (const department of dbDepartments) {
    if (!department.is_active) continue;
    if (department.source !== "production_os") continue;
    if (!registry.has(department.department_key as DepartmentId)) {
      unmatchedProductionOsKeys.push(department.department_key);
      continue;
    }
    if (!isProductionDepartmentId(department.department_key)) continue;
    if (seen.has(department.department_key)) continue;
    seen.add(department.department_key);
    available.push(department.department_key);
  }

  available.sort(
    (a, b) =>
      PRODUCTION_DEPARTMENT_IDS.indexOf(a) - PRODUCTION_DEPARTMENT_IDS.indexOf(b)
  );

  return { available, unmatchedProductionOsKeys };
}
