import { MediaTroubleshootingTopicContent } from "@/components/media/v2/MediaTroubleshootingTopicContent";
import { mediaTroubleshootingTopics } from "@/data/media/v2/troubleshooting/topics";

export function generateStaticParams() {
  return mediaTroubleshootingTopics.map((topic) => ({ topic: topic.id }));
}

interface MediaTroubleshootingTopicPageProps {
  params: Promise<{ topic: string }>;
}

export default async function MediaTroubleshootingTopicPage({
  params,
}: MediaTroubleshootingTopicPageProps) {
  const { topic } = await params;
  return <MediaTroubleshootingTopicContent topicId={topic} />;
}
