import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";
import { SignalFlowConnector } from "@/components/audio/v2/signal-flow/SignalFlowConnector";
import { SignalFlowPath } from "@/components/audio/v2/signal-flow/SignalFlowPath";
import { SignalFlowRelatedLinks } from "@/components/audio/v2/signal-flow/SignalFlowRelatedLinks";
import type {
  SignalFlowGroup as SignalFlowGroupData,
  SignalFlowWirelessColor,
} from "@/data/audio/v2/documentation/signal-flow-types";
import { audioStyles } from "@/lib/audio-styles";

interface SignalFlowGroupProps {
  group: SignalFlowGroupData;
}

const wirelessColorClasses: Record<string, string> = {
  Purple: "text-purple-400",
  Yellow: "text-yellow-400",
  Green: "text-green-400",
  Blue: "text-blue-400",
};

function WirelessColorRow({ row }: { row: SignalFlowWirelessColor }) {
  const colorClass = wirelessColorClasses[row.color] ?? "text-slate-50";

  return (
    <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-2`}>
      <p className={`text-base font-semibold ${colorClass}`}>{row.color}</p>
      <p className="text-sm text-slate-500">Where sound enters</p>
      <p className="text-base font-medium text-slate-50">{row.localInput}</p>
      <p className="text-sm text-slate-500">Where sound is mixed</p>
      <p className="text-base font-medium text-slate-50">{row.channel}</p>
    </div>
  );
}

function DrumSourcesList({
  sources,
}: {
  sources: NonNullable<SignalFlowGroupData["drumSources"]>;
}) {
  return (
    <div className="space-y-0">
      {sources.map((source, index) => (
        <div key={source.id}>
          <div className={`${audioStyles.card} ${audioStyles.cardPad} space-y-1`}>
            <p className="text-base font-semibold text-slate-50">{source.name}</p>
            <p className="text-sm text-slate-500">Where sound enters</p>
            <p className="text-base text-slate-300">{source.snakeInput}</p>
            <p className="text-sm text-slate-500">Where sound is mixed</p>
            <p className="text-base text-slate-300">{source.channel}</p>
          </div>
          {index < sources.length - 1 && (
            <div
              className="my-4 border-t border-dashed border-white/[0.08]"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function SignalFlowGroup({ group }: SignalFlowGroupProps) {
  return (
    <EquipmentSection title={group.title}>
      <div className="space-y-4">
        {group.wireless && (
          <>
            <SignalFlowPath steps={group.wireless.headSteps} />
            <SignalFlowConnector />
            <div className="space-y-3">
              {group.wireless.colors.map((row) => (
                <WirelessColorRow key={row.id} row={row} />
              ))}
            </div>
            <SignalFlowConnector />
            <SignalFlowPath steps={group.wireless.tailSteps} />
          </>
        )}

        {group.drumSources && (
          <>
            <DrumSourcesList sources={group.drumSources} />
            {group.steps && group.steps.length > 0 && (
              <>
                <div
                  className="my-4 border-t border-dashed border-white/[0.08]"
                  aria-hidden
                />
                <SignalFlowPath steps={group.steps} />
              </>
            )}
          </>
        )}

        {group.monitorPaths?.map((path, index) => (
          <div key={path.id}>
            {index > 0 && (
              <div
                className="my-6 border-t border-dashed border-white/[0.08]"
                aria-hidden
              />
            )}
            <h3 className="mb-3 text-base font-semibold text-slate-300">
              {path.title}
            </h3>
            <SignalFlowPath steps={path.steps} />
          </div>
        ))}

        {group.steps && !group.drumSources && !group.wireless && (
          <SignalFlowPath steps={group.steps} />
        )}

        <SignalFlowRelatedLinks links={group.relatedLinks} />
      </div>
    </EquipmentSection>
  );
}
