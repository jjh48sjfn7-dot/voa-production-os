# Cursor Context — Production OS

**Purpose:** Persistent project knowledge for Cursor AI agents working on `voa-production-portal`.  
**Read this at the start of every sprint.**  
**Companion documents:** [MASTER_PRODUCTION_BLUEPRINT.md](./MASTER_PRODUCTION_BLUEPRINT.md), [PRODUCTION_OS_STANDARDS.md](./PRODUCTION_OS_STANDARDS.md)

---

## Project Summary

| Field | Value |
|-------|-------|
| Repository | `voa-production-portal` |
| Product name | Production OS v1.0 (VOA) |
| Church | Victory Outreach Antioch — East Antioch Campus |
| Stack | Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4 |
| Primary user | Sunday production volunteers (Audio + Lighting departments live; Video / Media future) |
| Content pattern | Data in `data/{department}/v2/` → components in `components/{department}/v2/` |

Production OS is a **mobile-first reference and checklist app** — not a console remote, not a streaming platform.

---

## Current Development Phase

**Phase:** Audio Department v1.0 — **LOCKED** · Lighting Department v1.0 — **LOCKED** (owner-approved, August 2026).

| Area | Status |
|------|--------|
| Audio home | ✅ Locked |
| Sunday Setup | ✅ Locked — single official workflow (`/audio/setup`, `sunday-setup-v2`) |
| Equipment manuals | ✅ Locked — v2 canonical slugs |
| Documentation | ✅ Locked — signal flow, stage plot, patch lists, routing |
| Troubleshooting | ✅ Locked — 8 topics |
| Inventory | ✅ Locked — tappable rows link to Equipment |
| Emergency shortcuts | ✅ Locked — v2 troubleshooting routes |
| Global Search | ✅ Locked — v2 index only |
| Master Church Blueprint | ✅ Locked — `data/blueprint/theater.ts` |
| Audio Stage Plot | ✅ Locked — shared Blueprint overlay |
| Dashboard | ✅ Locked design |
| `/audio/production` | ↪ Redirects to `/audio/setup` — not discoverable |
| **Lighting Department v1.0** | ✅ **Locked** — home, setup, equipment, documentation, troubleshooting, inventory |
| Lighting Sunday Setup | ✅ Locked — `sunday-setup-lighting-v1`, Unload Trailer first |
| Lighting Equipment | ✅ Locked — 3 items (SlimPAR ×9, DMXking, Lightkey) |
| Lighting Documentation | ✅ Locked — plot, DMX flow, fixture layout, addressing (TBD values) |
| Lighting Troubleshooting | ✅ Locked — 4 topics, action-first order |
| Lighting Plot | ✅ Locked — shared Master Blueprint `overlay="lighting"` |
| Video / Media | ⬜ Not started — blueprint placeholders only |
| Legacy v1 routes | ⚠️ Exist (`/audio/tf5`, `/audio/channels`, etc.) — do not extend |

**Canonical data path:** `data/audio/v2/` · `data/lighting/v2/`  
**Canonical UI path:** `components/audio/v2/` · `components/lighting/v2/`

### Audio v1.0 change policy

Future Audio work should be limited to:

- **Bug fixes** (broken links, regressions, incorrect copy)
- **Verified equipment or routing updates** (owner-approved, cross-checked against Master Blueprint)
- **Explicitly approved future-version features** (new sprint scope — not polish or redesign)

Do **not** alter approved Audio content, layout, or geometry for cosmetic reasons.

**Final QA Must Fixes (complete):** Emergency routes · Global Search index · Subwoofer placement copy · Inventory navigation · Production Mode redirect.

### Lighting v1.0 change policy

**LIGHTING DEPARTMENT v1.0 — LOCKED** (August 2026).

Future Lighting work should be limited to:

- **Bug fixes** (broken links, regressions, incorrect copy)
- **Verified equipment or DMX/address updates** (owner-approved — fill TBD values only when verified)
- **Explicitly approved future-version features** (new sprint scope — not polish or redesign)

Do **not** alter approved Lighting content, layout, or Master Blueprint geometry for cosmetic reasons.

**Intentionally deferred (TBD — do not invent):** exact DMX starting addresses · DMX mode/personality/channel count · Lightkey scene/preset names · electrical circuit details.

**Final QA (complete):** All routes · Sunday Setup order · Equipment · Documentation · Troubleshooting action-first · Inventory links · Back buttons · Blueprint overlay · Search · Build pass.

---

## Locked Decisions

These decisions are **approved and locked**. Do not change without explicit user approval in the sprint prompt.

| Decision | Locked value |
|----------|--------------|
| Console | Yamaha TF5 |
| Stage I/O | Stage Snake A (stage left), Stage Snake B (stage right) |
| FOH speakers | QSC K12.2 × 2 |
| Stage monitors | QSC K10.2 × 2 |
| Drummer IEM | Behringer PM1 |
| Wireless | Shure BLX288 → TF5 local inputs 17–20 |
| Playback | Mac Desktop → TF5 local inputs 31–32 |
| Keyboard | Stage Snake B Input 1 → TF5 Channel 16 |
| Drum channels | TF5 Channels 25–30 via Snake A inputs 1–6 |
| FOH outputs | TF5 Outputs 15 (L), 16 (R) |
| Monitor outputs | TF5 Outputs 4 (L), 5 (R) |
| Drummer IEM output | TF5 Output 3 |
| Subwoofer output | TF5 Output 6 — **placeholder routing** |
| Console scene | Sunday Scene |
| Sunday Setup storage key | `sunday-setup-v2` |
| Master Church Blueprint | `data/blueprint/theater.ts` — source of truth for physical maps |
| Dark theme | Required — no light mode |
| Mobile-first | Required — no horizontal scroll |

---

## Audio Department Status

**AUDIO DEPARTMENT v1.0 — LOCKED.** See change policy under Current Development Phase.

### Live pages

| Page | Route | Component / data |
|------|-------|------------------|
| Audio home | `/audio` | `AudioHomeContent` |
| Sunday Setup | `/audio/setup` | `data/audio/v2/sunday-setup.ts` |
| Equipment hub | `/audio/equipment` | `data/audio/v2/equipment/categories.ts` |
| Equipment detail | `/audio/equipment/item/[slug]` | `EquipmentDetailPage` + `items.ts` |
| Documentation hub | `/audio/documentation` | `documentation.ts` |
| Input Patch List | `/audio/documentation/input-patch-list` | `documentation/content.ts` |
| TF5 Channel List | `/audio/documentation/tf5-channel-list` | `documentation/content.ts` |
| Output Routing | `/audio/documentation/output-routing` | `documentation/content.ts` |
| Signal Flow | `/audio/documentation/signal-flow` | `SignalFlowContent` + `documentation/signal-flow.ts` |
| Stage Plot | `/audio/documentation/stage-plot` | `StagePlotContent` + shared `ChurchBlueprint` (`theater.ts`) |
| Wiring Standards | `/audio/documentation/wiring-standards` | `documentation/content.ts` |
| Volunteer Guide | `/audio/documentation/volunteer-guide` | `documentation/content.ts` |
| Troubleshooting hub | `/audio/troubleshooting` | `troubleshooting/topics.ts` |
| Inventory | `/audio/inventory` | `v2/inventory.ts` — rows link to Equipment |
| Production Mode (legacy) | `/audio/production` | Redirects to `/audio/setup` |

### Equipment categories (9)

`console`, `wireless`, `foh-speakers`, `subwoofer`, `monitors`, `stage-boxes`, `keyboard`, `playback`, `accessories`

---

## Lighting Department Status

**LIGHTING DEPARTMENT v1.0 — LOCKED.** See change policy under Current Development Phase.

### Live pages

| Page | Route | Component / data |
|------|-------|------------------|
| Lighting home | `/lighting` | `LightingHomeContent`, `data/lighting/v2/home.ts` |
| Sunday Setup | `/lighting/setup` | `data/lighting/v2/sunday-setup.ts` (`sunday-setup-lighting-v1`) |
| Equipment hub | `/lighting/equipment` | `data/lighting/v2/equipment/categories.ts` |
| Equipment detail | `/lighting/equipment/item/[slug]` | `items.ts` — 3 canonical items |
| Documentation hub | `/lighting/documentation` | `documentation.ts` |
| Lighting Plot | `/lighting/documentation/lighting-plot` | `LightingPlotContent` + shared `ChurchBlueprint` (`theater.ts`, `overlay="lighting"`) |
| DMX Signal Flow | `/lighting/documentation/dmx-signal-flow` | `documentation/dmx-signal-flow.ts` |
| Fixture Layout | `/lighting/documentation/fixture-layout` | `documentation/content.ts` |
| DMX Addressing | `/lighting/documentation/dmx-addressing` | `documentation/content.ts` (addresses TBD) |
| Troubleshooting hub | `/lighting/troubleshooting` | `troubleshooting/topics.ts` — 4 topics |
| Inventory | `/lighting/inventory` | `v2/inventory.ts` — rows link to Equipment |

### Equipment items (3)

| Slug | Name |
|------|------|
| `chauvet-slimpar-pro-h-usb` | Chauvet DJ SlimPAR Pro H USB (×9) |
| `dmxking-micro` | DMXking Micro |
| `lightkey-foh-control` | FOH Mac / Lightkey Control |

### Approved physical truth (locked)

- 9 SlimPAR fixtures — 6 truss (TR-1–TR-6 permanent) + 3 floor (weekly)
- DMX Universe 1 · weekly path FOH → Floor 3 → Floor 2 → Floor 1 → TR-1
- Permanent truss chain TR-1 → TR-6 stays connected
- Master Blueprint source: `data/blueprint/theater.ts` — no duplicate geometry

---

## Approved Equipment

Canonical slugs in `data/audio/v2/equipment/items.ts`:

| Slug | Name |
|------|------|
| `yamaha-tf5` | Yamaha TF5 |
| `stage-snake-a` | Stage Snake A |
| `stage-snake-b` | Stage Snake B |
| `keyboard` | Keyboard |
| `shure-blx-receiver` | Shure BLX288 Dual Wireless Receiver |
| `qsc-k12-2` | QSC K12.2 |
| `qsc-k10-2` | QSC K10.2 |
| `drummer-in-ear-system` | Behringer PM1 — Drummer In-Ear |
| `subwoofer` | Subwoofer |
| `media-computer` | Media Computer (Mac Desktop) |
| + accessories | XLR, power cables, stands, DI boxes, etc. |

**Alias slugs** (resolve via `equipment/index.ts`):  
`shure-blx-dual-receiver-1/2`, `qsc-kw153-left/right`, `stage-monitor-left/right`, `wireless-microphones`, etc.

---

## Approved Routing

### Stage Snake A inputs

| Input | Source |
|-------|--------|
| 1 | Kick |
| 2 | Snare |
| 3 | Toms |
| 4 | Floor Tom |
| 5 | Overhead Left |
| 6 | Overhead Right |

### Stage Snake B inputs

| Input | Source |
|-------|--------|
| 1 | Keyboard |
| 2–6 | Available |

### Stage Snake A outputs

| Output | Destination | TF5 Out |
|--------|-------------|---------|
| 1 | Left FOH | 15 |
| 2 | Left Monitor | 4 |
| 3 | Drummer PM1 | 3 |
| 4 | OPEN — approval required | — |

### Stage Snake B outputs

| Output | Destination | TF5 Out |
|--------|-------------|---------|
| 1 | Right FOH | 16 |
| 2 | Right Monitor | 5 |
| 3–4 | OPEN — approval required | — |

---

## Approved TF5 Channels

| Ch | Assignment |
|----|------------|
| 16 | Keys (Snake B In 1) |
| 17 | Purple Wireless |
| 18 | Yellow Wireless |
| 19 | Green Wireless |
| 20 | Blue Wireless |
| 25 | Snare |
| 26 | Toms |
| 27 | Floor Tom |
| 28 | Kick |
| 29 | OH Left |
| 30 | OH Right |
| 31 | Computer Left |
| 32 | Computer Right |

Channels 1–15 and 21–24 are **available** — do not assign without approval.

---

## Approved Outputs

| TF5 Output | Destination |
|------------|-------------|
| 3 | Drummer In-Ear (PM1) |
| 4 | Left Stage Monitor (K10.2) |
| 5 | Right Stage Monitor (K10.2) |
| 6 | Subwoofer *(placeholder)* |
| 15 | Left FOH (K12.2) |
| 16 | Right FOH (K12.2) |

---

## Sunday Setup Rules

- **Every department Sunday Setup begins with Unload Trailer** — display milestone before accordion sections (cross-department Production OS standard)
- **7 accordion sections** in fixed order — see PRODUCTION_OS_STANDARDS.md *(Audio v1)*
- Progress stored in `localStorage` key `sunday-setup-v2`
- **Do not redesign** layout, section titles, or accordion behavior without explicit sprint approval
- Unload Trailer is a **display milestone** — not a checkbox item
- Stage Right section covers Snake B; Stage Left covers Snake A
- Wireless section maps colors to channels 17–20
- Soundcheck section verifies all approved sources and monitor mixes

Source file: `data/audio/v2/sunday-setup.ts`

---

## Documentation Architecture

```
DocumentationDetailContent (slug router)
  ├── signal-flow → SignalFlowContent → SignalFlowVolunteerView
  ├── stage-plot  → StagePlotContent → StagePlotMap
  └── all others  → DocumentationPageView + content.ts
```

| Content type | Location |
|--------------|----------|
| Hub list | `data/audio/v2/documentation.ts` |
| Table/list pages | `data/audio/v2/documentation/content.ts` |
| Signal flow | `data/audio/v2/documentation/signal-flow.ts` |
| Stage plot | `data/audio/v2/stage-plot.ts` |
| Types | `data/audio/v2/documentation/types.ts`, `data/stage-plot/types.ts` |

Special pages bypass generic templates because layout exceeds tables.

---

## Troubleshooting Architecture

- Topics: `data/audio/v2/troubleshooting/topics.ts`
- Renders via `TroubleshootingGuideView`
- **Action-first presentation:** Things to Check before Signal Path (all departments)
- 8 approved topic slugs — see PRODUCTION_OS_STANDARDS.md
- Each topic links to equipment and documentation — never duplicates manual content

---

## Inventory Architecture

- v2 landing: `data/audio/v2/inventory.ts` — major equipment rows with links to Equipment categories/items
- Legacy assets: `data/audio/inventory.ts` (`VOA-ANT-AUD-###`) — used by legacy Production Mode only
- **Do not invent asset numbers or quantities** — use placeholders until verified
- Serial tracking, checkout, and asset detail pages: future version

---

## UI Rules

- Use `audioStyles.*` tokens — do not invent new color values per page
- `EquipmentSection` for all section headings
- `AudioSubpageHeader` for documentation/equipment subpages with back link
- `AudioPageShell` for hub pages with breadcrumbs
- Chevron on links **only** when href resolves to a valid destination
- Emoji from data via `SundaySetupSectionIcon`
- Min touch height 56px on interactive cards

---

## Naming Rules

- Slugs: kebab-case
- Stage sides: "Stage Left" / "Stage Right" (plain language: "left side when facing audience")
- Scene: "Sunday Scene"
- Department label: "Audio Department" (`voaLabels.audioDepartment`)
- Venue config: `data/audio/venue.ts` — note legacy Rio3224 references in `voaVenue.stageBoxes` are **not** v2 canonical (v2 uses Stage Snake A/B)

---

## Things Cursor MUST NOT Change Without Approval

### Never modify in a routine sprint

- [ ] Dashboard (`app/page.tsx`, `components/dashboard/`)
- [ ] Sunday Setup layout and section structure (`data/audio/v2/sunday-setup.ts`, setup components)
- [ ] Documentation routes (`app/audio/documentation/`)
- [ ] Equipment route structure
- [ ] Approved TF5 channels (see above)
- [ ] Approved TF5 outputs (see above)
- [ ] Stage snake input/output assignments
- [ ] Navigation sidebar structure (`data/navigation.ts`) without explicit request

### Never do

- [ ] Redesign the application shell or dark theme
- [ ] Create duplicate equipment manuals for alias slugs
- [ ] Invent routing, channels, or equipment specs — use placeholders
- [ ] Add horizontal scrolling on mobile
- [ ] Hardcode routing values in components (belongs in `data/`)
- [ ] Create isolated list-based Stage Plots or department maps that contradict the Master Church Blueprint (`data/blueprint/theater.ts`)
- [ ] Extend legacy v1 data (`data/audio/` without v2) with new features
- [ ] Push to remote without explicit user request
- [ ] Update git config
- [ ] Force push to main/master

### Always do

- [ ] Reuse existing v2 components before creating new ones
- [ ] Run `npm run build` before committing
- [ ] Match naming conventions in PRODUCTION_OS_STANDARDS.md
- [ ] Keep one page = one purpose
- [ ] Link to equipment manuals instead of duplicating content
- [ ] Preserve existing routes — add aliases if URLs must change
- [ ] Call `move_agent_to_root` before project-scoped work when starting from home directory
- [ ] Commit only when user explicitly requests — use message user provides
- [ ] Use placeholders for unfinalized information
- [ ] Reference `data/blueprint/theater.ts` when building or updating any physical map view

### Physical map rule (locked)

**Future physical maps must reference the shared Master Church Blueprint. Do not create isolated list-based Stage Plots or department maps that contradict `data/blueprint/theater.ts`.**

Department views (Audio Stage Plot, Lighting Plot, etc.) filter and present master blueprint data — they do not define independent equipment placement.

---

## Sprint Instruction Template

When starting a new sprint, the user will typically specify:

```
DO NOT modify: Dashboard, Sunday Setup, [other locked pages]
DO modify: [specific pages]
Run: npm run build
Commit: [message]
DO NOT PUSH
```

Treat unspecified pages as **locked** unless the sprint explicitly includes them.

---

## Key File Quick Reference

| Task | File |
|------|------|
| Add equipment manual | `data/audio/v2/equipment/items.ts` |
| Add equipment category | `data/audio/v2/equipment/categories.ts` |
| Add slug alias | `data/audio/v2/equipment/index.ts` |
| Add documentation page | `documentation.ts` + `content.ts` |
| Modify signal flow | `data/audio/v2/documentation/signal-flow.ts` |
| Modify stage plot | `data/audio/v2/stage-plot.ts` |
| Master Church Blueprint | `data/blueprint/theater.ts` |
| Blueprint preview | `/blueprint` (internal — not in sidebar nav) |
| Modify Sunday Setup | `data/audio/v2/sunday-setup.ts` ⚠️ approval required |
| Modify Lighting Sunday Setup | `data/lighting/v2/sunday-setup.ts` ⚠️ approval required |
| Add troubleshooting topic | `data/audio/v2/troubleshooting/topics.ts` |
| Add Lighting equipment | `data/lighting/v2/equipment/items.ts` ⚠️ approval required |
| Add Lighting documentation | `data/lighting/v2/documentation/` ⚠️ approval required |
| Modify Lighting plot / DMX docs | `data/lighting/v2/` + `data/blueprint/theater.ts` ⚠️ approval required |
| Venue labels | `data/audio/venue.ts` |
| Navigation | `data/navigation.ts` |
| UI tokens | `lib/audio-styles.ts` |

---

## Legacy vs v2 — Do Not Confuse

| Topic | v2 (use this) | Legacy v1 (do not extend) |
|-------|---------------|---------------------------|
| Stage boxes | Stage Snake A/B | Rio3224-D2 SB1/SB2 |
| FOH | QSC K12.2 direct | QSC GX5 → JBL SRX835P |
| Scenes | Sunday Scene | VOA Sunday Worship |
| Data path | `data/audio/v2/` | `data/audio/` |
| Setup storage | `sunday-setup-v2` | older keys |

---

## Document History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-08-06 | Initial Cursor context — Sprint 18 foundation |
| 1.1 | 2026-08-08 | **Lighting Department v1.0 — LOCKED** |

**Update this file** when locked decisions change, new departments launch, or major architecture shifts occur.
