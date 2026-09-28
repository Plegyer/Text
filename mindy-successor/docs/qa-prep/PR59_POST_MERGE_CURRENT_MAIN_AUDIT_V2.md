# PR59 post-merge current-main audit v2

Status: COMPLETE / GREEN_POST_MERGE_MAIN

PR #59:
`Lead: activate safe Forest logging-road presentation`.

Base:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Accepted exact head:
`01109fd08cece24308d3d9a64127b08e6fc5d702`.

Merge SHA:
`54131488c65302f81b3001abaaa345d21f0281e2`.

## Exact-head CI

Run #114 / id `36407683010`:
- SUCCESS;
- validator 17 packs / 46 events / 35 actions / 9 endings;
- 360 / 360 tests;
- 0 failures.

## Immediate post-merge CI

Run #115 / id `36407870012`:
- head `54131488c65302f81b3001abaaa345d21f0281e2`;
- SUCCESS;
- validator 17 / 46 / 35 / 9;
- 360 / 360 tests.

## Logging-road static activation

PR59 adds exact root slot:
`activity/forest/route/logging-road`.

Physical source:
`assets/presentation/forest-route-logging-road.svg`.

Accessibility:
`presentation.activity.forest.route.logging-road.alt`.

At the PR59 merge checkpoint:
- route/default neutral static remained shipped;
- logging-road resolved to its reviewed specific static;
- old-boundary had no specific root override and resolved through route/default.

This was the correct PR59 state.

## Locale/Save/RNG acceptance

PR59 renderer regression proves after selecting logging-road:
- persisted routeId remains `logging-road`;
- semantic presentationId remains logging-road-specific;
- RU and EN select the same physical asset;
- only alt/help text localizes;
- serialized gameplay Save remains byte-identical across locale switch;
- Activity RNG unchanged;
- global run RNG unchanged.

## Gameplay invariants

Unchanged:
- Activity `lumber.forest`;
- route option IDs;
- Old Boundary gate `itemCapability(enter_old_boundary) present=true`;
- progress/endurance semantics;
- exact Forest success/escape/failure IDs;
- exact activityResult reactions;
- Save schema;
- Lumber Hard Work eligibility only `completed_shifts >= 50`;
- Hard Work meta reward `hardWork:lumber`.

## Later-main evolution

PR60 later activated the reviewed old-boundary v3 specific static.

PR61 later localized ending cards and ordinary action results.

Current main at final refresh:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Current main run #122 remains green:
369 / 369, validator 17 / 46 / 35 / 9.

Those later merges do not invalidate PR59 acceptance.

## Verdict

`GREEN_POST_MERGE_MAIN`.

PR59 is fully accepted. Its historical old-boundary neutral fallback state was correct at merge time; latest main now has reviewed specific statics for both current Forest routes.
