# Sleep / Night Panel UI Copy RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: outer Sleep/Night panel shell before NightFlow starts.

## `ui.sleep.title`
RU: Ночь  
EN: Night

## `ui.sleep.help`
RU: Сначала выбирается ночлег, затем — добровольное вечернее действие, после чего начинается следующий день.  
EN: First choose lodging, then an optional evening activity, and then the next day begins.

Current fallback seam:
`NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.`

The localized source replaces implementation terminology with player-facing wording without changing the sequence.

## `ui.sleep.startButton`
RU: Начать ночную последовательность  
EN: Start the night sequence

Current fallback seam:
`Начать NightFlow`

## Chat3 overlap excluded

This source does not replace or redefine:
- lodging-stage title/body;
- lodging prices or next-day Energy annotations;
- voluntary Night choice stage/body;
- individual Night choice labels;
- Night-slot annotations;
- active NightFlow phase display;
- lodging/Night mechanics or IDs.

## Boundary

Text only. No NightFlow phase, lodging payment, voluntary choice, next-day Energy, Save or RNG behavior changes.
