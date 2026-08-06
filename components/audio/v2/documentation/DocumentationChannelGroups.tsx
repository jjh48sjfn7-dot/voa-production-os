import { audioStyles } from "@/lib/audio-styles";
import type {
  DocumentationChannelAssignment,
  DocumentationChannelAvailableGroup,
  DocumentationChannelGroup,
} from "@/data/audio/v2/documentation/types";
import { EquipmentSection } from "@/components/audio/v2/equipment/EquipmentSection";

interface DocumentationChannelGroupsProps {
  groups: DocumentationChannelGroup[];
}

function AvailableChannelCard({ group }: { group: DocumentationChannelAvailableGroup }) {
  return (
    <div className={`${audioStyles.card} divide-y divide-white/[0.06]`}>
      <div className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <p className={`${audioStyles.body} text-slate-500`}>Channels</p>
        <p className={`${audioStyles.body} text-right text-slate-200`}>{group.channels}</p>
      </div>
      <div className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <p className={`${audioStyles.body} text-slate-500`}>Status</p>
        <p className={`${audioStyles.body} text-right text-slate-200`}>{group.status}</p>
      </div>
    </div>
  );
}

function AssignmentCard({ item }: { item: DocumentationChannelAssignment }) {
  return (
    <div className={`divide-y divide-white/[0.06] ${audioStyles.card}`}>
      <div className="flex min-h-[48px] items-center px-4 py-3 sm:px-5">
        <p className={`${audioStyles.heading} text-slate-50`}>Channel {item.channel}</p>
      </div>
      {item.fields.map((field) => (
        <div
          key={field.label}
          className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-3 sm:px-5"
        >
          <p className={`${audioStyles.body} text-slate-500`}>{field.label}</p>
          <p className={`${audioStyles.body} text-right text-slate-200`}>{field.value}</p>
        </div>
      ))}
    </div>
  );
}

function AssignmentGroup({ items }: { items: DocumentationChannelAssignment[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <AssignmentCard key={item.channel} item={item} />
      ))}
    </div>
  );
}

export function DocumentationChannelGroups({ groups }: DocumentationChannelGroupsProps) {
  return (
    <div className="space-y-8 sm:space-y-10">
      {groups.map((group) => (
        <EquipmentSection
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
        </EquipmentSection>
      ))}
    </div>
  );
}
