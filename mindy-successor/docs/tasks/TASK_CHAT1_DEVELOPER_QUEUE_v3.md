# Chat 1 Developer Queue v3

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12
Start from current main. Do not restart completed C1D-01..12 work.

## Queue

### C1D-13 — Current-main consolidation inventory
Compare current main with open Chat 1 PRs #71 and #73-#77. Identify exact still-useful diffs and prepare selective current-main consolidation; do not merge stale branches wholesale.

### C1D-14 — Refresh Lumber career UI slice
Reapply the still-valid C1D-06 player-facing Lumber career stage/outcome readiness UI onto current main, preserving existing state and presentation contracts.

### C1D-15 — Refresh Foreman leadership regression
Reapply the still-valid C1D-07 focused Foreman/Lumber integration regression onto current main without changing School authoring or relationship semantics.

### C1D-16 — Refresh Lumber persistence regression
Reapply the C1D-05 persistence regression on current main and confirm existing Save contracts still preserve Lumber stage/facts/counters.

### C1D-17 — Refresh Hard Work invariant regression
Reapply the C1D-08 regression on current main. Hard Work remains exactly 50 completed shifts.

### C1D-18 — Refresh ending commitment regression
Reapply the C1D-09 ending eligibility/commitment regression on current main without changing the ending framework.

### C1D-19 — Integrate approved poverty depth consumer
Consume the already QA-reviewed PR #67 poverty depth lookup/fallback handoff through the existing pending-scene/localization seam. Do not alter poverty mechanics, Save, RNG or NightFlow.

### C1D-20 — Consume Chat 3 Forest candidate
When Chat 3 C3-12 candidate exists, selectively consume only approved Forest/Lumber hooks that require shared runtime/UI integration. If not ready, skip to another task.

### C1D-21 — Consume Chat 5 School candidate
When Chat 5 provides the School milestone handoff/candidate, integrate it through existing world fact/event/career seams. Do not invent course, milestone or threshold values.

### C1D-22 — Current-main combined regression candidate
Create one current-main branch containing only the still-valid refreshed C1D-14..18 changes and any already-approved integration from C1D-19..21. Run the full repository check.

### C1D-23 — One-Save Lumber path regression
On the combined candidate, prove the currently approved Lumber path survives one Save through work, Foreman/Forest hooks, ending eligibility, explicit commitment and reload boundaries. Do not fake missing School or intermediate progression.

### C1D-24 — Integration handoff
Open one focused current-main candidate PR for QA. Put exact scope, files, checks and unresolved design blockers in Git. Do not claim blocked intermediate Lumber thresholds are solved.

Technical details stay in Git. Personal chat uses only the compact completion messages from WORKER_CHAT_RECREATION_PROTOCOL_v1.md.
