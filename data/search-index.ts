import { audioPages } from "@/data/audio/pages";
import { channelAssignments } from "@/data/audio/channels";
import { inventoryItems } from "@/data/audio/inventory";
import { troubleshootingIssues } from "@/data/audio/troubleshooting";
import { sundaySetupSections } from "@/data/sunday-setup";

export type SearchCategory =
  | "page"
  | "equipment"
  | "channel"
  | "troubleshooting"
  | "setup";

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  category: SearchCategory;
}

export const searchCategoryLabels: Record<SearchCategory, string> = {
  page: "Pages",
  equipment: "Equipment",
  channel: "Channels",
  troubleshooting: "Troubleshooting",
  setup: "Pre-Service Tasks",
};

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const page of audioPages) {
    results.push({
      id: `page-${page.id}`,
      title: page.title,
      subtitle: page.description,
      href: page.href,
      category: "page",
    });
  }

  for (const item of inventoryItems) {
    results.push({
      id: `eq-${item.id}`,
      title: item.name,
      subtitle: `${item.assetNumber} · ${item.location}`,
      href: "/audio/inventory",
      category: "equipment",
    });
  }

  for (const ch of channelAssignments) {
    results.push({
      id: `ch-${ch.id}`,
      title: `Ch ${ch.channel} — ${ch.name}`,
      subtitle: `${ch.microphone} · ${ch.cableType}`,
      href: "/audio/channels",
      category: "channel",
    });
  }

  for (const issue of troubleshootingIssues) {
    results.push({
      id: `ts-${issue.id}`,
      title: issue.title,
      subtitle: issue.symptoms[0],
      href: `/audio/troubleshooting#issue-${issue.id}`,
      category: "troubleshooting",
    });
  }

  for (const section of sundaySetupSections) {
    for (const item of section.items) {
      if (item.type === "checklist") {
        for (const task of item.items) {
          results.push({
            id: `setup-${task.id}`,
            title: task.label,
            subtitle: section.title,
            href: "/audio/setup",
            category: "setup",
          });
        }
      } else {
        for (const text of item.items) {
          results.push({
            id: `setup-${section.id}-${text.slice(0, 20)}`,
            title: text,
            subtitle: section.title,
            href: "/audio/setup",
            category: "setup",
          });
        }
      }
    }
  }

  return results;
}

export const globalSearchIndex = buildSearchIndex();

export function searchGlobalIndex(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return globalSearchIndex
    .filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle?.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

export function groupSearchResults(
  results: SearchResult[]
): Partial<Record<SearchCategory, SearchResult[]>> {
  const groups: Partial<Record<SearchCategory, SearchResult[]>> = {};
  for (const r of results) {
    if (!groups[r.category]) groups[r.category] = [];
    groups[r.category]!.push(r);
  }
  return groups;
}
