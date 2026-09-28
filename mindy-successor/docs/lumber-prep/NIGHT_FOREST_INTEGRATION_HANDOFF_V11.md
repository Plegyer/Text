# Night / Forest Integration Handoff v11

Status: selective-integration handoff for queue items 269–279.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`
(PR #53 global UI-shell localization merged).

Do not merge this long-lived worker branch wholesale.

Use fresh current-main integration branches and copy/apply only reviewed files.

# SHARED_NIGHT_UI_READY

## Final additive localization payload

File:
`prior-work/astra/prototype-m3.2/content/shared-night-ui-localization-v6.fixture.json`.

Post-PR53 result:
- 19 additive RU+EN keys;
- 1 prior Chat 3 key excluded because current global UI shell already owns the exact-identical key:
  `ui.result.chooseLodging`.

Existing reuse-only keys remain outside the patch:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`;
- current globally owned `ui.result.chooseLodging`.

No NightFlow/lodging/housing mechanic change.

## Exact consumer map

File:
`prior-work/astra/prototype-m3.2/content/shared-night-ui-consumer-map-v3.fixture.json`.

Maps all 19 item-269 keys against exact post-PR53 `src/ui/app.ts`.

Important global-shell overlap:
the current sleep panel already consumes:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

Therefore proposed legacy Chat 3 keys:
- `ui.night.panel.title`;
- `ui.night.panel.description`;
- `ui.night.panel.start`

have no direct active consumer after PR53 unless Lead intentionally chooses to consolidate/alias them.

Do not create duplicate visible ownership at those seams accidentally.

## Natural-path expectation

File:
`prior-work/astra/prototype-m3.2/content/shared-night-ui-natural-path-v2.fixture.json`.

Representative paths:
- normal room -> `night.sleep`;
- cheap lodging -> `night.sleep`;
- street -> `night.sleep`.

Freezes exact:
- lodging IDs;
- Night choice ID;
- costs;
- housing;
- next-day Energy/effects;
- relevant Save fields.

Locale changes presentation only.

## Selective-copy set A

Copy:
1. `shared-night-ui-localization-v6.fixture.json`;
2. `shared-night-ui-consumer-map-v3.fixture.json`;
3. `shared-night-ui-natural-path-v2.fixture.json`.

Lead-owned shared UI work still required for hardcoded Night/lodging seams that remain outside the global UI-shell coverage.

# JOURNAL_EXPECTATIONS_READY

## Ordinary poverty

File:
`prior-work/astra/prototype-m3.2/content/poverty-journal-localization-expectation-v2.fixture.json`.

Coverage:
all 24 current ordinary-poverty resolved choices.

Each mapping records:
- pack ID;
- stable event ID;
- stable choice ID;
- event title key;
- choice label key;
- choice text key;
- current RU+EN text;
- expected journal reference identity.

Secret Debt excluded.

## Forest

File:
`prior-work/astra/prototype-m3.2/content/forest-journal-localization-expectation-v2.fixture.json`.

Coverage:
current Forest success/escape/failure reaction choices.

Exact result continuations remain:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Journal rendering must not replay or mutate those results.

## QA after Lead journal-ref consumer

File:
`docs/lumber-prep/NIGHT_FOREST_POST_JOURNAL_CONSUMER_QA_MATRIX_V1.md`.

Checks:
- RU/EN Journal rendering;
- RU/EN lastAction rendering;
- unchanged effects;
- unchanged RNG;
- unchanged Save identity;
- Night/lodging invariance;
- Forest result continuity;
- reload stability.

## Selective-copy set B

Copy:
1. `poverty-journal-localization-expectation-v2.fixture.json`;
2. `forest-journal-localization-expectation-v2.fixture.json`;
3. `NIGHT_FOREST_POST_JOURNAL_CONSUMER_QA_MATRIX_V1.md`.

This slice depends on the Lead-owned locale-neutral journal/lastAction reference consumer.

No Chat 3 engine/schema change is authorized.

# ROUTE_SEAM_READY

## Semantic-ID inventory

File:
`docs/lumber-prep/FOREST_ROUTE_PRESENTATION_SEMANTIC_ID_INVENTORY_V4.md`.

Exact mapping domain:
- no route -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

Authoritative source:
`run.flow.activity.internalState.routeId`.

No new route.

## Pure-function contract

File:
`docs/lumber-prep/FOREST_ROUTE_PURE_PRESENTATION_FUNCTION_CONTRACT_V4.md`.

Requirements:
- deterministic routeState -> presentationId;
- no Save write;
- no RNG use;
- no dispatch;
- no result mutation;
- locale-neutral output.

## Test vectors

File:
`prior-work/astra/prototype-m3.2/content/forest-route-presentation-test-vectors-v1.fixture.json`.

Valid vectors:
- null;
- undefined;
- logging-road;
- old-boundary.

Invalid-state guidance:
- strict helper rejects unsupported current state;
- safe caller may fall back to neutral default;
- must never invent a semantic/gameplay route.

## Final localized route delta

File:
`prior-work/astra/prototype-m3.2/content/forest-route-localization-delta-v7.fixture.json`.

Contains exactly 10 additive RU+EN presentation keys:
- logging-road title/body/help/alt/caption;
- old-boundary title/body/help/alt/caption.

Current-root exact collisions:
0.

No gameplay fields.

## Selective-copy set C

Copy:
1. `FOREST_ROUTE_PRESENTATION_SEMANTIC_ID_INVENTORY_V4.md`;
2. `FOREST_ROUTE_PURE_PRESENTATION_FUNCTION_CONTRACT_V4.md`;
3. `forest-route-presentation-test-vectors-v1.fixture.json`;
4. `forest-route-localization-delta-v7.fixture.json`.

Lead/Chat 1 owns the shared pure presentation seam implementation.

# VISUAL_SOURCE_ONLY

File:
`docs/lumber-prep/FOREST_ROUTE_VISUAL_SOURCE_ACCEPTANCE_V3.md`.

No asset is activated.

## Logging road

Safe:
- logging road;
- wheel ruts;
- cut branches;
- timber;
- ordinary work traces.

Reject visual implications of:
- gameplay benefit;
- reward;
- challenge success;
- Hunter ownership.

## Old boundary

Safe:
- old stones;
- weathered marks;
- stony/path-boundary line;
- older human traces.

Reject:
- constructed gate/arch/checkpoint;
- token use;
- Hunter symbol/source;
- magic activation;
- challenge/reward;
- hidden destination.

Until a safe route-specific visual ships:
use the current project-owned neutral default:
`activity/forest/route/default`.

## Selective-copy set D

Copy:
- `FOREST_ROUTE_VISUAL_SOURCE_ACCEPTANCE_V3.md`.

Asset activation remains Lead/Chat2-owned.

# PRODUCT_OPEN

Nothing in items 269–279 decides:
- Hunter production route identity;
- Hunter clue/capability/provider/reward;
- Old Boundary Token acquisition;
- token price;
- token consume/retain/turn-in;
- Forest challenge thresholds/rewards;
- School Arcana provider/fact/threshold;
- seasonal mechanical topology;
- deeper Forest lore outcome.

No workaround should infer these from presentation or journal work.

# Locked invariants

## Forest routes

Exact current route option IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

No third route.

## Old Boundary gate

Remains:
`itemCapability(enter_old_boundary) present=true`.

Presentation does not alter it.

## Forest results

Exact:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Lumber Hard Work

Eligibility:
ONLY `completed_shifts >= 50`.

Meta reward:
`hardWork:lumber`.

No route/item/School/relationship/challenge prerequisite.

## Night/lodging

Localization must not change:
- phase IDs/order;
- lodging IDs;
- nightChoice IDs;
- money costs;
- housing;
- next-day Energy/effects;
- Save fields.

# Recommended Lead integration order

1. start from exact current main;
2. add the 19-key shared Night UI localization payload;
3. wire only still-hardcoded Night/lodging consumers, respecting current global UI-shell ownership;
4. run Night/lodging invariance checks;
5. add the 10-key Forest route localized presentation delta;
6. implement pure routeState -> presentationId seam;
7. validate test vectors and Save/RNG/result invariance;
8. keep neutral default visual until approved route-specific visual source exists;
9. integrate locale-neutral journal refs separately;
10. run the post-journal-consumer QA matrix;
11. run full check and exact-head CI.

# Test-status note

Chat 3 authored expectation fixtures and QA matrices.

No new execution claim is made here. Integration tests/CI must be run on the eventual current-main integration branch.

# Handoff conclusion

Items 269–279 are now separated into:
- **SHARED_NIGHT_UI_READY** — collision-safe Night/lodging localization plus exact current consumers/invariance;
- **JOURNAL_EXPECTATIONS_READY** — all current ordinary-poverty and Forest resolved-choice localization refs;
- **ROUTE_SEAM_READY** — exact semantic IDs, pure mapping contract, test vectors and additive RU+EN route presentation delta;
- **VISUAL_SOURCE_ONLY** — semantic acceptance rules only;
- **PRODUCT_OPEN** — unresolved Forest mechanics/lore remain isolated.
