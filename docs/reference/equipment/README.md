# Blueprint Equipment Visual Reference

This folder is reserved for **approved top-down equipment reference assets** used by Production OS maps.

## Current state

The Master Church Blueprint at `/blueprint` uses **inline React SVG illustrations** in:

```
components/blueprint/graphics/
```

These are the canonical visuals until approved assets are added here.

## Future asset locations

| Location | Purpose |
|----------|---------|
| `/docs/reference/equipment/` | Source reference files, design specs, export notes |
| `/public/blueprint/equipment/` | Static SVG/PNG served by Next.js when wired into `BlueprintEquipmentGraphic` |

## Adding approved assets later

1. Place the approved file in `/public/blueprint/equipment/{graphic-id}.svg`
2. Register the asset in `components/blueprint/graphics/asset-sources.ts`
3. Update `BlueprintEquipmentGraphic` to prefer local assets when present
4. Do **not** change `data/blueprint/theater.ts` positions unless placement is intentionally updated in the master blueprint

## Rules

- Top-down or slight overhead perspective only
- Consistent stroke weight with inline SVG style
- No remote URLs
- No product photography
- No emojis as primary map graphics
