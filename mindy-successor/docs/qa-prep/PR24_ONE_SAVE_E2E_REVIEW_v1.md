# PR24 One-Save E2E Review v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
PR: #24 — `Lead: add release-candidate one-Save shipped E2E smoke`  
Reviewed head: `58ea5865a156652e502ae4d118093e42175b1fad`  
Base main at review: `6d5eeee7df82409113327b942d47be5b36ab6866`

## Executive result

**BLOCKER**

PR24 is directionally strong and satisfies the key no-false-green constraints, but its current one-Save test is red on the exact reviewed head.

Workflow:

- `Release Candidate Smoke Check`
- run: `36265860213`
- typecheck: PASS inside `npm run check`
- validate: PASS
- validation: `7 packs, 26 events, 26 actions, 9 endings`
- build: PASS
- tests: **209 total**
- pass: **208**
- fail: **1**

Failing test:

`release-candidate shipped E2E keeps one Save coherent across Lumber, School, Night, Forest and Hard Work`

Failure:

`Сначала завершите текущую сцену.`

at:

`beginNightMutable -> dispatch(endDay)`

after the paid Arcana School lesson.

This is useful one-Save evidence: the accumulated Lumber/Foreman/School state produces a pending scene at the School boundary, but the smoke does not resolve it before trying to enter NightFlow.

The fix belongs in the E2E flow/test orchestration. Chat 4 should not weaken the engine guard.

---

# 1. Same Save across the full path

**GREEN by construction, BLOCKED by current execution failure**

The test uses one mutable variable:

`let s=started()`

and every command/reload reassigns that same logical Save:

```text
Lumber
-> Foreman
-> School
-> Night
-> Forest
-> ending
-> New Run
```

Reloads are real:

`parseSave(JSON.stringify(state),catalog)`

No subsystem is restarted from a new fixture after the initial `started()`.

Therefore the intended path is genuinely one-Save.

The current red failure happens because that continuity exposes a cross-system pending scene after School.

---

# 2. Accelerator inventory

**GREEN**

Only one explicit direct state accelerator exists:

```ts
s.run.progression.careers.lumber!.counters.completed_shifts=49;
```

This occurs immediately before the real 50th:

`dispatch(...lumber.shift...)`.

It is a repetition accelerator only.

No direct mutation inserts:

- ending eligibility;
- ending commitment;
- RunResult;
- Meta reward;
- Forest continuation facts.

---

# 3. School public-fact injection

**GREEN**

The test does not inject:

`lumber.school.management-ready`.

After the real paid Arcana lesson it explicitly asserts the fact remains absent.

Therefore unresolved School public-result authoring stays OPEN.

No synthetic:

`school.lumber-management`

action is used.

---

# 4. Old Boundary Token / capability injection

**GREEN**

The natural E2E Forest path uses:

`forest.route.logging-road`.

The test does not seed:

- `old_boundary_token`;
- `enter_old_boundary`;
- legacy capability worldFact.

It explicitly verifies:

`forest.route.old-boundary`

is not available without the item.

Thus PA09/ordered PA17 are not falsely claimed by this one-Save path.

---

# 5. Forest success fact injection

**GREEN**

The test does not directly insert:

`lumber.forest.truth-known`

or career continuation facts.

It reaches success using real commands:

```text
enterActivity(lumber.forest)
-> forest.route.logging-road
-> advance
-> reload
-> advance
```

Then it asserts the real success fact and pending Lumber continuation.

The continuation is resolved through a real choice.

---

# 6. Hard Work locked condition/reward

**GREEN in current production; COVERAGE_GAP in PR24 assertions**

PR24 does not modify production runtime/content.

Current main continues to define:

`ending.lumber.hard-work`

with only:

`careerCounter(lumber, completed_shifts) >= 50`

and exact reward:

`hardWork:lumber`.

The smoke asserts after the real 50th shift:

- `completed_shifts=50`;
- Hard Work is eligible;
- Forest ending is independently eligible;
- run remains active;
- no Meta reward yet.

It later asserts exact applied reward:

`['hardWork:lumber']`

and exactly-once Meta after reload/retry.

## Coverage gap

Immediately after setting:

`completed_shifts=49`

the test reloads and executes the final shift.

It does **not** explicitly assert at 49 that:

`ending.lumber.hard-work`

is absent from eligibility.

It also does not deep-equal the production ending condition to prove it is the one and only condition.

These are coverage gaps, not evidence of a production regression.

Recommended test strengthening:

- assert Hard Work unavailable at 49;
- retain the real 50th shift;
- optionally deep-equal exact condition/reward or rely on a named sentinel test that already locks them.

Do not change production content.

---

# 7. Reload checkpoint review

## Lumber pending milestone

**MEANINGFUL**

Reload occurs while:

`lumber.career-first-shift`

is pending before the choice.

This exercises persisted event identity.

## Foreman pending scene

**MEANINGFUL**

Reload occurs while:

`lumber.foreman-notice`

is pending before professional choice.

## Paid School boundary

**MEANINGFUL, CURRENTLY REVEALS BLOCKER**

The test reloads after the paid School command.

But it assumes the next valid operation is `endDay`.

On the accumulated one-Save state this is false: a pending scene remains.

This is the current integration blocker.

The smoke must inspect and resolve the actual pending School-triggered scene through its normal allowed choice before NightFlow.

It must not clear `pendingScene` directly.

## Night after lodging

**MEANINGFUL**

Reload after committed paid lodging protects exactly-once payment.

## Night pending Foreman event

**MEANINGFUL**

Reload occurs with the Foreman Night event pending.

## Activity before route

**MEANINGFUL**

Reload occurs after general Forest entry and before selecting logging-road.

This protects option-model state and entry Energy exactly once.

## Activity after route

**MEANINGFUL**

Reload after logging-road route selection protects:

- routeId;
- resolved option identity.

## Activity after advance

**MEANINGFUL**

Reload after one internal `advance` protects progress/checkpoint state.

## Activity result / Lumber continuation pending

**MEANINGFUL**

Reload occurs after real Forest success while Lumber continuation is pending.

## Pre-ending commit

**MEANINGFUL**

Reload occurs after threshold eligibility and before explicit commitment.

## Ending committed

**MEANINGFUL**

Reload occurs after `commitEnding` and before completion.

This protects the “commit does not grant Meta” boundary.

## Ended RunResult

**MEANINGFUL**

Reload occurs after completion, then completion is retried.

This is strong exactly-once transaction evidence.

## New Run

The test performs New Run and validates starting Meta effect.

A final reload after New Run would strengthen persistence evidence but is not required to fix the current blocker.

---

# 8. Current failing School boundary

The red run proves a cross-system one-Save difference that isolated School tests do not expose.

Current sequence:

```text
Foreman professional route
-> Arcana paid lesson
-> reload
-> endDay
```

Actual state after the School boundary includes a pending scene.

Engine correctly rejects:

`endDay`

while a scene is unresolved.

## Required test-flow correction

The smoke should:

1. assert the actual pending event after School;
2. reload that pending scene;
3. resolve it through a real allowed choice;
4. assert no second tuition/Energy/School counter change;
5. only then call `endDay`.

If the pending event identity is deterministic, assert its exact ID/variant/presentation.

Do not:

- set pending to null;
- skip Resolver;
- restart from a fresh Save;
- remove the event from production content.

---

# 9. No-false-green disposition

| Check | Result |
|---|---|
| one logical Save | **GREEN** |
| only `completed_shifts=49` direct accelerator | **GREEN** |
| School public-fact injection absent | **GREEN** |
| synthetic School action absent | **GREEN** |
| Old Boundary Token injection absent | **GREEN** |
| capability worldFact injection absent | **GREEN** |
| Forest success fact injection absent | **GREEN** |
| ending eligibility injection absent | **GREEN** |
| Meta/reward injection absent | **GREEN** |
| exact `hardWork:lumber` applied once | **GREEN** |
| explicit 49-not-eligible assertion | **COVERAGE_GAP** |
| full CI | **BLOCKER — 208/209** |
| School pending scene handled | **BLOCKER** |

---

# Final PR24 disposition

**BLOCKER**

The test design is honest and should be retained.

The blocker is specifically the unhandled real pending scene after the paid School lesson in the accumulated one-Save state.

After that flow is corrected, rerun the exact full workflow.

Required merge evidence:

- full `npm run check` green;
- one-Save test green;
- no additional direct state accelerators;
- 49 threshold assertion strengthened if practical;
- all existing authoring gaps remain explicitly OPEN.

No production runtime/UI/content file was modified by Chat 4.
