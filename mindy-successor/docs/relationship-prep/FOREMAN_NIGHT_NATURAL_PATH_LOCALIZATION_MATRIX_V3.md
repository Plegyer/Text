# Foreman Night Natural-Path Localization Matrix v3

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Exact current path to voluntary Foreman Night

| Step | Exact gameplay identity | Expected RU presentation | Expected EN presentation | Locked gameplay state |
|---|---|---|---|---|
| 1 | Complete first qualifying `lumber.shift` | Current localized Lumber shift/result presentation | Same current English Lumber shift/result presentation | same shift transaction and `completed_shifts` increment |
| 2 | Event `lumber.career-first-shift`, choice `continue` | Existing career milestone copy | Existing EN parity | advances current Lumber transition `accept-hand` only |
| 3 | Event `lumber.foreman-notice`, choice `professional` | `Бригадир замечает работу`; `Оставить всё по-деловому` | `The Foreman notices the work`; `Keep it professional` | relationship `unknown → professional → route-professional`; sets `route=professional` |
| 4 | Begin Night after normal day end | shared localized Night/lodging shell | shared EN Night/lodging shell | same NightFlow `before_lodging` path |
| 5 | Resolve an eligible lodging | current localized lodging presentation | current EN lodging presentation | lodging payment/effects unchanged |
| 6 | Enter `VoluntaryNightChoice` | shared Night prompt | shared EN Night prompt | no relationship mutation yet |
| 7 | Select `lumber.foreman.night` | `Поговорить с бригадиром` | `Talk with the Foreman` | `night_meetings += 1`; next-day Energy delta 0 |
| 8 | Reaction event `lumber-night.foreman-professional` / `default` | `Разговор после смены` and current RU body | `After-shift conversation` and current EN body | exact `after_choice` Night intercept; consumes Night; lodging payment not suppressed |
| 9 | Choose `continue` | `Продолжить по-деловому` | `Continue professionally` | adds fact `night-followup-complete` |
| 10 | Resume Night | no extra relationship copy required | same | current Night completes through existing flow |

## Exact current identity assertions

Relationship:
- `lumber.foreman`

Required stage before Night choice:
- `route-professional`

Night choice:
- `lumber.foreman.night`

Night event:
- `lumber-night.foreman-professional`

Night event variant:
- `default`

Night event choice:
- `continue`

Presentation ID:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Semantic Night media ID:
- `relationship.lumber.foreman.night.professional`

Current static presentation asset:
- `assets/presentation/foreman-night-voluntary-v2.svg`

## Semantic-label acceptance

Where the current relationship identity is shown in player-facing requirement/status presentation, expected semantic labels are:

### RU
- relationship: `Бригадир лесной артели`
- stage: `Профессиональный путь`
- counter: `Вечерние разговоры`
- fact: `Вечерний рабочий разговор завершён`
- route choice/value: `Путь отношений = Профессиональный путь`

### EN
- relationship: `Lumber Foreman`
- stage: `Professional route`
- counter: `Evening conversations`
- fact: `After-work conversation completed`
- route choice/value: `Relationship route = Professional route`

## Locked Night invariants

Across RU↔EN switching:
- daytime Energy cost remains 0 for the relationship Night choice;
- `nextDayEnergyDelta` remains 0;
- lodging payment is still resolved exactly once;
- Night choice still consumes the Night slot;
- same counter increment;
- same fact write;
- same event/variant/choice IDs;
- same presentation ID/media;
- same Save identity;
- same RNG evolution.

No locale switch may re-run a transition, choice, counter increment, or event.
