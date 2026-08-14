import { dashboardDepartments } from "@/data/dashboard/v2";
import type { DepartmentAccent } from "@/lib/theme";

export const PRODUCTION_DEPARTMENT_IDS = ["audio", "lighting", "media"] as const;

export type ProductionDepartmentId = (typeof PRODUCTION_DEPARTMENT_IDS)[number];

export interface ProductionDepartment {
  id: ProductionDepartmentId;
  name: string;
  description: string;
  href: string;
  accent: DepartmentAccent;
}

const ACTIVE_DEPARTMENT_IDS = new Set<string>(PRODUCTION_DEPARTMENT_IDS);

export function getProductionDepartments(): ProductionDepartment[] {
  return dashboardDepartments
    .filter((department) => ACTIVE_DEPARTMENT_IDS.has(department.id))
    .map((department) => ({
      id: department.id as ProductionDepartmentId,
      name: department.name,
      description: department.description,
      href: department.href,
      accent: department.accent,
    }));
}

export function getProductionDepartment(
  id: ProductionDepartmentId
): ProductionDepartment | undefined {
  return getProductionDepartments().find((department) => department.id === id);
}

export function isProductionDepartmentId(
  value: string
): value is ProductionDepartmentId {
  return ACTIVE_DEPARTMENT_IDS.has(value);
}
