"use client";

import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { SignalFlowView } from "@/components/signal-flow/SignalFlowView";
import { audioSignalFlow } from "@/data/audio/v2/signal-flow";
import { audioStyles } from "@/lib/audio-styles";

export function SignalFlowContent() {
  return (
    <div>
      <AudioSubpageHeader
        backHref="/audio/documentation"
        backLabel="Back to Documentation"
        title={audioSignalFlow.title}
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        {audioSignalFlow.subtitle}
      </p>

      <div className="mt-6 sm:mt-8">
        <SignalFlowView document={audioSignalFlow} />
      </div>
    </div>
  );
}
