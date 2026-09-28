# Current-main CI regression floor v10

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`
(PR60 safe Old Boundary static merge, on top of PR59).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #120;
- id `36410358345`;
- event: push;
- head SHA: `2ad9fb8b0572f8903bbf57d144c8c5938023a440`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 363 total;
- 363 pass;
- 0 fail.

## PR60 exact-head corroboration

Accepted PR60 head:
`36f933d8c01a249992d84295bc69c3d554bb1f89`.

Run #119:
- id `36410203903`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 363 / 363 tests.

The initial PR60 head failed run #116 only because four older regressions still asserted the intentional pre-activation old-boundary neutral fallback state.

The new old-boundary safety tests already passed there.

The accepted head updates those stale expectations while retaining gameplay locks.

## PR59 floor retained

PR59 logging-road activation remains shipped beneath current main.

PR59 merge:
`54131488c65302f81b3001abaaa345d21f0281e2`.

Its post-merge run #115:
- 360 / 360;
- validator 17 / 46 / 35 / 9.

Current 363-test suite retains the PR59 logging-road and route locale/Save/RNG invariance regressions.

## Localization floor

Current root localization:
`664` keys.

Missing RU:
`0`.

Missing EN:
`0`.

PR60 adds no new localization keys; it reuses the PR59 old-boundary alt/caption keys.

## Static floor

Current root project-owned semantic static mappings:
`82`.

Unique active physical project-owned sources:
`81`.

Established baseline target:
`80 / 80`.

Route-specific extension:
`2 / 2` current Forest route identities have reviewed route-specific static media.

Current Forest route root statics:
- neutral route/default;
- logging-road specific;
- old-boundary v3 specific.

Neutral route/default fallback metadata remains retained.

## Physical asset floor

Current `assets/presentation/` files:
`91`.

Active physical project-owned sources:
`81`.

Retained inactive/source-history:
`10`.

## Current route invariants

Logging road:
- persisted routeId `logging-road`;
- semantic presentationId logging-road;
- reviewed specific static.

Old boundary:
- persisted routeId `old-boundary`;
- semantic presentationId old-boundary;
- reviewed v3 specific static;
- current capability gate unchanged.

Current exact Old Boundary gate:
`itemCapability(enter_old_boundary) present=true`.

## Current gameplay locks

Retained PASS on run #120:
- exact Forest activityResult boundaries;
- exact Forest success/escape/failure identities;
- exact Lumber Hard Work false at 49 / eligible at 50;
- no Forest/School/relationship prerequisite added to Hard Work;
- Journal stable-ref locale invariance;
- route-state renderer Save invariance.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator remains 17 packs / 46 events / 35 actions / 9 endings;
- test count does not silently drop below 363;
- failures remain 0;
- root localization does not lose current 664 keys;
- active project-owned static mappings remain at least 82;
- unique active physical project-owned sources remain at least 81;
- all three current Forest route static slots remain valid;
- route/default fallback remains retained.

## Locked invariants

Protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`;
- exact Forest result IDs/reactions;
- Old Boundary current `enter_old_boundary` gate;
- route presentation remains read-only;
- School locale Save invariance;
- poverty natural paths;
- Journal ref compatibility;
- Night costs/effects;
- locale independent gameplay RNG and media identity.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative current floor:
`main 2ad9fb8... / run #120 / 363 of 363 passing / 17 packs, 46 events, 35 actions, 9 endings / 664 bilingual root keys / 82 active project-owned static mappings`.
