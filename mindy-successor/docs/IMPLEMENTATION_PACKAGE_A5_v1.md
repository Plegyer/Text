# IMPLEMENTATION PACKAGE A5 — Activity Envelope

Дата: 2026-09-26.

Статус: **IN IMPLEMENTATION**.

Base commit:
`240d978f77574d95a7ec896345b1716d3224913d` (A4 merged green).

Branch:
`a5-activity-envelope`.

## Goal

Implement the target Activity boundary without choosing the final expedition/JRPG replacement.

A5 uses one synthetic adapter `counter.v1` only to prove:
- daily Energy is charged once on entry;
- internal Activity resources are separate;
- Activity state survives save/reload;
- success/escape/failure return a named typed result;
- result effects re-enter the ordinary Event Resolver.

## ActivityDefinition

Definitions may declare:
- id / label;
- definitionVersion;
- adapter / adapterVersion;
- entryConditions;
- entryEnergyCost;
- resumePolicy;
- timePolicy;
- failurePolicy;
- adapter config;
- named result definitions.

A5 supports `counter.v1` adapter version 1 with `same_day` time policy and resumable saves.

Its config:
- startEndurance;
- objectiveSteps;
- successOutcome;
- escapeOutcome;
- failureOutcome.

All outcome IDs must exist in the Activity result catalog.

## ActivityEnvelope

Persist:
- activityId;
- definitionVersion;
- adapter + adapterVersion;
- status;
- startedAtDay;
- entryEnergyCommitted;
- internalState;
- activity RNG state;
- checkpoint;
- pendingScene;
- accumulated effects/rewards;
- emitted facts.

The schema stores a generic envelope; `parseSave` validates the adapter-specific internal state against the current ActivityDefinition.

## Commands

- `enterActivity(id)`;
- `activityAction(id)`.

For `counter.v1`:
- `advance` spends one internal Endurance and increases progress;
- reaching objective completes with success result;
- exhaustion before objective completes with failure result;
- `escape` completes with escape result.

No internal command may deduct daily Energy.

## Result

A named result contains ordinary typed Effects.

On completion:
1. resolve named ActivityResult;
2. apply effects atomically;
3. clear ActivityEnvelope;
4. emit `ActivityCompleted(activity, outcome)`;
5. run Event Resolver.

Quest/Career/Relationship/World facts therefore use the same A2/A3 infrastructure; no Activity-specific progression escape hatch.

## Resolver integration

Add typed facts/triggers:
- `activityStarted(activity)`;
- `activityCompleted(activity, outcome?)`.

Activity trigger subscriptions are declared in typed pack capabilities.

## Save / compatibility

A save with active Activity is valid only when:
- activity ID exists;
- definitionVersion matches;
- adapter/version matches;
- adapter internal state is valid;
- checkpoint is valid for that adapter.

Unknown adapter/result/version/state is rejected deterministically.

## Required tests

- entry costs exactly 2 daily Energy;
- first internal advance costs Endurance but no further daily Energy;
- save/reload after first internal step preserves all Activity state;
- same save resumes deterministically;
- success result adds QuestFact;
- ActivityCompleted/result immediately launches external resolver event without another city action;
- escape result differs from success;
- exhaustion produces failure result;
- ordinary work, Night and second Activity entry are blocked while Activity is active;
- invalid result ID/config rejected at catalog load;
- corrupted internal state/version rejected at save load;
- result failure remains atomic to caller;
- shipped A1–A4 tests remain green.

## Acceptance

Real runner:
`npm run check` must pass.

Out of scope:
- final Forest routes/content/UI;
- combat;
- multi-day camp;
- `advances_calendar_on_exit` adapter;
- `can_advance_days_internally` adapter;
- A6 RunResult/Meta exactly-once.
