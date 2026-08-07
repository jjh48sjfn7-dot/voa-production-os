import { getStagePlotItemById } from "@/data/audio/v2/stage-plot";
import type {
  StagePlotDocument,
  StagePlotMapZone,
} from "@/data/stage-plot/types";
import { StagePlotItem } from "@/components/stage-plot/StagePlotItem";
import { audioStyles } from "@/lib/audio-styles";

interface StagePlotMapProps {
  document: StagePlotDocument;
}

function StagePlotMapZoneView({
  zone,
  document,
}: {
  zone: StagePlotMapZone;
  document: StagePlotDocument;
}) {
  const items = zone.itemIds
    .map((id) => getStagePlotItemById(document, id))
    .filter((item): item is NonNullable<typeof item> => !!item);

  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-3`}>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-50">{zone.title}</h3>
        {zone.plainTitle && (
          <p className="text-sm text-slate-500">{zone.plainTitle}</p>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <StagePlotItem key={item.id} item={item} compact />
        ))}
      </div>
    </div>
  );
}

export function StagePlotMap({ document }: StagePlotMapProps) {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-slate-500">
        Top-down view — audience at the bottom
      </p>

      <div
        className={`space-y-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5`}
      >
        {document.mapRows.map((row) => {
          if (row.zones.length === 1) {
            return (
              <StagePlotMapZoneView
                key={row.id}
                zone={row.zones[0]}
                document={document}
              />
            );
          }

          return (
            <div
              key={row.id}
              className="grid gap-4 sm:grid-cols-2"
            >
              {row.zones.map((zone) => (
                <StagePlotMapZoneView
                  key={zone.id}
                  zone={zone}
                  document={document}
                />
              ))}
            </div>
          );
        })}

        <p className="text-center text-sm font-medium text-slate-400">
          ↓ Audience / Congregation ↓
        </p>
      </div>
    </div>
  );
}
