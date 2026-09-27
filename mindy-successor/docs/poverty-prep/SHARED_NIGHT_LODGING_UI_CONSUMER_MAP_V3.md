# Shared Night/Lodging UI Consumer Map v3

Status: exact current-main UI consumer map for the finalized 20 shared Night/lodging localization keys.

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Source UI:
`prior-work/astra/prototype-m3.2/src/ui/app.ts`.

This document maps current hardcoded/fallback presentation seams only. It does not edit UI code.

## Consumer map

| Proposed key | Current consumer seam | Current hardcoded/fallback text | Expected consumption |
| --- | --- | --- | --- |
| `ui.night.eyebrow` | `central()` LodgingResolution, VoluntaryNightChoice and generic Night fallback stage titles | `Night` | replace the three hardcoded eyebrow strings with `tr('ui.night.eyebrow', ...)` |
| `ui.night.lodging.prompt` | `central()` / `night.phase==='LodgingResolution'` | `Выберите место на эту ночь. Оплата фиксируется ровно один раз.` | localize the LodgingResolution paragraph |
| `ui.night.nextDayEnergy` | LodgingResolution option suffix and generic branch of `nightChoiceList()` | `энергия завтра {delta}` built inline | format one shared localization key with `{delta}` |
| `ui.night.choice.title` | `central()` / `night.phase==='VoluntaryNightChoice'` | `Вечер` | localize stage heading |
| `ui.night.choice.prompt` | `central()` / VoluntaryNightChoice paragraph | `Один добровольный Night choice. Daytime Energy не расходуется.` | replace mixed RU/EN hardcoded copy |
| `ui.night.choice.slot` | generic non-School branch of `nightChoiceList()` | `Ночной слот` | localize generic Night-choice context |
| `ui.night.choice.select` | generic non-School button in `nightChoiceList()` | `Выбрать` | localize button label |
| `ui.night.sequence.title` | generic NightFlow fallback in `central()` | `Ночная последовательность` | localize heading only; raw phase identity stays runtime data |
| `ui.night.panel.title` | `panelContent()`, `panel==='sleep'` | `Ночь` | localize panel heading |
| `ui.night.panel.description` | `panelContent()`, `panel==='sleep'` | `NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.` | replace explanatory hardcoded copy |
| `ui.night.panel.start` | `panelContent()`, sleep panel button | `Начать NightFlow` | localize label only; `data-end-day` command remains unchanged |
| `ui.result.chooseLodging` | result screen when `r.metrics.energy===0` | `Выбрать ночлег` | localize button label only; `data-panel="sleep"` remains unchanged |
| `ui.town.lodgingToday` | town note beneath town stage | `Ночлег сегодня: ${rent(state)} ${tr('ui.work.coins')}` | format `{cost}` and `{coins}` through the localized template |
| `lodging.lodging.normal.label` | LodgingResolution `catalog.definitions.lodgings.map(...)` | `lodging.normal -> Normal room` from `definitions.json` | resolve by locale-neutral lodging ID before rendering `<strong>` |
| `lodging.lodging.cheap.label` | same LodgingResolution loop | `lodging.cheap -> Cheap lodging` | same resolver |
| `lodging.lodging.street.label` | same LodgingResolution loop | `lodging.street -> Street / no lodging` | same resolver |
| `housing.room.label` | town note `labels[r.housing]` | `room -> Обычная комната` from `src/ui/labels.ts` | shared housing-label localization resolver |
| `housing.hostel.label` | town note `labels[r.housing]` | `hostel -> Дешёвый ночлег` | shared housing-label localization resolver |
| `housing.shelter.label` | town note `labels[r.housing]` | `shelter -> Улица` | shared housing-label localization resolver |
| `nightChoice.night.sleep.label` | `localizedNightChoiceLabel(id,fallback)` generic non-School branch | current fallback from definitions: `Sleep` | existing helper already calls `tr(`nightChoice.${id}.label`,fallback)`; adding the key is sufficient |

## Existing shared keys already consumed

Do not duplicate:
- `ui.panel.sleep` — current town lodging panel label;
- `ui.town.sleep.subtitle` — current town subtitle;
- `ui.town.noEnergyPrompt` — zero-Energy prompt;
- `ui.work.coins` — coin unit.

## School and Foreman boundaries

School Night Study uses its own localized branches:
- `ui.school.nightStudyContext`;
- `ui.school.nightStudyButton`;
- `ui.school.nightStudyChoice`;
- School course/stat localization.

Do not replace School-owned strings with the generic Night keys.

Foreman Night uses the generic `localizedNightChoiceLabel` path but has its own shipped `nightChoice.lumber.foreman.night.label` ownership. The shared fixture must not duplicate that key.

## Runtime firewall

UI wiring must not rename or localize in place:
- `LodgingResolution`;
- `VoluntaryNightChoice`;
- other `night.phase` values;
- `lodging.normal`, `lodging.cheap`, `lodging.street`;
- `room`, `hostel`, `shelter`;
- command types;
- Save-state fields.

Only presentation strings should change.
