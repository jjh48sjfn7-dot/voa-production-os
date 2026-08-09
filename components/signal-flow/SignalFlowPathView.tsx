import type { SignalFlowNode, SignalFlowPath } from "@/data/signal-flow/types";
import {
  SignalFlowConnector,
  SignalFlowLabelCard,
} from "@/components/signal-flow/SignalFlowConnector";
import { SignalFlowEquipmentCard } from "@/components/signal-flow/SignalFlowEquipmentCard";
import type { DepartmentAccent } from "@/lib/theme";

function SignalFlowNodeItem({
  node,
  accent,
}: {
  node: SignalFlowNode;
  accent: DepartmentAccent;
}) {
  if (node.equipmentSlug) {
    return (
      <SignalFlowEquipmentCard
        name={node.name}
        icon={node.icon}
        equipmentSlug={node.equipmentSlug}
        accent={accent}
      />
    );
  }

  return (
    <SignalFlowLabelCard name={node.name} icon={node.icon} accent={accent} />
  );
}

interface SignalFlowPathViewProps {
  path: SignalFlowPath;
  accent?: DepartmentAccent;
}

export function SignalFlowPathView({
  path,
  accent = "audio",
}: SignalFlowPathViewProps) {
  return (
    <div className="space-y-0">
      {path.nodes.map((node, index) => (
        <div key={node.id}>
          <SignalFlowNodeItem node={node} accent={accent} />
          {index < path.nodes.length - 1 && <SignalFlowConnector />}
        </div>
      ))}
    </div>
  );
}
