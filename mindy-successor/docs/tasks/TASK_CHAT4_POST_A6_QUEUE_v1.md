# Chat 4 — Post-A6 QA Queue v1

Base: `1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`
Branch: `chat4/post-a6-gate`

A5 and A6 are now integrated in main. The old audit is historical evidence only.

## No-idle rule

Do not wait after the audit. Continue directly into executable gap coverage.

## Queue Item 1 — Post-A6 Architecture Gate audit

Re-audit `ARCHITECTURE_MIGRATION_SLICE_v1.md` against current main.

Deliver:
- `docs/qa-prep/ARCHITECTURE_GATE_AUDIT_POST_A6_v1.md`

Mark each gate row VERIFIED / FAILED / NOT_COVERED with concrete test/source evidence.
A5 and A6 must now be judged from current implementation, not the old A4 baseline.

## Queue Item 2 — Close acceptance-evidence gaps with tests

Allowed writes:
- new QA test files only under `prior-work/astra/prototype-m3.2/tests/`
- QA docs under `docs/qa-prep/`

Do not modify core/runtime to make tests pass.

Prioritize:
- full terminal/forced/critical/optional priority matrix;
- least-recently-shown tie-break;
- arbitrary-path/unknown effect rejection if schema supports direct proof;
- orphan/unreachable stage validation if loader claims it;
- A5 save/reload/result exact-once adversarial cases not already covered;
- A6 commit/completion/reward reload boundaries not already covered;
- Work cost/wage exactly-once save/reload evidence.

If a new test exposes a real implementation bug, leave the failing test isolated/documented and continue other independent cases.

## Queue Item 3 — Product Acceptance harness skeleton

If Items 1–2 are complete, continue without waiting:
- create a table-driven executable skeleton for the Product Acceptance sequence using fixtures;
- no production-content invention;
- map each step to current command/assertion/checkpoint APIs.

## Handoff

Short only: SHA, verified gaps closed, failing evidence if any.
