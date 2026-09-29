# Chat 4 QA Queue v3

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue depth: 12
Start from current main. C4-01..12 are historical completed work.

## Queue

### C4-13 — Current-main coordination gate
Verify current main after merged PR #70 and PR #78. Confirm worker pointers/protocols are valid and no runtime files changed unexpectedly.

### C4-14 — Re-gate PR #71 disposition
Check whether C1D-01 inventory PR #71 is still useful against current main and record KEEP / SUPERSEDED / BLOCKED in Git. Do not modify production.

### C4-15 — Re-gate PR #73
Verify the Lumber persistence regression remains applicable to current main. Record exact-head/current-main drift and whether selective refresh is safe.

### C4-16 — Re-gate PR #74
Verify the Hard Work 50 regression remains applicable to current main and no later change weakened the invariant.

### C4-17 — Re-gate PR #75
Verify the ending eligibility/commitment regression remains applicable to current main.

### C4-18 — Re-gate PR #76
Audit the Lumber career UI candidate against current main, including localization, state invariance and ownership boundaries.

### C4-19 — Re-gate PR #77
Audit the Foreman leadership integration regression against current main and ensure it is not being misused as proof of natural School reachability.

### C4-20 — Gate current Chat 2 presentation candidate
Gate the current Chat 2 presentation/media candidate (currently PR #79, or its later replacement if Chat 2 freezes a newer C2-12 head). Verify exact head, CI, changed assets/slots, static fallback, accessibility metadata, editor/replacement compatibility and no gameplay drift. Use PR #72 only as historical C2-01 inventory context, not as the production candidate.

### C4-21 — Gate Chat 3 next candidate
When Chat 3 C3-12 candidate exists, gate its exact frozen head, scope, CI and ownership. If absent, skip to another available item.

### C4-22 — Gate Chat 5 next candidate
When Chat 5 candidate exists, gate School milestone/content handoff and verify it does not invent curriculum/progression mechanics.

### C4-23 — Gate Chat 1 consolidation candidate
When C1D-24 candidate exists, run exact-head diff/CI/reachability/save/presentation checks and record PASS/BLOCK/PASS-WITH-NOTES in Git.

### C4-24 — Lumber product-acceptance re-gate
Re-run the final Lumber product gate on the newest single frozen integrated head. Keep any unresolved intermediate-threshold or School-producer blocker explicit.

All evidence stays in Git. Personal chat uses only the compact completion messages from WORKER_CHAT_RECREATION_PROTOCOL_v1.md.
