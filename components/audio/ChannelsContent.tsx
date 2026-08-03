"use client";

import { useMemo, useState } from "react";
import { Mic2, Search } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { ChannelCard } from "@/components/audio/ChannelCard";
import { ContentBlockRenderer } from "@/components/audio/ContentBlockRenderer";
import { EmptyState } from "@/components/audio/EmptyState";
import { FilterPill } from "@/components/audio/FilterPill";
import { LocalSearch, useLocalSearch } from "@/components/audio/LocalSearch";
import {
  CHANNELS_STORAGE_ID,
  channelAssignments,
  channelBlocks,
  getChannelChecklistIds,
} from "@/data/audio/channels";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { useSearch } from "@/lib/search-context";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { StickyToolbar } from "@/components/audio/StickyToolbar";
import { audioStyles } from "@/lib/audio-styles";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { SectionHeader } from "@/components/ui/PageHeader";

export function ChannelsContent() {
  const { checked, toggleItem, mounted } = useChecklist(CHANNELS_STORAGE_ID);
  const { matchesQuery } = useSearch();
  const { query, setQuery, matches } = useLocalSearch();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const itemIds = getChannelChecklistIds();
  const progress = useProgress(itemIds, checked);

  const filtered = useMemo(() => {
    return channelAssignments.filter((ch) => {
      const matchesGlobal =
        matchesQuery(ch.name) ||
        matchesQuery(ch.microphone) ||
        matchesQuery(ch.source) ||
        matchesQuery(String(ch.channel));
      const matchesSearch = query.trim()
        ? matches(
            ch.name,
            ch.microphone,
            ch.source,
            String(ch.channel),
            ch.cableType,
            ch.monitorMix ?? "",
            ch.colorTag,
            ch.status
          ) && matchesGlobal
        : matchesGlobal;
      const matchesType = typeFilter === "all" || ch.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [matchesQuery, matches, query, typeFilter]);

  function loadProgress() {
    return calculateProgress(loadCheckedItems(CHANNELS_STORAGE_ID), itemIds);
  }

  const types = ["all", "vocal", "instrument", "playback", "talkback"] as const;

  const toolbar = (
    <StickyToolbar>
      <LocalSearch
        value={query}
        onChange={setQuery}
        placeholder="Search channels, mics, cables, status…"
        sticky
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {types.map((type) => {
          const count =
            type === "all"
              ? channelAssignments.length
              : channelAssignments.filter((c) => c.type === type).length;
          return (
            <FilterPill
              key={type}
              label={type === "all" ? "All" : type}
              active={typeFilter === type}
              onClick={() => setTypeFilter(type)}
              count={count}
            />
          );
        })}
      </div>
    </StickyToolbar>
  );

  return (
    <AudioPageShell
      title="Channel List"
      description={`${voaVenue.church} ${voaLabels.tf5} patch sheet — Rio3224-D2 inputs, gain targets, monitor sends, and pastor wireless routing.`}
      icon={Mic2}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Channel List" },
      ]}
      toolbar={toolbar}
      progress={{
        stats: progress,
        loadFromStorage: loadProgress,
        title: `${voaLabels.preService} Channel Checks`,
        description: "Gain staging and labeling checks",
      }}
    >
      <section>
        <SectionHeader
          title="Patch Sheet"
          description={`${filtered.length} of ${channelAssignments.length} channels`}
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No channels found"
            description="Try adjusting your search or filter to find channel assignments."
          />
        ) : (
          <div className={`grid lg:grid-cols-2 ${audioStyles.gridGap}`}>
            {filtered.map((ch, i) => (
              <ChannelCard key={ch.id} channel={ch} index={i} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader title="Setup Checklists" />
        <ContentBlockRenderer
          blocks={channelBlocks}
          storageId={CHANNELS_STORAGE_ID}
          checked={checked}
          onToggle={toggleItem}
          defaultOpenFirst={false}
        />
      </section>
    </AudioPageShell>
  );
}
