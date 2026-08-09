"use client";

import { notFound } from "next/navigation";
import { MediaTroubleshootingGuideView } from "@/components/media/v2/MediaTroubleshootingGuideView";
import {
  getMediaTroubleshootingGuide,
  getMediaTroubleshootingTopic,
} from "@/data/media/v2/troubleshooting/topics";

interface MediaTroubleshootingTopicContentProps {
  topicId: string;
}

export function MediaTroubleshootingTopicContent({
  topicId,
}: MediaTroubleshootingTopicContentProps) {
  const topic = getMediaTroubleshootingTopic(topicId);
  const guide = getMediaTroubleshootingGuide(topicId);

  if (!topic || !guide) {
    notFound();
  }

  return (
    <MediaTroubleshootingGuideView
      title={topic.title}
      icon={topic.icon}
      guide={guide}
    />
  );
}
