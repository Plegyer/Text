# Chat 1 Developer — queue v6 current-main integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-49..C1D-60
Fresh current-main baseline: `eb155400f5bb594da3c1cd6cfdfc03d5a13377ba`
Branch: `chat1/c1d-v6-final-v3-current-main`

This branch is the queue-v6 rebuild from current main after the accepted Chat 2 presentation wave and Chat 3 Forest/poverty v6 wave were merged. Earlier queue-v6 branches are selective source only and must not be merged.

## C1D-49 — post-v5 current-main consolidation inventory

Already merged/current-main before this final rebuild:
- PR #97: starter-trio availability contract;
- PR #106: C1D v5 multi-scene action localization + ordinary-poverty depth consumer;
- PR #105: School whole-career transfer/reactive preparation;
- PR #108: Chat 3 Forest/poverty v5 preparation;
- PR #109: cross-domain presentation preparation;
- PR #114: Chat 3 Forest/poverty v6 preparation; C4-81 PASS-WITH-NOTES;
- PR #116: presentation wave v6; C4-80 PASS; includes a narrow Work-panel locked-career accessibility/help patch;
- PR #118: School reactive v6 preparation; C4-78 PASS-WITH-NOTES; supplies the current QA-accepted exact-course presentation metadata/text consumed selectively by C1D-56.

Current-main facts are never duplicate-copied solely because they appeared in an earlier worker branch.

Still unresolved product/runtime decisions:
- natural School -> Lumber management publisher;
- production late-career unlock thresholds;
- intermediate Lumber progression;
- Secret Debt Product values;
- any new Forest encounter/challenge/state identity.

## C1D-50 — career-unavailable reason contract audit

The original current-main gap was closed by merged Presentation-owned PR #116 before this final candidate rebuild.

Current shared path:
- engine `actionAvailable()` remains the authority for availability;
- starter careers remain `lumber`, `satyr-maid`, `undead-farm`;
- all seven late careers still have `conditions=[]` and remain unavailable;
- Work UI detects `careerLocked = professions.includes(a.id) && !actionAvailable(...)`;
- it shows generic localized `ui.work.lockedCareerHelp` text and accessible `aria-label` / `aria-describedby` / `aria-disabled` metadata;
- no threshold/stat/calendar/year value is claimed.

Existing `work-panel-career-accessibility-v6.test.ts` verifies the visible/accessible reason in RU/EN while starter availability remains unchanged.

Disposition: CURRENT-MAIN NO-OP for Chat 1. Do not duplicate Chat 2 presentation ownership.

## C1D-51 — generic late-career unlock-condition regression seam

Disposition: CURRENT-MAIN NO-OP.

Existing `tests/starter-trio-availability.test.ts` already proves:
- empty conditions alone do not unlock a late ordinary career;
- a test-only authored world-fact condition is evaluated through the shared condition evaluator;
- dispatch stays blocked before the condition and succeeds after it;
- no production threshold is selected.

## C1D-52 — Satyr Maid Save/reload regression

Added `tests/starter-career-save-reload.test.ts`.

A real current `satyr-maid.shift` must preserve through two `parseSave` round-trips:
- stage `known-face`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- exact existing `lastAction` source text + presentation identity.

No new progression or Save state.

## C1D-53 — Undead Farm Save/reload regression

The same test requires a real current `undead-farm.shift` to preserve:
- stage `reliable-helper`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- exact existing `lastAction`.

It additionally asserts no research/specimen/successor/external career fact is introduced.

## C1D-54 — starter-career localized-result persistence

Added `tests/starter-career-localized-result-persistence.test.ts`.

Current merged generic action-scene localization is verified after Save parse/reload for:
- Lumber;
- Satyr Maid;
- Undead Farm.

Current exact behavior:
- Satyr Maid and Undead Farm use merged RU/EN action-scene localization;
- Lumber has no root `action.lumber.shift.scene.*` text and intentionally uses source-text fallback;
- RU/EN locale switching does not mutate the serialized Save.

No Lumber prose is authored.

## C1D-55 — School exact-course reactive-routing audit

Current main exposes a safe exact-course presentation identity:
- a paid School lesson persists the exact current `SchoolCourse.presentationId` in existing `lastAction.presentationId`;
- UI can recover the exact course from the unique current `SCHOOL_COURSES` presentation identity.

The audit also found a concrete gap:
- current main had no `src/ui/schoolReactive.ts` consumer or runtime course -> teacher mapping;
- the latest QA-accepted merged Chat 5 source `school-teacher-response-matrix-v2.fixture.json` contains the exact eight-course -> teacher mapping plus `lesson_success` presentation-only bodies;
- PR #118 exact head `dbec65d3607844342a09a79549c0900860d30198` received C4-78 PASS-WITH-NOTES before merge.

Boundary:
- exact course identity uses an existing persisted field;
- teacher identity is consumed only as a static presentation mapping;
- no milestone, certificate, threshold, career fact, relationship state or publisher is inferred.

Added `tests/school-reactive-current-main.test.ts`.

## C1D-56 — minimal School reactive consumer

Implemented the missing integration-only consumer from the accepted current-main Chat 5 handoff:
- added `src/ui/schoolReactive.ts` with the exact eight course -> teacher/`lesson_success` body mappings from merged PR #118;
- promoted only the eight approved `lesson_success` body keys into root RU/EN localization;
- School result rendering now selects the reaction body by the already-persisted exact `SchoolCourse.presentationId`, with the existing generic lesson-result text as fallback.

Regression proves:
- all eight current course IDs have one exact mapped teacher/body identity;
- all eight consumed body keys are bilingual;
- a real Rhetoric & Social lesson preserves exact course identity through Save/reload;
- the result renders Cassian Reed's accepted body in RU/EN;
- locale switching does not mutate Save.

No School mechanics, thresholds, relationship state, Save fields or producer facts are added.

Later School candidates that are not QA-accepted and merged at final freeze are not consumed.

## C1D-57 — Forest depth selective consumer

Authoritative current-main source:
- merged PR #114;
- exact worker head `14340901251400d5061cbf7e7cdd5304ec40a554`;
- C4-81 PASS-WITH-NOTES.

Selected only content that can flow through existing runtime identities without new Activity state:
- all 12 v2 route strings for existing `logging-road` / `old-boundary`;
- exactly 6 v2 `result_event` strings for existing success / escape / failure events.

Consumer:
- `src/ui/forestDepth.ts` selects route depth by existing route ID + existing calendar season + existing `Activity.internalState.steps`;
- same-season route prose rotates deterministically by that already-persisted step count;
- terminal result prose rotates by existing result-event history count;
- `src/ui/app.ts` retains existing route/result text as fallback.

Not consumed:
- v2 `activity_return` strings because there is no separate persisted post-Activity return presentation boundary;
- v2 success `lumber_continuation` strings because C1D-57 is a route/result consumer and does not create another continuation selector.

Promoted root localization: 18 RU/EN pairs.

No new route/result/event ID, condition, effect, reward, world fact, career fact, Save field, RNG state or media identity.

## C1D-58 — ordinary-poverty depth selective consumer

Authoritative current-main source:
- merged PR #114 / C4-81 PASS-WITH-NOTES.

Selected:
- all 8 `ordinary-poverty.housing-depth.v2` event/variant strings;
- all 6 `ordinary-poverty.contact-recovery-depth.v2` event/variant strings.

Those 14 keys are appended to existing `povertyDepthLookupEntries` pairs and keep the current event-history-count rotation.

Explicitly excluded:
- all 6 `ordinary-poverty.small-job-depth.v2` strings.

Reason:
- small-job prose is authored for exact event + variant + choice;
- persisted `lastAction.outcomeRef` retains event + choice, not exact selected variant;
- two current variants share `take-small-task`;
- using event+choice alone would collapse distinct authored contexts.

Regression requires those 6 keys to remain fixture-local and outside the current event/variant selector.

Secret Debt remains separate; no debt/lender/hidden-career mechanics or Product values are introduced.

## C1D-59 — cross-domain integration regression

Added `tests/cross-domain-integration-v6.test.ts`.

One Save verifies:
- starter three careers remain available;
- seven late careers with empty authored conditions remain unavailable;
- a real Rhetoric & Social School lesson uses the exact course/teacher presentation bridge;
- natural School play still does not publish `lumber.school.management-ready`;
- Save reload preserves School progress;
- a real Forest Logging Road run consumes current v2 route depth through existing route/season/step state;
- Forest success keeps the existing success world fact and Lumber return continuation;
- current result-event depth identity is available;
- ordinary-poverty packs remain independent from Secret Debt and write no generic debt;
- poverty v2 depth is reachable only through existing event/variant identities;
- final Save reload preserves School/career/world-fact state.

## C1D-60 — candidate gate

Candidate production/UI scope:
- `src/ui/forestDepth.ts`;
- narrow Forest route/result text consumer wiring in `src/ui/app.ts`;
- 18 selected Forest v2 RU/EN strings;
- 14 selected ordinary-poverty v2 RU/EN strings;
- append-only poverty selector additions.

Regression scope:
- Satyr Maid / Undead Farm Save-reload;
- starter-career localized-result persistence;
- exact-course School reactive persistence;
- Forest route/result consumer;
- ordinary-poverty selector safety;
- Chat 3 v6 selective-integration parity;
- one cross-domain one-Save regression.

Explicit non-goals:
- no threshold values;
- no new career stages/transitions;
- no School producer/public fact;
- no Secret Debt mechanics;
- no relationship state;
- no Save/RNG/NightFlow/ending-framework changes;
- no media ownership changes.

C1D-60 is complete only after a final current-main recheck, one focused PR, exact-head full repository CI success, and one frozen exact head handed to QA.
