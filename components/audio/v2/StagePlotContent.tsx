"use client";

import { AudioSubpageHeader } from "@/components/audio/v2/AudioSubpageHeader";
import { StagePlotView } from "@/components/stage-plot/StagePlotView";
import { audioStagePlot } from "@/data/audio/v2/stage-plot";
import { audioStyles } from "@/lib/audio-styles";

export function StagePlotContent() {
  return (
    <div>
      <AudioSubpageHeader
        backHref="/audio/documentation"
        backLabel="Back to Documentation"
        title={audioStagePlot.title}
      />

      <p className={`mt-2 ${audioStyles.body} text-slate-500`}>
        {audioStagePlot.subtitle}
      </p>

      <div className="mt-6 sm:mt-8">
        <StagePlotView document={audioStagePlot} />
      </div>
    </div>
  );
}
