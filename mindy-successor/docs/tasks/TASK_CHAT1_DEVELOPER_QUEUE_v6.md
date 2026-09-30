# Chat 1 Developer Queue v6

Status: NEXT ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue depth: 12
Begin automatically after C1D-48 is completed/frozen. Start from then-current main, not from an old worker branch.

## Queue

### C1D-49 — Post-v5 current-main consolidation inventory
Inventory exactly what C1D-37..48 actually shipped/merged versus what remains only in worker docs/tests. Do not duplicate already-merged artifacts.

### C1D-50 — Career-unavailable reason contract audit
Audit the shared engine/UI path for unavailable ordinary career actions. Preserve the locked starter-trio rule and identify whether the current UI can explain unavailability without inventing thresholds.

### C1D-51 — Generic late-career unlock-condition regression seam
Add/refresh focused regressions proving authored action conditions can unlock a non-starter career through the existing evaluator, while empty conditions alone do not make a late career available. No production threshold values.

### C1D-52 — Satyr Maid Save/reload regression
Prove current Satyr Maid shift/stage/counter/last-action state survives Save/reload without introducing new progression state.

### C1D-53 — Undead Farm Save/reload regression
Prove current Undead Farm shift/stage/counter/last-action state survives Save/reload without introducing new research/progression state.

### C1D-54 — Starter-career localized result persistence
Verify the current generic localized multi-scene action/result consumer for Lumber, Satyr Maid and Undead Farm remains stable through Save/reload and locale switching.

### C1D-55 — School exact-course reactive-routing audit
Audit whether the existing School runtime safely exposes the exact selected course/teacher identity to presentation/text consumers. Record a concrete gap if it does not; do not infer a milestone or publisher.

### C1D-56 — Minimal School reactive consumer
Only if C1D-55 proves an existing safe exact-course identity is available, wire a minimal generic consumer for already-authored Chat 5 reactive text. Otherwise record BLOCK and continue to C1D-57. No new School mechanics, thresholds or Save fields.

### C1D-57 — Forest depth selective consumer
Consume only QA-accepted/current-main Forest content that can flow through existing route/result identities without new Activity state.

### C1D-58 — Ordinary-poverty depth selective consumer
Consume only QA-accepted/current-main ordinary-poverty text that fits existing event/variant identities. Keep Secret Debt separate.

### C1D-59 — Cross-domain integration regression
Add one focused regression covering starter availability, School consumer invariants, Forest return/content consumption, ordinary-poverty independence and Save/reload stability on one current-main head.

### C1D-60 — Current-main integration candidate
Freeze one focused candidate PR containing only still-needed queue-v6 runtime/UI/integration changes, with exact green repository CI and explicit unresolved product decisions.

Technical evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C1D-60.
