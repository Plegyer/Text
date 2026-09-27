# Shared Night/Lodging Post-PR48 Consumer Readiness v4

Status: exact current-main readiness refresh after PR #48.

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Current UI file SHA:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Current root localization SHA:
`e22c18453c91a430026e8ccc5712b5c8b0bc756f`.

Source fixture:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

No UI code is changed by this document.

## Collision status

All finalized 20 proposed shared Night/lodging localization keys remain absent from current root localization.

Classification:
- ADDITIVE: **20**
- IDENTICAL: **0**
- CONFLICT: **0**

PR #48 did not create a key collision in this slice.

Existing shipped keys still to reuse:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

## Current hardcoded consumer seams remain present

PR #48 did not change the relevant shared UI file.

The following current hardcoded/fallback surfaces are still present in `src/ui/app.ts`:

### LodgingResolution
- eyebrow: `Night`;
- heading: hardcoded `Ночлег`;
- prompt:
  `Выберите место на эту ночь. Оплата фиксируется ровно один раз.`;
- lodging labels from raw `definitions.json`;
- coin suffix inline;
- next-day Energy suffix inline.

Ready keys:
- `ui.night.eyebrow`;
- reuse `ui.panel.sleep`;
- `ui.night.lodging.prompt`;
- `ui.night.nextDayEnergy`;
- `lodging.lodging.normal.label`;
- `lodging.lodging.cheap.label`;
- `lodging.lodging.street.label`;
- reuse `ui.work.coins`.

### VoluntaryNightChoice
Current hardcoded:
- eyebrow `Night`;
- title `Вечер`;
- mixed-language prompt:
  `Один добровольный Night choice. Daytime Energy не расходуется.`;
- generic context `Ночной слот`;
- generic button `Выбрать`;
- inline next-day Energy suffix.

Ready keys:
- `ui.night.eyebrow`;
- `ui.night.choice.title`;
- `ui.night.choice.prompt`;
- `ui.night.choice.slot`;
- `ui.night.choice.select`;
- `ui.night.nextDayEnergy`.

School-owned Night Study branches must remain on their School localization seams.

### Generic Night fallback
Current:
- eyebrow `Night`;
- heading `Ночная последовательность`;
- raw `night.phase` value rendered as body text.

Ready keys:
- `ui.night.eyebrow`;
- `ui.night.sequence.title`.

Do not localize by rewriting the runtime phase value itself.

### Night panel
Current:
- heading `Ночь`;
- body:
  `NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.`;
- button:
  `Начать NightFlow`.

Ready keys:
- `ui.night.panel.title`;
- `ui.night.panel.description`;
- `ui.night.panel.start`.

The button command remains `data-end-day`.

### Result-to-lodging bridge
Current:
`Выбрать ночлег`.

Ready key:
`ui.result.chooseLodging`.

Behavior remains:
`data-panel="sleep"`.

### Town lodging summary
Current:
`Ночлег сегодня: ${rent(state)} ${tr('ui.work.coins')}`.

Ready key:
`ui.town.lodgingToday`.

Housing label currently still comes from Russian-only `labels[r.housing]`.

Ready keys:
- `housing.room.label`;
- `housing.hostel.label`;
- `housing.shelter.label`.

### Sleep choice
Current generic Night-choice helper already falls back through:
`tr(`nightChoice.${id}.label`, fallback)`.

Therefore:
`nightChoice.night.sleep.label`
is consumer-ready once added to localization.

No helper redesign is required for this one key.

## Exact readiness classification

| Area | Text keys ready? | Consumer seam exists? | UI edit required? |
| --- | --- | --- | --- |
| LodgingResolution shell | yes | yes | yes |
| lodging option labels | yes | yes | yes |
| next-day Energy suffix | yes | yes | yes |
| VoluntaryNightChoice shell | yes | yes | yes |
| generic Night fallback title | yes | yes | yes |
| Night panel | yes | yes | yes |
| result-to-lodging button | yes | yes | yes |
| town lodging summary | yes | yes | yes |
| housing labels | yes | yes | yes |
| `night.sleep` label | yes | existing generic resolver already supports it | localization add only |

## Ownership boundary

Lead/Chat 1 owns the shared UI changes.

Chat 3 owns only:
- exact proposed RU+EN strings;
- consumer mapping/readiness documentation.

Do not overwrite:
- School-owned Night Study localization;
- Foreman Night localization;
- shared NightFlow runtime identity.

## Mechanics firewall

Consumer wiring must not change:
- NightFlow phase order;
- lodging IDs;
- housing runtime values;
- lodging cost;
- next-day Energy delta;
- voluntary choice count;
- commands;
- save/reload behavior.

## Readiness conclusion

The finalized 20-key shared Night/lodging localization set remains collision-free and consumer-ready after PR #48.

Nineteen keys still need Lead-owned UI consumption changes; the `nightChoice.night.sleep.label` key already has a generic lookup seam and only needs to be added to root localization.
