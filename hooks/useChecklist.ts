"use client";

import { useCallback, useEffect, useState } from "react";
import { loadCheckedItems, saveCheckedItems } from "@/lib/storage";

export function useChecklist(
  storageId: string,
  validItemIds?: readonly string[]
) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let loaded = loadCheckedItems(storageId);

    if (validItemIds && validItemIds.length > 0) {
      const valid = new Set(validItemIds);
      const sanitized = Object.fromEntries(
        Object.entries(loaded).filter(([id]) => valid.has(id))
      );

      if (Object.keys(sanitized).length !== Object.keys(loaded).length) {
        saveCheckedItems(storageId, sanitized);
      }

      loaded = sanitized;
    }

    setChecked(loaded);
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
