import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const tf5ChannelList: DocumentationPageContent = {
  id: "tf5-channel-list",
  purpose: "What source is assigned to each Yamaha TF5 channel?",
  subtitle: "Official Yamaha TF5 console channel assignments.",
  headerInfo: {
    title: "Understanding TF5 Channels",
    body: [
      "The Yamaha TF5 channel numbers do not necessarily match the physical stage inputs.",
      "Physical connections are documented in the Input Patch List.",
      "This page documents how the Sunday Scene is organized for mixing.",
    ],
  },
  channelGroups: [
    {
      type: "available",
      title: "Available",
      channels: "1–15",
      status: "Available",
    },
    {
      type: "assignments",
      title: "Keyboard",
      items: [
        {
          channel: 16,
          fields: [
            { label: "Source", value: "Keyboard" },
            { label: "Physical Source", value: "Stage Snake B Input 1" },
            { label: "Category", value: "Band" },
          ],
        },
      ],
    },
    {
      type: "assignments",
      title: "Wireless",
      items: [
        {
          channel: 17,
          fields: [
            { label: "Source", value: "Purple Wireless" },
            { label: "Physical Source", value: "TF5 Local Input 17" },
          ],
        },
        {
          channel: 18,
          fields: [
            { label: "Source", value: "Yellow Wireless" },
            { label: "Physical Source", value: "TF5 Local Input 18" },
          ],
        },
        {
          channel: 19,
          fields: [
            { label: "Source", value: "Green Wireless" },
            { label: "Physical Source", value: "TF5 Local Input 19" },
          ],
        },
        {
          channel: 20,
          fields: [
            { label: "Source", value: "Blue Wireless" },
            { label: "Physical Source", value: "TF5 Local Input 20" },
          ],
        },
      ],
    },
    {
      type: "available",
      title: "Available",
      channels: "21–24",
      status: "Available",
    },
    {
      type: "assignments",
      title: "Drums",
      items: [
        {
          channel: 25,
          fields: [
            { label: "Source", value: "Snare" },
            { label: "Physical Source", value: "Stage Snake A Input 2" },
          ],
        },
        {
          channel: 26,
          fields: [
            { label: "Source", value: "Toms" },
            { label: "Physical Source", value: "Stage Snake A Input 3" },
          ],
        },
        {
          channel: 27,
          fields: [
            { label: "Source", value: "Floor Tom" },
            { label: "Physical Source", value: "Stage Snake A Input 4" },
          ],
        },
        {
          channel: 28,
          fields: [
            { label: "Source", value: "Kick" },
            { label: "Physical Source", value: "Stage Snake A Input 1" },
          ],
        },
        {
          channel: 29,
          fields: [
            { label: "Source", value: "Overhead Left" },
            { label: "Physical Source", value: "Stage Snake A Input 5" },
          ],
        },
        {
          channel: 30,
          fields: [
            { label: "Source", value: "Overhead Right" },
            { label: "Physical Source", value: "Stage Snake A Input 6" },
          ],
        },
      ],
    },
    {
      type: "assignments",
      title: "Playback",
      items: [
        {
          channel: 31,
          fields: [
            { label: "Source", value: "Computer Left" },
            { label: "Physical Source", value: "TF5 Local Input 31" },
          ],
        },
        {
          channel: 32,
          fields: [
            { label: "Source", value: "Computer Right" },
            { label: "Physical Source", value: "TF5 Local Input 32" },
          ],
        },
      ],
    },
  ],
  relatedResources: [
    {
      icon: "console",
      title: "Yamaha TF5",
      href: "/audio/equipment/item/yamaha-tf5",
    },
    {
      icon: "signal-in",
      title: "Input Patch List",
      href: "/audio/documentation/input-patch-list",
    },
    {
      icon: "speaker",
      title: "Output Routing",
      href: "/audio/documentation/output-routing",
    },
    {
      icon: "signal",
      title: "Signal Flow",
      href: "/audio/documentation/signal-flow",
    },
    {
      icon: "target",
      title: "Sunday Setup",
      href: "/audio/setup",
    },
  ],
};
