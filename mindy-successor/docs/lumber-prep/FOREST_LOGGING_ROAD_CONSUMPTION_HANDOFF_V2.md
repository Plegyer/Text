# Logging Road Consumption Handoff v2

Status: C3-62 content-only integration handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `32e255f2371e8782c8ad832d7e0811f9afd086da`.

Source: `forest.logging-road-depth.v2`.
Handoff: `forest.logging-road-consumption-handoff.v2`.

All six source variants map only to:
- Activity `lumber.forest`;
- option `forest.route.logging-road`;
- route `logging-road`;
- presentation `activity/forest/route/logging-road`.

The current Activity UI already exposes the activity ID and route ID, and current calendar state contains season. The current `activityNarrative(activityId,routeId)` consumer does not select seasonal depth variants, so Integration would need an approved shared presentation-selector extension. Chat 3 does not implement it.

No new gameplay capability, result, progress/endurance rule, Save field, RNG path or media source is required. Safe fallback remains the current Logging Road entry/help copy.
