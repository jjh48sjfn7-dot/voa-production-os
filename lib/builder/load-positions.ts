import { logBuilderEvent } from "@/lib/builder/log";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BuilderDepartment = {
  id: string;
  name: string;
};

export type BuilderPosition = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  departmentId: string;
  departmentName: string;
};

export type BuilderPositionsPageData = {
  departments: BuilderDepartment[];
  positions: BuilderPosition[];
};

export async function loadBuilderPositionsPage(
  workspaceId: string
): Promise<BuilderPositionsPageData | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logBuilderEvent("supabase_unconfigured");
    return null;
  }

  const departmentsResult = await supabase
    .from("workspace_departments")
    .select("id, name, is_active")
    .eq("workspace_id", workspaceId)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (departmentsResult.error) {
    logBuilderEvent("departments_query_failed", {
      code: departmentsResult.error.code,
    });
    return null;
  }

  const departments = (departmentsResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
  }));

  if (departments.length === 0) {
    return { departments: [], positions: [] };
  }

  const departmentIds = departments.map((department) => department.id);
  const departmentNameById = new Map(
    departments.map((department) => [department.id, department.name])
  );

  const positionsResult = await supabase
    .from("positions")
    .select("id, name, slug, is_active, workspace_department_id")
    .in("workspace_department_id", departmentIds)
    .order("name", { ascending: true });

  if (positionsResult.error) {
    logBuilderEvent("positions_query_failed", {
      code: positionsResult.error.code,
    });
    return null;
  }

  const positions = (positionsResult.data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    isActive: row.is_active,
    departmentId: row.workspace_department_id,
    departmentName: departmentNameById.get(row.workspace_department_id) ?? "Department",
  }));

  return { departments, positions };
}
