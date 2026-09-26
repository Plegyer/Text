# Parallel Work Board v2

Status: LIVE COORDINATION BOARD.

Current main baseline:
`1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`.

## Coordination rule — no worker idle

Worker completion does **not** imply waiting for Lead review.

Each worker queue contains at least two independent items. When the current item is green, the worker immediately starts the next item on the same assigned branch unless:
- it would modify a file currently owned by another active worker/Lead; or
- a genuine product decision is missing.

Lead review/merge happens asynchronously. A handoff report is not a work item and must not become a blocking dependency.

If a queued task becomes blocked, the worker moves to the next independent queue item and records the blocker.

## Critical path owned by Chat 1 / Lead

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
Branch: `chat2/phase-b-central-stage`
Task: `docs/tasks/TASK_CHAT2_PHASE_B_QUEUE_v1.md`
Queue:
1. central GIF stage runtime;
2. presentationId editor replacement workflow.
State: READY / CONTINUOUS.

### Chat 3 — Lumber product slice
Branch: `chat3/lumber-live-slice`
Task: `docs/tasks/TASK_CHAT3_LUMBER_QUEUE_v1.md`
Queue:
1. schema-valid Lumber production fixture;
2. cross-system Lumber acceptance fixture.
State: READY / CONTINUOUS.

### Chat 4 — QA / architecture gate
Branch: `chat4/post-a6-gate`
Task: `docs/tasks/TASK_CHAT4_POST_A6_QUEUE_v1.md`
Queue:
1. post-A6 Architecture Gate audit;
2. executable acceptance-evidence gap tests;
3. Product Acceptance harness skeleton.
State: READY / CONTINUOUS.

### Chat 5 — School runtime slice
Branch: `chat5/school-runtime-slice`
Task: `docs/tasks/TASK_CHAT5_SCHOOL_QUEUE_v1.md`
Queue:
1. executable School catalog module;
2. School transaction fixture;
3. integration-ready handoff.
State: READY / CONTINUOUS.

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
