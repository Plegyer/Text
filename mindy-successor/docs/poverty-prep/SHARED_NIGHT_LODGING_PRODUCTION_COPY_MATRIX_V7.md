# Shared Night/Lodging Production-Copy Matrix v7

Status: final production-copy matrix for the 20 additive shared Night/lodging UI localization keys.

Current-main baseline:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

| Key | RU | EN | Current consumer context | Current fallback |
| --- | --- | --- | --- | --- |
| `ui.night.eyebrow` | Ночь | Night | central:LodgingResolution.stage-title.eyebrow; central:VoluntaryNightChoice.stage-title.eyebrow; central:NightFallback.stage-title.eyebrow | Night; Night; Night |
| `ui.night.lodging.prompt` | Выберите место на эту ночь. Плата за ночлег списывается один раз. | Choose a place for tonight. The lodging cost is charged once. | central:LodgingResolution.dialogue.prompt | Выберите место на эту ночь. Оплата фиксируется ровно один раз. |
| `ui.night.nextDayEnergy` | Энергия завтра: {delta} | Energy tomorrow: {delta} | central:LodgingResolution.lodging.nextDayEnergySuffix; nightChoiceList:generic.nextDayEnergySuffix | энергия завтра {delta}; энергия завтра {delta} |
| `ui.night.choice.title` | Вечер | Evening | central:VoluntaryNightChoice.stage-title.heading | Вечер |
| `ui.night.choice.prompt` | Выберите одно добровольное ночное занятие. Дневная Энергия при этом не расходуется. | Choose one voluntary night activity. This does not spend daytime Energy. | central:VoluntaryNightChoice.dialogue.prompt | Один добровольный Night choice. Daytime Energy не расходуется. |
| `ui.night.choice.slot` | Ночное занятие | Night activity | nightChoiceList:generic.context | Ночной слот |
| `ui.night.choice.select` | Выбрать | Choose | nightChoiceList:generic.actionButton | Выбрать |
| `ui.night.sequence.title` | Ход ночи | Night sequence | central:NightFallback.stage-title.heading | Ночная последовательность |
| `ui.night.panel.title` | Ночь | Night | panelContent:sleep.heading | Ночь |
| `ui.night.panel.description` | Ночь проходит в три этапа: ночлег, одно добровольное занятие и переход к следующему дню. | The night has three stages: lodging, one voluntary activity, and moving to the next day. | panelContent:sleep.description | NightFlow отдельно фиксирует lodging, voluntary choice и следующий день. |
| `ui.night.panel.start` | Начать ночь | Start the night | panelContent:sleep.data-end-day.button | Начать NightFlow |
| `ui.result.chooseLodging` | Выбрать ночлег | Choose lodging | central:result.energyZero.data-panel-sleep.button | Выбрать ночлег |
| `ui.town.lodgingToday` | Ночлег сегодня: {cost} {coins} | Lodging today: {cost} {coins} | central:town-note.lodging-summary | Ночлег сегодня: {cost} {coins} |
| `lodging.lodging.normal.label` | Обычная комната | Normal room | central:LodgingResolution.catalog.definitions.lodgings.label | Normal room |
| `lodging.lodging.cheap.label` | Дешёвый ночлег | Cheap lodging | central:LodgingResolution.catalog.definitions.lodgings.label | Cheap lodging |
| `lodging.lodging.street.label` | Улица / без ночлега | Street / no lodging | central:LodgingResolution.catalog.definitions.lodgings.label | Street / no lodging |
| `housing.room.label` | Обычная комната | Normal room | central:town-note.labels[r.housing] | Обычная комната |
| `housing.hostel.label` | Дешёвый ночлег | Cheap lodging | central:town-note.labels[r.housing] | Дешёвый ночлег |
| `housing.shelter.label` | Улица | Street | central:town-note.labels[r.housing] | Улица |
| `nightChoice.night.sleep.label` | Спать | Sleep | localizedNightChoiceLabel -> tr(`nightChoice.${id}.label`,fallback) | Sleep |


## Reuse-only shipped keys

Do not duplicate:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

## Consumer rules

For every row:
- gameplay phase/lodging/nightChoice identity remains locale-neutral;
- RU and EN differ only in presentation text;
- placeholders `{delta}`, `{cost}`, `{coins}` use the same authoritative values;
- localized labels do not alter eligibility, cost, Energy, housing or commands.

## Production disposition

This matrix is the player-facing copy source for Lead-owned UI consumption.

The final root candidate remains:
`content/poverty-shared-ui-localization-v5.fixture.json`.

The exact consumer reference remains:
`content/shared-night-lodging-consumer-map-v2.fixture.json`.
