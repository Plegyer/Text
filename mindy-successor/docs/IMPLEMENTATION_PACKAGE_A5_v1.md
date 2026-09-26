# IMPLEMENTATION PACKAGE A5 — ActivityEnvelope

Дата: 2026-09-26.

Статус: **IMPLEMENTED / GREEN**.

Base commit:
`6d5183a5e77e70e1149d650243fdec3bf65d3040`.

Branch:
`lead/a5-activity-envelope`.

## Goal

Implement a generic persisted ActivityEnvelope plus one synthetic adapter proving the lifecycle contract:

```text
city
-> pay Activity entry exactly once (2 Energy in acceptance fixture)
-> persisted ActivityEnvelope
-> internal actions use activity-only resources
-> save/reload inside Activity
-> success / escape / failure
-> typed ActivityResult applied atomically
-> ActivityEnvelope cleared
-> A3 Resolver receives activity result fact and reacts
```

Do not implement the production Forest content in A5.

## Core rules

- daily Energy is charged only at entry;
- internal activity endurance/moves/RNG are not aliases to DayState Energy or global RNG;
- activity cannot start while NightFlow or global pending scene is active;
- normal city actions, Night and ending commit are blocked while ActivityEnvelope is active;
- save/reload resumes the same envelope;
- activity definition/version/adapter must match active catalog on load;
- ActivityResult is applied once when leaving the envelope;
- result effects are typed Effect v2;
- success, escape and failure are distinct outcomes;
- synthetic activity uses `same_day` time policy;
- calendar advance is out of scope for the synthetic adapter, but schema must make timePolicy explicit.

## Activity definitions

Definitions gain `activities[]`.

Initial supported adapter:
`counter.v1`.

ActivityDefinition:
- id;
- version;
- label;
- entryConditions;
- entryEnergyCost;
- resumePolicy;
- timePolicy;
- failurePolicy;
- adapter;
- adapterConfig;
- results.

Synthetic counter config:
- initialEndurance;
- advanceEnduranceCost;
- successAtProgress;
- failAtEndurance.

## ActivityEnvelope

Persist:
- activityId;
- definitionVersion;
- adapter;
- status;
- startedDay;
- entryEnergyCommitted;
- internalState;
- rngState;
- checkpoint;
- accumulatedRewards;
- emittedFacts.

Synthetic internal state:
- progress;
- endurance;
- steps;
- lastRoll.

The activity RNG stream is seeded once at entry from the global RNG and then advances independently.

## Commands

- `enterActivity(id)`;
- `activityAction(id)`.

Synthetic action IDs:
- `advance`;
- `escape`.

Advance:
- consumes activity endurance only;
- updates internal RNG/state;
- eventually returns success or failure.

Escape:
- returns escape result.

No command inside Activity charges daily Energy again.

## ActivityResult

Definition maps each outcome:
- success;
- escape;
- failure

to:
- typed effects;
- emitted result ID/fact.

On exit:
1. clone/transaction remains atomic;
2. result effects apply;
3. envelope clears;
4. resolver receives `activityResult(activity,outcome,result)`;
5. ordinary city state resumes.

## Resolver integration

Add typed:
- ReactionTrigger `activityResult`;
- ReactionFact `activityResult`.

Pack capability validation must require appropriate activity-result trigger declaration.

## Save/load

Reject:
- unknown activity ID;
- definition version mismatch;
- unsupported adapter;
- invalid synthetic internal state;
- startedDay later than current day;
- entryEnergyCommitted=false in persisted active envelope.

Reload must not charge entry cost or reseed activity RNG.

## Required tests

- entry costs exactly 2 Energy;
- no entry if current Energy < 2;
- entry cannot coexist with Night/pending;
- city actions/Night blocked while active;
- internal action changes activity endurance but not DayState Energy;
- Activity RNG differs from global stream and is deterministic after reload;
- save/reload preserves internal state/checkpoint;
- success result applies typed effects exactly once;
- escape and failure differ from success;
- ActivityResult triggers external resolver event at 0 extra Energy;
- repeated exit/result application impossible after envelope clears;
- corrupted/unknown adapter/version rejected;
- synthetic adapter is catalog-validated;
- existing A1–A4 tests remain green.

## Acceptance

Real runner:
`npm run check` pass.

A5 does not claim:
- production Forest slice;
- multi-day/camp implementation;
- final mini-game genre;
- A6 RunResult/meta semantics.


## Implementation result — 2026-09-26

Implemented on `lead/a5-activity-envelope`.

Delivered:
- typed `ActivityDefinition[]` and persisted `ActivityEnvelope`;
- first supported adapter `counter.v1`;
- entry Energy commit separated from internal Activity resources;
- dedicated Activity RNG stream seeded once from global RNG;
- synthetic internal progress/endurance/checkpoint state;
- save/reload validation against activity ID/version/adapter/config;
- success / escape / failure results;
- atomic typed result effects;
- `activityResult` reaction fact/trigger with pack capability validation;
- external A3 Resolver scene after successful return;
- city actions/Night/ending commitment blocked while Activity is active;
- same-day Activity policy proven without direct calendar writes.

Real GitHub Actions / Node 22:
- typecheck pass;
- validate pass;
- build pass;
- **97/97 tests pass**;
- full `npm run check` pass.

Next package: **A6 Ending / RunResult / Meta exactly-once**.
