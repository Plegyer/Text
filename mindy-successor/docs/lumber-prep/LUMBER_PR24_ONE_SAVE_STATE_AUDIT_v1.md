# Lumber PR24 One-Save State Audit v1

Status: post-merge audit of the shipped one-Save E2E path.
Lead source branch: `lead/release-candidate-smoke-v2`.
PR #24 status: MERGED.\nMerge commit: `9aa0eaf964735e82b9b964bbdcaf5362c292868a`.\nMerge-ref evidence: typecheck PASS, validate PASS, build PASS, 209/209 tests PASS.
PR title: `Lead: add release-candidate one-Save shipped E2E smoke`.

This audit reviews the current Lead test path from the Lumber perspective. It does not patch shared runtime/content/UI.

## Audited one-Save path

`Lumber shift -> career milestone -> professional Foreman -> paid School lesson -> NightFlow -> normal lodging -> Foreman Night -> Forest logging-road -> Forest success -> Lumber continuation -> threshold accelerator to 49 -> final Lumber shift -> Hard Work eligibility -> explicit ending commit -> completion -> reload/retry -> New Run`

The path uses real shipped commands for the player-facing sequence.

## Lumber shift Energy accounting

### First Lumber shift

Command:

`dispatch({type:'action',id:'lumber.shift'})`

Expected:
- daytime Energy decreases by exactly 1;
- `completed_shifts` increments by exactly 1;
- reactive career milestone may open;
- no additional Lumber Energy is charged by the milestone.

The current Lead one-Save test observes Energy 3 -> 2 after the first shift.

### Final threshold shift

Immediately before the final ordinary shift, the test sets:

`completed_shifts = 49`

Then it executes one real:

`dispatch({type:'action',id:'lumber.shift'})`

Expected:
- counter becomes exactly 50;
- daytime Energy decreases by exactly 1;
- Hard Work becomes eligible.

The 49-state setup is a **long-threshold accelerator** only.

It is not:
- ordinary-play evidence for 49 prior shifts;
- production authoring;
- a shortcut to the final command;
- a substitute for the exact 50th shift transaction.

## Reactive Lumber / Foreman Energy

The current one-Save path resolves:

- `lumber.career-first-shift`;
- `lumber.foreman-notice`;
- choice `professional`.

These are reactive continuation scenes.

They must not charge another daytime Energy.

Observed state:
- first shift leaves Energy at 2;
- resolving the career milestone and Foreman professional route leaves Energy at 2.

## Professional Foreman route remains non-romance

The route is selected by:

`professional`

and produces relationship stage:

`route-professional`

No romance condition is required by the Lumber professional route.

The one-Save path does not set or require a romance/love/affinity state to expose the professional Foreman continuation.

## School step does not create Lumber management authoring

The Lead path uses a real paid School lesson:

`school.course.arcana`

This proves the School transaction path in one Save.

It explicitly verifies that:

`lumber.school.management-ready`

remains absent.

Therefore the one-Save E2E does **not** falsely close the still-OPEN School management/accounting public-result authoring.

## Night / Foreman continuation

The path uses:
- `lodging.normal`;
- `lumber.foreman.night`;
- `lumber-night.foreman-professional`.

The Night meeting consumes the Night slot but no daytime Energy.

Reload boundaries surround lodging/Night progression without replaying Lumber daytime costs.

## Forest logging-road path

The path enters:

`lumber.forest`

for the shipped 2-Energy entry cost.

It uses the normal route:

`forest.route.logging-road`

without injecting Old Boundary Token inventory or any capability worldFact.

After route selection, the path uses ordinary Activity `advance` actions until success.

This proves the normal logging-road route only.

It does **not** prove:
- Old Boundary Token acquisition;
- old-boundary route product authoring;
- token retain/consume policy;
- hunter-trail authoring;
- full three-route / three-challenge / season depth.

## Exact A5 Forest continuation

Forest success must produce exact reaction fact:

`activityResult(lumber.forest, success, lumber.forest.success)`

and select:

`lumber-cross.activity-forest-return`

The continuation then adds Lumber-owned career facts:
- `forest-truth-known`;
- `forest-problem-resolved`.

No extra Lumber shift is required for the Forest return.

A generic worldFact-only trigger is not an acceptable replacement for A5.

## Hard Work threshold and eligibility

Hard Work ending:

`ending.lumber.hard-work`

Only eligibility condition:

`careerCounter(lumber, completed_shifts) >= 50`

The one-Save test reaches exactly 50 by:
1. labeling/seeding 49 as a long-threshold accelerator;
2. executing one real `lumber.shift`.

No additional prerequisite may be inferred from the surrounding one-Save state.

In particular, Hard Work does not require:
- School;
- Forest;
- Foreman relationship;
- Night;
- season;
- milestone;
- item/capability.

## Explicit commitment / completion

The path keeps eligibility distinct from commitment.

It explicitly dispatches:

`commitEnding(ending.lumber.hard-work)`

and then:

`completeEnding`

The exact A6 reward remains:

`hardWork:lumber`

Commitment alone does not apply the Meta reward.

Completion applies it exactly once.

Reload/retry does not duplicate it.

## New Run

After completion, the one-Save path starts a new life and observes the locked Lumber Hard Work Meta effect:

- starting Strength 4 from base 1 + 3;
- starting Endurance 4 from base 1 + 3.

The exact semantic Meta reward remains `hardWork:lumber`.

## Audit result

The merged PR24 one-Save path is consistent with accepted Lumber contracts.

Important scope labels:
- PR24 is merged at `9aa0eaf964735e82b9b964bbdcaf5362c292868a`;
- the 49-shift setup is an explicit threshold accelerator;
- no Old Boundary Token product authoring is claimed;
- no School management result is claimed;
- Hard Work remains ONLY `completed_shifts >= 50`;
- Forest return remains exact `activityResult`;
- reward remains exact `hardWork:lumber`.
