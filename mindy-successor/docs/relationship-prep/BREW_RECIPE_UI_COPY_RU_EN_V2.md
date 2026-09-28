# Brew Recipe UI Copy RU+EN v2

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

## Existing button labels — reuse

Current root already ships:

### `ui.work.recipeReliable`
RU: Надёжно  
EN: Reliable

### `ui.work.recipeFast`
RU: Быстро  
EN: Fast

Do not add duplicate recipe-button keys.

## Generic brew description/result scene

Reuse item-122/item-123 source:

### `action.brew.description`
RU: Одна трава и один ход. Щадящий нагрев даёт одну микстуру; быстрый — две при мастерстве 3 или наличии весов.  
EN: One herb and one action. Gentle heating yields one tonic; the fast method yields two with mastery 3 or a set of scales.

### `action.brew.scene.default.text`
Same RU+EN text as the current default result scene.

## Current brew journal outcome source

Current engine logs one of two raw player-facing outcome lines after recipe resolution.

### `action.brew.recipe.success.text`
RU: Микстура готова. Этикетка обещает бодрость, а не бессмертие — хороший знак.  
EN: The tonic is ready. The label promises vigor, not immortality — a good sign.

This is used for:
- gentle recipe success;
- fast recipe success when mastery >= 3 or scales are present.

### `action.brew.recipe.fastFailure.text`
RU: Смесь превратилась в пену. Для быстрого способа нужны весы или мастерство 3. Опыт сохранён.  
EN: The mixture turned to foam. The fast method needs scales or mastery 3. The practice still counts.

## Mechanical truth preserved

Current engine rule remains:
- gentle always succeeds;
- fast succeeds if `alchemy >= 3` OR inventory contains `scales`;
- one herb is consumed;
- alchemy +1 always;
- successful gentle yields one tonic;
- successful fast yields two tonics;
- failed fast yields no tonic.

No text in this file changes those rules.

## Consumer limitation

The success/failure journal lines are currently stored as raw strings with no stable action-result journal ref.

The keys above are source-ready but require a future locale-neutral action-journal reference if they are to rerender after locale switching.

## Boundary

No brew mechanics, yields, mastery gate, item consumption, action cost, RNG, Save or recipe IDs change.
