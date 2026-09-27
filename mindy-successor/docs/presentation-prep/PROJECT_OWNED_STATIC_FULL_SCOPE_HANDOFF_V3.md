# Project-Owned Static Full-Scope Handoff v3

Scope: Chat 2 items **208–218** plus the prior ordinary-career result/seasonal static work.

Semantic baseline for the current non-career audit:
`main@c0763f9f9fa9887593fe8567165bbedce2b6cd3a`.

Worker branch:
`chat2/presentation-replacement-next`.

## Full-scope result

Target production semantic identities audited:
- 10 ordinary careers: 50 result/seasonal-shift IDs;
- reachable School: 11 IDs;
- ordinary poverty: 10 IDs;
- Forest: 7 production presentation IDs;
- Foreman relationship/Night: 2 IDs.

Total targeted current production presentation IDs:
**80**.

Recommended static coverage state:
- **79 UNIQUE_PROJECT_OWNED** semantic mappings;
- **1 GENERIC_EXISTING** semantic mapping: `activity/forest/route/default`;
- **0 MISSING**.

Additional `PRODUCT_OPEN` identities/assets:
- 8 staged teacher-specific School media identities;
- 2 Forest gameplay route-option assets (`forest.route.logging-road`, `forest.route.old-boundary`) because current main exposes only the shared `activity/forest/route/default` presentation slot.

## Physical project-owned asset inventory

Current worker tree under `assets/presentation/`:
**90 SVG files**.

Of those:
- 78 are recommended current production static assets for the 79 project-owned semantic mappings;
- 2 are route-specific `PRODUCT_OPEN` Forest assets awaiting a route-specific presentation seam;
- 10 are earlier project-owned assets superseded by later one-to-one/refined mappings but retained as non-runtime source history/staging.

No external media dependency is embedded in these SVGs.

## Ordinary careers

### Results

The 10 result/default identities remain one-to-one with:
- `career-<career>-result.svg`.

### Seasonal shifts

All 40 current:
`job/<career>/shift/<spring|summer|autumn|winter>/default`

have one-to-one project-owned seasonal SVGs:
- `career-<career>-shift-<season>.svg`.

Career result + seasonal scope:
**50 / 50 UNIQUE_PROJECT_OWNED**.

## School

### Eight current course lesson IDs

Items 209 creates one asset per course:
- Literacy & Numbers;
- Arcana;
- Rhetoric & Social;
- Etiquette & Presentation;
- Field Craft;
- Physical Training;
- Arts & Performance;
- Body Confidence.

Each maps one-to-one to its current:
`school/<course>/lesson/default`.

### Generic daytime reactions

The two current generic daytime reaction IDs continue to use the prior project-owned:

`assets/presentation/school-day-study.svg`.

Those IDs are:
- `location/town/event/school-lesson-content-v1-after-school/default`;
- `location/town/event/school-life-content-v1-after-paid-lesson/default`.

### Generic Night-study

Item 210 refines:
`location/town/event/school-life-content-v1-after-night-study/default`

to:
`assets/presentation/school-night-study-generic-v2.svg`.

### School Product-open boundary

The 8 teacher-specific staged media identities remain `PRODUCT_OPEN`. They are not current production presentation slots and are not promoted by this handoff.

## Ordinary poverty

Items 211–213 replace prior family-shared art with one-to-one static assets for all 10 shipped ordinary-poverty event presentation IDs:
- 3 street;
- 1 cheap lodging;
- 3 recovery/help;
- 3 pressure.

Secret Debt remains excluded.

Ordinary-poverty result:
**10 / 10 UNIQUE_PROJECT_OWNED**.

No lodging/gameplay mechanics are changed.

## Forest

### Current production route presentation

Current main has one route presentation semantic ID:

`activity/forest/route/default`.

It remains:
**GENERIC_EXISTING**
with shipped static forest media.

### Route-option gameplay identities

Current Activity options include:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Item 214 created:
- `assets/presentation/forest-route-logging-road.svg`;
- `assets/presentation/forest-route-old-boundary.svg`.

But current main does **not** expose:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Therefore both route-specific assets remain `PRODUCT_OPEN` and must not be activated by inventing semantic IDs. The shared current route slot remains authoritative until Lead/runtime ownership provides an exact route-specific presentation seam.

### Returns vs PR43 reactions

Item 215 improves the previous shared-outcome fallback model into six one-to-one assets:

Activity return:
- `forest-return-success-v2.svg`;
- `forest-return-escape-v2.svg`;
- `forest-return-failure-v2.svg`.

PR43 reaction:
- `forest-reaction-success-v2.svg`;
- `forest-reaction-escape-v2.svg`;
- `forest-reaction-failure-v2.svg`.

Thus the six result/reaction production semantic IDs are:
**6 / 6 UNIQUE_PROJECT_OWNED**.

No Hunter/challenge/token semantic is introduced.

## Foreman relationship / Night

Item 216 refines the two shipped Foreman presentation IDs with:
- `foreman-professional-milestone-v2.svg`;
- `foreman-night-voluntary-v2.svg`.

Coverage:
**2 / 2 UNIQUE_PROJECT_OWNED**.

No new relationship stage/route is introduced.

## Current non-career manifest v2

File:
`prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-non-career-static-media-v2.json`.

Contains:
- 29 physical asset records from items 209–216;
- 27 exact production semantic mappings;
- 2 `PRODUCT_OPEN` route-option records;
- current shared route presentation ID recorded for those two route records;
- no invented route-specific presentation IDs;
- no root-load claim.

The two generic daytime School reaction mappings remain represented by the prior static-media v1 data because item 209 intentionally targets only the eight course lesson identities.

## RU + EN accessibility

Latest non-career fixture:
`prior-work/astra/prototype-m3.2/content/project-owned-non-career-static-localization-v2.fixture.json`.

It provides RU+EN alt/caption strings for all 29 new/refined item-209–216 assets, including the two Product-open route assets.

Prior career and seasonal accessibility fixtures remain applicable to their corresponding manifests.

Media paths and semantic identities remain locale-neutral.

## Build regression

Latest test:
`prior-work/astra/prototype-m3.2/tests/project-owned-non-career-static-build-v2.test.ts`.

It validates:
- 29 actual physical SVGs;
- 27 exact current production presentation IDs;
- 2 truthful Product-open Forest route records;
- SVG sanity;
- RU+EN accessibility coverage;
- no external URLs;
- no mechanics/effects/reward/save payload;
- normal build copy under `dist/assets/presentation/`.

Earlier career/static tests remain relevant:
- `tests/project-owned-static-media-build-v1.test.ts`;
- `tests/project-owned-seasonal-static-build-v1.test.ts`.

## Exact selective-copy asset list

- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-artist-geisha-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-assassin-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-guard-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-hunter-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-lumber-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-merchant-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-prostitute-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-satyr-maid-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-tavern-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-result.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-spring.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/career-undead-farm-shift-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-night-professional.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-night-voluntary-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-professional-milestone-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-professional.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-reaction-escape-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-reaction-failure-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-reaction-success-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-result-escape.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-result-failure.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-result-success.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-return-escape-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-return-failure-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-return-success-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-logging-road.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-cheap-lodging.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-cheap-shared-quiet-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure-cold-rain.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure-muddy-splash.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure-noisy-loading.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-help.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-herb-bundle.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-short-cleanup.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-small-coin-help.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street-helpful-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street-neutral-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street-pressure-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-arcana.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-arts-and-performance.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-body-confidence.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-etiquette-and-presentation.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-field-craft.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-literacy-and-numbers.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-physical-training.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-rhetoric-and-social.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-day-study.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-night-study-generic-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-night-study.svg`

## Exact selective-copy data/test list

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-static-media-v1.json`
- `prior-work/astra/prototype-m3.2/content/project-owned-static-media-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-static-media-build-v1.test.ts`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-seasonal-static-media-v1.json`
- `prior-work/astra/prototype-m3.2/content/project-owned-seasonal-static-localization-v1.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-seasonal-static-build-v1.test.ts`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/project-owned-non-career-static-media-v2.json`
- `prior-work/astra/prototype-m3.2/content/project-owned-non-career-static-localization-v2.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/project-owned-non-career-static-build-v2.test.ts`

The v1 static manifest contains earlier non-career rows that are superseded by v2 refinements. Lead should use v1 for the still-current career-result and generic daytime-School mappings, and use v2 for refined School Night, poverty, Forest return/reaction and Foreman mappings.

## Exact current mapping precedence for integration

1. ordinary career results -> static-media v1 career-result rows;
2. ordinary career seasonal shifts -> seasonal-static-media v1;
3. School eight course lessons -> non-career v2;
4. School generic daytime reactions -> static-media v1 `school-day-study`;
5. School generic Night-study -> non-career v2;
6. ordinary poverty -> non-career v2 one-to-one assets;
7. Forest route/default -> keep current shipped generic fallback;
8. Forest return/reaction -> non-career v2 one-to-one v2 assets;
9. Foreman milestone/Night -> non-career v2 v2 assets;
10. Forest route-option-specific assets -> keep Product-open until exact presentation seam exists.

## Selective integration procedure

Do not merge the long-lived worker branch wholesale.

On a fresh branch from exact current main:

1. copy the required project-owned SVG files;
2. copy the three mapping manifests and their RU+EN fixtures/tests;
3. apply the mapping precedence above rather than activating superseded v1 non-career rows;
4. do not activate the two route-specific Product-open assets against invented IDs;
5. wire reviewed static overrides through the already shipped presentation seam;
6. wire RU+EN alt/caption strings through the existing localization seam;
7. run all three project-owned static regression tests;
8. run full project checks;
9. visually inspect representative rendered assets;
10. require exact-head CI before merge.

## Remaining classifications

Within the targeted current production presentation scope:
- `UNIQUE_PROJECT_OWNED`: **79**;
- `GENERIC_EXISTING`: **1**;
- `MISSING`: **0**.

Product-open outside exact production presentation mapping:
- 8 staged School teacher media identities;
- 2 route-specific Forest option assets.

## Final-GIF-only work

Static production no longer needs to block the targeted surfaces.

Remaining media work that is genuinely final-animation work:
- real GIF byte production;
- 3–5 candidate pools;
- GIF provenance/optimization;
- animation-on candidate selection acceptance;
- final visual replacement/augmentation while retaining these SVGs as animations-off fallbacks.

No gameplay/runtime/schema/UI change is included in this handoff.
