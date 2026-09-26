# IMPLEMENTATION PACKAGE A4 — Night Flow

Дата: 2026-09-26.

Статус: **IMPLEMENTED / GREEN**.

Base commit:
`2e0b52e96725ba3b843f78585b60019bea28bdd9` (A3 merged green).

Branch:
`a4-night-flow`.

## Goal

Replace the atomic legacy "sleep = pay + day++" behavior with an explicit, resumable NightFlow while preserving the old M3.2 UI through a compatibility command.

Target phases:

`EndDayRequested -> PreLodgingForcedCheck -> LodgingResolution -> PostLodgingForcedCheck -> VoluntaryNightChoice -> NightEventResolution -> NextDayModifiersFinalized -> CalendarAdvance -> StartDay`.

## Target commands

- `endDay`;
- `chooseLodging(lodgingId)`;
- `chooseNightChoice(choiceId)`;
- existing event `choice` resolves forced/partner scenes;
- legacy `sleep(payment)` remains compatibility-only and internally uses the NightFlow.

## Night state

Persist:
- phase;
- startedDay;
- selected lodging;
- lodging payment committed;
- selected voluntary choice;
- suppressLodgingPayment;
- suppressVoluntaryMenu;
- consumesNight;
- calendarAdvanceCommitted;
- current intercept point / awaiting event chain.

Stable saves are allowed:
- before lodging choice;
- with pending before-lodging forced scene;
- after lodging payment / before voluntary choice;
- with pending post-lodging or post-choice scene.

## Lodging definitions

Target definitions may declare lodging options:
- id/label;
- resulting housing tier;
- money cost;
- conditions;
- immediate effects;
- next-day effects.

A4 synthetic baseline:
- normal room: 100 money, normal housing;
- cheap lodging: 50 money, cheap housing;
- street: 0 money, street housing, next-day Energy -1 and Grooming -1.

Payment is committed exactly once and is distinct from calendar advance.

## Voluntary NightChoice definitions

Target definitions may declare:
- id/label;
- conditions;
- immediate effects;
- next-day effects.

Synthetic baseline:
- sleep: no special effect;
- study: +2 selected test stat immediately, next-day Energy -1;
- relationship choice: no daytime Energy cost; may trigger a blocking relationship scene.

A voluntary choice consumes the night slot, not current-day Energy.

## Forced night events

Story events may declare:
- `nightPolicy.intercept = before_lodging | after_lodging | after_choice`;
- `suppressLodgingPayment`;
- `suppressVoluntaryMenu`;
- `consumesNight`.

Forced events are selected through the A3 Event Resolver using typed night reaction facts. Their normal choice effects may add next-day modifiers.

If a forced event intercepts before lodging with suppressLodgingPayment, rent is never charged.
If it suppresses the voluntary menu / consumes the night, NightFlow proceeds directly toward finalization after its scene cascade.

## Exactly-once calendar rule

Only NightFlow commits CalendarAdvance.
Payment, forced event choice, voluntary choice and resolver cascades never write day directly.

`calendarAdvanceCommitted` prevents duplicate day advancement after reload/retry.

At StartDay:
- queued next-day stat effects apply once;
- next-day Energy is computed once;
- modifiers clear;
- NightFlow clears.

## Resolver integration

Add typed reaction facts/triggers:
- `nightPhase(point)`;
- `nightChoiceCompleted(choice)`.

Resolver may run at:
- before_lodging;
- after_lodging;
- after_choice;
- StartDay via existing calendar/day facts.

A pending night event pauses the flow. After the last scene in its cascade resolves, NightFlow resumes from the persisted phase.

## Required tests

- before-lodging forced event can suppress rent and voluntary menu;
- normal paid night charges once;
- save/reload after payment does not charge again;
- cheap lodging uses its own price and housing tier;
- street applies Grooming -1 and next-day Energy -1 exactly once;
- night study gives immediate +2 stat and next-day Energy -1;
- voluntary relationship night costs no daytime Energy;
- post-lodging forced event occurs after payment;
- post-choice partner/forced event resumes and calendar advances once;
- pending forced scene survives reload without RNG reroll;
- calendar cannot advance twice from one NightFlow;
- ordinary daytime actions are blocked while NightFlow is active;
- legacy M3.2 sleep tests remain green.

## Acceptance

Real runner:
`npm run check` must pass.

Out of scope:
- ActivityEnvelope (A5);
- RunResult/Meta exactly-once (A6);
- production night NPC roster;
- Secret Debt production content.


## Implementation result — 2026-09-26

Implemented on `a4-night-flow`.

Delivered:
- explicit persisted NightFlow phases;
- target commands `endDay`, `chooseLodging`, `chooseNightChoice`;
- legacy `sleep(payment)` routed through the same NightFlow for M3.2 UI compatibility;
- data-driven lodging and voluntary night-choice definitions;
- typed `housingTier` condition;
- typed `nightPhase` and `nightChoiceCompleted` reaction facts/triggers;
- forced night event policy with before/after lodging and after-choice intercepts;
- suppression of lodging payment / voluntary menu;
- exactly-once calendar advance;
- next-day Energy/stat modifier finalization at StartDay;
- save/reload after lodging payment without double charge;
- persisted per-night handled-event IDs to prevent repeat interception loops;
- NightFlow save validation and invalid-reference rejection.

Synthetic acceptance proves:
- forced before-lodging event can replace rent and voluntary menu;
- paid normal/cheap lodging commits once;
- street gives Grooming -1 and next-day Energy -1 exactly once;
- night study gives immediate +2 stat and next-day Energy -1;
- voluntary relationship night costs no current-day Energy;
- post-lodging and post-choice scenes resume the same NightFlow;
- probabilistic forced pending survives reload without reroll;
- daytime actions are blocked while NightFlow is active;
- legacy sleep compatibility remains green.

Validation on GitHub Actions / Node 22:
- typecheck pass;
- catalog validation pass;
- build pass;
- **84/84 tests pass**;
- full `npm run check` pass.

Next package: **A5 Activity Envelope**.
