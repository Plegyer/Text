# Lumber PA Closure Dependency Audit v1

Status: post-PR21 closure audit.
Production baseline: Product Acceptance evidence merge PR #21.

Classification vocabulary:
- **already shipped** — current production runtime/content already satisfies the relevant Lumber-facing contract;
- **runtime infrastructure missing** — generic product/runtime representation or command surface cannot yet express the required behavior without a shared implementation change;
- **authoring missing** — runtime can carry the result, but the production source/rule/content has not been authored;
- **presentation/content-depth only** — core transaction exists, but Product Acceptance still requires richer route/challenge/season/content depth.

This audit does not invent acquisition sources, consume semantics, School thresholds, Forest lore, NPC identities, prices or hidden thresholds.

## Executive conclusion

PR #21 established production runtime/integration GREEN while the full Product Acceptance Slice remains PARTIAL / NOT CLOSED.

Remaining Lumber-facing closure work splits into two kinds:
1. generic capability-aware item/Activity-option infrastructure is missing for a real item-driven Forest action-space seam;
2. product authoring is missing for the Old Boundary Token source, School management result, and Forest depth.

Hard Work is fully shipped and is not part of closure work.

## PA row audit

| PA row | Current status | Closure class | Evidence / exact dependency |
| --- | --- | --- | --- |
| PA09 — obtain meaningful item | not naturally executable | **runtime infrastructure missing + authoring missing** | shared typed item condition/effect schema still enumerates legacy item IDs; `old_boundary_token` is represented only by a test adapter; no real acquisition source is authored |
| PA14 — enter Forest | Activity/runtime shipped, natural route blocked | **runtime infrastructure missing + authoring missing** | `lumber.forest` and `enterActivity` ship, but its capability gate is currently a worldFact bridge; natural inventory/capability ownership is missing |
| PA15 — reload inside Activity | executable | **already shipped** | ActivityEnvelope save/resume is shipped and PR21 exercised it |
| PA16 — 3 routes / 3 challenge families / season difference | architecture executable, product depth incomplete | **presentation/content-depth only + authoring missing** | current `counter.v1` adapter has deterministic progress/resource/RNG but not the required three route contexts, three challenge families or seasonal topology |
| PA17 — use item capability | not product-executable | **runtime infrastructure missing + authoring missing** | current Activity command union is only `advance|escape`; there is no generic capability-aware Activity option command/availability contract; item-use seam and consume/retain authoring are absent |
| PA18 — success result triggers Lumber continuation | executable after accelerated/gated entry | **already shipped** | exact `activityResult(lumber.forest,success,lumber.forest.success)` triggers `lumber-cross.activity-forest-return` |
| PA19 — escape differs from success | executable | **already shipped** | distinct `lumber.forest.escape`; success-only truth/result facts are absent on escape |
| PA20 — post-Activity Lumber continuation | executable | **already shipped** | `lumber-cross.activity-forest-return` resolves without another Lumber shift |
| PA21 — at least two Lumber endings eligible | executable with accepted long-threshold accelerator | **already shipped** | Hard Work + complex Lumber ending coexistence is proven; accelerator is valid only for repetition-heavy earned state |
| PA22 — continue playing while eligible | executable | **already shipped** | eligibility remains separate from commitment |
| PA23 — explicit ending commitment | executable | **already shipped** | central `commitEnding` contract persists commitment before completion |
| PA24 — central completion | executable | **already shipped** | stable RunResult and idempotent completion |
| PA25 — Meta exactly once | executable | **already shipped** | exact `hardWork:lumber`, reload-safe |
| PA26 — New Run visible Meta | executable | **already shipped** | Lumber Hard Work applies +3 starting Strength and +3 starting Endurance |

## Dependency D1 — generic capability-aware item ownership

Class: **runtime infrastructure missing**

Current runtime can persist arbitrary inventory keys in Save, but production content schema for typed item conditions/effects still validates against the legacy enumerated item set.

Current Lumber adapter therefore maps `old_boundary_token -> enter_old_boundary -> lumber.capability.enter-old-boundary` through a test-only worldFact bridge.

Generic infrastructure must eventually support production item identity, capability identity, capability query from authoritative player-owned state, stable save/reload ownership, and inventory/UI visibility without a hidden injected fact.

Affected rows: PA09, PA14, PA17.

## Dependency D2 — capability-aware Activity options

Class: **runtime infrastructure missing**

Current shipped Activity command surface exposes only `activityAction: advance` and `activityAction: escape`.

That is sufficient for the counter adapter, but not for the Product Acceptance requirement that item capabilities change available Activity action-space.

A generic future seam must allow an Activity definition/adapter to expose capability-gated options while keeping exact option content data-authored.

Affected rows: PA17 directly; PA14/PA16 indirectly where capability changes route availability.

This audit does not add a new command or schema.

## Dependency D3 — Old Boundary Token product source/use

Class: **authoring missing**

Authoritative item docs lock item `old_boundary_token`, capability `enter_old_boundary`, a hidden/old-boundary Forest role, and that it is not an ordinary commodity.

Possible source families are design candidates, not one locked production source.

Still OPEN: exact acquisition source, price if any, provider/event/action ID, retain vs consume vs later turn-in, and final item-use fiction.

Affected rows: PA09, PA14, PA17.

## Dependency D4 — Forest product depth

Class: **presentation/content-depth only + authoring missing**

Authoritative Forest requirements lock three route contexts: logging road, hunter trail, old boundary path.
They also lock three challenge families: navigation, physical obstacle, interpretation/ritual anomaly.
Season must change topology/options.

Current `counter.v1` proves Activity state/reload/results, not this depth.

Affected rows: PA16, PA17, and the presentation/content portion of PA18–PA19.

Exact lore, encounters, loot, NPC identity, camp and thresholds remain OPEN.

## Dependency D5 — School management public result

Class: **authoring missing**

School runtime/progression is shipped.
The existing Lumber listener boundary is `lumber.school.management-ready` via `lumber-cross.school-management-return`.

Missing is the School-owned authored rule that publishes that fact. Course/track, `lessons_completed` threshold, milestone/project/exam/certificate and teacher/fiction remain OPEN.

This affects PA07/PA08 and the Forewoman complex-ending route, but never Hard Work.

## PA21–PA26 closure

These rows are already shipped and must not be reopened merely because PA09/PA16/PA17 are incomplete.

Hard Work remains:
- ending `ending.lumber.hard-work`;
- only condition `completed_shifts >= 50`;
- exact A6 reward `hardWork:lumber`.

No item, Forest, School, relationship, milestone or season prerequisite may be added.

## Smallest closure order

1. add generic capability-aware item ownership/query infrastructure;
2. add capability-gated Activity option infrastructure;
3. author one accepted Old Boundary Token source and use policy;
4. author the minimum three Forest routes, three challenge families and season topology difference;
5. author the School-owned management public result.

The first two are runtime seams. The last three are product/content authoring. None requires changing Hard Work.
