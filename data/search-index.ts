import { documentationPages } from "@/data/audio/v2/documentation";
import { equipmentCategories } from "@/data/audio/v2/equipment/categories";
import {
  equipmentItems,
  getEquipmentItemHref,
} from "@/data/audio/v2/equipment";
import { troubleshootingTopics } from "@/data/audio/v2/troubleshooting/topics";
import {
  getSectionItems,
  sundaySetupUnloadTrailer,
  sundaySetupV2Sections,
} from "@/data/audio/v2/sunday-setup";
import { voaLabels } from "@/data/audio/venue";
import { lightingDocumentationPages } from "@/data/lighting/v2/documentation";
import { lightingEquipmentCategories } from "@/data/lighting/v2/equipment/categories";
import {
  getLightingEquipmentItemHref,
  lightingEquipmentItems,
} from "@/data/lighting/v2/equipment";
import {
  lightingSetupSections,
} from "@/data/lighting/v2/sunday-setup";
import { lightingTroubleshootingTopics } from "@/data/lighting/v2/troubleshooting/topics";
import { mediaDocumentationPages } from "@/data/media/v2/documentation";
import { mediaEquipmentCategories } from "@/data/media/v2/equipment/categories";
import {
  getMediaEquipmentItemHref,
  mediaEquipmentItems,
} from "@/data/media/v2/equipment";
import { mediaSetupSections } from "@/data/media/v2/sunday-setup";
import { mediaTroubleshootingTopics } from "@/data/media/v2/troubleshooting/topics";

export type SearchCategory =
  | "page"
  | "equipment"
  | "troubleshooting"
  | "setup";

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  category: SearchCategory;
  /** Lowercase aliases for volunteer-friendly search — not shown in UI */
  keywords?: string;
}

export const searchCategoryLabels: Record<SearchCategory, string> = {
  page: "Pages",
  equipment: "Equipment",
  troubleshooting: "Troubleshooting",
  setup: "Sunday Setup",
};

const documentationSearchMeta: Record<
  string,
  { subtitle: string; keywords: string }
> = {
  "input-patch-list": {
    subtitle: "Documentation · stage input patching",
    keywords: "input patch list patch snake channel",
  },
  "tf5-channel-list": {
    subtitle: "Documentation · TF5 channel assignments",
    keywords: "tf5 channel list channels mixer console",
  },
  "output-routing": {
    subtitle: "Documentation · TF5 outputs and snakes",
    keywords: "output routing foh monitor snake",
  },
  "signal-flow": {
    subtitle: "Documentation · how audio moves through the system",
    keywords: "signal flow diagram routing path",
  },
  "stage-plot": {
    subtitle: "Documentation · where audio equipment is located",
    keywords: "stage plot layout map blueprint equipment location",
  },
  "wiring-standards": {
    subtitle: "Documentation · patching and cable standards",
    keywords: "wiring standards cables xlr patch",
  },
  "volunteer-guide": {
    subtitle: "Documentation · audio volunteer reference",
    keywords: "volunteer guide help beginner",
  },
};

const equipmentSearchMeta: Record<string, { keywords: string }> = {
  "yamaha-tf5": {
    keywords: "tf5 console mixer sound board audio console yamaha",
  },
  keyboard: {
    keywords: "keyboard keys piano modx8 yamaha",
  },
  "shure-blx-receiver": {
    keywords: "wireless microphone mic receiver shure blx288 handheld",
  },
  "stage-snake-a": {
    keywords: "snake stage box xlr stage left snake a rio",
  },
  "stage-snake-b": {
    keywords: "snake stage box xlr stage right snake b rio",
  },
  "qsc-k12-2": {
    keywords: "speaker main mains foh house k12.2 qsc left right",
  },
  "qsc-k10-2": {
    keywords: "monitor wedge stage monitor k10.2 qsc left right",
  },
  "drummer-in-ear-system": {
    keywords: "pm1 behringer in-ear drummer iem monitor",
  },
  subwoofer: {
    keywords: "sub subwoofer bass low placeholder",
  },
  "media-computer": {
    keywords: "playback mac computer propresenter media audio",
  },
};

const categorySearchMeta: Record<string, string> = {
  console: "console mixer tf5",
  wireless: "wireless microphone mic receiver",
  "foh-speakers": "foh speaker main mains house k12.2",
  subwoofer: "sub subwoofer bass",
  monitors: "monitor wedge stage monitor k10.2 pm1 in-ear",
  "stage-boxes": "snake stage box xlr stage snake",
  keyboard: "keyboard keys piano",
  playback: "playback media computer mac",
  accessories: "cables stands adapters accessories",
};

const troubleshootingSearchMeta: Record<string, string> = {
  "no-keyboard-audio": "keyboard keys no sound audio",
  "no-wireless-microphone": "wireless microphone mic handheld no sound drop",
  "no-drum-audio": "drums kick snare no sound audio",
  "no-foh-audio": "no sound no audio foh house mains speakers",
  "no-stage-monitor": "monitor wedge stage no sound audio",
  "no-computer-playback": "playback media computer mac no sound propresenter",
  "console-will-not-power-on": "console tf5 power will not turn on",
  feedback: "feedback squeal ringing mic monitor",
};

const lightingDocumentationSearchMeta: Record<
  string,
  { subtitle: string; keywords: string }
> = {
  "lighting-plot": {
    subtitle: "Documentation · lighting fixture map",
    keywords: "lighting plot layout map blueprint fixture truss floor",
  },
  "dmx-signal-flow": {
    subtitle: "Documentation · DMX control path",
    keywords: "dmx signal flow lightkey dmxking universe routing",
  },
  "fixture-layout": {
    subtitle: "Documentation · truss and floor fixtures",
    keywords: "fixture layout truss floor slimpar tr-1 tr-6",
  },
  "dmx-addressing": {
    subtitle: "Documentation · fixture DMX addresses",
    keywords: "dmx addressing universe address slimpar fixture",
  },
};

const lightingEquipmentSearchMeta: Record<string, { keywords: string }> = {
  "chauvet-slimpar-pro-h-usb": {
    keywords: "slimpar chauvet fixture par light lights uplight truss floor",
  },
  "dmxking-micro": {
    keywords: "dmxking micro dmx interface universe",
  },
  "lightkey-foh-control": {
    keywords: "lightkey mac lighting control software foh",
  },
};

const lightingCategorySearchMeta: Record<string, string> = {
  fixtures: "fixture slimpar chauvet par lights",
  control: "control lightkey dmxking mac",
};

const lightingTroubleshootingSearchMeta: Record<string, string> = {
  "fixture-not-turning-on": "fixture light not turning on power slimpar",
  "no-dmx-control": "no dmx control universe lightkey dmxking",
  "one-fixture-not-responding": "one fixture not responding slimpar dmx",
  "lightkey-not-connected": "lightkey not connected mac dmxking",
};

const mediaDocumentationSearchMeta: Record<
  string,
  { subtitle: string; keywords: string }
> = {
  "media-plot": {
    subtitle: "Documentation · presentation display map",
    keywords: "media plot projector screen confidence monitor mac blueprint",
  },
  "projector-signal-flow": {
    subtitle: "Documentation · projector signal path",
    keywords: "projector signal flow epson gofanco cat6 hdmi extender",
  },
  "confidence-monitor-signal-flow": {
    subtitle: "Documentation · confidence monitor path",
    keywords: "confidence monitor roku tv hdmi mac display",
  },
  "projection-screen-setup": {
    subtitle: "Documentation · portable screen setup",
    keywords: "projection screen skerell 150 inch assemble trailer",
  },
};

const mediaEquipmentSearchMeta: Record<string, { keywords: string }> = {
  "foh-mac": {
    keywords: "foh mac desktop shared display usb-c hdmi",
  },
  "epson-home-cinema-2250": {
    keywords: "epson projector home cinema 2250 truss overhead",
  },
  "gofanco-hdmi-extender": {
    keywords: "gofanco hdmi extender cat6 transmitter receiver splitter",
  },
  "roku-confidence-monitor": {
    keywords: "confidence monitor roku tv 55 inch display foh",
  },
  "confidence-monitor-stand": {
    keywords: "confidence monitor rolling stand cart foh",
  },
  "skerell-projection-screen": {
    keywords: "skerell projection screen 150 inch portable foldable",
  },
  "usb-c-hdmi-adapters": {
    keywords: "usb-c hdmi adapter cable mac display",
  },
  "cat6-projector-cable": {
    keywords: "cat6 projector signal cable extender wall curtain truss",
  },
};

const mediaCategorySearchMeta: Record<string, string> = {
  displays: "display screen confidence monitor projection",
  projection: "projector epson gofanco cat6 hdmi extender",
  control: "foh mac shared computer display",
};

const mediaTroubleshootingSearchMeta: Record<string, string> = {
  "projector-has-no-image": "projector no image blank screen epson",
  "confidence-monitor-is-blank": "confidence monitor blank no display roku tv",
  "propresenter-output-not-showing": "propresenter output not showing display",
  "cat6-extender-no-signal": "cat6 extender no signal gofanco hdmi",
  "wrong-display-output-selected": "wrong display output selected monitor projector",
};

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  results.push({
    id: "page-audio-home",
    title: voaLabels.audioDepartment,
    subtitle: "Audio Department home",
    href: "/audio",
    category: "page",
    keywords: "audio department sound",
  });

  results.push({
    id: "page-sunday-setup",
    title: "Sunday Setup",
    subtitle: "Pre-service checklist",
    href: "/audio/setup",
    category: "page",
    keywords: "sunday setup checklist pre-service service morning",
  });

  results.push({
    id: "page-equipment",
    title: "Equipment",
    subtitle: "Audio equipment manuals",
    href: "/audio/equipment",
    category: "page",
    keywords: "equipment gear manuals",
  });

  results.push({
    id: "page-documentation",
    title: "Documentation",
    subtitle: "Patch lists, routing, and guides",
    href: "/audio/documentation",
    category: "page",
    keywords: "documentation docs reference",
  });

  results.push({
    id: "page-troubleshooting",
    title: "Troubleshooting",
    subtitle: "Fix common audio problems",
    href: "/audio/troubleshooting",
    category: "page",
    keywords: "troubleshooting help problem fix emergency",
  });

  results.push({
    id: "page-inventory",
    title: "Inventory",
    subtitle: "Audio Department equipment list",
    href: "/audio/inventory",
    category: "page",
    keywords: "inventory gear list assets",
  });

  for (const page of documentationPages) {
    const meta = documentationSearchMeta[page.id];
    results.push({
      id: `doc-${page.id}`,
      title: page.title,
      subtitle: meta?.subtitle ?? "Documentation",
      href: page.href,
      category: "page",
      keywords: meta?.keywords,
    });
  }

  for (const category of equipmentCategories) {
    results.push({
      id: `eq-cat-${category.id}`,
      title: category.title,
      subtitle: "Equipment category",
      href: category.href,
      category: "equipment",
      keywords: categorySearchMeta[category.id],
    });
  }

  for (const item of equipmentItems) {
    const meta = equipmentSearchMeta[item.slug];
    results.push({
      id: `eq-${item.slug}`,
      title: item.name,
      subtitle: "Equipment manual",
      href: getEquipmentItemHref(item.slug),
      category: "equipment",
      keywords: meta?.keywords,
    });
  }

  for (const topic of troubleshootingTopics) {
    results.push({
      id: `ts-${topic.id}`,
      title: topic.title,
      subtitle: "Troubleshooting guide",
      href: topic.href,
      category: "troubleshooting",
      keywords: troubleshootingSearchMeta[topic.id],
    });
  }

  results.push({
    id: "setup-unload-trailer",
    title: sundaySetupUnloadTrailer.title,
    subtitle: "Sunday Setup",
    href: "/audio/setup",
    category: "setup",
    keywords: "unload trailer load in gear",
  });

  for (const section of sundaySetupV2Sections) {
    results.push({
      id: `setup-section-${section.id}`,
      title: section.title,
      subtitle: "Sunday Setup section",
      href: "/audio/setup",
      category: "setup",
      keywords: `${section.title} sunday setup checklist`,
    });

    for (const task of getSectionItems(section)) {
      results.push({
        id: `setup-task-${task.id}`,
        title: task.label,
        subtitle: section.title,
        href: "/audio/setup",
        category: "setup",
      });
    }
  }

  results.push({
    id: "page-lighting-home",
    title: "Lighting Department",
    subtitle: "Lighting Department home",
    href: "/lighting",
    category: "page",
    keywords: "lighting department lights dmx",
  });

  results.push({
    id: "page-lighting-setup",
    title: "Lighting Sunday Setup",
    subtitle: "Pre-service lighting checklist",
    href: "/lighting/setup",
    category: "page",
    keywords: "lighting sunday setup checklist slimpar dmx",
  });

  results.push({
    id: "page-lighting-equipment",
    title: "Lighting Equipment",
    subtitle: "Lighting equipment manuals",
    href: "/lighting/equipment",
    category: "page",
    keywords: "lighting equipment slimpar lightkey dmxking fixture",
  });

  results.push({
    id: "page-lighting-documentation",
    title: "Lighting Documentation",
    subtitle: "Lighting plots and DMX reference",
    href: "/lighting/documentation",
    category: "page",
    keywords: "lighting documentation plot dmx fixture",
  });

  results.push({
    id: "page-lighting-troubleshooting",
    title: "Lighting Troubleshooting",
    subtitle: "Fix common lighting problems",
    href: "/lighting/troubleshooting",
    category: "page",
    keywords: "lighting troubleshooting no dmx light not working fixture",
  });

  results.push({
    id: "page-lighting-inventory",
    title: "Lighting Inventory",
    subtitle: "Lighting Department equipment list",
    href: "/lighting/inventory",
    category: "page",
    keywords: "lighting inventory gear slimpar dmxking",
  });

  for (const page of lightingDocumentationPages) {
    const meta = lightingDocumentationSearchMeta[page.id];
    results.push({
      id: `lighting-doc-${page.id}`,
      title: page.title,
      subtitle: meta?.subtitle ?? "Lighting documentation",
      href: page.href,
      category: "page",
      keywords: meta?.keywords,
    });
  }

  for (const category of lightingEquipmentCategories) {
    results.push({
      id: `lighting-eq-cat-${category.id}`,
      title: category.title,
      subtitle: "Lighting equipment category",
      href: category.href,
      category: "equipment",
      keywords: lightingCategorySearchMeta[category.id],
    });
  }

  for (const item of lightingEquipmentItems) {
    const meta = lightingEquipmentSearchMeta[item.slug];
    results.push({
      id: `lighting-eq-${item.slug}`,
      title: item.name,
      subtitle: "Lighting equipment manual",
      href: getLightingEquipmentItemHref(item.slug),
      category: "equipment",
      keywords: meta?.keywords,
    });
  }

  for (const topic of lightingTroubleshootingTopics) {
    results.push({
      id: `lighting-ts-${topic.id}`,
      title: topic.title,
      subtitle: "Lighting troubleshooting guide",
      href: topic.href,
      category: "troubleshooting",
      keywords: lightingTroubleshootingSearchMeta[topic.id],
    });
  }

  for (const section of lightingSetupSections) {
    results.push({
      id: `lighting-setup-section-${section.id}`,
      title: section.title,
      subtitle: "Lighting Sunday Setup section",
      href: "/lighting/setup",
      category: "setup",
      keywords: `${section.title} lighting sunday setup checklist dmx slimpar`,
    });

    for (const task of section.items) {
      results.push({
        id: `lighting-setup-task-${task.id}`,
        title: task.label,
        subtitle: section.title,
        href: "/lighting/setup",
        category: "setup",
        keywords: "lighting setup dmx slimpar floor truss",
      });
    }
  }

  results.push({
    id: "page-media-home",
    title: "Media Department",
    subtitle: "Media Department home",
    href: "/media",
    category: "page",
    keywords: "media department projector screen display presentation",
  });

  results.push({
    id: "page-media-setup",
    title: "Media Sunday Setup",
    subtitle: "Pre-service media display checklist",
    href: "/media/setup",
    category: "page",
    keywords: "media sunday setup screen projector confidence monitor",
  });

  results.push({
    id: "page-media-equipment",
    title: "Media Equipment",
    subtitle: "Media equipment manuals",
    href: "/media/equipment",
    category: "page",
    keywords: "media equipment epson projector skerell screen gofanco roku",
  });

  results.push({
    id: "page-media-documentation",
    title: "Media Documentation",
    subtitle: "Media plots and signal flow reference",
    href: "/media/documentation",
    category: "page",
    keywords: "media documentation plot projector signal flow screen",
  });

  results.push({
    id: "page-media-troubleshooting",
    title: "Media Troubleshooting",
    subtitle: "Fix common media display problems",
    href: "/media/troubleshooting",
    category: "page",
    keywords: "media troubleshooting projector no image confidence monitor blank",
  });

  results.push({
    id: "page-media-inventory",
    title: "Media Inventory",
    subtitle: "Media Department equipment list",
    href: "/media/inventory",
    category: "page",
    keywords: "media inventory projector screen extender cat6",
  });

  for (const page of mediaDocumentationPages) {
    const meta = mediaDocumentationSearchMeta[page.id];
    results.push({
      id: `media-doc-${page.id}`,
      title: page.title,
      subtitle: meta?.subtitle ?? "Media documentation",
      href: page.href,
      category: "page",
      keywords: meta?.keywords,
    });
  }

  for (const category of mediaEquipmentCategories) {
    results.push({
      id: `media-eq-cat-${category.id}`,
      title: category.title,
      subtitle: "Media equipment category",
      href: category.href,
      category: "equipment",
      keywords: mediaCategorySearchMeta[category.id],
    });
  }

  for (const item of mediaEquipmentItems) {
    const meta = mediaEquipmentSearchMeta[item.slug];
    results.push({
      id: `media-eq-${item.slug}`,
      title: item.name,
      subtitle: "Media equipment manual",
      href: getMediaEquipmentItemHref(item.slug),
      category: "equipment",
      keywords: meta?.keywords,
    });
  }

  for (const topic of mediaTroubleshootingTopics) {
    results.push({
      id: `media-ts-${topic.id}`,
      title: topic.title,
      subtitle: "Media troubleshooting guide",
      href: topic.href,
      category: "troubleshooting",
      keywords: mediaTroubleshootingSearchMeta[topic.id],
    });
  }

  for (const section of mediaSetupSections) {
    results.push({
      id: `media-setup-section-${section.id}`,
      title: section.title,
      subtitle: "Media Sunday Setup section",
      href: "/media/setup",
      category: "setup",
      keywords: `${section.title} media sunday setup projector screen display`,
    });

    for (const task of section.items) {
      results.push({
        id: `media-setup-task-${task.id}`,
        title: task.label,
        subtitle: section.title,
        href: "/media/setup",
        category: "setup",
        keywords: "media setup projector screen confidence monitor cat6 hdmi",
      });
    }
  }

  return results;
}

export const globalSearchIndex = buildSearchIndex();

function matchesQuery(result: SearchResult, query: string): boolean {
  return (
    result.title.toLowerCase().includes(query) ||
    result.subtitle?.toLowerCase().includes(query) === true ||
    result.keywords?.includes(query) === true
  );
}

export function searchGlobalIndex(query: string, limit = 12): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return globalSearchIndex.filter((r) => matchesQuery(r, q)).slice(0, limit);
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
