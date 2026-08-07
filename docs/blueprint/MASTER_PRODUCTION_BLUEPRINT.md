# Master Production Blueprint

**Victory Outreach Antioch — East Antioch Campus**  
**Document type:** Permanent physical environment reference  
**Audience:** Product, engineering, leadership  
**Status:** Living document — v2 audio system approved; other departments placeholder

---

## Vision

Production OS exists to give every volunteer and production team member a **single, accurate, mobile-first reference** for Sunday setup and troubleshooting — without requiring AV expertise to navigate.

The physical blueprint documented here is the **ground truth** for what is installed, where it sits, and how signal moves through the building. Application content in `data/audio/v2/` must reflect this document. When reality changes, this document changes first.

Long-term vision:

- Unify **Audio**, **Lighting**, **Video**, and **Media** under one Production OS shell.
- Each department shares navigation patterns, equipment manuals, documentation, and Sunday workflows.
- Volunteers see only what they need; engineers and leads see the full blueprint.

---

## Church Information

| Field | Value |
|-------|-------|
| Church | Victory Outreach Antioch |
| Campus | East Antioch Campus |
| Address | 1800 Hillcrest Ave, Antioch, CA 94509 |
| Primary service | Sunday, 10:30 AM (`America/Los_Angeles`) |
| FOH location label | FOH — Center Screen |
| Trailer / unload | South parking lot — Bay 2 *(confirm bay numbering with facilities)* |

### Production roles *(reference — not HR authority)*

| Role | Responsibility |
|------|----------------|
| Audio Lead | Approves routing changes, scene recall, snake output assignments |
| FOH Engineer | Runs console during service, soundcheck, monitor mixes |
| Volunteer Team | Setup positioning, cable runs, basic troubleshooting |
| Production Lead *(future)* | Cross-department coordination |

---

## Theater Overview

The sanctuary/theater is a **single-room worship environment** with a raised stage, congregation seating facing the stage, and a **FOH position in the audience** (not a separate booth).

### Room characteristics *(placeholder — finalize with facilities)*

| Attribute | Status |
|-----------|--------|
| Approximate seating capacity | `[PLACEHOLDER — confirm with church leadership]` |
| Stage dimensions (W × D) | `[PLACEHOLDER — measure and document]` |
| Ceiling height at stage | `[PLACEHOLDER]` |
| Acoustic treatment | `[PLACEHOLDER — note panels, curtains, hard surfaces]` |
| HVAC noise impact on mics | `[PLACEHOLDER — note known noise periods]` |
| Power circuits at FOH | `[PLACEHOLDER — circuit IDs and load limits]` |
| Power circuits at stage | `[PLACEHOLDER]` |

### Primary sight lines

- Congregation faces **Center Stage**.
- **Projector / center screen** is upstage or above stage *(video department to confirm)*.
- **FOH** operates from the audience area with line-of-sight to stage and congregation.

---

## Production Zones

Production OS divides the physical environment into zones. Each zone maps to documentation, setup checklists, and future inventory tracking.

| Zone ID | Name | Description |
|---------|------|-------------|
| `stage-left` | Stage Left | Left side of stage when facing the audience. Drum position. Stage Snake A. Left monitor. |
| `center-stage` | Center Stage | Drum kit primary position. |
| `stage-right` | Stage Right | Right side of stage when facing the audience. Keyboard position. Stage Snake B. Right monitor. |
| `front-of-stage` | Front of Stage | Downstage edge. FOH L/R speakers. Subwoofer *(placement placeholder)*. |
| `foh` | FOH Position | In the audience. Console, playback computer, wireless receivers. |
| `audio-closet` | Audio Closet | Off-stage storage for cases, DI drawer, cable bins. |
| `trailer` | Unload / Trailer | South parking lot — equipment arrives from transport cases. |
| `video` | Video Zone | `[PLACEHOLDER — switcher, cameras, projection]` |
| `lighting` | Lighting Zone | `[PLACEHOLDER — dimmers, fixtures, control]` |
| `media` | Media Zone | ProPresenter machine, confidence monitor *(overlap with FOH playback)* |

---

## Physical Stage Layout

Top-down reference (audience at bottom):

```
                    BACK OF STAGE
    ┌─────────────────────────────────────────┐
    │  STAGE LEFT      CENTER        STAGE RIGHT │
    │  Snake A         Drums         Keyboard    │
    │  L Monitor                     Snake B     │
    │                                R Monitor   │
    ├─────────────────────────────────────────┤
    │  FOH L        Subwoofer         FOH R     │  ← Front of Stage
    └─────────────────────────────────────────┘
                    ↓ AUDIENCE ↓
    ┌─────────────────────────────────────────┐
    │  FOH POSITION: Mac · TF5 · Wireless     │
    └─────────────────────────────────────────┘
```

### Positioning rules

- **Drum kit:** Center Stage. All drum mics patch through **Stage Snake A** inputs 1–6.
- **Keyboard:** Stage Right. Patches to **Stage Snake B Input 1**.
- **Stage Snake A:** Stage Left. Must remain at drum position during Sunday setup.
- **Stage Snake B:** Stage Right. Must remain at keyboard position during Sunday setup.
- **FOH speakers (QSC K12.2):** Front-left and front-right of stage, aimed at congregation.
- **Stage monitors (QSC K10.2):** On stage left and stage right wedges.
- **Subwoofer:** Front of stage — **exact placement placeholder** until finalized.
- **Behringer PM1 (drummer in-ear):** At drum kit; fed from Stage Snake A Output 3.

Volunteer-facing stage plot: `/audio/documentation/stage-plot`

---

## Audio Blueprint

### System summary

| Layer | Equipment | Role |
|-------|-----------|------|
| Console | Yamaha TF5 | FOH mixing, scene recall, routing |
| Stage I/O | Stage Snake A, Stage Snake B | Analog stage inputs/outputs to FOH |
| Playback | Mac Desktop (ProPresenter / audio) | TF5 local inputs 31–32 |
| Wireless | Shure BLX288 (dual receivers) | Four color-coded handheld mics → TF5 local inputs 17–20 |
| FOH | QSC K12.2 × 2 | Left/right house speakers |
| Monitors | QSC K10.2 × 2 | Left/right stage wedges |
| Drummer IEM | Behringer PM1 | Personal monitor from TF5 Output 3 |
| Subwoofer | Subwoofer *(model TBD)* | TF5 Output 6 — routing placeholder |
| Keys | Keyboard | Stage Snake B Input 1 → TF5 Channel 16 |

### Approved console

**Yamaha TF5** — located at FOH rack. Runs the **Sunday Scene** for weekly services.

| Setting | Value |
|---------|-------|
| Primary scene | Sunday Scene |
| Who may edit routing | Audio Lead only |
| Local inputs used | 17–20 (wireless), 31–32 (playback) |
| Stage inputs used | Via Stage Snakes A and B |

### Stage Snake A — Stage Left

**Location:** Stage Left (drum position)

**Inputs:**

| Input | Source | TF5 Channel |
|-------|--------|-------------|
| 1 | Kick | 28 |
| 2 | Snare | 25 |
| 3 | Toms | 26 |
| 4 | Floor Tom | 27 |
| 5 | Overhead Left | 29 |
| 6 | Overhead Right | 30 |

**Outputs:**

| Output | Destination | TF5 Output |
|--------|-------------|------------|
| 1 | Left FOH Speaker | 15 |
| 2 | Left Stage Monitor | 4 |
| 3 | Drummer In-Ear (PM1) | 3 |
| 4 | **OPEN** — requires Audio Lead approval before use | — |

### Stage Snake B — Stage Right

**Location:** Stage Right (keyboard position)

**Inputs:**

| Input | Source | TF5 Channel |
|-------|--------|-------------|
| 1 | Keyboard | 16 |
| 2–6 | Available / reserved | — |

**Outputs:**

| Output | Destination | TF5 Output |
|--------|-------------|------------|
| 1 | Right FOH Speaker | 16 |
| 2 | Right Stage Monitor | 5 |
| 3 | **OPEN** — requires Audio Lead approval | — |
| 4 | **OPEN** — requires Audio Lead approval | — |

### TF5 channel map (approved)

| Channel | Assignment | Source |
|---------|------------|--------|
| 1–15 | Available | — |
| 16 | Keys | Stage Snake B Input 1 |
| 17 | Purple Wireless | TF5 Local Input 17 |
| 18 | Yellow Wireless | TF5 Local Input 18 |
| 19 | Green Wireless | TF5 Local Input 19 |
| 20 | Blue Wireless | TF5 Local Input 20 |
| 21–24 | Available | — |
| 25 | Snare | Stage Snake A Input 2 |
| 26 | Toms | Stage Snake A Input 3 |
| 27 | Floor Tom | Stage Snake A Input 4 |
| 28 | Kick | Stage Snake A Input 1 |
| 29 | OH Left | Stage Snake A Input 5 |
| 30 | OH Right | Stage Snake A Input 6 |
| 31 | Computer Left | TF5 Local Input 31 |
| 32 | Computer Right | TF5 Local Input 32 |

**Wireless color roles:**

| Color | Channel | Typical role |
|-------|---------|--------------|
| Purple | 17 | Pastor / primary speaker |
| Yellow | 18 | Worship leader |
| Green | 19 | Wireless 3 |
| Blue | 20 | Wireless 4 |

### TF5 output map (approved)

| TF5 Output | Mix | Destination | Physical path |
|------------|-----|-------------|---------------|
| 3 | Drummer Monitor | Behringer PM1 | Stage Snake A Output 3 |
| 4 | Left Monitor Mix | QSC K10.2 Left | Stage Snake A Output 2 |
| 5 | Right Monitor Mix | QSC K10.2 Right | Stage Snake B Output 2 |
| 6 | Subwoofer | Subwoofer | **Placeholder — direct path TBD** |
| 15 | Main L | QSC K12.2 Left | Stage Snake A Output 1 |
| 16 | Main R | QSC K12.2 Right | Stage Snake B Output 1 |

**Critical rule:** TF5 output numbers do not have to match physical snake output numbers. Always verify in the console before service.

### Signal flow summary

Volunteer documentation: `/audio/documentation/signal-flow`

| Source | Path to congregation |
|--------|---------------------|
| Keyboard | Snake B In 1 → Ch 16 → Main L/R → Out 15/16 → K12.2 |
| Wireless (×4) | BLX288 → Local In 17–20 → Main L/R → Out 15/16 → K12.2 |
| Drums (×6) | Snake A In 1–6 → Ch 25–30 → Main L/R → Out 15/16 → K12.2 |
| Playback | Local In 31–32 → Ch 31–32 → Main L/R → Out 15/16 → K12.2 |
| Monitors | Separate monitor mixes → Out 3/4/5 → snakes → PM1 / K10.2 |

### Approved inventory (audio assets)

Asset prefix: `VOA-ANT-AUD-###`

| Asset | Item | Qty | Location |
|-------|------|-----|----------|
| VOA-ANT-AUD-060 | Yamaha TF5 Console | 1 | FOH Rack |
| VOA-ANT-AUD-030 | Stage Snake A | 1 | Stage Left |
| VOA-ANT-AUD-031 | Stage Snake B | 1 | Stage Right |
| VOA-ANT-AUD-070 | QSC K12.2 (FOH L/R) | 2 | FOH — Center Screen area |
| VOA-ANT-AUD-071 | QSC K10.2 (Monitors L/R) | 2 | Stage |
| VOA-ANT-AUD-072 | Subwoofer | 1 | FOH — Center *(placement TBD)* |
| VOA-ANT-AUD-073 | Behringer PM1 | 1 | Stage Left — Drum kit |
| VOA-ANT-AUD-004 | Shure BLX288 Dual Receiver | 2 | FOH Rack — Wireless |
| VOA-ANT-AUD-001–003 | Wired mics (SM58, SM57, Beta 52A) | various | Closet / stage |
| VOA-ANT-AUD-010–011 | DI boxes | various | Audio Closet |
| VOA-ANT-AUD-020–022 | Cables | various | Cable bins / FOH rack |

Playback computer asset number: `[PLACEHOLDER — assign VOA-ANT-AUD-###]`

---

## Lighting Blueprint

**Status:** `[PLACEHOLDER — not yet documented in Production OS]`

| Item | Status |
|------|--------|
| Lighting console | `[PLACEHOLDER]` |
| Dimmer rack location | `[PLACEHOLDER]` |
| Fixture inventory | `[PLACEHOLDER]` |
| DMX universe map | `[PLACEHOLDER]` |
| Sunday lighting scene | `[PLACEHOLDER]` |
| Power distro for lighting | `[PLACEHOLDER]` |

When lighting is onboarded, add a `data/lighting/v2/` module mirroring the audio architecture.

---

## Video Blueprint

**Status:** `[PLACEHOLDER — not yet documented in Production OS]`

| Item | Status |
|------|--------|
| Projector / LED wall | `[PLACEHOLDER]` |
| Switcher | `[PLACEHOLDER]` |
| Camera positions | `[PLACEHOLDER]` |
| Streaming encoder | `[PLACEHOLDER]` |
| Confidence monitor at FOH | `[PLACEHOLDER — note overlap with media]` |
| Cable paths video ↔ FOH | `[PLACEHOLDER]` |

---

## Media Blueprint

**Status:** Partial — playback covered under Audio

| Item | Approved value |
|------|----------------|
| Playback computer | Mac Desktop at FOH |
| Software | ProPresenter + audio playback |
| Console inputs | TF5 Local Inputs 31–32 (Computer L/R) |
| Confidence monitor | `[PLACEHOLDER — location and signal path]` |
| Streaming record | USB record on Yamaha TF5 *(confirm workflow)* |
| Lyrics vs announcement routing | `[PLACEHOLDER — media team to document]` |

---

## Power Blueprint

**Status:** `[PLACEHOLDER — requires facilities documentation]`

| Circuit / zone | Equipment | Notes |
|----------------|-----------|-------|
| FOH rack | TF5, wireless receivers, playback Mac | `[PLACEHOLDER — circuit ID, breaker]` |
| FOH speakers | QSC K12.2 × 2, subwoofer | Power on **after** line check |
| Stage monitors | QSC K10.2 × 2 | `[PLACEHOLDER]` |
| Stage snakes | Stage Snake A, Stage Snake B | `[PLACEHOLDER]` |
| Power-up order | Console → snakes → sources → amplifiers last | Enforced in Sunday Setup |
| Power-down order | Amplifiers first → console last | `[PLACEHOLDER — document in teardown checklist]` |

---

## Cable Routing

### Approved audio cable paths

| Path | Cable type | Notes |
|------|------------|-------|
| Drum mics → Snake A | XLR | Inputs 1–6 fixed assignment |
| Keyboard → Snake B | XLR | Input 1 fixed assignment |
| Wireless receivers → TF5 | Color-coded XLR | Purple/Yellow/Green/Blue → Local In 17–20 |
| Playback Mac → TF5 | Stereo pair | Local In 31–32 |
| TF5 Out 15 → Snake A Out 1 → K12.2 L | Speaker cable | Left FOH |
| TF5 Out 16 → Snake B Out 1 → K12.2 R | Speaker cable | Right FOH |
| TF5 Out 4 → Snake A Out 2 → K10.2 L | Speaker cable | Left monitor |
| TF5 Out 5 → Snake B Out 2 → K10.2 R | Speaker cable | Right monitor |
| TF5 Out 3 → Snake A Out 3 → PM1 | `[PLACEHOLDER — cable type]` | Drummer IEM |
| TF5 Out 6 → Subwoofer | `[PLACEHOLDER]` | Routing not finalized |

### Cable labeling standards

- Wireless XLR cables are **color-coded** to match TF5 wireless channels.
- Stage snake fanouts are labeled at FOH end and stage end.
- `[PLACEHOLDER — document label maker standard and color codes for non-wireless runs]`

### Cable storage

| Location | Contents |
|----------|----------|
| Cable Bin — Green | XLR 25ft (VOA-ANT-AUD-020) |
| Cable Bin — Blue | XLR 50ft (VOA-ANT-AUD-021) |
| FOH Rack | Speaker cable NL4 50ft (VOA-ANT-AUD-022) |
| FOH Drawer | Spike tape, batteries |

---

## Volunteer Workflow

Production OS supports volunteers through **guided workflows**, not engineering diagrams.

| Workflow | Route | Purpose |
|----------|-------|---------|
| Sunday Setup | `/audio/setup` | Step-by-step checklist for Sunday morning |
| Equipment manuals | `/audio/equipment` | How each piece of gear works |
| Documentation | `/audio/documentation` | Patch lists, routing, signal flow, stage plot |
| Troubleshooting | `/audio/troubleshooting` | Symptom-based guides when something fails |

### Volunteer principles

- One page = one purpose (setup vs. reference vs. troubleshooting).
- Plain language first; technical terms as secondary labels.
- Large touch targets; mobile-first layout.
- Link to equipment manuals — never duplicate them inside documentation.

### What volunteers should NOT do

- [ ] Change TF5 output routing without Audio Lead approval
- [ ] Repurpose open snake outputs (Snake A Out 4, Snake B Out 3/4) without approval
- [ ] Recall or save console scenes without Audio Lead direction
- [ ] Repatch drum or keyboard inputs to different snake channels

---

## Sunday Timeline

Reference schedule for production teams *(adjust per actual call times)*:

| Time | Event | Primary team |
|------|-------|--------------|
| 8:00 AM | Volunteer Team arrival | All production volunteers |
| 8:00–9:00 AM | Unload trailer, positioning | Audio + `[PLACEHOLDER — other depts]` |
| 9:00 AM | Worship Team arrival | Worship / band |
| 9:00–10:15 AM | Line check, soundcheck | Audio FOH |
| 10:15 AM | Pre-service / doors | `[PLACEHOLDER]` |
| 10:30 AM | Service live | All teams |
| Post-service | Teardown, cable wrap, scene save | Audio volunteers |

Sunday Setup checklist sections map to this timeline:

1. **Positioning** — before line check  
2. **Setup TF5** — console power and routing verification  
3. **Stage Left / Stage Right** — snake patching  
4. **Wireless Setup** — receiver and color XLR connections  
5. **Soundcheck** — all sources and monitors  
6. **Service Ready** — final verification before doors  

---

## Equipment Database Structure

Production OS stores equipment as **data-driven definitions**, not hardcoded pages.

### Canonical paths

```
data/audio/v2/equipment/
  categories.ts      → Equipment categories and routes
  items.ts           → Full equipment definitions (manuals)
  accessories.ts     → Accessory items
  index.ts           → Slug resolution, href helpers
```

### Equipment definition fields

| Field | Purpose |
|-------|---------|
| `slug` | Canonical URL identifier (kebab-case) |
| `name` | Display name |
| `categoryId` | Parent category |
| `overview` | What it is |
| `setupSteps` | How to set it up |
| `specs` | Key specifications |
| `connections` | What connects to what |
| `commonProblems` | Inline troubleshooting |
| `relatedLinks` | Cross-links to docs and troubleshooting |

### Slug alias system

Category routes may use display slugs (e.g., `shure-blx-dual-receiver-1`) that resolve to canonical definitions (e.g., `shure-blx-receiver`). This preserves URL stability while consolidating duplicate manuals.

### Inventory *(future)*

`data/audio/v2/inventory.ts` provides category landing sections. Full asset tracking with `VOA-ANT-AUD-###` numbers lives in legacy `data/audio/inventory.ts` and will migrate to v2 in a future sprint.

---

## Future Expansion

### Near-term (Audio)

- [ ] Finalize subwoofer placement and Output 6 routing
- [ ] Assign asset number to playback computer
- [ ] Complete v2 inventory with asset detail pages
- [ ] Document power circuits in Power Blueprint
- [ ] Teardown checklist in Sunday Setup

### Medium-term (Production OS)

- [ ] Lighting department module (`data/lighting/v2/`)
- [ ] Video department module
- [ ] Media department module (beyond playback overlap)
- [ ] Cross-department Sunday timeline on Dashboard
- [ ] Role-based views (volunteer vs. lead)

### Long-term

- [ ] Multi-campus support with campus-specific blueprint overrides
- [ ] Scene version control and change log for TF5
- [ ] Integration with physical label printing for cable management
- [ ] Offline/PWA support for sanctuary dead zones

---

## Document History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-08-06 | Initial foundation document — v2 audio system approved |

**Owner:** Production OS / Audio Department  
**Review cadence:** After every major audio QA sprint or physical equipment change
