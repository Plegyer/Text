# Chat 4 QA Queue v8

Status: ASSIGNED
Owner: Chat 4 / QA + Product Acceptance Gate
Queue depth: 12

Use this queue when C4-59..65 are dependency-blocked. Do not wait idly if an independent v8 task is available.

## Queue

### C4-66 — Merged queue-v5 provenance audit
Verify current main contains the accepted frozen payloads from PR #106, #109, #108 and #105 exactly where intended, without accidental duplicate or omitted files.

### C4-67 — Current catalog/test baseline snapshot
Record the current-main catalog counts, full-check result and total test pass/fail baseline after the queue-v5 merges. This is QA evidence only.

### C4-68 — Starter-career scene localization gate
Verify Satyr Maid and Undead Farm seasonal scene localization now resolves through the merged generic existing-scene consumer with RU/EN fallback intact.

### C4-69 — Ordinary-poverty selector gate
Verify the merged ordinary-poverty depth selector still preserves exact event/variant/effect identities and deterministic rotation after the queue-v5 merge wave.

### C4-70 — Cross-domain presentation artifact gate
Verify the merged Chat 2 cross-domain manifest/assets/tests remain presentation-only and distinguish prepared overrides from active production bindings.

### C4-71 — School transfer-atlas boundary gate
Verify the merged School transfer atlas remains preparation/mapping only: no threshold, producer fact, runtime selector, curriculum, Save or career state was silently introduced.

### C4-72 — Forest/poverty fixture ownership gate
Verify merged Chat 3 Forest/poverty depth fixtures remain additive content-side artifacts and do not alter Activity, Save, career state, NightFlow, economy or Secret Debt mechanics.

### C4-73 — Ending presentation gap audit
Recheck current main for the documented ending presentation gaps, including guild-life, scholar-life and lumber-stay, and record which are active production gaps versus prepared-only coverage.

### C4-74 — Product-blocker consistency gate
Compare current main against `CURRENT_PRODUCT_DECISION_BLOCKERS.md`. Verify natural School→Lumber publishing and intermediate Lumber progression remain honestly unresolved and no worker candidate silently solved them.

### C4-75 — Starter/late career availability regression audit
Re-run current-main evidence for the starter-trio lock and late-career unavailability contract after all recent merges. Do not select missing late-career thresholds.

### C4-76 — Save/reload regression health audit
Run/review current-main Save/reload regressions covering Lumber, Forest continuation, ending eligibility/commitment and starter-career state after recent merges.

### C4-77 — Queue-v6 readiness matrix
Create one QA readiness matrix for C1D-60, C2-60, C3-60 and C5-60: expected owner, frozen-head requirement, exact acceptance gates, and current dependency status. No implementation.

All evidence stays in Git. Personal chat output only:
- `Задание выполнено`
- `Задания выполнены`

Do not implement production fixes.
