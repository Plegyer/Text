# Forest route localized copy QA v3

Status: COMPLETE / GREEN_SELECTIVE_LOCALIZATION_SOURCE

Current main:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

PR57 exact head adds the presentation seam but does not add these route copy keys.

Reviewed latest Chat3 sources:
- `LOGGING_ROAD_FINAL_LOCALIZED_SCENE_BANK_V8.md`
  blob `d3d3dbf9a242a4a459ac819ed0e386ed697f214b`;
- `OLD_BOUNDARY_FINAL_LOCALIZED_SCENE_BANK_V8.md`
  blob `cd9cd625a7206fe6716de22922eca249e62698d8`;
- `forest-route-title-help-localization-v3.fixture.json`
  blob `f25da9c20581df84ea7b12986db92d85496c10e7`;
- `forest-route-alt-caption-localization-v3.fixture.json`
  blob `80250bdf464cfdf55b378d714ac1c78112094447`.

## Exact route identities

Only current routes are used:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Semantic presentation IDs:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

No third route is present.

## Title/help/choice-label fixture

Keys:
`6`.

Current collision result:
- exact-identical existing choice-label keys: 2;
- additive title/help keys: 4;
- conflicts: 0.

Existing exact keys:
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

Additive:
- logging-road title/help;
- old-boundary title/help.

Missing RU:
0.

Missing EN:
0.

## Alt/caption fixture

Keys:
`4`.

All four:
- additive;
- complete RU+EN;
- conflict-free;
- normalized slash-free localization keys.

Exact:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

The key grammar is compatible with the shipped localization/presentation altKey rules.

## Combined root-copy classification

Across the two fixtures:
- total strings: 10;
- exact-identical reuse: 2;
- genuinely additive: 8;
- conflicting: 0.

Selective production localization should:
- keep the 2 current choice labels;
- add the 8 route title/help/alt/caption keys.

## Logging-road semantic review

Final copy is limited to:
- broad logging road;
- wheel ruts;
- cut/trimmed branches;
- timber/work traces;
- ordinary forest work marks.

No copy claims:
- easier mechanics;
- progress bonus;
- reward;
- guaranteed result;
- Hunter ownership;
- hidden item.

## Old-boundary semantic review

Final copy is limited to:
- old stones;
- weathered marks;
- narrow path/boundary line;
- older human traces.

It explicitly avoids:
- gate/arch/checkpoint;
- token use;
- Hunter ownership;
- magic/ritual truth;
- challenge/reward;
- hidden destination.

This matches the current Product authority.

## Current gameplay gate

Old Boundary remains gated only by the existing current:
`itemCapability(enter_old_boundary) present=true`.

Localization does not explain/select token acquisition/use semantics.

## Result/journal boundary

Route selection does not create route-specific result IDs.

Forest exact result identities remain:
- success;
- escape;
- failure
under the current `lumber.forest.*` results/reactions.

PR54 stable Journal refs do not change this ownership.

## Scene banks

Each route has 8 RU+EN presentation-only scene variants.

Those banks are authored source options, not automatically root-loaded random variants.

They contain no effects/rewards/gameplay fields.

Any future use must remain deterministic/presentation-only and must not consume gameplay RNG.

## Verdict

`GREEN_SELECTIVE_LOCALIZATION_SOURCE`.

Current safe root delta is:
8 additive route title/help/alt/caption keys,
with the 2 current route-choice labels reused unchanged.

Product-open Hunter/token/challenge/reward/deeper-lore semantics remain isolated.
