# Current-main CI regression floor v9

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`
(PR58 generic labels/hints RU+EN merge, on top of PR57 route presentation seam).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #109;
- id `36406510233`;
- event: push;
- head SHA: `52ddc76148e33836d3161b63bf4c25ffb5c39d02`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 356 total;
- 356 pass;
- 0 fail.

## PR58 exact-head corroboration

Accepted PR58 head:
`923e9b0d90ea6f20ed453a43ea0d98e0a6ae4a19`.

Run #108 / id `36406325995`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 356 / 356 tests.

Relevant PASS:
- 49-key generic-label production fixture fully merged RU+EN;
- generic-label consumer wiring;
- presentation-only patch invariant;
- Stats/Bag RU↔EN Save-invariance renderer smoke;
- pending encounter identity invariance;
- retained Forest route seam, Journal stable-ref and Hard Work regressions.

## PR57 floor retained

PR57 merged as:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`.

Run #106:
- SUCCESS;
- 351/351;
- validator 17/46/35/9.

Current 356-test suite retains:
- exact route-specific semantic IDs;
- neutral default fallback;
- route-state UI Save-invariance;
- exact Forest activityResult boundaries;
- exact Lumber Hard Work 50-shift rule.

## PR56 floor retained

PR56 merged as:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Run #104:
- SUCCESS;
- 347/347;
- validator 17/46/35/9.

Current suite retains the 108-key global-shell production and RU↔EN shell regressions.

## Localization floor

Current root localization blob:
`5280ea702332210ed914d5765b02753e0f5bef61`.

Current root localization:
`658` keys.

Missing RU:
`0`.

Missing EN:
`0`.

PR58 adds 28 reviewed domain/generic-label keys while retaining 21 exact-identical reviewed fixture keys already present.

## Static/presentation floor

Root presentation blob:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

Active project-owned static root mappings:
`80`.

Unique active project-owned physical sources:
`79`.

Established static target:
`80 / 80`.

Root route static override remains:
`activity/forest/route/default`.

PR57-generated route-specific semantic slots remain active and safely fall back to the default until specific media is integrated.

## Current app floor

Current app blob:
`25a23d5fe80a4ca9a2cb991add67eb92c9b516a6`.

Shipped presentation consumers now include:
- PR56 remaining global shell/condition grammar;
- PR57 route-state presentation seam;
- PR58 generic stat/hint/resource/item labels and encounter/inactive-run shell;
- prior PR54 Journal/outcome stable refs;
- prior PR55 shared Night/lodging UI.

## Journal/outcome compatibility floor

Retained:
- locale-neutral event-choice refs;
- aligned `journalRefs`;
- old schema-4 missing-ref compatibility;
- no fuzzy prose migration;
- School course-result priority;
- locale-only ref-backed Journal/result rendering with unchanged Save.

Run #109 retains the Journal/lastAction stable-ref renderer test.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- existing test count does not drop below 356;
- failures remain 0;
- root localization does not silently lose current 658 keys;
- active project-owned static root mappings remain at least 80;
- static target remains 80/80;
- route-specific semantic slots retain default fallback safety.

## Locked invariants

Protect:
- Lumber Hard Work eligibility only `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`;
- exact Forest success/escape/failure result IDs;
- exact activityResult reactions;
- Old Boundary current `enter_old_boundary` gate;
- route presentation derivation performs no Save/RNG/result mutation;
- generic labels do not change stat/resource/item/housing IDs or economics;
- School locale Save invariance;
- poverty natural paths;
- Journal stable-ref compatibility;
- Night lodging costs/effects;
- presentation selection independent of gameplay RNG.

## Current route-specific visual state

The route semantic seam is shipped.

Specific root visual overrides are not yet shipped.

Current Chat2 replacement route SVGs are QA-green source candidates, but any later visual integration must preserve:
- exact route-specific semantic IDs;
- `activity/forest/route/default` fallback;
- locale-neutral media identity;
- Product-open isolation.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative floor:
`main 52ddc76... / run #109 / 356 of 356 passing / 17 packs, 46 events, 35 actions, 9 endings / 658 bilingual root keys / static 80 of 80`.
