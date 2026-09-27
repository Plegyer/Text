# Shared Generic Button Labels RU+EN v1

Date: 2026-09-27
Status: PRESENTATION_ONLY
Scope: shared controls still hardcoded in the current global shell.

## New shared keys

### `ui.generic.selectButton`
RU: Выбрать  
EN: Select

Current consumer: ordinary non-profession action button fallback.

### `ui.generic.closeButton`
RU: Закрыть  
EN: Close

Current consumer: panel close button aria-label.

### `ui.generic.dismissButton`
RU: Закрыть уведомление  
EN: Dismiss notification

Current consumer: toast dismiss button aria-label.

### `ui.result.chooseLodging`
RU: Выбрать ночлег  
EN: Choose lodging

Current consumer: result-screen shortcut shown when current Energy is zero.

### `ui.work.recipeReliable`
RU: Надёжно  
EN: Reliable

Current consumer: generic `brew` action reliable/gentle button.

### `ui.work.recipeFast`
RU: Быстро  
EN: Fast

Current consumer: generic `brew` action fast/bold button.

## Reuse existing or queue-local keys instead of duplicating

### Enter
Use item-86 key:
`ui.explore.enterButton` — RU `Войти`, EN `Enter`.

### Town / home navigation
Current result return already has root localization:
`ui.result.returnTown` — RU `Вернуться в город`, EN `Return to town`.

The wordmark/home control already renders:
`ui.town.eyebrow` — RU `По ту сторону люка`, EN `Beyond the hatch`.

No new “home” gameplay identity or label is required.

### Accept fate
Use item-91 key:
`ui.legacy.acceptButton`.

### New life
Use item-91 key:
`ui.legacy.nextLifeButton`.

## Exclusions

Not covered here:
- School-specific buttons;
- Night/lodging choice controls owned by Chat3 overlap;
- presentation editor/catalog developer controls;
- save import/export/restart menu controls, which remain separate global-shell debt.

## Boundary

Labels/aria text only. No command type, action ID, recipe ID, ending ID, panel behavior, NightFlow, Save, RNG or gameplay mutation changes.
