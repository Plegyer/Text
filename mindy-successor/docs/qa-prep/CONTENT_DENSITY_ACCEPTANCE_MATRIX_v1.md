# Content Density Acceptance Matrix v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Define evidence that a repeated gameplay surface has enough authored variation to avoid obvious repetition.

These are production/content targets, not locked mechanics.

Exact counts may vary by surface and production budget.

## Acceptance dimensions

### Text variants

Repeated surfaces should normally have more than one authored text variant unless the surface is intentionally rare or mechanically atomic.

Evidence:
- distinct variant IDs;
- different authored copy;
- no change to mechanical transaction solely because copy differs.

### Event variants

A repeated event family should use multiple variants or adjacent related event families when repetition would otherwise be obvious.

Evidence:
- deterministic or presentation-only selection;
- reload-safe materialization;
- event history/cooldown respected.

### Media candidates

Where animation is useful and the scene repeats frequently, target roughly 3-5 reusable GIF candidates per semantic family.

This is a content target only.

Valid alternatives:
- fewer GIFs plus strong seasonal/context variation;
- static art;
- text fallback;
- shared media pool across multiple semantic IDs.

Do not make 3-5 GIFs a gameplay prerequisite.

### Seasonal/context variation

Repeated work/Night/poverty/Activity surfaces should reflect relevant context such as:
- season;
- route;
- housing;
- teacher/track;
- career stage;
- relationship stage.

Context variation should not imply a new mechanic unless authored.

### Reuse limits

Media reuse is acceptable when:
- semantic IDs remain distinct;
- the reused asset is contextually valid;
- reuse does not make two gameplay identities indistinguishable in data.

Repeated text should not be hidden behind different media only.

## Matrix

| Surface | Minimum content evidence | Stronger production target | Not required |
|---|---|---|---|
| ordinary career shift | multiple text/context variants + seasonal identities | several scene variants per season/context; reusable 3-5 media pool where valuable | unique mechanic per variant |
| School paid lesson | several lesson texts per track | teacher voice + classroom/teacher media pool | changed tuition/stat package |
| School Night study | multiple flavor variants | housing/context-sensitive copy + reusable media | changed Night-study mechanics |
| relationship meeting | more than one repeated-contact scene | stage/context variants + reusable location/character media | romance route for every relationship |
| normal/cheap lodging | visible context distinction | seasonal room variants + small media pool | extra penalty for every scene |
| street poverty | helpful/neutral/pressure diversity | seasonal/context variants + reusable street pools | Secret Debt in ordinary poverty pack |
| Secret Debt future content | repeated work/Night/outcome content families | state-aware text/media variation | guessed balance values |
| Activity route | route-specific scene identity | challenge/context variants + route/challenge media pools | unique engine primitive per scene |
| ending presentation | ending-specific semantic identity + fallback | several presentation beats/media candidates if budget allows | GIF-driven reward timing |

## Repetition-risk bands

Use qualitative evidence only.

### LOW DENSITY

Signs:
- one repeated line;
- one media asset;
- no seasonal/context distinction;
- high-frequency surface.

Action:
CONTENT_DEPTH_OPEN.

### ACCEPTABLE BASE

Signs:
- several text variants;
- clear semantic/context identity;
- valid fallback;
- some reuse but not identity collapse.

Action:
CONTENT_BASE_ACCEPTABLE.

### DEEP CONTENT

Signs:
- multiple event/text variants;
- context/season/stage coverage;
- 3-5 media candidates where appropriate;
- reload-safe selection;
- limited obvious back-to-back repetition.

Action:
CONTENT_DEPTH_GREEN for the reviewed scope.

No numerical score is assigned.

## Career work target

For a high-frequency career shift:
- retain one stable mechanical action;
- provide seasonal semantic identities;
- add multiple authored scene texts over time;
- optionally use 3-5 media candidates per reusable visual family.

Do not create separate mechanics merely to add variety.

## School target

For each of eight tracks:
- several repeatable lesson texts;
- teacher/content identity if accepted;
- static/text fallback;
- optional reusable teacher/classroom GIF pool.

All variants must preserve the same locked course transaction.

## Poverty target

Ordinary poverty should avoid a single repeated “street penalty” card.

Evidence should include:
- helpful;
- neutral;
- pressure;
- seasonal/context variation;
- cheap-lodging distinction;
- recovery/help variation.

Current Chat3 authored wave is structurally aligned with this direction, subject to fresh-main integration.

## Multi-GIF target

3-5 GIF candidates are appropriate when:
- a surface is frequent;
- motion materially improves presentation;
- reuse is visually sensible.

Fewer or zero GIFs are acceptable when:
- static/text is sufficient;
- scene is rare;
- content identity is not yet final.

## Reload acceptance

If text/media candidate is materialized before save:
- gameplay event identity must not reroll;
- effects must not replay;
- presentation selection policy must be documented.

Variant diversity cannot weaken exactly-once behavior.

## Product-lock boundary

The following are not mechanics locks:
- exact number of text variants;
- exact number of GIF candidates;
- exact reuse frequency;
- exact prose;
- art style.

They are production/content quality targets.

## Release reporting

Report repeated surfaces with:
- semantic family;
- text variant count;
- event variant count;
- media candidate count;
- seasonal/context coverage;
- fallback;
- obvious remaining repetition gap.

Do not convert the matrix into a percentage score.

No production runtime/UI/content file was modified by Chat 4.
