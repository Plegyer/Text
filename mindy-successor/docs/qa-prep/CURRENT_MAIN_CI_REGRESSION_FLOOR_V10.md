# Current-main CI regression floor v10

Status: COMPLETE / CURRENT_MAIN_CI_GREEN

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`
(PR59 safe logging-road presentation merge).

## Latest successful main push

Workflow:
- `mindy-successor check`;
- run #115;
- id `36407870012`;
- event: push;
- head SHA: `54131488c65302f81b3001abaaa345d21f0281e2`;
- conclusion: SUCCESS.

Validator:
- packs: 17;
- events: 46;
- actions: 35;
- endings: 9.

Tests:
- 360 total;
- 360 pass;
- 0 fail.

## PR59 exact-head corroboration

Accepted PR59 head:
`01109fd08cece24308d3d9a64127b08e6fc5d702`.

Run #114:
- id `36407683010`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 360 / 360 tests.

Relevant PASS:
- Forest route semantic IDs;
- logging-road static / old-boundary neutral fallback;
- route presentation localization presentation-only;
- logging-road natural path;
- route-specific renderer RU↔EN Save/RNG invariance;
- exact Forest activityResult boundaries;
- exact Lumber Hard Work rule.

## Localization floor

Current root localization:
`664` keys.

Missing RU:
`0`.

Missing EN:
`0`.

PR59 adds six route presentation/help/accessibility keys without changing event/gameplay identity counts.

## Static floor

Active project-owned root semantic static mappings:
`81`.

Unique active physical project-owned sources:
`80`.

Established pre-route-specific static target:
`80 / 80`.

Current Forest route root statics:
- neutral route/default;
- route-specific logging-road.

Old-boundary route-specific root static:
absent.

Generated Old Boundary semantic slot safely falls back to route/default.

## Presentation/gameplay floor

Current route-state -> presentationId seam remains shipped from PR57.

Logging-road:
- routeId `logging-road`;
- presentationId `activity/forest/route/logging-road`;
- project-owned specific static.

Old-boundary:
- routeId `old-boundary`;
- presentationId `activity/forest/route/old-boundary`;
- neutral default physical fallback.

No presentation lookup may mutate gameplay Save/RNG.

## Current app floor

Current app blob:
`8a7d8a7ecc66009a33c281afa092769d79cc2e2a`.

The current Activity status still displays raw persisted routeId after the localized `Route/Маршрут` prefix.

That is presentation debt, not a gameplay regression.

## Retained prior floors

Current 360-test suite retains:
- PR58 generic labels/hints;
- PR56 global UI shell;
- PR55 shared Night UI;
- PR54 Journal stable refs;
- School locale invariance;
- poverty natural paths;
- Foreman Night;
- project-owned static identity;
- exact Hard Work;
- Forest result continuation.

## Minimum next-integration floor

Unless intentionally reviewed:
- validator stays 17 packs / 46 events / 35 actions / 9 endings;
- test count must not silently drop below 360;
- failures remain 0;
- root localization must not lose current 664 keys;
- active project-owned root static mappings must not drop below 81;
- route/default and logging-road sources must remain present;
- old-boundary neutral fallback remains safe until specific activation is accepted.

## Locked invariants

Protect:
- Lumber Hard Work only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`;
- exact Forest success/escape/failure IDs;
- exact activityResult reactions;
- Old Boundary current `enter_old_boundary` gate;
- route-state presentation mapping is read-only;
- School locale Save invariance;
- poverty natural paths;
- Journal stable refs/no fuzzy migration;
- Night lodging costs/effects;
- locale does not affect gameplay RNG or media identity.

## Live PR60 note

At this floor update, PR #60:
`Lead: activate safe old-boundary Forest static`
is open and is not part of current main.

Its first exact-head run #116 failed due stale production regressions still asserting the pre-activation neutral-fallback state.

The three new old-boundary-specific tests themselves passed.

Do not replace this floor with PR60 counts until:
- fixed exact head is fully green;
- PR60 merges;
- post-merge main push succeeds.

## Verdict

`CURRENT_MAIN_CI_GREEN`.

Authoritative floor:
`main 5413148... / run #115 / 360 of 360 passing / 17 packs, 46 events, 35 actions, 9 endings / 664 bilingual root keys / 81 active project-owned static mappings`.
