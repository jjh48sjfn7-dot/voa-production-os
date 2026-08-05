import type { SignalFlowNode, SignalFlowPath } from "@/data/signal-flow/types";
import {
  SignalFlowConnector,
  SignalFlowLabelCard,
} from "@/components/signal-flow/SignalFlowConnector";
import { SignalFlowEquipmentCard } from "@/components/signal-flow/SignalFlowEquipmentCard";

function SignalFlowNodeItem({ node }: { node: SignalFlowNode }) {
  if (node.equipmentSlug) {
    return (
      <SignalFlowEquipmentCard
        name={node.name}
        emoji={node.emoji}
        equipmentSlug={node.equipmentSlug}
      />
    );
  }

  return <SignalFlowLabelCard name={node.name} emoji={node.emoji} />;
}

interface SignalFlowPathViewProps {
  path: SignalFlowPath;
}

export function SignalFlowPathView({ path }: SignalFlowPathViewProps) {
  return (
    <div className="space-y-0">
      {path.nodes.map((node, index) => (
        <div key={node.id}>
          <SignalFlowNodeItem node={node} />
          {index < path.nodes.length - 1 && <SignalFlowConnector />}
        </div>
      ))}
    </div>
  );
}
