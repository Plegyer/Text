# Activity Generic Shell UI Copy RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`

Scope: generic active-Activity shell wording only. Forest route/result-specific copy remains outside this item.

## `ui.activity.eyebrow`
RU: Вылазка  
EN: Activity

Current fallback seam: `Activity`

## `ui.activity.progressLabel`
RU: Прогресс  
EN: Progress

Current fallback seam: `Прогресс:`

## `ui.activity.enduranceLabel`
RU: Выносливость  
EN: Endurance

Current fallback seam: `Выносливость:`

## `ui.activity.checkpointLabel`
RU: Контрольная точка  
EN: Checkpoint

Current fallback seam currently exposes implementation word `checkpoint:`.

## `ui.activity.routeLabel`
RU: Маршрут  
EN: Route

Current fallback seam currently exposes implementation word `route:`.

## Existing Explore-entry source to reuse

Do not duplicate item-86 keys:
- `ui.explore.activityHelp`
- `ui.explore.entryEnergy`
- `ui.explore.enterButton`

## Boundary

Text only. Do not alter:
- Activity ID;
- checkpoint ID;
- route ID;
- progress/endurance values;
- Activity action IDs;
- entry conditions/costs;
- save/reload semantics;
- Forest route/result mechanics;
- RNG or Save state.
