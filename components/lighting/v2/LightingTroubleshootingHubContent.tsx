"use client";

import { AlertTriangle } from "lucide-react";
import { LightingNavHubContent } from "@/components/lighting/v2/LightingNavHubContent";
import { lightingTroubleshootingTopics } from "@/data/lighting/v2/troubleshooting/topics";

export function LightingTroubleshootingHubContent() {
  return (
    <LightingNavHubContent
      title="Troubleshooting"
      description="Fix common lighting problems during setup or service."
      icon={AlertTriangle}
      breadcrumbs={[
        { label: "Lighting Department", href: "/lighting" },
        { label: "Troubleshooting" },
      ]}
      sectionTitle="Common Problems"
      items={lightingTroubleshootingTopics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        href: topic.href,
        icon: topic.icon,
      }))}
    />
  );
}
