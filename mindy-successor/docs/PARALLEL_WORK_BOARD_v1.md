# Parallel Work Board v2

Status: LIVE COORDINATION BOARD.

Current main baseline:
`eb726954130c0db5886218d288451900ea1244f4`.

## Coordination rule — no worker idle

Worker completion does **not** imply waiting for Lead review.

Each worker queue contains at least two independent items. When the current item is green, the worker immediately starts the next item on the same assigned branch unless:
- it would modify a file currently owned by another active worker/Lead; or
- a genuine product decision is missing.

Lead review/merge happens asynchronously. A handoff report is not a work item and must not become a blocking dependency.

If a queued task becomes blocked, the worker moves to the next independent queue item and records the blocker.

## Critical path owned by Chat 1 / Lead

Phase A integrated gate closed on PR #14 with full `npm run check` green (125/125 tests).
Phase B is active. Lead reviews PR #15/#16/#17 asynchronously while workers continue on separate continuation branches.


A1–A6 architecture implementation is complete and merged.
Current Lead path:
- integrated Architecture Migration gate;
- accept worker slices asynchronously;
- Phase B integration;
- Lumber Product Slice integration;
- Product Acceptance gate.

Shared-core ownership is now assigned per task, not globally locked by default.

## Active queues

### Chat 2 — Presentation runtime
Review PR: #15 (`chat2/phase-b-central-stage`) — frozen for Lead review.
Continuation branch: `chat2/presentation-registry-next`
Task: `docs/tasks/TASK_CHAT2_PRESENTATION_REGISTRY_NEXT_v1.md`
Queue:
1. target semantic presentation registry fixture;
2. legacy media -> semantic presentationId migration matrix.
State: ACTIVE / CONTINUOUS.

### Chat 3 — Lumber product slice
Review PR: #16 (`chat3/lumber-live-slice`) — frozen for Lead review.
Continuation branch: `chat3/lumber-pa-next`
Task: `docs/tasks/TASK_CHAT3_LUMBER_PA_NEXT_v1.md`
Queue:
1. Lumber/Foreman Night acceptance fixture;
2. PA fixture manifest for Lumber IDs/hooks.
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
Review PR: #17 (`chat5/school-runtime-slice`) — frozen for Lead review.
Continuation branch: `chat5/school-integration-next`
Task: `docs/tasks/TASK_CHAT5_SCHOOL_INTEGRATION_NEXT_v1.md`
Queue:
1. School engine-facing fixture adapter;
2. isolated Night study fixture.
State: ACTIVE / CONTINUOUS.

## Accepted previous worker work

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
