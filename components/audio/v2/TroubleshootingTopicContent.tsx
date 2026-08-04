"use client";

import { notFound } from "next/navigation";
import { AudioPlaceholderContent } from "@/components/audio/v2/AudioPlaceholderContent";
import { getTroubleshootingTopic } from "@/data/audio/v2/troubleshooting";
import { voaLabels } from "@/data/audio/venue";

interface TroubleshootingTopicContentProps {
  topicId: string;
}

export function TroubleshootingTopicContent({ topicId }: TroubleshootingTopicContentProps) {
  const topic = getTroubleshootingTopic(topicId);

  if (!topic) {
    notFound();
  }

  return (
    <AudioPlaceholderContent
      title={topic.title}
      icon={topic.icon}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Troubleshooting", href: "/audio/troubleshooting" },
        { label: topic.title },
      ]}
    />
  );
}
