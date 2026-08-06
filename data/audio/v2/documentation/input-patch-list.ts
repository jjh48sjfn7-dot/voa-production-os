import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const inputPatchList: DocumentationPageContent = {
  id: "input-patch-list",
  purpose: "Where does every cable physically plug in?",
  tableSections: [
    {
      title: "Stage Snake A Inputs",
      columns: [
        { key: "input", label: "Input" },
        { key: "source", label: "Source" },
      ],
      rows: [
        { input: "Input 1", source: "Kick Drum" },
        { input: "Input 2", source: "Snare Drum" },
        { input: "Input 3", source: "Toms" },
        { input: "Input 4", source: "Floor Tom" },
        { input: "Input 5", source: "Overhead Microphone 1" },
        { input: "Input 6", source: "Overhead Microphone 2" },
      ],
    },
    {
      title: "Stage Snake B Inputs",
      columns: [
        { key: "input", label: "Input" },
        { key: "source", label: "Source" },
      ],
      rows: [{ input: "Input 1", source: "Keyboard" }],
    },
  ],
};
