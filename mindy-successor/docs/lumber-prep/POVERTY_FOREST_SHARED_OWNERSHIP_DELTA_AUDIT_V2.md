# Poverty / Forest Shared Ownership Delta Audit v2

Status: exact ownership/collision audit after PR #49.

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

This audit compares the post-PR49 Chat 3 payload against shipped localization/presentation ownership.

## Proposed Chat 3 sets

- poverty text patch: **33** keys;
- shared Night/lodging: **20** keys;
- Forest route presentation: **16** keys.

## Exact current-root overlaps

### Poverty text patch

Exact overlaps:
**33**.

Interpretation:
all are intentional same-domain replacements under shipped `event.poverty-*` keys.

These are not cross-owner collisions.

### Shared Night/lodging

Exact overlaps:
**0**.

Interpretation:
all 20 keys remain additive.

### Forest route presentation

Exact overlaps:
**0**.

Interpretation:
all final route text/help/normalized alt-caption keys remain additive.

## Shipped owner namespaces

Current School-owned localization key count:
**24**.

Current Foreman-related localization key count:
**19**.

Current `presentation.static.*` key count:
**176**.

Current legacy/root `media.*` + `activityOption.*` key count:
**13**.

Real Chat 3 cross-owner exact-key collisions:
**0**.

## Real collisions

None.

## Forest gameplay-ID references

Current shipped Forest route IDs:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Item 240 references these exact IDs only.

It does not create a third route ID.

Current root route-specific presentation slots:
- none

Therefore the semantic route presentation IDs remain additive presentation references, not collisions with an existing root slot.

## School boundary

Chat 3 shared Night/lodging keys do not replace:
- `ui.school.*`;
- School course keys;
- School Night Study labels/buttons/context.

No exact collision with School ownership is present.

## Foreman boundary

Chat 3 does not replace:
- `nightChoice.lumber.foreman.night.label`;
- Foreman event copy;
- Foreman media localization;
- Foreman static-media localization.

No exact collision with Foreman ownership is present.

## Static-media boundary

PR47–49 own/refine `presentation.static.*`.

Chat 3 final Forest route alt/caption keys use the normalized namespace:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

No `presentation.static.*` key is overwritten.

The 33-key poverty text patch contains no media key.

## Legacy-root boundary

Existing route labels remain:
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

Item 240 records them as current references and does not replace them.

Legacy `media.*` keys are not overwritten by the final route fixture.

## Collision disposition

Only intended overlap:
- 33 ordinary-poverty same-domain text updates.

Actual cross-owner collisions:
- **0**.

No School/Foreman/static/legacy-root ownership conflict blocks selective integration.

## Product boundary

No collision result should be interpreted as authorization to add:
- Hunter route semantics;
- Old Boundary Token acquisition/use;
- challenge mechanics;
- School Arcana provider;
- seasonal topology;
- deeper lore outcomes.
