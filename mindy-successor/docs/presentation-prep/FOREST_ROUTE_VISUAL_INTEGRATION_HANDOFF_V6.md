# Forest Route Visual Integration Handoff v6

Scope: Chat 2 items **292–302**.

Exact current-main baseline used for the audit:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Worker branch:
`chat2/presentation-replacement-next`.

## LOGGING_STATIC_READY

New project-owned asset:

`prior-work/astra/prototype-m3.2/assets/presentation/forest-route-logging-road-v2.svg`.

Exact candidate semantic presentation ID:

`activity/forest/route/logging-road`.

Visual semantics:
- broad logging road;
- paired wheel ruts;
- cut branches;
- ordinary work/timber marks;
- forest edge.

Explicitly not encoded:
- result;
- reward;
- route unlock;
- Hunter/token/challenge;
- gameplay duration.

Old worker source:

`forest-route-logging-road.svg`

is **REVISE / SOURCE HISTORY ONLY** and should not be selected when v2 is available.

Status:
**LOGGING_STATIC_READY**.

## OLD_BOUNDARY_STATIC_READY

New project-owned asset:

`prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary-v3.svg`.

Exact candidate semantic presentation ID:

`activity/forest/route/old-boundary`.

Visual semantics:
- narrow old boundary path;
- weathered stones;
- old markings;
- stone/terrain boundary line.

Explicitly excluded:
- constructed entrance/barrier;
- Hunter;
- token/key;
- challenge;
- reward;
- success/failure/result cue.

Old worker source:

`forest-route-old-boundary.svg`

is **DO_NOT_SHIP / SOURCE HISTORY ONLY** because its crosspiece/upright geometry can read as a constructed barrier.

Status:
**OLD_BOUNDARY_STATIC_READY**.

## LOCALIZATION_READY

Candidate localization file:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-static-localization-v4.json`.

Normalized RU+EN keys:

- `presentation.static.forest.route.logging-road.alt`
- `presentation.static.forest.route.logging-road.caption`
- `presentation.static.forest.route.old-boundary.alt`
- `presentation.static.forest.route.old-boundary.caption`

Wording has been reviewed for:
- concise visible description;
- RU/EN semantic parity;
- no route eligibility spoiler;
- no Hunter/token/challenge/reward/result implication.

Accessibility review:

`docs/presentation-prep/FOREST_ROUTE_STATIC_ACCESSIBILITY_REVIEW_V1.md`.

Status:
**LOCALIZATION_READY**.

## Candidate route-specific slots

Candidate presentation patch:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-static-slots-v2.json`.

Slots:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Both fallback to:

`activity/forest/route/default`.

The current shared default remains:

`assets/presentation/forest-route-default-v1.svg`.

That shared fallback is SAFE and must not be replaced by route-specific art.

## BUILD_READY

Current build path:

`await cp('assets','dist/assets',{recursive:true});`

means expected copies are:

- `assets/presentation/forest-route-logging-road-v2.svg`
  -> `dist/assets/presentation/forest-route-logging-road-v2.svg`;

- `assets/presentation/forest-route-old-boundary-v3.svg`
  -> `dist/assets/presentation/forest-route-old-boundary-v3.svg`.

No build-script modification is required.

Audit:

`docs/presentation-prep/FOREST_ROUTE_STATIC_BUILD_COPY_AUDIT_V1.md`.

Status:
**BUILD_READY**.

## Regressions prepared

### Static semantics

`prior-work/astra/prototype-m3.2/tests/forest-route-static-semantics-v2.test.ts`

Validates:
- both SVGs exist;
- schema-valid slot candidate;
- exact route-specific IDs;
- shared default fallback;
- normalized alt keys;
- local/no-script/no-external SVG sources;
- old-boundary source/text excludes challenge/result semantics;
- presentation-only payload.

### Locale invariance

`prior-work/astra/prototype-m3.2/tests/forest-route-static-locale-invariance-v2.test.ts`

Validates:
- semantic ID is locale-neutral;
- source path is locale-neutral;
- fallback is locale-neutral;
- only alt/caption text changes between RU and EN;
- locale data cannot select another route asset.

## ANIMATION_FUTURE

Backlog:

`docs/presentation-prep/FOREST_ROUTE_ANIMATION_SOURCE_BACKLOG_V1.md`.

Future source plan:
- three logging-road sequences;
- three old-boundary sequences;
- four SVG frames suggested per sequence;
- no GIF claim;
- no candidate path claim.

No route-specific animation frame source or GIF byte is created by items 292–303.

Status:
**ANIMATION_FUTURE**.

## PRODUCT_OPEN_EXCLUDED

The following remain outside Chat 2 production activation:

### Runtime/route plumbing

Current-main production still ships one shared route slot:
`activity/forest/route/default`.

Route-specific static candidates should be activated only on an integration head where the exact Chat3 route-specific presentation identities are wired.

Chat 2 does not modify:
- Activity route selection;
- route entry conditions;
- progress/endurance;
- source action plumbing;
- presentation runtime/schema/UI.

### Forbidden route semantics

Excluded from visual/localization work:
- Hunter identity;
- token/key;
- challenge;
- constructed old-boundary entrance;
- reward;
- success/failure;
- hidden result mechanics.

### Superseded old worker assets

Excluded from production activation:
- `forest-route-logging-road.svg`;
- `forest-route-old-boundary.svg`.

Retain as source history only.

## Exact selective-copy manifest

Use:

`docs/presentation-prep/FOREST_ROUTE_VISUAL_SELECTIVE_COPY_MANIFEST_V1.md`.

Safe selective-copy set from items 293–300:
- 2 SVG assets;
- localization candidate;
- slot candidate;
- 2 tests;
- build-copy audit;
- accessibility review.

Do not merge the long-lived worker branch wholesale.

## Lead integration sequence

On a fresh branch from current main:

1. confirm exact route-specific Chat3 semantic IDs are present or being integrated;
2. copy logging-road v2 and old-boundary v3 SVGs;
3. copy candidate localization/slot files;
4. copy the two targeted tests;
5. merge the four localization keys into root localization;
6. merge the two route-specific static slot overrides only against the exact route IDs;
7. preserve fallbackId `activity/forest/route/default`;
8. preserve current default static asset;
9. run route semantic and locale-invariance tests;
10. run normal build and verify dist copies;
11. run full project checks;
12. require exact-head CI.

## Final state

Logging road static:
**LOGGING_STATIC_READY**.

Old boundary static:
**OLD_BOUNDARY_STATIC_READY**.

RU+EN accessibility:
**LOCALIZATION_READY**.

Build-copy path:
**BUILD_READY**.

Route-specific animation:
**ANIMATION_FUTURE**.

Runtime/gameplay/product-open mechanics:
**PRODUCT_OPEN_EXCLUDED**.

Actual route-specific GIF files:
**0**.

Gameplay/runtime/schema/UI changes by Chat 2:
**0**.
