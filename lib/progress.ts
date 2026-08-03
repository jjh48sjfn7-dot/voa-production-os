import type { ProgressStats } from "@/types";

export function calculateProgress(
  checked: Record<string, boolean>,
  itemIds: string[]
): ProgressStats {
  const total = itemIds.length;
  if (total === 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  const completed = itemIds.filter((id) => checked[id]).length;
  const percentage = Math.round((completed / total) * 100);

  return { completed, total, percentage };
}

export function mergeProgress(stats: ProgressStats[]): ProgressStats {
  const completed = stats.reduce((sum, s) => sum + s.completed, 0);
  const total = stats.reduce((sum, s) => sum + s.total, 0);
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}
