"use client";

import { AlertTriangle } from "lucide-react";
import { MediaNavHubContent } from "@/components/media/v2/MediaNavHubContent";
import { mediaTroubleshootingTopics } from "@/data/media/v2/troubleshooting/topics";

export function MediaTroubleshootingHubContent() {
  return (
    <MediaNavHubContent
      title="Troubleshooting"
      description="Fix common presentation display problems during setup or service."
      icon={AlertTriangle}
      breadcrumbs={[
        { label: "Media Department", href: "/media" },
        { label: "Troubleshooting" },
      ]}
      sectionTitle="Common Problems"
      backHref="/media"
      backLabel="Back to Media Department"
      items={mediaTroubleshootingTopics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        href: topic.href,
        icon: topic.icon,
      }))}
    />
  );
}
