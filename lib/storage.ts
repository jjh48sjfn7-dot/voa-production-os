const PREFIX = "voa-portal";

function getStorageKey(scope: string): string {
  return `${PREFIX}:${scope}`;
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(getStorageKey(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(getStorageKey(key), JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }
}

export function loadCheckedItems(
  checklistId: string
): Record<string, boolean> {
  return loadFromStorage(`checklist:${checklistId}`, {});
}

export function saveCheckedItems(
  checklistId: string,
  items: Record<string, boolean>
): void {
  saveToStorage(`checklist:${checklistId}`, items);
}

export function loadCheckoutItems(
  scope: string
): Record<string, boolean> {
  return loadFromStorage(`checkout:${scope}`, {});
}

export function saveCheckoutItems(
  scope: string,
  items: Record<string, boolean>
): void {
  saveToStorage(`checkout:${scope}`, items);
}

export interface CheckoutRecord {
  checkedOut: boolean;
  by?: string;
  at?: string;
}

export function loadCheckoutRecord(
  scope: string
): Record<string, CheckoutRecord> {
  return loadFromStorage(`checkout-meta:${scope}`, {});
}

export function saveCheckoutRecord(
  scope: string,
  records: Record<string, CheckoutRecord>
): void {
  saveToStorage(`checkout-meta:${scope}`, records);
}
