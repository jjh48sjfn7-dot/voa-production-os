"use client";

import { notFound } from "next/navigation";
import { LightingTroubleshootingGuideView } from "@/components/lighting/v2/LightingTroubleshootingGuideView";
import {
  getLightingTroubleshootingGuide,
  getLightingTroubleshootingTopic,
} from "@/data/lighting/v2/troubleshooting/topics";

interface LightingTroubleshootingTopicContentProps {
  topicId: string;
}

export function LightingTroubleshootingTopicContent({
  topicId,
}: LightingTroubleshootingTopicContentProps) {
  const topic = getLightingTroubleshootingTopic(topicId);
  const guide = getLightingTroubleshootingGuide(topicId);

  if (!topic || !guide) {
    notFound();
  }

  return (
    <LightingTroubleshootingGuideView
      title={topic.title}
      icon={topic.icon}
      guide={guide}
    />
  );
}
