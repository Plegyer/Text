# Chat 3 — Final Save / Migration Release Evidence Ledger v63

Status: **PREPARED — FINAL ASSEMBLED-TARGET EXECUTION NOT RUN**
Owner: Chat 3
Branch: `chat3/final-save-migration-release-evidence-v63`

This ledger is evidence bookkeeping only. It does not change production runtime/content and does not claim that the final release target is assembled.

Status vocabulary:

- **PASS** — accepted/frozen evidence exists for the stated contract.
- **FAIL** — the stated check was executed and failed.
- **NOT-RUN** — the final assembled-target check has not yet been executed.

Frozen package authority:

- golden producer: `chat3/final-save-migration-golden-manifest-v57@5d93d3f5b3ca34e2512d183e83e09404d5072701`
- exact-head QA handoff: `mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GOLDEN_QA_v62.md@6573cfa7f856f7b8f29cf767c53b24aa68f1d208`
- historical recovery: `chat3/final-historical-fixture-recovery-v54@5233a0b31a6254183395b1ec038297377df99565`
- canonical case design: `mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GATE_DESIGN_v52.md` on `chat3/final-save-migration-gate-prep-v51`

## 1. Evidence ledger

| Evidence item | Status | Frozen evidence / release requirement |
|---|---|---|
| Golden manifest exact case count/name contract | PASS | v62: 23 unique contiguous cases; v52 names == v57 names 23/23 |
| Dependency/runnable classification | PASS | v62 exact-head audit |
| F1-F5 historical reconstruction classification | PASS | v56 + v62; all authoritative reconstructions, none genuine user-save blobs |
| Required exactly-once domain coverage | PASS | money, Energy, calendar, reward, transaction, creation, RNG/pending identity |
| Required subsystem coverage | PASS | Secret Debt+D51, Activity+Camp+D38, Palace, D46/D47/lumber, Strong Meta, NightFlow plus D40/D41 |
| Content/presentation save-neutrality contract | PASS | v62 case 23 firewall |
| Case 14 ambiguous Palace policy stop condition | PASS | no fabrication of 15 duties; final behavior must be documented exact mapping or explicit compatibility rejection |
| Schema freeze on assembled release head | NOT-RUN | final public schema epoch/version/catalog/registry must be frozen before case 01 final execution |
| Portable Node package/fixture integrity command | NOT-RUN | must run on runnable checkout before final target execution |
| Final typecheck/validate/build on assembled target | NOT-RUN | release target not assembled |
| Final 23-case production migration closure | NOT-RUN | do not execute/classify before fully assembled release target |
| Focused adjacency roster on assembled target | NOT-RUN | must follow final 23-case closure |
| Final full CI | NOT-RUN | allowed only after focused final closure is green |
| Production failure | **none recorded** | absence of an unassembled future tranche is not a product failure |

There are no current **FAIL** entries.

## 2. Exactly 23 final save/migration cases

The final release suite must contain these exact 23 frozen names. Contract status is PASS; assembled-target execution status remains NOT-RUN for every row.

| # | Frozen case | Contract | Final execution |
|---:|---|---|---|
| 01 | schema ladder reaches one final schema and parse twice is idempotent | PASS | NOT-RUN |
| 02 | legacy ended run receives exactly one RunResult transaction | PASS | NOT-RUN |
| 03 | Strong Meta migration and protected profile merge never rewrite the current run | PASS | NOT-RUN |
| 04 | D40 selected-route repair is conservative and idempotent | PASS | NOT-RUN |
| 05 | D41 completed legacy Tavern migration canonicalizes once and Specialist ownership dedupes | PASS | NOT-RUN |
| 06 | retired lumber-stay vitality migration preserves history without creating a modern ending | PASS | NOT-RUN |
| 07 | NightFlow atomic reload matrix is exactly once at every phase | PASS | NOT-RUN |
| 08 | pre-Secret-Debt saves default unseen and typed Secret Debt states roundtrip exactly | PASS | NOT-RUN |
| 09 | Secret Debt lender acceptance and ten-day trap cannot replay or backdate forced Night | PASS | NOT-RUN |
| 10 | Secret Debt forced Night and D51 provenance queue are reload-safe | PASS | NOT-RUN |
| 11 | D51 compatibility is provenance-gated and never a global Energy floor | PASS | NOT-RUN |
| 12 | Secret Debt hidden-work repay Takeover and ending ledger never replay | PASS | NOT-RUN |
| 13 | old Palace access without Rich6 ledger gets neutral progression while access is preserved | PASS | NOT-RUN |
| 14 | ambiguous Palace progression-complete without duty proof is never fabricated into fifteen duties | PASS | NOT-RUN |
| 15 | Prince confrontation resumes exact authored phase and Return Home remains explicit | PASS | NOT-RUN |
| 16 | Activity entry route checkpoint and RNG reload do not recharge or reinterpret the envelope | PASS | NOT-RUN |
| 17 | legacy Activity Field Time and mini-game state migrate conservatively | PASS | NOT-RUN |
| 18 | old active Activity gets only the exact neutral Camp default and partial Camp state rejects | PASS | NOT-RUN |
| 19 | Camp atomic boundary reload matrix preserves two-night cap and exactly-once calendar and Field Time | PASS | NOT-RUN |
| 20 | Camp cannot suppress Secret Debt forced Night or lose the next-day Debt consequence | PASS | NOT-RUN |
| 21 | D38 Activity ending eligibility stays non-terminal and canonical Specialist reward ownership applies once | PASS | NOT-RUN |
| 22 | D46 existing Lust and D47 package snapshot preserve old lives and apply new packages once | PASS | NOT-RUN |
| 23 | D23 package identity and content-presentation-only tranches are save-neutral | PASS | NOT-RUN |

## 3. F1-F5 authoritative reconstruction provenance

All five are release regression inputs classified as authoritative reconstructions. No standalone genuine user-save blob was recovered.

| Fixture | Classification | Prepared artifact / recipe | Frozen source authority |
|---|---|---|---|
| F1 | authoritative reconstruction | `tests/fixtures/final-historical/f1-schema1-reconstructed.json` | historical schema1/2 authority `536f2e5a7084153375cbc4cb54c08c27e95545e7`; migration discipline `0ae14e5949a1a1790d6f5a7b41f29e7db6c830e1` |
| F2 | authoritative reconstruction | `tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json` | persisted Activity `1602583bf9b80515280df165c269bec4353bc19a`; first shipped Lumber Activity `9b427d75dc22021cd3373aa7dd3521782e54152d` |
| F3 | authoritative reconstruction | `tests/final-historical-reconstruction-v55.ts::reconstructPalaceAccessWithoutLedger` | D23 access `959fb3f4e61b4237ae3afb52f5d4dfe5733b4531`; Palace v18 `67f948d185883d8e706dad522e5010bff8e2bd48` |
| F4 | authoritative reconstruction from accepted producer test | `tests/final-historical-reconstruction-v55.ts::reconstructLumberStayWithRunResult` | lumber retirement v17 `52bfd82b374ed045b06c9c78f5f3065cd7226bdb` |
| F5 | authoritative reconstruction from accepted producer test | `tests/final-historical-reconstruction-v55.ts::reconstructLumberStayPreRunResult` | lumber retirement v17 `52bfd82b374ed045b06c9c78f5f3065cd7226bdb` |

Preparation head for the reconstructed fixture bundle:

`5233a0b31a6254183395b1ec038297377df99565`

Release reporting must say **authoritative reconstructed historical fixture**. It must not call F1-F5 genuine user saves.

## 4. Release invariants that must be green

Exactly-once domains:

- money;
- Energy;
- calendar;
- reward;
- transaction;
- creation;
- RNG / pending identity.

Required coverage:

- Secret Debt + D51, including provenance-gated pair-only floor;
- Activity + Camp + D38, including two-night Camp and forced-Night preemption;
- Palace, including access-without-ledger, Prince phase persistence, explicit Return Home and case 14 ambiguity;
- D46 fresh Lust versus stored-Lust preservation;
- D47 whole-package creation snapshot/application exactly once;
- lumber-stay/vitality historical compatibility without modern-ending fabrication;
- permanent Strong Meta versus immutable current-run snapshot/runtime versus Hard Work package versus legacy perk separation;
- NightFlow exactly-once boundaries;
- D40, D41;
- content/presentation save-neutrality.

Case 14 is an explicit no-go if the final target does neither:

1. a documented exact historical mapping supported by authority; nor
2. explicit compatibility rejection.

It is always a no-go to synthesize fifteen Palace duties from `palace.progression-complete` alone.

## 5. Schema freeze requirement

Before final case 01 execution, freeze and record on one exact release SHA:

- release branch and exact SHA;
- final public `schemaVersion`;
- final content/catalog version;
- final Strong Meta registry version;
- final Activity-local version fields used by migration validation.

Do not assume historical schema 6 is the final public epoch unless the assembled release explicitly freezes it.

## 6. Exact future execution sequence from v62

Working directory:

`mindy-successor/prior-work/astra/prototype-m3.2`

Portable package/fixture integrity first:

```text
npm ci
node --experimental-strip-types --test tests/final-historical-fixtures-v55.test.ts tests/final-save-migration-golden-v57.test.ts
```

Then, only on the fully assembled release target:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Materialize/run the exact final closure:

```text
node --experimental-strip-types --test tests/final-save-migration-closure-v21.test.ts
```

The materialized closure must contain the exact 23 names in section 2.

Then run the focused adjacency roster from v62.

Core migration / transaction / Strong Meta:

```text
tests/migration.test.ts
tests/ending-meta.test.ts
tests/hard-work-meta-migration-v5.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/strong-meta-registry-v7.test.ts
tests/ordinary-hard-work-meta-production.test.ts
```

Activity / Camp / D38:

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

Night / Secret Debt / D51:

```text
tests/night-flow.test.ts
tests/night-content-gap-v10.test.ts
tests/secret-debt-full-route-v12.test.ts
tests/secret-debt-activity-energy-compat-v20.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
```

Palace:

```text
tests/palace-d23-consumer-integration-v8.test.ts
tests/palace-rich6-runtime-v15.test.ts
tests/palace-player-facing-ui-v16.test.ts
tests/palace-prince-narrative-producer-v18.test.ts
tests/palace-prince-narrative-renderer-v18.test.ts
tests/hard-work-palace-meta-smoke.test.ts
```

If strict-typing integration renames a historical producer test, use its final assembled equivalent and record the mapping.

D46 / D47:

```text
tests/economy-start-balance-v14.test.ts
tests/hard-work-bonus-mapping-v13.test.ts
tests/hard-work-package-catalog-runtime.test.ts
tests/hard-work-stat-cap-d24.test.ts
```

Lumber retirement:

```text
tests/lumber-stay-retirement-v17.test.ts
tests/presentation-ending-parity-v9.test.ts
tests/presentation-source-integrity-v9.test.ts
```

Localization / presentation:

```text
tests/ending-localization-closure-producer-v26.test.ts
tests/global-presentation-mapping-producer-v23.test.ts
```

Also run the exact final D42/global localization/presentation integrity/accessibility tests present on the frozen release head.

## 7. Focused-green-before-full-CI rule

The release gate order is fixed:

1. freeze the fully assembled release SHA/schema/catalog/registries;
2. portable package/fixture integrity;
3. typecheck + validate + build;
4. exact 23-case final migration closure;
5. focused adjacency roster;
6. classify and resolve any failures;
7. **only after the focused final closure is green**, allow Chat 2 to run the release lane's final full CI.

A historical producer being green does not permit skipping a FUTURE / FINAL_ASSEMBLY case on the assembled target.

## 8. Current release state

Live `main` observed while preparing this ledger:

`0f2119c6f90d64a81b8e9c008c654a6b46ba86d7`

The authoritative Leader queue still has Secret Debt + D51 as active production stage 1/5 and broad burn-down 5. Therefore the final release target is not assembled.

Current verdict:

- golden package contract: **PASS**
- release evidence ledger: **PASS**
- final assembled-target migration execution: **NOT-RUN**
- final focused closure: **NOT-RUN**
- final full CI: **NOT-RUN**
- product/runtime failure from missing future assembly: **NONE**
