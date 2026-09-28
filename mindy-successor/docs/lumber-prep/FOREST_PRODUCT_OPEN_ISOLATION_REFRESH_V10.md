# Forest Product-Open Isolation Refresh v10

Status: Product-open boundary refresh after queue items 257–266.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

This document confirms that recent Night/lodging, journal and Forest route presentation authoring does not introduce unresolved Forest mechanics or lore.

## Items covered

Night/lodging presentation:
- `SHARED_NIGHT_LODGING_PRODUCTION_COPY_MATRIX_V7.md`;
- `NIGHTFLOW_PLAYER_LANGUAGE_TERMINOLOGY_AUDIT_V1.md`;
- `LODGING_CONSEQUENCE_COPY_BANK_RU_EN_V1.md`;
- `POVERTY_JOURNAL_FACING_COPY_AUDIT_V1.md`.

Forest route presentation:
- `LOGGING_ROAD_ROUTE_SCENE_VARIANTS_V7.md`;
- `OLD_BOUNDARY_ROUTE_SCENE_VARIANTS_V7.md`;
- `forest-route-choice-help-localization-v2.fixture.json`;
- `forest-route-presentation-seam-v4.test.ts`;
- `FOREST_ROUTE_COPY_STATIC_COMPATIBILITY_MATRIX_V2.md`;
- `POVERTY_FOREST_LOCALIZED_JOURNAL_ACCEPTANCE_V1.md`.

All are presentation/copy/acceptance artifacts only.

## Hunter route remains Product-open

No item 257–266 creates:
- Hunter gameplay route ID;
- Hunter route state;
- Hunter clue;
- Hunter capability;
- Hunter provider;
- Hunter route threshold;
- Hunter reward;
- Hunter challenge binding;
- Hunter seasonal rule.

Do not infer a production identity such as:
`forest.route.hunter-trail`
from prose or visual ideas.

## Old Boundary Token remains Product-open

Current gameplay authority remains only:
`itemCapability(enter_old_boundary) present=true`.

No item 257–266 defines:
- where `old_boundary_token` comes from;
- whether it is bought;
- any price;
- provider;
- consume behavior;
- retention;
- turn-in;
- deeper Forest use;
- lore consequence.

Old-boundary presentation stays limited to:
- stones;
- marks;
- path-boundary line.

## Challenge rewards/mechanics remain Product-open

No new production challenge is created.

Still open:
- challenge IDs;
- route binding;
- conditions;
- thresholds;
- progress/endurance values;
- rewards;
- persistent facts/items;
- failure/escape consequences.

Presentation variants are effect-free.

## Seasonal topology remains Product-open

No item 257–266 creates:
- spring closure;
- summer shortcut;
- autumn migration route rule;
- winter frozen crossing;
- season-specific route cost;
- season-specific route reward;
- season-specific challenge availability.

Weather/season imagery may remain presentation-only.

## Deeper Forest lore remains Product-open

No item 257–266 establishes:
- who created the old boundary;
- whether it is legal, territorial, ritual or magical;
- objective meaning of old marks;
- anomaly truth;
- Hunter provenance;
- hidden destination;
- deeper ending;
- lore reward.

Old-boundary visual/copy deliberately preserves ambiguity.

## School Arcana authority remains Product-open

No item 257–266 creates or selects:
- School Arcana world-fact ID;
- provider lesson/result;
- threshold;
- requirement for Forest access;
- canonical interpretation of Forest anomalies.

## Route mechanics remain exact

Current route IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

No third route is introduced.

Current route states:
- `logging-road`;
- `old-boundary`.

Current old-boundary gate stays unchanged.

## Result continuation remains exact

Success:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Escape:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Failure:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

Presentation and journal localization do not alter those identities.

## Lumber Hard Work remains exact

Eligibility:
ONLY `completed_shifts >= 50`.

Meta reward:
`hardWork:lumber`.

No route, token, Hunter, School, relationship, challenge or journal prerequisite is added.

## Night/lodging mechanics remain exact

Items 257–260 change copy only.

They do not change:
- lodging costs;
- housing values;
- street next-day penalties;
- Night phase order;
- voluntary choice count;
- School Night Study mechanics;
- Foreman Night mechanics;
- Save state.

## Journal consumer boundary

Items 260 and 266 define expected localized rendering only.

They do not authorize:
- rewriting history on locale switch;
- replaying choice effects;
- altering event identity;
- schema migration solely for localization.

## Isolation conclusion

Items 257–266 are safe presentation/localization sources only.

Product decisions are still required before any implementation of:
- Hunter route;
- Old Boundary Token acquisition/use;
- Forest challenge mechanics/rewards;
- School Arcana authority;
- seasonal mechanical topology;
- deeper Forest lore outcomes.
