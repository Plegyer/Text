# PR49 static refinement identity QA v1

Status: COMPLETE / GREEN_IDENTITY_PRESERVED

Current main:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`.

Scope:
the 27 PR49 refined current-production School / ordinary-poverty / Forest-return-reaction / Foreman static mappings.

## Semantic presentation identity

PR49 replaces generic physical static fallback bindings only.

For each refined surface:
- semantic `presentationId` remains unchanged;
- the slot key remains the authoritative current production ID;
- only the static `src` and accessibility key become more specific.

Exact groups:
- School: 9;
- poverty: 10;
- Forest return/reaction: 6;
- Foreman: 2.

## Gameplay/event identity

No event/action/Activity/relationship gameplay ID is renamed or duplicated.

Examples:
- School current lesson IDs remain current School lesson presentation IDs;
- poverty keeps the exact already-shipped ordinary-poverty event IDs;
- Forest retains exact success/escape/failure return/reaction presentation IDs;
- Foreman retains exact milestone and voluntary Night event presentation IDs.

PR49 file diff contains no gameplay definition/pack/engine mutation.

## Same source across RU↔EN

Each refined slot contains one locale-neutral static `src` and one locale-neutral `altKey`.

The presentation resolver takes semantic presentation identity and animation settings, not locale.

PR49 regression proves for all 27:
- animations-on source == expected refined SVG;
- animations-off source == same expected refined SVG;
- altKey == same locale-neutral key.

Locale affects only the localized alt/caption text resolved from that key.

## Save / RNG / effects / counters

PR49 does not edit:
- Save schema;
- gameplay RNG;
- command execution;
- conditions/effects;
- counters;
- resource deltas.

Therefore static refinement cannot change those mechanics.

Existing full test suite remains green on:
- exact PR head: 317/317;
- merged main: 317/317.

The existing renderer static-media RU↔EN regression also remains green and requires image source identity to stay stable while locale text changes.

## Domain locks

### School

No teacher-specific route/event identity is promoted.

Course/Night mechanics and Save behavior are untouched.

### Poverty

No ordinary-poverty event condition/effect is changed.

No Secret Debt asset or mechanic is introduced.

### Forest

Exact result identities remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact reaction continuation remains unchanged.

Route-specific logging-road/old-boundary presentation is not activated by PR49.

### Foreman

Relationship stage/counter/Night effect remain current behavior.

Static media does not change relationship state.

## Accessibility behavior

RU↔EN may change:
- alt text;
- caption/presentation text.

RU↔EN must not change:
- semantic presentationId;
- physical refined SVG;
- event/action/Activity identity;
- selected static media identity;
- Save;
- RNG;
- effects;
- counters.

## Verdict

`GREEN_IDENTITY_PRESERVED`.

PR49 refines presentation specificity without changing gameplay or semantic identity.
