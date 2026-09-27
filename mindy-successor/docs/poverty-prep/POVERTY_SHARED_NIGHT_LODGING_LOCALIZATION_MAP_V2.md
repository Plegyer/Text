# Poverty Shared Night/Lodging Localization Map v2

Status: re-audit against current `main` after PR #45.

Current-main baseline observed:
- PR #45 merged at `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`;
- ordinary-poverty event localization is now merged;
- this document covers adjacent shared lodging/Night UI text outside event payloads.

Ownership:
Lead/Chat 1 owns shared UI consumption. Chat 3 supplies stable text keys and bilingual copy only.

## Already localized — reuse, do not duplicate

| Surface | Current consumer | Existing key | RU | EN |
| --- | --- | --- | --- | --- |
| Town lodging panel label | `src/ui/app.ts` town/dock | `ui.panel.sleep` | Ночлег | Lodging |
| Town lodging subtitle | `src/ui/app.ts` town card | `ui.town.sleep.subtitle` | Комната или навес | Room or shelter |
| Zero-Energy town prompt | `src/ui/app.ts` town stage | `ui.town.noEnergyPrompt` | На сегодня сил больше нет. Пора выбрать ночлег. | You are out of energy for today. Time to choose lodging. |
| Coin unit | `src/ui/app.ts` multiple consumers | `ui.work.coins` | монет | coins |

These are already current-main RU+EN seams.

## LodgingResolution screen

Current source:
`prior-work/astra/prototype-m3.2/src/ui/app.ts`, `central()`, `night.phase === 'LodgingResolution'`.

| Current surface | Current source | Proposed stable key | RU source | EN | Lead-owned consumer seam |
| --- | --- | --- | --- | --- | --- |
| eyebrow `Night` | hardcoded in stage title | `ui.night.eyebrow` | Ночь | Night | wrap current eyebrow with `tr(...)` |
| heading `Ночлег` | hardcoded | reuse `ui.panel.sleep` | Ночлег | Lodging | replace hardcoded heading with existing key |
| prompt | hardcoded Russian | `ui.night.lodging.prompt` | Выберите место на эту ночь. Оплата фиксируется ровно один раз. | Choose a place for tonight. Payment is committed exactly once. | localize dialogue paragraph |
| coin suffix | hardcoded `монет` | reuse `ui.work.coins` | монет | coins | reuse existing unit key inside lodging option renderer |
| next-day Energy suffix | hardcoded interpolation | `ui.night.nextDayEnergy` | энергия завтра {delta} | Energy tomorrow {delta} | format through `fmt(tr(...),{delta})` |
| lodging option label | `definitions.json -> lodging.label` | `lodging.<lodgingId>.label` | per ID below | per ID below | add localization lookup by locale-neutral lodging ID |

### Lodging labels

| Gameplay ID | Current fallback | Proposed key | RU | EN |
| --- | --- | --- | --- | --- |
| `lodging.normal` | `Normal room` | `lodging.lodging.normal.label` | Обычная комната | Normal room |
| `lodging.cheap` | `Cheap lodging` | `lodging.lodging.cheap.label` | Дешёвый ночлег | Cheap lodging |
| `lodging.street` | `Street / no lodging` | `lodging.lodging.street.label` | Улица / без ночлега | Street / no lodging |

No lodging ID, cost, condition, housing tier or Energy delta changes.

## VoluntaryNightChoice screen

Current source:
`src/ui/app.ts`, `central()`, `night.phase === 'VoluntaryNightChoice'`.

| Current surface | Current source | Proposed stable key | RU source | EN | Lead-owned consumer seam |
| --- | --- | --- | --- | --- | --- |
| eyebrow `Night` | hardcoded | reuse `ui.night.eyebrow` | Ночь | Night | same generic Night eyebrow |
| heading `Вечер` | hardcoded | `ui.night.choice.title` | Вечер | Evening | localize heading |
| prompt | hardcoded mixed RU/EN | `ui.night.choice.prompt` | Выберите одно добровольное ночное занятие. Дневная энергия при выборе не расходуется. | Choose one voluntary night activity. Choosing it does not spend daytime Energy. | localize dialogue paragraph |
| generic slot suffix | hardcoded `Ночной слот` in `nightChoiceList()` | `ui.night.choice.slot` | Ночной слот | Night slot | localize non-School choice context |
| next-day Energy suffix | hardcoded interpolation in `nightChoiceList()` | reuse `ui.night.nextDayEnergy` | энергия завтра {delta} | Energy tomorrow {delta} | same formatter |
| generic action button | hardcoded `Выбрать` | `ui.night.choice.select` | Выбрать | Choose | localize non-School button |

School Night Study already uses School-owned localization seams and must not be duplicated here.

## Generic Night fallback screen

Current source:
`src/ui/app.ts`, final NightFlow fallback in `central()`.

| Current surface | Current source | Proposed stable key | RU | EN | Lead-owned seam |
| --- | --- | --- | --- | --- | --- |
| eyebrow | hardcoded `Night` | reuse `ui.night.eyebrow` | Ночь | Night | shared eyebrow |
| heading | hardcoded `Ночная последовательность` | `ui.night.sequence.title` | Ночная последовательность | Night sequence | localize heading |
| raw phase body | `night.phase` enum rendered directly | no text key proposed | — | — | if player-facing fallback remains, Lead must map enum to presentation without renaming runtime/save identity |

Raw `night.phase` values are runtime identity and must not be localized in-place.

## Night panel

Current source:
`src/ui/app.ts`, `panelContent()`, `panel === 'sleep'`.

| Surface | Proposed stable key | RU | EN | Consumer seam |
| --- | --- | --- | --- | --- |
| panel heading `Ночь` | `ui.night.panel.title` | Ночь | Night | replace hardcoded `<h2>` |
| explanatory paragraph | `ui.night.panel.description` | NightFlow отдельно фиксирует ночлег, добровольное занятие и переход к следующему дню. | NightFlow records lodging, the voluntary night activity, and the transition to the next day separately. | wrap paragraph in `tr(...)` |
| start button | `ui.night.panel.start` | Начать ночь | Start the night | localize label only; dispatch stays `endDay` |

## Result-screen bridge

Current source:
`src/ui/app.ts`, result screen when `r.metrics.energy===0`.

Current hardcoded:
`Выбрать ночлег`.

Proposed key:
`ui.result.chooseLodging`.

RU:
`Выбрать ночлег`.

EN:
`Choose lodging`.

Consumer seam:
replace label only; existing `data-panel="sleep"` behavior remains unchanged.

## Town lodging summary

Current source:
`src/ui/app.ts`, town-note below town stage.

Current:
`Ночлег сегодня: ${rent(state)} ${tr('ui.work.coins')}`.

Proposed key:
`ui.town.lodgingToday`.

RU:
`Ночлег сегодня: {cost} {coins}`.

EN:
`Lodging today: {cost} {coins}`.

Consumer seam:
format localized prefix with current `rent(state)` and existing `ui.work.coins`.

The housing label beside it currently comes from Russian-only `src/ui/labels.ts` values:
- `room -> Обычная комната`;
- `hostel -> Дешёвый ночлег`;
- `shelter -> Улица`.

Safe proposed presentation keys:

| Housing runtime value | Proposed key | RU | EN |
| --- | --- | --- | --- |
| `room` | `housing.room.label` | Обычная комната | Normal room |
| `hostel` | `housing.hostel.label` | Дешёвый ночлег | Cheap lodging |
| `shelter` | `housing.shelter.label` | Улица | Street |

Consumer seam:
Lead-owned housing-label resolver in UI only. Do not change runtime housing values.

## Sleep Night choice

Current source:
`definitions.json -> nightChoices`, fallback label `Sleep`.

Proposed key:
`nightChoice.night.sleep.label`.

RU:
`Спать`.

EN:
`Sleep`.

Consumer seam:
current `localizedNightChoiceLabel(choice.id,choice.label)` helper is the correct shared resolver seam. Add the key, not a new gameplay choice.

## Explicitly out of scope

Do not localize by changing:
- NightFlow phase IDs;
- lodging IDs;
- housing values;
- `moneyCost`;
- `nextDayEnergyDelta`;
- `conditions`;
- command types;
- save-state fields.

Do not duplicate domain-owned:
- `school.night_study.*`;
- `lumber.foreman.night`.

Do not add Secret Debt UI strings to this shared ordinary-poverty map.

## Current-main conclusion

PR #45 closed the ordinary-poverty **event payload** localization gap. The remaining poverty-adjacent gap is now almost entirely shared UI consumption:
- LodgingResolution shell;
- generic Night shell;
- lodging/housing labels;
- result-to-lodging bridge;
- Night panel;
- sleep-choice label.

Those are safe presentation/localization changes but require Lead-owned UI wiring.
