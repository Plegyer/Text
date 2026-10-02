# GIF Asset Requirements v1

## Purpose

This document defines the production shopping list contract for animated GIF media in the current `Plegyer/Text` game. Git is the only authority for gameplay identities. This inventory was derived from `NEW_GAME_SPEC_v1.md`, the live `definitions.json`, all direct production packs loaded by `scripts/build.mjs`, `presentation.json`, `src/core/presentation.ts`, current authored-content source banks for shipped careers, and the current `assets/presentation` tree. Source tree before this inventory write: `a5c5adb4716107e6089585795a2db486a84bc60c`.

The inventory does **not** add mechanics, runtime IDs, content gating, presentation code, or downloaded media. It only specifies what a human should source later and the final filename to use.

## Binding rules

Every row has exactly one principal `presentation_id_or_event_id`. If that value is a semantic presentation ID, it was checked against the current `presentation.json.slots`. A conceptual requirement with no current production surface is marked exactly `PENDING_RUNTIME_ID`. Additional valid current consumers are listed in `notes`; one reusable asset may serve many consumers.

Do not create one GIF per presentation slot. Reuse is intentional when the same physical action or ambient setting remains semantically correct. The strongest reuse cases are ordinary career shift pools across seasons, ordinary Hard Work endings, School Night study, adjacent relationship stages, and nearby poverty variants.

The current presentation runtime accepts local GIF sources and either a single `primary` GIF or a 3–5 candidate pool, with static fallback. The UI stage is 16:9, so every requirement uses `landscape-16:9`.

## Naming contract

`recommended_filename` is final: lowercase ASCII, only `a-z`, `0-9`, `-`, and `.gif`. Filenames describe domain + scene + variant and avoid random technical numbers. `asset_id` is the stable dotted semantic equivalent. Save sourced media directly under the recommended basename so it can later be handed to an integration agent without renaming.

## Content rating and consent

`safe` contains no sexual presentation. `suggestive` may establish adult work, romance, privacy, or sexual context without an explicit sexual act. `explicit` is reserved for consensual adult-only Prostitute-career concepts here; every explicit row has `adult_only=true`.

The current Prostitute runtime has ordinary semantic shift surfaces, but current presentation code has no dedicated adult-only explicit scene/content-gating surface. Explicit GIF requirements therefore remain `PENDING_RUNTIME_ID` and must not be attached as default shift media.

Secret Debt is a coercive/dependency route in the current design draft. Its adult requirements are intentionally non-explicit: departure, return, lock/control, fatigue, and state transition. Do not depict or eroticize forced sexual activity. These rows are adult-only because of theme and use `content_rating=suggestive`.

## Priority and release interpretation

- **P0**: a major beat visually fails without a strong animated treatment.
- **P1**: recurring/core gameplay.
- **P2**: relationship breadth, secondary variation, ambient context.
- **P3**: polish and rare optional variants.

`v1-required` can still be `PENDING_RUNTIME_ID`: it means the current product/design authority expects the beat for the v1 experience, not that a presentation surface already exists. `v1-desirable` can ship on static fallback. `post-v1` covers optional polish or explicit adult variants that remain open in current design authority.

## Loop guidance

Use clean, readable motion rather than long narrative clips. `loop` should hide its seam and keep the key action cyclic. `ambient` should remain low-distraction under repeated viewing. `one-shot` should have a clear beginning and preferably settle into a stable last frame. No file-size, frame-rate, or duration hard lock is invented because Git currently defines none.

## Existing GIF placeholders

Git currently contains 6 GIF files under `assets/presentation`. The 6 names that also appear in this manifest remain `NEEDED`: source production replacements under the **same final filename**.

- `career-satyr-maid-motion-service-a.gif`
- `career-satyr-maid-motion-service-b.gif`
- `career-satyr-maid-motion-service-c.gif`
- `career-undead-farm-motion-field-a.gif`
- `career-undead-farm-motion-field-b.gif`
- `career-undead-farm-motion-field-c.gif`

## Integration handoff

When media is sourced later, preserve the manifest row and recommended filename, verify the rating/consent rules, and let the presentation integration owner add bindings. This inventory itself must not edit `content/presentation.json`, mechanics, or runtime code. Static fallback remains authoritative until an animated binding is deliberately added.
