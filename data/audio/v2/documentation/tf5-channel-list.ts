import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const tf5ChannelList: DocumentationPageContent = {
  id: "tf5-channel-list",
  purpose: "Where is every source mixed on the Yamaha TF5?",
  tableSections: [
    {
      title: "TF5 Channel List",
      columns: [
        { key: "channel", label: "Channel" },
        { key: "source", label: "Source" },
        { key: "input", label: "Input Path" },
      ],
      rows: [
        {
          channel: "1",
          source: "Kick Drum",
          input: "Stage Snake A · Input 1",
        },
        {
          channel: "2",
          source: "Snare Drum",
          input: "Stage Snake A · Input 2",
        },
        { channel: "3", source: "Toms", input: "Stage Snake A · Input 3" },
        {
          channel: "4",
          source: "Floor Tom",
          input: "Stage Snake A · Input 4",
        },
        {
          channel: "5",
          source: "Overhead Microphone 1",
          input: "Stage Snake A · Input 5",
        },
        {
          channel: "6",
          source: "Overhead Microphone 2",
          input: "Stage Snake A · Input 6",
        },
        {
          channel: "7",
          source: "Keyboard",
          input: "Stage Snake B · Input 1",
        },
        {
          channel: "17",
          source: "Wireless Microphone",
          input: "Purple XLR · Receiver Output",
        },
        {
          channel: "18",
          source: "Wireless Microphone",
          input: "Yellow XLR · Receiver Output",
        },
        {
          channel: "19",
          source: "Wireless Microphone",
          input: "Green XLR · Receiver Output",
        },
        {
          channel: "20",
          source: "Wireless Microphone",
          input: "Blue XLR · Receiver Output",
        },
        {
          channel: "21",
          source: "Media Computer",
          input: "TF5 Playback Input",
        },
      ],
    },
  ],
};
