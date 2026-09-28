# HUD Date / Energy / Coins RU+EN Audit v1

Date: 2026-09-28
Owner: Chat 5
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`

## Already shipped and reusable

Current HUD already resolves these root localization keys:
- `ui.hud.day` — RU `День`, EN `Day`
- `ui.hud.year` — RU `Год`, EN `Year`
- `ui.hud.of` — RU `из`, EN `of`
- `ui.hud.energy` — RU `Энергия`, EN `Energy`
- `ui.hud.coins` — RU `монет`, EN `coins`
- `ui.hud.menu` — RU `Меню`, EN `Menu`

No duplicate HUD keys should be introduced for those labels.

## Missing player-facing seasonal date labels

Current date rendering uses `labels[d.season]`, which is Russian-only. The missing RU+EN source is:

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

## Recommended consumer behavior

HUD date should resolve the current season identity through the stable locale-neutral season ID and fall back to the existing `labels[d.season]`.

No calendar/date arithmetic changes.

## Boundary

Text only. Do not alter:
- day/year counters;
- season calculation;
- Energy;
- money;
- HUD state;
- Save;
- RNG.
