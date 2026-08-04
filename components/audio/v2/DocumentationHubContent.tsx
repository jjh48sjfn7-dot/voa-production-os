"use client";

import { FileText } from "lucide-react";
import { AudioNavHubContent } from "@/components/audio/v2/AudioNavHubContent";
import { documentationPages } from "@/data/audio/v2/documentation";
import { voaLabels } from "@/data/audio/venue";

export function DocumentationHubContent() {
  return (
    <AudioNavHubContent
      title="Documentation"
      description="Reference information for the Audio Department."
      icon={FileText}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Documentation" },
      ]}
      sectionTitle="Pages"
      items={documentationPages}
    />
  );
}
