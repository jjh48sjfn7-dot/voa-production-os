# Production OS Standards

**Purpose:** Define how Production OS is built — patterns, conventions, and the reasoning behind each rule.  
**Audience:** Engineers, Cursor AI agents, technical contributors  
**Companion documents:** [MASTER_PRODUCTION_BLUEPRINT.md](./MASTER_PRODUCTION_BLUEPRINT.md), [CURSOR_CONTEXT.md](./CURSOR_CONTEXT.md)

---

## Mission

Production OS gives church production volunteers **accurate, calm, mobile-first tools** for Sunday setup and troubleshooting — without requiring professional AV experience to navigate the app.

Every engineering decision should answer: *Does this help a volunteer succeed on Sunday morning?*

---

## Core Philosophy

| Principle | Why it exists |
|-----------|---------------|
| **One page = one purpose** | Volunteers should never wonder whether they are reading a setup checklist, a wiring diagram, or a manual. Mixing purposes increases errors under time pressure. |
| **Mobile-first** | Volunteers work on stage with phones in hand. Desktop is secondary. Touch targets, vertical layout, and no horizontal scrolling are non-negotiable. |
| **Data-driven content** | Equipment, documentation, and troubleshooting live in `data/` files — not hardcoded in components. Content updates should not require UI rewrites. |
| **Reuse over rebuild** | New pages compose existing components (`EquipmentSection`, `DocumentationInfoCard`, `SignalFlowNode`, etc.). Consistency builds trust. |
| **Plain language first** | Technical terms are preserved for accuracy but paired with plain-language helpers. Volunteers learn the vocabulary gradually. |
| **Placeholders over invention** | If information is not approved, mark it `[PLACEHOLDER]`. Never guess routing, channels, or equipment specs. |
| **Preserve routes** | URLs are bookmarks volunteers share. Changing routes breaks links in messages, printed guides, and muscle memory. |

---

## Navigation Standards

### Why

Predictable navigation reduces cognitive load. Volunteers open the same paths every Sunday.

### Rules

| Rule | Rationale |
|------|-----------|
| Sidebar shows department hubs only | Deep links belong inside each department, not in global nav |
| Breadcrumbs on detail pages | Volunteers need to know where they are and how to go back |
| Back links on subpages use explicit labels ("Back to Documentation") | Generic "back" is ambiguous on mobile |
| Legacy v1 routes remain reachable but are not promoted | Prevents breaking old bookmarks while steering new work to v2 |

### Approved v2 audio routes

| Hub | Route |
|-----|-------|
| Audio home | `/audio` |
| Sunday Setup | `/audio/setup` |
| Equipment | `/audio/equipment` |
| Documentation | `/audio/documentation` |
| Troubleshooting | `/audio/troubleshooting` |
| Inventory | `/audio/inventory` |

### Route naming

- Use **kebab-case** slugs: `/audio/troubleshooting/no-keyboard-audio`
- Hub pages are nouns; action pages are descriptive: `sunday-setup` → `/audio/setup`
- Equipment detail prefers `/audio/equipment/item/[slug]` as canonical

---

## Equipment Page Standards

### Why

Equipment manuals are the deepest reference layer. They must be scannable, complete, and consistent so any volunteer can find "how do I connect this?" in under 30 seconds.

### Required sections

Every equipment manual (`EquipmentDefinition` in `items.ts`) should include:

| Section | Purpose |
|---------|---------|
| Overview | What it is and why we have it |
| Setup steps | Ordered actions for Sunday |
| Specs | Key facts (model, connections, channels) |
| Connections | What plugs into what |
| Safety / notes | Power order, handling, approval gates |
| Common problems | Inline quick fixes |
| Related links | Troubleshooting guides, documentation |

### Rules

- **One manual per canonical slug** — use aliases, not duplicate pages.
- **Do not embed signal-flow diagrams** in equipment pages — link to Signal Flow documentation.
- **Emoji icons** in data are acceptable for visual scanning; do not replace with custom icon sets per page.
- **Approval gates** must be explicit: "Only Audio Leads should modify output routing."

### Category pages

Categories group equipment for browsing. A category page lists items; it does not duplicate manual content.

---

## Documentation Standards

### Why

Documentation answers **reference questions** ("What channel is snare on?") — not setup steps (Sunday Setup) or failures (Troubleshooting).

### Documentation types

| Type | Example | Route pattern |
|------|---------|---------------|
| Patch / reference tables | Input Patch List, TF5 Channel List | Standard `DocumentationPageView` |
| Routing reference | Output Routing | Standard view with tables |
| Conceptual guides | Signal Flow, Stage Plot | Dedicated components when layout exceeds tables |
| Standards / guides | Wiring Standards, Volunteer Guide | List sections |

### Rules

- **No duplicate documentation** — if content exists in an equipment manual, link to it.
- **Intro cards** on complex pages explain purpose in two sentences max.
- **Volunteer-facing tone** — documentation for `/audio/documentation/*` assumes minimal AV knowledge.
- **Blueprint docs** in `/docs/blueprint/` are **not** rendered in the app — they are engineering-only.
- **Special-case slugs** (`signal-flow`, `stage-plot`) render dedicated components via `DocumentationDetailContent` — do not force them into generic table templates.

### Content source of truth

| Content | File |
|---------|------|
| Documentation hub list | `data/audio/v2/documentation.ts` |
| Page content (tables, lists) | `data/audio/v2/documentation/content.ts` |
| Signal Flow | `data/audio/v2/documentation/signal-flow.ts` |
| Stage Plot | `data/audio/v2/stage-plot.ts` |
| Placeholders (unused at runtime for complete pages) | `data/audio/v2/documentation/placeholders.ts` |

---

## Troubleshooting Standards

### Why

Troubleshooting pages are used under stress — during soundcheck or mid-service. They must be short, ordered, and actionable.

### Required structure

Every troubleshooting topic includes:

| Field | Purpose |
|-------|---------|
| Problem statement | What the volunteer hears or sees |
| Signal path | Where in the chain to look (optional nodes) |
| Checks | Ordered checklist — most likely fix first |
| Related equipment | Links to manuals |
| Related documentation | Links to patch lists, routing, signal flow |

### Rules

- **Symptom-based titles** — "No Keyboard Audio", not "Channel 16 Troubleshooting"
- **One topic per failure mode** — do not combine keyboard and playback troubleshooting
- **Link, don't duplicate** equipment setup steps
- **8 approved topics** — add new topics only with Audio Lead approval

### Approved troubleshooting slugs

`no-keyboard-audio`, `no-wireless-microphone`, `no-drum-audio`, `no-foh-audio`, `no-stage-monitor`, `no-computer-playback`, `console-will-not-power-on`, `feedback`

---

## Sunday Setup Standards

### Why

Sunday Setup is the **only** setup checklist. Volunteers should not hunt through documentation for setup steps.

### Rules

| Rule | Rationale |
|------|-----------|
| **Do not redesign without explicit sprint approval** | Volunteers build muscle memory on layout and section order |
| Accordion sections with emoji headers | Quick visual scanning on mobile |
| Checkbox progress persists in localStorage | Volunteers can resume after interruptions |
| Storage key: `sunday-setup-v2` | Versioned key allows future migration |
| Group related items (INPUTS / OUTPUTS under stage sections) | Mirrors physical patching workflow |
| Milestone items (Unload Trailer) are display-only | Not part of checkbox progress |
| ~60 checklist items across 7 sections | Large enough to be complete; small enough to finish by soundcheck |

### Section order is fixed

1. Positioning  
2. Setup TF5  
3. Stage Right  
4. Stage Left  
5. Wireless Setup  
6. Soundcheck  
7. Service Ready  

Changing section order requires Audio Lead approval and a migration note.

---

## Inventory Standards

### Why

Inventory connects physical assets to digital reference. Incomplete inventory is acceptable; **invented** inventory is not.

### Current state

- v2 inventory landing exists with category sections.
- Full asset numbers (`VOA-ANT-AUD-###`) live in legacy data pending v2 migration.

### Rules

- Asset numbers follow `VOA-ANT-AUD-###` prefix.
- Do not add inventory items without physical verification.
- Inventory pages link to equipment manuals where slugs exist.
- Use placeholders for unassigned asset numbers.

---

## Naming Standards

### Why

Consistent naming prevents routing errors between documentation, console labels, and volunteer speech.

| Domain | Convention | Example |
|--------|------------|---------|
| File slugs | kebab-case | `stage-snake-a`, `no-drum-audio` |
| Data IDs | kebab-case or camelCase | `pos-drums`, `tf5-power` |
| Stage sides | Stage Left / Stage Right | Not "house left" |
| Console | Yamaha TF5 | Not "the board" in data |
| Scene | Sunday Scene | Not "VOA Sunday Worship" in v2 |
| Wireless | Color names | Purple, Yellow, Green, Blue |
| Storage keys | kebab-case with version | `sunday-setup-v2` |
| Components | PascalCase | `SignalFlowGroup`, `StagePlotMapPin` |
| v2 suffix on modules | `audio/v2/` | Distinguishes from legacy v1 |

### Display vs. canonical slugs

Category routes may expose legacy display slugs (`qsc-kw153-left`) that resolve to canonical equipment (`qsc-k12-2`). Always update `equipment/index.ts` aliases when renaming.

---

## UI Standards

### Why

Visual consistency signals that Production OS is one product — not a collection of one-off pages.

### Design tokens

Use shared tokens from `lib/audio-styles.ts` and `lib/ui-tokens.ts`:

| Token | Usage |
|-------|-------|
| `audioStyles.card` | Primary content surfaces |
| `audioStyles.cardPad` | Internal padding |
| `audioStyles.body` | Body text |
| `audioStyles.heading` | Section headings |
| `audioStyles.transition` | Interactive hover states |

### Layout rules

- Dark theme only — no light mode until explicitly scoped.
- Minimum touch target: **44–56px** height on interactive rows.
- Vertical stacking on mobile — no horizontal scroll.
- Section spacing: `space-y-8 sm:space-y-10` between major blocks.
- Dividers between repeated items: dashed `border-white/[0.08]`.

### Icons

- lucide-react for UI chrome (chevrons, navigation).
- Emoji in data for equipment and section identity — do not mix inconsistently on the same page.

### Typography hierarchy

1. Page title (subpage header or shell)  
2. Section title (`EquipmentSection`)  
3. Card title (semibold slate-50)  
4. Helper text (slate-400 / slate-500)  

---

## Component Reuse Standards

### Why

Every new bespoke component is debt. Reuse reduces bugs and keeps mobile behavior consistent.

### Preferred components

| Need | Component |
|------|-----------|
| Section wrapper | `EquipmentSection` / `SectionCard` |
| Info intro | `DocumentationInfoCard` / `InfoCard` |
| Equipment manual layout | `EquipmentDetailPage` |
| Documentation tables | `DocumentationTable` |
| Signal flow | `SignalFlowGroup`, `SignalFlowPath`, `SignalFlowNode` |
| Stage plot | `StagePlotMap`, `StagePlotMapPin` |
| Troubleshooting | `TroubleshootingGuideView` |
| Page shell with breadcrumbs | `AudioPageShell` |
| Subpage back navigation | `AudioSubpageHeader` |
| Related links list | Pattern from `SignalFlowRelatedLinks` |

### Before creating a new component

1. Search `components/audio/v2/` and `components/shared/`.
2. Can an existing component accept new data via props?
3. Can content move to `data/` instead of new UI?

If a new component is justified, place it under the relevant v2 folder and document it in CURSOR_CONTEXT.md.

---

## Versioning Philosophy

### Why

Production OS serves a live church service. Breaking changes on Sunday morning are unacceptable.

| Layer | Versioning approach |
|-------|---------------------|
| Application | `package.json` semver — currently `0.1.0` pre-1.0 |
| Content modules | v2 folder suffix — `data/audio/v2/`, `sunday-setup-v2` storage key |
| Routes | Never version in URL — migrate with aliases and redirects |
| Blueprint docs | Manual version table at document bottom |
| Legacy v1 | Preserved read-only until fully migrated — do not extend v1 with new features |

### Migration rules

- New features go to v2 paths only.
- When migrating content from v1 to v2, verify routing values against MASTER_PRODUCTION_BLUEPRINT.md.
- Deprecate v1 routes only after v2 parity is confirmed and Dashboard links are updated.

---

## Future Feature Rules

### Why

Scope control prevents half-finished departments and volunteer confusion.

### Before adding any feature, confirm:

- [ ] Which department owns it (audio, lighting, video, media)?
- [ ] Is there blueprint documentation or a placeholder section?
- [ ] Does it reuse existing page types and components?
- [ ] Does it have a single clear purpose (not setup + docs + troubleshooting combined)?
- [ ] Are routes additive (not breaking existing paths)?
- [ ] Has Audio Lead / Production Lead approved physical accuracy?

### Features that require explicit approval

| Feature | Approver |
|---------|----------|
| TF5 channel reassignment | Audio Lead |
| TF5 output routing change | Audio Lead |
| Open snake output assignment | Audio Lead (Daniel) |
| New equipment manual | Audio Lead |
| Dashboard redesign | Product / Production Lead |
| Sunday Setup restructure | Product / Audio Lead |
| New department module | Production Lead |
| Route removal or rename | Engineering + Production Lead |

### Anti-patterns — do not build

- Duplicate equipment manuals for alias slugs
- Engineering diagrams on volunteer setup pages
- Horizontal scrolling maps or tables on mobile
- Hardcoded routing values in components (belongs in `data/`)
- Invented placeholder equipment specs presented as final
- Auto-push commits from Cursor without human review

---

## Document History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-08-06 | Initial standards document |

**Review cadence:** When a new page type or component pattern is introduced
