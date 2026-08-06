import { ReferenceTable } from "@/components/shared/ReferenceTable";
import { SectionCard } from "@/components/shared/SectionCard";
import type {
  DocumentationChannelAssignment,
  DocumentationChannelAvailableGroup,
  DocumentationChannelGroup,
} from "@/data/audio/v2/documentation/types";

interface DocumentationChannelGroupsProps {
  groups: DocumentationChannelGroup[];
}

function AvailableChannelCard({ group }: { group: DocumentationChannelAvailableGroup }) {
  return (
    <ReferenceTable
      variant="key-value"
      rows={[
        { label: "Channels", value: group.channels },
        { label: "Status", value: group.status },
      ]}
    />
  );
}

function AssignmentGroup({ items }: { items: DocumentationChannelAssignment[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <ReferenceTable
          key={item.channel}
          variant="assignment"
          channel={item.channel}
          fields={item.fields}
        />
      ))}
    </div>
  );
}

export function DocumentationChannelGroups({ groups }: DocumentationChannelGroupsProps) {
  return (
    <div className="space-y-8 sm:space-y-10">
      {groups.map((group) => (
        <SectionCard
          key={
            group.type === "available"
              ? `${group.title}-${group.channels}`
              : `${group.title}-${group.items[0]?.channel}`
          }
          title={group.title}
        >
          {group.type === "available" ? (
            <AvailableChannelCard group={group} />
          ) : (
            <AssignmentGroup items={group.items} />
          )}
        </SectionCard>
      ))}
    </div>
  );
}
