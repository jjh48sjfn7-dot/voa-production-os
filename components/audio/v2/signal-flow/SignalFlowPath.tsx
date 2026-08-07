import type { SignalFlowStep } from "@/data/audio/v2/documentation/signal-flow-types";
import { SignalFlowConnector } from "@/components/audio/v2/signal-flow/SignalFlowConnector";
import { SignalFlowNode } from "@/components/audio/v2/signal-flow/SignalFlowNode";

interface SignalFlowPathProps {
  steps: SignalFlowStep[];
}

export function SignalFlowPath({ steps }: SignalFlowPathProps) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={step.id}>
          <SignalFlowNode step={step} />
          {index < steps.length - 1 && <SignalFlowConnector />}
        </div>
      ))}
    </div>
  );
}
