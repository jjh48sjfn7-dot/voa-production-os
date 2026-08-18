"use server";

import { revalidatePath } from "next/cache";
import { requireBuilderAccess } from "@/lib/builder/access";
import { logBuilderEvent } from "@/lib/builder/log";
import { derivePositionSlug } from "@/lib/builder/slug";
import { validatePositionName } from "@/lib/builder/validate";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

export type CreatePositionState = {
  error?: string;
  message?: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type PositionInsert = Pick<
  Database["public"]["Tables"]["positions"]["Insert"],
  "workspace_department_id" | "name" | "slug"
>;

export async function createPositionAction(
  _prev: CreatePositionState,
  formData: FormData
): Promise<CreatePositionState> {
  const access = await requireBuilderAccess();
  if (!access.ok) {
    return { error: "You don’t have permission to create positions." };
  }

  const departmentId = String(formData.get("workspaceDepartmentId") ?? "");
  if (!UUID_RE.test(departmentId)) {
    return { error: "Choose a department." };
  }

  const nameError = validatePositionName(String(formData.get("name") ?? ""));
  if (nameError) return { error: nameError };
  const name = String(formData.get("name") ?? "").trim();

  const slug = derivePositionSlug(name);
  if (!slug) {
    return { error: "Enter a position name that includes letters or numbers." };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logBuilderEvent("supabase_unconfigured");
    return { error: "Could not create the position. Please try again." };
  }

  const departmentResult = await supabase
    .from("workspace_departments")
    .select("id, workspace_id, is_active")
    .eq("id", departmentId)
    .maybeSingle();

  if (departmentResult.error) {
    logBuilderEvent("department_lookup_failed", {
      code: departmentResult.error.code,
    });
    return { error: "Could not create the position. Please try again." };
  }

  const department = departmentResult.data;
  if (
    !department ||
    department.workspace_id !== access.workspaceId ||
    !department.is_active
  ) {
    return { error: "Choose an active department in this church." };
  }

  const insertRow: PositionInsert = {
    workspace_department_id: department.id,
    name,
    slug,
  };

  const insertResult = await supabase.from("positions").insert(insertRow);

  if (insertResult.error) {
    logBuilderEvent("position_insert_failed", {
      code: insertResult.error.code,
    });
    if (insertResult.error.code === "23505") {
      return {
        error:
          "A position with this name or identifier already exists in this department.",
      };
    }
    if (
      insertResult.error.code === "42501" ||
      (insertResult.error.message ?? "")
        .toLowerCase()
        .includes("row-level security")
    ) {
      return { error: "You don’t have permission to create positions." };
    }
    return { error: "Could not create the position. Please try again." };
  }

  revalidatePath("/builder/positions");
  return { message: "Position created." };
}
