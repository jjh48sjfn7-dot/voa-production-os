/** Production-ready brand photos — owner-prepared assets in /public/brand/photos. */
export const brandPhotos = {
  venue: {
    /** Approved hero candidate — Dashboard visual pass (not wired yet). */
    stageCenter: "/brand/photos/venue/empty-stage-center.jpg",
  },
  equipment: {
    yamahaTf5: "/brand/photos/equipment/yamaha-tf5-transparent.png",
    keyboardModx8: "/brand/photos/equipment/keyboard-modx8-transparent.png",
    qscK12: "/brand/photos/equipment/qsc-k12-transparent.png",
    qscK102: "/brand/photos/equipment/qsc-k10.2-transparent.png",
    stageSnakeA: "/brand/photos/equipment/stage-snake-a-transparent.png",
    /** Same underlying asset as stageSnakeA (identical files on disk). */
    stageSnakeB: "/brand/photos/equipment/stage-snake-a-transparent.png",
    behringerPm1: "/brand/photos/equipment/behringer-pm1-transparent.png",
    shureBlx288: "/brand/photos/equipment/Shure-blx288-Reciever-transparent.png",
    /** Shared FOH iMac — Audio Media Computer, Media FOH Mac, Lighting Lightkey control. */
    mediaComputer: "/brand/photos/equipment/media-computer-transparent.png",
    projector: "/brand/photos/equipment/projector-transparent.png",
    xlrCables: "/brand/photos/equipment/xlr-cables-trnasparent.png",
    powerCables: "/brand/photos/equipment/ac-power-cable-transparent.png",
    microphoneStand: "/brand/photos/equipment/microphone-stand-transparent.png",
  },
} as const;

export type BrandPhotoKey = keyof typeof brandPhotos.equipment;
