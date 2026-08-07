import { getBlueprintZone } from "@/data/blueprint";
import type { BlueprintOverlayId, TheaterBlueprint } from "@/data/blueprint/types";
import { BlueprintZone } from "@/components/blueprint/BlueprintZone";
import { audioStyles } from "@/lib/audio-styles";

interface ChurchBlueprintProps {
  blueprint: TheaterBlueprint;
  overlay?: BlueprintOverlayId;
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="h-px flex-1 bg-white/[0.08]" />
      <p className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-slate-500 sm:text-xs">
        {label}
      </p>
      <div className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}

export function ChurchBlueprint({
  blueprint,
  overlay = "all",
}: ChurchBlueprintProps) {
  return (
    <div className="space-y-4">
      <p className={`text-center ${audioStyles.caption} text-slate-500`}>
        {blueprint.mapLayout.orientationLabel}
      </p>

      <div
        className={`overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0f1729]/80 p-3 sm:p-5 ${audioStyles.card}`}
      >
        {blueprint.mapLayout.rows.map((row) => {
          if (row.variant === "audience-band") {
            const audienceZone = getBlueprintZone(blueprint, row.zoneIds[0]);
            const nestedZone = row.nestedZoneId
              ? getBlueprintZone(blueprint, row.nestedZoneId)
              : undefined;

            if (!audienceZone) {
              return null;
            }

            return (
              <div key={row.id} className="mt-4 space-y-3">
                <SectionDivider label="Audience" />
                <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-3 sm:p-4">
                  <div className="mb-3 text-center">
                    <p className="text-sm font-medium text-slate-400">
                      {audienceZone.name}
                    </p>
                    {audienceZone.beginnerLabel && (
                      <p className="mt-1 text-xs text-slate-500">
                        {audienceZone.beginnerLabel}
                      </p>
                    )}
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      ↓ Congregation seating ↓
                    </p>
                  </div>

                  {nestedZone && (
                    <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0a1220]/80 p-3 sm:p-4">
                      <BlueprintZone
                        blueprint={blueprint}
                        zone={nestedZone}
                        overlay={overlay}
                        itemLayout="grid-3"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          }

          if (row.layout === "columns" && row.columnCount === 3) {
            return (
              <div key={row.id} className="space-y-2">
                <div className="text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
                    Stage
                  </p>
                </div>
                <div
                  className={`grid min-h-[220px] grid-cols-3 gap-2 rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] p-2 sm:min-h-[260px] sm:gap-3 sm:p-3`}
                >
                  {row.zoneIds.map((zoneId) => {
                    const zone = getBlueprintZone(blueprint, zoneId);
                    if (!zone) {
                      return null;
                    }
                    return (
                      <BlueprintZone
                        key={zoneId}
                        blueprint={blueprint}
                        zone={zone}
                        overlay={overlay}
                        compact
                      />
                    );
                  })}
                </div>
              </div>
            );
          }

          return (
            <div key={row.id} className={row.id === "front-row" ? "mt-3" : ""}>
              {row.id === "back-row" && (
                <div className="mb-3 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
                    Back of stage
                  </p>
                </div>
              )}
              {row.id === "front-row" && (
                <SectionDivider label="Front of Stage" />
              )}
              {row.zoneIds.map((zoneId) => {
                const zone = getBlueprintZone(blueprint, zoneId);
                if (!zone) {
                  return null;
                }
                return (
                  <div
                    key={zoneId}
                    className={row.id === "front-row" ? "mt-2" : ""}
                  >
                    <BlueprintZone
                      blueprint={blueprint}
                      zone={zone}
                      overlay={overlay}
                      itemLayout={
                        row.id === "back-row" || row.id === "front-row"
                          ? "grid-3"
                          : "stack"
                      }
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
