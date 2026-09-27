# Release Candidate Closeout Status v1

Date: 2026-09-27
Branch: `lead/release-candidate-closeout-v1`

## Executive status

Technical release-candidate status: **GREEN**.

Full authored Product Acceptance status: **PARTIAL / NOT CLOSED**.

The remaining gap is no longer architecture/runtime integration. It is concentrated in explicit Product decisions and authored content depth.

## Green evidence chain

Merged milestones:

- PR #20 production activation — **187/187 PASS**
- PR #21 Product Acceptance evidence — **194/194 PASS**
- PR #22 item capability / Forest route closure — **200/200 PASS**
- PR #23 RC capability QA floor — **208/208 PASS**
- PR #24 one-Save shipped E2E — **209/209 PASS**
- PR #25 final minimal RC acceptance gate — **218/218 PASS**

PR #25 also passed:
- typecheck;
- validate;
- build.

PR #25 changed QA/fixture files only; no production runtime/content/UI changed.

## Already green

### Architecture/save
- A1–A6 migration gate closed.
- schema-4 save/load active.
- pre-option Activity saves preserve legacy `advance/escape`.
- pending scenes, NightFlow, Activity, ending commit/completion and RunResult are reload-safe on the exercised RC surface.

### Lumber
- target `lumber.shift` shipped.
- typed career progression shipped.
- professional Foreman route shipped.
- Forest logging-road shipped.
- exact Forest continuation:
  `activityResult(lumber.forest, success, lumber.forest.success)`.
- Hard Work:
  - ending `ending.lumber.hard-work`;
  - ONLY `completed_shifts >= 50`;
  - exact reward `hardWork:lumber`.
- 49 is not eligible; one real 50th shift creates eligibility.
- Meta applies exactly once and survives New Run reload.

### Generic item capability / Activity
- production item/capability identities exist.
- capability derives from actual inventory.
- worldFact alone is not item ownership.
- multiple items may provide one capability.
- capability-gated Activity options/routes persist through reload.
- old active Activity saves remain behaviorally compatible.

### School
- eight paid courses shipped.
- first-class `schoolLesson`.
- locked tuition/stat packages.
- one current-day Energy per paid lesson.
- typed `lessons_completed`.
- separate `night_study_sessions`.
- real `base.school -> listen` blocking boundary before NightFlow.
- resolving that scene does not repeat tuition, Energy or typed progress.

### Night
- explicit `endDay`.
- normal lodging exactly once.
- optional professional Foreman Night.
- day advances exactly once.

### Presentation
- one central media stage.
- stable semantic `presentationId`.
- static/text fallback safe.
- mechanics independent from GIF/frame/timing.
- current RC-blocking presentation assets: **0**.

## Still requires human/Product decisions

See:
`docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`

Decision families:
1. Old Boundary Token acquisition source and timing.
2. Token retained vs consumed/turn-in.
3. Token repeatability/permanent-access behavior.
4. Hunter-trail unlock/clue/capability identity.
5. School management/accounting provider + threshold/milestone.
6. School Arcana/Forest provider + threshold/milestone if retained in scope.
7. Final Forest three-route / three-challenge / seasonal content depth.

## Product Acceptance interpretation

Do not call these full passes until authored:
- PA07/PA08 School public result.
- PA09 natural Old Boundary Token acquisition.
- PA16 full Forest depth.
- PA17 ordered item-dependent route reachability where acquisition policy matters.

Runtime support alone is not authored product reachability.

## No-false-green rules

Never count as full Product Acceptance:
- seeded `old_boundary_token`;
- direct capability setup;
- direct School public-fact injection;
- synthetic `school.lumber-management`;
- direct Forest success fact;
- arbitrary QA-selected School threshold;
- invented Hunter clue/capability ID.

The only accepted long-threshold accelerator in merged RC evidence is:
`completed_shifts=49` immediately before a real 50th shift.

## Safe work while decisions remain open

Safe:
- compatibility QA;
- state-drift sentinels;
- presentation fallback/asset polish;
- decision packets;
- content skeletons that do not select unresolved IDs/thresholds;
- index/handoff maintenance.

Do not:
- alter Hard Work;
- invent School thresholds;
- invent token source/consume policy;
- invent Hunter unlock identity;
- reopen green runtime architecture without a demonstrated missing primitive.
