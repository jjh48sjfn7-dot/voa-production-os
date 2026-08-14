import {
  getTroubleshootingGuide as getAudioTroubleshootingGuide,
  getTroubleshootingTopic as getAudioTroubleshootingTopic,
  troubleshootingGuides as audioTroubleshootingGuides,
  troubleshootingTopics as audioTroubleshootingTopics,
} from "@/data/audio/v2/troubleshooting";
import {
  getLightingTroubleshootingGuide,
  getLightingTroubleshootingTopic,
  lightingTroubleshootingGuides,
  lightingTroubleshootingTopics,
} from "@/data/lighting/v2/troubleshooting/topics";
import {
  getMediaTroubleshootingGuide,
  getMediaTroubleshootingTopic,
  mediaTroubleshootingGuides,
  mediaTroubleshootingTopics,
} from "@/data/media/v2/troubleshooting/topics";
import type {
  TroubleshootingGuide,
  TroubleshootingTopicMeta,
} from "@/data/audio/v2/troubleshooting/types";
import type { ProductionDepartmentId } from "@/lib/production-os/departments";

export type { TroubleshootingGuide, TroubleshootingTopicMeta };

export function getDepartmentTroubleshootingTopics(
  departmentId: ProductionDepartmentId
): TroubleshootingTopicMeta[] {
  switch (departmentId) {
    case "audio":
      return audioTroubleshootingTopics;
    case "lighting":
      return lightingTroubleshootingTopics;
    case "media":
      return mediaTroubleshootingTopics;
  }
}

export function getDepartmentTroubleshootingGuides(
  departmentId: ProductionDepartmentId
): Record<string, TroubleshootingGuide> {
  switch (departmentId) {
    case "audio":
      return audioTroubleshootingGuides;
    case "lighting":
      return lightingTroubleshootingGuides;
    case "media":
      return mediaTroubleshootingGuides;
  }
}

export function getTroubleshootingTopic(
  departmentId: ProductionDepartmentId,
  topicId: string
): TroubleshootingTopicMeta | undefined {
  switch (departmentId) {
    case "audio":
      return getAudioTroubleshootingTopic(topicId);
    case "lighting":
      return getLightingTroubleshootingTopic(topicId);
    case "media":
      return getMediaTroubleshootingTopic(topicId);
  }
}

export function getTroubleshootingGuide(
  departmentId: ProductionDepartmentId,
  topicId: string
): TroubleshootingGuide | undefined {
  switch (departmentId) {
    case "audio":
      return getAudioTroubleshootingGuide(topicId);
    case "lighting":
      return getLightingTroubleshootingGuide(topicId);
    case "media":
      return getMediaTroubleshootingGuide(topicId);
  }
}
