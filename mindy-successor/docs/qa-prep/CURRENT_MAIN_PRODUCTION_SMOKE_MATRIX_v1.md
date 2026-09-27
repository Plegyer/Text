# Current Main Production Smoke Matrix v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Baseline: current main f3f062152752474f3021736772ada26c66635e10
Observed full suite: 286/286 PASS

## Purpose

Map representative current-main executable evidence to major shipped production paths and identify where only isolated/subsystem evidence exists instead of one natural-path smoke.

## Status vocabulary

- NATURAL_SMOKE_GREEN
- NATURAL_ENGINE_PATH_GREEN
- ACCELERATOR_BOUNDARY_GREEN
- ISOLATED_EVIDENCE_ONLY
- SMOKE_GAP

## 1. Lumber target shift

Evidence:
release-candidate-shipped-e2e.test.ts

Path:
started run
-> lumber.shift
-> first reactive career milestone
-> Foreman notice
-> professional route

The action is a real production action and no career-progress injection is used for the first shift.

Status:
NATURAL_SMOKE_GREEN.

## 2. Satyr Maid target shift

Evidence:
starter-trio-target-careers.test.ts

Path:
started run
-> satyr-maid.shift
-> typed completed_shifts
-> first-shift stage/fact
-> save/reload

Status:
NATURAL_ENGINE_PATH_GREEN.

## 3. Undead Farm target shift

Evidence:
starter-trio-target-careers.test.ts

Path:
started run
-> undead-farm.shift
-> typed completed_shifts
-> first-shift stage/fact
-> save/reload

Status:
NATURAL_ENGINE_PATH_GREEN.

## 4. Remaining seven target shifts

Evidence:
remaining-seven-base-careers.test.ts

Covers:
- tavern.shift
- hunter.shift
- guard.shift
- merchant.shift
- artist-geisha.shift
- assassin.shift
- prostitute.shift

For each:
started run
-> real target shift
-> typed completed_shifts = 1
-> initial typed stage retained
-> save/reload

Status:
NATURAL_ENGINE_PATH_GREEN.

## Ten-career aggregate

All ten ordinary career target shifts have executable engine-level natural-path evidence.

Remaining gap:
there is no single product-UI smoke that clicks through every career surface.

This is not a base-layer engine blocker, but it is useful future UI acceptance coverage.

## 5. Ordinary poverty

Evidence:
poverty-production-integration-bundle.test.ts
plus the focused street/cheap/recovery/pressure tests.

Representative path:
zero-money valid run
-> endDay
-> lodging.street
-> naturally selected ordinary-poverty event
-> worst safe resolution
-> Night sleep
-> next day
-> lumber.shift

The integration bundle also:
- uses full production pack inclusion manifest;
- persists pending event identity across reload;
- verifies cheap/street coexistence;
- verifies Secret Debt is not proposed.

Status:
NATURAL_SMOKE_GREEN.

## 6. Paid School lesson base mechanic

Evidence:
release-candidate-shipped-e2e.test.ts
product-acceptance-shipped-v1.test.ts
school-blocking-scene-compat.test.ts

Representative real path:
started run
-> schoolLesson school.course.arcana
-> tuition/Energy/progress transaction
-> base.school blocking scene
-> resolve
-> no duplicate School progress

Status:
NATURAL_SMOKE_GREEN for the paid School mechanic.

## 7. Paid School lesson + new authored safe follow-up

PR38 now ships:
- school-lesson-content-v1.after-school
- school-life-content-v1.after-paid-lesson

Current evidence:
school-life-content-reload.test.ts manually feeds:
actionCompleted: school
into Resolver and proves:
- materialized authored content;
- reload stability;
- effect-free resolution.

school-lesson-content-v1.test.ts proves the generic root production hook exists and media resolves.

Gap:
no current test was found that starts with a real production schoolLesson command against the full current catalog, resolves the existing blocking School scene, then explicitly opens/resolves the newly authored generic follow-up offer in one chain.

Status:
SMOKE_GAP for combined paid-lesson -> authored-follow-up natural path.

The mechanics themselves are separately green.

## 8. Night study base mechanic

Evidence:
school-night-study-adapter.test.ts

Executable path:
endDay
-> choose lodging
-> choose School Night-study choice
-> night_study_sessions +1
-> save/reload
-> next-day penalty exactly once.

This test uses a focused School Night-study fixture/catalog rather than the full current production catalog.

Status:
NATURAL_ENGINE_PATH_GREEN for the Night-study mechanic.

## 9. Night study + authored PR38 follow-up

PR38 root production event:
school-life-content-v1.after-night-study

uses exact existing nightChoiceCompleted IDs for the current School Night-study choices.

Current evidence:
school-life-content-reload.test.ts feeds one exact Night-study completion trigger and proves the authored presentation is effect-free.

Gap:
no current full-catalog smoke was found that executes:
endDay
-> production lodging
-> production school.night_study.*
-> naturally receives authored after-night-study content
-> resolves it
-> advances/reloads without duplicate mechanics.

Status:
SMOKE_GAP for full production Night-study -> authored-follow-up path.

## 10. Forest Activity

Evidence:
release-candidate-shipped-e2e.test.ts
product-acceptance-shipped-v1.test.ts

Natural path:
enterActivity lumber.forest
-> logging-road available without item accelerator
-> choose logging-road
-> advance
-> advance
-> Activity resolves success

No Old Boundary Token injection is required for this representative route.

Status:
NATURAL_SMOKE_GREEN.

## 11. Lumber continuation after Forest

Evidence:
release-candidate-shipped-e2e.test.ts
product-acceptance-shipped-v1.test.ts

Exact boundary:
activityResult(
  lumber.forest,
  success,
  lumber.forest.success
)

Then:
-> lumber-cross.activity-forest-return
-> choice continue
-> Lumber facts forest-truth-known and forest-problem-resolved.

Status:
NATURAL_SMOKE_GREEN.

## 12. Ending / Meta transaction

Evidence:
release-candidate-shipped-e2e.test.ts
product-acceptance-shipped-v1.test.ts
ending-meta.test.ts

Production Lumber boundary:
- setup accelerator sets completed_shifts = 49;
- one real lumber.shift performs the authoritative 50th transition;
- ending becomes eligible;
- commitEnding;
- completeEnding;
- hardWork:lumber applied once;
- reload/retry cannot duplicate;
- newLife preserves Meta.

Status:
ACCELERATOR_BOUNDARY_GREEN.

The 49-shift setup is explicitly a long-threshold accelerator.

It does not inject ending eligibility or Meta reward.

No full no-injection 50-shift smoke is currently necessary to prove the exact threshold transaction, but such a long-run test may be added if release policy later requires it.

## 13. Generic ending/Palace Meta mechanics

Evidence:
ending-meta.test.ts

The generic suite proves:
- eligibility != commit != completion;
- Meta reward exactly once;
- reload idempotency;
- same Hard Work reward does not reapply uniquely;
- New Life preserves Meta;
- all ten synthetic ordinary Hard Work completions unlock Palace predicate.

This is generic runtime evidence, not natural authored 10-career product reachability.

Status:
ISOLATED_EVIDENCE_ONLY for full natural Palace unlock.

## Current matrix

| Surface | Evidence status |
|---|---|
| Lumber shift | NATURAL_SMOKE_GREEN |
| Satyr Maid shift | NATURAL_ENGINE_PATH_GREEN |
| Undead Farm shift | NATURAL_ENGINE_PATH_GREEN |
| seven remaining career shifts | NATURAL_ENGINE_PATH_GREEN |
| ordinary poverty | NATURAL_SMOKE_GREEN |
| paid School mechanic | NATURAL_SMOKE_GREEN |
| paid School -> new authored follow-up | SMOKE_GAP |
| Night-study mechanic | NATURAL_ENGINE_PATH_GREEN |
| production Night study -> authored follow-up | SMOKE_GAP |
| Forest logging-road Activity | NATURAL_SMOKE_GREEN |
| Lumber Forest continuation | NATURAL_SMOKE_GREEN |
| Lumber Hard Work ending/Meta | ACCELERATOR_BOUNDARY_GREEN |
| natural authored 10-career Palace unlock | ISOLATED_EVIDENCE_ONLY |

## Highest-value future smoke additions

Without changing production mechanics, future QA should add:

1. full current-catalog paid School lesson
   -> existing blocking scene
   -> authored PR38 safe follow-up
   -> reload;

2. full current-catalog NightFlow
   -> production School Night-study choice
   -> authored after-night-study follow-up
   -> next day/reload;

3. optional UI-level discovery/execution smoke across all ten base career shifts.

These close integration-observation gaps rather than runtime gaps.

## Locked firewalls

All smoke additions must preserve:
- Lumber Hard Work exactly 50 completed shifts;
- hardWork:lumber;
- School paid vs Night counter separation;
- no teacher prerequisite;
- Forest exact ActivityResult continuation;
- ordinary poverty independent from Secret Debt;
- presentation effects remain effect-free.

No production runtime/UI/content file was modified by Chat 4.
