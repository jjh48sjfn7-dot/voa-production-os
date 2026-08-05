import type { StagePlotArea } from "@/data/stage-plot/types";
import { StagePlotItem } from "@/components/stage-plot/StagePlotItem";
import { audioStyles } from "@/lib/audio-styles";

interface StageAreaProps {
  area: StagePlotArea;
}

export function StageArea({ area }: StageAreaProps) {
  return (
    <section className="space-y-3">
      <h2 className={`${audioStyles.heading} text-slate-50`}>{area.title}</h2>
      <div className="space-y-2">
        {area.items.map((item) => (
          <StagePlotItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
