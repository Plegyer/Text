# Parallel Work Board v2

Status: LIVE COORDINATION BOARD.

Current main baseline:
`6cd990f45d368291b4a288f9f48c569f6e0b207f`.

## Coordination rule — no worker idle

Worker completion does **not** imply waiting for Lead review.

Each worker queue contains at least two independent items. When the current item is green, the worker immediately starts the next item on the same assigned branch unless:
- it would modify a file currently owned by another active worker/Lead; or
- a genuine product decision is missing.

Lead review/merge happens asynchronously. A handoff report is not a work item and must not become a blocking dependency.

If a queued task becomes blocked, the worker moves to the next independent queue item and records the blocker.

## Critical path owned by Chat 1 / Lead

Phase A integrated gate closed on PR #14 with full `npm run check` green (125/125 tests).
Phase B production activation is merged. Central presentation PR #15, Lumber PR #16, School PR #17, reward-contract PR #18, continuation PR #19 and production-activation PR #20 are all in main. Product Acceptance is now the active Lead gate.

A1–A6 architecture implementation and integrated migration gate are complete.
Current Lead path:
- integrate only current compatible worker QA/contract checkpoints;
- execute PA00–PA26 against shipped production catalog;
- close genuine runtime defects without inventing OPEN authoring;
- run release-candidate regression and post-merge smoke.

Shared-core ownership is now assigned per task, not globally locked by default.

## Active queues

### Chat 2 — Presentation runtime
PR #15 (`chat2/phase-b-central-stage`) — MERGED.
Continuation branch: `chat2/presentation-registry-next`
Task: `docs/tasks/TASK_CHAT2_PRESENTATION_REGISTRY_NEXT_v1.md`
Queue:
1. target semantic presentation registry fixture — completed checkpoint;
2. legacy media -> semantic presentationId migration matrix — completed checkpoint;
3. presentation registry adversarial coverage;
4. portable override-pack contract.
State: ACTIVE / CONTINUOUS.

### Chat 3 — Lumber product slice
PR #16 (`chat3/lumber-live-slice`) — MERGED.
Continuation branch: `chat3/lumber-pa-next`
Task: `docs/tasks/TASK_CHAT3_LUMBER_PA_NEXT_v1.md`
Queue:
1. Lumber/Foreman Night acceptance fixture — completed checkpoint;
2. PA fixture manifest for Lumber IDs/hooks — completed checkpoint;
3. Lumber save/reload checkpoint suite;
4. Lumber negative-path acceptance suite.
State: ACTIVE / CONTINUOUS.

### Chat 4 — QA / architecture gate
Previous post-A6 QA work was integrated through Lead PR #14.
Continuation branch: `chat4/phase-b-pa-audit`
Task: `docs/tasks/TASK_CHAT4_PHASE_B_PA_AUDIT_v1.md`
Queue:
1. Phase B presentation acceptance audit against PR #15;
2. cross-PR Product Acceptance wiring review for PR #16/#17.
State: ACTIVE / CONTINUOUS.

### Chat 5 — School runtime slice
PR #17 (`chat5/school-runtime-slice`) — MERGED.
Continuation branch: `chat5/school-integration-next`
Task: `docs/tasks/TASK_CHAT5_SCHOOL_INTEGRATION_NEXT_v1.md`
Queue:
1. School engine-facing fixture adapter — completed checkpoint;
2. isolated Night study fixture — completed checkpoint;
3. School Product Acceptance manifest;
4. School adversarial transaction suite.
State: ACTIVE / CONTINUOUS.

## Accepted previous worker work

- Phase B central presentation runtime merged via PR #15; merge-ref `npm run check` green 142/142.
- A6 reward-ID contract fix merged via PR #18 so exact semantic `hardWork:<career>` IDs survive RunResult/save validation.
- School runtime slice merged via PR #17; merge-ref `npm run check` green 149/149.

- Chat 2 presentation preparation merged.
- Chat 3 Lumber preparation merged after Lead corrections:
  - Hard Work = exactly 50 shifts;
  - ActivityResult terminology aligned to A5;
  - hardWork:lumber Meta reward aligned to A6.
- Chat 4 pre-A5 audit merged as historical QA evidence.
- Chat 5 School preparation merged.

## Lead integration rule

Do not block worker continuation on integration.

Lead:
1. keeps worker queues populated ahead of time;
2. reviews completed checkpoints independently;
3. checks changed paths and locked decisions;
4. runs/reads validation;
5. merges only green compatible checkpoints;
6. gives corrections without stopping unrelated next work;
7. updates this board when branch ownership changes.

Git state remains authoritative if this board is stale.


## Continuous worker queues — 2026-09-26 18:44 +03:00

The previous continuation queues (items 1–4) are complete. New worker-owned branches are based on current main and contain two queued tasks each so Lead review/integration can proceed asynchronously.

- Chat 2 — `chat2/presentation-product-next`: shipped product presentation coverage; override-pack preflight/adversarial suite.
- Chat 3 — `chat3/lumber-product-next`: Lumber production activation manifest; Forest Activity acceptance-depth suite. Hard Work remains ONLY `completed_shifts >= 50`, rewardId exactly `hardWork:lumber`.
- Chat 4 — `chat4/product-activation-qa-next`: shipped catalog activation audit; PA00–PA26 row-runner readiness artifact.
- Chat 5 — `chat5/school-progression-next`: full School production UI/data manifest; exhaustive School reload matrix.

Lead-owned branch `lead/product-activation-school-lumber` owns shared runtime/schema/build/UI activation work. Worker task packets explicitly forbid touching those shared Lead-owned paths until ownership is released.


## Continuous worker queues — 2026-09-26 20:37 +03:00

The previous product-continuation queues are complete and frozen for Lead review:
- `chat2/presentation-product-next`;
- `chat3/lumber-product-next`;
- `chat4/product-activation-qa-next`;
- `chat5/school-progression-next`.

New worker-owned continuation branches preserve the no-idle rule:

- Chat 2 — `chat2/presentation-boundary-next`
  1. semantic presentationId save-boundary audit;
  2. shipped media/fallback gap matrix.

- Chat 3 — `chat3/lumber-integration-prep-next`
  1. real item-capability integration audit;
  2. Lumber ending independence matrix.
  Locked: Hard Work = ONLY `completed_shifts >= 50`; rewardId exactly `hardWork:lumber`.

- Chat 4 — `chat4/activation-gate-next`
  1. presentation save-schema compatibility audit;
  2. production activation merge gate checklist.
  QA-only; no production runtime/content edits.

- Chat 5 — `chat5/school-activation-prep-next`
  1. School progression ownership contract audit;
  2. complete Night-study choice catalog contract.

Lead shared-runtime activation work remains on `lead/product-activation-school-lumber-v2`. Worker task packets explicitly forbid editing Lead-owned shared runtime/schema/build/UI files.


## Continuous queue policy — 2026-09-26

Worker queues must stay **at least 5–6 independent tasks deep** while Lead review/integration is active.

Rules:
- finishing one item -> commit -> immediately continue to the next item;
- no waiting for Lead review between queue items;
- new continuation branch only when ownership boundaries or integration phase changes;
- Lead review happens asynchronously on completed checkpoints;
- one file = one active owner remains mandatory;
- a worker is considered idle only when its active task file has no uncompleted queue items.

Current active long queues:
- Chat 2: `chat2/presentation-replacement-next` — 6-item presentation replacement/closure/PA queue.
- Chat 3: `chat3/lumber-production-proof-next` — 6-item Lumber production/coexistence/reload/dependency queue.
- Chat 4: `chat4/activation-ci-gate-next` — 6-item QA blocker/CI/dist/save/PA/smoke queue.
- Chat 5: `chat5/school-pa-gate-next` — 6-item School PA/progress/UI/save/public-boundary/reload queue.


## Product Activation merged — PR #20

Main merge: `9b427d75dc22021cd3373aa7dd3521782e54152d`.

Production activation now ships:
- target `lumber.shift`, Lumber career/Foreman/Forest/endings and three approved top-level Lumber event packs;
- typed School-owned progression with `lessons_completed` and `night_study_sessions`;
- first-class `schoolLesson` command and all eight paid courses in UI;
- explicit target NightFlow lodging + voluntary choices;
- Forest Activity UI entry/action surface;
- semantic slash `presentationId` persistence through save/reload;
- School + Activity semantic presentation slots;
- target Work UI uses `lumber.shift` while legacy `lumber` remains runtime/save-compatible.

Locked invariants retained:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- rewardId = exactly `hardWork:lumber`;
- synthetic `school.lumber-management` is not shipped;
- OPEN management/Arcana public-fact thresholds are not invented.

Merge-ref evidence:
- typecheck PASS;
- validate PASS;
- build PASS;
- **187/187 tests PASS**.

## Current continuous worker queues — 12-deep

Workers remain on the same active branches and continue without waiting for Lead review:
- Chat 2: `chat2/presentation-replacement-next`, Queue items 7–12 active after completing 1–6.
- Chat 3: `chat3/lumber-production-proof-next`, Queue items 7–12 active after completing 1–6.
- Chat 4: `chat4/activation-ci-gate-next`, Queue items 7–12 active after progressing through the first activation-gate items.
- Chat 5: `chat5/school-pa-gate-next`, Queue items 7–12 active after completing 1–6.

Long-queue rule supersedes the old two-item guidance: keep at least 6 independent items available ahead of worker progress whenever practical.


## Product Acceptance evidence merged — PR #21

Main merge: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`.

Evidence:
- Product Acceptance harness uses the first-class `schoolLesson` command.
- Shipped-catalog execution covers target Lumber -> career milestone -> professional Foreman, paid School lesson, normal lodging, optional Foreman Night, Forest Activity mechanics with an explicitly labeled capability accelerator, seasonal Lumber variants, endings eligibility/continued play, Hard Work commitment/completion and New Run Meta.
- Merge-ref `npm run check`: typecheck PASS, validate PASS, build PASS, **194/194 tests PASS**.

Gate conclusion:
- production runtime/integration: GREEN;
- full Product Acceptance Slice: PARTIAL / NOT CLOSED.

Genuine remaining authoring/depth blockers:
1. production `old_boundary_token -> enter_old_boundary` acquisition/capability/action-space path;
2. final School management/accounting public result authoring for Lumber continuation;
3. deeper Forest 3-route / 3-challenge-family / season product depth;
4. item-driven Activity action-space behavior.

Hard Work remains fully locked and is not a blocker:
- ONLY `completed_shifts >= 50`;
- exact rewardId `hardWork:lumber`.

## Current worker queue depth — through item 18

- Chat 2: `chat2/presentation-replacement-next`, items 13–18 queued after completion of 1–12.
- Chat 3: `chat3/lumber-production-proof-next`, items 13–18 queued after completion of 1–12.
- Chat 4: `chat4/activation-ci-gate-next`, items 13–18 queued after completion of 1–12.
- Chat 5: `chat5/school-pa-gate-next`, items 13–18 queued after completion of 1–12.

Workers continue sequentially without waiting for Lead review.


## Product Acceptance closure merged — PR #22

Main merge:
`011572ef1335deda5ac33120c3a7ea7f9849dbbf`

Evidence:
- generic inventory-backed item capability runtime shipped;
- capability-aware Activity options/routes shipped;
- legacy active Activity behavioral compatibility preserved;
- Forest logging-road direct path shipped;
- Old Boundary route gated by real `old_boundary_token -> enter_old_boundary`;
- no acquisition or consume policy fabricated;
- merge-ref: typecheck PASS, validate PASS, build PASS, **200/200 tests PASS**.

Remaining authoring/depth blockers:
1. Old Boundary Token acquisition source + retain/consume policy;
2. School management/accounting public result;
3. hunter-trail and full 3-route / 3-challenge / season Forest depth.

## Current worker queues after PR #22

- Chat 2 — `chat2/presentation-replacement-next`: items 1–30 complete; **items 31–36 active**.
- Chat 3 — `chat3/lumber-production-proof-next`: items 1–24 complete; **items 25–30 active**.
- Chat 4 — `chat4/activation-ci-gate-next`: items 1–24 complete; **items 25–30 active**.
- Chat 5 — `chat5/school-pa-gate-next`: items 1–24 complete; **items 25–30 active**.

All workers continue sequentially without waiting for Lead review.


## Release-candidate QA floor merged — PR #23

Main merge:
`e12665ce9063689400d8f39f893378f6f01911f3`

Evidence:
- generic capability QA integrated;
- Activity authored-option reload QA integrated;
- no production runtime/content/UI changes;
- merge-ref: typecheck PASS, validate PASS, build PASS, **208/208 tests PASS**.

Current active queues:
- Chat 2 — `chat2/presentation-replacement-next`: items 31–36 active.
- Chat 3 — `chat3/lumber-production-proof-next`: items 25–30 active.
- Chat 4 — `chat4/activation-ci-gate-next`: items 25–30 active.
- Chat 5 — `chat5/school-pa-gate-next`: items 25–30 active; Git currently confirms item 25 committed and items 26–30 still outstanding.

Do not treat worker verbal completion as authoritative until the expected commits/files are present in Git.


## One-Save RC smoke merged — PR #24

Main merge:
`9aa0eaf964735e82b9b964bbdcaf5362c292868a`

Evidence:
- one persisted Save crosses Lumber -> Foreman -> School -> real School blocking scene -> Night -> Forest -> ending -> New Run;
- only long-threshold accelerator is `completed_shifts=49`;
- 49-not-eligible / real 50th-shift boundary asserted;
- School scene resolution does not duplicate tuition/Energy/typed progress;
- exact `hardWork:lumber` remains exactly once;
- merge-ref: typecheck PASS, validate PASS, build PASS, **209/209 tests PASS**.

Important review note:
- early Chat 4 `PR24_ONE_SAVE_E2E_REVIEW_v1.md` reviewed the old red head before the School-scene fix;
- early Chat 2 `presentation-pr24-one-save-audit.test.ts` also predates the final `base.school -> listen` boundary and should be treated as stale until post-merge reconciliation;
- do not integrate either as final RC evidence without rechecking against merged PR #24.

Workers continue their active long queues in their existing branches.


## Final RC acceptance gate merged — PR #25

Main merge:
`961208ea995ca034e8dfe896337a38828db52415`

Evidence:
- no production runtime/content/UI changes;
- exact Hard Work contract locked;
- item capability + schema4 Activity compatibility locked;
- real School blocking-scene ordering/save/reload locked;
- one-Save RC acceptance path covered;
- merge-ref: typecheck PASS, validate PASS, build PASS, **218/218 tests PASS**.

Technical RC gate is GREEN.

Remaining OPEN work is authoring/content/product-decision work, not a reason to weaken the green runtime contracts.

Current long queues:
- Chat 2 — `chat2/presentation-replacement-next`: items 49–54 active.
- Chat 3 — `chat3/lumber-production-proof-next`: items 37–42 active.
- Chat 4 — `chat4/activation-ci-gate-next`: items 37–42 active.
- Chat 5 — `chat5/school-pa-gate-next`: items 37–42 active.

Important: Chat 4/5 verbal completion reports are not authoritative until their expected post-PR25 files appear in Git.


## RC closeout/hardening merged — PR #26 / #27

Main technical baseline:
`6cd990f45d368291b4a288f9f48c569f6e0b207f`

PR #26:
- docs-only RC closeout and neutral human decision ledger.

PR #27:
- one-Save drift sentinel v2;
- direct schema4 School omission compatibility;
- direct schema4 presentationId omission compatibility;
- no production runtime/content/UI changes;
- merge-ref **221/221 tests PASS**.

Current worker progress:
- Chat 2 — `chat2/presentation-replacement-next`: items 49–51 committed; 52–54 active.
- Chat 3 — `chat3/lumber-production-proof-next`: items 49–54 queued after completing 43–48.
- Chat 4 — `chat4/activation-ci-gate-next`: items 43–48 queued after completing 37–42.
- Chat 5 — `chat5/school-pa-gate-next`: items 37–41 committed; 42 active.

Git remains authoritative over worker verbal reports.


## Lead verification after worker completion reports — 2026-09-27

Git verification was performed against current coordination main head
`c0327f2ec40815dcf2ac3c16089a990a0edb7fb3`
(the technical RC merge floor remains PR #27 / `6cd990f45d368291b4a288f9f48c569f6e0b207f`, 221/221 PASS).

Open PRs at verification time: **0**.

Worker completion reports were checked by the exact files required by each active task packet:

- Chat 2 — VERIFIED COMPLETE for items 49–54 on `chat2/presentation-replacement-next`.
  All 11 expected item-49–54 artifacts are present.
  Lead immediately appended items **55–60** in the same task file/branch.
  Queue-extension commit: `730fbf01a2dda437959a11b9e6b80207f0e22dc9`.

- Chat 3 — NOT VERIFIED COMPLETE for items 49–54 on `chat3/lumber-production-proof-next`.
  None of the 10 expected item-49–54 artifacts are present in the branch at verification time.
  Current queue remains **49–54**; do not advance it from prose report alone.

- Chat 4 — NOT VERIFIED COMPLETE for items 43–48 on `chat4/activation-ci-gate-next`.
  None of the 6 expected item-43–48 artifacts are present in the branch at verification time.
  Current queue remains **43–48**; do not advance it from prose report alone.

- Chat 5 — VERIFIED COMPLETE for items 37–42 on `chat5/school-pa-gate-next`.
  All 11 expected item-37–42 artifacts are present.
  Lead immediately appended items **43–48** in the same task file/branch.
  Queue-extension commit: `febba14f2b5d7be853c2ecfeb8ae3633d9bc514b`.

Current no-idle state:
- Chat 2: items 55–60 active/queued;
- Chat 3: items 49–54 still active/required;
- Chat 4: items 43–48 still active/required;
- Chat 5: items 43–48 active/queued.

Locked invariants remain unchanged:
- Lumber Hard Work eligibility = ONLY `completed_shifts >= 50`;
- exact reward = `hardWork:lumber`;
- Forest continuation boundary = exact `activityResult`;
- technical RC remains GREEN;
- unresolved work remains Product/human authoring decisions, Forest/School content depth, and optional presentation/art polish.


## Superseding worker verification and next production queues — 2026-09-27

This section supersedes the earlier temporary verification note that Chat 3/4 completion was not yet visible. A later Git recheck confirmed all four workers completed their then-current queues.

Verified completed checkpoints:
- Chat 2: items 55–60 complete on `chat2/presentation-replacement-next` (9/9 expected artifacts present).
- Chat 3: items 49–54 complete on `chat3/lumber-production-proof-next` (10/10 expected artifacts present).
- Chat 4: items 43–48 complete on `chat4/activation-ci-gate-next` (6/6 expected artifacts present).
- Chat 5: items 43–48 complete on `chat5/school-pa-gate-next` (9/9 expected artifacts present).

Lead immediately extended every current branch by six independent tasks:

- Chat 2 — items **61–66**, queue-extension commit `bfa4e5b8b0e27b4147e6380e1e094fe9d2cdcf0c`.
  Focus: full-roster GIF coverage, poverty/Secret Debt presentation flow, GIF reuse taxonomy, full-game presentationId authoring template, production dependency matrix, presentation continuity pack.

- Chat 3 — items **55–60**, queue-extension commit `a67aca7e32f7d9193cb4671c851445d9b5dc8655`.
  Focus: ordinary poverty readiness, Secret Debt/Slave state-machine authoring, cross-system dependencies, three-outcome acceptance skeleton, Forest/poverty coexistence, poverty production handoff.

- Chat 4 — items **49–54**, queue-extension commit `d139b3b88563f88e08dcd936d684a87a5f132c30`.
  Focus: full product-scope preservation, starter trio readiness, remaining-seven careers readiness, poverty/Secret Debt QA, GIF-first full-game QA guardrails, next-phase QA handoff.

- Chat 5 — items **49–54**, queue-extension commit `d6b407608d2a347ab9fee99a52fe6ac1a30891ba`.
  Focus: eight-track teacher authoring matrix, milestone-type packet, generic School public-result publication contract, reusable School content-production unit, School-to-career integration inventory, School continuity pack.

Current coordination intent is no longer to generate repetitive RC closeout paperwork. Technical RC remains GREEN at the PR #27 floor (221/221). Worker effort is moving into full-game production-authoring readiness while preserving all green contracts.

Full product scope that must remain visible in coordination:
- 10 ordinary careers;
- Palace hidden/meta career with 10/10 ordinary Hard Work prerequisite;
- ordinary poverty/housing ladder;
- separate Secret Debt/Slave hidden career, excluded from Palace prerequisite;
- School;
- typed relationships;
- Night;
- item/capability system;
- expedition/Forest Activity;
- endings and Meta;
- GIF-first central presentation using stable semantic `presentationId` with static/text fallback.

Locked Lumber invariants remain unchanged:
- Hard Work eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- Forest continuation through exact `activityResult`.

One file = one active owner remains mandatory. Lead continues integration/review asynchronously while workers execute their queues.


## Queue depth raised to nine — 2026-09-27

User-directed coordination rule:
**keep 9 independent tasks queued/outstanding per worker whenever practical** so workers are less likely to idle while Lead reviews or integrates.

Latest Git recheck after the previous completed checkpoints:
- Chat 2 current production queue items 61–66: no expected output artifacts committed yet at recheck time.
- Chat 3 current production queue items 55–60: no expected output artifacts committed yet at recheck time.
- Chat 4 current production queue items 49–54: no expected output artifacts committed yet at recheck time.
- Chat 5 current production queue items 49–54: no expected output artifacts committed yet at recheck time.

These are newly assigned queues, not regressions of the previously verified completion.

Lead topped each current branch from six to nine tasks:

- Chat 2 — `chat2/presentation-replacement-next`: active/outstanding **61–69**.
  Queue-top-up commit: `59b9c9053482d4fb5e46ddf8957f41d60f239f1a`.
  Added: full-game GIF batching plan, presentation namespace collision audit, batch asset operator checklist.

- Chat 3 — `chat3/lumber-production-proof-next`: active/outstanding **55–63**.
  Queue-top-up commit: `8420cb9f4f1909a4e7d84d95ec002ad7a6a6bc75`.
  Added: ordinary street-event authoring template, Secret Debt career content-depth matrix, poverty implementation-package boundary.

- Chat 4 — `chat4/activation-ci-gate-next`: active/outstanding **49–57**.
  Queue-top-up commit: `4dd8042590390a61a75ea0252aabf1b9f33703e1`.
  Added: reusable full-game production package gate, product-scope omission sentinel matrix, content-authoring acceptance framework.

- Chat 5 — `chat5/school-pa-gate-next`: active/outstanding **49–57**.
  Queue-top-up commit: `8045b9e49fb92e62c994eb4aa25aa27cfee8053e`.
  Added: School teacher/lesson variant template, career-hook validation checklist, School implementation-package boundary.

Lead review/integration continues asynchronously. One file = one active owner remains mandatory.


## Production-authority integration merged — PR #28

Merged PR #28:
`fb866bc95c3b4998693c48b66a21b8a3f8d900f8`

PR #28 is docs-only and integrates current verified post-RC subsystem authorities from worker branches into main:
- Presentation content-depth handoff v6;
- Presentation human asset decision packet;
- Lumber final Product handoff v7;
- Forest authoring-ready completeness v2;
- QA closeout pack v4;
- School Product-authoring handoff v6;
- School management-result decision schema;
- School Arcana/Forest decision schema;
- authority-index links.

No production runtime/content/UI changed. Technical RC remains the PR #27 floor: **221/221 PASS**.

### Worker progress after nine-deep policy

Git verification confirms the first item in each newly assigned production queue is complete:
- Chat 2 item 61 — 2/2 expected artifacts present.
- Chat 3 item 55 — 2/2 expected artifacts present.
- Chat 4 item 49 — 1/1 expected artifact present.
- Chat 5 item 49 — 2/2 expected artifacts present.

Lead immediately topped every queue back to nine outstanding tasks:
- Chat 2: **62–70**, top-up commit `ad33aa2ca5eaf844eb8abe1a0a9de5eedda56536`.
- Chat 3: **56–64**, top-up commit `b35ded8d812ed0a744344d0bbe2e964f1d7a6ed6`.
- Chat 4: **50–58**, top-up commit `1c1fcaf99600f8a60dfd6fdad39822643b9e855f`.
- Chat 5: **50–58**, top-up commit `1cca3df8e376af8cd6319ab5c38e27ea3147feb9`.

Queue depth target remains nine. Lead review/integration continues asynchronously.


## Full-game production wave 1 merged — PR #30

Merged PR #30:
`dbe78efdb9cd5ed384b66f7536bb5145702779c7`

Docs-only integration of the first completed post-RC full-game production-authoring wave:
- Presentation full-roster GIF coverage + production continuity;
- ordinary poverty implementation readiness + poverty/Secret Debt production handoff;
- full-product scope preservation + next-phase QA handoff;
- eight-track School teacher authoring matrix + School production continuity.

No production runtime/content/UI changed. Technical RC remains PR #27 / **221/221 PASS**.

Lead PR #29 remains OPEN:
- test-only poverty anti-softlock production contract;
- mergeable;
- no automated workflow run available through the connected GitHub integration;
- awaiting independent Chat 4 review task before merge.

### Current nine-deep queues after further verified progress

Verified complete after wave-1:
- Chat 2 item 67;
- Chat 3 item 61;
- Chat 4 item 55;
- Chat 5 item 55.

Lead replenished queues back to nine:
- Chat 2: **68–76** on `chat2/presentation-replacement-next`.
- Chat 3: **62–70** on `chat3/lumber-production-proof-next`.
- Chat 4: **56–64** on `chat4/activation-ci-gate-next`.
- Chat 5: **56–64** on `chat5/school-pa-gate-next`.

One file = one active owner. Full-game scope remains mandatory; Lumber is a reference slice, not the whole product.
