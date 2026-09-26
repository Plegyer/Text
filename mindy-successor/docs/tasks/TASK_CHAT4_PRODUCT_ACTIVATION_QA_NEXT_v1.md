# TASK CHAT 4 — Product Activation QA Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: current main after PR #19.
QA-only ownership. Do not patch production runtime/UI/content.

## Queue item 1 — shipped catalog activation audit

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_SHIPPED_CATALOG_AUDIT_v1.md`

Audit the ACTUAL current build/validate path, not fixture existence.

Check:
- what `scripts/build.mjs` writes into `dist/content.json`;
- what `scripts/validate.ts` loads;
- whether nested `content/packs/lumber-target/*` and `school-target/*` are shipped;
- whether target definitions from fixture JSON are part of production `definitions.json`;
- whether current UI exposes target School courses, target Lumber action, Forest Activity and target endings;
- whether semantic presentation IDs in shipped paths match merged taxonomy.

For each missing activation seam, name exact file/API responsible. Do not propose invented content thresholds.

## Queue item 2 — PA00–PA26 row-runner readiness artifact

Create NEW files:
- `docs/qa-prep/PRODUCT_ACCEPTANCE_ROW_RUNNER_READINESS_v1.md`
- optional NEW QA test `prior-work/astra/prototype-m3.2/tests/qa-product-acceptance-row-runner-readiness.test.ts`

Starting from the existing PA00–PA26 harness and merged PR #19 fixtures:
- classify every row as executable from shipped catalog, executable only from isolated fixture catalog, or blocked;
- map exact command/API and exact ID;
- identify which rows become executable specifically when production activation lands;
- identify save/reload checkpoints;
- keep Hard Work rule exact;
- do not mark a row passed merely because a fixture exists.

If a test is added, it must validate the readiness map itself and remain green on current main; do not fabricate missing runtime behavior.

After item 1 commit immediately continue to item 2 without waiting for Lead review.
