# Chat 3 — Final Save / Migration Dry-Run v66

Status: **BUNDLE COMPLETE — READY FOR FINAL SAVE / MIGRATION DRYRUN**
Owner: Chat 3
Branch: `chat3/final-save-migration-dryrun-v65`

No production runtime/content changes.

No full CI.

No `main` merge.

The final assembled candidate does not yet exist, so no final migration execution result is promoted to PASS.

## 1. v65 checklist

Created:

`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_DRYRUN_CHECKLIST_v65.md`

v65 checklist commit:

`51b76bca9e18354322407af75c0401a1eb35102b`

The checklist enforces one frozen candidate SHA for all PASS / FAIL / NOT-RUN evidence.

It contains:

- exact candidate SHA + schema/catalog/Strong Meta/Activity freeze fields;
- package-integrity step;
- typecheck / validate / build gates;
- exact 23-case migration closure;
- exact frozen-name check;
- focused adjacency roster reference;
- failure classification before modification;
- focused-green-before-full-CI firewall;
- F1-F5 authoritative reconstruction record;
- case 14 Palace ambiguity disposition;
- content/presentation save-neutrality record;
- one-SHA result block.

## 2. Accepted prerequisites

Accepted release-evidence handoff:

`CHAT3_FINAL_SAVE_MIGRATION_RELEASE_EVIDENCE_v64.md@3d0b1969f5492cfe7b3d853a47cacefc5305c3d1`

Accepted exact-head golden QA:

`CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_QA_v62.md@6573cfa7f856f7b8f29cf767c53b24aa68f1d208`

Frozen golden package:

`chat3/final-save-migration-golden-manifest-v57@5d93d3f5b3ca34e2512d183e83e09404d5072701`

Historical reconstruction bundle:

`chat3/final-historical-fixture-recovery-v54@5233a0b31a6254183395b1ec038297377df99565`

Accepted prior evidence remains:

- exactly 23 unique frozen cases: PASS;
- v52/v57 case-name identity: 23/23 PASS;
- dependency/runnable consistency: PASS;
- package static/exact-head audit: PASS;
- per-case stop-condition audit: 23/23 PASS;
- F1-F5 provenance: PASS;
- required exactly-once coverage: PASS;
- required subsystem coverage: PASS;
- content/presentation save-neutrality contract: PASS;
- manifest/test-only corrections required: NONE.

These are accepted package-level prerequisites, not final assembled-candidate execution results.

## 3. Future dry-run execution order

On one fully assembled frozen candidate:

1. record candidate branch + exact SHA;
2. record final `schemaVersion`, content/catalog version, Strong Meta registry version, and Activity-local version fields;
3. run package integrity;
4. run typecheck;
5. run validate;
6. run build;
7. run exact 23-case migration closure;
8. verify exact frozen case-name identity;
9. record case 14 Palace ambiguity disposition;
10. verify content/presentation mechanical save-neutrality;
11. run focused adjacency roster from v64/v63;
12. classify every red result before any modification;
13. require focused closure green;
14. only then permit Chat 2 final full CI.

Working directory:

`mindy-successor/prior-work/astra/prototype-m3.2`

Package integrity:

```text
npm ci
node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts
```

Assembled-target build gates:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Final migration closure:

```text
node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts
```

The focused adjacency roster is referenced, not duplicated, from:

`CHAT3_FINAL_SAVE_MIGRATION_RELEASE_EVIDENCE_LEDGER_v63.md`

## 4. Mandatory dry-run records

### F1-F5

All remain:

**authoritative reconstructed historical fixtures**

None may be reported as genuine user saves.

Candidate execution must preserve their documented historical input boundary before migration normalization.

### Palace case 14

The final candidate must record exactly one supported disposition:

- documented exact historical mapping; or
- explicit compatibility rejection.

Fabricating fifteen duties from `palace.progression-complete` alone is a hard NO-GO.

### Content/presentation save-neutrality

Final candidate evidence must show that content/presentation-only overlays do not mutate mechanical save state, IDs, RNG/pending identity, rewards, transactions, conditions/effects, or ending eligibility.

## 5. Failure-classification rule

Before any fix, classify a failure as one of:

- product/runtime failure;
- fixture/test debt;
- expected absent/unassembled future tranche;
- content-only expectation drift.

Do not mutate production behavior merely to satisfy stale fixture expectations.

An absent future tranche on an unassembled candidate is not a product/runtime failure.

## 6. Go / no-go for full CI

**GO** for Chat 2 final full CI requires all required dry-run rows to be PASS on the same frozen candidate SHA:

- identity/version freeze;
- package integrity;
- typecheck;
- validate;
- build;
- exact 23-case closure;
- exact frozen-name identity;
- F1-F5 candidate provenance check;
- case 14 explicit disposition;
- content/presentation save-neutrality;
- focused adjacency roster.

Any FAIL or required NOT-RUN means **NO-GO**.

Historical producer greenness cannot replace final assembled-target execution.

## 7. Current disposition

Current dry-run candidate SHA: **NOT FROZEN**

Package integrity on final candidate: **NOT-RUN**

Typecheck / validate / build on final candidate: **NOT-RUN**

Exact 23-case migration closure: **NOT-RUN**

Focused adjacency roster: **NOT-RUN**

Case 14 final disposition: **NOT-RUN**

Final content/presentation save-neutrality execution: **NOT-RUN**

Full CI permitted: **NO**

Production mutation: **NONE**

Full CI: **NOT RUN**

`main` merge: **NONE**

**BUNDLE_COMPLETE — READY_FOR_FINAL_SAVE_MIGRATION_DRYRUN**
