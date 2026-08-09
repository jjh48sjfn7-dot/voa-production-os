# Production OS — Custom Icon Needs List

Phase 2 uses **Lucide-first** icons from `lib/production-icons.ts`. No custom SVG artwork was invented during this pass.

## Status: No blocking custom icons required

All Phase 2 target surfaces map to existing Lucide symbols.

## Watch list (optional future custom artwork)

| Concept | Current Lucide stand-in | Notes |
|---------|-------------------------|-------|
| gofanco HDMI extender | `signal` (Radio) | Acceptable for transmitter/receiver nodes |
| DMXking Micro | `cable` | Acceptable for USB-DMX interface |
| Lightkey app | `dmx-control` (SlidersHorizontal) | Acceptable for lighting control software |
| Skerell projection screen | `screen` (Presentation) | Acceptable until product-specific art is approved |
| Yamaha TF5 console | `console` (SlidersHorizontal) | Product photo preferred on equipment detail pages |

If owner approves custom line icons later, add approved SVGs under `/public/brand/icons/` and extend `productionIcons` with optional custom entries — do not replace Lucide in nav/dashboard.
