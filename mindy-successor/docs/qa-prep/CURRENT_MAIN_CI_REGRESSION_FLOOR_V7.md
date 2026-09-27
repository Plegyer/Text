# Current-main CI regression floor v7

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`1a2f6e428da41e356f8d48df4a72923a5cc1928c`
(PR51 ordinary-poverty copyedit merge, on top of PR50).

## Latest successful main push

Workflow:
- `mindy-successor check`
- run #85
- id `36346898672`
- event: push
- head SHA: `1a2f6e428da41e356f8d48df4a72923a5cc1928c`
- conclusion: SUCCESS

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 323 total;
- 323 pass;
- 0 fail.

## PR51 exact-head corroboration

Accepted PR51 head:
`b90099f6bda958053c1325ec250ea07e7f6fb7c7`.

Workflow:
- run #84;
- id `36346807780`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 323 / 323 tests.

PR51-specific tests PASS:
- exact 33 existing RU+EN poverty copyedit keys;
- ordinary production identity set exact;
- text-only / Secret Debt excluded.

Existing poverty natural-path and RU↔EN pending-scene invariance tests remain green.

## PR50 floor retained

PR50 generic Forest route/default static remains shipped under this main.

Its post-merge evidence:
- merge SHA `f93878b954385a1c61d8a06a0673354207d11d70`;
- run #82;
- 320 / 320;
- same validator 17 / 46 / 35 / 9.

PR51 does not edit presentation mappings or `app.ts`.

## Current localization/media floor

Root localization:
- 403 total keys;
- missing RU: 0;
- missing EN: 0.

The count remains 403 because PR51 replaces 33 existing values rather than adding keys.

Active project-owned static semantic mappings:
`80`.

Unique active project-owned physical sources:
`79`.

Established project-owned static target:
`80 / 80`.

Current app blob:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Current presentation blob:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

## Minimum next integration floor

For the next localization/presentation-only integration, unexpected drift from:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings
is blocking unless separately reviewed.

Existing test count must not drop below:
`323`
without an explicit reviewed reason.

Root project-owned static mapping count must not drop below:
`80`
for a text-only integration.

## Open PR52 note

PR52 legacy root RU+EN integration is not part of current main.

Its current exact head `a47c766...` failed run #86 because a regression references a missing reviewed fixture file.

Do not use PR52's 325-test attempted suite as the current-main floor.

Current authoritative floor remains run #85 on `1a2f6e4...`.

## Locked invariants

Continue to protect:
- Lumber Hard Work eligibility only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- Forest exact success/escape/failure result IDs;
- exact activityResult reaction identities;
- Old Boundary current `enter_old_boundary` gate;
- route/default presentation has no route-specific semantic effect;
- School locale Save invariance;
- ordinary-poverty natural paths and PR51 text-only scope;
- Foreman voluntary Night mechanics;
- generic Night-choice stable-ID localization;
- deterministic presentation selection outside gameplay RNG;
- project-owned static media identity across RU↔EN.

## Future PR evidence

Require:
- exact PR head SHA;
- exact successful full-check run;
- validator counts;
- total/pass/fail tests;
- domain-specific regressions.

Then require successful push CI on the resulting merge SHA.

Do not substitute earlier evidence.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Current floor:
`main 1a2f6e4... / run #85 / 323 of 323 passing / 17 packs, 46 events, 35 actions, 9 endings`.
