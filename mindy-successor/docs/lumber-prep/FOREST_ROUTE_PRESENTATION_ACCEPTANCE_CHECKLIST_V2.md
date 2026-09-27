# Forest Route Presentation Acceptance Checklist v2

Status: exact Lead acceptance checklist for the future shared route-state -> presentationId wiring.

Applies only to current shipped Forest routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Semantic presentation IDs:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

This checklist does not authorize Hunter, new challenges, token semantics, or route mechanics.

## 1. Identity invariance

PASS only if:
- Activity ID remains exactly `lumber.forest`;
- route option IDs remain exactly:
  - `forest.route.logging-road`;
  - `forest.route.old-boundary`;
- route-state values remain exactly:
  - `logging-road`;
  - `old-boundary`;
- semantic presentation IDs are derived only after authoritative route selection;
- no RU/EN suffix appears in any gameplay ID, route state or presentation ID.

FAIL if presentation wiring creates a third route, duplicates route IDs per locale, or stores localized identity in gameplay state.

## 2. Existing route gates unchanged

Logging road:
- remains available under its current authoritative conditions.

Old boundary:
- current gate remains exactly `itemCapability(enter_old_boundary) present=true`.

PASS only if presentation wiring does not:
- grant the capability;
- consume an item;
- remove an item;
- infer a provider;
- add a price;
- change availability.

Token acquisition/use remains Product-open.

## 3. Save invariance

Capture Save immediately after route selection and before presentation resolution.

Resolve:
- semantic presentation ID;
- localized route text;
- route alt/caption;
- static/media candidate.

PASS only if gameplay Save is byte-for-byte or structurally identical except for already-existing presentation-external client preferences.

Presentation must not write:
- route state;
- resolved option IDs;
- Activity progress;
- endurance;
- world facts;
- inventory;
- calendar;
- event history;
- NightFlow;
- ending state.

Locale preference remains outside gameplay Save.

## 4. RNG invariance

Record before presentation lookup:
- global `run.rng`;
- active Activity `rngState`.

Resolve route presentation in RU and EN.

PASS only if:
- global RNG is unchanged;
- Activity RNG is unchanged;
- choosing a text/media candidate does not advance gameplay RNG.

If presentation variation needs deterministic selection, it must use presentation-owned deterministic logic, not gameplay RNG.

## 5. Reload stability

After route selection:
1. save;
2. reload through normal parse/load path;
3. resolve route presentation again.

PASS only if:
- route option identity survives;
- route-state value survives;
- available Activity actions are unchanged by presentation;
- progress/endurance are unchanged;
- semantic presentation ID maps to the same route;
- no choice/effect is duplicated.

Presentation candidate stability may be implementation-specific, but it must never alter gameplay state.

## 6. Exact Activity result continuation

Success must remain:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Escape must remain:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Failure must remain:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

PASS only if route presentation has no authority to rename, replace, suppress or reinterpret these result identities.

The existing result event identities remain:
- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

## 7. Route outcome invariance

Run the same authoritative Activity path with route presentation lookup enabled and disabled.

PASS only if:
- same route action remains available;
- same progress change occurs;
- same endurance change occurs;
- same success/escape/failure result occurs;
- same world facts/effects occur;
- same pending/reactive continuation occurs.

Text/media choice must not influence any of these.

## 8. Localization completeness

For every consumed route text/media localization key:
- RU must be non-empty;
- EN must be non-empty;
- the key itself must be locale-neutral;
- same semantic presentation ID must serve both locales.

PASS only if changing locale changes presentation strings, not route/gameplay state.

Safe source files:
- `forest-logging-road-localization-v2.fixture.json`;
- `forest-old-boundary-localization-v2.fixture.json`;
- `forest-route-media-localization-v1.fixture.json`.

## 9. Static fallback

When no bespoke route media is available:
`assets/stage-forest.svg`
must remain a valid fallback.

PASS only if:
- missing animation does not block the Activity;
- fallback does not create an error path;
- fallback selection changes no gameplay state;
- generic fallback is not falsely described as bespoke route art.

## 10. Media pool safety

If route-specific GIF/media pools are added later:
- pool size should be 3–5 semantically compatible candidates;
- candidate IDs must be locale-neutral;
- same asset candidate must serve RU and EN;
- alt/caption localizes separately;
- media selection must not alter outcome, reward, route, RNG or Save.

No candidate may encode a hidden mechanical branch.

## 11. Old Boundary semantic firewall

PASS only if the integration still makes no claim about:
- token acquisition;
- price;
- provider;
- consumption;
- retention;
- turn-in;
- deeper use;
- Hunter relationship;
- magical/ritual/legal meaning of the boundary.

Presentation prose may show old stones and marks only.

## 12. Hunter isolation

PASS only if no production route such as `forest.route.hunter-trail` is added.

Hunter remains Product-open until an explicit Product decision defines:
- ID;
- route state;
- gate/source;
- threshold;
- reward.

## 13. Challenge and seasonal isolation

Route-presentation wiring must not silently add:
- navigation challenge;
- physical challenge;
- anomaly challenge;
- challenge threshold;
- challenge reward;
- spring closure;
- summer shortcut;
- autumn migration mechanic;
- winter frozen-passage mechanic.

Seasonal visuals are presentation-only unless separately authored as gameplay.

## 14. Lumber Hard Work unchanged

PASS only if:
- ending remains `ending.lumber.hard-work`;
- eligibility remains ONLY `completed_shifts >= 50`;
- Meta reward remains exactly `hardWork:lumber`;
- no Forest route, item, School, relationship or challenge prerequisite is added.

## 15. Shared ownership boundary

Lead/Chat 1 owns:
- shared Activity presentation resolver;
- UI consumption;
- presentation candidate selection implementation;
- media import/runtime.

Chat 3 sources presentation content only.

## Acceptance evidence expected from Lead

Before marking route presentation production-ready, collect:
- exact-head test output for route identity/reload;
- localization completeness test;
- RNG/Save invariance proof;
- current Forest result regression;
- Lumber Hard Work regression;
- current-main full check/CI.

Chat 3-authored tests may be selectively copied, but this document does not claim they have been executed.

## Final acceptance condition

Route presentation is accepted only when the same authoritative Forest run produces the same gameplay state and result with:
- logging-road RU;
- logging-road EN;
- old-boundary RU;
- old-boundary EN;
- static fallback;
- any approved presentation candidate.

Only presentation may differ.
