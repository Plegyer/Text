# Housing / Season Generic Labels RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `295e6fc74d235f0b7555794555a18373451e8b7e`

## Current target housing identities

### `housing.normal.label`
RU: Обычная комната  
EN: Normal room

### `housing.cheap.label`
RU: Дешёвый ночлег  
EN: Cheap lodging

### `housing.street.label`
RU: Улица  
EN: Street

These map to current `housingState.current` IDs only.

## Current legacy compatibility housing labels

Current root already ships exact RU+EN keys:
- `housing.room.label` — Обычная комната / Normal room
- `housing.hostel.label` — Дешёвый ночлег / Cheap lodging
- `housing.shelter.label` — Улица / Street

Reuse them for compatibility consumers that still see legacy housing IDs.

## Seasons

### `season.spring.label`
RU: Весна  
EN: Spring

### `season.summer.label`
RU: Лето  
EN: Summer

### `season.autumn.label`
RU: Осень  
EN: Autumn

### `season.winter.label`
RU: Зима  
EN: Winter

## Current consumers

- HUD date season label;
- calendar-season / legacy-season requirement explanation;
- target housing-tier requirement explanation;
- town-note / compatibility housing presentation.

## Night boundary

This file contains generic identity labels only.

It does not replace or duplicate:
- Night/lodging stage copy;
- lodging choice labels;
- price/delta annotations;
- NightFlow mechanics.

## Boundary

No housing IDs, season IDs, costs, penalties, calendar math, Save migration or NightFlow changes.
