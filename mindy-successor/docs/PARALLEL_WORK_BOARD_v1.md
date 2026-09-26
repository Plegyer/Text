# Parallel Work Board v2

Status: LIVE COORDINATION BOARD.

Current main baseline:
`d902b943cb7c9608c7f7e5fd4fcc84d6dc75e9ec`.

## Coordination rule — no worker idle

Worker completion does **not** imply waiting for Lead review.

Each worker queue contains at least two independent items. When the current item is green, the worker immediately starts the next item on the same assigned branch unless:
- it would modify a file currently owned by another active worker/Lead; or
- a genuine product decision is missing.

Lead review/merge happens asynchronously. A handoff report is not a work item and must not become a blocking dependency.

If a queued task becomes blocked, the worker moves to the next independent queue item and records the blocker.

## Critical path owned by Chat 1 / Lead

Phase A integrated gate closed on PR #14 with full `npm run check` green (125/125 tests).
Phase B is active. Central presentation PR #15 and School PR #17 are merged. Lumber PR #16 remains under asynchronous review. Workers continue on separate continuation branches.

A1–A6 architecture implementation and integrated migration gate are complete.
Current Lead path:
- finish Lumber Product Slice integration;
- integrate continuation fixtures without stalling workers;
- wire PA00–PA26 against merged product IDs;
- run Product Acceptance gate.

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
Review PR: #16 (`chat3/lumber-live-slice`) — frozen for Lead review.
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
