# Chat 3 Forest + Poverty Content Queue v4

Status: ASSIGNED
Owner: Chat 3 / Forest + Poverty Content Bundles Worker
Queue depth: 12
Start from current main. C3-01..24 are historical/completed or candidate history.

## Queue

### C3-25 — Finish PR #93 gate preparation
Wait for exact-head repository CI on PR #93. If it fails, repair only Chat 3-owned content/fixture/test issues. Do not touch shared runtime/UI.

### C3-26 — Re-freeze PR #93
When exact-head CI is green, record the frozen SHA and keep the candidate stable for Chat 4 C4-41.

### C3-27 — Satyr Maid service-depth pass
Prepare additional RU/EN variants for existing service/guest identities without adding mechanics, thresholds or relationship state.

### C3-28 — Satyr Maid boundary/reputation depth
Expand content-side boundary, recognition and reputation variants using only existing identities and explicit content handoff gaps.

### C3-29 — Undead Farm seasonal agriculture depth
Prepare RU/EN seasonal agriculture/work variants for existing Undead Farm identities only.

### C3-30 — Undead Farm research/magic depth
Expand research/magic/result text using current identities; no new research system or progression thresholds.

### C3-31 — Forest encounter identity audit
Audit current Forest/Expedition route/result/event identities after merged #89 and identify content-only gaps. Do not redefine Expedition architecture.

### C3-32 — Forest seasonal/result depth
Prepare additional RU/EN Forest route/result variants against existing Activity/result identities.

### C3-33 — Ordinary poverty seasonal survival depth
Extend street/lodging/small-job/help variants while keeping ordinary poverty independent from Secret Debt.

### C3-34 — Poverty recovery/contact depth
Expand existing recovery/contact content and handoff fixtures without inventing persistent mechanics.

### C3-35 — Secret Debt boundary re-audit
Re-audit current main for collisions with ordinary poverty. Exact probability, amount, delay, penalties and rewards remain OPEN.

### C3-36 — Candidate content handoff
Open one focused frozen candidate PR for C3-27..35 with green repository CI and exact Git handoff.

Technical evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C3-36.
