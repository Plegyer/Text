# Chat 3 — Final Save / Migration Gate Prep v51

Status: **FIXTURE / SOURCE INVENTORY COMPLETE**  
Owner: Chat 3  
Branch: `chat3/final-save-migration-gate-prep-v51`

Primary authority:

`chat4/final-save-migration-closure-preflight-v21@1601be7b224f7b6687c4146c53d37499efb6a3f1`

Observed preparation base:

`main@99e52051845ce966a769939521d01687830a3240`

No production runtime/content is changed by v51.

## Legend

- **NOW** — executable source/fixture already exists on current main.
- **PARTIAL** — current-main anchor exists, but final case needs a later tranche.
- **FUTURE** — authoritative fixture/behavior exists only on a frozen producer until assembly.
- **FIXTURE-DEBT** — production path exists, but the final closure still needs an explicit historical fixture/golden envelope.
- **FINAL-ASSEMBLY** — the assertion is meaningful only after all tranches share one schema/catalog.

Absence of a future tranche from current main is **not** a product failure.

---

# Shared helper/source surface

Current `tests/helpers.ts` exports:

- `definitions`
- `rawPacks`
- `catalog`
- `created`
- `started`
- `act`
- `sequence`

Relevant producer branches retain the same helper API.

Most current migration tests build legacy saves inline rather than from standalone JSON fixture files. The final gate may reuse those inline builders where provenance is clear.

---

# 23-case fixture / source matrix

| # | Closure case | Existing source / fixture anchors | Stable IDs / fields | Dependency / runnable class | Missing fixture vs missing behavior |
|---|---|---|---|---|---|
| 1 | schema ladder reaches one final schema; parse twice idempotent | `tests/migration.test.ts` (`rawV3`, genuine schema2), `late-career-schema4-compat.test.ts`, `hard-work-meta-migration-v5.test.ts`, `strong-meta-engine-integration-v7.test.ts`, current `freshSave` schema6 | `schemaVersion`, pending `eventId/variantId`, RNG, journal | **PARTIAL / FIXTURE-DEBT** | Runtime has explicit 1→2→3→4→5→6 ladder. Dedicated genuine schema1 golden fixture is absent; schema2/3/4/5 are already constructible. Final public schema must be frozen first. |
| 2 | legacy ended run gets exactly one RunResult transaction | `tests/ending-meta.test.ts`: “pre-A6 ended schema4 save…”; `qa-exactly-once-reload.test.ts` | `resultId`, `transactionId`, `meta.appliedResultTransactions` | **NOW** | No missing behavior known. Final test should reuse deterministic identity assertions. |
| 3 | Strong Meta migration / protected profile merge never rewrites current run | `strong-meta-engine-integration-v7.test.ts` schema5 incomplete/completed + protected import; `hard-work-meta-migration-v5.test.ts` | `meta.strongMeta`, `run.strongMetaSnapshot`, `run.strongMetaRuntime`, `registryVersion='legacy-v5'` | **NOW**, then **FINAL-ASSEMBLY** for later reward IDs | No fixture blocker. Re-run after D38/D39/Secret Debt registry union. |
| 4 | D40 selected-route repair conservative/idempotent | `d40-advanced-endings-tranche-b-v11.test.ts`; current `D40_SELECTED_ROUTE_FACT_BY_STAGE` in `engine.ts` | `ending-route-*-selected` facts for Guard/Merchant/Artist-Geisha/Assassin/Prostitute | **NOW** | No missing behavior known. Final matrix should table route-specific stage, generic ready-only and overlapping selected facts. |
| 5 | D41 completed legacy Tavern canonicalizes once; Specialist ownership dedupes | `advanced-endings-tranche-a-v11.test.ts` migration cases | retired `tavern-stay`, `tavern-guild`, `tavern-court`; canonical `ending.tavern.innkeeper`, `.sanctuary`, `.information-broker`; D41 Specialist IDs | **NOW** | Existing completed fixture is strong; final suite should add explicit eligible-only + committed-unfinished rows if not already isolated. Fixture extension only. |
| 6 | retired lumber-stay / vitality preserves history without modern ending | `chat5/lumber-stay-retirement-producer-v17@52bfd82...`; `tests/lumber-stay-retirement-v17.test.ts`; executable repair `39912e7...` | `lumber-stay`, `vitality`, `legacy.lumber-stay.vitality` | **FUTURE** | Producer behavior exists and is green. Final closure still benefits from two golden historical saves: one with RunResult, one pre-RunResult. **FIXTURE-DEBT**, not product gap. |
| 7 | NightFlow atomic reload matrix exactly once at every phase | `tests/night-flow.test.ts`; `qa-exactly-once-reload.test.ts` | Night phases; `lodgingPaymentCommitted`, `selectedNightChoiceId`, `calendarAdvanceCommitted`, pending event/variant, next-day tags | **NOW** | No missing behavior known. Final gate should expand checkpoints into one table-driven test. |
| 8 | pre-Secret-Debt defaults unseen; typed states roundtrip | `chat4/secret-debt-full-route-producer-v12@10a2ece...`; `secret-debt-full-route-v12.test.ts` schema5 migration | status `unseen/refused/accepted/bound/paid-freedom/takeover`; typed `run.secretDebt` | **FUTURE** | Producer has neutral migration and typed states. Current main absence is integration state, not failure. Final schema6 “field absent” fixture must be captured after Secret Debt assembly. |
| 9 | lender acceptance +10-day trap cannot replay/backdate forced Night | same v12 producer; `acceptLenderOnDayZero`, deterministic lender RNG tests | `secret-debt.lender-encounter`, +2000, `acceptedDay`, `trapDay`, `boundDay` | **FUTURE** | Existing producer fixtures cover roll/accept/trap. Final closure must add reload at day9/day10 around activation in assembled Night flow. |
| 10 | forced Night + D51 provenance queue reload-safe | v12 + `chat3/secret-debt-activity-energy-compat-producer-v20@79a868b...`; D51 T4/T5/T6 tests | `secret-debt.forced-night`; tags `lodging.street.energy-penalty`, `secret-debt.bound-night` | **FUTURE** | Behavior exists in producers, final combined fixture only possible after Secret Debt+D51 assembly. |
| 11 | D51 provenance-gated compatibility, not global floor | `secret-debt-activity-energy-compat-v20.test.ts` T1–T11 | same two provenance tags; base Energy 3/4; unrelated third -1 | **FUTURE** | No known missing behavior. Final test must preserve current producer matrix verbatim. |
| 12 | hidden-work / repay / Takeover / ending ledger never replays | v12 `secret-debt-full-route-v12.test.ts` | `secret-debt.hidden-work`, `.repay`, `.takeover`; endings `ending.secret-debt.paid-freedom`, `.bound-life`, `.takeover`; canonical reward IDs | **FUTURE / FINAL-ASSEMBLY** | Runtime producer exists. Canonical Strong Meta reward binding must be verified after registry composition; do not treat historical generic unlock form as final. |
| 13 | old Palace access without Rich6 ledger gets neutral progression | Palace v15/v18 producers; `palace-rich6-runtime-v15.test.ts` schema5 neutral Palace state + D23 access tests | `palace.access-granted`, `run.progression.palace`, obsolete meta unlock `palace` | **FUTURE / FIXTURE-DEBT** | Neutral Palace state behavior exists, but exact “typed access fact present / Palace ledger absent” historical fixture is not isolated. Add final golden inline/JSON fixture after Palace assembly. |
| 14 | ambiguous `palace.progression-complete` without duty proof never fabricates 15 duties | Palace v15/v18 authority; v21 explicit rejection-or-approved-mapping rule | `palace.progression-complete`; 15 duty IDs | **FUTURE / FINAL-ASSEMBLY** | This is not currently runnable. Final assembly must either implement one explicitly documented historical mapping or reject with a specific compatibility error. If neither exists on final target, that is a **product failure**, not fixture debt. |
| 15 | Prince confrontation resumes authored phase; Return Home explicit | `palace-prince-narrative-producer-v18@67f948d...`; `palace-prince-narrative-producer-v18.test.ts`, renderer test | action `palace.confront-prince`; quest `palace.prince-confrontation`; fact `palace.prince-defeated`; ending `ending.palace.return-home` | **FUTURE** | Strong producer fixtures exist. Final closure needs serialized phase 1/2/3/4 checkpoints on assembled catalog. |
| 16 | Activity entry / route / checkpoint / RNG reload does not recharge/reinterpret envelope | current `activity.test.ts`, `qa-activity-option-reload.test.ts`, `qa-exactly-once-reload.test.ts` | `entryEnergyCommitted`, `definitionVersion`, `adapter='counter.v1'`, `routeId`, `resolvedOptionIds`, `checkpoint`, activity RNG | **NOW** | No missing behavior known. Re-run against final definitions. |
| 17 | legacy Activity Field Time / mini-game migration conservative | D36 producers `restricted-sites-production-v15`, `trade-corridor-production-v13`, `anomalous-reach-production-v14`; final Activity preflight authority | `fieldTimeRemaining`, `miniGames`, mini-game suspicion/status/choiceIds | **PARTIAL / FIXTURE-DEBT** | Need at least one preserved real pre-Field-Time production envelope and one modern non-zero-suspicion envelope. This is historical fixture debt; do not synthesize from final schema and call it historical. |
| 18 | old active Activity gets neutral Camp default; partial Camp rejects | `chat4/activity-camp-baseline-repair-v19@efde0a...`; `activity-camp-persistence-v17.test.ts` | `campStateVersion=1`; `campState`; phases `idle/chosen/calendar_advanced/field_day_ready` | **FUTURE** | Producer test already covers both-fields-absent neutral migration and partial/incompatible rejection. Final assembled schema fixture must be recaptured, not rewritten. |
| 19 | Camp atomic boundary reload matrix, two-night cap, exactly-once calendar/Field Time | same Camp repair test | `nightsUsed`, `boundaryDay`, `calendarAdvanceCommitted`, `fieldTimeRefreshCommitted` | **FUTURE** | Existing 7/7 Camp suite supplies helper shapes. Final matrix should retain checkpoints before choice, chosen, calendar_advanced, field_day_ready, first/second/third night. |
| 20 | Camp cannot suppress Secret Debt forced Night / lose next-day Debt consequence | Camp repair + Secret Debt v12 + D51 v20 | Camp state + `secret-debt.forced-night` + D51 tags | **FUTURE / FINAL-ASSEMBLY** | No isolated branch can prove final composition. Missing current executable is expected. Failure only meaningful on assembled Activity+Camp+SecretDebt+D51 target. |
| 21 | D38 eligibility non-terminal; canonical Specialist ownership once | `activity-ending-family-producer-v16-r1@3cf69d7...`; `activity-ending-family-v16.test.ts`; final Strong Meta registry assembly | endings `ending.activity.pathfinder`, `.preservation`, `.network`; rewards `specialist.activity.surveyors-atlas`, `.field-archive`, `.contact-network` | **FUTURE / FINAL-ASSEMBLY** | Historical v16 uses generic unlock seam. Final test must assert canonical `strongMeta` ownership only after assembly; historical branch alone is not a release failure. |
| 22 | D46 Lust + D47 package snapshot preserve old lives / apply once | `chat4/economy-start-balance-producer-v14@a0c5f85...`; `economy-start-balance-v14.test.ts`; `chat5/hard-work-bonus-mapping-producer-v13@252dc26...`; `hard-work-bonus-mapping-v13.test.ts`; current `hard-work-meta-migration-v5.test.ts` | fresh Lust 5; stored Lust unchanged; `activeHardWorkPackages`; `hardWorkPackagesApplied`; Prostitute package Sexuality+5/Charm+5/Lust+5 | **FUTURE / FINAL-ASSEMBLY** | Existing producers cover each side. Final combined fixture must prove no retroactive D47 and D46 fresh-only Lust rule together. |
| 23 | D23 package identity + content/presentation-only tranches save-neutral | current `palace-d23-consumer-integration-v8.test.ts`, `hard-work-package-catalog-runtime.test.ts`; future D38 v17, Palace v19, localization v26, global presentation v23 | ten ordinary package identities; Strong Meta snapshot/slots; stable pending/RNG/transaction IDs | **PARTIAL / FINAL-ASSEMBLY** | Mechanical D23 identity rule is NOW; save-neutral comparison requires final content layers. No runtime mutation should be added merely to satisfy this case. |

---

# Key fixture-debt register

## F1 — genuine schema1 save

Current `parseSave` explicitly supports schema1 -> schema2, but no dedicated schema1 test/golden fixture is present.

Required final fixture must carry only historically valid schema1 fields.

Do not manufacture a “schema1” fixture by taking final schema6 and deleting arbitrary fields.

## F2 — real pre-Field-Time Activity envelope

Preserve a real historical envelope from before:

- `fieldTimeRemaining`;
- `miniGames`.

Required to prove the migration default is historically justified.

## F3 — Palace access-without-ledger

Need one exact old-shape fixture containing legitimate:

`palace.access-granted`

but no typed Rich6 Palace ledger.

## F4/F5 — retired lumber-stay goldens

Keep:

1. historical completed `lumber-stay` with existing RunResult/transaction;
2. historical completed `lumber-stay` without modern RunResult.

The producer already proves behavior inline; the final release suite should retain explicit goldens.

---

# Stable-ID firewalls

The final closure test must assert IDs, not localized labels.

## Secret Debt

- `secret-debt.lender-encounter`
- `secret-debt.forced-night`
- `secret-debt.hidden-work`
- `secret-debt.repay`
- `secret-debt.takeover`
- `ending.secret-debt.paid-freedom`
- `ending.secret-debt.bound-life`
- `ending.secret-debt.takeover`

Rewards:

- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

## Palace

- `palace.access-granted`
- `palace.progression-complete`
- `palace.confront-prince`
- `palace.prince-confrontation`
- `palace.prince-defeated`
- `ending.palace.return-home`

## Activity endings

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

Rewards:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

## Lumber retirement

- historical ending `lumber-stay`
- historical unlock `vitality`
- canonical legacy perk `legacy.lumber-stay.vitality`

## Activity envelope

- `adapter='counter.v1'`
- `definitionVersion`
- `campStateVersion=1`

---

# v51 disposition

No new missing save-state subsystem was discovered.

Concrete missing inputs are test-fixture debt:

- genuine schema1;
- preserved pre-Field-Time Activity envelope;
- explicit Palace access-without-ledger historical shape;
- two golden retired lumber-stay completed states.

Case 14 remains a final-assembly semantic stop condition: ambiguous Palace completion must have an explicit approved mapping or explicit rejection. It must never be guessed.

**v51 COMPLETE — CONTINUE TO v52**
