# PR44 School localization exact-head failure audit v1

Status: COMPLETE / BLOCKED_ON_EXACT_HEAD_CI

Reviewed PR:
- PR #44 `lead/school-localization-production-v1`
- current head: `657398c24363e222ef6dcc4f233731712b8b6607`
- base: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
- PR is open, mergeable, not merged.

## Exact-head Actions evidence

Workflow `mindy-successor check`, run #58 / id `36322022589`, completed FAILURE.

The Full check reached the Node test suite:
- tests: 301
- pass: 300
- fail: 1
- failing subtest: `renderer: School RU EN localization preserves course commands and gameplay state`
- failure: `UI update timed out`
- test source: `tests/ui.test.ts:271`
- timed wait: line 308 on this head.

All preceding tests shown in the same job log, including Forest localization, passed; the separate School Night-study localization test after the failure also passed.

## Precise failing boundary

The failing assertion waits after clicking the Literacy & Numbers paid lesson for the action-result scene title to become `Literacy & Numbers`:

`await wait(()=>/Literacy & Numbers/.test(document.querySelector('.stage-title h1')?.textContent??''));`

That render assumption is incompatible with current-main authored School reaction behavior.

Current production contains two `actionCompleted(action="school")` notification events:
- `school-lesson-content-v1.after-school`
- `school-life-content-v1.after-paid-lesson`

After `schoolLesson` dispatch, the runtime may have `run.pending`. The renderer's `central()` checks `run.pending` before `screen==='scene' && run.lastAction`, so an authored pending School event is rendered before the localized lesson action-result scene. The wait therefore searches the wrong immediate post-command surface and times out.

This is a test/render-order expectation failure, not evidence that the paid-lesson transaction failed.

## Mechanics scope check

PR #44 production changes are limited to:
- localization strings;
- School presentation/localization helpers and rendering in `src/ui/app.ts`;
- UI tests;
- coordination docs.

The reviewed diff does not change School command dispatch, tuition values, Energy cost, course stat deltas, typed School progress, reaction ownership, Save schema, RNG, or content-pack gameplay effects.

Locked behavior remains:
- same `schoolLesson` course IDs;
- same tuition and current-day Energy transaction;
- same course stat effects;
- locale outside gameplay Save;
- worker-only exact-course/teacher staging not promoted.

## Required fix shape

The regression test must follow the real current-main presentation order instead of assuming the action-result scene is always immediate. Acceptable QA shape:
1. dispatch the same `schoolLesson`;
2. assert the gameplay transaction exactly once from persisted state;
3. if an authored School event is pending, assert/localize that pending event and resolve it through its real choice;
4. then assert any intended action-result presentation surface if it remains part of the UI contract;
5. RU↔EN toggles must not alter the gameplay Save.

Do not remove/disable production School reactions merely to make the UI test see the action-result scene.

## Verdict

`BLOCKED_ON_EXACT_HEAD_CI`.

At this audit point no later fixed PR44 head exists in Git/Actions evidence. Item 152 must re-read PR44 after a new head appears and must not treat this failed head as accepted.
