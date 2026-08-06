"use client";

import { notFound } from "next/navigation";
import { TroubleshootingGuideView } from "@/components/audio/v2/troubleshooting/TroubleshootingGuideView";
import {
  getTroubleshootingGuide,
  getTroubleshootingTopic,
} from "@/data/audio/v2/troubleshooting";

interface TroubleshootingTopicContentProps {
  topicId: string;
}

export function TroubleshootingTopicContent({ topicId }: TroubleshootingTopicContentProps) {
  const topic = getTroubleshootingTopic(topicId);
  const guide = getTroubleshootingGuide(topicId);

  if (!topic || !guide) {
    notFound();
  }

  return (
    <TroubleshootingGuideView title={topic.title} icon={topic.icon} guide={guide} />
  );
}
