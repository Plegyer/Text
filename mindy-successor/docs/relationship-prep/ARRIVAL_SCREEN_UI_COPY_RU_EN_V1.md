# Arrival Screen UI Copy RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: pre-arrival shell before the existing `arrival` action.

## Eyebrow

Stable key: `ui.town.eyebrow`  
RU: По ту сторону люка  
EN: Beyond the hatch

Current root already contains this exact key and it can be reused on the pre-arrival screen.

## `ui.arrival.title`
RU: Следуйте за сусликом  
EN: Follow the gopher

## `ui.arrival.body`
RU: Обычный день. Белый суслик. Люк, который кто-то забыл закрыть.  
EN: An ordinary day. A white gopher. A hatch someone forgot to close.

## `ui.arrival.button`
RU: Пойти за ним  
EN: Follow it

## Boundary

Text only. Do not alter:
- `arrival` action ID;
- creation completion gate;
- `story.arrived` flag;
- arrival event selection;
- trigger/effect/reward behavior;
- RNG or Save state.
