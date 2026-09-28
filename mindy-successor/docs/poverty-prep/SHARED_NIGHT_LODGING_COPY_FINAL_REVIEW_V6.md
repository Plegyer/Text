# Shared Night/Lodging Copy Final Review v6

Status: final RU-source + full EN review for the 20 additive shared Night/lodging UI keys on post-PR50 current main.

Scope:
presentation text only.

No NightFlow phase, lodging ID, housing value, money cost, next-day Energy effect, command, eligibility condition or Save field changes.

## Final copy

| Key | RU source | EN |
| --- | --- | --- |
| `ui.night.eyebrow` | Ночь | Night |
| `ui.night.lodging.prompt` | Выберите место на эту ночь. Плата за ночлег списывается один раз. | Choose a place for tonight. The lodging cost is charged once. |
| `ui.night.nextDayEnergy` | Энергия завтра: {delta} | Energy tomorrow: {delta} |
| `ui.night.choice.title` | Вечер | Evening |
| `ui.night.choice.prompt` | Выберите одно добровольное ночное занятие. Дневная Энергия при этом не расходуется. | Choose one voluntary night activity. This does not spend daytime Energy. |
| `ui.night.choice.slot` | Ночное занятие | Night activity |
| `ui.night.choice.select` | Выбрать | Choose |
| `ui.night.sequence.title` | Ход ночи | Night sequence |
| `ui.night.panel.title` | Ночь | Night |
| `ui.night.panel.description` | Ночь проходит в три этапа: ночлег, одно добровольное занятие и переход к следующему дню. | The night has three stages: lodging, one voluntary activity, and moving to the next day. |
| `ui.night.panel.start` | Начать ночь | Start the night |
| `ui.result.chooseLodging` | Выбрать ночлег | Choose lodging |
| `ui.town.lodgingToday` | Ночлег сегодня: {cost} {coins} | Lodging today: {cost} {coins} |
| `lodging.lodging.normal.label` | Обычная комната | Normal room |
| `lodging.lodging.cheap.label` | Дешёвый ночлег | Cheap lodging |
| `lodging.lodging.street.label` | Улица / без ночлега | Street / no lodging |
| `housing.room.label` | Обычная комната | Normal room |
| `housing.hostel.label` | Дешёвый ночлег | Cheap lodging |
| `housing.shelter.label` | Улица | Street |
| `nightChoice.night.sleep.label` | Спать | Sleep |

## Review result

All 20 strings are approved as final for this slice.

RU source principles preserved:
- no visible implementation jargon such as `NightFlow`;
- no “slot” terminology in player-facing copy;
- `Энергия` reads as a named stat;
- lodging payment is described as a player-facing consequence, not an implementation detail;
- route/phase/runtime identifiers are not exposed.

EN parity principles preserved:
- full second locale, not shorthand translation;
- same player-facing meaning as RU;
- same placeholders;
- no added mechanic or implication.

## Existing keys to reuse, not duplicate

Keep using current root keys:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

These four are outside the additive 20-key patch.

## Mechanics firewall

The reviewed copy does not change:
- lodging availability;
- lodging cost;
- street penalties;
- next-day Energy delta;
- housing state;
- voluntary Night choice count;
- Night phase order;
- School Night Study;
- Foreman Night;
- Save/reload behavior.

## Final disposition

Use this exact copy as the source for
`poverty-shared-ui-localization-v5.fixture.json`.

No further wording change is required before Lead-owned UI integration.
