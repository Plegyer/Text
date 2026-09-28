# Forest Route Selective Integration Acceptance v4

Status: Lead acceptance checklist for selective post-PR54 Forest route presentation integration.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

## Required selective inputs

1. `prior-work/astra/prototype-m3.2/content/forest-route-localization-delta-v8.fixture.json`
2. `docs/lumber-prep/LOGGING_ROAD_COPY_AMBIGUITY_SCRUB_V8.md`
3. `docs/lumber-prep/OLD_BOUNDARY_COPY_AMBIGUITY_SCRUB_V8.md`
4. `docs/lumber-prep/FOREST_ROUTE_ACCESSIBILITY_COPY_LEDGER_V1.md`
5. `prior-work/astra/prototype-m3.2/content/forest-route-seam-ui-expectation-v5.fixture.json`
6. `docs/lumber-prep/FOREST_ROUTE_INVALID_STATE_SAFETY_MATRIX_V1.md`

Do not merge the entire Chat 3 worker branch.

## 10-key localization acceptance

Item 285 contains exactly ten final route-specific RU+EN presentation keys:
- logging-road title/body/help/alt/caption;
- old-boundary title/body/help/alt/caption.

Post-PR54 classification:
- ADDITIVE: 10;
- IDENTICAL: 0;
- CONFLICT: 0.

PASS only if:
- all ten keys are added without renaming;
- RU+EN are complete;
- no gameplay field is added;
- current route labels/IDs remain unchanged.

## Pure route -> presentationId seam

Authoritative source:
`run.flow.activity.internalState.routeId`.

Required mapping:
- no selected route -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

PASS only if the mapping is read-only, deterministic and locale-neutral.

## Default before selection

Before route selection:
- current root default presentation remains active;
- project-owned static fallback remains valid;
- no route-specific copy/media is shown as if already selected.

## Route-specific after selection

After authoritative route selection:
- logging-road may resolve logging-road presentation;
- old-boundary may resolve old-boundary presentation.

Missing route-specific visual source is not a blocker:
the neutral default static may remain the visual fallback.

No route-specific asset activation is required to accept the text/seam integration.

## Save/RNG invariance

PASS only if presentation resolution:
- writes no Save field;
- changes no route state;
- changes no resolved option ID;
- advances neither global nor Activity RNG;
- changes no progress/endurance.

## Invalid-state safety

Unsupported non-null route state:
- strict helper rejects;
- safe UI may fall back to default;
- gameplay state remains untouched;
- no route identity is invented.

## Exact Forest result invariants

Must remain:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

Exact reactions remain:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

## Lumber Hard Work invariant

Must remain:
- condition ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

Reject any integration that adds:
- route prerequisite;
- item/token prerequisite;
- School prerequisite;
- relationship prerequisite;
- challenge prerequisite.

## Old Boundary semantic acceptance

Text/accessibility may show only established:
- stones;
- marks;
- path/boundary line.

No gate/token/Hunter/magic/reward semantics.

## Journal independence

PR #54 journal-ref localization is independent of route presentation.

Route seam integration must not:
- modify journal refs;
- replay event effects;
- change lastAction outcome refs.

## Test evidence expected

On the integration branch:
- route mapping unit coverage;
- null/invalid-state coverage;
- Save/RNG invariance;
- current Forest result regression;
- Lumber Hard Work regression;
- full project check;
- exact-head CI.

Chat 3 does not claim these tests were executed by this handoff.

## Acceptance result

The slice is production-ready when ten presentation keys plus the pure route-state mapping can vary presentation without changing any gameplay identity, effect, RNG, Save or result.
