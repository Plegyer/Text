# Chat 3 — Final Save / Migration Gate Prep v53

Status: **BUNDLE COMPLETE — READY FOR FINAL SAVE / MIGRATION GATE ASSEMBLY**  
Owner: Chat 3  
Branch: `chat3/final-save-migration-gate-prep-v51`

Primary authority:

`chat4/final-save-migration-closure-preflight-v21@1601be7b224f7b6687c4146c53d37499efb6a3f1`

This handoff closes v51-v53.

No production runtime/content was modified.

No full CI was run.

No claim is made that the final 23-case suite is executable-green before all release tranches are assembled into one schema/catalog.

---

# 1. Produced artifacts

## v51 fixture/source inventory

`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GATE_PREP_v51.md`

Commit:

`92da2c8f9a547d3e1cbd2e4eb12ee57955dace47`

## v52 test-only helper

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-save-migration-closure-v21.helpers.ts`

Commit:

`6bd2b3ce1459bde5bab1abc2337ffbf43fbb2aa3`

The helper is schema-agnostic and production-import-free.

It supplies:

- JSON clone/mutate helpers;
- parse-twice semantic idempotence assertion;
- exact-count / exactly-once helpers;
- protected-run snapshot;
- transaction snapshot;
- stable transaction assertion;
- stable run snapshot assertion.

## v52 executable contract

`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GATE_DESIGN_v52.md`

Commit:

`3e22d4e1ac193b9d8431231bcd1bc2a34c9d7985`

---

# 2. Final 23-case fixture/source matrix

| # | Case | Primary fixture/source authority | Final dependency class |
|---|---|---|---|
| 1 | schema ladder / parse-twice | current `migration.test.ts`, schema4/5 compatibility tests, Strong Meta migration tests | PARTIAL + schema1 fixture debt + final schema freeze |
| 2 | legacy ended -> one RunResult | current `ending-meta.test.ts`, `qa-exactly-once-reload.test.ts` | NOW |
| 3 | Strong Meta migration/protected merge | current `strong-meta-engine-integration-v7.test.ts`, `hard-work-meta-migration-v5.test.ts` | NOW + final registry recheck |
| 4 | D40 selected-route repair | current `d40-advanced-endings-tranche-b-v11.test.ts`, engine route repair table | NOW |
| 5 | D41 Tavern canonical migration | current `advanced-endings-tranche-a-v11.test.ts` | NOW |
| 6 | lumber-stay/vitality retirement | `chat5/lumber-stay-retirement-producer-v17@52bfd82...`, executable `39912e7...` | FUTURE + golden fixture debt |
| 7 | NightFlow atomic reload | current `night-flow.test.ts`, `qa-exactly-once-reload.test.ts` | NOW |
| 8 | Secret Debt default/typed roundtrip | `chat4/secret-debt-full-route-producer-v12@10a2ece...` | FUTURE |
| 9 | lender +10-day trap | same Secret Debt producer | FUTURE |
| 10 | forced Night + D51 queue | Secret Debt v12 + `chat3/secret-debt-activity-energy-compat-producer-v20@79a868b...` | FUTURE / combined |
| 11 | D51 provenance floor | D51 v20 focused T1-T11 | FUTURE |
| 12 | hidden work / repay / Takeover / ending ledger | Secret Debt v12 + final Strong Meta registry | FUTURE / final registry composition |
| 13 | Palace access without ledger | Palace v15/v18 tests | FUTURE + fixture debt |
| 14 | ambiguous Palace progression-complete | v21 doctrine + final Palace assembly | FUTURE / final semantic stop condition |
| 15 | Prince phases / explicit Return Home | `chat6/palace-prince-narrative-producer-v18@67f948d...` | FUTURE |
| 16 | Activity entry/route/RNG reload | current `activity.test.ts`, `qa-activity-option-reload.test.ts`, exactly-once tests | NOW |
| 17 | legacy Field Time / mini-game migration | D36 Activity producers | PARTIAL + historical golden fixture debt |
| 18 | neutral Camp default / partial reject | `chat4/activity-camp-baseline-repair-v19@efde0a...` | FUTURE |
| 19 | Camp boundary exactly-once | same Camp producer | FUTURE |
| 20 | Camp vs Secret Debt forced Night | Camp + Secret Debt + D51 | FUTURE / final composition only |
| 21 | D38 ending + canonical Specialist ownership | `chat3/activity-ending-family-producer-v16-r1@3cf69d7...` + final Strong Meta binding | FUTURE / final registry composition |
| 22 | D46 Lust + D47 package snapshot | `chat4/economy-start-balance-producer-v14@a0c5f85...` + `chat5/hard-work-bonus-mapping-producer-v13@252dc26...` | FUTURE / combined |
| 23 | D23 identity + content-only save neutrality | current D23 tests + final D38/Palace/localization/presentation stack | PARTIAL / final catalog only |

---

# 3. Exact future executable suite

Final integration test file:

`tests/final-save-migration-closure-v21.test.ts`

Exact top-level test names:

1. `case 01: schema ladder reaches one final schema and parse twice is idempotent`
2. `case 02: legacy ended run receives exactly one RunResult transaction`
3. `case 03: Strong Meta migration and protected profile merge never rewrite the current run`
4. `case 04: D40 selected-route repair is conservative and idempotent`
5. `case 05: D41 completed legacy Tavern migration canonicalizes once and Specialist ownership dedupes`
6. `case 06: retired lumber-stay vitality migration preserves history without creating a modern ending`
7. `case 07: NightFlow atomic reload matrix is exactly once at every phase`
8. `case 08: pre-Secret-Debt saves default unseen and typed Secret Debt states roundtrip exactly`
9. `case 09: Secret Debt lender acceptance and ten-day trap cannot replay or backdate forced Night`
10. `case 10: Secret Debt forced Night and D51 provenance queue are reload-safe`
11. `case 11: D51 compatibility is provenance-gated and never a global Energy floor`
12. `case 12: Secret Debt hidden-work repay Takeover and ending ledger never replay`
13. `case 13: old Palace access without Rich6 ledger gets neutral progression while access is preserved`
14. `case 14: ambiguous Palace progression-complete without duty proof is never fabricated into fifteen duties`
15. `case 15: Prince confrontation resumes exact authored phase and Return Home remains explicit`
16. `case 16: Activity entry route checkpoint and RNG reload do not recharge or reinterpret the envelope`
17. `case 17: legacy Activity Field Time and mini-game state migrate conservatively`
18. `case 18: old active Activity gets only the exact neutral Camp default and partial Camp state rejects`
19. `case 19: Camp atomic boundary reload matrix preserves two-night cap and exactly-once calendar and Field Time`
20. `case 20: Camp cannot suppress Secret Debt forced Night or lose the next-day Debt consequence`
21. `case 21: D38 Activity ending eligibility stays non-terminal and canonical Specialist reward ownership applies once`
22. `case 22: D46 existing Lust and D47 package snapshot preserve old lives and apply new packages once`
23. `case 23: D23 package identity and content-presentation-only tranches are save-neutral`

Detailed fixture construction and reload checkpoint requirements are frozen in v52.

---

# 4. Exact future focused roster

After all production tranches are assembled:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then run:

## Final closure

```text
tests/final-save-migration-closure-v21.test.ts
```

## Core migration / transaction / Meta

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

Use the final assembled equivalent if historical test filenames were ported during strict-typing repair.

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

plus the final assembled D42 / global localization / presentation integrity and accessibility suites that exist on the actual release head.

Only after this focused closure is green should Chat 2 run its one release full CI.

---

# 5. Missing-fixture blockers

These are test-input blockers, not currently proven product defects.

## F1 — genuine schema1 golden

Runtime contains explicit schema1 migration entry, but no dedicated schema1 fixture/test exists.

Release suite needs a historically valid schema1 save.

## F2 — real pre-Field-Time Activity envelope

Need one preserved real envelope from before:

- `fieldTimeRemaining`;
- `miniGames`.

Do not create this by stripping fields from a final envelope.

## F3 — Palace access-without-ledger historical raw

Need one old-shape fixture with:

`palace.access-granted`

and no typed Rich6 Palace ledger.

## F4/F5 — lumber-stay completed goldens

Need:

- completed old `lumber-stay` with existing modern RunResult/transaction;
- completed old `lumber-stay` without modern RunResult.

Existing producer inline tests prove behavior, so this is release fixture hardening.

---

# 6. Product-failure vs stale fixture/test debt

## Product failure

Classify as product/runtime failure if the fully assembled target:

- applies a payment/reward twice;
- changes RNG/pending identity after reload without authority;
- silently invents Secret Debt state;
- silently invents Camp progress;
- silently invents Palace duty progress;
- fabricates Prince defeat from readiness;
- auto-commits D38/Palace/ordinary ending from eligibility;
- rebuilds current-run Strong Meta snapshot from newer profile ownership/preferences;
- retroactively applies D47 package bonuses to an already-complete old life;
- rewrites stored old Lust to D46 fresh default;
- converts lumber-stay/vitality into a modern ending or Strong Meta/Hard Work slot;
- duplicates canonical D38/Secret Debt Strong Meta reward in generic unlock ownership;
- lets content/presentation-only layers mutate save mechanics;
- accepts incompatible Activity/Camp state that the contract requires to reject;
- has no explicit approved behavior for ambiguous Palace `progression-complete` without duty proof.

## Fixture/test debt

Classify as fixture/test debt if:

- historical fixture is absent but producer behavior has accepted executable evidence;
- test references a retired ID that final migration intentionally removes;
- historical test expects old generic unlock ownership where final canonical Strong Meta binding is accepted;
- strict TypeScript fails only because an old test accesses now-optional catalog fields without narrowing;
- expected catalog count is stale after accepted retirement/addition;
- presentation/localization test expects a replaced fallback asset/string while mechanics are unchanged;
- current main lacks a future tranche that the final closure case explicitly depends on.

Do not reopen accepted Product behavior for fixture/test debt.

---

# 7. Post-integration recheck requirements

Immediately before materializing `final-save-migration-closure-v21.test.ts`:

## A. Freeze exact release candidate

Record:

- exact branch;
- exact SHA;
- global `schemaVersion`;
- catalog definitions version;
- Strong Meta registry version;
- Activity local version fields.

## B. Re-enumerate stable IDs

Confirm final presence/retirement semantics for:

- D40/D41 endings;
- D38 endings/rewards;
- Secret Debt endings/rewards;
- Palace endings/Prince IDs;
- all ten Hard Work package IDs;
- retired `lumber-stay` / `vitality`;
- `legacy.lumber-stay.vitality`.

## C. Re-fetch shared schemas

Inspect final:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/strongMeta.ts`
- `src/core/secretDebt.ts`
- `src/core/palace.ts`
- Activity envelope schema.

Do not use historical producer file shapes as final truth.

## D. Recheck reward ownership

Verify D38 + Secret Debt rewards use canonical Strong Meta ownership and are not duplicated in generic unlocks.

## E. Recheck current-run immutability

Verify profile merge cannot rewrite:

- `run.strongMetaSnapshot`;
- `run.strongMetaRuntime`;
- active Hard Work package snapshot.

## F. Materialize fixture debt

Before declaring release gate complete, source F1-F5 from historical authority or explicit accepted reconstruction.

If a genuine historical source cannot be found, document the reconstruction and its authority rather than silently calling it genuine.

## G. Re-run content-neutrality comparison

Use one representative save before/after final:

- D38 v17;
- Palace v19/D48;
- ending/global localization;
- global presentation mapping.

Assert save mechanics identical.

---

# 8. Final stop conditions

Stop the release save/migration gate if:

- final public schema epoch is not frozen;
- two incompatible meanings share one public schema version;
- any case is skipped because its producer “used to be green”;
- a future-only case is incorrectly marked PASS on a branch where the subsystem is absent;
- a missing historical fixture is replaced with an arbitrary synthetic final-schema mutation;
- a failing exactly-once test is “fixed” by compensating after duplicate application;
- a migration infers state forbidden by v21;
- a rejection case is weakened into neutral default without authority;
- final RunResult/transaction identity changes across second load;
- protected profile merge rewrites current-run state;
- D38/Secret Debt reward ownership remains duplicated;
- lumber-stay retirement fabricates a modern completion;
- case 14 neither has an approved mapping nor explicit rejection;
- content/presentation-only tranche changes mechanical save state;
- focused closure is red.

Do not proceed to release full CI while any stop condition remains.

---

# 9. What is intentionally not claimed

This branch does not claim:

- all 23 cases pass current main;
- the final public schema remains version 6;
- Secret Debt, Palace, Camp, D38, D46/D47 or lumber retirement are already integrated;
- final save compatibility is closed.

It claims only:

- the exact 23-case release contract is fully inventoried;
- existing fixture/source authorities are mapped;
- fixture debt is separated from runtime behavior;
- exact future test names/checkpoints/assertions are specified;
- safe reusable test-only helpers are authored.

---

# 10. Final disposition

v51 fixture/source inventory: **COMPLETE**

v52 executable gate design: **COMPLETE**

v52 test-only helper: **AUTHORED**

v53 handoff: **COMPLETE**

Production mutation: **NONE**

Full CI: **NOT RUN**

**BUNDLE_COMPLETE — READY_FOR_FINAL_SAVE_MIGRATION_GATE_ASSEMBLY**
