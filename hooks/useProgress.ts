"use client";

import { useMemo } from "react";
import type { ProgressStats } from "@/types";
import { calculateProgress } from "@/lib/progress";

export function useProgress(
  itemIds: string[],
  checked: Record<string, boolean>
): ProgressStats {
  return useMemo(
    () => calculateProgress(checked, itemIds),
    [checked, itemIds]
  );
}
