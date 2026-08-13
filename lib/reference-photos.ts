/** Owner-approved Sunday reference photography — instructional venue photos only. */
export interface ReferencePhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface ReferencePhotoSequenceStep extends ReferencePhoto {
  step: number;
}

export interface ReferencePhotoSequence {
  title: string;
  note?: string;
  steps: ReferencePhotoSequenceStep[];
}

export const referencePhotos = {
  foh: {
    operatorPosition: {
      src: "/images/reference/foh/foh-operator-position-reference.png",
      alt: "FOH operator position with Yamaha TF5 and iMac facing the stage",
      width: 4032,
      height: 3024,
      caption:
        "FOH sits house-right at the back of the seating area, facing the stage.",
    },
    productionTableRear: {
      src: "/images/reference/foh/foh-production-table-reference.png",
      alt: "Rear view of FOH Mac with HDMI adapter and gofanco transmitter at the production table",
      width: 4032,
      height: 3024,
      caption:
        "FOH projector signal connections — Mac, HDMI adapter, and gofanco transmitter.",
    },
    imacTf5Rear: {
      src: "/images/reference/foh/foh-imac-tf5-rear-reference.png",
      alt: "FOH production table with Yamaha TF5 and Mac positioned together",
      width: 4032,
      height: 3024,
      caption:
        "FOH layout — TF5 and Mac positioned together at the production table.",
    },
  },
  setup: {
    equipmentCableSetup: {
      src: "/images/reference/setup/equipment-cable-setup-reference.png",
      alt: "FOH production table and confidence monitor on rolling stand relative to auditorium seating",
      width: 3024,
      height: 4032,
      caption:
        "Confidence monitor on rolling stand immediately right of the FOH Mac and production table.",
    },
    confidenceMonitorHdmi: {
      src: "/images/reference/setup/sunday-setup-reference.png",
      alt: "Rear of confidence monitor TV showing HDMI 2 connection with j5create adapter",
      width: 3024,
      height: 4032,
      caption: "Connect HDMI to the TV — reference shows HDMI 2 with the j5create adapter.",
    },
    stageSetupRear: {
      src: "/images/reference/setup/stage-setup-reference.png",
      alt: "Alternate rear view of FOH production table wiring",
      width: 4032,
      height: 3024,
    },
  },
} as const;

export const venueCablePathSequence: ReferencePhotoSequence = {
  title: "Venue cable path — right-side aisle to FOH",
  note:
    "Visual reference only. Approved Audio, Lighting, and Media routing documentation remains the technical source of truth.",
  steps: [
    {
      step: 1,
      src: "/images/reference/cable-routing/cable-routing-01.png",
      alt: "Cable run starting along the right-side aisle rail beside seating",
      width: 3024,
      height: 4032,
      caption:
        "Start the run along the right-side aisle/rail. Keep cables against the edge and out of the walking path.",
    },
    {
      step: 2,
      src: "/images/reference/cable-routing/cable-routing-02.png",
      alt: "Cable bundle continuing along the seating line toward FOH",
      width: 3024,
      height: 4032,
      caption:
        "Continue along the seating line toward FOH. Keep the bundle tight to the seats.",
    },
    {
      step: 3,
      src: "/images/reference/cable-routing/cable-routing-03.png",
      alt: "Cable following the lower step and seat edge through a transition",
      width: 3024,
      height: 4032,
      caption:
        "Follow the cable around the lower step/seat edge. Keep it tight to the edge through the transition.",
    },
    {
      step: 4,
      src: "/images/reference/cable-routing/cable-routing-04.png",
      alt: "Cable run continuing along the outside of seating to the FOH position",
      width: 3024,
      height: 4032,
      caption:
        "Continue along the outside of the seating to the FOH position. This completes the weekly run at FOH.",
    },
  ],
};

/** Audio Sunday Setup — section id → reference photo(s). */
export const audioSundaySetupReferences: Partial<
  Record<string, ReferencePhoto | ReferencePhoto[]>
> = {
  positioning: referencePhotos.foh.operatorPosition,
  "setup-tf5": referencePhotos.foh.imacTf5Rear,
};

export interface MediaConfidenceMonitorReferences {
  spatial: ReferencePhoto;
  connectionDetail: ReferencePhoto;
}

/** Media Sunday Setup — confidence monitor section references. */
export const mediaConfidenceMonitorReferences: MediaConfidenceMonitorReferences =
  {
    spatial: referencePhotos.setup.equipmentCableSetup,
    connectionDetail: referencePhotos.setup.confidenceMonitorHdmi,
  };

/** Media Sunday Setup — section id → reference photo. */
export const mediaSundaySetupReferences: Partial<Record<string, ReferencePhoto>> =
  {
    "connect-projector-path": referencePhotos.foh.productionTableRear,
  };

export const referenceSequences = {
  venueCablePath: venueCablePathSequence,
} as const;

export type ReferenceSequenceKey = keyof typeof referenceSequences;
