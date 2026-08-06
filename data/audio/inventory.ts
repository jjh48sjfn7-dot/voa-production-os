import { Cable, Mic2, Package, Wrench } from "lucide-react";
import type { ContentBlock, InventoryEntry } from "@/types/audio";

export const INVENTORY_STORAGE_ID = "audio-inventory";
export const INVENTORY_CHECKOUT_SCOPE = "audio-inventory-checkout";

export const inventoryItems: InventoryEntry[] = [
  { id: "inv-sm58-1", assetNumber: "VOA-ANT-AUD-001", name: "Shure SM58 (Vocal)", category: "Microphones", quantity: 8, location: "Audio Closet — Case A", status: "available", condition: "excellent", lastService: "Jun 2026", nextService: "Dec 2026" },
  { id: "inv-sm57-1", assetNumber: "VOA-ANT-AUD-002", name: "Shure SM57 (Instrument)", category: "Microphones", quantity: 6, location: "Audio Closet — Case A", status: "available", condition: "good", lastService: "May 2026", nextService: "Nov 2026" },
  { id: "inv-beta52", assetNumber: "VOA-ANT-AUD-003", name: "Shure Beta 52A (Kick)", category: "Microphones", quantity: 1, location: "Stage — Drum kit", status: "in-use", condition: "excellent", lastService: "Jul 2026", nextService: "Jan 2027" },
  { id: "inv-wireless", assetNumber: "VOA-ANT-AUD-004", name: "Shure BLX288 (Pastor HH)", category: "Microphones", quantity: 1, location: "FOH Rack — Wireless", status: "in-use", condition: "good", lastService: "Aug 2026", nextService: "Feb 2027" },
  { id: "inv-di-radial", assetNumber: "VOA-ANT-AUD-010", name: "Radial ProDI", category: "DI Boxes", quantity: 4, location: "Audio Closet — DI Drawer", status: "available", condition: "excellent", lastService: "Apr 2026", nextService: "Oct 2026" },
  { id: "inv-di-countryman", assetNumber: "VOA-ANT-AUD-011", name: "Countryman Type 85", category: "DI Boxes", quantity: 2, location: "Audio Closet — DI Drawer", status: "available", condition: "good", lastService: "Mar 2026", nextService: "Sep 2026" },
  { id: "inv-xlr-25", assetNumber: "VOA-ANT-AUD-020", name: "XLR Cable 25ft (Green)", category: "Cables", quantity: 16, location: "Cable Bin — Green", status: "available", condition: "good" },
  { id: "inv-xlr-50", assetNumber: "VOA-ANT-AUD-021", name: "XLR Cable 50ft (Blue)", category: "Cables", quantity: 10, location: "Cable Bin — Blue", status: "available", condition: "fair", lastService: "Jan 2026", nextService: "Jul 2026" },
  { id: "inv-speaker", assetNumber: "VOA-ANT-AUD-022", name: "Speaker Cable NL4 50ft", category: "Cables", quantity: 4, location: "FOH Rack", status: "in-use", condition: "good" },
  { id: "inv-snake", assetNumber: "VOA-ANT-AUD-030", name: "32-Ch Digital Snake", category: "Snakes", quantity: 1, location: "FOH Rack → Stage", status: "in-use", condition: "excellent", lastService: "Jul 2026", nextService: "Jan 2027" },
  { id: "inv-stagebox1", assetNumber: "VOA-ANT-AUD-031", name: "Rio3224-D2 SB1", category: "Rio3224-D2", quantity: 1, location: "Stage Left — Drum Position", status: "in-use", condition: "excellent", lastService: "Jun 2026", nextService: "Dec 2026" },
  { id: "inv-stagebox2", assetNumber: "VOA-ANT-AUD-032", name: "Rio3224-D2 SB2", category: "Rio3224-D2", quantity: 1, location: "Stage Right — Keyboard Position", status: "in-use", condition: "excellent", lastService: "Jun 2026", nextService: "Dec 2026" },
  { id: "inv-stand-boom", assetNumber: "VOA-ANT-AUD-040", name: "K&M Boom Stand", category: "Stands", quantity: 10, location: "Stand Bag — Closet", status: "available", condition: "good" },
  { id: "inv-stand-straight", assetNumber: "VOA-ANT-AUD-041", name: "Straight Mic Stand", category: "Stands", quantity: 8, location: "Stand Bag — Closet", status: "available", condition: "fair", lastService: "Feb 2026", nextService: "Aug 2026" },
  { id: "inv-tape", assetNumber: "VOA-ANT-AUD-050", name: "Spike Tape (Neon)", category: "Accessories", quantity: 4, location: "FOH Drawer", status: "available", condition: "good" },
  { id: "inv-batteries", assetNumber: "VOA-ANT-AUD-051", name: "AA Batteries (Duracell 24pk)", category: "Accessories", quantity: 3, location: "FOH Drawer", status: "available", condition: "good", lastService: "Aug 2026", nextService: "Feb 2027" },
  { id: "inv-tf5", assetNumber: "VOA-ANT-AUD-060", name: "Yamaha TF5 Console", category: "Console", quantity: 1, location: "FOH Rack", status: "in-use", condition: "excellent", lastService: "Aug 2026", nextService: "Feb 2027" },
  { id: "inv-foh", assetNumber: "VOA-ANT-AUD-070", name: "QSC K12.2 (FOH L/R)", category: "Speakers", quantity: 2, location: "FOH — Center Screen", status: "in-use", condition: "excellent", lastService: "Jun 2026", nextService: "Dec 2026" },
  { id: "inv-monitor", assetNumber: "VOA-ANT-AUD-071", name: "QSC K10.2 (Stage Monitor L/R)", category: "Speakers", quantity: 2, location: "Stage", status: "in-use", condition: "excellent", lastService: "Jun 2026", nextService: "Dec 2026" },
];

export const inventoryBlocks: ContentBlock[] = [
  {
    id: "pre-service-inventory",
    title: "Pre-Service Inventory Check",
    description: "Run before 10:15 AM — every item accounted for.",
    icon: Package,
    type: "checklist",
    items: [
      { id: "inv-check-mics", label: "All 8 SM58s in Case A — counted" },
      { id: "inv-check-di", label: "4 Radial ProDIs + 2 Countryman in drawer" },
      { id: "inv-check-cables", label: "Min 4 spare green XLR 25ft in bin" },
      { id: "inv-check-batteries", label: "Pastor wireless — fresh AA installed" },
      { id: "inv-check-stands", label: "Mic stands counted — no bent threads" },
    ],
  },
  {
    id: "post-service-inventory",
    title: "Post-Service Inventory Check",
    icon: Wrench,
    type: "checklist",
    items: [
      { id: "inv-return-mics", label: "All mics returned to Case A — wipe down" },
      { id: "inv-return-di", label: "DI boxes returned — ground lift reset" },
      { id: "inv-coil-cables", label: "Cables coiled by color — green/blue bins" },
      { id: "inv-report-damage", label: "Log damage in Volunteer Team Notes (Sunday Experience)" },
    ],
  },
];

export const inventoryCategories = [
  "All",
  "Microphones",
  "DI Boxes",
  "Cables",
  "Snakes",
  "Rio3224-D2",
  "Stands",
  "Console",
  "Speakers",
  "Accessories",
];

export const statusStyles: Record<InventoryEntry["status"], string> = {
  available: "text-green-400 bg-green-500/12 ring-green-500/20",
  "in-use": "text-amber-400 bg-amber-500/12 ring-amber-500/20",
  maintenance: "text-red-400 bg-red-500/12 ring-red-500/20",
};

export const conditionStyles: Record<InventoryEntry["condition"], string> = {
  excellent: "text-emerald-400",
  good: "text-blue-400",
  fair: "text-amber-400",
  "needs-service": "text-red-400",
};

export function getInventoryChecklistIds(): string[] {
  return inventoryBlocks.flatMap((block) =>
    block.type === "checklist" && block.items ? block.items.map((i) => i.id) : []
  );
}
