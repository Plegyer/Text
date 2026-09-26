# Parallel Work Board v2

Status: LIVE COORDINATION BOARD.

Current main baseline:
`e12665ce9063689400d8f39f893378f6f01911f3`.

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
