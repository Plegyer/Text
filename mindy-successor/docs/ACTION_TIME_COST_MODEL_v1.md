# Action / Time Cost Model v1

Дата: 2026-09-25.

Статус: **TARGET PRODUCT CONTRACT**.

Основание:
- прямое уточнение пользователя: relationship/career content в reference обычно не является отдельной дневной Energy-активностью;
- SWF-confirmed job progression: career scenes запускаются реактивно на main после visit/stat/flag/counter conditions;
- SWF-confirmed normal night partner scenes не имеют общего next-day Stamina penalty;
- SWF-confirmed minor crises входят без Stamina cost;
- SWF-confirmed seasonal contests могут стоить остаток дня, не списывая Stamina;
- successor already fixes Work=1 Energy, School=1 Energy+money, Large Activity entry≈2 Energy.

## 1. Три независимых измерения цены

Нельзя сводить всё к "занимает действие".

Каждый event/action отдельно задаёт:

```text
energyCost
consumesNightSlot
timePolicy / endsDay / calendarAdvance
```

Дополнительно:
- moneyCost;
- nextDayModifiers;
- internal Activity resources.

## 2. Default cost table

| Content type | Daily Energy | Night slot | Calendar/day |
|---|---:|---|---|
| Ordinary work shift | 1 | no | no |
| School lesson | 1 + money | no | no |
| Large Activity entry | 2 | no by default | Activity policy |
| Reactive career dialogue | 0 | no | no |
| Reactive relationship milestone | 0 | no | no |
| Job unlock/discovery scene | 0 | no | no |
| Optional minor city crisis | 0 by default | no | no |
| Ordinary voluntary night relationship | 0 daily Energy | yes | night completes normally |
| Night study | 0 current-day Energy | yes | next day Energy -1 |
| Normal lodging/sleep | 0 daily Energy + money | yes | advances day |
| Scheduled competition/festival | may be 0 | maybe | may end day explicitly |
| Secret Debt forced night | 0 current-day Energy | yes/forced | next-day penalty + normal night lifecycle |

Any exception must be explicit in the content definition.

## 3. Relationship progression

Default relationship pattern:

```text
work/school/event changes state
-> Resolver sees relationship condition
-> dialogue/milestone scene (0 Energy)
-> choice/fact/counter changes
-> return to hub
```

Typical conditions:
- stat threshold;
- job visit count;
- previous interaction count;
- relationship counter;
- career stage;
- item/fact;
- season;
- external quest result.

A relationship scene does **not** consume 1 Energy merely because it contains a conversation.

## 4. Repeat interactions

If a relationship needs repeated interactions, count the actual interaction source.

Examples:
- repeated work encounters: visit counter progresses because the player worked;
- night partner line: nightsTogether counter progresses because player chose that night slot;
- recurring dialogue after thresholds: scene itself stays 0 Energy;
- Activity companion line: Activity paid its own entry cost; dialogue inside it does not pay again.

No double charging.

## 5. Night relationships

Voluntary relationship scene at night:
- competes with other voluntary night choices;
- consumes the night slot;
- normally does not reduce next-day Energy;
- can have a specific NextDayModifier only when content explicitly warrants it.

This preserves the useful reference distinction:
relationship night != night study != forced bad night.

## 6. Day-ending free events

Some scheduled events can:
- cost 0 Energy;
- still consume/finish the calendar day.

This is a separate policy.

Example abstraction:
`seasonal deadline -> challenge -> reward -> night transition`.

Therefore simulation must not translate every day-ending event into an Energy cost.

## 7. Large Activity

Successor large Activity remains a deliberate exception:
- explicit entry cost ~2 Energy;
- separate internal resource/time;
- no extra Energy charge for internal dialogue/relationship beats.

This is a successor design choice informed by the reference dungeon commitment, not a rule for all side content.

## 8. Simulation rule

Future economy/unlock simulations must count only explicit Energy consumers.

Do NOT reserve generic Energy for:
- relationships;
- story dialogue;
- reactive career scenes;
- city flavour events.

If a simulation includes Activity:
- state the exact number/frequency of Activity entries;
- charge 2 Energy each.

If it includes scheduled day-ending events:
- model lost remaining day capacity separately from Energy subtraction.

## 9. Acceptance

The implementation fails this contract if:
- every scene automatically costs Energy;
- relationship milestone deducts Energy after the triggering work/school action already paid;
- night relationship also reduces daytime Energy without an explicit modifier;
- Activity dialogue double-charges entry Energy;
- a 0-Energy day-ending event is represented as a fake Energy deduction.
