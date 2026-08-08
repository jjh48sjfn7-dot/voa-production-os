import { LightingTroubleshootingTopicContent } from "@/components/lighting/v2/LightingTroubleshootingTopicContent";
import { lightingTroubleshootingTopics } from "@/data/lighting/v2/troubleshooting/topics";

export function generateStaticParams() {
  return lightingTroubleshootingTopics.map((topic) => ({ topic: topic.id }));
}

interface LightingTroubleshootingTopicPageProps {
  params: Promise<{ topic: string }>;
}

export default async function LightingTroubleshootingTopicPage({
  params,
}: LightingTroubleshootingTopicPageProps) {
  const { topic } = await params;
  return <LightingTroubleshootingTopicContent topicId={topic} />;
}
