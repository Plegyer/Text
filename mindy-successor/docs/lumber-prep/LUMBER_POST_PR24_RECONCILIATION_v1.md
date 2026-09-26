# Lumber Post-PR24 Reconciliation v1

Status: reconciliation against merged main after PR #24.
PR #24 merge: `9aa0eaf964735e82b9b964bbdcaf5362c292868a`.

## Merged one-Save path

The shipped RC path now executes in one persisted Save:

`Lumber shift -> career milestone -> professional Foreman -> paid School Arcana lesson -> base.school blocking scene -> listen -> NightFlow -> lodging.normal -> lumber.foreman.night -> Forest logging-road -> Forest success -> Lumber return -> threshold accelerator to 49 -> real 50th Lumber shift -> ending commit -> completion -> reload/retry -> New Run`

This reconciliation treats merged main as source of truth.

## School boundary is real

After the paid School lesson:
- `school.course.arcana` costs 500 money and one daytime Energy;
- typed `lessons_completed` increments;
- `base.school` is the actual blocking scene;
- the scene is resolved with real choice `listen`;
- resolving the scene does not charge tuition/Energy again;
- typed School progress is not duplicated.

The one-Save path still verifies that:

`lumber.school.management-ready`

is absent.

Therefore PR24 does not close School management/accounting public-result authoring.

## Forest logging-road remains natural shipped path

Forest entry:
- Activity `lumber.forest`;
- entry cost 2 daytime Energy;
- no Old Boundary Token is seeded;
- no capability worldFact is injected.

The available route includes:

`forest.route.logging-road`

and does not expose:

`forest.route.old-boundary`

without actual `enter_old_boundary` ownership.

The one-Save path selects logging-road, advances normally, and reaches existing success.

Old Boundary Token acquisition/use remains a Product decision and is not falsely closed by PR24.

## Exact Forest return

Forest success continues through exact A5 reaction:

`activityResult(lumber.forest, success, lumber.forest.success)`

Listener:

`lumber-cross.activity-forest-return`

The listener then writes Lumber-owned Forest career facts.

A generic worldFact-only replacement is not accepted.

## 49 is only a threshold accelerator

The merged test explicitly sets:

`completed_shifts = 49`

immediately before the final ordinary Lumber shift.

It then reloads and asserts:
- counter is 49;
- Hard Work is **not** eligible.

The test next dispatches a real:

`lumber.shift`

and asserts:
- counter becomes 50;
- the actual shift pays its ordinary daytime Energy cost;
- Hard Work becomes eligible.

Therefore:
- 49 is not ordinary-play evidence;
- 49 is not product authoring;
- the real 50th shift remains the eligibility transition.

## Hard Work remains exact

Ending:

`ending.lumber.hard-work`

Only condition:

`careerCounter(lumber, completed_shifts) >= 50`

Exact reward:

`hardWork:lumber`

PR24 does not add:
- School prerequisite;
- Forest prerequisite;
- item prerequisite;
- relationship prerequisite;
- season prerequisite;
- milestone prerequisite.

Commitment remains separate from completion.

Completion applies `hardWork:lumber` exactly once.

Reload/retry does not duplicate it.

New Run exposes the locked +3 Strength / +3 Endurance effect and preserves it after reload.

## Remaining OPEN work

PR24 does not close:
1. Old Boundary Token acquisition source/timing/use/retain-consume decisions;
2. School management/accounting public-result provider/threshold;
3. Hunter-trail authored gate;
4. three challenge-family content depth;
5. season-driven Forest topology/options.

These are human decision/content authoring items, not runtime regression blockers.

## Reconciliation result

Merged PR24 is consistent with Lumber locked contracts.

The merged one-Save path is valid shipped evidence for the logging-road/Hard Work path, with exactly one labeled long-threshold accelerator at 49 and a real 50th shift.
