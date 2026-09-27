# Project-Owned Static Media Production Plan v1

Status: **ACTIVE STATIC-PRODUCTION PLAN**

Baseline: current `main` `ab53da4059e348734703c2de490e43e94c02b057`.

## Goal

Pivot the presentation-production effort away from uncertain web-sourced GIFs and toward original repository-owned static SVG fallbacks that can ship before the final GIF-animation phase.

This work is presentation-only:
- no gameplay changes;
- no runtime/schema/UI edits;
- no Save changes;
- no new semantic presentation identities.

The assets are intended as stronger semantic fallbacks for existing production slots. Final multi-GIF animation remains a later replacement/augmentation phase.

## Visual direction

New assets should stay compatible with the prototype's current stage language:
- 1200×675 viewBox;
- flat vector shapes;
- dark blue/charcoal structure;
- muted green/brown environment;
- warm amber light;
- simple readable silhouette/composition;
- no baked-in RU/EN text;
- no hidden gameplay result numbers;
- no external raster/source dependency.

Unlike the generic existing stage files, each new asset should emphasize the semantic family it serves.

## Priority order

### 1. Ordinary career results

Create distinct result-oriented static art for all 10 ordinary careers.

Batch A:
- Lumber;
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter.

Batch B:
- Guard;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

Target result identities:
- `job/<career>/result/default`.

These assets do not replace seasonal shift art by default. They are result-shell fallbacks and can later be evaluated for broader safe reuse.

### 2. Reachable School

Create:
- one original daytime School result/lesson fallback suitable for currently reachable lesson/generic daytime School presentation slots;
- one original Night-study fallback suitable only for the currently reachable generic post-Night-study semantic slot.

Do not promote staged teacher-specific media identities.

### 3. Ordinary poverty

Create one original static family asset for each current ordinary-poverty context:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Secret Debt is excluded.

A family asset may map to multiple shipped semantic event IDs when it stays outcome-neutral enough for every mapped event.

### 4. Forest result semantics

Create three distinct outcome-compatible SVGs:
- success;
- escape;
- failure.

Each may map to both the corresponding Activity return identity and PR43 reaction identity because the outcome is already fixed before presentation rendering.

Do not create Hunter/Old Boundary/challenge semantics.

### 5. Foreman relationship/Night

Create:
- professional milestone/notice fallback;
- professional Night follow-up fallback.

No new relationship route/stage is introduced.

## Source/provenance policy

All SVGs in items 185–190 are authored directly as new project assets in this repository.

They must:
- contain no externally copied vector paths;
- contain no embedded external images;
- contain no third-party trademarks/characters;
- use only generic project visual language and simple original geometric/vector composition.

Provenance for these assets is therefore:
`project-authored in repository / original vector composition`.

## File root

All new files go only under:

`prior-work/astra/prototype-m3.2/assets/presentation/`

Runtime-compatible source paths therefore use:

`assets/presentation/<filename>.svg`

The existing build already copies the whole `assets/` tree into `dist/assets/`.

## Localization rule

Media identity and asset path remain locale-neutral.

RU and EN differ only in:
- alt text;
- optional caption text.

No text is baked into the SVG art.

## Integration model

Items 185–190 only create physical source assets.

Item 191 will create a presentation-only mapping manifest.

Item 192 will provide RU+EN accessibility/localization payload.

Item 193 will contract-test:
- physical file existence;
- valid SVG text;
- build copy behavior;
- semantic slot existence;
- no external URLs;
- no gameplay fields.

Nothing in this queue is root-loaded automatically.

## Acceptance target

By the end of item 194, audited surfaces should clearly distinguish:
- `UNIQUE_PROJECT_OWNED` — new semantic/family-specific project SVG exists;
- `GENERIC_EXISTING` — only older generic stage art exists;
- `MISSING`;
- `PRODUCT_OPEN` — intentionally staged/not production-routed.

The final GIF phase may later supersede or supplement these assets while retaining them as animations-off/static fallbacks.
