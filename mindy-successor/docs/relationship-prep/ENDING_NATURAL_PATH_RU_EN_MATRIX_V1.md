# Ending Natural-Path RU EN Matrix v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `52ddc76148e33836d3161b63bf4c25ffb5c39d02`

| Ending ID | Exact eligibility path summary | RU title | EN title | Reward ID | Meta reward |
|---|---|---|---|---|---|
| `guild-life` | work ≥5; organization ≥6; alchemy.delivered=true | Своя в артели | One of the Crew | `guild` | none |
| `scholar-life` | school.exam=true | Дипломированная алхимичка | Certified Alchemist | `scholar` | none |
| `tavern-stay` | visits(tavern) ≥18 | Хозяйка третьего тоста | Mistress of the Third Toast | `host` | none |
| `tavern-guild` | tavern.guild=true | Праздник без разрешения | Festival Without Permission | `mediator` | none |
| `tavern-court` | tavern.prince=true | Приглашение под печатью | Invitation Under Seal | `court` | none |
| `lumber-stay` | visits(lumber) ≥24 | Бригадир поневоле | Reluctant Forewoman | `vitality` | none |
| `ending.lumber.hard-work` | career lumber completed_shifts ≥50 | Лесоруб: тяжкий труд | Lumber: Hard Work | `lumber.hardwork.compat` | `hardWork:lumber` |
| `ending.lumber.forewoman` | career facts management-school-ready + forewoman-problem-resolved; relationship lumber.foreman stage route-professional | Бригадир лесной артели | Lumber Forewoman | `lumber.forewoman.compat` | none |
| `ending.lumber.forest` | career facts forest-truth-known + forest-problem-resolved | Лесная развязка артели | Lumber Forest Resolution | `lumber.forest.compat` | none |

## RU / EN descriptions

### `guild-life`
RU: Пять практик в лавке, организация 6 и выполненный общий заказ. Наследие: ночлег за полцены и организация +5 в следующей жизни.

EN: Five shop practices, organization 6, and the shared order completed. Legacy: half-price lodging and +5 organization in the next life.

### `scholar-life`
RU: Сдать экзамен. Наследие: смекалка +5 на старте и один бесплатный урок каждую неделю.

EN: Pass the exam. Legacy: +5 intelligence at the start and one free lesson every week.

### `tavern-stay`
RU: 18 смен в таверне. Наследие: обаяние +5 в следующей жизни.

EN: Complete 18 tavern shifts. Legacy: +5 charm in the next life.

### `tavern-guild`
RU: Защитить самостоятельность городского праздника. Наследие: чуткость +5.

EN: Protect the town festival’s independence. Legacy: +5 empathy.

### `tavern-court`
RU: Передать накладную принцу. Наследие: дерзость +5.

EN: Give the delivery note to the prince. Legacy: +5 boldness.

### `lumber-stay`
RU: 24 смены у лесорубов. В следующей жизни дневной запас энергии +1.

EN: Complete 24 lumber shifts. In the next life, daytime Energy maximum is +1.

### `ending.lumber.hard-work`
RU: Завершить 50 смен в карьере лесоруба. Судьба отмечает упорство без дополнительных сюжетных условий.

EN: Complete 50 shifts in the Lumber career. This fate recognizes persistence without additional story requirements.

### `ending.lumber.forewoman`
RU: Судьба профессионального пути: нужные карьерные факты после обучения и завершения проблемы, а также профессиональный этап отношений с бригадиром.

EN: Professional-route fate: the required career facts after training and resolving the problem, plus the professional relationship stage with the Foreman.

### `ending.lumber.forest`
RU: Судьба после подтверждённой лесной правды и завершения связанной карьерной проблемы в артели.

EN: A fate reached after the forest truth is confirmed and the related Lumber career problem is resolved.

## Acceptance presentation

All current ending cards use the same shared acceptance control:

- RU: `Принять судьбу`
- EN: `Accept fate`
- key: `ui.legacy.acceptButton`

The button must remain enabled/disabled from the same current availability/eligibility state in both locales.

## Natural-path acceptance

For each ending:

1. Reach the exact current condition state listed above.
2. Snapshot:
   - ending ID;
   - exact condition objects;
   - availableEndings;
   - reward ID;
   - metaRewards;
   - run/meta Save;
   - RNG.
3. Render RU title/description/requirements.
4. Switch to EN.
5. Assert the same ending is available with the same button state.
6. Accept the same ending from equivalent pre-state.
7. Assert the same reward/meta identity and acceptedEnding ID.

## Hard Work lock

`ending.lumber.hard-work` remains gated only by exact current:

`careerCounter(lumber, completed_shifts) >= 50`

Localization must not add relationship, School, Forest or other route requirements.

## Forewoman / Forest boundaries

Localization does not alter:
- the professional Foreman relationship-stage requirement;
- current Lumber career facts;
- Forest-result/continuation semantics;
- reward compatibility IDs.

## Invariants

RU↔EN changes only title/description/requirement presentation.

It must not change:
- eligibility;
- ending order;
- reward or metaReward identity;
- acceptedEnding;
- epilogue;
- presentation ID;
- Save;
- RNG.
