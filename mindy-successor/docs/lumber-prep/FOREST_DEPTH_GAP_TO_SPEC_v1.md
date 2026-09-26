# Forest Depth Gap-to-Spec v1

Status: current shipped Forest Activity vs Product Acceptance depth requirements.
Production baseline: PR #20 activation.

## Current executable Activity

Activity:

`lumber.forest`

Adapter:

`counter.v1`

Current locked mechanics:

- entry cost: 2 daytime Energy;
- entry gate: `lumber.capability.enter-old-boundary` worldFact bridge;
- `resumePolicy = allowed`;
- separate internal `endurance` resource;
- deterministic checkpoint/RNG envelope;
- `advance` internal action;
- `escape` action;
- success / escape / failure result IDs;
- exact A5 `activityResult` continuation on success.

## Gap matrix

| PA requirement | Current evidence | Status |
| --- | --- | --- |
| 3 route contexts | current `counter.v1` Activity has no authored route collection/context IDs | **GAP** |
| 3 challenge families | current adapter exposes one counter-style advance mechanic plus escape, not three authored challenge families | **GAP** |
| item capability changes available action/route | entry is gated by test/bridge fact for `enter_old_boundary`; real item acquisition/use/action-space seam remains un-authored | **PARTIAL / BLOCKED** |
| season difference | `lumber.forest` has no `calendarSeason` entry/result/challenge authoring and no seasonal Activity variant table | **GAP** |
| save/resume | `resumePolicy=allowed`; ActivityEnvelope persists definition version, internal state, RNG and checkpoint | **READY** |
| success/escape distinction | distinct results `lumber.forest.success` and `lumber.forest.escape`; escape does not grant success truth fact | **READY** |

## What already satisfies the architecture part

### Save/resume

The Activity envelope owns:

- `activityId`;
- definition version;
- adapter ID;
- internal progress;
- internal endurance;
- internal RNG;
- checkpoint;
- accumulated rewards;
- emitted facts.

Reload does not re-charge the 2-Energy entry cost.

### Success vs escape

Success result:

`lumber.forest.success`

adds:

`lumber.forest.truth-known`

and exact A5:

`activityResult(lumber.forest, success, lumber.forest.success)`

can trigger:

`lumber-cross.activity-forest-return`

Escape result:

`lumber.forest.escape`

is distinct and does not grant the success continuation fact.

## What must still be authored

### Three route contexts

Need three product-recognizable route contexts.

This document does not name them.

Do not infer route IDs from old drafts unless separately accepted.

### Three challenge families

Need three authored challenge families with distinguishable action/state meaning.

The current repeated `advance` counter is one generic adapter mechanic, not three families.

Exact challenges remain OPEN.

### Item action/route seam

`old_boundary_token -> enter_old_boundary` is locked.

Still needed:

- real acquisition;
- inventory visibility;
- capability query;
- route/action availability change;
- save/reload around use.

Injected `lumber.capability.enter-old-boundary` remains test setup, not PA17 completion.

### Season difference

Need a visible/mechanical Activity difference driven by current season.

Current Activity does not author one.

Exact seasonal differences remain OPEN.

## Non-gaps

Do not reopen:

- 2-Energy entry cost;
- no repeated daytime Energy inside Activity;
- save/resume architecture;
- success/escape result identity;
- A5 boundary name `activityResult`.

## Hard Work isolation

None of these Forest gaps may become a Hard Work requirement.

Hard Work remains only:

`completed_shifts >= 50`

with exact reward:

`hardWork:lumber`.
