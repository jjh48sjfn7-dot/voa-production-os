"use client";

import { useMemo, useState } from "react";
import { Package, Search } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { ContentBlockRenderer } from "@/components/audio/ContentBlockRenderer";
import { EmptyState } from "@/components/audio/EmptyState";
import { FilterPill } from "@/components/audio/FilterPill";
import { InventoryCard } from "@/components/audio/InventoryCard";
import { LocalSearch, useLocalSearch } from "@/components/audio/LocalSearch";
import {
  INVENTORY_STORAGE_ID,
  inventoryBlocks,
  inventoryCategories,
  inventoryItems,
  getInventoryChecklistIds,
} from "@/data/audio/inventory";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { useSearch } from "@/lib/search-context";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { StickyToolbar } from "@/components/audio/StickyToolbar";
import { audioStyles } from "@/lib/audio-styles";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { SectionHeader } from "@/components/ui/PageHeader";

export function InventoryContent() {
  const { checked, toggleItem, mounted } = useChecklist(INVENTORY_STORAGE_ID);
  const { matchesQuery } = useSearch();
  const { query, setQuery, matches } = useLocalSearch();
  const [category, setCategory] = useState("All");
  const itemIds = getInventoryChecklistIds();
  const progress = useProgress(itemIds, checked);

  const filtered = useMemo(() => {
    return inventoryItems.filter((item) => {
      const matchesGlobal =
        matchesQuery(item.name) ||
        matchesQuery(item.category) ||
        matchesQuery(item.location) ||
        matchesQuery(item.assetNumber);
      const matchesLocal = matches(
        item.name,
        item.category,
        item.location,
        item.condition,
        item.assetNumber,
        item.status
      );
      const matchesSearch = query.trim() ? matchesLocal && matchesGlobal : matchesGlobal;
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [matchesQuery, matches, query, category]);

  function loadProgress() {
    return calculateProgress(loadCheckedItems(INVENTORY_STORAGE_ID), itemIds);
  }

  const toolbar = (
    <StickyToolbar>
      <LocalSearch
        value={query}
        onChange={setQuery}
        placeholder="Search equipment, asset #, location…"
        sticky
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {inventoryCategories.map((cat) => {
          const count =
            cat === "All"
              ? inventoryItems.length
              : inventoryItems.filter((i) => i.category === cat).length;
          return (
            <FilterPill
              key={cat}
              label={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
              count={count}
            />
          );
        })}
      </div>
    </StickyToolbar>
  );

  return (
    <AudioPageShell
      title="Inventory"
      description={`${voaVenue.church} ${voaLabels.audioDepartment} registry — asset tags, storage locations, checkout tracking, and service dates.`}
      icon={Package}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "Inventory" },
      ]}
      toolbar={toolbar}
      progress={{
        stats: progress,
        loadFromStorage: loadProgress,
        title: `${voaLabels.productionReady} Checks`,
        description: `${voaLabels.preService} and ${voaLabels.postService} verification`,
      }}
    >
      <section>
        <SectionHeader
          title="Equipment"
          description={`${filtered.length} items · ${inventoryItems.length} total`}
        />

        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No equipment found"
            description="Try a different search term or category filter."
          />
        ) : (
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${audioStyles.gridGap}`}>
            {filtered.map((item, i) => (
              <InventoryCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeader title="Inventory Checklists" />
        <ContentBlockRenderer
          blocks={inventoryBlocks}
          storageId={INVENTORY_STORAGE_ID}
          checked={checked}
          onToggle={toggleItem}
        />
      </section>
    </AudioPageShell>
  );
}
