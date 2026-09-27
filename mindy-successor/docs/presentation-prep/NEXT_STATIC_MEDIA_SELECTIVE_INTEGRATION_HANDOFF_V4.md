# Next Static-Media Selective Integration Handoff v4

Exact current-main baseline:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Worker branch:
`chat2/presentation-replacement-next`.

## Incremental production package now safe for Lead

Current main already includes PR47 and PR48:
- 21 original PR47 project-owned SVGs;
- 40 seasonal career SVGs from PR48;
- 40 seasonal mappings;
- 80 seasonal RU+EN keys.

Therefore **do not selectively copy seasonal assets again**.

The remaining safe incremental static package contains:

- 27 non-career refinement SVGs from item 224;
- 1 shared Forest route/default SVG from item 227;
- total physical incremental assets: **28**;
- total exact current semantic mappings: **28**.

## Exact incremental asset list

- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-night-voluntary-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/foreman-professional-milestone-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-reaction-escape-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-reaction-failure-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-reaction-success-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-return-escape-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-return-failure-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-return-success-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-default-v1.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-cheap-shared-quiet-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure-cold-rain.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure-muddy-splash.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-pressure-noisy-loading.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-herb-bundle.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-short-cleanup.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-recovery-small-coin-help.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street-helpful-summer.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street-neutral-autumn.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/poverty-street-pressure-winter.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-arcana.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-arts-and-performance.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-body-confidence.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-etiquette-and-presentation.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-field-craft.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-literacy-and-numbers.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-physical-training.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-course-rhetoric-and-social.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/school-night-study-generic-v2.svg`

## Exact mapping list

| Current semantic presentation ID | Incremental project-owned asset |
| --- | --- |
| `activity/forest/return/escape` | `assets/presentation/forest-return-escape-v2.svg` |
| `activity/forest/return/failure` | `assets/presentation/forest-return-failure-v2.svg` |
| `activity/forest/return/success` | `assets/presentation/forest-return-success-v2.svg` |
| `activity/forest/route/default` | `assets/presentation/forest-route-default-v1.svg` |
| `job/lumber/event/forest-result-content-v1-escape/default` | `assets/presentation/forest-reaction-escape-v2.svg` |
| `job/lumber/event/forest-result-content-v1-failure/default` | `assets/presentation/forest-reaction-failure-v2.svg` |
| `job/lumber/event/forest-result-content-v1-success/default` | `assets/presentation/forest-reaction-success-v2.svg` |
| `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | `assets/presentation/poverty-cheap-shared-quiet-autumn.svg` |
| `location/town/event/poverty-pressure-production-cold-rain/default` | `assets/presentation/poverty-pressure-cold-rain.svg` |
| `location/town/event/poverty-pressure-production-muddy-splash/default` | `assets/presentation/poverty-pressure-muddy-splash.svg` |
| `location/town/event/poverty-pressure-production-noisy-loading/default` | `assets/presentation/poverty-pressure-noisy-loading.svg` |
| `location/town/event/poverty-recovery-production-herb-bundle/default` | `assets/presentation/poverty-recovery-herb-bundle.svg` |
| `location/town/event/poverty-recovery-production-short-cleanup/default` | `assets/presentation/poverty-recovery-short-cleanup.svg` |
| `location/town/event/poverty-recovery-production-small-coin-help/default` | `assets/presentation/poverty-recovery-small-coin-help.svg` |
| `location/town/event/poverty-street-production-helpful-summer/default` | `assets/presentation/poverty-street-helpful-summer.svg` |
| `location/town/event/poverty-street-production-neutral-autumn/default` | `assets/presentation/poverty-street-neutral-autumn.svg` |
| `location/town/event/poverty-street-production-pressure-winter/default` | `assets/presentation/poverty-street-pressure-winter.svg` |
| `location/town/event/school-life-content-v1-after-night-study/default` | `assets/presentation/school-night-study-generic-v2.svg` |
| `relationship/lumber-foreman/lumber-foreman-notice/default` | `assets/presentation/foreman-professional-milestone-v2.svg` |
| `relationship/lumber-foreman/lumber-night-foreman-professional/default` | `assets/presentation/foreman-night-voluntary-v2.svg` |
| `school/arcana/lesson/default` | `assets/presentation/school-course-arcana.svg` |
| `school/arts-and-performance/lesson/default` | `assets/presentation/school-course-arts-and-performance.svg` |
| `school/body-confidence/lesson/default` | `assets/presentation/school-course-body-confidence.svg` |
| `school/etiquette-and-presentation/lesson/default` | `assets/presentation/school-course-etiquette-and-presentation.svg` |
| `school/field-craft/lesson/default` | `assets/presentation/school-course-field-craft.svg` |
| `school/literacy-and-numbers/lesson/default` | `assets/presentation/school-course-literacy-and-numbers.svg` |
| `school/physical-training/lesson/default` | `assets/presentation/school-course-physical-training.svg` |
| `school/rhetoric-and-social/lesson/default` | `assets/presentation/school-course-rhetoric-and-social.svg` |

## Incremental data/localization/tests

### Non-career safe subset
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/non-career-safe-production-subset-v3.json`
- `prior-work/astra/prototype-m3.2/content/non-career-safe-static-localization-v3.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/non-career-static-current-main-collision-v3.test.ts`

This package refines existing same-semantic current-main mappings:
- 8 School course lesson IDs;
- 1 generic School Night-study ID;
- 10 ordinary-poverty event IDs;
- 6 Forest return/reaction IDs;
- 2 Foreman IDs.

### Shared Forest route/default
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-default-v1.svg`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-default-static-v1.json`

This fills the one remaining targeted generic static surface:
`activity/forest/route/default`.

## Seasonal reconciliation files — evidence only

Current main PR48 already ships the seasonal work.

These files are now **NO-OP reconciliation evidence**, not an integration patch:
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/seasonal-static-incremental-production-v2.json`;
- `prior-work/astra/prototype-m3.2/content/seasonal-static-incremental-localization-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/seasonal-static-current-main-collision-v2.test.ts`.

The manifest records 40 mappings as `ALREADY_SHIPPED_CURRENT_MAIN`.
The localization delta contains 0 new keys because current root already has all 80.
The regression verifies current-root identity rather than adding overrides.

## Product-open exclusions

Do **not** integrate these route-specific assets into current root presentation:
- `assets/presentation/forest-route-logging-road.svg`;
- `assets/presentation/forest-route-old-boundary.svg`.

Current main still has no exact route-specific presentation IDs for them.

Do not invent:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Also excluded:
- staged `school/teacher/*` media identities;
- Secret Debt presentation work;
- Hunter/token/challenge Forest semantics.

## Localization integration

For item 224:
use only the 54 RU+EN keys in:
`content/non-career-safe-static-localization-v3.fixture.json`.

Those keys were absent from the current root localization at the audited baseline.

For item 228:
add the two provided RU+EN keys:
- `presentation.static.forest.route.default.alt`;
- `presentation.static.forest.route.default.caption`.

Media identity remains locale-neutral.

## Static coverage effect

Before this package on current main:
- UNIQUE_PROJECT_OWNED: **79**;
- GENERIC_EXISTING: **1**;
- MISSING: **0**.

After selective integration of the shared route/default asset:
- UNIQUE_PROJECT_OWNED: **80**;
- GENERIC_EXISTING: **0**;
- MISSING: **0**.

The 27 non-career refinements improve semantic specificity but do not change the numeric coverage total.

## Selective integration order

On a fresh branch from exact current main:

1. copy the 27 safe non-career SVGs;
2. copy `non-career-safe-production-subset-v3.json`;
3. copy `non-career-safe-static-localization-v3.fixture.json`;
4. copy `non-career-static-current-main-collision-v3.test.ts`;
5. copy `forest-route-default-v1.svg`;
6. copy `forest-route-default-static-v1.json`;
7. apply only same-semantic static mapping refinements;
8. add only localization keys absent from current root;
9. keep route-option-specific Product-open assets out;
10. run targeted collision/build tests and full project checks;
11. require exact-head CI before merge.

## Retention

Do not delete currently shipped PR47 files when refinement mappings are activated.

Use:
`docs/presentation-prep/STATIC_ASSET_SUPERSESSION_RETENTION_LEDGER_V1.md`

to retain prior static files as source history / rollback material when no current slot references them.

## Remaining work

After this static package, targeted static fallback coverage is closed.

Remaining presentation-production work is primarily:
- final real GIF assets;
- 3–5 candidate pools;
- GIF provenance/optimization;
- animation-on acceptance.

No shared gameplay/runtime/schema/UI change is required by this handoff.
