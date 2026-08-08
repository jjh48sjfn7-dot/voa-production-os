# Venue Reference Audit

**Victory Outreach Antioch — East Antioch Campus**  
**Document type:** Analysis-only reference audit  
**Date:** 2026-08-07  
**Last updated:** 2026-08-08 (final venue ground-truth check)  
**Status:** Owner ground truth complete for Sunday spatial layout — **READY FOR BLUEPRINT REBUILD** (see §12). Application not yet updated.

---

## Purpose

This document bridges the raw reference library (`/docs/reference/`) and the Production Blueprint (`/blueprint`, `data/blueprint/theater.ts`). It records what the references actually show, how that compares to the current application model, and what remains unknown.

**Reference priority (approved order):**

1. `/docs/truth/` — authoritative facts *(intended; directory not yet populated)*
2. **Direct owner confirmations** — locked corrections in § Owner Confirmations below
3. Real venue / Sunday setup photos — authoritative visual evidence
4. Approved Production OS blueprint data (`data/blueprint/theater.ts`)
5. Existing VOA technical diagrams — supporting documentation
6. Inspiration/reference diagrams — visual design inspiration only

Inspiration images must **not** override real-world setup information or owner confirmations.

---

## Critical Note: `/docs/truth/` Status

**The `/docs/truth/` directory does not exist in the repository at audit time.**

Until truth files are added, the following were treated as authoritative substitutes:

| Source | Path | Role in this audit |
|--------|------|--------------------|
| Master Production Blueprint | `docs/blueprint/MASTER_PRODUCTION_BLUEPRINT.md` | Approved routing, zones, equipment assignments |
| Cursor Context | `docs/blueprint/CURSOR_CONTEXT.md` | Locked decisions |
| Master blueprint data | `data/blueprint/theater.ts` | Current map positions and items |
| Audio stage plot data | `data/audio/v2/stage-plot.ts` | Approved zone assignments (audio view) |

When `/docs/truth/` is populated, truth files take priority over all other sources except where owner confirmations explicitly override pending truth drafts.

---

## Owner Confirmations (Approved Ground Truth)

**Source:** Owner corrections — 2026-08-07 through 2026-08-08  
**Application status:** Recorded here only. **`theater.ts`, `/blueprint`, Audio pages, routing, and Sunday Setup not modified yet.**

### Locked placement corrections

| Item | Approved truth | Current blueprint issue |
|------|----------------|-------------------------|
| **Drum kit** | **Stage Left** | Incorrectly at Center Stage — must move Stage Left in future blueprint work |
| **Stage Snake A** | Stage Left — **physically to the LEFT of the drum kit** | Zone correct; place adjacent to drums on blueprint |
| **Stage Snake B** | Stage Right — **physically to the RIGHT of the keyboard** | Zone correct; place adjacent to keyboard on blueprint |
| **Keyboard** | Stage Right | Confirmed correct |
| **QSC K12.2 FOH L/R** | **On stage floor/platform** at left and right sides | Currently shown at downstage front corners — incorrect geometry |
| **QSC K10.2 monitors** | **Two monitors only** — **Center-Left** and **Center-Right** (inward from far stage edges; toward central performance area). **No dedicated center-stage monitor.** Not at extreme left/right edges; not stacked/overlapping at center. Blueprint clarity positions — not exact measured coordinates. |
| **Behringer PM1** | Drummer's personal monitor — **visually associated with drum kit** (Stage Left); worn clipped to drummer or at/beside kit when not worn; **not** an isolated floor pin; maintains **Stage Snake A** relationship | **Missing from blueprint** — must be added as drum-kit accessory item |

### Display / media

| Item | Approved truth |
|------|----------------|
| **Portable Projection Screen** | Keep this label and role. Part of Sunday production setup. Do **not** reinterpret as a permanent LED wall unless future references explicitly confirm. |
| **Projector** | Used for Sunday production. **Mounted overhead between TR-5 and TR-6** on the **front/downstage overhead lighting structure** — **not** on the upstage floor or rear/upstage truss. |

### FOH production area

| Item | Approved truth |
|------|----------------|
| **FOH position** | **Not center-mid audience.** Located along the **RIGHT SIDE of the audience when facing the stage** (house right). Sits on the **raised side platform/walkway** beside the fixed seating, approximately **middle-to-rear** in the audience area. Yamaha TF5, Mac, and associated production equipment are set up at this **side FOH position**. |
| **What FOH is not** | **Not** a permanent booth. **Not** a table positioned in the **center of the seating**. Do not use the lighting diagram rear-right table or prior center-mid audience interpretation. |
| **Visual evidence** | Use real venue photos for platform, seating relationship, and approximate FOH location. **Do not infer exact dimensions** from photos. |
| **FOH desk layout** | **Confirmed (2026-08-07):** TF5 on FOH table; Mac Desktop beside TF5; Shure BLX288 receivers on table **directly beside TF5 and behind the Mac** (Mac in front partially/mostly obscures receivers in reference photo — **do not interpret as missing**). |
| **Confidence monitor** | **Confirmed (2026-08-07):** Large display on **rolling floor stand** immediately **to the right of the Mac Desktop** at FOH — **not on the FOH table**. Represent as **its own physical item**, not grouped into the Mac. See § Confidence monitor position. |
| **Lighting control** | **Mac desktop runs Lightkey.** Same production computer environment supports ProPresenter/media. Do **not** invent a separate lighting console. Keep Lighting Control tied to Mac / Lightkey. |

### Still placeholder / not finalized

| Item | Status |
|------|--------|
| **Subwoofer** | Placeholder / TBD — no exact model or physical location. TF5 Output 6 routing **not finalized**. Safe to show as dashed placeholder on rebuild. |

### Confirmed Sunday setup — consolidated ground truth (final check 2026-08-08)

Single reference for the **owner-confirmed physical Sunday production layout**. Use this as the rebuild target; individual confirmation subsections below remain the detailed record.

| Area | Confirmed Sunday truth |
|------|------------------------|
| **Room geometry** | Hybrid architectural plot: curved stage apron, tiered curved seating, aisles, back curtain, **both-side stage stairs**, house-right raised side platform/walkway, front/downstage overhead truss (TR-1–TR-6). **Do not show** mounted/flown speakers from venue photos. |
| **Stage Left** | **Drum kit**; **Stage Snake A** to the **left of drums**; **Behringer PM1** as drum-kit accessory (worn or at/beside kit; Snake A association); **QSC K10.2** at **Center-Left** |
| **Center Stage** | One shared **`Center Mic`** position (not separate Pastor + Worship Leader items); **Portable Projection Screen** during service |
| **Stage Right** | **Keyboard (MODX8)**; **Stage Snake B** to the **right of keyboard**; **QSC K10.2** at **Center-Right** |
| **Front / overhead** | **Projector** overhead on front/downstage truss **between TR-5 and TR-6** — not floor upstage, not rear truss |
| **House audio (Sunday)** | Portable **QSC K12.2 L/R** on **stage platform** at left/right sides — not audience-floor downstage corners; **two K10.2 wedges only** (Center-Left / Center-Right); **subwoofer TBD** |
| **FOH (house right)** | Raised side platform/walkway, middle-to-rear depth — **not** center seating, **not** permanent booth. **TF5** on table; **Mac** beside TF5; **BLX288** beside TF5 and **behind Mac**; **confidence monitor** on rolling stand **right of Mac** (own item); **lighting via Mac / Lightkey** — no separate lighting console |
| **Excluded from map** | All permanent/flown speakers visible in reference photos |

**Photo policy:** Owner confirmations override camera perspective and lighting-diagram geometry where they conflict.

### Stage monitors (owner confirmation — 2026-08-07)

| Item | Approved truth |
|------|----------------|
| **Count** | **Two** QSC K10.2 stage monitors only |
| **Center-stage wedge** | **Does not exist** |
| **Left monitor** | **Center-Left** — toward central performance area, not extreme stage-left edge |
| **Right monitor** | **Center-Right** — toward central performance area, not extreme stage-right edge |
| **Do not** | Place at far left/right edges; stack or overlap at geometric center; add a third center monitor |
| **Intent** | Visually communicate a **left/right monitor pair** flanking the central performance area — for **blueprint clarity**, not exact measured coordinates |
| **Photo note** | `complete-setup-01.HEIC` perspective can exaggerate center appearance — **owner blueprint positions override far-edge inference** |

### Stage monitor blueprint position (owner confirmation — 2026-08-08)

| Item | Approved truth |
|------|----------------|
| **Blueprint adjustment** | Move both K10.2 monitors **visibly inward** from current far-edge pins (~12% / ~88%) |
| **Left QSC K10.2** | **CENTER-LEFT** |
| **Right QSC K10.2** | **CENTER-RIGHT** |
| **Spacing rule** | Separate left/right pair toward center — **not** edge-mounted; **not** stacked at center |

### FOH position (owner confirmation — 2026-08-07)

| Item | Approved truth |
|------|----------------|
| **Location** | **Right side of audience** when facing the stage (house right) |
| **Platform** | **Raised side platform/walkway** beside fixed seating — not in the seating bowl center |
| **Depth** | Approximately **middle-to-rear** in the audience area |
| **Equipment** | Yamaha TF5, Mac, Shure BLX288 receivers, confidence monitor, and associated production gear at this side position |
| **Not FOH** | Center-mid audience tables, permanent rear booth, lighting-diagram rear-right table as primary FOH representation |
| **Dimensions** | Do **not** infer exact dimensions from photos — approximate placement only |

### Pastor / Worship Leader position (owner confirmation — 2026-08-07)

| Item | Approved truth |
|------|----------------|
| **Map label** | **`Center Mic`** |
| **Physical positions** | **One** shared center-stage position — **not** two separate permanent positions |
| **Do not show** | Separate Pastor and Worship Leader positions side-by-side on the Production Blueprint |
| **Usage** | Shared by Pastor, Worship Leader, speaker, or other ministry roles depending on the service moment |
| **Future blueprint** | Replace current dual mic-stand items (`Pastor` + `Worship Lead`) with **one** item: **`Center Mic`** |

### FOH equipment positioning (owner confirmation — 2026-08-07)

| Item | Approved truth |
|------|----------------|
| **Yamaha TF5** | Sits **on the FOH table** |
| **Mac Desktop** | Sits **beside the TF5** |
| **Shure BLX288 receivers** | Also on the FOH table — positioned **directly beside the TF5** and **behind the Mac Desktop** |
| **Photo obscuring** | Because the Mac is physically **in front of** the wireless receivers, they are **partially/mostly hidden** in the FOH reference photo |
| **Do not infer** | Receivers are **not missing** — obscured by Mac placement |
| **Reference photo** | Owner-marked reference: `docs/reference/venue/audience-overview copy.png` — **red-circled area** indicates approximate wireless receiver location on house-right side platform |
| **Priority** | **Owner-confirmed placement overrides** what can be visually inferred from the photograph alone |

### Projector / TR truss location (owner confirmation — 2026-08-07)

| Item | Approved truth |
|------|----------------|
| **TR-1 through TR-6** | Located **above the front / downstage edge** of the stage — the overhead lighting structure visible from audience and side-stage reference photos |
| **Do not interpret** | TR-1–TR-6 as a **rear/upstage truss** near the back curtain |
| **Lighting diagram note** | The VOA Lighting System Map may depict fixtures differently — **owner confirmation and venue photos override diagram geometry** for TR truss location |
| **Projector mount** | **Overhead between TR-5 and TR-6** on/at this **front-stage overhead structure** |
| **Future blueprint** | Projector appears **overhead near the front/downstage stage boundary** — **not** on the upstage floor |
| **Visual evidence** | Front/downstage overhead structure confirmed in `empty-stage-center.jpg`, `empty-stage-left.jpg`, `empty-stage-right.jpg`, and `complete-setup-01.HEIC`; owner-provided side-angle venue photo cited as additional confirmation *(index in `/docs/reference/venue/` when filed)* |

### Confidence monitor position (owner confirmation — 2026-08-07)

| Item | Approved truth |
|------|----------------|
| **Identity** | The **large display on a rolling stand immediately to the right of the Mac Desktop** is the **Confidence Monitor** |
| **Location** | **FOH** — house-right side platform |
| **Mounting** | **Not on the FOH table** — on its **own rolling floor stand** beside the FOH table |
| **Orientation** | When facing the stage from FOH, positioned **to the right of the Mac Desktop** |
| **Future blueprint** | Represent as **its own physical item** — **do not** group into the Mac Desktop item |
| **Reference photo** | `docs/reference/venue/audience-overview copy.png` — visual confirmation of rolling stand placement beside FOH table, right of Mac |

### Stage access stairs (owner confirmation — 2026-08-08)

| Item | Approved truth |
|------|----------------|
| **Stage Left** | **Stairs** — permanent architectural landmark |
| **Stage Right** | **Stairs** — permanent architectural landmark |
| **Both sides** | Stage has access stairs on **both** stage-left and stage-right |
| **Future blueprint** | Represent **both** stair sets as **permanent venue landmarks** — not portable Sunday production equipment |
| **Resolves** | Prior uncertainty whether access exists on both sides |

### Permanent / flown speakers (owner confirmation — 2026-08-08)

| Item | Approved truth |
|------|----------------|
| **Policy** | **Disregard all** permanently mounted or flown speakers visible in venue reference photos |
| **Do NOT** | Include mounted speakers; include flown speakers; treat as Sunday audio system; show as active Audio equipment; create equipment items; use in Sunday signal-flow interpretation |
| **Sunday FOH** | Approved system = **portable QSC K12.2 left/right** setup only |
| **Reference photos** | Permanent/flown speakers may appear in photos — **ignore for Production Blueprint** |
| **Future blueprint** | Do **not** depict permanent or flown speakers on the map |

### Stage snake positions (owner confirmation — 2026-08-08)

| Item | Approved truth |
|------|----------------|
| **Stage Snake A** | **Stage Left** — physically positioned **to the LEFT of the drum kit** |
| **Stage Snake B** | **Stage Right** — physically positioned **to the RIGHT of the keyboard** |
| **Blueprint spacing** | Place snake boxes **close enough** to drums (Snake A) and keyboard (Snake B) that the physical relationship is **visually clear** |
| **Photo note** | Do **not** infer different positions from camera perspective in reference photos — **owner placement overrides photo inference** |

### Behringer PM1 position (owner confirmation — 2026-08-08)

| Item | Approved truth |
|------|----------------|
| **Role** | Part of the **drummer's monitoring system** — personal in-ear/beltpack monitor |
| **During service** | **Clipped to / worn by the drummer** |
| **When not worn** | Remains **at or beside the drum kit** |
| **Stage association** | **Stage Left** drum position |
| **Not** | A permanently fixed floor-position item; an isolated map pin separate from drums |
| **Blueprint representation** | Associate **visually with the Drum Kit** — smaller accessory **attached to or beside** the drum position |
| **Interaction** | Remain **identifiable and tappable** as the drummer's personal monitoring device |
| **Signal relationship** | Maintain association with **Stage Snake A** |

### Room representation (future blueprint)

| Decision | Approved |
|----------|----------|
| **Stage shape** | Adopt curved stage apron, real stage geometry, tiered/curved audience seating, aisle structure |
| **Visual style** | Hybrid architectural stage plot (not simplified rectangle) |
| **Permanent vs portable** | Show permanent **architectural** landmarks (truss, stairs, curtain, seating, aisles) — **exclude all mounted/flown speakers**. Portable Sunday production equipment visually distinct from architecture. |

---

## 1 — Reference Inventory

**Total reference image files inspected:** 14  
**Supporting text files in reference library:** 1 (`equipment/README.md`)  
**Diagram files:** 1  
**Sunday setup photos:** 1 (HEIC — inspected via temporary conversion; original preserved)

---

### VENUE

#### Full room

| File | Observed information |
|------|---------------------|
| `venue/audience-overview.png` | Composite of four views. Shows tiered curved seating (teal upholstery), central and side aisles, low black railing around a mid-room technical area, rear wall with double doors and two square interior windows (possible permanent booth), drop ceiling with square LED panels. |
| `venue/audience-overview copy.png` | Stage-view / FOH reference photo. **Owner red circle** marks approximate BLX288 location. **Large display on rolling stand immediately right of Mac Desktop = Confidence Monitor** (owner confirmed) — not on FOH table. TF5 and Mac on FOH table; receivers behind Mac, partially obscured. |
| `venue/empty-stage-center.jpg` | Wide view from rear-center audience. Curved stage apron; front/downstage truss (TR-1–TR-6); **flown/mounted speakers visible in photo — disregard for Production OS.** Stairs both sides (owner confirmed). |
| `venue/empty-stage-left.jpg` | Side-angle view. **Stage-left stairs** with white handrail; front/downstage overhead truss (TR-1–TR-6); side-platform FOH area on house right. |
| `venue/empty-stage-right.jpg` | Side view. Curved stage lip; front/downstage overhead structure; **stage-right stairs** (owner confirmed both sides); back curtain gap to backstage. |

#### Stage

| File | Observed information |
|------|---------------------|
| `venue/empty-stage-center.jpg` | Rectangular proscenium within curved apron; **permanent front/downstage overhead truss** (TR-1–TR-6 structure per owner); relatively shallow depth to back curtain. |
| `venue/empty-stage-left.jpg` | Stage surface appears dark (black or dark grey); wood-trimmed downstage edge. |
| `venue/empty-stage-right.jpg` | Same curved apron; backstage doors visible behind curtain gap. |

#### Audience

| File | Observed information |
|------|---------------------|
| `venue/audience-overview.png` | Curved row layout following stage contour; at least two radial aisles; tiered rake upward from stage. |
| All venue photos | Fixed theater-style seats; teal/blue-green upholstery; no dimensions visible. |

#### FOH

| File | Observed information |
|------|---------------------|
| `venue/empty-stage-center.jpg` | Folding tables with green chairs in audience area — **do not interpret as center FOH** per owner confirmation |
| `venue/audience-overview.png` | Railed-off technical area in center seating; rear wall windows — **separate from confirmed side-platform FOH** |
| `venue/audience-overview copy.png` | Stage-view from stage; FOH on house-right side platform. TF5 + Mac on table; BLX288 behind Mac (red circle). **Confidence monitor = large display on rolling stand immediately right of Mac** — own item, not grouped with Mac. |
| `venue/empty-stage-left.jpg` | White folding tables behind seating rows on **house-right side** — consistent with side-platform FOH when facing stage |
| **Owner confirmed** | FOH on **raised side platform/walkway, house right**, middle-to-rear — TF5 on table, Mac beside TF5, BLX288 behind Mac; **confidence monitor on rolling stand right of Mac** |

#### Backstage

| File | Observed information |
|------|---------------------|
| `venue/empty-stage-right.jpg` | Gap in back curtain reveals grey wall and double doors behind stage — backstage exists but is not photographed directly. |

#### Stage left / Stage right

| File | Observed information |
|------|---------------------|
| `venue/empty-stage-left.jpg` | Carpeted stairs with white metal handrail — **stage-left access** (owner confirmed). |
| `venue/empty-stage-right.jpg` | **Stage-right access stairs** — owner confirms **both sides** have stairs. |

---

### SUNDAY SETUP

#### Completed setup

| File | Observed information |
|------|---------------------|
| `sunday-setup/complete-setup-01.HEIC` | Full Sunday stage from audience seats, **camera slightly house-right**. **Drum kit stage-left.** **Keyboard stage-right (MODX8).** **QSC K12.2 mains** at far stage platform edges. **Two K10.2 wedges** — owner blueprint: **Center-Left** and **Center-Right** (not far edges; no third center monitor). Large center display; center speaking position at round table. Front truss with PAR cans; floor uplights. **FOH not visible.** Snakes, TF5, wireless, subwoofer, PM1 not clearly visible. |

#### Setup process / Teardown / Equipment placement detail

| Status | Notes |
|--------|-------|
| **No photos** | No reference images document setup sequence, teardown, or cable routing process. |

---

### AUDIO

| File | Equipment | Observed information |
|------|-----------|---------------------|
| `equipment/yamaha-ft5.png` | Yamaha TF5 | Product reference: silver fader base, black control deck, large center touchscreen, 33 faders, colored meter strips above faders, dense rear XLR panel (32 inputs, 16 omni outs). |
| `equipment/keybaord-MODX8.png` | Keyboard (Yamaha MODX8) | 88-key bed, black chassis, left-side faders/knobs, large center color screen, "Super Knob" with blue accent, MODX8 branding. Confirms real keyboard model. |
| `equipment/qsc-k12.jpg.webp` | QSC K12.2 (KW series reference photo) | Tall vertical cabinet, full-height hex mesh grille, rounded front corners, QSC badge at bottom. Trapezoidal footprint implied. |
| `equipment/snake-a copy.jpeg.webp` | Stage Snake A | Musician's Gear MC-12 stage box: black rectangular box, 12 female XLR inputs in 3×4 grid with A–D column labels, thick multicore cable, 12 white fan-out tails with male XLR. |
| `equipment/snake-b.jpeg.webp` | Stage Snake B | Same MC-12 form as Snake A — visually identical product family. |
| `equipment/behringer-pm1.jpeg` | Behringer PM1 | Compact black beltpack, female XLR input end, knurled volume knob on opposite end, belt clip on underside, Behringer logo on top. |
| `sunday-setup/complete-setup-01.HEIC` | Drums, K12.2, K10.2 wedges | Drum kit stage-left; mains at stage edges; wedges **Center-Left / Center-Right** per owner blueprint guidance |

**No reference photos for:** QSC K10.2 monitors (separate product shot), Mac desktop at FOH (product shot), playback sources, drum kit close-up, microphone inventory.

**FOH wireless reference:** `venue/audience-overview copy.png` — owner-annotated; BLX288 location confirmed by owner despite Mac obscuring units in frame.

---

### LIGHTING

| File | Observed information |
|------|---------------------|
| `sunday-setup/complete-setup-01.HEIC` | Overhead PAR cans on front truss; floor LED uplights along downstage curve; additional floor fixtures mid-stage creating purple/blue wash. |
| `diagrams/stage-plot-visual-reference.png` | Lighting System Map (inspiration/supporting): shows TR-1–TR-6 and DMX routing — **do not treat diagram truss geometry as venue fact**; owner confirms real TR-1–TR-6 are on **front/downstage overhead structure**, not rear/upstage. |

**No dedicated lighting equipment product photos** in reference library.

---

### MEDIA

| File | Observed information |
|------|---------------------|
| `sunday-setup/complete-setup-01.HEIC` | Large center stage display showing service content; appears integrated into Sunday worship setup. |
| `equipment/projector.jpg` | Epson 3LCD projector product reference: white body, offset lens on front-right, ventilation grille left, top control buttons. |

**FOH reference:** `venue/audience-overview copy.png` — TF5, Mac, BLX288, and **confidence monitor on rolling stand** (right of Mac).

**No photos of:** ProPresenter Mac at FOH (product shot), projection screen fabric, projector mount location.

---

### VIDEO

| Status | Notes |
|--------|-------|
| **No dedicated video reference photos** | Center display visible in Sunday setup photo may serve video/media role; no camera, switcher, or encoder photos present. |

---

### DIAGRAMS

| File | Type | Observed information |
|------|------|---------------------|
| `diagrams/stage-plot-visual-reference.png` | VOA Lighting System Map (L-02) | Hybrid pseudo-isometric room cutaway; curved stage apron; DMX flow sidebar; equipment callout labels; purple signal paths; FOH table rear-right of audience; subwoofer center-front; drum/keyboard positions shown — **treat as supporting/inspiration unless confirmed by photos or truth docs.** |

---

### DESIGN INSPIRATION

| File | Role |
|------|------|
| `diagrams/stage-plot-visual-reference.png` | Visual style reference only: equipment-on-floor treatment, subtle shadows, architectural room cutaway, department color coding, label badges, signal path overlays, setup notes panel. |

**Not evidence of actual geometry** unless corroborated.

---

### GROUND TRUTH DOCUMENTS

| File | Status |
|------|--------|
| `/docs/truth/` | **Directory missing — 0 files** |
| `docs/blueprint/MASTER_PRODUCTION_BLUEPRINT.md` | Used as interim authoritative substitute |
| `docs/blueprint/CURSOR_CONTEXT.md` | Used for locked routing decisions |
| `data/blueprint/theater.ts` | Current application model |

---

## 2 — Physical Room Reconstruction

Based on **venue photos** and **approved documentation** (not diagram geometry alone).

### Stage

| Attribute | Understanding | Confidence |
|-----------|---------------|------------|
| Stage shape | Raised platform with **curved / semi-circular downstage apron**; wood-trimmed front fascia; dark stage floor surface | HIGH |
| Stage depth | Moderately shallow from downstage edge to back curtain; exact depth | UNKNOWN |
| Stage width | Spans most of room width; exact width | UNKNOWN |
| Stage height above audience | Approximately 2–3 feet; exact height | MEDIUM |
| Back curtain | Dark teal/green pleated traveler curtain across upstage | HIGH |
| Side legs/wings | Dark curtains on stage left and stage right | HIGH |
| Backstage | Doors visible behind curtain gap; not photographed | MEDIUM |
| Stage access | **Stairs on both stage-left and stage-right** (owner confirmed) | **HIGH** |

### Stage zones (performer orientation)

| Zone | Physical understanding |
|------|------------------------|
| Stage Left | Audience-left side; **drum kit** + **Behringer PM1** (drummer monitor accessory); **Stage Snake A to the left of drums** |
| Center Stage | Center of curved apron; **`Center Mic`**; portable projection screen during service |
| Stage Right | Audience-right side; **keyboard**; **Stage Snake B to the right of keyboard** |
| Back of Stage | Upstage curtain line; portable projection screen during service |
| Front of Stage | Curved downstage lip; **front/downstage overhead truss (TR-1–TR-6)**; projector overhead between TR-5 and TR-6 |

### Audience

| Attribute | Understanding | Confidence |
|-----------|---------------|------------|
| Seating type | Fixed tiered theater seats, teal/blue-green upholstery | HIGH |
| Arrangement | Curved rows following stage contour | HIGH |
| Aisles | Central and side aisles visible | MEDIUM |
| Capacity | Not readable from photos | UNKNOWN |
| Sight lines | Congregation faces center stage / center screen | HIGH |

### FOH

| Attribute | Understanding | Confidence |
|-----------|---------------|------------|
| Location | **House right** (right side of audience when facing stage) on **raised side platform/walkway** beside fixed seating | **HIGH** (owner confirmed) |
| Depth | Approximately **middle-to-rear** in audience area | **HIGH** (owner confirmed) |
| Equipment | TF5 on table, Mac beside TF5, BLX288 behind Mac; confidence monitor on rolling stand **right of Mac** | **HIGH** (owner confirmed) |
| Not FOH | Center seating tables, permanent booth, center-mid audience interpretation | **HIGH** (owner confirmed) |
| Label in app | `FOH — Center Screen` in `data/audio/venue.ts` — **may not reflect side-platform geometry** | HIGH (label exists; geometry TBD in app) |
| Exact map pin | Approximate only — **do not infer dimensions** from photos | MEDIUM |
| Rear booth windows | Two square interior windows on back wall — separate from Sunday side-platform FOH | LOW |

### Projection / Video

| Attribute | Understanding | Confidence |
|-----------|---------------|------------|
| Center display | **Portable Projection Screen** — part of Sunday production setup (owner confirmed) | HIGH |
| Display type | Do not reinterpret as permanent LED wall unless future references confirm | HIGH (policy) |
| Projector | Used Sunday production; **overhead on front/downstage truss between TR-5 and TR-6** — not floor upstage, not rear truss | HIGH |

### Truss / Permanent rigging

| Attribute | Understanding | Confidence |
|-----------|---------------|------------|
| Front/downstage overhead truss (TR-1–TR-6) | **Above front/downstage edge** — not rear/upstage | HIGH (owner confirmed) |
| Projector on truss | Between TR-5 and TR-6 on front/downstage structure | HIGH |
| Mounted / flown speakers in photos | **Disregard entirely** — not part of Sunday audio system or Production Blueprint | HIGH (owner confirmed) |

### Dimensions

**All physical dimensions: UNKNOWN.** No measurements appear in any reference file.

---

## 3 — Sunday Setup Reconstruction

**Owner-confirmed Sunday production layout** (plus photo evidence where noted):

| Equipment | Approved zone | Status |
|-----------|---------------|--------|
| Back curtain | Back of Stage | Confirmed |
| Portable Projection Screen | Back of Stage / center service display | Owner confirmed — keep label |
| Projector | Overhead between TR-5 and TR-6 on **front/downstage truss** | Owner confirmed — not floor upstage |
| Stage Snake A | Stage Left — **left of drum kit** | Owner confirmed |
| Left monitor (QSC K10.2) | **Center-Left** | Owner confirmed — inward from far edge |
| Drum kit | **Stage Left** | **Owner confirmed** — blueprint center position is wrong |
| Behringer PM1 | **Drum kit accessory** — Stage Left; worn by drummer or at/beside kit; Snake A association | **Owner confirmed — add to future blueprint**; not isolated floor pin |
| Shared center position — **`Center Mic`** | Center Stage | Owner confirmed — one item, not two |
| Keyboard (MODX8) | Stage Right | Owner confirmed |
| Stage Snake B | Stage Right — **right of keyboard** | Owner confirmed |
| Right monitor (QSC K10.2) | **Center-Right** | Owner confirmed — inward from far edge |
| FOH speaker L/R (QSC K12.2) | **On stage platform** at left/right sides | **Owner confirmed** — not audience floor |
| Subwoofer | TBD | Placeholder — no model or location |
| Yamaha TF5 | FOH table — house-right side platform | On FOH table (owner confirmed) |
| Mac Desktop | Beside TF5 on FOH table | In front of wireless receivers (owner confirmed) |
| Shure BLX288 receivers | FOH table — beside TF5, **behind Mac** | Owner confirmed; obscured in photo — see `audience-overview copy.png` red circle |
| Confidence monitor | FOH — rolling stand **right of Mac Desktop** | Owner confirmed — **separate item**, not on table, not grouped with Mac |
| Lighting control | FOH via Mac / Lightkey | Owner confirmed — no separate console |

### OFF-STAGE / UNKNOWN

| Item | Status |
|------|--------|
| Audio closet | Referenced in master blueprint — no photos |
| Trailer / unload | Documented — no photos |
| Snakes (exact floor position on stage) | **Resolved** — Snake A left of drums; Snake B right of keyboard (owner confirmed 2026-08-08) |
| Center wedge visible in one Sunday photo | **Resolved** — no center wedge; photo perspective artifact in `complete-setup-01.HEIC` |

---

## 4 — Comparison Against Current Blueprint (`/blueprint`)

Current model: `data/blueprint/theater.ts` — 19 mapped items, pure top-down layout, rectangular stage regions. **Several positions are now confirmed incorrect per owner ground truth (§ Owner Confirmations).**

### CORRECT (zone / role — pending coordinate refinement)

- Keyboard → Stage Right
- Stage Snake A → Stage Left, **left of drum kit**
- Stage Snake B → Stage Right, **right of keyboard**
- Left / Right QSC K10.2 monitors → **Center-Left** and **Center-Right** (two only; not far edges)
- TF5, Mac, Wireless on FOH table → house-right side platform; **Confidence monitor** → separate rolling stand **right of Mac** (not grouped)
- Shared **`Center Mic`** position → **one** center-stage item — **not** two side-by-side Pastor/Worship Lead items
- Back curtain → upstage reference
- Portable Projection Screen → correct item label (position may still refine)
- Lighting control → Mac / Lightkey (not separate console)
- Behringer PM1 → **drum-kit accessory** (Stage Left; Snake A association) — not absent role, but **missing from blueprint**

### CONFIRMED INCORRECT (must change in future blueprint work)

| Item | Current blueprint | Approved truth |
|------|-------------------|----------------|
| **Drum kit** | Center Stage (50%, 28%) | **Stage Left** |
| **FOH speakers (K12.2 L/R)** | Downstage front corners on audience-side edge | **On stage platform** at left/right sides |
| **Projector** | Floor upstage (50%, 13%) | **Overhead on front/downstage truss between TR-5 and TR-6** |
| **FOH zone / position** | Rear-right ellipse bias; prior center-mid audience | **House-right side platform/walkway**, middle-to-rear — **not center seating, not booth** |
| **Pastor + Worship Leader (dual items)** | Two side-by-side positions (`Pastor` 42%, `Worship Lead` 58%) | **One item: `Center Mic`** |
| **Room geometry** | Rectangular regions | **Curved apron, tiered seating, aisles** |
| **Permanent landmarks** | Not shown | Must add architectural landmarks (truss, **both-side stairs**, curtain, seating, aisles) — **not mounted/flown speakers** |
| **Behringer PM1** | Absent | **Must add** as **drum-kit accessory** — visually attached/beside drums; identifiable/tappable; **not** isolated floor pin; Snake A association |
| **Stage monitors (K10.2 L/R)** | Far-edge pins (~12% / ~88%) | **Center-Left** and **Center-Right** — inward, not stacked at center |
| **Stage Snake A** | Stage left zone, not adjacent to drums | **Left of drum kit** — visually adjacent on blueprint |
| **Stage Snake B** | Stage right zone, not adjacent to keyboard | **Right of keyboard** — visually adjacent on blueprint |

### POSITION NEEDS REFINEMENT (approved zone, exact pin TBD)

| Item | Notes |
|------|-------|
| FOH grouped position | Side platform house right, middle-to-rear — approximate pin only; no dimension inference |
| FOH equipment on table | TF5, Mac beside TF5, BLX288 beside TF5 and behind Mac — **confirmed** |
| Confidence monitor | Rolling stand immediately **right of Mac** at FOH — **confirmed**; separate blueprint item |
| Portable Projection Screen | Correct item; service-time position may refine |
| Subwoofer | Remains placeholder — no placement until finalized |

### MISSING (approved for future blueprint)

| Element | Owner status |
|---------|--------------|
| Behringer PM1 | **Confirmed add** as drum-kit accessory (Stage Left; Snake A association) — not isolated floor pin |
| Stage access stairs (stage-left + stage-right) | **Confirmed** permanent landmarks — both sides |
| Curved stage apron | Approved room geometry |
| Permanent front/downstage overhead truss (TR-1–TR-6) | Reference landmark; projector between TR-5/TR-6 |
| Floor lighting fixtures | Reference landmark / future lighting overlay |
| Keyboard stand | Optional visual detail |
| Center podium/table | Visible in Sunday photo — optional visual detail for shared center position; not yet a blueprint item |
| Seating aisles / tiered rake | Approved room geometry |
| Rear wall booth windows | Reference landmark — separate from side-platform FOH |
| House-right raised side platform/walkway | **Confirmed FOH location** — reference landmark for room geometry |

### STILL UNKNOWN / NOT FINALIZED

| Topic | Status |
|-------|--------|
| Subwoofer model, placement, TF5 Output 6 | **Placeholder — owner not finalized** |
| Pastor / Worship Leader permanent vs optional | **Resolved** — one shared center-stage position (owner confirmed 2026-08-07) |
| Stage snake relative placement | **Resolved** — Snake A left of drums; Snake B right of keyboard (owner confirmed 2026-08-08) |
| Behringer PM1 placement model | **Resolved** — drum-kit accessory; worn or at/beside kit; not isolated floor pin (owner confirmed 2026-08-08) |
| All room dimensions | No measurements |
| Rear wall booth windows function | LOW confidence |

---

## 5 — Equipment Visual Analysis

Current SVGs: `components/blueprint/graphics/equipment/` — inline React SVG, top-down/technical style with `EquipmentShadow`.

| Equipment | Current visual | Real-world characteristics | Recommended blueprint representation |
|-----------|---------------|----------------------------|-------------------------------------|
| **Yamaha TF5** | Acceptable | Silver wedge base, black top deck, wide fader bank, large center touchscreen, color meter strips | Add two-tone silver/black treatment; widen screen area; increase fader count readability; optional "TF5" label on deck |
| **Keyboard** | Acceptable | 88-key MODX8: very long aspect, left control panel, center screen, Super Knob | Extend key bed length further; add small left-panel block and center screen rectangle; optional stand legs below |
| **Drum kit** | Acceptable | 5-piece with cymbals overhead; kick/snare/toms from above | Already improved; could widen cymbal spread and clarify kick orientation |
| **Stage Snake A/B** | Needs Improvement | Identical MC-12 boxes: 3×4 XLR grid on top, thick cable, fan-out tails | Show **12-socket grid** (not 4); add "Musician's Gear" scale box proportions; differentiate A/B only by label |
| **QSC K12.2 FOH** | Acceptable | Tall trapezoidal cabinet, full-height mesh grille, rounded corners, badge low on grille | Use slight trapezoid footprint top-down; mesh texture suggestion; taller aspect ratio |
| **QSC K10.2 monitors** | Acceptable | Wedge monitor — **two only** | Place at **Center-Left** and **Center-Right** — visibly inward from far edges; not stacked at center |
| **Subwoofer placeholder** | Acceptable | Large low cabinet; lighting diagram shows QSC KW181-style cube with large driver | When model confirmed: wider, heavier cube; large circle driver; dashed border until approved |
| **Wireless receivers** | Acceptable | Two 1U rack units with antennas (BLX288 dual receiver); **on FOH table beside TF5, behind Mac** | At FOH table grouping; may render slightly behind Mac icon to reflect obscured depth — not omitted |
| **Behringer PM1** | N/A on map | Small beltpack; XLR on one end, knob on other, belt clip; worn by drummer or at/beside kit | Add as **small accessory icon attached to or beside drum kit** — identifiable/tappable; **not** separate floor pin; show Snake A relationship |
| **Mac / FOH computer** | Acceptable | iMac-style monitor + base or Mac mini + display on table | Current monitor+stand works; consider thin desk line beneath for FOH context |
| **Projector** | Acceptable | White Epson body; lens offset right; vent grille left | Add offset lens circle; light vent pattern on left third |
| **Projection screen** | Acceptable | Wide horizontal surface | Sunday evidence may be LED panel — consider dual graphic or "Display" variant when confirmed |
| **Confidence monitor** | Acceptable | Large display on **rolling floor stand** beside FOH table; **right of Mac** when facing stage | Own map item with stand legs/wheels; **not** merged into Mac graphic; larger than generic FOH monitor if matching reference photo |

**Priority SVG improvements:** Stage snakes (socket grid accuracy), TF5 two-tone identity, keyboard length/MODX8 control panel, subwoofer model-specific shape when approved.

---

## 6 — Diagram Design Analysis

From `diagrams/stage-plot-visual-reference.png` — **design principles only**:

| Principle | Description | Applicability to Production Blueprint |
|-----------|-------------|--------------------------------------|
| Hybrid room perspective | Cutaway 3/4 view with visible walls and floor | Strong match for curved Antioch room — more readable than flat rectangle |
| Equipment on floor | Icons sit on floor with soft shadows; no card boxes | Already adopted in recent blueprint polish — continue |
| Architectural boundaries | Stage edge, seating rows, stairs as linework — not filled UI zones | Apply to curved apron, aisles, tier lines |
| Label hierarchy | Small badges under equipment; full names in sidebar/legend | Matches current map label approach |
| Department color | Purple for lighting DMX in diagram | Future overlay colors per department |
| Signal paths | Dashed routed lines with arrows | Future cable-routing overlay — not yet in scope |
| Information panels | Legend, equipment list, setup notes beside map | Future detail panel / volunteer notes pattern |
| Orientation | Stage top, audience bottom, FOH labeled in room context | Already present — strengthen with curved stage cue |
| Equipment callouts | TR-1, SL-1 style short codes | Consider for lighting fixtures when that overlay is populated |

**Do not import from diagram as venue fact:** rear-right FOH table position, drum stage-right placement, subwoofer model (KW181), **rear/upstage TR truss placement**, specific SL fixture positions, keyboard stage-left placement in diagram.

---

## 7 — Recommended Blueprint Visual Direction

### Recommendation: **C — Hybrid architectural stage plot** *(owner confirmed)*

Owner confirmed: adopt curved stage apron, real stage geometry, tiered/curved audience seating, aisle structure, and hybrid architectural style — **do not keep the simplified rectangular room.**

| Option | Fit for Antioch | Verdict |
|-------|-----------------|---------|
| A. Pure top-down | Loses curved apron, tiered seating, and stage lip | Insufficient alone |
| B. Slight perspective / pseudo-isometric | Strong visual match | Good reference |
| C. Hybrid architectural stage plot | Data-driven positions + architectural linework + permanent landmarks vs portable gear | **Approved** |

**Permanent vs portable:** Architectural landmarks (truss, stairs, curtain, seating, aisles) appear as **reference context** — visually distinct from Sunday portable production equipment. **Do not depict mounted or flown speakers** (owner confirmed).

**Mobile constraint:** Simplify linework on small screens; keep equipment tappable and readable.

**Implementation status:** Not yet applied to `/blueprint` or `theater.ts`.

---

## 8 — Confidence Report

| Area | Level | Basis |
|------|-------|-------|
| Curved stage with wood-trim apron | **HIGH** | Venue photos + owner confirmation |
| Tiered curved seating + aisles | **HIGH** | Venue photos + owner confirmation |
| Stage-left access stairs | **HIGH** | Venue photos + owner confirmation |
| Stage-right access stairs | **HIGH** | Owner confirmation (2026-08-08) |
| Back curtain upstage | **HIGH** | All stage photos |
| Front truss — TR-1 through TR-6 positions | **Above front/downstage edge** — not rear/upstage | HIGH (owner confirmed) |
| Front truss with PAR cans | **HIGH** | Venue + Sunday photos; owner confirms = TR structure |
| Projector overhead between TR-5 and TR-6 on front/downstage truss | **HIGH** | Owner confirmation (2026-08-07); side-angle venue photo + existing reference photos |
| Portable Projection Screen (Sunday setup) | **HIGH** | Owner confirmation |
| FOH in house-right side platform (not center, not booth) | **HIGH** | Owner confirmation (2026-08-07); venue photos as visual evidence |
| FOH depth middle-to-rear on side walkway | **HIGH** | Owner confirmation |
| Drum kit Stage Left | **HIGH** | Owner confirmation (resolves prior conflict) |
| Keyboard Stage Right (MODX8) | **HIGH** | Owner + photo + equipment reference |
| FOH K12.2 on stage platform L/R | **HIGH** | Owner confirmation |
| QSC K10.2 monitors — Center-Left / Center-Right (two only) | **HIGH** | Owner confirmation (2026-08-07 / 2026-08-08); not far-edge pins |
| Behringer PM1 — drum-kit accessory (Stage Left; Snake A) | **HIGH** | Owner confirmation (2026-08-08); worn or at/beside kit — not isolated floor pin |
| Confidence monitor at FOH — rolling stand right of Mac | **HIGH** | Owner confirmation (2026-08-07); `audience-overview copy.png` |
| Mac = Lightkey + ProPresenter/media | **HIGH** | Owner confirmation |
| Hybrid architectural stage plot | **HIGH** | Owner confirmation |
| FOH exact map coordinates | **MEDIUM** | Side and depth confirmed; exact pin approximate — do not infer dimensions |
| FOH equipment arrangement (TF5, Mac, BLX288) | **HIGH** | Owner confirmation (2026-08-07); Mac obscures receivers in photo — not missing |
| Subwoofer model, placement, Output 6 | **UNKNOWN** | Owner: not finalized |
| Stage Snake A — left of drum kit | **HIGH** | Owner confirmation (2026-08-08) |
| Stage Snake B — right of keyboard | **HIGH** | Owner confirmation (2026-08-08) |
| Stage / room dimensions | **UNKNOWN** | No measurements |
| Shared center-stage position — **`Center Mic`** | **HIGH** | Owner confirmation (2026-08-07) |
| Permanent/flown speakers excluded from blueprint | **HIGH** | Owner confirmation (2026-08-08) |
| Rear wall booth windows function | **LOW** | Visible only in audience overview |

---

## 9 — Reference Gaps

Owner confirmations resolved several prior gaps. Remaining gaps that would still improve the digital model:

### High priority

| Gap | Why it matters |
|-----|----------------|
| **`/docs/truth/` files** | Intended highest authority — still not populated in repo |
| **Top-down or wide FOH photo** | Optional refinement of side-platform pin; confidence monitor placement **confirmed** |
| **Stage measurements** | Stage width, depth, apron radius, seat count — proportional hybrid map |

### Medium priority

| Gap | Why it matters |
|-----|----------------|
| **Subwoofer photo + Audio Lead decision** | Required before removing placeholder |
| **Elevated center-rear Sunday setup photo** | Full layout verification after corrections |
| **QSC K10.2 product reference photo** | SVG wedge accuracy |
| **Shure BLX288 rack photo (actual FOH rack)** | Optional detail — owner-annotated `audience-overview copy.png` confirms approximate location |
| **Backstage photo** | Storage, cable entry, curtain gap |

### Lower priority

| Gap | Why it matters |
|-----|----------------|
| **Teardown / setup process photos** | Future volunteer workflow overlays |
| **Lighting fixture photos (SL/TR units)** | Future lighting overlay |
| **Video camera / switcher photos** | Future video overlay |
| **HEIC → JPG/PNG copy in library** | Tooling accessibility for `complete-setup-01.HEIC` |

---

## 10 — Audit Metadata

| Field | Value |
|-------|-------|
| Audit date | 2026-08-07 |
| Final ground-truth check | 2026-08-08 |
| Blueprint rebuild readiness | **READY** — see §12 |
| Owner confirmations | 2026-08-07–08 — § Owner Confirmations; includes **Behringer PM1 drum-kit accessory** (2026-08-08), **stage snake adjacency** (2026-08-08), **exclude permanent/flown speakers** from blueprint (2026-08-08) |
| Application modified | **No** |
| Blueprint data modified | **No** |
| Reference files modified | **Audit doc only** (`VENUE_REFERENCE_AUDIT.md`) |
| Next step | Implement Production Blueprint rebuild from § Owner Confirmations + §12 readiness; sync `MASTER_PRODUCTION_BLUEPRINT.md` after rebuild; populate `/docs/truth/` when available |

---

## 11 — Remaining Unresolved Questions

**Not blockers for blueprint rebuild** — track for future documentation sprints or optional refinement during rebuild.

1. **Subwoofer:** When finalized, what model, exact placement, and TF5 Output 6 routing should the blueprint show?

2. **FOH map pin refinement:** Side platform house-right, middle-to-rear is confirmed — proportional grouping sufficient for rebuild.

3. **Confidence monitor signal/content:** What does it display (ProPresenter stage display, notes, timer, etc.)? *(Spatial placement confirmed — does not block rebuild.)*

4. **Portable Projection Screen:** Exact service-time position on stage (distance from curtain, centerline alignment)?

5. **Rear wall booth windows:** Is that a separate permanent control space, storage, or unrelated to Sunday FOH?

6. **Stage dimensions:** Can you provide stage width, depth, apron radius, and approximate seating capacity?

7. **Center podium/table:** Should the round table visible in Sunday photos appear as a map element, or remain implied by **`Center Mic`** only? *(Default for rebuild: implied by `Center Mic` unless owner specifies otherwise.)*

8. **`/docs/truth/`:** When will truth files be added, and which topics will they cover first (positions, routing, room geometry)?

### Resolved (no longer open)

- **Center-downstage wedge:** **Resolved 2026-08-07.** No dedicated center monitor. Two QSC K10.2 monitors only.

- **Stage monitor blueprint position:** **Resolved 2026-08-08.** **Center-Left** and **Center-Right** — visibly inward from far-edge pins; not stacked at center; not at extreme stage edges. For blueprint clarity, not exact measured coordinates.

- **Stage access stairs:** **Resolved 2026-08-08.** Stairs on **both** stage-left and stage-right. Permanent architectural landmarks — not portable Sunday equipment.

- **Permanent / flown speakers:** **Resolved 2026-08-08.** **Disregard all** mounted/flown speakers in reference photos. Do not include on Production Blueprint. Sunday FOH = portable **QSC K12.2 L/R** only.

- **FOH position:** **Resolved 2026-08-07.** House-right side platform/walkway beside fixed seating, middle-to-rear depth. Not center-mid audience, not booth, not center seating table. TF5, Mac, and production equipment at this side position. Do not infer exact dimensions from photos.

- **Pastor / Worship Leader → `Center Mic`:** **Resolved 2026-08-07.** One shared center-stage position labeled **`Center Mic`** — not two separate side-by-side items. Used by Pastor, Worship Leader, speaker, or other ministry roles depending on service moment.

- **FOH equipment positioning:** **Resolved 2026-08-07.** TF5 on FOH table; Mac beside TF5; Shure BLX288 receivers on table beside TF5 and **behind Mac** (partially/mostly hidden in photo — not missing). Red circle in `docs/reference/venue/audience-overview copy.png` marks approximate receiver location. Owner placement overrides photo inference.

- **Projector / TR truss:** **Resolved 2026-08-07.** TR-1–TR-6 on **front/downstage overhead structure** — not rear/upstage truss. Projector mounted overhead **between TR-5 and TR-6** on this structure, near front/downstage boundary — not on upstage floor. Confirmed by venue reference photos and owner-provided side-angle photo.

- **Confidence monitor:** **Resolved 2026-08-07.** Large display on **rolling stand immediately right of Mac Desktop** at FOH — **not on FOH table**. Own blueprint item; do not group with Mac. Reference: `docs/reference/venue/audience-overview copy.png`.

- **Stage snake positions:** **Resolved 2026-08-08.** **Stage Snake A** on stage left, physically **to the LEFT of the drum kit**. **Stage Snake B** on stage right, physically **to the RIGHT of the keyboard**. Place snake boxes close enough to drums and keyboard on the blueprint that the physical relationship is visually clear. Do not infer different positions from camera perspective in reference photos — owner placement overrides photo inference.

- **Behringer PM1 position:** **Resolved 2026-08-08.** Part of the **drummer's monitoring system**. Worn clipped to the drummer during service; when not worn, remains **at or beside the drum kit** at **Stage Left**. Associate **visually with the Drum Kit** on the blueprint — smaller accessory attached to or beside the drum position; **identifiable/tappable** as the drummer's personal monitor; **not** an isolated permanent floor pin. Maintain **Stage Snake A** relationship.

---

## 12 — Final Ground-Truth Check (2026-08-08)

### Blueprint rebuild readiness

**Verdict: READY FOR BLUEPRINT REBUILD**

Owner confirmations now cover every **major spatial and Sunday-layout decision** needed to rebuild `data/blueprint/theater.ts` and the `/blueprint` map UI. Remaining open items (subwoofer model/placement, exact dimensions, confidence-monitor signal path, rear booth purpose) are **safe placeholders** and do **not** block a spatial rebuild.

### Owner confirmation index (complete)

| Date | Topic | § Detail |
|------|-------|----------|
| 2026-08-07 | Stage monitors (two K10.2; no center wedge) | Stage monitors |
| 2026-08-07 | FOH house-right side platform | FOH position |
| 2026-08-07 | **`Center Mic`** (one shared center position) | Pastor / Worship Leader |
| 2026-08-07 | FOH desk layout (TF5, Mac, BLX288 behind Mac) | FOH equipment positioning |
| 2026-08-07 | Projector on front/downstage truss TR-5/TR-6 | Projector / TR truss |
| 2026-08-07 | Confidence monitor rolling stand right of Mac | Confidence monitor position |
| 2026-08-08 | Monitor pins Center-Left / Center-Right | Stage monitor blueprint position |
| 2026-08-08 | Both-side stage access stairs | Stage access stairs |
| 2026-08-08 | Exclude permanent/flown speakers | Permanent / flown speakers |
| 2026-08-08 | Snake A left of drums; Snake B right of keyboard | Stage snake positions |
| 2026-08-08 | PM1 drum-kit accessory (not floor pin) | Behringer PM1 position |
| 2026-08-07–08 | Drums Stage Left; K12.2 on stage platform; hybrid architectural plot; portable projection screen label | Locked placement corrections; Room representation |

### Cross-document contradictions register

Known conflicts **as of final check**. Owner confirmations (§ Owner Confirmations) are the rebuild authority. **`theater.ts` and Audio pages were not modified during this audit.**

#### vs `docs/blueprint/MASTER_PRODUCTION_BLUEPRINT.md`

| Topic | Master doc says | Owner-confirmed truth | Rebuild action |
|-------|-----------------|----------------------|----------------|
| Drum kit zone | **Center Stage** (zones table + ASCII diagram + positioning rules) | **Stage Left** | Move drums; update zone descriptions in master doc post-rebuild |
| `center-stage` zone | "Drum kit primary position" | Shared **`Center Mic`** + projection screen | Fix zone copy in master doc |
| FOH label | `FOH — Center Screen` | House-right **side platform/walkway**, middle-to-rear | Update church info label; map to side platform |
| FOH geometry | Generic "in the audience" | Raised side platform house right — not center seating | Rebuild FOH region + pins |
| K12.2 placement | "Front-left and front-right of stage" at downstage edge | **On stage platform** at L/R sides | Move K12.2 pins onto stage platform |
| K12.2 inventory location | `FOH — Center Screen area` | Stage platform L/R (Sunday portable) | Update inventory location strings post-rebuild |
| Projector / screen | "Upstage or above stage" *(video placeholder)* | **Overhead front truss TR-5/TR-6** | Move projector landmark; keep screen upstage/center |
| Stage monitors | "Stage left and stage right wedges" (edge implied) | **Center-Left / Center-Right** — inward pair | Adjust monitor pins |
| Snake adjacency | Zone only (Stage Left / Stage Right) | Snake A **left of drums**; Snake B **right of keyboard** | Adjacent placement on map |
| PM1 | "At drum kit" (routing correct) | Drum-kit **accessory** — not isolated floor pin | Composite or accessory graphic at drums |
| Confidence monitor | `[PLACEHOLDER — location and signal path]` | Rolling stand **right of Mac** at FOH — location confirmed | Approve map item placement; signal path still TBD |
| Lighting control | `[PLACEHOLDER]` | **Mac / Lightkey** — no separate console | Tie to Mac; do not invent console |
| Subwoofer | Front of stage placeholder | Still **TBD** | Keep placeholder |
| Room geometry | Not specified (rectangular ASCII) | **Curved apron, tiered seating, aisles, stairs, truss** | Hybrid architectural rebuild |

#### vs `data/blueprint/theater.ts` (`theaterBlueprint`)

| Topic | Current blueprint | Owner-confirmed truth |
|-------|-------------------|----------------------|
| Drums | `center-stage` @ 50%, 28% | **Stage Left** |
| Pastor + Worship Lead | Two items @ 42%/58% | One **`Center Mic`** |
| Monitors | Far edges ~12% / ~88% | **Center-Left / Center-Right** |
| Snakes | 16%,32 / 76%,24 — not adjacent | Adjacent to drums / keyboard |
| K12.2 | `front-of-stage` downstage corners | **On stage platform** L/R |
| Projector | Floor upstage 50%, 13% | **Overhead front truss** TR-5/TR-6 |
| FOH region | Audience ellipse bias center-rear-right | **House-right side platform** |
| FOH table layout | Scattered pins | Grouped: TF5, Mac, BLX288; confidence **right of Mac** |
| PM1 | **Absent** | Drum-kit accessory |
| Landmarks | Rectangular regions only | Stairs, truss, curved apron, side platform |
| Flown speakers | N/A | **Do not add** |
| Room | Rectangular `mapRegions` | Hybrid architectural |

#### vs `data/audio/v2/stage-plot.ts` *(Audio page — out of scope for this sprint)*

| Topic | Stage plot data | Owner-confirmed truth |
|-------|-----------------|----------------------|
| Drums | `center-stage` | **Stage Left** |
| FOH items | `locationNotes: "FOH booth"` | Side platform — not booth |
| Spatial layout | Grid cells only — inherits center drums | Will need sync **after** master blueprint rebuild |

#### vs reference photos *(owner overrides noted)*

| Photo / diagram | Shows | Owner policy |
|-----------------|-------|--------------|
| Venue photos | Mounted/flown speakers | **Disregard** — not Sunday system |
| `complete-setup-01.HEIC` | Possible center wedge artifact | **No center monitor** — two wedges only |
| `complete-setup-01.HEIC` | Drums stage-left, keyboard stage-right, K12.2 at platform edges | **Aligns** with owner truth |
| `stage-plot-visual-reference.png` | Rear FOH, rear truss, diagram drum/keyboard positions | **Inspiration only** — do not import geometry |
| `audience-overview copy.png` | FOH side platform; Mac obscures BLX288 | **Aligns** — owner confirms receiver placement |

#### Internal audit consistency

**No unresolved contradictions** between owner confirmation subsections and §3 Sunday Setup Reconstruction. All major layout questions moved to **Resolved** (§11).

### Safe to remain TBD / placeholder on rebuild

| Item | Why safe |
|------|----------|
| **Subwoofer** | Owner explicitly not finalized; dashed placeholder at approved zone |
| **FOH exact map coordinates** | Zone and relative grouping confirmed; proportional pin only |
| **Stage / room dimensions** | Hybrid map uses relative proportions from photos |
| **Portable Projection Screen** exact upstage pin | Label and zone confirmed; fine-tune during rebuild |
| **Confidence monitor signal/content** | Spatial placement confirmed; routing/content is media doc work |
| **Center podium/table** | Optional visual detail; **`Center Mic`** is the required map item |
| **Rear wall booth windows** | Architectural landmark only; function low priority |
| **`/docs/truth/` population** | Owner confirmations + this audit are interim authority |
| **Lighting fixture positions** | Future lighting overlay |
| **Video cameras / switcher** | Future video overlay |

### Pre-rebuild blockers (owner input required)

**None.** All spatial decisions required for the Production Blueprint map rebuild have owner-confirmed ground truth in § Owner Confirmations.

---

## Appendix — Current Blueprint Item Positions (Preserved Record)

Snapshot of `theater.ts` `mapPosition` values at audit time — for future diff reference. **Owner-confirmed future targets:** monitors at **Center-Left / Center-Right** (not current ~12% / ~88% far-edge pins); **Snake A adjacent left of drums**; **Snake B adjacent right of keyboard** (not current 16%,32 / 76%,24); **Behringer PM1 as drum-kit accessory** (not a separate floor pin — absent from current map).

| Item | x | y | rotate |
|------|---|---|--------|
| Back curtain | 50 | 5 | — |
| Projection screen | 50 | 10 | — |
| Projector | 50 | 13 | — |
| Snake A | 16 | 32 | — |
| Left monitor | 12 | 42 | -25° |
| Drums | 50 | 28 | — |
| Pastor | 42 | 38 | — |
| Worship lead | 58 | 38 | — |
| Keyboard | 82 | 32 | — |
| Snake B | 76 | 24 | — |
| Right monitor | 88 | 42 | +25° |
| FOH L | 18 | 54 | — |
| Subwoofer | 50 | 55 | — |
| FOH R | 82 | 54 | — |
| TF5 | 72 | 78 | — |
| Mac | 56 | 82 | — |
| Wireless | 86 | 72 | — |
| Confidence | 48 | 74 | — |
| Lighting | 64 | 70 | — |

---

*End of audit.*
