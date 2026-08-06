import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

// Future updates will populate channels as the production system expands.
// Never invent channel assignments.

export const tf5ChannelList: DocumentationPageContent = {
  id: "tf5-channel-list",
  purpose: "Which source is assigned to each Yamaha TF5 channel?",
  subtitle: "Official Yamaha TF5 input channel assignments.",
  tableSections: [
    {
      title: "TF5 Channel List",
      columns: [
        { key: "channel", label: "Channel" },
        { key: "source", label: "Source" },
        { key: "category", label: "Category" },
        { key: "notes", label: "Notes" },
      ],
      rows: [
        {
          channel: "Channel 1",
          source: "Kick",
          category: "Drums",
          notes: "Stage Snake A Input 1",
        },
        {
          channel: "Channel 2",
          source: "Snare",
          category: "Drums",
          notes: "Stage Snake A Input 2",
        },
        {
          channel: "Channel 3",
          source: "Toms",
          category: "Drums",
          notes: "Stage Snake A Input 3",
        },
        {
          channel: "Channel 4",
          source: "Floor Tom",
          category: "Drums",
          notes: "Stage Snake A Input 4",
        },
        {
          channel: "Channel 5",
          source: "Overhead Left",
          category: "Drums",
          notes: "Stage Snake A Input 5",
        },
        {
          channel: "Channel 6",
          source: "Overhead Right",
          category: "Drums",
          notes: "Stage Snake A Input 6",
        },
        {
          channel: "Channels 7–16",
          source: "Available",
          category: "—",
          notes: "Unassigned",
        },
        {
          channel: "Channel 17",
          source: "Wireless Purple",
          category: "Wireless",
          notes: "Shure BLX Receiver",
        },
        {
          channel: "Channel 18",
          source: "Wireless Yellow",
          category: "Wireless",
          notes: "Shure BLX Receiver",
        },
        {
          channel: "Channel 19",
          source: "Wireless Green",
          category: "Wireless",
          notes: "Shure BLX Receiver",
        },
        {
          channel: "Channel 20",
          source: "Wireless Blue",
          category: "Wireless",
          notes: "Shure BLX Receiver",
        },
        {
          channel: "Channels 21–40",
          source: "Available",
          category: "—",
          notes: "Unassigned",
        },
      ],
    },
  ],
  relatedResources: [
    {
      icon: "🎚️",
      title: "Yamaha TF5",
      href: "/audio/equipment/item/yamaha-tf5",
    },
    {
      icon: "📥",
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      icon: "🔌",
      title: "Stage Snake A",
      href: "/audio/equipment/item/stage-snake-a",
    },
    {
      icon: "🔌",
      title: "Stage Snake B",
      href: "/audio/equipment/item/stage-snake-b",
    },
    {
      icon: "🔊",
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
    {
      icon: "🔄",
      title: "Signal Flow",
      href: "/audio/documentation/signal-flow",
    },
    {
      icon: "🎯",
      title: "Sunday Setup",
      href: "/audio/setup",
    },
  ],
};
