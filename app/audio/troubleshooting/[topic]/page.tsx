import { TroubleshootingTopicContent } from "@/components/audio/v2/TroubleshootingTopicContent";
import { troubleshootingTopics } from "@/data/audio/v2/troubleshooting";

export function generateStaticParams() {
  return troubleshootingTopics.map((topic) => ({ topic: topic.id }));
}

interface TroubleshootingTopicPageProps {
  params: Promise<{ topic: string }>;
}

export default async function TroubleshootingTopicPage({
  params,
}: TroubleshootingTopicPageProps) {
  const { topic } = await params;
  return <TroubleshootingTopicContent topicId={topic} />;
}
