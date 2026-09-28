# Forest Route Integration Handoff v11

Status: selective-integration handoff for the post-PR54 Forest-route queue block.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Never merge this long-lived worker branch wholesale.

Use fresh exact-current-main branches and selective copy/application only.

# ROUTE_COPY_READY

## Current-main baseline

File:
`docs/lumber-prep/POST_PR54_FOREST_ROUTE_INTEGRATION_BASELINE_V11.md`.

Current facts:
- Activity: `lumber.forest`;
- exact current routes:
  - `forest.route.logging-road`;
  - `forest.route.old-boundary`;
- neutral default presentation is shipped;
- route-specific presentation seam remains absent;
- PR54 journal refs do not alter route/result mechanics.

## Final scene banks

Files:
- `docs/lumber-prep/LOGGING_ROAD_FINAL_LOCALIZED_SCENE_BANK_V8.md`;
- `docs/lumber-prep/OLD_BOUNDARY_FINAL_LOCALIZED_SCENE_BANK_V8.md`.

Each provides eight RU-source + full EN presentation-only variants.

Logging road:
ordinary work-road/rut/timber/mark semantics only.

Old boundary:
stones/marks/path-boundary semantics only.

No mechanics/effects/rewards are introduced.

## Title/help/choice-label source

File:
`prior-work/astra/prototype-m3.2/content/forest-route-title-help-localization-v3.fixture.json`.

Current shipped choice labels remain exact:
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

Additive route-specific title/help keys remain presentation-only.

# ALT_READY

File:
`prior-work/astra/prototype-m3.2/content/forest-route-alt-caption-localization-v3.fixture.json`.

Normalized slash-free localization keys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

No media paths or gameplay fields.

# JOURNAL_READY

File:
`prior-work/astra/prototype-m3.2/content/forest-route-result-journal-localization-v2.fixture.json`.

Merged PR #54 now supports stable event-choice Journal/lastAction refs.

The fixture records expected RU+EN rendering for both current route states across:
- success reaction;
- escape reaction;
- failure reaction.

Important:
route selection does not create route-specific result identities.

Exact continuation remains:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

# SEAM_REQUIRED

File:
`prior-work/astra/prototype-m3.2/content/forest-route-presentation-seam-acceptance-v5.fixture.json`.

Required presentation behavior:

Before route selection:
`activity/forest/route/default`.

After `logging-road` selection:
`activity/forest/route/logging-road`.

After `old-boundary` selection:
`activity/forest/route/old-boundary`.

Authoritative source:
`run.flow.activity.internalState.routeId`.

The seam must:
- write no gameplay Save;
- consume no global RNG;
- consume no Activity RNG;
- mutate no route condition/state;
- mutate no progress/endurance;
- mutate no result identity.

# VISUAL_SOURCE_STATUS

## Audit

File:
`docs/lumber-prep/FOREST_ROUTE_STATIC_VISUAL_SOURCE_AUDIT_V3.md`.

Classification:
- shipped default SVG: **SAFE**;
- Chat2 logging-road SVG: **SAFE**;
- Chat2 old-boundary SVG: **NEEDS_REVISION**;
- explicit **PRODUCT_SEMANTICS_LEAK** candidates: none among the reviewed sources.

## Old-boundary minimal correction

File:
`docs/lumber-prep/OLD_BOUNDARY_SAFE_VISUAL_DELTA_BRIEF_V3.md`.

Required minimal change:
- remove gate/crossbar-like central structure;
- replace with low mossed stones + weathered marks + ordinary walkable path.

Until revised/approved:
use shipped neutral default visual fallback.

No route-specific visual activation is required to integrate the text/seam.

# REGRESSION_SOURCE

File:
`prior-work/astra/prototype-m3.2/tests/forest-route-presentation-only-v5.test.ts`.

Authored checks:
- presentation-localization fixtures contain no gameplay mechanics fields;
- exact current route IDs only;
- exact Forest result continuation;
- Lumber Hard Work exactly `completed_shifts >= 50`;
- no selected old-boundary Hunter/token/reward semantics.

This handoff does not claim the new test was executed.

# PRODUCT_OPEN

File:
`docs/lumber-prep/FOREST_ROUTE_PRODUCT_OPEN_FIREWALL_V11.md`.

Still Product-open:
- Hunter route ID/state/source/gate/reward;
- Old Boundary Token acquisition/use;
- challenge IDs/thresholds/rewards;
- School Arcana authority;
- seasonal mechanical topology;
- deeper Forest lore.

No integration workaround should infer those decisions.

# Exact selective-copy groups

## Group A — ROUTE_COPY_READY

Copy:
- `POST_PR54_FOREST_ROUTE_INTEGRATION_BASELINE_V11.md`;
- `LOGGING_ROAD_FINAL_LOCALIZED_SCENE_BANK_V8.md`;
- `OLD_BOUNDARY_FINAL_LOCALIZED_SCENE_BANK_V8.md`;
- `forest-route-title-help-localization-v3.fixture.json`.

## Group B — ALT_READY

Copy:
- `forest-route-alt-caption-localization-v3.fixture.json`.

## Group C — JOURNAL_READY

Copy:
- `forest-route-result-journal-localization-v2.fixture.json`.

## Group D — SEAM_REQUIRED

Copy:
- `forest-route-presentation-seam-acceptance-v5.fixture.json`;
- `forest-route-presentation-only-v5.test.ts`.

Lead/Chat1 owns the shared presentation seam implementation.

## Group E — VISUAL_SOURCE_STATUS

Copy:
- `FOREST_ROUTE_STATIC_VISUAL_SOURCE_AUDIT_V3.md`;
- `OLD_BOUNDARY_SAFE_VISUAL_DELTA_BRIEF_V3.md`.

Asset activation/revision remains Lead/Chat2-owned.

## Group F — PRODUCT_OPEN

Copy:
- `FOREST_ROUTE_PRODUCT_OPEN_FIREWALL_V11.md`.

# Locked invariants

## Routes

Only:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

## Old Boundary

Current gate only:
`itemCapability(enter_old_boundary) present=true`.

No token acquisition/use semantics are selected.

## Results

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

# Recommended integration order

1. start from exact current main;
2. copy/add route title/help + alt/caption localization;
3. implement the pure route-state -> presentationId seam;
4. use shipped default visual fallback initially;
5. run route Save/RNG/result/Hard Work regressions;
6. optionally activate safe logging-road visual later;
7. revise old-boundary visual before activation;
8. run full project check and exact-head CI.

# Handoff conclusion

This block is ready as:
- **ROUTE_COPY_READY**;
- **ALT_READY**;
- **JOURNAL_READY**;
- **SEAM_REQUIRED**;
- **VISUAL_SOURCE_STATUS**;
- **PRODUCT_OPEN**.

The remaining implementation dependency is the shared presentation seam; route-specific visuals remain optional.
