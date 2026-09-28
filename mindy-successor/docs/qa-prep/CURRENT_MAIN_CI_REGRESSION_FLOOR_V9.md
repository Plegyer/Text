# Current-main CI regression floor v9

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`df0119fd6574b69ab89cf1a99ae77adae3d811f1`
(PR57 Forest route-specific presentation seam merge).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #106;
- id `36405622065`;
- event: push;
- head SHA: `df0119fd6574b69ab89cf1a99ae77adae3d811f1`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 351 total;
- 351 pass;
- 0 fail.

## PR57 exact-head corroboration

Accepted PR57 head:
`138c9889daf8e63dc280b1868e0e868a638111e1`.

Run #105 / id `36405377265`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 351 / 351 tests.

Relevant PASS:
- exact Forest route-specific semantic IDs with neutral fallback;
- route-specific IDs resolve through shipped neutral default;
- presentation helper is read-only;
- renderer follows route state without Save drift;
- exact Forest activityResult boundaries;
- Lumber Hard Work remains exactly 50 completed shifts with no Forest prerequisite.

## PR56 shell floor retained

PR56 merged as:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Run #104:
- SUCCESS;
- 347 / 347;
- validator 17 / 46 / 35 / 9.

Current 351-test suite retains:
- 108-key shell production fixture regression;
- creation/menu/season RU↔EN Save-invariance;
- Activity shell RU↔EN gameplay-invariance.

## Localization floor

Current root localization blob:
`4b3f7f9d843779bebf717eb9a00ebf7cf6af7704`.

Current root localization:
`630` keys.

Missing RU:
`0`.

Missing EN:
`0`.

PR57 adds no root localization key and does not alter the PR56 630-key bilingual floor.

## Static/presentation floor

Root presentation blob:
`0bed8e1a4a88358b7e1e8ef22d787f5bcee323f4`.

Active project-owned static root mappings:
`80`.

Unique active project-owned physical sources:
`79`.

Established current static target:
`80 / 80`.

Current root route static overrides:
- `activity/forest/route/default` only.

PR57 generates route-specific semantic slots at catalog/runtime presentation level:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Until specific media is selectively integrated, both safely resolve through the default root slot.

## Current app floor

App blob:
`548b4d4de9ec95e43b58bc153827e32176b79b59`.

Current active Forest Activity UI derives media presentation ID from authoritative `activity.internalState.routeId` without persisting the derived presentation ID into gameplay Save.

## Journal/outcome compatibility floor

Retained on current main:
- optional locale-neutral `outcomeRef`;
- parallel `journalRefs`;
- schema-4 missing-ref compatibility;
- index alignment;
- no fuzzy prose migration;
- School course-result priority;
- RU↔EN ref-backed Journal/result rendering with unchanged Save.

Run #106 retains the Journal/lastAction stable-ref renderer regression.

## Minimum next-integration floor

Unless an intentional reviewed change says otherwise:
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- test count does not drop below 351;
- failures remain 0;
- root localization does not silently lose current 630 keys;
- active project-owned static root mappings remain at least 80;
- static target remains 80/80;
- route-specific semantic slots retain default fallback safety.

## Locked invariants

Protect:
- Lumber Hard Work eligibility only `completed_shifts >= 50`;
- reward exactly `hardWork:lumber`;
- Forest exact success/escape/failure result IDs;
- exact activityResult reactions;
- Old Boundary current `enter_old_boundary` gate;
- route presentation derivation performs no Save/RNG/result mutation;
- School locale Save invariance;
- poverty natural paths;
- journal-ref compatibility/no fuzzy migration;
- Night lodging costs/effects;
- presentation/media resolution independent of gameplay RNG.

## Open PR58 note

PR #58 `Lead: localize generic labels and hints RU EN` is open and is not part of this current-main floor.

Its exact head must complete full CI successfully before its counts can replace this authoritative floor.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative floor:
`main df0119f... / run #106 / 351 of 351 passing / 17 packs, 46 events, 35 actions, 9 endings / 630 bilingual root keys / static 80 of 80`.
