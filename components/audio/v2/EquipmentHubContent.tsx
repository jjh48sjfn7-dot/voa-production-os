"use client";

import { Wrench } from "lucide-react";
import { AudioNavHubContent } from "@/components/audio/v2/AudioNavHubContent";
import { equipmentCategories } from "@/data/audio/v2/equipment";
import { voaLabels } from "@/data/audio/venue";

export function EquipmentHubContent() {
  return (
    <AudioNavHubContent
      title="Equipment"
      description="Equipment guides organized by category."
      icon={Wrench}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Equipment" },
      ]}
      sectionTitle="Equipment Categories"
      items={equipmentCategories}
    />
  );
}
