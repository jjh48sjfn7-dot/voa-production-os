"use client";

import { useCallback, useEffect, useState } from "react";
import { loadCheckedItems, saveCheckedItems } from "@/lib/storage";

export function useChecklist(storageId: string) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecked(loadCheckedItems(storageId));
    setMounted(true);
  }, [storageId]);

  const toggleItem = useCallback(
    (itemId: string) => {
      setChecked((prev) => {
        const next = { ...prev, [itemId]: !prev[itemId] };
        saveCheckedItems(storageId, next);
        return next;
      });
    },
    [storageId]
  );

  const resetChecklist = useCallback(() => {
    setChecked({});
    saveCheckedItems(storageId, {});
  }, [storageId]);

  return { checked, toggleItem, resetChecklist, mounted };
}
