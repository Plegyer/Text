# Post-PR50 Forest / Poverty Baseline v9

Status: exact current-main audit after PR #50.

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

PR #50:
`Lead: add neutral Forest route/default static fallback`.

## Ordinary-poverty localization state

Current root `content/localization.json` contains:
- 511 total localization keys;
- 82 ordinary-poverty event keys under `event.poverty-*`;
- current ordinary-poverty event localization remains shipped in RU+EN.

The post-PR49 33-key Chat 3 copyedit remains a text-only selective patch candidate. PR #50 does not supersede those exact ordinary-poverty event keys.

Ordinary poverty remains separate from Secret Debt.

## Shared Night/lodging UI debt

The finalized 20 shared Night/lodging localization keys are still absent from current root localization.

Current `src/ui/app.ts` still contains player-visible hardcoded/fallback strings for:
- LodgingResolution prompt;
- next-day Energy wording;
- VoluntaryNightChoice prompt;
- generic “Night slot” wording;
- generic Night sequence title;
- visible `NightFlow` terminology;
- Night panel start button.

The shared UI debt is therefore unchanged by PR #50.

Lead/Chat 1 still owns the UI-consumer wiring.

## Forest route/default static now shipped

PR #50 ships a neutral project-owned static fallback for:

`activity/forest/route/default`.

Current root presentation slot:
`activity/forest/route/default`.

Static asset:
`assets/presentation/forest-route-default-v1.svg`.

Current localized static alt key:
`presentation.static.forest.route.default.alt`.

Current RU:
`Героиня идёт по нейтральной лесной тропе без указания конкретного маршрута или исхода.`

Current EN:
`The heroine follows a neutral forest trail without indicating a specific route or outcome.`

Current caption:
- RU: `Путь через лес продолжается.`
- EN: `The route through the forest continues.`

This is now a real shipped neutral active-route fallback.

## Current Forest route gameplay IDs

Activity:
`lumber.forest`.

Current route option IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Route states:
- `logging-road`;
- `old-boundary`.

Old Boundary gate remains:
`itemCapability(enter_old_boundary) present=true`.

No third route exists.

## Route-specific presentation seam still absent

Current shared Activity UI still requests:

`activity/${slug}/route/default`.

For `lumber.forest`, this resolves to the newly shipped:
`activity/forest/route/default`.

The UI does not yet derive:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`

from authoritative selected route state.

Current root `presentation.json` contains no route-specific slots for those two IDs.

Therefore PR #50 closes the neutral default-static gap but not the route-specific presentation seam.

## Forest result/reaction identities

Exact Activity result IDs remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact reaction continuations remain:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Result/return static media remains separate from route presentation.

## Lumber Hard Work

Current authoritative invariant remains:
- ending ID: `ending.lumber.hard-work`;
- eligibility ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

No Forest route/item/School/relationship/challenge prerequisite.

## Product-open boundaries unchanged

PR #50 does not decide:
- Hunter production route identity;
- Hunter source/provider/gate/reward;
- Old Boundary Token acquisition;
- token price;
- token consume/retain/turn-in behavior;
- challenge thresholds/rewards;
- School Arcana provider/fact;
- seasonal mechanical topology;
- deeper Forest lore outcomes.

## Baseline conclusion

Post-PR50:
- ordinary-poverty RU+EN event localization remains shipped;
- the 20 shared Night/lodging keys are still not root-loaded and their UI debt remains;
- neutral `activity/forest/route/default` static presentation is now shipped;
- route-specific logging-road / old-boundary presentation IDs still need a shared Lead-owned derivation seam;
- Product-open Forest mechanics remain unchanged.
