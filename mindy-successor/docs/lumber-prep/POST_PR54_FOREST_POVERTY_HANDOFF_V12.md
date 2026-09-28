# Post-PR54 Forest / Poverty Handoff v12

Status: selective handoff for queue items 281–291.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Never merge the full worker branch.

# JOURNAL_REF_VERIFIED

## Ordinary poverty

Files:
- `docs/poverty-prep/POST_PR54_POVERTY_JOURNAL_REF_AUDIT_V3.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-journal-expected-render-v3.fixture.json`.

Coverage:
- all 24 current ordinary-poverty resolved choices;
- exact stable `eventId + choiceId` refs;
- exact RU+EN title/text rendering;
- no Secret Debt.

Merged PR #54 now localizes Journal and lastAction at render time from stable refs.

Gameplay effects are not replayed when locale changes.

## Forest

Files:
- `docs/lumber-prep/POST_PR54_FOREST_JOURNAL_REF_AUDIT_V3.md`;
- `prior-work/astra/prototype-m3.2/content/forest-journal-expected-render-v3.fixture.json`.

Coverage:
- success reaction;
- escape reaction;
- failure reaction.

Exact result identity remains unchanged.

# ROUTE_LOCALIZATION_READY

Files:
- `prior-work/astra/prototype-m3.2/content/forest-route-localization-delta-v8.fixture.json`;
- `docs/lumber-prep/LOGGING_ROAD_COPY_AMBIGUITY_SCRUB_V8.md`;
- `docs/lumber-prep/OLD_BOUNDARY_COPY_AMBIGUITY_SCRUB_V8.md`;
- `docs/lumber-prep/FOREST_ROUTE_ACCESSIBILITY_COPY_LEDGER_V1.md`.

Post-PR54 route localization status:
- 10 additive keys;
- 0 identical;
- 0 conflict.

Logging-road body/caption were scrubbed to remove accidental navigation/ease implications.

Old-boundary copy remains limited to stones/marks/path-boundary semantics.

# ROUTE_SEAM_ACCEPTANCE_READY

Files:
- `prior-work/astra/prototype-m3.2/content/forest-route-seam-ui-expectation-v5.fixture.json`;
- `docs/lumber-prep/FOREST_ROUTE_INVALID_STATE_SAFETY_MATRIX_V1.md`;
- `docs/lumber-prep/FOREST_ROUTE_SELECTIVE_INTEGRATION_ACCEPTANCE_V4.md`.

Required mapping:
- no route -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

The seam is read-only:
- no Save writes;
- no RNG;
- no route mutation;
- no result mutation.

# VISUAL_SOURCE_STILL_OPTIONAL

Route-specific visual activation is not required for text/seam integration.

Current neutral default static remains the safe visual fallback before selection and whenever a route-specific source is absent or rejected.

Old-boundary visual source must not imply gate/token/Hunter/magic/reward semantics.

# PRODUCT_OPEN

Still unresolved:
- Hunter production route;
- Hunter clue/capability/provider/reward;
- Old Boundary Token acquisition/use;
- challenge thresholds/rewards;
- School Arcana authority;
- seasonal mechanical topology;
- deeper Forest lore outcomes.

Nothing in items 281–291 closes these.

# Exact selective-copy groups

## Group A — journal refs

Copy:
- `POST_PR54_POVERTY_JOURNAL_REF_AUDIT_V3.md`;
- `poverty-journal-expected-render-v3.fixture.json`;
- `POST_PR54_FOREST_JOURNAL_REF_AUDIT_V3.md`;
- `forest-journal-expected-render-v3.fixture.json`.

## Group B — route localization

Copy:
- `forest-route-localization-delta-v8.fixture.json`;
- `LOGGING_ROAD_COPY_AMBIGUITY_SCRUB_V8.md`;
- `OLD_BOUNDARY_COPY_AMBIGUITY_SCRUB_V8.md`;
- `FOREST_ROUTE_ACCESSIBILITY_COPY_LEDGER_V1.md`.

## Group C — route seam acceptance

Copy:
- `forest-route-seam-ui-expectation-v5.fixture.json`;
- `FOREST_ROUTE_INVALID_STATE_SAFETY_MATRIX_V1.md`;
- `FOREST_ROUTE_SELECTIVE_INTEGRATION_ACCEPTANCE_V4.md`.

# Locked invariants

Forest routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Lumber Hard Work:
- ONLY `completed_shifts >= 50`;
- reward `hardWork:lumber`.

Ordinary poverty remains separate from Secret Debt.

# Handoff conclusion

Items 281–291 are ready as:
- **JOURNAL_REF_VERIFIED**;
- **ROUTE_LOCALIZATION_READY**;
- **ROUTE_SEAM_ACCEPTANCE_READY**;
- **VISUAL_SOURCE_STILL_OPTIONAL**;
- **PRODUCT_OPEN**.

Remaining implementation belongs to the Lead-owned route presentation seam and normal integration tests/CI.
