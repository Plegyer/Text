# Route localized-label consumer acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Current app still renders the selected Activity route value directly from:
`activity.internalState.routeId`.

Visible machine values are:
- `logging-road`;
- `old-boundary`.

The wrapper `ui.activity.routeLabel` is already localized, and approved route-option labels already exist.

## Required mapping

For a selected routeId:
1. read the current Activity definition;
2. find the exact option whose `setRoute === routeId`;
3. reuse `activityOption.<optionId>.label`;
4. fall back to the authored option label;
5. use raw routeId only as an unknown historical compatibility fallback.

Forest examples:
- `logging-road` -> `forest.route.logging-road` -> Лесовозная дорога / Logging road;
- `old-boundary` -> `forest.route.old-boundary` -> Старая межевая тропа / Old boundary path.

## Persisted identity

Save must continue to store exactly:
- `logging-road`;
- `old-boundary`.

Never persist translated route labels.

No Save migration is required.

## Locale invariance

From one post-selection Save, RU↔EN must preserve:
- routeId;
- Activity ID;
- checkpoint;
- progress/endurance;
- resolved option IDs;
- accumulated rewards;
- semantic presentationId;
- selected physical media;
- Activity RNG;
- run RNG;
- serialized gameplay Save.

Only the rendered route label changes.

## Current media state

Latest main has:
- logging-road specific static;
- old-boundary v3 specific static;
- neutral route/default retained as fallback.

Route-label localization must not alter any of those presentation selections.

## Old Boundary gate

The label consumer must not grant or bypass:
`itemCapability(enter_old_boundary) present=true`.

## Required executable regression

For each current route:
- enter real Forest Activity;
- select the exact route legitimately;
- snapshot Save/RNG;
- assert localized RU selected-route label;
- switch EN;
- assert localized EN label;
- require identical routeId/presentationId/media/Save/RNG;
- continue through an unchanged current result.

## Verdict

`ACCEPTANCE_CONTRACT_READY`.

Correct direction:
`stable persisted routeId -> exact authored route option -> localized display label`.

Gameplay identity remains unchanged.
