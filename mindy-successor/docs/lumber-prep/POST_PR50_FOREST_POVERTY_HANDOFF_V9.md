# Post-PR50 Forest / Poverty Handoff v9

Status: selective-integration handoff for queue items 245–255.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Never merge this long-lived worker branch wholesale.

## SHARED_NIGHT_UI_READY

Files:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_COPY_FINAL_REVIEW_V6.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v5.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v2.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-ui-invariance-v1.fixture.json`.

State:
- 20 additive RU+EN keys;
- 0 root collisions on post-PR50 main;
- 4 shipped keys reused rather than duplicated;
- exact current UI fallback/consumer seams mapped;
- representative normal/cheap/street Night paths record unchanged cost/Energy/housing/Save expectations.

Lead-owned UI wiring is still required for visible consumption.

Do not change:
- NightFlow phase IDs/order;
- lodging IDs;
- housing values;
- costs;
- next-day Energy mechanics;
- commands;
- Save state.

## ROUTE_PRESENTATION_COPY_READY

Files:
- `docs/lumber-prep/LOGGING_ROAD_ROUTE_PRESENTATION_COPY_FINAL_REVIEW_V6.md`;
- `docs/lumber-prep/OLD_BOUNDARY_ROUTE_PRESENTATION_COPY_FINAL_REVIEW_V6.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v6.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/forest-route-natural-path-acceptance-v3.fixture.json`.

Exact gameplay routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Exact semantic presentation IDs:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Current choice labels remain unchanged; final route fixture adds text/help/normalized alt/caption only.

## ROUTE_SEAM_REQUIRED

Files:
- `docs/lumber-prep/POST_PR50_FOREST_POVERTY_BASELINE_V9.md`;
- `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ID_SEAM_CONTRACT_V3.md`.

PR #50 now ships:
`activity/forest/route/default`
with project-owned static fallback:
`assets/presentation/forest-route-default-v1.svg`.

Shared UI still requests the default presentation regardless of selected route.

Required pure mapping after authoritative route selection:
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

The seam must:
- write no gameplay Save;
- use no gameplay RNG;
- mutate no route;
- mutate no result;
- fall back to the shipped default when route-specific presentation is unavailable.

## VISUAL_SOURCE_REVISION_REQUIRED

File:
`docs/lumber-prep/OLD_BOUNDARY_VISUAL_BRIEF_CORRECTION_V2.md`.

Safe old-boundary visual semantics:
- old stones;
- weathered marks;
- path boundary;
- ordinary forest.

Explicitly unsafe without Product decision:
- constructed gate/arch/checkpoint;
- token slot/use;
- Hunter iconography;
- reward/challenge reveal;
- magic/lore conclusion.

Until corrected project-owned route-specific art exists:
use the shipped neutral default fallback.

## PRODUCT_OPEN

Unchanged Product-open topics:
- Hunter route identity/source/gate/reward;
- Old Boundary Token acquisition/use;
- challenge thresholds/rewards;
- School Arcana provider/fact;
- seasonal mechanical topology;
- deeper Forest lore outcome.

No item in 245–255 closes those questions.

## Exact Forest invariants

Activity:
`lumber.forest`.

Results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Reaction boundaries:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Lumber Hard Work:
- ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

## Selective-copy groups

### Group A — shared Night/lodging
Copy the four SHARED_NIGHT_UI_READY files above.

### Group B — route presentation source
Copy:
- the two route copy review docs;
- `forest-route-presentation-final-v6.fixture.json`;
- `forest-route-natural-path-acceptance-v3.fixture.json`.

### Group C — shared route seam contract
Copy:
- `POST_PR50_FOREST_POVERTY_BASELINE_V9.md`;
- `FOREST_ROUTE_PRESENTATION_ID_SEAM_CONTRACT_V3.md`.

### Group D — visual correction
Copy:
- `OLD_BOUNDARY_VISUAL_BRIEF_CORRECTION_V2.md`.

## Handoff conclusion

Post-PR50 data/copy is ready.

Remaining active dependencies:
1. Lead-owned shared Night/lodging UI consumption;
2. Lead-owned route-state -> presentationId seam;
3. corrected/approved old-boundary project-owned visual source;
4. Product decisions for Hunter/token/challenge/Arcana/season/lore mechanics.
