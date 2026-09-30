# Chat 1 Developer — queue v6 current-main integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-49..C1D-60
Fresh production baseline for this refresh: `c0da1ba23ef2a60a1461171501c6c0725caf0412`
Branch: `chat1/c1d-v6-final-v2-current-main`

This branch was rebuilt after the merged Chat 3 queue-v6 content candidate landed. Earlier C1D-v6 working branches are selective source only and must not be merged.

## C1D-49 — post-v5 current-main consolidation inventory

Merged production/current-main surfaces:
- PR #97: starter-trio availability contract;
- PR #106: C1D v5 multi-scene action localization + ordinary-poverty depth consumer;
- PR #105: School whole-career transfer atlas / reactive preparation;
- PR #108: Chat 3 Forest/poverty v5 preparation;
- PR #109: cross-domain presentation preparation;
- PR #114: Chat 3 Forest/poverty v6 preparation, QA C4-81 PASS-WITH-NOTES, merged as current main `c0da1ba23ef2a60a1461171501c6c0725caf0412`.

PR #106 itself received C4-54 PASS-WITH-NOTES and is merged. Queue v6 does not copy its already-merged runtime/root-localization payload.

Still unresolved Product/runtime decisions:
- natural School -> Lumber management publisher;
- any late-career production unlock thresholds;
- intermediate Lumber progression;
- Secret Debt product values;
- any new Forest encounter/challenge/state identity.

## C1D-50 — career-unavailable reason contract audit

Current engine:
- starter careers are `lumber`, `satyr-maid`, `undead-farm`;
- `actionAvailable()` evaluates authored action conditions;
- a non-starter ordinary career `.shift` with `conditions=[]` remains unavailable.

Current Work UI:
- `disabled(action)` consumes `actionAvailable()`;
- requirement text is produced only from failed authored `action.conditions`.

Concrete gap:
- the seven late-career shifts currently have `conditions=[]`;
- their buttons are correctly disabled;
- there is no failed authored condition to render, so the UI cannot currently explain the specific missing-unlock-contract reason.

No numeric/stat/calendar/year threshold is needed or selected by this audit.

## C1D-51 — generic late-career unlock-condition regression seam

Disposition: CURRENT-MAIN NO-OP.

Existing `tests/starter-trio-availability.test.ts` already proves:
- empty conditions alone do not unlock a late ordinary career;
- a test-only authored condition is evaluated through the shared condition evaluator;
- dispatch stays blocked before the condition and succeeds after it;
- no production threshold is selected.

No duplicate test was added.

## C1D-52 — Satyr Maid Save/reload regression

Added `tests/starter-career-save-reload.test.ts`.

A real `satyr-maid.shift` must preserve through two existing `parseSave` round-trips:
- stage `known-face`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- exact current `lastAction` source text + presentation identity.

No new progression or Save state.

## C1D-53 — Undead Farm Save/reload regression

The same test requires a real `undead-farm.shift` to preserve:
- stage `reliable-helper`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- exact current `lastAction`.

It also asserts no research/specimen/successor/external career fact is introduced.

## C1D-54 — starter-career localized-result persistence

Added `tests/starter-career-localized-result-persistence.test.ts`.

Current merged generic action-scene localization is verified after Save parse/reload for:
- Lumber;
- Satyr Maid;
- Undead Farm.

Current behavior:
- Satyr Maid and Undead Farm use merged RU/EN scene localization;
- Lumber has no root `action.lumber.shift.scene.*` text and intentionally uses source-text fallback;
- RU/EN locale switching must not mutate the serialized Save.

No Lumber content is authored.

## C1D-55 — School exact-course reactive-routing audit

Current main already exposes a safe exact-course presentation identity:
- each paid School lesson persists the exact current `SchoolCourse.presentationId` in existing `lastAction.presentationId`;
- UI recovers the unique exact course from `SCHOOL_COURSES`;
- `schoolTeacherReactionBinding(course.id)` maps that course to an authored teacher-content identity and body localization key.

Boundary:
- exact course identity is available through an existing persisted field;
- teacher identity is a static presentation mapping, not new Save/relationship state;
- no milestone, certificate, threshold, career fact or publisher is implied.

Added `tests/school-reactive-current-main.test.ts` for exact-course persistence and binding coverage.

## C1D-56 — minimal School reactive consumer

Disposition: CURRENT-MAIN CONSUMER ALREADY PRESENT.

Current main already renders `schoolReactiveBody(course)` on School results and has the eight current course -> teacher/body bindings from merged School work.

Regression proves:
- all eight exact current course IDs are mapped;
- the mapping is bilingual;
- a real Rhetoric & Social lesson preserves its exact course identity through Save/reload and renders Cassian Reed's authored body in RU/EN;
- locale switching does not mutate Save.

No School mechanics, thresholds, relationship state, Save fields or producer facts are added.

Any later School candidate not yet QA-accepted/merged at final freeze is not consumed.

## C1D-57 — Forest depth selective consumer

Authoritative content source:
- merged PR #114;
- worker exact head `14340901251400d5061cbf7e7cdd5304ec40a554`;
- C4-81 PASS-WITH-NOTES.

Selected only content that can flow through existing runtime identities without new Activity state:
- all 12 Logging Road / Old Boundary v2 route strings;
- exactly 6 terminal `result_event` strings for existing success / escape / failure result events.

Runtime/UI consumer:
- `src/ui/forestDepth.ts` selects route depth by existing `routeId` + calendar season + existing Activity `internalState.steps`;
- repeated same-season route variants rotate deterministically by existing step count;
- terminal result text rotates by existing result-event history count;
- `src/ui/app.ts` preserves current route/result prose as fallback.

Explicitly not consumed:
- `activity_return` variants because no separate persisted post-Activity return presentation boundary exists;
- success `lumber_continuation` variants because C1D-57 is route/result consumption and does not create another continuation selector.

Promoted root localization: 18 RU/EN pairs.

No Activity route/result/event ID, mechanics, condition, effect, reward, world fact, career fact, Save field, RNG state or media identity changes.

## C1D-58 — ordinary-poverty depth selective consumer

Authoritative content source:
- merged PR #114 / C4-81 PASS-WITH-NOTES.

Selected:
- 8 `ordinary-poverty.housing-depth.v2` event/variant strings;
- 6 `ordinary-poverty.contact-recovery-depth.v2` event/variant strings.

Those 14 keys are appended to the existing `povertyDepthLookupEntries` identities and keep the existing deterministic event-history-count rotation.

Explicitly not consumed:
- all 6 `ordinary-poverty.small-job-depth.v2` strings.

Reason:
- those strings are authored for exact event + variant + choice;
- persisted `lastAction.outcomeRef` stores event + choice, but not the exact selected variant;
- two variants share the same `take-small-task` choice;
- using only event+choice would collapse distinct authored contexts.

Regression requires the small-job v2 keys to remain fixture-local and outside the current event/variant selector.

Secret Debt remains separate. No debt/lender/hidden-career mechanics or Product values are introduced.

## C1D-59 — cross-domain integration regression

Added `tests/cross-domain-integration-v6.test.ts`.

One Save verifies:
- starter three careers available; seven late careers with empty authored conditions remain unavailable;
- real Rhetoric & Social lesson uses the exact School course/teacher presentation bridge;
- natural School lesson still does **not** publish `lumber.school.management-ready`;
- Save reload preserves School progress;
- real Forest Logging Road path consumes current route depth through existing route/season/step state;
- Forest success keeps the existing success world fact and Lumber return continuation;
- current success result-event depth identity is available;
- ordinary-poverty packs remain independent from Secret Debt and write no generic debt;
- current poverty v2 depth is reachable only through existing event/variant identities;
- final Save reload preserves School/career/world-fact state.

## C1D-60 — candidate gate

Intended current-main candidate diff:
- this handoff;
- 3 focused starter/School persistence regressions;
- `src/ui/forestDepth.ts`;
- Forest route/result UI wiring;
- 18 selected Forest v2 RU/EN strings;
- 14 selected ordinary-poverty v2 RU/EN strings;
- append-only poverty selector additions;
- focused Forest/Poverty parity/consumer regressions;
- one cross-domain integration regression.

Explicit non-goals:
- no career threshold values;
- no new career stages/transitions;
- no School producer/public fact;
- no Secret Debt mechanics;
- no new relationship state;
- no Save/RNG/NightFlow/ending-framework changes;
- no media ownership changes.

C1D-60 is complete only after:
1. final current-main recheck;
2. focused PR against then-current main;
3. exact-head full `mindy-successor check` success;
4. one frozen exact head marked ready for QA.
