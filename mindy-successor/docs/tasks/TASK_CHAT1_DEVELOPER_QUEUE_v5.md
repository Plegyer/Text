# Chat 1 Developer Queue v5

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12
Start from current main. C1D-01..36 are historical/completed or candidate history.

## Queue

### C1D-37 — Revalidate PR #97 against current main
Treat PR #97 as the completed C1D-36 starter-trio candidate. Recheck exact head, current-main drift and QA dependency. Do not duplicate or rewrite its accepted scope unless QA finds a concrete blocker.

### C1D-38 — Starter-trio current-main integration prep
Prepare a fresh current-main selective integration plan for PR #97 that preserves merged #84/#85/#89 behavior and does not revive stale worker branches.

### C1D-39 — Satyr Maid content consumer inventory
Map exactly which existing runtime/UI seams can consume Chat 3 Satyr Maid content handoffs without adding new career stages, relationship state or thresholds.

### C1D-40 — Undead Farm content consumer inventory
Map exactly which existing runtime/UI seams can consume Chat 3 Undead Farm content handoffs without adding new research/progression systems.

### C1D-41 — Starter-career content presentation seam
Implement only approved generic/current seams needed to display existing Satyr Maid and Undead Farm content bundles once their QA-accepted candidate is available. Do not invent event IDs.

### C1D-42 — Consume QA-accepted Chat 2 starter/School presentation candidate
After Chat 4 accepts PR #88, selectively integrate only still-needed current presentation/media artifacts onto current main.

### C1D-43 — Consume QA-accepted Chat 2 late-career presentation candidate
After Chat 4 accepts PR #98, selectively integrate only current presentation/media artifacts; no gameplay changes.

### C1D-44 — Consume QA-accepted Chat 5 School depth candidate
After Chat 4 accepts PR #90, consume only approved current School/localization handoff material; do not create producers or thresholds.

### C1D-45 — Consume QA-accepted Chat 5 late-career School candidate
After Chat 4 accepts PR #99, integrate only approved generic/current School text/handoff consumers. Missing producer identities remain gaps.

### C1D-46 — Consume QA-accepted Chat 3 starter-career/poverty candidate
After Chat 4 accepts PR #93, selectively integrate only current content-side material requiring shared runtime/UI consumption.

### C1D-47 — Consume QA-accepted Chat 3 content-depth candidate
After Chat 4 accepts PR #100, selectively integrate only still-needed current content/handoff material.

### C1D-48 — Current-main integration candidate
Create one fresh current-main candidate PR containing only QA-accepted selective integrations plus the approved starter-trio availability contract. Exact-head repository CI must be green before QA handoff.

Technical evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-48.
