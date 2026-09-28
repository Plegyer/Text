# Additional Career Animation Source Handoff v11

Scope: Chat 2 queue items **352–362**.

Authoritative role/pointer source:
- `docs/tasks/CHAT2_MANDATORY_ROLE_PROMPT.md`
- `docs/tasks/CURRENT_CHAT2_TASK_POINTER.md`

Fresh integration baseline:
`main@63282427e9fe7b913e9b179a072c1be771843a35`.

Worker branch:
`chat2/additional-career-animation-sources-352-363`.

## Result

This queue adds nine new project-owned animation source sequences, all created on a fresh branch from current main:

- 3 Merchant spring sequences;
- 3 Hunter autumn sequences;
- 3 Artist/Geisha winter sequences.

Each sequence contains exactly 4 ordered SVG frames.

Totals:
- semantic identities: **3**;
- source sequences: **9**;
- source SVG frames: **36**;
- actual GIF files: **0**;
- production GIF pools: **0**.

No gameplay/runtime/schema/UI file is changed.

## Current semantic IDs now having 3 compatible source sequences

### Merchant spring

Exact semantic ID:

`job/merchant/shift/spring/default`

Sequences:
- `merchant-spring-stall-loop-a`
- `merchant-spring-stall-loop-b`
- `merchant-spring-stall-loop-c`

Future candidate keys:
- `merchant-spring-loop-a`
- `merchant-spring-loop-b`
- `merchant-spring-loop-c`

Normalized future export timing:
- 2800 ms loop;
- 700 ms/frame;
- 4 frames.

Current static fallback:

`assets/presentation/career-merchant-shift-spring.svg`.

### Hunter autumn

Exact semantic ID:

`job/hunter/shift/autumn/default`

Sequences:
- `hunter-autumn-trail-loop-a`
- `hunter-autumn-trail-loop-b`
- `hunter-autumn-trail-loop-c`

Future candidate keys:
- `hunter-autumn-loop-a`
- `hunter-autumn-loop-b`
- `hunter-autumn-loop-c`

Normalized future export timing:
- 3000 ms loop;
- 750 ms/frame;
- 4 frames.

Current static fallback:

`assets/presentation/career-hunter-shift-autumn.svg`.

Hunter source remains an ordinary career-shift presentation only.

It does not add:
- Forest-route semantics;
- Hunter lore;
- route conditions;
- reward/result implications.

### Artist/Geisha winter

Exact semantic ID:

`job/artist-geisha/shift/winter/default`

Sequences:
- `artist-geisha-winter-rehearsal-loop-a`
- `artist-geisha-winter-rehearsal-loop-b`
- `artist-geisha-winter-rehearsal-loop-c`

Future candidate keys:
- `artist-geisha-winter-loop-a`
- `artist-geisha-winter-loop-b`
- `artist-geisha-winter-loop-c`

Normalized future export timing:
- 3200 ms loop;
- 800 ms/frame;
- 4 frames.

Current static fallback:

`assets/presentation/career-artist-geisha-shift-winter.svg`.

Source remains ordinary calm rehearsal/work presentation only.

No new career mechanic or content fact is introduced.

## Validator v5

File:

`prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v5.test.ts`.

It validates the 36 new frames for:
- exact current semantic IDs from the current presentation catalog;
- exactly 3 sequences per assigned semantic identity;
- exactly 4 ordered frames per sequence;
- consistent `viewBox="0 0 1200 675"`;
- distinct frame source bytes;
- local project-owned SVG source;
- exact presentation/sequence/frame/duration metadata;
- no external URLs/scripts;
- no gameplay/RNG/Save fields;
- no GIF source claim.

## Source manifest v4

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v4.json`.

Important rebase fact:

Current `main` at queue start contains no prior `project-owned-animation-source-manifest-v*.json` and no `assets/presentation-frames/` files.

Therefore v4 is intentionally rebuilt from current main and contains only the 9 sequences physically present on this fresh integration branch.

It does **not** reference stale worker-branch assets from historical queue commit:

`90c6d98d9b310795ffc82370865e856fa466ccc0`.

Manifest v4 records:
- exact semantic IDs;
- stable candidate keys;
- source durations;
- normalized export timing;
- ordered frame paths;
- current static fallbacks;
- `exportReady=true`;
- `gifPath=null`;
- zero actual GIF paths.

## Exact new source files

### Merchant spring
- `assets/presentation-frames/merchant-spring-stall-loop-a-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/merchant-spring-stall-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/merchant-spring-stall-loop-c-frame-01.svg` through `-04.svg`

### Hunter autumn
- `assets/presentation-frames/hunter-autumn-trail-loop-a-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/hunter-autumn-trail-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/hunter-autumn-trail-loop-c-frame-01.svg` through `-04.svg`

### Artist/Geisha winter
- `assets/presentation-frames/artist-geisha-winter-rehearsal-loop-a-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/artist-geisha-winter-rehearsal-loop-b-frame-01.svg` through `-04.svg`
- `assets/presentation-frames/artist-geisha-winter-rehearsal-loop-c-frame-01.svg` through `-04.svg`

## Integration boundary

This queue changes presentation/media source only.

It does not change:
- gameplay mechanics;
- career conditions/effects/rewards;
- gameplay RNG;
- Save schema/state;
- career/content facts;
- relationship/story canon;
- localization architecture;
- shared presentation runtime/schema/UI.

## Production boundary

Source-ready:
**YES — 3 semantic identities / 9 sequences / 36 frames**.

Actual GIF bytes:
**0**.

Production GIF pools:
**0**.

Production animation coverage claim:
**NO**.

A later Lead-assigned export queue must still:
1. integrate/approve exporter tooling if required;
2. export real GIF bytes;
3. validate technical metadata/provenance;
4. prepare accessibility/localization;
5. activate reviewed production pools.
