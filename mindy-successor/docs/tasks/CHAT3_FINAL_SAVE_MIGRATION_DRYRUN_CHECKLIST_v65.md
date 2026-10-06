# Chat 3 — Final Save / Migration Dry-Run Checklist v65

Status: **PREPARED — FINAL ASSEMBLED CANDIDATE NOT YET AVAILABLE**
Owner: Chat 3
Branch: `chat3/final-save-migration-dryrun-v65`

Authority:

- accepted release-evidence handoff: `CHAT3_FINAL_SAVE_MIGRATION_RELEASE_EVIDENCE_v64.md@3d0b1969f5492cfe7b3d853a47cacefc5305c3d1`
- accepted exact-head golden QA: `CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_QA_v62.md@6573cfa7f856f7b8f29cf767c53b24aa68f1d208`
- frozen golden package: `chat3/final-save-migration-golden-manifest-v57@5d93d3f5b3ca34e2512d183e83e09404d5072701`
- historical reconstruction bundle: `chat3/final-historical-fixture-recovery-v54@5233a0b31a6254183395b1ec038297377df99565`

No production runtime/content changes are authorized by this checklist.

## 1. One-SHA evidence rule

Before execution, freeze one fully assembled candidate and fill:

```text
candidateBranch:
candidateSHA:
schemaVersion:
contentCatalogVersion:
strongMetaRegistryVersion:
activityVersionFields:
```

Every PASS / FAIL / NOT-RUN result below must belong to that exact `candidateSHA`.

Do not combine results from different SHAs.

Until `candidateSHA` is populated and frozen, all assembled-target execution rows remain **NOT-RUN**.

## 2. Ordered dry-run checklist

| Order | Gate | Required action | Status on frozen candidate |
|---:|---|---|---|
| 1 | Freeze identity | Record exact candidate SHA + schema/catalog/Strong Meta/Activity versions | NOT-RUN |
| 2 | Historical fixture provenance | Confirm F1-F5 remain authoritative reconstructions, never genuine user saves | PASS (accepted evidence); candidate confirmation NOT-RUN |
| 3 | Package integrity | Run portable historical-fixture + golden-manifest integrity tests | NOT-RUN |
| 4 | Typecheck | Run `npm run typecheck` | NOT-RUN |
| 5 | Validate | Run `npm run validate` | NOT-RUN |
| 6 | Build | Run `npm run build` | NOT-RUN |
| 7 | Exact migration closure | Run exact 23-case final save/migration closure on frozen candidate | NOT-RUN |
| 8 | Case-name identity | Verify closure contains exactly the frozen 23 v52/v57 case names | NOT-RUN |
| 9 | Palace case 14 | Record exact historical mapping or explicit compatibility rejection; never fabricate 15 duties | NOT-RUN |
| 10 | Save-neutrality | Confirm content/presentation-only overlays do not mutate mechanical save state | NOT-RUN |
| 11 | Focused adjacency | Run the full focused roster referenced by v64/v63 | NOT-RUN |
| 12 | Failure classification | Classify every red result before any modification | NOT-RUN |
| 13 | Focused-green gate | Require exact migration closure + focused adjacency roster green | NOT-RUN |
| 14 | Full CI permission | Permit Chat 2 full CI only after order 13 is PASS | NOT-RUN |

Current FAIL count: **0**.

Current final-candidate PASS count: **0** because the final assembled candidate does not yet exist.

## 3. Exact commands

Working directory:

`mindy-successor/prior-work/astra/prototype-m3.2`

### Package integrity

```text
npm ci
node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts
```

### Frozen assembled-target build gates

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

### Exact 23-case migration closure

```text
node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts
```

The closure must materialize the exact 23 frozen case names from v52/v57.

### Focused adjacency roster

Use the exact roster already frozen in:

`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_RELEASE_EVIDENCE_LEDGER_v63.md`

Required domains:

- core migration / transaction / Strong Meta;
- Activity / Camp / D38;
- Night / Secret Debt / D51;
- Palace;
- D46 / D47;
- lumber retirement;
- localization / presentation;
- final D42/global localization/presentation integrity/accessibility tests present on the frozen release head.

If strict-typing integration renames a historical producer test, record the final assembled equivalent explicitly.

## 4. F1-F5 provenance record

For dry-run reporting:

- F1 — authoritative reconstruction;
- F2 — authoritative reconstruction;
- F3 — authoritative reconstruction;
- F4 — authoritative reconstruction from accepted producer test;
- F5 — authoritative reconstruction from accepted producer test.

Required rule:

**authoritative reconstructed historical fixture**

Forbidden report wording:

**genuine user save**

The candidate must consume the reconstructed raw evidence at the documented historical boundary before target-schema normalization.

## 5. Case 14 Palace ambiguity record

Case 14 may pass only with one of these explicit dispositions:

1. an exact documented historical mapping supported by frozen authority; or
2. explicit compatibility rejection.

No other inference is authorized.

In particular, `palace.progression-complete` without committed-duty proof must never synthesize fifteen duty IDs.

Record on the frozen candidate:

```text
case14Disposition:
case14Authority:
case14Status: PASS | FAIL | NOT-RUN
```

## 6. Content/presentation save-neutrality record

The dry-run must verify that content/presentation-only layers do not alter mechanical save state, including:

- schema/save fields;
- mechanical IDs;
- RNG / pending identity;
- reward IDs;
- transaction IDs;
- conditions/effects;
- ending eligibility.

Record:

```text
saveNeutralityCandidateSHA:
saveNeutralityStatus: PASS | FAIL | NOT-RUN
evidence:
```

## 7. Failure classification before modification

Every red result must be classified before modifying runtime, fixture, content, or tests:

- product/runtime failure;
- fixture/test debt;
- expected absent/unassembled future tranche;
- content-only expectation drift.

Never change production behavior merely to make a stale fixture pass.

An absent future tranche on an unassembled candidate is not a product/runtime failure.

## 8. Full-CI firewall

Full CI is forbidden until all of the following on the same frozen candidate SHA are PASS:

- package integrity;
- typecheck;
- validate;
- build;
- exact 23-case migration closure;
- exact case-name identity;
- case 14 explicit disposition;
- content/presentation save-neutrality;
- focused adjacency roster.

Only Chat 2 owns final full CI.

## 9. Dry-run result block

Use exactly one candidate SHA:

```text
candidateSHA:
packageIntegrity: PASS | FAIL | NOT-RUN
typecheck: PASS | FAIL | NOT-RUN
validate: PASS | FAIL | NOT-RUN
build: PASS | FAIL | NOT-RUN
migration23: PASS | FAIL | NOT-RUN
focusedAdjacency: PASS | FAIL | NOT-RUN
f1f5Provenance: PASS | FAIL | NOT-RUN
case14Disposition: PASS | FAIL | NOT-RUN
saveNeutrality: PASS | FAIL | NOT-RUN
failureClassificationComplete: PASS | FAIL | NOT-RUN
fullCIPermitted: YES | NO
```

Current prepared-state result:

```text
candidateSHA: NOT FROZEN
packageIntegrity: NOT-RUN
typecheck: NOT-RUN
validate: NOT-RUN
build: NOT-RUN
migration23: NOT-RUN
focusedAdjacency: NOT-RUN
f1f5Provenance: PASS (accepted authority only; candidate confirmation NOT-RUN)
case14Disposition: NOT-RUN
saveNeutrality: NOT-RUN
failureClassificationComplete: NOT-RUN
fullCIPermitted: NO
```
