# Forest + Poverty Next Selective Integration Handoff v2

Status: Chat 3 item 160 handoff for items 149–159.

Worker branch:
`chat3/lumber-production-proof-next`.

Integration rule:
**do not merge this long-lived worker branch wholesale**. Lead should copy reviewed files onto fresh branches from current `main`.

## Current production baseline

Current-main Forest result bilingual production is already shipped through PR #43.

Current-main ordinary-poverty gameplay is already shipped through PR #37.

Current-main localization runtime is shipped through PR #41.

Current-main deterministic 3–5 GIF pool runtime is shipped through PR #42.

This wave adds tests, localization fixtures, coverage ledgers, and Forest presentation/Product-open staging. It does not edit shared runtime/schema/UI.

---

## Files safe for selective copy now

### Ordinary poverty executable tests

1. `prior-work/astra/prototype-m3.2/tests/poverty-localization-natural-path-v2.test.ts`

Purpose:
- naturally reaches shipped street and cheap-lodging events;
- resolves RU+EN from the item-140 delta;
- proves localization lookup does not mutate pending event/variant, RNG, NightFlow, or gameplay Save;
- proves an effectful street reward commits once;
- excludes Secret Debt.

Prerequisite:
copy item-140 `poverty-localization-main-delta-v1.fixture.json` with the test until the same strings are merged into `content/localization.json`.

2. `prior-work/astra/prototype-m3.2/tests/poverty-localization-merge-collision-v1.test.ts`

Purpose:
- guards merge into current `content/localization.json`;
- accepts additive keys or exact-identical duplicates only;
- rejects conflicting RU/EN replacements;
- maps every event/media key to current production identity;
- rejects locale-suffixed gameplay identities and Secret Debt contamination.

3. `prior-work/astra/prototype-m3.2/tests/poverty-locale-invariance-v1.test.ts`

Purpose:
- covers effect-free cheap lodging;
- covers money-producing street help;
- covers next-day Energy pressure;
- proves locale resolution changes presentation only;
- proves housing payment / money / queued Energy effects remain exactly-once across reload;
- proves locale remains outside gameplay Save.

### Ordinary poverty fixtures/docs

4. `docs/poverty-prep/ORDINARY_POVERTY_LOCALIZATION_COVERAGE_LEDGER_v3.md`

Current bounded coverage:
- 14 event titles;
- 20 variant bodies;
- 24 choice labels;
- 24 choice texts;
- 2 shared media alts;
- **84/84 COVERED_RU_EN in the item-140 integration payload**.

It explicitly distinguishes this ready payload from what is already merged on current main.

5. `prior-work/astra/prototype-m3.2/content/poverty-ui-locale-smoke-v1.fixture.json`

Deterministic expected RU/EN presentation for:
- street helpful;
- street pressure;
- cheap lodging;
- recovery/help;
- neutral poverty.

Contains gameplay IDs as references only; no duplicated mechanics.

### Forest current-main test

6. `prior-work/astra/prototype-m3.2/tests/forest-current-main-bilingual-coverage-v4.test.ts`

Validates current-main:
- `lumber.forest` label;
- only the two currently shipped route labels;
- success / escape / failure result reactions;
- title/body/choice/media-alt RU+EN coverage;
- exact `activityResult` identities;
- exact Lumber Hard Work condition/reward.

This test invents no Hunter or Old Boundary semantics.

### Forest route presentation staging

7. `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-content-staging-v2.json`

Contains RU+EN authored presentation staging only for existing shipped route identities:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Includes:
- semantic route-presentation IDs;
- four authored scenes + reaction per route;
- RU+EN text keys;
- 4-candidate media pools;
- real static Forest fallback;
- placeholder GIFs marked `STAGING_ONLY`.

Do not load the placeholder GIF paths into production.

The route-specific semantic presentation IDs are staging identities; current shared presentation runtime still needs an explicit route-option-to-presentation binding before these become active runtime slots.

8. `prior-work/astra/prototype-m3.2/tests/forest-route-content-staging-v2.test.ts`

Validates:
- exactly the current two shipped route IDs;
- no Hunter production route;
- no challenge/gameplay fields;
- stable locale-neutral semantic presentation IDs;
- full RU+EN staging text/alt;
- 3–5 candidate count;
- placeholder media never marked production.

---

## Product-open Forest packets

These files are safe to copy as documentation because they deliberately make no gameplay decision.

9. `docs/lumber-prep/FOREST_HUNTER_TRAIL_PRODUCT_OPEN_STAGING_v3.md`

Consolidates:
- Hunter route concept;
- bilingual scene bank;
- possible current-runtime condition families;
- possible presentation identities;
- exact decisions still required.

Still **not selected**:
- production option ID;
- route state;
- clue fact;
- capability ID;
- provider;
- threshold;
- reward.

10. `docs/lumber-prep/FOREST_CHALLENGE_FAMILY_STAGING_MATRIX_v2.md`

Maps:
- navigation;
- physical obstacle;
- interpretation/ritual anomaly

against runtime primitives already shipped:
- target conditions;
- Activity option `progressDelta` / `enduranceCost`;
- generic event/result effect families.

It also attaches existing RU+EN prose candidates and safe semantic presentation IDs.

Still OPEN:
- challenge gameplay IDs;
- route binding;
- thresholds;
- exact progress/endurance;
- item semantics;
- lore/sample truth;
- rewards.

11. `docs/lumber-prep/FOREST_SEASONAL_TOPOLOGY_PRODUCT_OPEN_MATRIX_v2.md`

Separates:
- seasonal presentation that can ship today;
- actual topology changes requiring explicit `calendarSeason` Activity authoring.

Presentation-ready:
- wet/dry/leaves/snow route treatment;
- seasonal challenge prose;
- seasonal media.

Product-open:
- shortcut/edge IDs;
- spring closures;
- winter frozen passage;
- exact endurance/progress costs;
- challenge placement;
- seasonal rewards.

Prose must not fake a mechanical season difference.

---

## Recommended ordinary-poverty integration sequence

On a fresh branch from current `main`:

1. copy item-140 localization delta;
2. run item-150 collision guard before merge;
3. merge only the accepted `delta.strings` into `content/localization.json`;
4. copy/run items 149 and 153;
5. use item 152 as deterministic UI expectation data;
6. run existing poverty production/reload/NightFlow tests;
7. run full `npm run check`;
8. require exact-head CI;
9. only then update project state as shipped.

No poverty gameplay pack needs modification merely to localize the existing player-facing event text.

## Recommended Forest integration sequence

Current result localization is already shipped.

Next bounded content step:
1. copy item 154 as current-main coverage regression;
2. review item 155 route staging;
3. keep placeholders non-production;
4. decide whether Lead wants route-specific presentation slots/binding;
5. if yes, wire only the existing logging-road and old-boundary route identities;
6. run item 156 plus current Activity/Forest tests;
7. leave Hunter/challenge/season mechanics untouched until Product decisions close them.

## Secret Debt isolation

Nothing in items 149–159 activates Secret Debt.

No file in this wave chooses:
- lender probability;
- principal/debt;
- activation delay;
- hidden-career tuning;
- forced-Night penalty;
- outcome thresholds;
- takeover external dependency;
- Meta rewards.

Ordinary poverty remains independently playable.

The Secret Debt authored RU+EN material from the prior wave remains reusable authoring only.

## Shared ownership boundary

Chat 3 does not own:
- shared localization runtime;
- shared UI renderer;
- shared presentation runtime/schema;
- GIF asset import pipeline.

Therefore:
- route-specific presentation runtime wiring remains Lead/Chat 1 owned;
- actual GIF files remain a media-production/integration concern;
- candidate-alt runtime localization changes remain shared presentation/UI ownership.

## Real independent work remaining

There is still useful independent authoring/test work that does not require reopening shared architecture.

Recommended next **12-task** wave, only if Lead chooses to queue it:

1. ordinary-poverty all-six-pack executable RU+EN natural-path matrix;
2. ordinary-poverty post-merge localization snapshot test against the real merged bundle;
3. ordinary-poverty shared lodging/Night copy inventory for remaining non-event UI strings;
4. Forest logging-road route-scene localization delta fixture;
5. Forest old-boundary route-scene localization delta fixture;
6. Forest route-scene localization collision guard;
7. Forest logging-road presentation natural-path test after Lead route-slot binding exists;
8. Forest old-boundary presentation natural-path test using only the existing capability gate;
9. Forest navigation challenge machine-readable staging fixture;
10. Forest physical challenge machine-readable staging fixture;
11. Forest anomaly challenge machine-readable staging fixture;
12. Secret Debt bilingual localization-key inventory that remains authoring-only and contains no OPEN mechanic values.

Dependencies:
- items 7–8 should only be queued after Lead exposes a real route-specific presentation binding;
- Secret Debt work remains authoring-only until Product closes mechanics;
- no task should invent Hunter or Old Boundary Token decisions.

## Locked invariants

Forest:
- Lumber Hard Work eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact success continuation `activityResult(lumber.forest, success, lumber.forest.success)`.

Ordinary poverty:
- separate from Secret Debt;
- current PR37 mechanics/tuning preserved;
- localization presentation-only.

Media:
- one gameplay identity may own 3–5 candidates;
- candidate selection must not change gameplay outcome;
- placeholders are not shipped art.

## Handoff conclusion

Items 149–159 provide:
- executable poverty locale-path coverage;
- localization collision/invariance guards;
- full shipped-surface coverage accounting;
- deterministic RU+EN UI smoke expectations;
- current-main Forest bilingual coverage;
- bounded logging-road/old-boundary presentation staging;
- Product-open Hunter/challenge/season matrices.

The next integration work should be selective and current-main based, not a branch merge.
