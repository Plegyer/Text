# Relationship Trigger Model v1

Дата: 2026-09-25.

Статус: **TARGET PRODUCT CONTRACT**.

Основание:
- user clarification of Simply Mindy relationship presentation;
- verified reactive main-router architecture;
- verified job visit/stat/counter gates;
- verified Night partner counters;
- `ACTION_TIME_COST_MODEL_v1.md`.

## 1. Main rule

Major relationship content is primarily **condition-triggered reactive content**, not a repeatable daytime "Spend Energy to socialize" system.

Typical trigger families:

```text
stat threshold reached
job visit count reached
career stage reached
interaction/night counter reached
external quest/item fact reached
season/calendar condition reached
previous relationship choice reached
```

When the condition becomes true:
- Event Resolver offers/starts the relationship scene;
- scene itself normally costs 0 daytime Energy.

## 2. Stat-gated dialogue

Example structure:

```text
relationship.stage == known
AND Charm >= 25
AND Sociability >= 20
-> relationship_event_X
```

The stat gain may have come from:
- Work;
- School;
- Activity;
- meta start;
- another event.

The relationship does not care where the stat came from unless a specific route says so.

## 3. Interaction-count dialogue

Example:

```text
jobVisitsWithNpc >= 10
-> first personal dialogue

nightsTogether >= 3
-> next relationship stage

helpedNpcCount >= 2
-> trust scene
```

The counter owner is the actual triggering system.

No extra "relationship Energy" is deducted when the threshold scene fires.

## 4. Career-linked relationships

A job can naturally produce:

```text
shift #N
-> free NPC scene
-> future shifts increment shared counter
-> stat threshold
-> free dialogue
-> voluntary Night option appears
-> Night counter
-> next free reactive milestone
```

This is the preferred baseline for work-origin relationships.

## 5. Night meetings

A voluntary relationship night:
- uses the Night slot;
- does not spend daytime Energy;
- normally does not reduce next-day Energy;
- increments its own relationship/night counter;
- may unlock a free reactive scene on next hub entry.

If an individual night has a special consequence, it uses explicit `NextDayModifier`.

## 6. Repeatable daytime meetings

A relationship does **not** need a generic daytime date button.

If a specific route needs a deliberate trip/date:
- define it as a real action;
- give it explicit Energy/money/time cost;
- do not generalize that cost to all relationships.

## 7. Free does not mean inconsequential

A zero-Energy relationship scene can:
- set facts;
- change stage;
- open/close route;
- give/remove items;
- alter housing;
- unlock Night option;
- change career ending eligibility.

Its opportunity cost comes from the conditions/player choices, not necessarily an action point.

## 8. Resolver behavior

After any state-changing command:

```text
apply action effects
-> collect reaction facts
-> evaluate career/relationship events
-> resolve highest priority eligible scene
-> return / recheck
```

If several relationship/career scenes become eligible at once:
- deterministic priority;
- remaining latched/queued where appropriate;
- no Energy charged simply for resolving the queue.

## 9. Content production consequence

This model is cheaper and denser than a standalone dating simulator.

For a major NPC, production can focus on:
- meaningful threshold scenes;
- Night variants;
- external requests;
- branch decisions;

instead of writing dozens of paid "date actions".

## 10. Acceptance

A work-origin relationship passes if:

1. repeated job interactions build a counter/fact;
2. reaching a threshold triggers dialogue at 0 Energy;
3. School can hit a stat gate and trigger the same line immediately;
4. optional Night meeting uses Night slot only;
5. repeated Night interactions can trigger another 0-Energy milestone;
6. relationship can return effects to career;
7. reload does not replay counter/effects.

## 11. Explicit exceptions

Possible but must be content-defined:
- paid dinner;
- day trip;
- joint Activity;
- training session;
- quest travel.

Only those explicit actions spend Energy/time/money.
