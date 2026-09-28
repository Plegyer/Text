# Current Chat 2 task pointer

Status: ASSIGNED
Owner: Chat 2 / Presentation & Media Worker
Queue: **352–363**
Queue size: **12**
Role contract: `mindy-successor/docs/tasks/CHAT2_MANDATORY_ROLE_PROMPT.md`

## Current baseline

This pointer was published on current `main` after PR #62 and after the Chat 2 role contract.

Historical queue source:
- old worker branch: `chat2/presentation-replacement-next`
- queue commit: `90c6d98d9b310795ffc82370865e856fa466ccc0`

Do **not** continue that stale branch as the integration source.

Start a fresh Chat 2 branch from current `main` for items 352–363.

## Queue item 352 — merchant spring animation source sequence A v1

Create NEW original SVG frame sources only under:
- `mindy-successor/prior-work/astra/prototype-m3.2/assets/presentation-frames/`

Create one 4-frame project-owned source sequence for exact current semantic ID:
- `job/merchant/shift/spring/default`

No GIF claim and no gameplay semantics beyond the shipped static scene.

## Queue item 353 — merchant spring animation source sequence B v1

Create a second distinct 4-frame source sequence for:
- `job/merchant/shift/spring/default`

## Queue item 354 — merchant spring animation source sequence C v1

Create a third distinct 4-frame source sequence for:
- `job/merchant/shift/spring/default`

## Queue item 355 — hunter autumn animation source sequence A v1

Create one 4-frame project-owned source sequence for exact current semantic ID:
- `job/hunter/shift/autumn/default`

No Forest-route/Hunter lore expansion.

## Queue item 356 — hunter autumn animation source sequence B v1

Create a second distinct 4-frame source sequence for:
- `job/hunter/shift/autumn/default`

## Queue item 357 — hunter autumn animation source sequence C v1

Create a third distinct 4-frame source sequence for:
- `job/hunter/shift/autumn/default`

## Queue item 358 — artist-geisha winter animation source sequence A v1

Create one 4-frame project-owned source sequence for exact current semantic ID:
- `job/artist-geisha/shift/winter/default`

No new career mechanics or content facts.

## Queue item 359 — artist-geisha winter animation source sequence B v1

Create a second distinct 4-frame source sequence for:
- `job/artist-geisha/shift/winter/default`

## Queue item 360 — artist-geisha winter animation source sequence C v1

Create a third distinct 4-frame source sequence for:
- `job/artist-geisha/shift/winter/default`

## Queue item 361 — expanded animation source validator v5

Create NEW test only:
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/project-owned-animation-frames-v5.test.ts`

Validate all new sequences from items 352–360:
- exact current semantic IDs;
- 4 ordered frames per sequence;
- consistent dimensions/viewBox per sequence;
- no external URLs/scripts;
- no gameplay/RNG/Save fields;
- project-owned only.

## Queue item 362 — additional export-ready source manifest v4

Create NEW file only:
- `mindy-successor/prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-animation-source-manifest-v4.json`

Add the 9 new sequences to the current source manifest with:
- exact semantic IDs;
- candidate keys;
- ordered frame paths;
- timing targets;
- static fallbacks.

## Queue item 363 — additional career animation source handoff v11

Create NEW file only:
- `mindy-successor/docs/presentation-prep/ADDITIONAL_CAREER_ANIMATION_SOURCE_HANDOFF_V11.md`

Consolidate items 352–362 and identify exact current semantic IDs that now have 3 compatible source sequences ready for future GIF export.

## Acceptance / handoff

Complete items 352–363 sequentially.

Before claiming completion:
1. work from a fresh branch based on current `main`;
2. run the new validator plus relevant existing presentation/media checks;
3. run the full project check if the environment permits it;
4. open a PR against `main`;
5. report exact head SHA and PR number.

No active PR = queue remains draft/non-deliverable.

Do not claim GIF bytes were produced unless a later Lead task explicitly asks for export and verifies the output.
