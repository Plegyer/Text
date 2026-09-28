# Forest Route Copy / Static Compatibility Matrix v2

Status: semantic compatibility check between current route copy, the shipped neutral default static, and future route-specific visual direction.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

This matrix flags presentation mismatches only. It does not activate assets or change gameplay.

## Compatibility matrix

| Route presentation | Copy source | Visual source / brief | Compatibility | Notes |
| --- | --- | --- | --- | --- |
| default, before route selection | shared Activity envelope | shipped `assets/presentation/forest-route-default-v1.svg` | **COMPATIBLE** | Neutral trail does not select a route or outcome. |
| logging road | `LOGGING_ROAD_ROUTE_PRESENTATION_COPY_FINAL_REVIEW_V6.md` | shipped neutral default fallback | **COMPATIBLE_AS_FALLBACK** | Visual is less specific than copy, but does not contradict logging-road mechanics or lore. |
| logging road | same | future logging-road brief / previously reviewed logging-road static source | **COMPATIBLE** | Wheel ruts, cut branches, timber/work marks match current route prose. |
| old boundary | `OLD_BOUNDARY_ROUTE_PRESENTATION_COPY_FINAL_REVIEW_V6.md` | shipped neutral default fallback | **COMPATIBLE_AS_FALLBACK** | Neutral trail does not falsely imply token use, gate, Hunter knowledge or lore. |
| old boundary | same | corrected `OLD_BOUNDARY_VISUAL_BRIEF_CORRECTION_V2.md` | **COMPATIBLE** | Old stones, weathered marks and a path-boundary line match current safe prose. |
| old boundary | same | earlier constructed crossbar/gate-like route source | **SEMANTIC_MISMATCH** | Adds a constructed boundary feature not established by current stones/marks semantics. |

## Shipped neutral default

Presentation ID:
`activity/forest/route/default`.

Static:
`assets/presentation/forest-route-default-v1.svg`.

Safe uses:
- before route selection;
- fallback when a route-specific slot is absent;
- fallback when a route-specific asset is rejected or unavailable.

The neutral default should not be described with route-specific alt text.

## Logging-road compatibility

Current safe copy establishes:
- broad worked road;
- wheel ruts;
- trimmed branches;
- timber;
- work marks;
- narrowing back into forest.

A future logging-road visual is semantically compatible when it shows some subset of those visible traces without implying:
- lower endurance cost;
- easier progress;
- guaranteed success;
- reward;
- special challenge.

The generic default remains safe but visually non-specific.

## Old-boundary compatibility

Current safe copy establishes:
- old boundary stones;
- weathered marks;
- stony/path boundary line;
- older traces distinct from current logging work.

A future old-boundary visual is compatible when it stays within those physical traces.

Semantic mismatches include:
- built gate or arch;
- checkpoint;
- token slot;
- toll/payment station;
- Hunter symbol/NPC;
- magical activation;
- reward reveal;
- challenge-state indicator.

## Alt/caption consistency

Logging-road normalized keys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`.

Old-boundary normalized keys:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Use route-specific alt/caption only with a route-specific presentation source that actually supports that semantic identity.

For the shared default static, continue using:
`presentation.static.forest.route.default.alt`
and its shipped caption.

## Gameplay firewall

Static/media compatibility must not influence:
- route availability;
- Old Boundary gate;
- route state;
- progress;
- endurance;
- RNG;
- Save;
- result continuation;
- Lumber Hard Work.

## Matrix conclusion

Current copy is compatible with the shipped neutral fallback for both routes.

A logging-road-specific visual can safely become more concrete around ordinary forestry traces.

An old-boundary-specific visual must be revised to the neutral stones/marks/path brief before activation; constructed gate-like imagery remains a semantic mismatch.
