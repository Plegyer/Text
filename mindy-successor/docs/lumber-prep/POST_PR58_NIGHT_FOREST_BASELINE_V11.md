# Post-PR58 Night / Forest Baseline v11

Status: exact current-main audit after PR #58.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

PR #58:
`Lead: localize generic labels and hints RU EN`.

## Global UI/localization now shipped

Post-PR58 root localization now contains the shared Night/lodging keys that were previously staged by Chat 3 for:
- Night eyebrow;
- lodging prompt;
- next-day Energy formatter;
- voluntary Night title/prompt/context/action;
- generic Night sequence title;
- town lodging summary;
- lodging labels;
- housing labels;
- `nightChoice.night.sleep.label`;
- `ui.result.chooseLodging`.

Those shipped values are exact-identical to the prior Chat 3 proposals.

The current sleep panel is owned by global shell keys:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

Therefore Chat 3 must not add competing `ui.night.panel.*` keys for the same active panel seam.

## Remaining shared Night/lodging UI consumers

Current `src/ui/app.ts` already consumes localized Night/lodging keys for:
- LodgingResolution prompt;
- lodging labels;
- next-day Energy;
- VoluntaryNightChoice heading/prompt/context/button;
- generic Night sequence title;
- town lodging summary;
- housing label;
- `night.sleep` choice label;
- result -> choose lodging bridge.

The remaining visible Night panel uses the shipped global shell `ui.sleep.*` owner.

No new shared Night/lodging player-copy key is required for that panel.

## Journal/outcome stable refs now shipped

Current engine behavior:
- resolved event choice creates stable `eventChoice` ref with `eventId + choiceId`;
- same ref is appended to `historyState.journalRefs`;
- same ref is attached to `lastAction.outcomeRef`.

Current UI behavior:
- Journal renders `event.<eventId>.choice.<choiceId>.text` through the active locale;
- lastAction title renders `event.<eventId>.title`;
- lastAction text renders `event.<eventId>.choice.<choiceId>.text`;
- raw stored text remains fallback/compatibility data.

Locale switching therefore changes render text without replaying event effects.

## Forest route/default static

Current root presentation contains:
`activity/forest/route/default`.

Project-owned static:
`assets/presentation/forest-route-default-v1.svg`.

Current alt key:
`presentation.static.forest.route.default.alt`.

Current caption key:
`presentation.static.forest.route.default.caption`.

This remains the correct neutral visual:
- before route selection;
- when a route-specific presentation slot/source is unavailable.

## Forest route-specific seam still outstanding

Current shared Activity presentation request still resolves the Forest active envelope through:
`activity/forest/route/default`.

Current runtime does not yet derive:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`

from authoritative:
`run.flow.activity.internalState.routeId`.

Therefore the route-specific presentation seam remains the outstanding shared Lead-owned integration item.

## Exact route/gameplay identities

Activity:
`lumber.forest`.

Routes:
- `forest.route.logging-road` -> state `logging-road`;
- `forest.route.old-boundary` -> state `old-boundary`.

Old-boundary gate remains:
`itemCapability(enter_old_boundary) present=true`.

No third route.

## Exact result continuation

Unchanged:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Exact reactions remain:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

## Lumber Hard Work

Unchanged:
- eligibility ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

## Baseline conclusion

Post-PR58:
- shared Night/lodging localization is largely shipped and actively consumed;
- the global sleep panel owns its own `ui.sleep.*` strings;
- locale-neutral Journal/lastAction event-choice refs are shipped;
- Forest neutral route/default static is shipped;
- Forest route-specific presentation mapping remains the main shared seam still outstanding.
