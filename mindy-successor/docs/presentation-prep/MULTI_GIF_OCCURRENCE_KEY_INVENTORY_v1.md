# Multi-GIF Occurrence-Key Inventory v1

Purpose: identify existing persisted values that can stabilize presentation-only GIF selection across reload **without adding save fields**.

Classification:
- **DERIVABLE_NOW** — current persisted state contains enough identity/counter data.
- **NEEDS_SMALL_PLUMBING** — persisted data exists, but the presentation selector does not currently receive it.
- **NEEDS_OPTIONAL_PRESENTATION_KEY** — no sufficiently stable current identity is available.

Current conclusion: no shipped family reviewed here requires a new optional presentation key as the first implementation choice.

## Action / result

**Classification:** DERIVABLE_NOW.

Existing persisted values:
- `run.id`;
- `historyState.actionCounts[actionId]`;
- `lastAction.id`;
- `lastAction.presentationId`;
- career `completed_shifts` counter for ordinary career shifts.

Recommended occurrence key:

`run.id | actionId | actionCount | presentationId`

For ordinary career shift results, `completed_shifts` may also be used as the occurrence ordinal.

Why stable:
- action count is incremented in gameplay state;
- it survives reload;
- a later occurrence receives a later count;
- no media filename is involved.

**Plumbing note:** selector must receive the count/occurrence key; no schema change is required.

## Reactive event

**Classification:** DERIVABLE_NOW.

Existing persisted pending identity:
- `pendingScene.eventId`;
- `pendingScene.variantId`;
- `pendingScene.reactionEpochId` when materialized from a reaction epoch;
- queued event `instanceId` before materialization;
- persisted event history/counts as an additional fallback source.

Recommended pending key:

`run.id | eventId | variantId | reactionEpochId`

When selecting from a queued instance before materialization:

`run.id | queued.instanceId`

If a legacy/current pending scene lacks `reactionEpochId`, derive an occurrence ordinal from persisted event-history count rather than rerolling from transient UI state.

## School paid lesson

**Classification:** DERIVABLE_NOW.

Existing persisted values:
- semantic lesson `presentationId`;
- School track identity;
- track counter `lessons_completed`;
- global School action count.

Recommended key:

`run.id | trackId | lessons_completed | presentationId`

The track counter is preferable to the global School action count because it distinguishes lesson occurrences per track.

No new School mechanic is required.

## Night study

**Classification:** NEEDS_SMALL_PLUMBING.

Existing persisted values already available:
- `NightFlow.startedDay`;
- `NightFlow.selectedNightChoiceId`;
- School track `night_study_sessions` counter after the choice is applied.

Recommended key after a dedicated Night-study presentation surface exists:

`run.id | startedDay | selectedNightChoiceId | night_study_sessions`

Why not DERIVABLE_NOW for presentation:
- current product does not expose a dedicated Night-study semantic presentation slot;
- presentation selection therefore needs a small owner-to-selector plumbing step once such a surface is authored.

No new save field is needed.

## Activity

**Classification:** DERIVABLE_NOW.

Existing persisted `ActivityEnvelope` values:
- `activityId`;
- `startedDay`;
- `checkpoint`;
- `internalState.routeId`;
- `internalState.steps`;
- `internalState.resolvedOptionIds`;
- Activity-local persisted RNG state.

Recommended presentation occurrence key:

`run.id | activityId | startedDay | checkpoint | routeId | steps`

For a result presentation, include the authored outcome semantic ID rather than consuming Activity RNG for media selection.

Do not use `lastRoll` as the media-selection random source; it belongs to Activity gameplay.

## Ending / RunResult

**Classification:** DERIVABLE_NOW.

Existing persisted values:
- `run.id`;
- committed `endingId`;
- completed `RunResult.transactionId`;
- `RunResult.resultId`;
- `completedAtDay`.

Preferred completed-ending key:

`transactionId | presentationId`

For the committed ending scene before completion:

`run.id | committedEndingId | presentationId`

No candidate key needs to be stored separately.

## Ordinary poverty events

**Classification:** DERIVABLE_NOW.

They use the same persisted event machinery as other reactive events:
- `eventId`;
- `variantId`;
- `reactionEpochId`;
- queued `instanceId`;
- event history count.

Recommended key:

`run.id | eventId | variantId | reactionEpochId`

This is especially important because:
- gameplay variant selects helpful/neutral/pressure meaning first;
- GIF selection occurs only beneath that already-fixed semantic event+variant identity.

Media selection must never choose a poverty outcome.

## Summary

| Family | Existing persisted occurrence material | Classification |
| --- | --- | --- |
| action/result | actionCounts + presentationId + run.id | DERIVABLE_NOW |
| reactive event | eventId + variantId + reactionEpochId / queued instanceId | DERIVABLE_NOW |
| School paid lesson | trackId + lessons_completed + presentationId | DERIVABLE_NOW |
| Night study | startedDay + selectedNightChoiceId + night_study_sessions | NEEDS_SMALL_PLUMBING |
| Activity | activityId + startedDay + checkpoint + route/steps | DERIVABLE_NOW |
| ending/RunResult | transactionId or run.id + committed ending | DERIVABLE_NOW |
| ordinary poverty event | eventId + variantId + reactionEpochId | DERIVABLE_NOW |

## Implementation rule

Prefer deterministic presentation selection:

`hash(presentationId + occurrenceKey + poolVersion)`

over storing a new candidate key.

The hash:
- must not mutate gameplay RNG;
- must be stable across reload;
- may vary across new occurrences;
- remains presentation-only.

## Optional presentation key threshold

Only introduce a persisted optional presentation candidate key if a concrete shipped surface cannot derive a stable occurrence key from existing persisted gameplay identity.

That condition is **not demonstrated by the current inventory**.
