# IMPLEMENTATION PACKAGE A3 — Event Resolver

Дата: 2026-09-26.

Статус: **IN IMPLEMENTATION**.

Base commit:
`138fc181319d4292dc9ffd5b30b645fd459f198c` (A2 merged green).

Branch:
`a3-event-resolver`.

## Goal

Replace the M3.2 action-only scheduler with one deterministic reaction resolver while keeping shipped legacy events compatible.

This package proves cross-system reactive progression. It does not implement NightFlow, ActivityEnvelope or ending/meta completion.

## Reaction facts

Runtime may emit typed facts at state-changing boundaries:
- creationCompleted;
- actionCompleted;
- choiceResolved;
- statChanged;
- resourceChanged;
- energyChanged;
- calendarAdvanced;
- dayStarted;
- careerCounterChanged;
- careerTransition;
- careerFactAdded;
- questCounterChanged;
- questTransition;
- questFactAdded;
- relationshipCounterChanged;
- relationshipTransition;
- relationshipFactAdded;
- worldFactAdded;
- endingEligible.

Legacy `event.trigger: [actionId]` remains a compatibility alias for ActionCompleted(actionId).

## Event additions

Event definitions gain:
- `reactionTriggers[]`;
- `priorityClass`;
- `blocking`;
- `delivery.policy = live | latched | scheduled`;
- optional `expiresAfterDays` for scheduled delivery.

Priority class order is fixed:
1 terminal
2 ending_committed
3 forced
4 scheduled_mandatory
5 critical_progression
6 normal_progression
7 optional_world
8 notification

Numeric priority only orders events inside the same class.

## Reaction epoch

FlowState persists:
- monotonic epoch counter;
- current reactionEpochId;
- chance-attempted event IDs;
- cascade depth;
- queued resolved instances for latched/scheduled/optional delivery.

A new normal player/lifecycle boundary starts a new epoch.
Resolving a blocking choice continues the pending event epoch so cascade depth and chance-attempt memory survive save/reload.

## Chance / variant

Chance is rolled only after trigger/condition/cooldown/repeat/variant/choice checks.
One event is attempted at most once per epoch.

A blocking PendingScene snapshots:
- eventId;
- variantId;
- reactionEpochId;
- allowedChoiceIds.

Reload never rerolls pending chance or variant.

## Delivery

Live:
- eligible only while current trigger + conditions are true.

Latched:
- when triggered/eligible/chance-passed, resolved instance is persisted;
- it may show later even if its original condition becomes false.

Scheduled:
- same persisted resolved instance;
- explicit expiry day removes it deterministically.

Optional:
- non-blocking resolved instance is exposed through DayState optionalOfferIds and does not stop ordinary work;
- opening an offer is an explicit command.

## Cascade

After a blocking choice:
- apply typed effects/transitions;
- generate new reaction facts;
- rerun resolver automatically.

Maximum blocking selections within one reaction epoch: 16.
Exceeding cap throws deterministic diagnostic error without mutating the caller's Save.

## Ending commitment suppression

When Run is ending_committed or EndingState.committed is set, normal/optional progression is not selected by resolver. A6 will implement full commitment/completion semantics.

## Trace

A public resolver test/debug function returns a deterministic trace:
- facts;
- rejected candidates and reason;
- chance attempts;
- sorted candidates;
- selected event/offer;
- cascade depth.

## Required tests

- shipped legacy catalog behavior remains green;
- same-class tie uses stable event ID;
- higher priority class beats huge numeric lower class;
- school stat gain triggers career event without another work action;
- choice fact triggers second event immediately;
- same input/RNG produces identical pending;
- pending reload does not reroll;
- failed chance is not retried inside same epoch;
- optional offer does not block work;
- latched resolved event survives condition loss;
- scheduled instance expires;
- committed ending suppresses normal progression;
- cascade cap returns diagnostic failure and preserves caller input;
- pending blocks incompatible commands;
- trace contains explicit rejection/selection information.

## Acceptance

Real runner:
`npm run check` must pass.

Out of scope:
- Night phases (A4);
- Activity envelope (A5);
- RunResult/meta exactly-once (A6);
- mass migration of production JSON.
