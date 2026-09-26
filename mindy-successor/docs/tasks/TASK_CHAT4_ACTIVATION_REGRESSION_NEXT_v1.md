# TASK CHAT 4 — Activation Regression QA Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat4/activation-gate-next`.
Previous checkpoint is frozen for Lead review.
QA-only ownership.

## Queue item 1 — schema-4 backward compatibility matrix for activation

Create NEW files:
- `docs/qa-prep/PRODUCT_ACTIVATION_SCHEMA4_COMPAT_MATRIX_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/qa-schema4-activation-compat.test.ts`

Audit current schema-4 saves against the activation changes Lead is preparing:
- saves without School-owned progression state;
- pending scenes without presentationId;
- pending scenes with canonical slash presentationId;
- existing legacy actionCounts;
- active Activity saves;
- ending committed/completed saves.

For each, state what must remain loadable and what exact default/migration behavior is required.
Do not edit schema/runtime.

## Queue item 2 — activation regression risk ledger

Create:
- `docs/qa-prep/PRODUCT_ACTIVATION_REGRESSION_RISK_LEDGER_v1.md`

Cross-check:
- current main;
- completed Chat 2/3/5 activation-prep artifacts;
- Lead branch `lead/product-activation-school-lumber-v2` as visible at review time.

List concrete regressions that could be introduced by:
- merging target Lumber definitions with legacy Lumber action;
- recursive/explicit pack inclusion;
- School command/UI activation;
- Night-study catalog activation;
- semantic presentationId persistence;
- Activity UI exposure.

For each risk name the exact existing test(s) plus any missing focused test. No production edits.

After item 1 commit immediately continue to item 2.
