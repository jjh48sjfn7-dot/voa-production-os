import { getProductionChurch } from "@/lib/production-os";
import type { ProductionChurch } from "@/lib/production-os";

/** Maps a database workspace to file-backed Production OS church operational truth. */
export function getProductionChurchForKey(
  productionOsKey: string | null
): ProductionChurch | null {
  if (!productionOsKey) return null;
  const church = getProductionChurch();
  return church.id === productionOsKey ? church : null;
}
