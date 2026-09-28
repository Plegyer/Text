# Night / Forest Integration Handoff v10

Status: selective-integration handoff for queue items 257–267.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Never merge this long-lived worker branch wholesale.

Use fresh current-main branches and selectively copy reviewed files only.

## SHARED_UI_TEXT_READY

Files:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_PRODUCTION_COPY_MATRIX_V7.md`;
- `docs/poverty-prep/NIGHTFLOW_PLAYER_LANGUAGE_TERMINOLOGY_AUDIT_V1.md`;
- `docs/poverty-prep/LODGING_CONSEQUENCE_COPY_BANK_RU_EN_V1.md`.

Supporting final localization source from the previous wave:
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v5.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-ui-invariance-v1.fixture.json`.

Ready text coverage:
- LodgingResolution shell;
- lodging labels;
- next-day Energy wording;
- VoluntaryNightChoice shell;
- generic Night title;
- Night panel;
- result-to-lodging bridge;
- town lodging summary;
- housing labels;
- sleep choice;
- exact current lodging-consequence explanation.

Lead-owned UI consumption is still required.

No NightFlow/lodging/housing mechanic change is authorized.

### Selective-copy group A

Copy:
1. `SHARED_NIGHT_LODGING_PRODUCTION_COPY_MATRIX_V7.md`;
2. `NIGHTFLOW_PLAYER_LANGUAGE_TERMINOLOGY_AUDIT_V1.md`;
3. `LODGING_CONSEQUENCE_COPY_BANK_RU_EN_V1.md`;
4. `poverty-shared-ui-localization-v5.fixture.json`;
5. `shared-night-lodging-consumer-map-v2.fixture.json`;
6. `shared-night-lodging-ui-invariance-v1.fixture.json`.

## ROUTE_COPY_READY

Files:
- `docs/lumber-prep/LOGGING_ROAD_ROUTE_SCENE_VARIANTS_V7.md`;
- `docs/lumber-prep/OLD_BOUNDARY_ROUTE_SCENE_VARIANTS_V7.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-choice-help-localization-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/forest-route-presentation-seam-v4.test.ts`;
- `docs/lumber-prep/FOREST_ROUTE_COPY_STATIC_COMPATIBILITY_MATRIX_V2.md`.

Supporting route source from the previous wave:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v6.fixture.json`;
- `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ID_SEAM_CONTRACT_V3.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-natural-path-acceptance-v3.fixture.json`;
- `docs/lumber-prep/OLD_BOUNDARY_VISUAL_BRIEF_CORRECTION_V2.md`.

Current exact routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Current semantic presentation mapping:
- default before route selection:
  `activity/forest/route/default`;
- logging road after authoritative selection:
  `activity/forest/route/logging-road`;
- old boundary after authoritative selection:
  `activity/forest/route/old-boundary`.

The shipped neutral default static remains safe fallback.

Route-specific copy is ready, but the Lead-owned route-state -> presentationId seam is still required for active consumption.

### Selective-copy group B

Copy:
1. `LOGGING_ROAD_ROUTE_SCENE_VARIANTS_V7.md`;
2. `OLD_BOUNDARY_ROUTE_SCENE_VARIANTS_V7.md`;
3. `forest-route-choice-help-localization-v2.fixture.json`;
4. `forest-route-presentation-seam-v4.test.ts`;
5. `FOREST_ROUTE_COPY_STATIC_COMPATIBILITY_MATRIX_V2.md`;
6. `forest-route-presentation-final-v6.fixture.json`;
7. `FOREST_ROUTE_PRESENTATION_ID_SEAM_CONTRACT_V3.md`;
8. `forest-route-natural-path-acceptance-v3.fixture.json`;
9. `OLD_BOUNDARY_VISUAL_BRIEF_CORRECTION_V2.md`.

## JOURNAL_CONSUMER_DEPENDENT

Files:
- `docs/poverty-prep/POVERTY_JOURNAL_FACING_COPY_AUDIT_V1.md`;
- `docs/lumber-prep/POVERTY_FOREST_LOCALIZED_JOURNAL_ACCEPTANCE_V1.md`.

Current behavior:
event choice resolution stores raw `sceneChoice.text` in:
- journal;
- lastAction text.

The desired future behavior is a locale-neutral render-time consumer using stable event/choice identity.

Ordinary-poverty coverage:
- all 24 current ordinary-poverty choice outcomes.

Forest coverage:
- current Forest result/reaction choice outcomes.

Expected behavior:
- same stored gameplay history;
- RU or EN render according to current locale;
- no replay of effects;
- no Save rewrite on locale change;
- no result-identity change.

This slice remains dependent on a Lead-owned journal/lastAction localization consumer.

No engine/schema change is authored by Chat 3.

### Selective-copy group C

Copy:
1. `POVERTY_JOURNAL_FACING_COPY_AUDIT_V1.md`;
2. `POVERTY_FOREST_LOCALIZED_JOURNAL_ACCEPTANCE_V1.md`.

## PRODUCT_OPEN

Boundary file:
`docs/lumber-prep/FOREST_PRODUCT_OPEN_ISOLATION_REFRESH_V10.md`.

Still unresolved:
- Hunter production route;
- Hunter source/provider/gate/reward;
- Old Boundary Token acquisition;
- token price;
- token consume/retain/turn-in behavior;
- Forest challenge IDs/thresholds/rewards;
- School Arcana provider/fact/threshold;
- seasonal mechanical topology;
- deeper Forest lore outcomes.

No item 257–267 introduces any of these.

### Selective-copy group D

Copy:
- `FOREST_PRODUCT_OPEN_ISOLATION_REFRESH_V10.md`.

## Exact gameplay invariants

### Forest routes

Current exact IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

No third route.

### Forest result continuation

Success:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Escape:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Failure:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

### Lumber Hard Work

Eligibility:
ONLY `completed_shifts >= 50`.

Meta reward:
`hardWork:lumber`.

No route/item/School/relationship/challenge prerequisite.

### Lodging

Current authoritative values remain unchanged:
- normal: 100 coins;
- cheap: 50 coins;
- street: 0 coins, next-day Energy −1, Grooming −1.

## Integration order

Recommended Lead order:
1. add the finalized shared Night/lodging localization data;
2. wire shared Night/lodging UI consumers;
3. verify Night/lodging Save/mechanics invariance;
4. add route choice/help and route-specific localization data;
5. implement the pure route-state -> presentationId seam;
6. run the route presentation seam regression;
7. keep neutral default fallback active until safe route-specific visuals are approved;
8. add locale-neutral journal rendering separately;
9. run full check and exact-head CI.

## Test-status note

Chat 3 authored regression/expectation sources.

This handoff does **not** claim those new tests were executed unless Lead/integration CI runs them.

## Handoff conclusion

Items 257–267 separate cleanly into:
- **SHARED_UI_TEXT_READY** — final Night/lodging player-language copy and exact consequence text;
- **ROUTE_COPY_READY** — current logging-road and old-boundary presentation source plus seam regression;
- **JOURNAL_CONSUMER_DEPENDENT** — RU/EN ordinary-poverty and Forest journal expectations;
- **PRODUCT_OPEN** — all unresolved Forest mechanics/lore decisions.

Remaining work is shared UI/presentation/journal consumption or explicit Product decisions, not additional Chat 3 gameplay invention.
