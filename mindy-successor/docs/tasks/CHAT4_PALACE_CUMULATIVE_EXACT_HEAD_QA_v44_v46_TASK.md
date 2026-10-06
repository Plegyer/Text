# CHAT 4 — PALACE CUMULATIVE EXACT-HEAD QA v44-v46

Status: **START NOW**
Owner: Chat 4
Branch: `chat4/palace-cumulative-exact-head-qa-v44`

Complete ALL tasks in order. Do not stop after the first deliverable. Stop only for a genuine blocker or ambiguity. No full CI.

Frozen Palace authorities:
- mechanics/narrative v18: `67f948d185883d8e706dad522e5010bff8e2bd48`
- final prose/media v19: `6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`
- D39 live-consumer decision: `mindy-successor/docs/tasks/LEADER1_D39_LIVE_CONSUMER_DECISION_2026-10-06.md`

Important: Chat 3 owns the new D39 live-consumer implementation. Do not wait for that future head and do not implement D39 here. This bundle verifies the already frozen Palace base and prepares collision-safe assembly guidance.

## v44 — exact-head executable gate
Create a QA-only workflow on this branch that checks out frozen Palace v19 exactly and proves the exact SHA guard.

Run:
- npm ci
- npm run typecheck
- npm run validate
- npm run build
- Palace v15/v16/v18/v19 focused suites
- save/reload and ending-commit adjacency needed by those Palace surfaces

Do not mutate v18/v19 producer branches.

## v45 — Palace invariants + adjacency
Verify executable/static invariants:
- D23 invitation authority unchanged;
- exactly 15 structural duties and one duty/day remain intact;
- Prince readiness is all 12 progression stats >=91, Lust excluded;
- confrontation has zero Energy/money cost, is deterministic, retryable, and never auto-commits Return Home;
- successor world remains real and D45 ambiguity is preserved;
- D39 rewards remain rewards only; no new live-consumer semantics are invented here;
- Strong Meta slot/cap rules are unchanged;
- Secret Debt/Night ownership is not mutated by the frozen Palace base;
- RU/EN and Palace presentation mappings remain valid.

Classify any failure as producer defect, stale test, or runner/infrastructure issue. Do not repair production in this lane.

## v46 — collision-safe Chat2 handoff
Create:
`mindy-successor/docs/tasks/CHAT4_PALACE_CUMULATIVE_EXACT_HEAD_QA_v46.md`

Include:
- exact frozen heads tested;
- exact workflow/run evidence;
- focused results;
- any blockers;
- collision-safe selective assembly guidance for shared `definitions.json`, `src/ui/app.ts`, `content/localization.json`, and `content/presentation.json`;
- explicit note that Chat3 D39 implementation must be layered later and independently verified before Palace release acceptance.

No whole-file replacement guidance for shared files.
No full CI.
Do not merge main.

Report:
`BUNDLE_COMPLETE — READY_FOR_CHAT2_PALACE_BASE_ASSEMBLY`.
