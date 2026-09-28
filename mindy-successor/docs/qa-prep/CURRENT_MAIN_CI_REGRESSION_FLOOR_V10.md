# Current-main CI regression floor v10

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`
(PR61 ending/action localization merge, on top of PR60 and PR59).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #122;
- id `36410874877`;
- event: push;
- head SHA: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 369 total;
- 369 pass;
- 0 fail.

## PR61 exact-head corroboration

Accepted head:
`a7b16eca18ccba37719fc84432c1fe1a9b275bf5`.

Run #121 / id `36410716736`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 369 / 369 tests.

Relevant PASS:
- ending production patch exact current identities;
- ordinary action result patch exact current one-scene identities;
- ordinary action result RU↔EN without Save change;
- ending cards RU↔EN without eligibility/Save change;
- Journal stable-ref regression;
- Forest route-specific media regression;
- exact Lumber Hard Work regression.

## PR60 floor retained

PR60 merge:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`.

Run #120:
363 / 363 PASS, validator 17/46/35/9.

Current suite retains safe old-boundary v3/static build and route invariance tests.

## PR59 floor retained

PR59 merge:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Run #115:
360 / 360 PASS, validator 17/46/35/9.

Current suite retains logging-road/static locale/Save/RNG invariance.

## Localization floor

Current root localization blob:
`2ae08a0b64ee9762e7194ea4352cbe7703f421b2`.

Total root keys:
`714`.

Missing RU:
`0`.

Missing EN:
`0`.

PR61 adds exactly:
- 18 ending title/description keys;
- 32 ordinary action result title/body keys.

Total PR61 localization delta:
`50`.

## Static floor

Root presentation blob:
`d403fe7b367ba4a578ac156a60d03dd301c42281`.

Active project-owned static semantic mappings:
`82`.

Unique active project-owned physical sources:
`81`.

Forest route statics:
- neutral route/default;
- logging-road specific;
- old-boundary v3 specific.

## Current app floor

Current app blob:
`bcefef82bd0009040e6b5a84ae032a9806f15289`.

Shipped consumers include:
- ending title/description localization;
- ordinary default-scene action result localization;
- stable event-choice outcome refs;
- global shell/generic labels/Night UI;
- Forest route-state presentation seam.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- existing tests do not drop below 369;
- failures remain 0;
- root localization does not silently lose 714 keys;
- static mappings remain at least 82;
- unique active static sources remain at least 81;
- all three Forest route presentation statics remain valid.

## Locked invariants

Protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`;
- exact Forest success/escape/failure IDs;
- exact activityResult reactions;
- Old Boundary `enter_old_boundary` gate;
- route presentation read-only behavior;
- ending eligibility/reward/meta identity;
- ordinary action effects/economics;
- School result precedence;
- Journal stable-ref compatibility;
- Night costs/effects;
- locale-independent gameplay RNG/Save/media identity.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative floor:
`main 01b31b9... / run #122 / 369 of 369 passing / 17 packs, 46 events, 35 actions, 9 endings / 714 bilingual root keys / 82 active project-owned static mappings`.
