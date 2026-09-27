# Project-Owned Static Media Integration Handoff v1

Scope: Chat 2 items **184–194**.

Semantic baseline audited against current `main`:
`ab53da4059e348734703c2de490e43e94c02b057`.

Worker branch:
`chat2/presentation-replacement-next`.

## Executive result

This queue successfully pivots presentation coverage from uncertain web GIF sourcing to **21 original project-authored SVG assets**.

The new static layer covers **39 current production semantic mappings** without any shared runtime/schema/UI edit.

Nothing is root-loaded automatically. Lead can selectively copy the physical assets plus the manifest/localization/test onto a fresh integration branch from current main.

Final GIF production remains a later presentation phase.

## Item 184 — production plan

File:
`docs/presentation-prep/PROJECT_OWNED_STATIC_MEDIA_PRODUCTION_PLAN_v1.md`

Defines:
- original project-owned vector production;
- source root `assets/presentation/`;
- current visual language;
- RU/EN text separation;
- no gameplay/runtime ownership;
- explicit path toward later GIF replacement.

Commit:
`f102747754aff3f651d1b59437308e7ad26bed72`.

## Items 185–186 — ordinary career result assets

### Batch A — commit `376fd9c95630deda01b1a86036c0edd077543b69`

- `assets/presentation/career-lumber-result.svg`
- `assets/presentation/career-satyr-maid-result.svg`
- `assets/presentation/career-undead-farm-result.svg`
- `assets/presentation/career-tavern-result.svg`
- `assets/presentation/career-hunter-result.svg`

### Batch B — commit `4bf85476f74c548339755914155bc3d3cf31bd58`

- `assets/presentation/career-guard-result.svg`
- `assets/presentation/career-merchant-result.svg`
- `assets/presentation/career-artist-geisha-result.svg`
- `assets/presentation/career-assassin-result.svg`
- `assets/presentation/career-prostitute-result.svg`

Each asset maps only to the corresponding current:

`job/<career>/result/default`.

The 40 seasonal shift slots keep their current generic static fallbacks. This queue does not silently remap them.

## Item 187 — reachable School assets

Commit:
`52a619377f8e4e7c280903ab05c29c92dd7d4314`.

Files:
- `assets/presentation/school-day-study.svg`
- `assets/presentation/school-night-study.svg`

Day asset maps to:
- all 8 current reachable `school/<track>/lesson/default` IDs;
- `location/town/event/school-lesson-content-v1-after-school/default`;
- `location/town/event/school-life-content-v1-after-paid-lesson/default`.

Night asset maps only to:
- `location/town/event/school-life-content-v1-after-night-study/default`.

Teacher-specific staged media identities remain Product-open/STAGED and are not promoted.

## Item 188 — ordinary-poverty assets

Commit:
`fb2d3178cccadae9e921704f0e7003f337ab75f6`.

Files:
- `assets/presentation/poverty-street.svg`
- `assets/presentation/poverty-cheap-lodging.svg`
- `assets/presentation/poverty-recovery-help.svg`
- `assets/presentation/poverty-pressure.svg`

The four family assets cover all 10 current ordinary-poverty production event IDs.

Secret Debt is excluded.

## Item 189 — Forest result assets

Commit:
`9fdfe8f6f40307c9a0acead5fa3cedeaa0f805dc`.

Files:
- `assets/presentation/forest-result-success.svg`
- `assets/presentation/forest-result-escape.svg`
- `assets/presentation/forest-result-failure.svg`

Each outcome-specific SVG maps to:
- the matching `activity/forest/return/<outcome>` identity;
- the matching PR43 `job/lumber/event/forest-result-content-v1-<outcome>/default` reaction identity.

No Hunter/Old Boundary/challenge semantic is created.

The neutral route `activity/forest/route/default` intentionally remains on the existing generic forest fallback.

## Item 190 — Foreman relationship/Night assets

Commit:
`57c4158d38ea075e0aa3bdb6888256b7de248b79`.

Files:
- `assets/presentation/foreman-professional.svg`
- `assets/presentation/foreman-night-professional.svg`

Mapped current identities:
- `relationship/lumber-foreman/lumber-foreman-notice/default`;
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`.

No new relationship stage/route is authored.

## Item 191 — mapping manifest

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-static-media-v1.json`

Commit:
`f0e6d3ce40fa844a945b061e4ab149bdb1723979`.

Manifest state:
- physical SVGs: **21**;
- semantic mappings: **39**;
- all paths under `assets/presentation/`;
- presentation-only;
- `STAGING_ONLY_NOT_ROOT_LOADED`;
- no gameplay conditions/effects/rewards.

The manifest is the selective-integration source of mapping truth for this batch.

## Item 192 — RU+EN accessibility delta

File:
`prior-work/astra/prototype-m3.2/content/project-owned-static-media-localization-v1.fixture.json`

Commit:
`a0735b334ffd9ade7a2bdb20beb9a5ea0be04049`.

Contains:
- 21 RU+EN alt entries;
- 21 RU+EN caption entries;
- total localization keys: **42**;
- locale-neutral asset/semantic identity;
- no candidate/media reroll behavior.

This is a fixture/delta, not automatically root-loaded localization.

## Item 193 — build/distribution contract

File:
`prior-work/astra/prototype-m3.2/tests/project-owned-static-media-build-v1.test.ts`

Commit:
`41d54080fbcd382f143b5b67a3d0f972b334a81a`.

The test validates:
- all 21 manifest paths physically exist;
- each file is non-empty SVG text;
- 1200×675 viewBox contract;
- no embedded script/external media URL;
- semantic IDs resolve through current production `presentationSlots`;
- every manifest localization key has RU+EN fixture text;
- normal build copies every file to `dist/assets/presentation/`;
- built bytes equal source bytes;
- manifest contains no gameplay-owned fields;
- no staging/placeholder/data/external media path.

The test is authored on the long-lived worker branch. Lead should run it on the fresh selective-integration head and require exact-head CI rather than treating worker-branch age as CI evidence.

## Item 194 — coverage ledger

File:
`docs/presentation-prep/PROJECT_OWNED_STATIC_FALLBACK_COVERAGE_v1.md`

Commit:
`86dac474389dd014c55409adcb5f614f87cc8725`.

Coverage summary:
- **39 UNIQUE_PROJECT_OWNED** current production semantic mappings;
- **41 GENERIC_EXISTING** mappings explicitly retained in scope:
  - 40 ordinary-career seasonal shifts;
  - Forest route;
- **0 MISSING** in the targeted production static-fallback scope;
- **8 PRODUCT_OPEN** staged School teacher media identities.

## Provenance

The 21 SVG assets are original geometric/vector compositions authored directly for this repository queue.

They:
- contain no copied external vector path;
- embed no external raster media;
- use no third-party character/trademark;
- contain no visible RU/EN text.

Recommended provenance ledger description:

`project-authored original SVG; created directly in Plegyer/Text presentation-production work`.

If Lead maintains a separate legal/asset registry, these files should be entered there as project-origin media.

## Selective integration order

The worker branch remains strongly diverged. **Do not merge it wholesale.**

On a fresh branch from exact current main:

1. copy the 21 files from `assets/presentation/`;
2. copy `project-owned-static-media-v1.json`;
3. copy `project-owned-static-media-localization-v1.fixture.json`;
4. copy `project-owned-static-media-build-v1.test.ts`;
5. optionally copy the plan and coverage ledger as production documentation;
6. decide how/where Lead wants to activate static slot overrides using existing presentation runtime;
7. wire the reviewed RU+EN alt/caption keys through the existing localization seam;
8. run the targeted test;
9. run full `npm run check`;
10. require exact-head GitHub CI before merging activation.

Items 184–194 do not require a new presentation runtime feature.

## Exact selective-copy files

### Assets

- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-day-study.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-night-study.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-cheap-lodging.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-help.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-result-success.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-result-escape.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-result-failure.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-professional.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-night-professional.svg`

### Data/test

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-static-media-v1.json`
- `prior-work/astra/prototype-m3.2/content/project-owned-static-media-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-static-media-build-v1.test.ts`

### Documentation

- `docs/presentation-prep/PROJECT_OWNED_STATIC_MEDIA_PRODUCTION_PLAN_v1.md`
- `docs/presentation-prep/PROJECT_OWNED_STATIC_FALLBACK_COVERAGE_v1.md`
- this handoff.

## What waits for final GIF production

Still intentionally deferred:
- 3–5 real GIF pools;
- animations for ordinary-career shifts/results;
- dynamic poverty/School/Forest pools;
- GIF optimization/provenance for future real animation bytes;
- any Product-open School teacher media activation.

The new SVGs should remain valid static/animations-off fallbacks even after real GIF pools arrive.

## Final status

Original static media production:
**COMPLETE FOR ITEMS 185–190**.

Project-owned SVG files:
**21**.

Current semantic mappings prepared:
**39**.

Shared runtime/schema/UI changes:
**0**.

Targeted static fallback gaps:
**0 MISSING**.

Final animation phase:
**DEFERRED / NOT REQUIRED FOR THIS STATIC INTEGRATION**.
