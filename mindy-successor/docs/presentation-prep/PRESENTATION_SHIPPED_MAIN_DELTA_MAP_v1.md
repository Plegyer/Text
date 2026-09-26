# Presentation Shipped Main Delta Map v1

Status: comparison of accepted Chat 2 presentation contracts against the Product Activation milestone shipped on main at `9b427d75dc22021cd3373aa7dd3521782e54152d`.

The authoritative machine-readable map is `content/presentation-shipped-main-delta.fixture.json`.

## Scope

The map covers the 21 semantic product slots already accepted by Chat 2:

- four Lumber seasonal shift slots;
- Lumber result and career milestone;
- Foreman relationship and Night;
- Forest Activity route and success return;
- all eight School paid lesson slots;
- Hard Work, Forewoman and Forest Lumber endings.

It records the expected shipped source domain, current static fallback, planned future GIF target when one exists, and Product Acceptance relevance.

## Main activation delta

Product Activation PR #20 changed the comparison point materially:

- semantic slash `presentationId` now survives save/reload;
- pending event scenes are wired with semantic IDs;
- all eight School course slots are first-class presentation slots;
- Forest Activity route/result slots are first-class presentation slots;
- target Lumber production events/endings are in the shipped catalog.

Therefore the remaining differences on this map are primarily presentation-media quality gaps, not identity/runtime blockers.

## PA requirement notation

`required` means the named slot is explicitly needed by the PA00–PA26 path.

`family-representative` means PA requires the family behavior but the execution plan does not require every member simultaneously. Examples:

- PA04 requires a seasonal/repeatable Lumber variant for the active season, so the non-spring seasonal siblings remain valid family alternatives;
- PA07 requires a paid School lesson; any one of the eight shipped courses can satisfy that step while all eight semantic slots remain product-valid.

`not-required` means the slot is shipped/covered but not required by the current PA00–PA26 route. `ending/lumber/forest` is such a slot because the current Lumber PA fixture nominates Forewoman as the complex ending branch.

## Static fallback

All mapped current fallbacks are expected to be shipped image media:

- Lumber -> `assets/stage-lumber.svg`;
- Foreman/town/endings -> `assets/stage-town.svg`;
- Forest -> `assets/stage-forest.svg`;
- School -> `assets/stage-school.svg`.

School differs from older pre-activation continuation evidence: shipped main gives every School course slot the `stage.school` base media rather than relying on town fallback.

## Future GIF delta

Seven planned GIFs remain future-only:

- four seasonal Lumber shift GIFs;
- accepted-hand career milestone GIF;
- Foreman professional daytime GIF;
- Foreman professional Night GIF.

Their absence is non-fatal. Static fallback remains mandatory and semantic identity is independent from filename.

## Integration guidance

This delta map is evidence, not a runtime patch. It does not request changes to shared catalog/runtime/UI. Lead should use it when selecting which Chat 2 fixtures/tests remain compatible with the shipped main baseline and when recording PA media evidence.
