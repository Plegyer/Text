# Chat 4 QA Queue v4

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue depth: 12
Start from current main. C4-01..24 are historical/completed or superseded.

## Queue

### C4-25 — Gate PR #85 current School candidate
Gate PR #85 exact head and repository CI. Current known head `7a709a490edf240b4cae36ad74ff33d240d8b6c3` has failing repository CI. Record exact blocker in Git; do not repair Chat 5 code.

### C4-26 — Re-gate PR #85 after Chat 5 fix
When Chat 5 pushes a new frozen head, repeat exact-head CI/diff/ownership/School-boundary gate from scratch. Accept only a green repository check.

### C4-27 — Gate current Chat 2 candidate PR #79
When Chat 2 marks its C2-12 head ready/frozen, gate exact head, CI, static fallback, accessibility metadata, replacement/editor compatibility and gameplay invariance.

### C4-28 — Gate current Chat 1 consolidation PR #84
Audit the newest frozen C1D consolidation head. Verify selective refresh, no stale wholesale merge, Save/ending invariants and no invented Lumber intermediate thresholds.

### C4-29 — Re-gate Chat 3 PR #82 after repair
Current frozen head is blocked by repository CI. When Chat 3 pushes a repaired frozen head, re-run the full C3-12 gate. Do not accept based on the old semantic audit alone.

### C4-30 — Starter-trio availability audit
Verify the locked rule that only Lumber, Satyr Maid and Undead Farm are available on Day 1. Test both engine command availability and renderer Work panel behavior.

### C4-31 — Late-career start-lock regression
Create QA-only regression evidence proving Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin and Prostitute are not executable on a fresh Day-1 run once the production fix exists. Until then record BLOCK against current main if they remain executable.

### C4-32 — Ordinary-job unlock contract gap audit
Compare `ORDINARY_JOB_UNLOCK_MODEL_v1.md` with current runtime. Identify exactly which approved unlock capabilities are implemented and which are missing. Do not invent stat thresholds.

### C4-33 — Cross-candidate collision gate
Compare current PRs #79, #82, #84 and #85 for overlapping production paths/semantic IDs. Record only real merge/integration collisions.

### C4-34 — School-to-Lumber natural reachability gate
After PR #85 is green and Integration consumes an approved School producer, prove the management-ready path is naturally reachable without test-only fact injection.

### C4-35 — Forest-to-Lumber integrated reachability gate
After Chat 3/Chat 1 integration produces one frozen head, prove Forest success continuation reaches the intended Lumber consequence with save/reload stability.

### C4-36 — Current integrated product gate
On the newest single frozen integrated head, run the current Lumber acceptance gate: starter access, work loop, Foreman, School, Forest, Hard Work 50, ending eligibility/commitment, save/reload, presentation and current known blockers.

All QA evidence stays in Git. Personal chat output uses only:
- `Задание выполнено`
- `Задания выполнены`

Do not implement production fixes unless Leader explicitly assigns a narrow QA-owned fix.
