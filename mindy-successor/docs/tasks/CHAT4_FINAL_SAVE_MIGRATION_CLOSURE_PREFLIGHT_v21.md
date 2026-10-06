# Chat 4 — Final Save / Migration Closure Preflight v21

Status: **READY_FOR_FINAL_CLOSURE**  
Owner: Chat 4  
Branch: `chat4/final-save-migration-closure-preflight-v21`

This is a **research / preflight contract only**.

No production runtime is changed by v21.  
No full CI is run by v21.

The purpose of this document is to replace the earlier v16 save/migration audit with the exact final 1.0 closure matrix after the previously missing Activity Camp state was implemented and executable-green.

---

# 1. Inputs and frozen authorities

This preflight uses the following accepted/frozen inputs.

## Activity / Camp / D38

- four-region D36 Activity baseline:
  `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- Camp persistence producer:
  `chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`
- executable-green Camp repair candidate:
  `efde0a38bf71a8946194402a9fc47abb168f2aff`
  - workflow `374615552`
  - run `37206785081`
  - job `111449513323`
  - focused result **107/107 PASS**
  - Camp-specific result **7/7 PASS**
- D38 mechanics:
  `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 final content/presentation:
  `chat3/activity-ending-content-presentation-v17@df9ef5c3d04cfd8eb582c24838d971854e984218`

## Secret Debt / D51

- Secret Debt v12:
  `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- D51 compatibility producer:
  `chat3/secret-debt-activity-energy-compat-producer-v20@79a868bf30af2c162b2ea1323759dffad5e8dadf`
- D51 exact-head QA:
  - workflow `374608518`
  - run `37205501396`
  - job `111445731393`
  - focused result **58/58 PASS**
- assembly preflight:
  `chat3/secret-debt-d51-assembly-preflight-v22@49fb8209ddfbc869ebe34ab155ead1afbf8c5c2c`

## Palace

- Palace Prince narrative mechanics:
  `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`
- final Palace prose/media:
  `chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`

v19 is content/presentation-only over v18 and does not change engine/schema mechanics.

## D46 / D47

- frozen D46 producer:
  `chat4/economy-start-balance-producer-v14@a0c5f855b63d3bb85556f5b2780aaaabb58fbced`
- D46 executable-green runtime candidate:
  `ebc57577d1830d1d0fe115e02d01db079af57fe2`
  - focused result **59/59 PASS**
- frozen D47 producer:
  `chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`
- D47 exact-head QA:
  `chat5/qa-d47-hard-work-mapping-v13@db827e7ed481e769b01ce1145c5f719c480c1e00`
  - run `37200203160`
  - job `111430151532`
  - typecheck / validate / build PASS
  - focused executable result **103/103 PASS**

## Lumber-stay retirement

- producer branch:
  `chat5/lumber-stay-retirement-producer-v17@52bfd82b374ed045b06c9c78f5f3065cd7226bdb`
- executable verification target:
  `39912e7435c3707d98f96fe550d697c20ac0bedb`
- focused run `37206223034`
- focused job `111447848659`
- typecheck / validate / build PASS
- retirement suite **9/9 PASS**
- ending/migration adjacency **31/31 PASS**
- presentation retirement adjacency **15/15 PASS**
- Strong Meta / Palace / Hard Work / Secret Debt isolation **20/20 PASS**

## Localization / presentation

- ending localization closure:
  `chat6/ending-localization-closure-producer-v26@22253d6fdc1f160e12a457b1ab159dc52d5fa7b0`
  - executable-green localization commit:
    `d12ada2122ce5f6ad94a978d63eaab613ae51c19`
  - run `37206576563`
  - job `111448896851`
  - focused result **19/19 PASS**
- global presentation mapping:
  `chat6/global-presentation-mapping-producer-v23@f25069c369c449ce0efbfe57acf877f950b1dfea`
  - presentation-only
  - +93 explicit slots
  - no engine/schema/definitions/localization mechanics changes

---

# 2. Executive verdict

The v16 P0 blocker is closed.

The previous audit found that multi-day Activity Camp had no persisted state. That is no longer true:

- Camp now has explicit typed persisted state;
- neutral old-save migration exists;
- partial/incompatible Camp state rejects;
- two-night cap persists;
- calendar advance is exactly once;
- Field Time refresh is exactly once;
- forced before-lodging Secret Debt Night preempts Camp;
- the executable-green v19 focused gate proves the relevant Activity/Night/migration adjacency.

## Final v21 verdict

**No known missing save-state subsystem remains from the accepted 1.0 producers.**

The remaining release risk is **composition**, not a missing model.

The four highest-risk final assembly seams are:

1. composing Secret Debt typed state and D51 into the canonical schema-6 / Strong Meta / Night start-day path;
2. preserving local Activity version gates, especially `campStateVersion`, without inferring historical Camp progress;
3. composing retired `lumber-stay` / `vitality` normalization with protected Meta merge and result transactions;
4. binding historical producer reward seams, especially D38 and Secret Debt, into the one canonical Strong Meta ownership registry without duplicate generic unlock ownership.

A public 1.0 candidate is save-closure-ready only when the exact 23-case matrix below passes against the **fully assembled final schema/catalog**, not against isolated producer branches.

---

# 3. Final schema/version doctrine

## 3.1 One public schema epoch

The canonical current runtime before the final queued tranches is schema **6**.

The accepted late producers do not independently justify parallel global schema epochs:

- D46 changes fresh defaults/economy, not old-save meaning;
- D47 uses existing Hard Work package snapshot fields;
- D38 v16/v17 is definitions/localization/presentation plus canonical Strong Meta binding work at assembly;
- Palace v18 uses existing quest/pending/reaction state and requires no schema bump;
- Palace v19 is presentation/content only;
- localization v26 is localization only;
- global presentation v23 is presentation only;
- Camp uses a **local** `campStateVersion: 1`;
- Activity already has `definitionVersion`;
- Strong Meta snapshot has its own registry/snapshot identity;
- ending completion has stable transaction identity.

Secret Debt v12 was authored on an older historical branch and must be selectively composed into the canonical schema-6 shape rather than replacing it.

### Required final rule

Before public 1.0, Chat 2 must freeze one exact public save shape.

If the final assembly keeps `schemaVersion: 6`, all newly required late fields must have deterministic pre-1.0 default/migration behavior and the exact final shape becomes the public schema-6 contract.

If Chat 2 intentionally increments the global schema version during final assembly, the 23 cases remain identical semantically, but fixtures must traverse the explicit new migration step.

What is forbidden is silently having multiple incompatible meanings of the same public version after 1.0.

## 3.2 Local version gates that must survive

Do not collapse these into generic inference:

- Activity `definitionVersion`;
- Activity adapter identity;
- Activity `campStateVersion = 1`;
- Strong Meta snapshot registry version;
- stable RunResult / transaction identity;
- stable content IDs for pending scenes and ending results.

---

# 4. Cross-system defaulting risks

## Safe neutral defaults

When the corresponding historical carrier is absent, final migration should default to:

- no active NightFlow;
- no active Activity;
- neutral Camp state only through the explicit Camp old-envelope migration rule;
- Secret Debt `unseen`;
- empty Strong Meta ownership/knowledge for legacy schema-5 state;
- no active Strong Meta run snapshot before creation;
- no inferred Palace duty progress;
- no Prince defeat;
- no D40/D38 selected ending route;
- no active D47 package selection for an already-running pre-package life.

## State that must never be guessed

Never infer:

- Secret Debt acceptance/bound state from legacy debt, Street, money, Lust or text;
- Camp progress from day delta, Field Time, checkpoint or route;
- Palace duty count from stage or `palace.progression-complete`;
- Prince defeat from 12x91 readiness;
- D40/D38 route selection from eligibility/readiness;
- Strong Meta ownership from generic unlocks / rule modifiers / legacy perks;
- current-run Strong Meta selection from future profile preferences;
- Hard Work active package subset from permanent earned packages;
- modern canonical ending from retired `lumber-stay`;
- historical `vitality` into a Keystone, Specialist or Hard Work package.

Ambiguous active state must reject with a specific compatibility error rather than inventing progress.

---

# 5. Exact final 23-case migration / reload matrix

The final integration suite should be named:

`tests/final-save-migration-closure-v21.test.ts`

The 23 top-level cases below are the required acceptance matrix.

| # | Exact case | Required fixture/checkpoint | Required result |
|---|---|---|---|
| **1** | **schema ladder reaches one final schema and parse-twice is idempotent** | genuine schema 1/2/3/4/5 fixtures plus a pre-late-tranche schema-6 fixture | every supported fixture reaches the one final schema; journal/pending/RNG survive; parse -> serialize -> parse is semantically identical; neutral late fields are deterministic |
| **2** | **legacy ended run receives exactly one RunResult transaction** | old ended+committed save missing modern RunResult/proof | deterministic RunResult/result ID and one transaction proof only; second load changes nothing; no extra Meta reward |
| **3** | **Strong Meta migration and protected profile merge never rewrite the current run** | schema-5 incomplete creation, schema-5 completed creation, imported Meta merged with newer currentMeta | empty ownership is not inferred; completed old life gets the legacy compatibility snapshot; permanent ownership/knowledge unions, current profile preference wins, current-run snapshot/runtime remain frozen |
| **4** | **D40 selected-route repair is conservative and idempotent** | table over route-specific legacy stages, generic outcome-ready with readiness facts only, and overlapping selected facts | exact one-to-one historical stage may add its matching selected fact once; generic readiness adds none; overlapping selections survive |
| **5** | **D41 completed legacy Tavern migration canonicalizes once and Specialist ownership dedupes** | completed legacy Tavern result, eligible-only legacy ID, committed-but-unfinished legacy ID, repeated load/profile merge | completed result maps to canonical ID; eligibility-only is retired; unfinished commit reopens active; exact pending Specialist ownership enters the canonical Strong Meta registry once |
| **6** | **retired lumber-stay / vitality migration preserves history without creating a modern ending** | eligible-only lumber-stay, committed unfinished lumber-stay, historical completed lumber-stay with/without modern RunResult, legacy vitality ownership, profile merge | no live lumber-stay; no modern ending is fabricated; historical result/transaction identity is preserved; old pre-RunResult completion gets deterministic compatibility proof; `legacy.lumber-stay.vitality` exists at most once and preserves exactly +1 daily Energy |
| **7** | **NightFlow atomic reload matrix is exactly once at every phase** | before lodging, after lodging payment, pending forced event, voluntary choice, queued next-day modifier, after calendar commit | no duplicate lodging payment, no pending reroll, no repeated next-day effect, calendar +1 once, handled event/intercept/selected choice survive |
| **8** | **pre-Secret-Debt saves default unseen and typed Secret Debt states roundtrip exactly** | schema-6 save with no Secret Debt field plus unseen/refused/accepted/bound/paid-freedom/takeover typed states | absent historical state -> exact neutral unseen; existing typed state preserved; no inference from generic debt/Street/money/Lust |
| **9** | **Secret Debt lender acceptance and +10-day trap cannot replay or backdate a forced Night** | before lender roll, pending lender encounter, immediately after +2000 acceptance, day 9, exact trap day 10, reload at each point | lender RNG/attempt is not rerolled; +2000 applies once; trap occurs exactly +10 days; activation writes bound state once; no bound-night penalty is retroactively invented for the preceding Night |
| **10** | **Secret Debt forced Night + D51 provenance queue is reload-safe** | already-bound Night under normal/cheap/Street; Street+bound tags queued before start day; reload before start-day processing | forced before-lodging Night keeps absolute priority; D42/ordinary voluntary Night is suppressed; Street and bound tags survive reload; queue clears once; calendar advances once |
| **11** | **D51 compatibility is provenance-gated, not a global Energy floor** | base Energy 3 and 4 with Street tag + bound tag, each tag alone, both tags + unrelated -1 | both locked penalties are honored; simultaneous Street+bound yields usable 2 where specified; unrelated -1 may reduce to 1; housing state alone cannot activate D51 |
| **12** | **Secret Debt hidden-work / repay / Takeover / ending ledger never replays** | hidden-shift 49/50 and 74/75 boundaries, immediate post-20000 repayment, immediate post-Takeover, committed and completed each Secret Debt ending | shift/wage increments once, full repayment once, Takeover transition once, ending reward/transaction once; no generic duplicate unlock reward beside canonical Strong Meta ownership |
| **13** | **old Palace access without Rich6 ledger gets neutral progression while access is preserved** | legitimate typed `palace.access-granted` but no `run.progression.palace`; obsolete generic meta unlock `palace` may also exist | preserve legitimate access fact; remove obsolete generic unlock; create exact neutral Palace ledger; do not infer duty count/stage advancement |
| **14** | **ambiguous Palace progression-complete without duty proof is never fabricated into fifteen duties** | old save has `palace.progression-complete` but lacks exact Rich6 committed-duty proof | either one explicitly documented historical mapping is used or load rejects with a specific incompatibility; never synthesize 15 duty IDs/counters |
| **15** | **Prince confrontation resumes exact authored phase and Return Home remains explicit** | 12x91 ready-but-undefeated, pending phase 1/2/3/4, back-out/failure, immediate post-success | readiness alone does not defeat Prince; pending quest/choice snapshot resumes exactly; back-out writes no success; `palace.prince-defeated` writes once; Return Home remains eligible-but-uncommitted until explicit D16 commit; completion transaction applies once |
| **16** | **Activity entry / route / checkpoint / RNG reload does not recharge or reinterpret the envelope** | immediately after 2-Energy entry, after route selection, after an option, before result/escape | entry Energy remains committed exactly once; route/checkpoint/RNG/resolved options persist; incompatible definitionVersion/adapter rejects rather than reinterprets |
| **17** | **legacy Activity Field Time and mini-game state migrate conservatively** | real pre-Field-Time production envelope with missing `fieldTimeRemaining` / `miniGames`; modern non-zero suspicion mini-game | old fixture receives only the historically proven Field Time fallback and `miniGames={}`; modern stage/status/choiceIds/suspicion roundtrip exactly; no transition replay |
| **18** | **old active Activity gets only the exact neutral Camp default; partial Camp state rejects** | old active envelope with both Camp fields absent; modern envelope with one of `campStateVersion` / `campState` missing; incompatible phase/commit flags | true old envelope -> exact neutral Camp state; partial/new incompatible shape rejects; no inference from day/checkpoint/Field Time |
| **19** | **Camp atomic boundary reload matrix preserves two-night cap and exactly-once calendar / Field Time** | before choosing Camp, `chosen`, `calendar_advanced`, `field_day_ready`, after first Camp, after second Camp, attempted third | no city lodging charge or ordinary city Night; each Camp increments calendar once; Field Time refreshes once; global daily Energy is not refreshed by Camp; two-night limit survives reload; third rejects |
| **20** | **Camp cannot suppress Secret Debt forced Night or lose the next-day Debt consequence** | bound Activity at Camp boundary, including Street case and reload before/after interception | forced before-lodging Debt Night preempts Camp before Camp calendar commit; Activity continuation terminates according to D36; NightFlow owns the boundary once; bound next-day tag survives into D51 processing; no duplicate lodging/calendar/Field-Time processing |
| **21** | **D38 Activity ending eligibility stays non-terminal and canonical Specialist reward ownership applies once** | eligible Pathfinder/Preservation/Network states, commit checkpoint, completion checkpoint, second load/profile merge | eligibility never auto-commits; stable ending IDs survive; stable Specialist IDs bind into canonical Strong Meta ownership, not duplicate generic unlock ownership; reward is applied only on completed ending transaction and dedupes |
| **22** | **D46 existing Lust + D47 package snapshot preserve old lives and apply new packages once** | legacy Lust 1, typed arbitrary Lust 17, fresh post-D46 life, pre-D47 migrated completed life, pre-finish selected D47 subset, post-finish subset including Prostitute | old stored Lust remains unchanged; only fresh life starts at 5; legacy life receives no retroactive D47 bonuses; selected package identities persist; package components apply atomically once; Prostitute Sexuality +5 / Charm +5 / Lust +5 remain one package identity |
| **23** | **D23 package identity + content/presentation-only tranches are save-neutral** | all-ten active package New Start+, same serialized save loaded with final D38 v17 / Palace v19 / localization v26 / presentation v23 content present | D23 counts ten active profession package identities, not bonus components; Strong Meta slots remain separate; localization/presentation additions change no mechanical ID, Save field, RNG, reward, pending state or transaction; parse/serialize result is unchanged except approved content-reference validation |

---

# 6. Exactly-once risk ledger

These are the atomic boundaries that must have a before/after reload assertion in the final suite.

## Money / economy

- Secret Debt lender +2000;
- lodging payment;
- ordinary work wage;
- Secret Debt hidden-work wage;
- Secret Debt full 20000 repayment;
- Strong Meta Reserve Match payments;
- Network Retainer daily payment;
- no retired Merchant +600 reward;
- no replayed lumber-stay historical reward.

## Energy

- Activity 2-Energy entry;
- Night next-day modifiers;
- Street Energy -1;
- Secret Debt bound-night Energy -1;
- D51 provenance pair;
- Work Rhythm start-day Energy;
- unrelated third penalty after D51;
- legacy `lumber-stay` +1 daily Energy exactly once as a legacy perk.

## Calendar

- normal Night +1;
- forced Secret Debt Night +1;
- Camp +1 per consumed field night;
- no second city-day advance after Camp return;
- reload after calendar commit must not add another day.

## Reward / ending transactions

- D40/D41 canonical endings;
- D38 Specialist rewards;
- Secret Debt rewards;
- Palace Return Home and other Palace endings;
- retired lumber-stay historical compatibility proof;
- all RunResult transaction IDs unique and stable.

## Creation-time state

- Strong Meta snapshot resolved once;
- D47 package bonuses applied once;
- Prostitute Lust +5 applied once;
- D23 qualification reads active package identities, not repeatable effects.

---

# 7. Ending migration risks

## D40

Keep the existing conservative selected-route repair.

Readiness is not selection.

## D41

Completed historical outcomes may canonicalize; incomplete legacy eligibility/commit must not become completion.

Specialist ownership must use the one canonical Strong Meta registry.

## D38

The historical v16 branch records reward ownership as a stable Specialist unlock seam because it predates the current canonical Strong Meta runtime.

Final assembly must bind these exact IDs:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`

through the canonical Strong Meta reward/ownership transaction path.

Do not keep a second generic-unlock ownership record for the same permanent reward.

## Secret Debt

The v12 producer also predates canonical current-main Strong Meta reward binding.

Final ending definitions must use the canonical Strong Meta reward form for:

- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

Do not duplicate them into generic `meta.unlocks`.

## Palace

Prince defeat is not Return Home completion.

Return Home remains a separate explicit D16 commit and one RunResult transaction.

## Lumber-stay

Retirement is deliberately non-canonical:

- historical completion evidence may remain;
- it does not count toward the 40 canonical ordinary endings;
- eligible-only/unfinished old state does not become a replacement ending;
- `vitality` becomes only `legacy.lumber-stay.vitality`.

---

# 8. Strong Meta ownership / loadout migration risks

Three states must remain distinct.

## Permanent profile ownership

`meta.strongMeta` owns permanent rewards/knowledge.

Protected profile merge:

- unions permanent ownership/knowledge;
- must not remove newer profile ownership;
- must not let imported old preferences overwrite current profile preferences.

## Current-run Strong Meta snapshot

Once character creation finishes:

- one resolved run snapshot is frozen;
- future profile preference changes do not rewrite the run;
- future registry/catalog changes do not silently change the selected rewards for that run.

Legacy schema-5 completed creation receives the compatibility snapshot with no invented ownership.

## Ordinary Hard Work active package snapshot

This is separate from Strong Meta.

- earned Hard Work != active package selection;
- package identities consume no Keystone/Specialist slot;
- D23 reads active identities 10/10;
- legacy already-running life gets no retroactive D47 package.

`legacy.lumber-stay.vitality` is also separate from both systems and consumes no slot.

---

# 9. Content/presentation-only tranche rule

The following accepted producers must not trigger save migration by themselves:

- D38 v17 content/presentation;
- Palace v19 prose/media;
- ending localization v26;
- global presentation mapping v23.

They may add/repair:

- localized strings;
- captions;
- presentation slots;
- safe media mappings;
- player-facing epilogues.

They must not change:

- mechanical IDs;
- Save schema;
- pending-scene identity;
- reward IDs;
- transaction IDs;
- RNG;
- conditions/effects;
- ending eligibility.

A final save roundtrip before/after these content layers should be mechanically identical.

---

# 10. Exact final focused gate for Chat 2

After **all production tranches are assembled**, before the release full-CI gate, Chat 2 should run:

`npm ci`

`npm run typecheck`

`npm run validate`

`npm run build`

Then execute the final migration closure suite:

`tests/final-save-migration-closure-v21.test.ts`

plus the source/adjacency suites below.

## Core migration / transaction / Meta

- `tests/migration.test.ts`
- `tests/ending-meta.test.ts`
- `tests/hard-work-meta-migration-v5.test.ts`
- `tests/strong-meta-engine-integration-v7.test.ts`
- `tests/strong-meta-registry-v7.test.ts`
- `tests/ordinary-hard-work-meta-production.test.ts`

## Activity / Camp / D38

- `tests/activity.test.ts`
- `tests/qa-activity-option-reload.test.ts`
- `tests/qa-exactly-once-reload.test.ts`
- `tests/activity-camp-persistence-v17.test.ts`
- `tests/activity-ending-family-v16.test.ts`
- `tests/activity-ending-content-presentation-v17.test.ts`
- `tests/restricted-sites-production-v15.test.ts`
- `tests/trade-corridor-production-v13.test.ts`
- `tests/anomalous-reach-production-v14.test.ts`

## Night / Secret Debt / D51

- `tests/night-flow.test.ts`
- `tests/secret-debt-full-route-v12.test.ts`
- `tests/secret-debt-activity-energy-compat-v20.test.ts`
- `tests/chat3-secret-debt-separation-v2.test.ts`
- the assembled D42 Night suite `tests/night-content-gap-v10.test.ts`

## Palace

- `tests/palace-d23-consumer-integration-v8.test.ts`
- the final Palace runtime progression suite from v15/v16 assembly
- `tests/palace-prince-narrative-producer-v18.test.ts`
- `tests/palace-prince-narrative-renderer-v18.test.ts`
- `tests/hard-work-palace-meta-smoke.test.ts`

## D46 / D47

- D46 start-balance focused regression from the frozen v14 producer
- `tests/hard-work-bonus-mapping-v13.test.ts`
- `tests/hard-work-package-catalog-runtime.test.ts`
- `tests/hard-work-stat-cap-d24.test.ts`

## Lumber-stay retirement

- `tests/lumber-stay-retirement-v17.test.ts`
- `tests/presentation-ending-parity-v9.test.ts`
- `tests/presentation-source-integrity-v9.test.ts`

## Localization / presentation

- `tests/ending-localization-closure-producer-v26.test.ts`
- `tests/global-presentation-mapping-producer-v23.test.ts`
- final D42 localization/presentation closure tests
- normal presentation/source-integrity tests

### Gate rule

Run this focused closure set first.

Only after it is green should Chat 2 run the one final full CI owned by the release assembly lane.

Chat 4 v21 does not run that CI.

---

# 11. Final integration firewalls

Chat 2 must not satisfy a failing migration test by:

- auto-selecting an ending;
- inventing a Camp phase;
- recreating a pending scene from history;
- rerolling RNG;
- applying a payment/reward twice and then compensating;
- converting old debt into Secret Debt;
- converting old Palace facts into fabricated duty IDs;
- converting historical lumber-stay into Forewoman / Forest Compact / Hard Work;
- converting vitality into Strong Meta or Hard Work;
- rebuilding a run-local Strong Meta snapshot from the latest profile;
- inferring active D47 packages from earned Hard Work;
- replacing current engine/schema files wholesale with historical producer versions;
- using localization/presentation changes to alter mechanics.

---

# 12. Priority before the 1.0 release gate

## P0 — none currently identified

The v16 Camp persistence blocker is closed by v17/v19.

No accepted producer is currently known to lack a required persisted state.

## P1 — mandatory final composition closure

1. freeze one exact final schema epoch;
2. compose Secret Debt v12 + D51 into canonical schema6/Strong Meta/Night start-day ownership;
3. assemble the executable-green Camp delta without replacing newer runtime;
4. bind D38 + Secret Debt permanent reward IDs to canonical Strong Meta ownership;
5. compose lumber-stay retirement before final ending/reference validation;
6. run the exact 23-case matrix on the fully assembled target;
7. run all focused adjacency suites above.

## P2 — release hardening

1. keep at least one real historical Activity envelope fixture for every supported Activity migration epoch;
2. preserve explicit errors for incompatible Activity definition/adapter/Camp state;
3. preserve explicit error for ambiguous Palace complete-without-ledger state unless an exact historical mapping is approved;
4. keep a golden retired lumber-stay fixture with old RunResult and one without RunResult.

---

# 13. Final disposition

The previous audit's only concrete missing save representation — Activity Camp — is now implemented and executable-green.

All accepted 1.0 systems now have a conservative persistence strategy:

- schema ladder / result transactions;
- Strong Meta ownership + frozen run snapshot;
- D40/D41/D38 ending identity rules;
- NightFlow exactly-once ownership;
- typed Secret Debt;
- D51 provenance-aware Energy compatibility;
- explicit Palace progression and quest-backed Prince confrontation;
- Activity route / mini-game / Camp persistence;
- D46 existing-save preservation;
- D47 package snapshots;
- historical lumber-stay/vitality retirement;
- save-neutral localization/presentation closures.

The release blocker is no longer missing state. The remaining requirement is to prove their **composition** in one final assembled schema/catalog through the exact 23-case matrix.

**READY_FOR_FINAL_CLOSURE**
