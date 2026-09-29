# Chat 1 Developer Queue v2

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12
Primary target: playable Lumber vertical slice

Resume source, do not restart:
- draft branch `chat1/lumber-vertical-slice`;
- merged Lead baseline PR #68;
- existing Lumber production/cross/night packs on current main.

Locked facts:
- Hard Work remains `completed_shifts >= 50`;
- exact intermediate Lumber shift thresholds are OPEN unless a later current decision locks them;
- use existing career/relationship/event/ending systems only.

## Queue

### C1D-01 — Exact-current Lumber integration inventory
Compare current main, merged PR #68 and `chat1/lumber-vertical-slice`. Classify every worker file/idea as reusable, stale, conflicting or blocked. No code invention.

### C1D-02 — Schema-valid selective extraction
Prepare the minimal schema-valid subset of worker Lumber events that can be consumed by current runtime without importing stale/non-Pack files wholesale.

### C1D-03 — Runtime stage identity patch
Add the approved missing Lumber career stage identities required by the current pointer, without inventing numeric gates or rewards.

### C1D-04 — Transition contract patch
Implement only transitions whose conditions are already approved/derivable from current design contracts. For any missing threshold, record one exact design blocker instead of choosing a number.

### C1D-05 — Career persistence regression
Prove Lumber stage/facts/counters survive save/export/import/reload through the existing Save schema.

### C1D-06 — Player-facing career state
Wire existing UI/presentation seams so the player can see current Lumber stage and relevant outcome readiness without a new UI state model.

### C1D-07 — Existing Foreman route integration
Connect existing Foreman relationship state to approved Lumber leadership conditions using current relationship/event machinery only.

### C1D-08 — Hard Work invariant
Add/repair focused regression proving 50 completed Lumber shifts independently enables the existing Hard Work ending and no shorter new milestone silently replaces it.

### C1D-09 — Ending eligibility versus commitment
Prove Lumber ending eligibility does not automatically end the run and acceptance uses the existing ending commitment/result flow.

### C1D-10 — School consumer seam
After Chat 5 provides an approved School milestone handoff, consume it through existing facts/conditions without adding a parallel School or career state layer.

### C1D-11 — Forest consumer seam
After Chat 3 provides approved Forest result hooks, consume them through existing Activity/world/career facts without altering Activity architecture.

### C1D-12 — Playable Lumber candidate
Produce one focused candidate PR proving the full reachable route available with approved decisions: work -> career progression -> external/relationship hook -> eligible ending -> explicit commitment -> persisted result. Report exact head/files/checks.

Dependencies do not authorize scope expansion. If C1D-04 is blocked by an open product value, continue independent regression/UI tasks and report the blocker.
