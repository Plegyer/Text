# Successor — system architecture v1

Дата: 2026-09-25.

Статус: **TARGET ARCHITECTURE BASELINE** для дальнейшего проектирования. Это не окончательное content/balance ТЗ.

Этот документ заменяет `SUCCESSOR_SYSTEM_ARCHITECTURE_v0.md` как технический baseline. v0 остаётся историческим conceptual draft.

## 1. Откуда берётся v1

v1 объединяет:
- подтверждённые архитектурные выводы reverse engineering Simply Mindy;
- принятые решения `NEW_GAME_SPEC_v0.md`;
- рабочие инженерные свойства prototype M3.2;
- замечания `ASTRA_HANDOFF.md` / `RECONCILIATION.md`;
- SOL reuse review.

Подробные контракты:
- `TARGET_STATE_OWNERSHIP_v1.md`;
- `PROGRESSION_CONDITION_EFFECT_CONTRACT_v1.md`;
- `EVENT_RESOLVER_CONTRACT_v1.md`;
- `NIGHT_AND_ACTIVITY_CONTRACT_v1.md`;
- `SAVE_AND_MIGRATION_CONTRACT_v1.md`.

## 2. Основной принцип

Не делать новый engine с нуля.

M3.2 — evolutionary base:
- pure core;
- immutable dispatch;
- declarative conditions/effects;
- content validation;
- persisted RNG;
- pending scenes;
- Run+Meta envelope;
- migrations;
- presentation/mechanics separation.

Target v1 расширяет эти свойства под полноценную игру.

## 3. State model

```text
SaveEnvelope
├── MetaState
└── RunState
    ├── CalendarState
    ├── CharacterState
    ├── ResourceState
    ├── DayState
    ├── HousingState
    ├── ProgressionState
    │   ├── Careers
    │   ├── Quests
    │   ├── Relationships
    │   └── WorldFacts
    ├── EndingState
    ├── FlowState
    │   ├── PendingScene
    │   ├── NightFlow
    │   └── ActivityEnvelope
    ├── RngState
    └── HistoryState
```

Текущая Energy имеет одного владельца: DayState.

## 4. Command pipeline

```text
Command
-> validate
-> clone state
-> commit costs
-> apply typed effects
-> apply domain transitions
-> emit reaction facts
-> Event Resolver
-> invariant validation
-> return new SaveEnvelope
```

Ошибка на любом шаге не мутирует исходный state.

## 5. Reactive progression

Главная идея оригинала сохраняется:
любая подсистема может создать условия для progression другой.

Реализация target:
- typed reaction facts;
- declarative event triggers;
- typed conditions;
- deterministic priority classes;
- persisted RNG;
- pending blocking scene;
- resolver re-run after choice;
- cascade limit.

Нет десятков независимых main update listeners.

## 6. Jobs

Job состоит из:

### Repeatable JobDefinition
- availability;
- Energy cost;
- salary;
- +2/-1 stat pattern;
- seasonal/world modifiers;
- Lust variants;
- ordinary shift content.

### Career domain state
- stage;
- shifts;
- counters;
- choices;
- facts;
- transitions;
- ending eligibility.

Job shift и Career progression связаны через effects/reaction facts, но не являются одним handler.

## 7. School

School — data-driven actions:
- cost Energy 1;
- money cost;
- stat package;
- availability;
- optional special rules.

После school effects Event Resolver может запустить career/quest continuation.

## 8. Lust

Похоть остаётся положительным content stat:
- unlock/replacement variants;
- route conditions;
- probability/choice gates там, где это задумано;
- не штрафует salary.

Конкретный Stat catalog ещё OPEN.

## 9. Calendar

Calendar config поддерживает:
- year/cycle;
- seasons/phases;
- repeated dates;
- scheduled events;
- job/world modifiers;
- run end rules.

Конкретная длительность successor run не фиксируется v1.

Calendar события описываются data, а не scatter `if day == N`.

## 10. Day lifecycle

```text
StartDay
-> apply NextDayModifiers
-> calculate Energy
-> calendar/day-start reaction pass
-> DayHub
-> actions / optional events / Activity
-> EndDayRequested
-> NightFlow
-> CalendarAdvance
-> StartDay
```

Energy — единственный обычный дневной action budget.

## 11. Night

Night имеет phases и forced interception points.

Lodging payment и Night event — не один неразделимый handler.

Это позволяет:
- forced route до rent;
- обычную оплату;
- voluntary partner/study;
- next-day penalties;
- exact-once calendar advance.

## 12. Activity

Future large activity подключается через Activity adapter.

Daily Energy только оплачивает entry/commitment.

Внутренние endurance/HP/time хранятся отдельно.

Activity save/resume и result обязаны быть частью vertical slice до выбора конкретной JRPG replacement.

## 13. Ending

```text
eligible
-> commitment
-> central completion
-> RunResult
-> exactly-once Meta reward
-> New Run
```

Meta reward не выдаётся просто за достижение condition.

## 14. Meta

Meta domains:
- completed endings;
- unlocks;
- rule modifiers;
- Hard Work progress;
- optional carry-over.

Пока OPEN:
- automatic vs selectable loadout;
- slots/budget;
- точный каталог наград.

## 15. Conditions/effects

Target content использует declarative AST и whitelist effects.

От generic `metrics`/boolean flags постепенно перейти к typed domain ownership.

Cross-system связь идёт через public facts/reaction facts, а не прямую запись внутренних stages другой системы.

## 16. Persistence

Сохраняются:
- RNG;
- pending resolved variants;
- night phase;
- active Activity;
- reaction state, если он влияет на exactly-once;
- Run+Meta.

Schema/content migrations обязательны до content scale-up.

## 17. Что остаётся OPEN

v1 специально НЕ решает:
- окончательный набор stats;
- остальные 7 jobs;
- 11-ю профессию;
- run length;
- цены/зарплаты;
- school catalog;
- replacement large activity;
- exact Final Mode successor;
- полный meta reward catalog.

## 18. Следующий engineering milestone

До content expansion нужен **Architecture Migration Slice**, не новый feature pack.

Он должен доказать:

1. M3.2 SaveEnvelope мигрируется в target-shaped test state.
2. Один authoritative Energy owner.
3. Один typed CareerState вместо нескольких flags.
4. Condition/Effect v2.
5. Action -> stat change -> external career event через Event Resolver.
6. Event choice -> второй event cascade.
7. Night forced-before-rent и normal paid night как два тестовых пути.
8. Test Activity: cost 2, save/resume, success/failure result.
9. Ending eligible -> commit -> central completion -> exactly-once meta reward.
10. Save/reload в каждом pending phase даёт тот же outcome.

Только после прохождения этого slice имеет смысл переносить/писать массовый контент.
