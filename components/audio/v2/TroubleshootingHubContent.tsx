"use client";

import { AlertTriangle } from "lucide-react";
import { AudioNavHubContent } from "@/components/audio/v2/AudioNavHubContent";
import { troubleshootingTopics } from "@/data/audio/v2/troubleshooting";
import { voaLabels } from "@/data/audio/venue";

export function TroubleshootingHubContent() {
  return (
    <AudioNavHubContent
      title="Troubleshooting"
      description="Help volunteers diagnose problems by following the audio signal path."
      icon={AlertTriangle}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Troubleshooting" },
      ]}
      sectionTitle="Topics"
      items={troubleshootingTopics}
    />
  );
}
