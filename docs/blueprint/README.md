# Production OS Blueprint Documentation

This folder contains the **permanent foundation documents** for Production OS at Victory Outreach Antioch. These files are **not volunteer-facing**. They exist to guide engineering, product decisions, and all future development.

## Documents

| File | Audience | Purpose |
|------|----------|---------|
| [MASTER_PRODUCTION_BLUEPRINT.md](./MASTER_PRODUCTION_BLUEPRINT.md) | Product, engineering, leadership | Describes the **physical production environment** — what exists in the building, on stage, and at FOH |
| [PRODUCTION_OS_STANDARDS.md](./PRODUCTION_OS_STANDARDS.md) | Engineers, Cursor agents | Defines **how Production OS is built** — patterns, rules, and rationale |
| [CURSOR_CONTEXT.md](./CURSOR_CONTEXT.md) | Cursor AI agents | Provides **persistent project knowledge** and locked decisions for every session |

## When to Reference Each Document

### Before planning a new feature
1. Read **MASTER_PRODUCTION_BLUEPRINT.md** to understand physical constraints and approved equipment.
2. Read **PRODUCTION_OS_STANDARDS.md** to choose the correct page type, component pattern, and naming convention.
3. Read **CURSOR_CONTEXT.md** to confirm what is locked and what requires approval to change.

### Before modifying audio content
- Confirm routing, channels, and equipment against **MASTER_PRODUCTION_BLUEPRINT.md** (Audio Blueprint section).
- Cross-check **CURSOR_CONTEXT.md** (Approved Routing, Approved TF5 Channels, Approved Outputs).
- Update application data in `data/audio/v2/` — never invent values not reflected in the blueprint.

### Before a Cursor sprint
- Paste or reference **CURSOR_CONTEXT.md** as the session anchor.
- Use sprint instructions that explicitly state what must **not** change (Dashboard, Sunday Setup, routes, etc.).

### Before onboarding a new developer
- Start with this README.
- Read all three documents in order: Blueprint → Standards → Cursor Context.

## How They Work Together

```
MASTER_PRODUCTION_BLUEPRINT.md     PRODUCTION_OS_STANDARDS.md
   (WHAT exists)          +            (HOW we build)
              \                         /
               \                       /
                v                     v
              CURSOR_CONTEXT.md
           (WHAT is locked + current state)
                      |
                      v
            data/audio/v2/ + components/audio/v2/
                      |
                      v
              Production OS Application
```

- **Blueprint** answers: *What is physically installed? Where does it go? How is it routed?*
- **Standards** answers: *What page type do we use? Why mobile-first? Why no duplicate docs?*
- **Cursor Context** answers: *What has already been decided? What must an agent never change without approval?*

When the physical system changes (new speaker, new console scene, new snake patch), update **MASTER_PRODUCTION_BLUEPRINT.md** first, then sync `data/audio/v2/`, then update **CURSOR_CONTEXT.md**.

When engineering patterns change (new component library, new doc template), update **PRODUCTION_OS_STANDARDS.md** first, then refactor code to match.

## Maintenance Rules

- Treat these documents as **source of truth**, not session notes.
- Use **placeholders** for unfinalized information — do not invent specs.
- Keep volunteer-facing copy in the application; keep engineering rationale here.
- Review blueprint accuracy after every major audio QA sprint.
- Do not push breaking blueprint changes without aligning application data in the same commit.

## Related Application Paths

| Concern | Code location |
|---------|---------------|
| Audio data (canonical) | `data/audio/v2/` |
| Audio UI (current) | `components/audio/v2/` |
| Routes | `app/audio/` |
| Venue labels | `data/audio/venue.ts` |
| Navigation | `data/navigation.ts` |

Legacy v1 paths (`data/audio/` without `v2/`, `app/audio/tf5`, etc.) exist for backward compatibility but are **not authoritative** for new work.
