# Shared Night/Lodging RU Copy Review v1

Status: text-only review of the 20 proposed shared Night/lodging RU strings from item 188.

Player-facing Russian should use ordinary UI language, keep `Энергия` capitalized for the stat, use `ночлег` consistently, and avoid internal implementation terms in visible copy.

| Key | Status | Final RU |
| --- | --- | --- |
| `ui.night.eyebrow` | APPROVE | Ночь |
| `ui.night.lodging.prompt` | REVISE | Выберите место на эту ночь. Плата за ночлег списывается один раз. |
| `ui.night.nextDayEnergy` | REVISE | Энергия завтра: {delta} |
| `ui.night.choice.title` | APPROVE | Вечер |
| `ui.night.choice.prompt` | REVISE | Выберите одно добровольное ночное занятие. Дневная Энергия при этом не расходуется. |
| `ui.night.choice.slot` | REVISE | Ночное занятие |
| `ui.night.choice.select` | APPROVE | Выбрать |
| `ui.night.sequence.title` | REVISE | Ход ночи |
| `ui.night.panel.title` | APPROVE | Ночь |
| `ui.night.panel.description` | REVISE | Ночь проходит в три этапа: ночлег, одно добровольное занятие и переход к следующему дню. |
| `ui.night.panel.start` | APPROVE | Начать ночь |
| `ui.result.chooseLodging` | APPROVE | Выбрать ночлег |
| `ui.town.lodgingToday` | APPROVE | Ночлег сегодня: {cost} {coins} |
| `lodging.lodging.normal.label` | APPROVE | Обычная комната |
| `lodging.lodging.cheap.label` | APPROVE | Дешёвый ночлег |
| `lodging.lodging.street.label` | APPROVE | Улица / без ночлега |
| `housing.room.label` | APPROVE | Обычная комната |
| `housing.hostel.label` | APPROVE | Дешёвый ночлег |
| `housing.shelter.label` | APPROVE | Улица |
| `nightChoice.night.sleep.label` | APPROVE | Спать |

Revisions remove UI jargon such as `ночной слот`, make the Energy formatter consistent, and keep the current three-stage Night structure understandable without changing mechanics.

Existing keys `ui.panel.sleep`, `ui.town.sleep.subtitle`, `ui.town.noEnergyPrompt`, and `ui.work.coins` remain reuse-only and are not duplicated.

No lodging price, eligibility, next-day Energy delta, phase order, housing state, command, or save behavior is changed.
