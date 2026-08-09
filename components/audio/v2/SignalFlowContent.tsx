"use client";

import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { SignalFlowVolunteerView } from "@/components/audio/v2/signal-flow/SignalFlowVolunteerView";
import { signalFlowVolunteerDocument } from "@/data/audio/v2/documentation/signal-flow";
import { audioStyles } from "@/lib/audio-styles";

export function SignalFlowContent() {
  return (
    <div>
      <AudioSubpageHeader
        backHref="/audio/documentation"
        backLabel="Back to Documentation"
        title={signalFlowVolunteerDocument.title}
        accent="audio"
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        {signalFlowVolunteerDocument.subtitle}
      </p>

      <div className="mt-6 sm:mt-8">
        <SignalFlowVolunteerView document={signalFlowVolunteerDocument} />
      </div>
    </div>
  );
}
