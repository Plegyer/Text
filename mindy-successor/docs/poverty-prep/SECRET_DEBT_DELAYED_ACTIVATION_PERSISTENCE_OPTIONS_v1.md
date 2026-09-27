# Secret Debt Delayed-Activation Persistence Options v1

Status: technical comparison of bounded persistence shapes for `accepted_pending_activation -> bound`.

No option is selected as Product truth.

Delay length and debt values remain OPEN balance parameters.

## Current architectural facts

Production already persists:
- calendar elapsed day;
- career stage/counters/facts/choices;
- world facts;
- reaction/event history;
- queued reaction instances;
- `scheduledEventIds` references;
- queued instance `createdDay` and optional `expiresDay`.

Production conditions/triggers already include:
- `calendarElapsedDays`;
- `calendarAdvanced`;
- `dayStarted`;
- career counters/facts/stages.

Important limitation:
`scheduledEventIds` currently represents already-created queued scheduled reactions with expiry. It does **not** expose a general authored `deliverAtDay` / `notBeforeDay` field for future activation.

Therefore current scheduled delivery must not be treated as an existing N-day timer.

## Option A — persisted career countdown/counter

Shape:
- acceptance moves Secret Debt career/domain to pending stage;
- authoritative counter such as `days_pending` starts from zero;
- one deterministic day-start/calendar reaction increments it once per elapsed day while pending;
- a normal career transition becomes eligible when counter reaches the configured delay;
- transition to `bound` commits once.

Durable state owner:
Secret Debt career/domain progression.

Save/reload behavior:
- pending stage and counter already persist;
- reload cannot lose elapsed pending days;
- no wall-clock dependency.

Calendar interaction:
- count only authoritative calendar advances/day starts;
- no increment from reload;
- acceptance-day off-by-one convention must be specified in content/test.

Exactly-once activation:
- transition `pending -> bound` is one-way;
- after transition, pending counter event conditions no longer match.

Migration impact:
**CONTENT_ONLY / existing persisted career state**, assuming an implementation can increment the counter once per day without surfacing unwanted content.

Runtime/schema extension:
**NONE in state shape**.

Implementation caveat:
- current event system is content/event oriented; a hidden daily counter tick must be implemented through an accepted non-duplicating resolver/content pattern;
- if every daily tick would require a visible blocking scene, this option becomes ergonomically unsuitable and a bounded runtime helper is preferable.

Strengths:
- no new save field;
- delay remains parameterized;
- progression owner stays with Secret Debt.

Risks:
- daily-tick authoring can be noisy;
- exact once-per-day semantics must be proven;
- avoid event-history/cooldown tricks that accidentally skip days.

## Option B — dedicated typed `acceptedDay` / `activationDay` in SecretDebtState

Shape:
- accepted transaction persists `acceptedDay` and/or computed `activationDay` in a dedicated Secret Debt domain object;
- calendar/day-start boundary compares current elapsed day to activation day;
- when reached, runtime performs one-way pending -> bound transition.

Durable state owner:
dedicated Secret Debt domain state.

Save/reload behavior:
- absolute target day is explicit;
- reload before/at/after boundary is deterministic;
- no repeated daily counter required.

Calendar interaction:
- target is expressed in game calendar days, never wall clock;
- target day is computed once at acceptance from the configured delay.

Exactly-once activation:
- domain phase plus an activation-committed/one-way state transition prevents repeat;
- bound/resolved phases cannot activate again.

Migration impact:
**BOUNDED SAVE SCHEMA ADDITION** if a new `secretDebt` domain object/fields are added.

Runtime/schema extension:
**NEEDS_BOUNDED_RUNTIME_EXTENSION**.

Strengths:
- clearest debt-specific ownership;
- easy to audit target day;
- no hidden daily content event.

Risks:
- adds dedicated schema/migration surface before other Secret Debt fields are fully known;
- should not be chosen merely for convenience if existing domain progression is sufficient.

## Option C — extend queued scheduled reaction with `notBeforeDay` / `deliverAtDay`

Shape:
- acceptance queues one persisted activation event instance;
- queued instance stores earliest delivery/target day;
- resolver ignores it before target;
- at/after target it becomes eligible exactly once;
- resolving it transitions Secret Debt to bound.

Durable state owner:
reaction queue plus Secret Debt state.

Save/reload behavior:
- queued instance and target day persist;
- reload cannot reroll/recreate the activation event;
- event survives normal intervening days until delivery.

Calendar interaction:
- resolver compares target day to authoritative run day;
- current `expiresDay` is not a substitute for target day.

Exactly-once activation:
- consuming queued instance plus one-way Secret Debt transition.

Migration impact:
**BOUNDED REACTION-QUEUE SCHEMA MIGRATION** for existing saves if queued-instance schema gains an optional future-delivery field.

Runtime/schema extension:
**NEEDS_BOUNDED_RUNTIME_EXTENSION**.

Strengths:
- generic reusable future-event scheduling primitive;
- natural event-delivery model for activation reveal.

Risks:
- broader than Secret Debt;
- changes generic reaction queue semantics;
- must define interaction with expiry, priority, forced Night and pending scenes;
- should only be added if multiple product systems need true delayed scheduled delivery.

## Option D — encode acceptance day as static world facts/events

Shape:
- emit day-specific facts/IDs and author matching future conditions for every possible acceptance day.

Durable state owner:
world facts/event content.

Assessment:
**TECHNICALLY POSSIBLE ONLY THROUGH CONTENT EXPLOSION; NOT A MINIMAL COMPATIBLE OPTION**.

Why it is excluded from recommended technical set:
- up to the full calendar range needs duplicated authored cases;
- semantic identity becomes polluted with numeric timing;
- difficult migration/validation;
- high drift risk.

This option should not be used merely to avoid a bounded state field.

## Option E — current `scheduledEventIds` without extension

Assessment:
**NOT SUFFICIENT FOR DELAYED ACTIVATION BY ITSELF**.

Current behavior stores queued scheduled instances and expiry after an event has already been queued.

It does not provide an authored future target/not-before day.

Using `expiresDay` as an activation date would invert its meaning and create incorrect resolver semantics.

## Compatibility comparison

| Option | Uses current save shape? | Exactly-once feasible? | True arbitrary delay? | Generic runtime extension? |
| --- | --- | --- | --- | --- |
| A career countdown | YES | YES | YES via configured counter threshold | NO, if clean daily tick is feasible |
| B typed activationDay | NO, adds SecretDebtState fields | YES | YES | bounded Secret Debt extension |
| C scheduled notBeforeDay | NO, extends queued reaction schema | YES | YES | bounded generic scheduler extension |
| D day-specific facts | technically yes | fragile | yes via content explosion | NO but not minimal |
| E current scheduled queue unchanged | YES | queue is idempotent | NO future not-before semantics | NO, but insufficient |

## Save/reload acceptance common to any selected option

Future implementation must test:
1. accept loan and persist pending state;
2. reload immediately after acceptance;
3. advance to one day before target;
4. reload;
5. confirm still pending;
6. cross exact target boundary;
7. confirm bound transition exactly once;
8. reload at bound state;
9. advance another day;
10. confirm no duplicate grant, activation event or professional lock application.

Also test run expiry/near-calendar-end behavior if acceptance can happen late enough for target day to cross the run horizon.

## Migration policy

Existing saves with no Secret Debt state should remain equivalent to `unseen`.

Do not retroactively infer accepted debt from:
- street-sleep count;
- money history;
- generic flags;
- QA fixtures.

If schema adds optional Secret Debt fields, migration default must preserve no-debt state.

## Lead decision boundary

Lead may choose among technically compatible implementation shapes after checking actual implementation scope.

This document does not recommend A, B or C as Product truth.

Product only owns the behavior/balance inputs:
- there is a delayed activation after acceptance;
- exact interval remains balance-owned until locked.

Technical representation remains an engineering choice constrained by save/reload and exactly-once invariants.
