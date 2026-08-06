import type { DocumentationPageContent } from "@/data/audio/v2/documentation/types";

export const outputRouting: DocumentationPageContent = {
  id: "output-routing",
  purpose: "Where does each TF5 output go?",
  tableSections: [
    {
      title: "Output Routing",
      columns: [
        { key: "output", label: "TF5 Output" },
        { key: "destination", label: "Destination" },
      ],
      rows: [
        {
          output: "Main L/R",
          destination: "FOH Left & Right Speakers",
        },
        {
          output: "Mix 1",
          destination: "Left Stage Monitor · Stage Snake A · Output 2",
        },
        {
          output: "Mix 2",
          destination: "Right Stage Monitor · Stage Snake B · Output 2",
        },
        {
          output: "Mix 3",
          destination: "Drummer In-Ear · Stage Snake A · Output 3",
        },
        {
          output: "Mix 4",
          destination: "Subwoofer · Reserved · Stage Snake B · Output 3",
        },
        {
          output: "Stage Snake A · Output 1",
          destination: "Right FOH Speaker",
        },
        {
          output: "Stage Snake B · Output 1",
          destination: "Right FOH Speaker",
        },
      ],
    },
  ],
};
