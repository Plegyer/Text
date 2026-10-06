# Chat 3 — Final Save / Migration Golden Manifest v59

Status: **BUNDLE COMPLETE — READY FOR FINAL SAVE / MIGRATION GOLDEN EXECUTION**  
Owner: Chat 3  
Branch: `chat3/final-save-migration-golden-manifest-v57`

No production runtime/content changes.

No full CI.

Do not merge main from this producer lane.

---

# 1. Golden manifest

Machine-readable manifest:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-save-migration-golden-v57.json`

Human companion:

`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_MANIFEST_v57.md`

The manifest freezes all **23** v52 release cases.

Every case records:

- exact case ID and exact v52 name;
- domains;
- dependency class;
- runnable-now vs final-release status;
- exact fixture/source authorities;
- classified dependencies;
- before/reload checkpoints;
- exactly-once domains;
- rejection/default rules;
- stable IDs;
- reward ownership checks;
- forbidden inference rules;
- F1-F5 fixture links where applicable;
- post-integration requirement;
- explicit stop conditions.

---

# 2. Golden validator

Validator:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-save-migration-golden-v57.test.ts`

Companion:

`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_VALIDATOR_v58.md`

Accepted v55 fixture-integrity test carried forward unchanged:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-historical-fixtures-v55.test.ts`

Reconstruction recipes carried forward unchanged:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-historical-reconstruction-v55.ts`

---

# 3. F1-F5 historical assets

These accepted test-only assets are copied unchanged from:

`chat3/final-historical-fixture-recovery-v54@5233a0b31a6254183395b1ec038297377df99565`

Literal raw fixtures:

- `tests/fixtures/final-historical/f1-schema1-reconstructed.json`
- `tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json`

Provenance manifest:

- `tests/fixtures/final-historical/README.md`

Recipes:

- F3 `reconstructPalaceAccessWithoutLedger`
- F4 `reconstructLumberStayWithRunResult`
- F5 `reconstructLumberStayPreRunResult`

All F1-F5 manifest records remain:

`classification = authoritative_reconstruction`

`genuineUserSave = false`

No F1-F5 input is represented as a genuine user save.

Case linkage:

- F1 → case 01
- F2 → case 17
- F3 → case 13
- F4 → case 06
- F5 → case 06

---

# 4. Exact authorities

Primary contract:

`CHAT3_FINAL_SAVE_MIGRATION_GATE_DESIGN_v52.md`

Source branch:

`chat3/final-save-migration-gate-prep-v51`

Final prep handoff:

`CHAT3_FINAL_SAVE_MIGRATION_GATE_PREP_v53.md`

Historical fixture recovery:

`CHAT3_FINAL_HISTORICAL_FIXTURE_RECOVERY_v56.md`

Source branch:

`chat3/final-historical-fixture-recovery-v54`

Independent closure authority:

`CHAT4_FINAL_SAVE_MIGRATION_CLOSURE_PREFLIGHT_v21.md`

Commit:

`1601be7b224f7b6687c4146c53d37499efb6a3f1`

Frozen producer heads encoded in the manifest:

- Secret Debt v12:
  `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51:
  `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`
- Camp:
  `chat4/activity-camp-baseline-repair-v19@8b5874faa23130208c83818af3f37431c1377caa`
- D38:
  `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`
- Palace/Prince:
  `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`
- D46:
  `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D47:
  `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- lumber-stay retirement:
  `chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`

---

# 5. Internal consistency checks executed now

A structural audit was executed against the committed v57 JSON.

Result:

`PASS`

Failures:

`0`

Verified:

- manifest version = 57;
- exactly 23 cases;
- 23 unique IDs;
- 23 unique names;
- contiguous `case-01` through `case-23`;
- every dependency has an allowed classification;
- every non-current case has an explicit post-integration requirement;
- every case has stop conditions;
- F1-F5 classifications remain authoritative reconstruction;
- every F1-F5 `genuineUserSave` flag remains false;
- required exactly-once domains all represented;
- required system coverage all represented;
- Strong Meta permanent/current-run/package/legacy separation represented;
- content/presentation mechanical mutation forbidden;
- representative v21 forbidden-inference rules present.

Observed exactly-once coverage includes:

- money;
- Energy;
- calendar;
- reward;
- transaction;
- creation;
- RNG/pending identity.

Observed required system coverage includes:

- Activity;
- Camp;
- Secret Debt;
- Palace;
- D46;
- D47;
- lumber retirement;
- Strong Meta;
- NightFlow;
- D40;
- D41;
- D38.

This is manifest validation only.

It does **not** claim final production migration execution is green.

---

# 6. Unresolved post-integration dependencies

The golden contract is complete, but the following require the fully assembled release target.

## Schema freeze

Before case 01 execution, Chat 2 must record:

- exact release branch;
- exact release SHA;
- final public `schemaVersion`;
- final content/catalog version;
- final Strong Meta registry version;
- final Activity local version fields.

The manifest deliberately does not hard-code schema 6 as the final public epoch.

## Secret Debt + D51

Cases 08-12 and 20 require:

- typed Secret Debt v12;
- forced Night integration;
- D51 provenance pair;
- final effective Energy basis;
- canonical Strong Meta reward binding.

## Activity + Camp + D38

Cases 17-21 require:

- final Field Time/mini-game shape;
- executable Camp delta;
- Camp/Secret Debt boundary ownership;
- D38 canonical Strong Meta reward binding.

## Palace

Cases 13-15 require:

- final Rich6 typed progression;
- Prince authored phase persistence;
- explicit Return Home path.

Case 14 still requires one final approved behavior for ambiguous:

`palace.progression-complete`

without committed-duty proof:

1. explicitly documented exact historical mapping; or
2. explicit compatibility rejection.

Never synthesize 15 duties without authority.

## D46 + D47 + lumber retirement

Cases 06 and 22 require final composition of:

- D46 fresh-only Lust/start balance;
- D47 creation-time package snapshot/application;
- lumber-stay/vitality retirement before final ending/reference validation.

## Content/presentation save-neutrality

Case 23 must run after final:

- D38 v17 content/presentation;
- Palace v19/D48 presentation;
- ending/global localization;
- global presentation mapping;
- accepted media overlays.

These layers must not mutate mechanical save state.

---

# 7. Exact future manifest-validation commands

From:

`mindy-successor/prior-work/astra/prototype-m3.2`

run:

```text
npm ci
node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts
```

These commands validate fixture/manifest integrity only.

They do not replace the final migration execution.

---

# 8. Exact future final execution sequence

After all release production tranches are assembled:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then materialize/run:

```text
node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts
```

The materialized closure suite must contain the exact 23 names frozen in v57.

Then run the focused adjacency roster.

## Core migration / transaction / Strong Meta

```text
tests/migration.test.ts
tests/ending-meta.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/strong-meta-registry-v7.test.ts
tests/ordinary-hard-work-meta-production.test.ts
```

## Activity / Camp / D38

```text
tests/activity.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/restricted-sites-production-v15.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
```

## Night / Secret Debt / D51

```text
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
```

## Palace

```text
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-player-facing-ui-v16.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-prince-narrative-renderer-v18.test.ts
tests/hard-work-palace-meta-smoke.test.ts
```

If strict-typing integration renames a historical producer test, use its final assembled equivalent and record the mapping.

## D46 / D47

```text
tests/economy-start-balance-v14.test.ts
tests/hard-work-bonus-mapping-v13.test.ts
tests/hard-work-package-catalog-runtime.test.ts
tests/hard-work-stat-cap-d24.test.ts
```

## Lumber retirement

```text
tests/lumber-stay-retirement-v17.test.ts
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
```

## Localization / presentation

```text
tests/ending-localization-closure-producer-v26.test.ts
tests/global-presentation-mapping-producer-v23.test.ts
```

plus the exact final D42/global localization/presentation integrity/accessibility tests present on the release head.

Run the focused closure first.

Only after it is green should the Chat 2 release lane run its final full CI.

---

# 9. Leader / Chat 2 stop conditions

Stop final closure if:

- golden manifest no longer validates as 23 unique exact cases;
- F1-F5 are relabeled genuine;
- final schema epoch is not frozen;
- one public schema version has incompatible meanings;
- any FUTURE/FINAL_ASSEMBLY case is skipped because a producer was historically green;
- a historical reconstruction is normalized into the current schema before migration sees it;
- generic debt becomes Secret Debt;
- Street housing alone becomes D51 provenance;
- Palace access becomes duty progress;
- ambiguous Palace completion fabricates 15 duties;
- Prince readiness becomes defeat;
- Camp state is inferred from unrelated fields;
- earned Hard Work becomes active D47 package selection;
- old Lust is rewritten to D46 fresh default;
- D47 applies retroactively or twice;
- retired lumber-stay becomes a modern ending;
- vitality becomes a Strong Meta/Hard Work slot;
- RunResult/result/transaction identity changes on reload;
- any reward/payment/calendar effect replays;
- protected profile merge rewrites current-run Strong Meta snapshot/runtime;
- D38/Secret Debt canonical Strong Meta reward also remains a generic unlock;
- content/presentation-only layers mutate save mechanics;
- case 14 has neither approved mapping nor explicit rejection;
- focused closure is red.

Do not modify production behavior merely to make a stale fixture pass.

Classify first:

- product/runtime failure;
- fixture/test debt;
- expected absent future tranche;
- content-only expectation drift.

---

# 10. Bundle disposition

v57 exact 23-case machine-readable manifest: **COMPLETE**

v58 manifest validator: **COMPLETE**

v58 structural execution: **PASS — 0 failures**

F1-F5 portable reconstructed fixture assets: **PRESENT**

v59 handoff: **COMPLETE**

Production runtime/content mutation: **NONE**

Full CI: **NOT RUN**

**BUNDLE_COMPLETE — READY_FOR_FINAL_SAVE_MIGRATION_GOLDEN_EXECUTION**
