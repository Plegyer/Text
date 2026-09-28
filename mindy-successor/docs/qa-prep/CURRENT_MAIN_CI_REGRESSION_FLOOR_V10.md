# Current-main CI regression floor v10

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`
(PR62 profession/unlock/Forest route display-label merge).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #126;
- id `36412267106`;
- event: push;
- head SHA: `1b0ea9dc3c10a8acb24df2ca2edd0e5f609dd515`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 375 total;
- 375 pass;
- 0 fail.

## PR62 exact-head corroboration

Accepted PR62 head:
`0b8c7e4b010426188a196decbc9a40cf58b64fc2`.

Run #125 / id `36411878494`:
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 375 / 375 tests.

Relevant PASS:
- current profession identity labels/descriptions are bilingual;
- current legacy unlock labels are bilingual without changing unlock identity;
- Forest persisted route IDs have bilingual display labels;
- Forest route-specific presentation locale/Save/RNG invariance;
- ordinary action result localization;
- ending-card localization;
- Stats profession label RU↔EN Save invariance;
- Legacy unlock label RU↔EN Save invariance;
- Journal stable-ref and Lumber Hard Work regressions.

## PR61 floor retained

PR61 merged:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Run #122:
369 / 369 PASS.

Current suite retains:
- all 9 ending title/description localization regressions;
- 16 ordinary default-scene action result regressions;
- same eligibility/effects/Save behavior.

## PR60/PR59 floor retained

PR60 safe old-boundary v3 static:
- merge `2ad9fb8b0572f8903bbf57d144c8c5938023a440`;
- run #120: 363/363.

PR59 logging-road static:
- merge `54131488c65302f81b3001abaaa345d21f0281e2`;
- run #115: 360/360.

Current suite retains both route statics, fallback metadata and route-state invariance.

## Localization floor

Current root localization blob:
`edb4ac4ee776012160004a5bf1dcf80dd663511e`.

Total:
`744` keys.

Missing RU:
`0`.

Missing EN:
`0`.

PR62 adds:
- 20 profession identity strings;
- 10 legacy unlock labels.

No current root localization value is removed.

## Static floor

Root presentation blob:
`d403fe7b367ba4a578ac156a60d03dd301c42281`.

Active project-owned static semantic mappings:
`82`.

Unique active physical project-owned sources:
`81`.

Forest route presentation:
- neutral default;
- logging-road specific;
- old-boundary v3 specific.

No production GIFs exist.

## Current app floor

App blob:
`aef2f48f165ed70a5540e2f3ff24425861f406dd`.

Current player-facing consumers now include:
- stable selected-route bilingual display;
- route checkpoint option-label display where applicable;
- bilingual Stats profession names;
- bilingual Legacy unlock names;
- ending cards;
- ordinary default-scene result localization;
- event-choice stable refs;
- shared UI/Night/generic labels.

## Package/toolchain floor

Package manifest blob:
`91de0847c3ae3b8de394334968307ccf6252820a`.

Package-lock blob:
`77b325bc6b2115499c475adf92d3bae218bf37a1`.

Exporter dependencies remain uninstalled.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- test count does not drop below 375;
- failures remain 0;
- root localization does not silently lose 744 keys;
- project-owned static mappings remain at least 82;
- unique active static sources remain at least 81;
- current route media/fallback identities remain valid.

## Locked invariants

Protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`;
- exact Forest result IDs/reactions;
- Old Boundary `enter_old_boundary` gate;
- persisted route IDs unchanged by localized display;
- ending eligibility/reward/meta identity;
- ordinary action effects/economics;
- School result precedence;
- Journal stable-ref compatibility;
- Night costs/effects;
- locale-independent gameplay RNG/Save/media identity.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative floor:
`main 1b0ea9d... / run #126 / 375 of 375 passing / 17 packs, 46 events, 35 actions, 9 endings / 744 bilingual root keys / 82 active project-owned static mappings`.
