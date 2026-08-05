import type { StagePlotZone } from "@/data/stage-plot/types";
import { StagePlotItemCard } from "@/components/stage-plot/StagePlotItemCard";
import { audioStyles } from "@/lib/audio-styles";

interface StagePlotZoneViewProps {
  zone: StagePlotZone;
}

export function StagePlotZoneView({ zone }: StagePlotZoneViewProps) {
  return (
    <section className="space-y-3">
      <h2 className={`${audioStyles.heading} text-slate-50`}>{zone.title}</h2>
      <div className="space-y-2">
        {zone.items.map((item) => (
          <StagePlotItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
