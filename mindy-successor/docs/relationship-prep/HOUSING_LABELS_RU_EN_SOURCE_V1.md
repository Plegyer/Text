# Housing Labels RU+EN Source v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`

## Canonical current target housing identities

### `housing.normal.label`
RU: Обычная комната  
EN: Normal room

### `housing.cheap.label`
RU: Дешёвый ночлег  
EN: Cheap lodging

### `housing.street.label`
RU: Улица  
EN: Street

These IDs are the current target `housingState.current` identities.

## Current compatibility aliases still exposed by UI

Current engine exposes a legacy-compatible `run.housing` view derived from the target housing state, and current town/legacy condition consumers can still receive these IDs.

### `housing.room.label`
RU: Обычная комната  
EN: Normal room

Alias of current target `normal`.

### `housing.hostel.label`
RU: Дешёвый ночлег  
EN: Cheap lodging

Alias of current target `cheap`.

### `housing.shelter.label`
RU: Улица  
EN: Street

Alias of current target `street`.

## Consumer rule

Prefer canonical target housing identity when available:

`tr(`housing.${state.run.housingState.current}.label`, fallback)`

For a current compatibility consumer that still receives legacy `run.housing`, resolve the exact alias key above rather than displaying a raw ID.

## No lodging mechanics change

These labels do not change:
- lodging IDs;
- room prices;
- housing transitions;
- street penalties;
- next-day Energy;
- grooming effects;
- paid-for-current-night state;
- Save migration/compatibility behavior.

## Boundary

Presentation labels only. No cost, condition, effect or NightFlow changes.
