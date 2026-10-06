# Chat 5 — Final Release Regression Partition v30

Status: **PARTITION COMPLETE — READY FOR RELEASE ASSEMBLY**  
Owner: Chat 5  
Branch: `chat5/final-migration-release-review-v28`

Scope: research / release-test partition only.

No production runtime changes.  
No full CI run by Chat 5.

## Goal

Partition the remaining release verification into three non-overlapping layers:

1. **focused assembly gates** — run on each Chat 2 assembly branch before merge;
2. **exact-main gate** — run once on the actual merged main SHA after each production merge;
3. **final 1.0 regression-only gate** — checks that only make sense after every tranche is assembled or after packaging.

The goal is to preserve coverage without repeatedly running the same historical producer suites by hand.

---

# 1. Authoritative remaining assembly order

After D42 closure:

1. Secret Debt v12 + D51;
2. Palace cumulative + D39;
3. Activity + Camp + D38;
4. D46 + D47 + lumber-stay retirement;
5. final save/migration/UI/localization/presentation/regression closure.

Every production merge must be followed by exact-main CI before the burn-down item is closed.

---

# 2. Universal focused pre-merge command gate

For every remaining assembly branch, before its domain-focused tests:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Do not use `npm run check` as a substitute for the curated focused gate when diagnosing a tranche.

Focused failure means:

- stop;
- classify;
- repair/reconcile on the assembly branch;
- do not merge;
- do not rely on exact-main to discover the known focused failure.

After focused green, the normal Chat 2 integration process may run its one full branch CI as required by Leader policy.

This document does not add another full-CI run.

---

# 3. Assembly 1 — Secret Debt v12 + D51 focused gate

Primary changed domains:

- typed Secret Debt;
- forced Night ownership;
- hidden work / repayment / Takeover;
- canonical ending rewards;
- D51 Street+bound Energy provenance.

Run the authoritative minimal bundle:

```text
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/ending-meta.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

Also run the final Secret Debt localization producer test if its content is assembled in the same tranche:

`tests/secret-debt-ending-localization-producer-v27.test.ts`

## Do not duplicate

Do not replay:

- exact-head QA workflow harnesses from producer branches;
- the old D51 QA branch as a second suite;
- all unrelated Palace/Activity producer suites.

Their job here is covered by:

- one D42/Night sentinel;
- one cross-domain separation sentinel;
- the exact-main full check after merge.

---

# 4. Assembly 2 — Palace + D39 focused gate

Primary changed domains:

- Palace access/progression/duties;
- Prince confrontation;
- four Palace endings;
- D39 reward runtime;
- Source Method knowledge;
- Strong Meta registry/schema/engine composition.

Run:

```text
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-player-facing-ui-v16.test.ts
tests/palace-player-facing-ui-renderer-v16.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-prince-narrative-renderer-v18.test.ts
tests/palace-final-prose-media-v19.test.ts
tests/palace-d39-reward-producer-v20.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/night-flow.test.ts
tests/presentation-source-integrity-v9.test.ts
```

If current-main uses a later authoritative accessibility/parity test, use that current test rather than historical v7 names.

## Focused purpose

This bundle proves:

- Palace mechanics;
- D39 exactly-once lifecycle;
- D39 save defaults;
- Source Method slot-free knowledge;
- Secret Debt forced-Night isolation;
- Strong Meta capacity still 2;
- current presentation source integrity.

## Do not duplicate

Do not run the full Secret Debt v12 suite here unless the Palace assembly directly modified Secret Debt-owned code beyond the documented shared engine/schema seams.

The separation + D51/Night sentinels are the focused adjacency boundary.

Exact-main full CI will cover the complete Debt suite after merge.

---

# 5. Assembly 3 — Activity + Camp + D38 focused gate

Primary changed domains:

- four Activity regions;
- finite Field Time;
- Camp;
- D38 endings;
- D38 Strong Meta runtime;
- D38 authored tags;
- D38/D39 combined Strong Meta registry.

Run:

```text
tests/activity-d38-strong-meta-v26.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/activity.test.ts
tests/item-capability-activity-closure.test.ts
tests/forest-frontier-production-hardening-v12.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
tests/restricted-sites-production-v15.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/night-flow.test.ts
tests/palace-d23-consumer-integration-v8.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
```

### Required new/extended assertions

The assembled Activity branch must also contain executable coverage for the accepted review findings.

Preferred dedicated files if not folded into existing suites:

- `tests/activity-d38-authored-tag-mapping-v27.test.ts`
  - exactly 4 Atlas tags;
  - exactly 3 Archive results;
  - exactly 3 Contact options;
  - normal Contact route remains non-Specialist;
- `tests/activity-d38-carried-result-durability-v28.test.ts`
  - Anomalous/Restricted derived research-grade state cannot outlive an unsecured lost source result;
- `tests/d38-d39-strong-meta-collision-v27.test.ts`
  - combined 25 rewards / 22 Specialists / 3 Keystones;
  - capacity 2;
  - mixed D38+D39 selection/save/reload;
  - old standalone v4 snapshot compatibility;
  - Source Method remains knowledge.

Equivalent assertions may be added to existing authoritative files instead of creating these exact filenames.

## Supersession

Use actual v26 D38 producer test.

Do not resurrect the preflight-recommended historical filename:

`activity-d38-strong-meta-v25.test.ts`

The v26 producer suite supersedes it.

Do not keep standalone D38 cardinality assertions:

23 / 20 / 3

after D39 is assembled.

Update the authoritative registry suite to the combined current registry.

---

# 6. Assembly 4 — D46 + D47 + lumber-stay retirement focused gate

Primary changed domains:

- fresh Lust;
- ordinary wage seam;
- D47 package mapping;
- old-save package behavior;
- retired lumber-stay/vitality migration;
- ending/presentation retirement.

Run D46:

```text
tests/economy-start-balance-v14.test.ts
tests/ordinary-hard-work-meta-production.test.ts
tests/ordinary-hard-work-lifecycle-parity.test.ts
tests/lumber-hard-work-invariant.test.ts
tests/hard-work-stat-cap-d24.test.ts
```

Run D47:

```text
tests/hard-work-bonus-mapping-v13.test.ts
tests/hard-work-package-catalog-runtime.test.ts
tests/hard-work-meta-infra-prep.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/hard-work-newstart-presentation-v2.test.ts
tests/hard-work-newstart-ui-v2.test.ts
```

Run retirement:

```text
tests/lumber-stay-retirement-v17.test.ts
tests/migration.test.ts
tests/advanced-endings-tranche-a-v11.test.ts
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
```

Cross-domain wage/engine sentinels:

```text
tests/secret-debt-full-route-v12.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/activity.test.ts
tests/ending-meta.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

### Required base-relative retirement assertion

The final branch must assert:

- exactly 40 canonical ordinary-career endings;
- only live `lumber-stay` is removed by retirement;
- all other pre-retirement ending IDs survive;
- all unrelated current presentation slots survive.

Do not enforce stale global totals:

- not `42 total endings`;
- not `8 exact-static ending presentation slots`.

Those were historical source-snapshot counts.

## Do not duplicate

Do not run the whole Palace and Activity focused producer bundles here.

One current sentinel from each shared engine/wage-adjacent domain is enough before exact-main full CI.

---

# 7. Assembly 5 — final save/localization/presentation closure focused gate

This is where cross-system final-only automated tests belong.

## Save/migration authority

Run **one** final closure suite implementing:

`CHAT5_FINAL_COMBINED_SAVE_MATRIX_v29.md`

Preferred file:

`tests/final-save-migration-closure-v29.test.ts`

If the integration branch extends the existing v21 file instead, run that one file.

Do **not** maintain and execute both a 23-case v21 suite and a 36-case v29 suite with duplicate semantics.

The 36-case suite supersedes the 23-case suite while retaining its assertions.

Also run:

```text
tests/migration.test.ts
tests/ending-meta.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/qa-one-save-state-drift-sentinel-v2.test.ts
```

## Localization / presentation authority

Run the latest accepted producer/parity set:

```text
tests/ending-localization-closure-producer-v26.test.ts
tests/secret-debt-ending-localization-producer-v27.test.ts
tests/global-caption-closure-producer-v29.test.ts
tests/retired-tavern-localization-cleanup-v31.test.ts
tests/night-content-gap-v10.test.ts
tests/shared-night-ui-localization-production-v1.test.ts
tests/activity-ending-content-presentation-v17.test.ts
tests/palace-final-prose-media-v19.test.ts
tests/global-presentation-mapping-producer-v23.test.ts
tests/localization.test.ts
tests/presentation.test.ts
tests/presentation-source-integrity-v9.test.ts
tests/presentation-locale-accessibility-v9.test.ts
```

If the Activity Network copy fix v36-v38 becomes accepted before final closure, its final executable test supersedes the older Network epilogue expectation.

Do not modify mechanics to satisfy the copy correction.

## Ended-screen dependency

Keep one explicit regression proving the accepted localized ended-screen epilogue consumer is present.

Do not duplicate this assertion in every ending-family test.

One generic ended-screen test plus family localization completeness is sufficient.

---

# 8. Exact-main gate after every production merge

The authoritative workflow is:

`.github/workflows/mindy-successor-check.yml`

On push to `main` affecting the prototype it performs:

1. checkout exact merged main;
2. Node setup;
3. `npm ci`;
4. `npm run check`.

`npm run check` is the full repository check:

- typecheck;
- content validation;
- build;
- tests.

## Required exact-main process

After each of the five remaining production merges:

1. record the exact main merge SHA;
2. wait for the `mindy-successor check` run on that SHA;
3. require SUCCESS;
4. record run ID / job ID / test summary;
5. only then close/decrement that burn-down item.

## No manual duplicate bundle on main

Do **not** manually rerun the entire focused producer bundle after merge merely to duplicate evidence.

The exact-main full check already executes the repository test suite.

If exact-main fails:

- triage the failing authoritative tests;
- rerun only the failed/diagnostic subset during repair;
- after new merge, require a new exact-main full check.

Never declare exact-main green from a producer branch SHA.

---

# 9. Exact-main gate partition by merge

## After Secret Debt+D51 merge

Exact-main full check must include the newly assembled Debt/D51 tests.

No extra manual Palace/Activity tests required yet beyond what exists on main.

## After Palace+D39 merge

Exact-main full check must prove:

- Secret Debt remains green;
- Palace/D39 new tests are included;
- current Strong Meta registry is coherent.

Do not separately rerun the old Palace exact-head QA harness.

## After Activity+D38 merge

Exact-main full check must prove:

- D38/D39 combined registry tests are now the authoritative registry expectations;
- Activity/Camp and earlier Palace/Debt tests all coexist.

Any standalone old `strong-meta-v4` count expectation that now fails must be updated/retired, not force the combined registry back to one producer's cardinality.

## After D46/D47/legacy merge

Exact-main full check must prove:

- 40 ordinary ending invariant;
- base-relative ending/presentation preservation;
- all previously assembled non-ordinary endings remain.

Do not force stale total 42.

## After final closure merge

Exact-main full check is the final source-tree automated gate before packaging.

It must include the final combined save matrix and final localization/presentation tests.

---

# 10. Authoritative-suite supersession rules

To avoid duplicate or contradictory tests, apply these rules.

## Final save closure

Supersede:

`final-save-migration-closure-v21` 23-case content

with the v29 36-case content.

One authoritative file only.

## Strong Meta registry

Standalone producer expectations:

- D38: 23 total / 20 Specialists / 3 Keystones;
- D39: 22 total / 19 Specialists / 3 Keystones;

are source-branch evidence only.

Final combined authoritative expectation:

- 25 total;
- 22 Specialists;
- 3 Keystones;
- Specialist capacity 2.

Keep one final registry test.

## D38 implementation

Use:

`activity-d38-strong-meta-v26.test.ts`

not the earlier preflight-proposed v25 filename.

## Camp

Use the repaired accepted Camp behavior with:

`activity-camp-persistence-v17.test.ts`

Do not run a second copy of the same semantic suite solely because the executable repair branch was v19.

## Presentation accessibility

Use the latest current-main authoritative suite.

Where both historical names exist, prefer:

`presentation-locale-accessibility-v9.test.ts`

over older v7 expectations.

Do not run v7 and v9 as separate release requirements if v9 supersedes it.

## Retired ending counts

Use:

- canonical 40 ordinary ending assertion;
- base-relative set preservation.

Do not keep stale absolute global count assertions from historical producer snapshots.

## QA workflow harnesses

Exact-head QA branches/workflows are evidence that frozen producers were healthy.

They are not release test suites to copy into final CI.

---

# 11. Final 1.0 regression-only automated checks

After the final closure merge is exact-main green, do not rerun every domain-focused bundle manually.

The only additional **source-tree regression-only** checks justified at this stage are those requiring the complete final composition.

If they are already part of `npm test`, their exact-main execution is sufficient.

Ensure final repository contains authoritative coverage for:

- 36-case combined save matrix;
- D38+D39 combined registry/runtime collision;
- canonical 40 ordinary ending + base-relative ending preservation;
- final localization completeness;
- final presentation source integrity;
- final locale/accessibility parity;
- generic localized ended-screen epilogue;
- one-save state drift sentinel.

Do not schedule separate third executions of those same tests after exact-main SUCCESS unless a release candidate changes source.

---

# 12. Final 1.0 regression-only packaging checks

These are genuinely not replaced by source-tree CI.

Use:

`mindy-successor/docs/qa-prep/WINDOWS_RELEASE_CHECKLIST_v1.md`

against the exact release-candidate SHA.

## Build / package

- exact clean checkout;
- required Node version;
- `npm run dist:win`;
- record installer filename, size, SHA-256.

Note:

`dist:win` internally reruns the full check.

Do not add another ad-hoc full test invocation immediately afterward unless the source changes.

## Installed-app smoke

- install default path;
- install path with spaces/non-ASCII;
- launch without source checkout;
- create/save/reload;
- blocking event survives relaunch;
- paid Night reload does not duplicate lodging;
- Activity reload does not duplicate 2-Energy entry;
- ending/reward checkpoint is idempotent.

## Mixed-state persistence smoke

Add one final mixed-state installed-app fixture:

- one D38 Specialist selected;
- one D39 Specialist selected;
- one run-local use in each family;
- close/reopen installed app;
- exact runtime state survives;
- no third slot appears;
- no reward/use replays.

## Backup/corruption

- primary save;
- known-good backup;
- corrupt primary -> recover backup;
- corrupt primary + backup -> safe failure;
- do not overwrite corrupted sources as valid.

## Installer update

- install prior compatible build;
- create/save representative run;
- install final candidate over it;
- load save successfully through final migration path.

## Media/fallback/no-dev-path

- packaged relative assets resolve;
- missing optional media stays mechanically neutral;
- offline clean-machine launch;
- no Git/Node/source tree dependency.

These checks are release-only because unit/full CI cannot prove installer/userData behavior.

---

# 13. Failure ownership

## Focused assembly failure

Owner: current assembly tranche.

Do not merge.

## Pre-merge full CI failure

Owner: Chat 2 integration branch.

Repair only the classified failure.

## Exact-main failure

The merge is not considered closed.

Do not decrement burn-down.

## Packaging-only failure

Do not reopen mechanics automatically.

Classify as:

- packaging;
- filesystem/path;
- persistence storage;
- media packaging;
- installer/update;
- genuine runtime regression.

Return to runtime only when evidence shows source behavior is wrong.

---

# 14. Final release evidence record

For each remaining assembly merge record:

- assembly branch SHA;
- focused commands;
- focused pass/fail counts;
- pre-merge full CI if run;
- merge SHA;
- exact-main workflow run/job;
- conclusion.

For final 1.0 candidate additionally record:

- final exact-main SHA;
- final full-test count;
- installer SHA-256;
- Windows build identity;
- installed-app smoke results;
- mixed-state persistence result;
- backup recovery result;
- clean-machine/offline result.

---

# 15. Final partition summary

## Focused gates

Purpose:

**prove the changed tranche + closest shared seams before merge.**

Do not run every historical producer suite.

## Exact-main gate

Purpose:

**prove the entire repository on the actual merge SHA once.**

Use the automatic `mindy-successor check`.

Do not manually duplicate focused bundles on main.

## Final 1.0 regression-only gate

Purpose:

**prove fully combined migration semantics and packaged Windows behavior that no isolated producer or ordinary exact-main test can prove alone.**

Automated combined regressions belong in the final repository and are covered by final exact-main.

After that, only packaging / installed-app / persistence / clean-machine evidence is additional.

## Disposition

**READY_FOR_RELEASE REGRESSION EXECUTION**
