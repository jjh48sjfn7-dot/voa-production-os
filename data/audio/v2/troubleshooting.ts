export {
  getTroubleshootingGuide,
  getTroubleshootingTopic,
  troubleshootingGuides,
  troubleshootingTopics,
} from "@/data/audio/v2/troubleshooting/topics";

export type {
  TroubleshootingGuide,
  TroubleshootingTopicMeta,
} from "@/data/audio/v2/troubleshooting/types";

/** @deprecated Use TroubleshootingTopicMeta */
export type { TroubleshootingTopicMeta as TroubleshootingTopic } from "@/data/audio/v2/troubleshooting/types";
