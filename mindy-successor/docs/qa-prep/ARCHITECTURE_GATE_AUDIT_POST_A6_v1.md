# Architecture Gate Audit — Post A6 v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Audit base: `1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`  
Branch: `chat4/post-a6-gate`  
Normative gate: `docs/ARCHITECTURE_MIGRATION_SLICE_v1.md`

## Status rule

- **VERIFIED** — current integrated implementation has concrete source/test evidence for the gate requirement.
- **FAILED** — current source or executable evidence directly contradicts the mandatory requirement.
- **NOT_COVERED** — no sufficiently direct executable evidence exists yet; absence of evidence is not called a runtime bug.

Package summaries are supporting context only. VERIFIED rows below cite existing executable tests or direct implementation invariants.

## Gate disposition before Chat 4 gap tests

A1–A6 are integrated and the core lifecycle is substantially executable. A5 and A6 are now verified from their current tests, not inherited from the historical A4 audit.

The Architecture Migration Slice is **not fully closable at this audit point** because:
1. schema-3 legacy progression flags are preserved only in `legacyCompat.flags`, while the gate explicitly requires known legacy flags to become typed facts;
2. several validation/resolver requirements still lack direct focused coverage, including full multi-class priority ordering, least-recently-shown tie-break, arbitrary-path rejection proof, orphan-stage rejection, migration-alias collision and Work save/reload exactly-once.

Queue Item 2 is intended to close the executable-evidence gaps without modifying core/runtime. Any newly exposed implementation failure remains a failing QA test.

## 1. Schema / state ownership

| Requirement | Status | Evidence |
|---|---|---|
| Save has target domain ownership with one authoritative owner for money, Energy, stats and calendar | VERIFIED | `tests/engine.test.ts` — `schema4 JSON has one authoritative owner for money energy stats and calendar`. |
| Fresh state has 12 target progression stats, separate Lust, money 600, Energy 3, 10 creation points | VERIFIED | `tests/engine.test.ts` — creation test. |
| Calendar is 4×40 days / 10-day seasons / 160 total | VERIFIED | `tests/engine.test.ts` — calendar boundary test. |

## 2. M3.2 migration

| Requirement | Status | Evidence |
|---|---|---|
| Schema-3 stats/resources are separated into target owners | VERIFIED | `tests/migration.test.ts` — `schema3 migration maps only safe target stats and quarantines ambiguous prototype metrics`. |
| Energy migrates to DayState as the single owner | VERIFIED | Same migration test + schema single-owner test. |
| Pending M3.2 event preserves selected variant | VERIFIED | `tests/migration.test.ts` — `schema3 pending variant and RNG survive roundtrip without reroll`. |
| RNG survives migration/reload | VERIFIED | Same migration test. |
| Meta completed/unlocks are preserved and protected merge does not roll back newer progress | VERIFIED | `tests/migration.test.ts` — protected Meta merge; A6 `tests/ending-meta.test.ts` additionally verifies transaction-proof union. |
| Legacy fields with no target owner are mapped/quarantined or rejected, not silently invented | VERIFIED | Ambiguous legacy metrics are retained in `legacyCompat.metrics`; out-of-range old calendar is explicitly rejected. |
| Known legacy progression flags become typed target facts | **FAILED** | Direct source evidence: `src/core/engine.ts:migrateV3` constructs empty `progression:{careers:{},quests:{},relationships:{},worldFacts:[]}` and copies old flags to `legacyCompat.flags`. Existing migration test resolves a legacy scene through the compatibility flag façade, not a typed fact mapping. |

The failure above is a real mismatch with Architecture Migration Slice §4. This audit does not prescribe the mapping; it only records that the required typed-fact migration is absent on the audited base.

## 3. Condition / Effect v2

| Requirement | Status | Evidence |
|---|---|---|
| Target conditions cover stat, career stage/counter, quest fact, meta unlock, all/any/not | VERIFIED | `tests/typed-effects.test.ts` typed owner reads; `tests/engine.test.ts` all/any/not composition. |
| Effects cover ModifyStat, ModifyEnergy, career counter/transition, QuestFact and next-day modifier | VERIFIED | `tests/typed-effects.test.ts` typed effect batch + named machine transition tests. |
| No ordinary Meta mutation effect exists | VERIFIED | `tests/typed-effects.test.ts` — Meta readable but ordinary mutation effect absent. |
| Invalid transition / wrong source stage is atomic | VERIFIED | `tests/typed-effects.test.ts` — invalid transition and wrong-stage atomic test. |
| New arbitrary state-path effect is rejected | NOT_COVERED | `effectSchema` is a strict discriminated union and contains no arbitrary-path variant, but a focused executable rejection test is not present yet. Queue Item 2 will add direct proof. |

## 4. Cross-system progression and cascade

| Requirement | Status | Evidence |
|---|---|---|
| School stat gain triggers career scene without another Work command | VERIFIED | `tests/resolver.test.ts` — School → career-ready test. |
| Career choice adds QuestFact and immediately triggers second blocking event | VERIFIED | Same resolver test. |
| No normal action is required between cascade scenes | VERIFIED | Same test; second event is pending immediately after first choice. |
| Cascade order is deterministic | VERIFIED | Stable candidate sorting plus existing stable-ID/older-eligibility tests. |

## 5. RNG / pending reload

| Requirement | Status | Evidence |
|---|---|---|
| Same save + RNG + command gives identical probabilistic pending result | VERIFIED | `tests/resolver.test.ts` deterministic probabilistic pending test. |
| Reload of already pending state does not reroll chance/variant/choice snapshot | VERIFIED | Resolver pending test; forced-night pending reload test. |
| Failed chance is attempted only once per reaction epoch | VERIFIED | `tests/resolver.test.ts` — failed chance attempted once. |

## 6. NightFlow

| Requirement | Status | Evidence |
|---|---|---|
| Forced before-lodging event can suppress rent and voluntary menu | VERIFIED | `tests/night-flow.test.ts` before-lodging forced event test. |
| Paid lodging commits once and survives reload without second charge | VERIFIED | `tests/night-flow.test.ts` normal paid night test. |
| Night study immediate progress + next-day Energy -1 | VERIFIED | `tests/night-flow.test.ts` night study test. |
| Calendar advances exactly once | VERIFIED | `tests/night-flow.test.ts` calendar-once test. |
| Pending forced scene survives reload without reroll | VERIFIED | `tests/night-flow.test.ts` probabilistic forced-night test. |
| Invalid persisted night state/reference is rejected | VERIFIED | `tests/night-flow.test.ts` invalid persisted night state test. |

## 7. Activity adapter / A5

| Requirement | Status | Evidence |
|---|---|---|
| Synthetic Activity entry costs exactly 2 daily Energy | VERIFIED | `tests/activity.test.ts` — `Activity entry costs exactly two daily Energy once`. |
| Internal endurance changes without consuming additional daily Energy | VERIFIED | `tests/activity.test.ts` — internal advance test. |
| Activity internal RNG is separate and deterministic after reload | VERIFIED | Internal advance/global RNG test + deterministic next-step reload test. |
| Save/resume preserves Activity envelope/checkpoint/internal state | VERIFIED | `tests/activity.test.ts` — save reload inside Activity. |
| Success applies typed result exactly once | VERIFIED | `tests/activity.test.ts` — success result test; repeated Activity action after envelope clear is rejected and reward remains single. |
| Success result triggers external Resolver scene at zero extra Energy | VERIFIED | Same success test. |
| Escape is distinct from success | VERIFIED | `tests/activity.test.ts` escape test. |
| Failure is distinct from success/escape | VERIFIED | `tests/activity.test.ts` failure test. |
| Activity definition/version/adapter state is validated on load | VERIFIED | `tests/activity.test.ts` parseSave bad-version test plus schema/loader adapter validation. |
| Unknown Activity result referenced by Resolver trigger is rejected | VERIFIED | `src/core/content.ts` checks `activityResult` trigger result against the selected Activity definition; direct focused QA test can still strengthen coverage. |

## 8. Ending / RunResult / Meta exactly-once / A6

| Requirement | Status | Evidence |
|---|---|---|
| Eligibility does not end the run or grant Meta | VERIFIED | `tests/ending-meta.test.ts` — eligible ending does not end run. |
| Ending commitment is explicit and grants no reward | VERIFIED | `tests/ending-meta.test.ts` — commitEnding changes flow state but does not grant Meta reward. |
| Normal progression is suppressed after commitment | VERIFIED | `tests/ending-meta.test.ts` + resolver committed-ending suppression test. |
| Central completion creates one RunResult and one reward application | VERIFIED | `tests/ending-meta.test.ts` — completeEnding exactly-once test. |
| Reload before completion yields reward once | VERIFIED | `tests/ending-meta.test.ts` reload before completion test. |
| Reload after completion cannot duplicate reward or runsCompleted | VERIFIED | Same reload test. |
| Same ending in later run does not reapply unique reward | VERIFIED | Hard Work repeat test. |
| New Run preserves Meta and resets Run domains | VERIFIED | `tests/ending-meta.test.ts` — newLife preservation/reset test. |
| Meta transaction proof survives protected Meta merge | VERIFIED | `tests/ending-meta.test.ts` — protected Meta merge unions transaction proof. |
| Legacy ended schema-v4 save receives compatibility RunResult without reward duplication | VERIFIED | `tests/ending-meta.test.ts` compatibility RunResult test. |

## 9. Event priority

| Requirement | Status | Evidence |
|---|---|---|
| Priority class outranks arbitrary numeric priority from a lower class | VERIFIED | `tests/resolver.test.ts` — critical progression beats optional with huge numeric priority. |
| Same-class numeric priority ordering | VERIFIED | Direct implementation comparator in `src/core/engine.ts:eventSort/candidateSort`; focused executable test not isolated yet. |
| Stable event-ID tie-break | VERIFIED | `tests/resolver.test.ts` — same-class ties use stable event ID regardless of input order. |
| Oldest eligible/latched candidate wins when otherwise equal | VERIFIED | `tests/resolver.test.ts` — older latched eligibility wins. |
| Least-recently-shown tie-break | NOT_COVERED | Comparator exists in `src/core/engine.ts` using history `lastDay`, but no direct focused test currently proves this ordering step. |
| Simultaneously eligible terminal / forced / critical / optional candidates obey full class order | NOT_COVERED | Existing pairwise class test does not exercise the full required matrix. |

## 10. Cascade loop protection

| Requirement | Status | Evidence |
|---|---|---|
| A→B→A chain stops at technical cap | VERIFIED | `tests/resolver.test.ts` cascade-limit test reaches depth 16 and rejects the next transition. |
| Failure contains diagnostic trace | VERIFIED | Thrown error includes epoch/candidate/trace; resolver trace test separately verifies facts/rejections/selection. |
| Caller state remains unmodified on cascade failure | VERIFIED | Cascade test compares caller JSON before/after rejected choice. |

## 11. Content validation

| Required rejection | Status | Evidence |
|---|---|---|
| Illegal cross-domain / undeclared typed write | VERIFIED | `tests/typed-effects.test.ts` capability rejection + legacy `tests/content.test.ts` undeclared write. |
| Unknown stage / transition | VERIFIED | `tests/typed-effects.test.ts` unknown stage/nested transition and runtime invalid-transition tests. |
| Generic arbitrary state path | NOT_COVERED | Schema has no such union member; direct adversarial parse/load test still missing. |
| Orphan/unreachable stage | NOT_COVERED | Current `validateMachine` verifies stage IDs and transition references but source review shows no reachability/orphan graph traversal. Queue Item 2 will probe it executablely. |
| Missing referenced content/media ID | VERIFIED | Content tests and typed persisted machine validation reject missing references where supported. |
| Duplicate IDs | VERIFIED | `tests/content.test.ts` duplicate event ID plus loader-wide uniqueness checks. |
| Impossible simple threshold contradiction | VERIFIED | `tests/typed-effects.test.ts` target stat/resource contradiction test. |
| Activity result unknown to adapter/definition | VERIFIED | `src/core/content.ts` validates Activity result IDs/outcome matches in reaction triggers and Activity definitions require success/escape/failure. |
| Migration alias collision | NOT_COVERED | No exposed migration-alias registry/fixture exists in the audited implementation; no executable collision test exists. |

## 12. Acceptance categories

| Gate category | Status |
|---|---|
| schema/state ownership | VERIFIED |
| migration | **FAILED** — known legacy flags are not converted to typed facts |
| transaction rollback | VERIFIED |
| deterministic RNG | VERIFIED |
| Event Resolver | VERIFIED with remaining tie-break/matrix evidence gaps |
| cascade | VERIFIED |
| night exactly-once | VERIFIED |
| Activity save/resume | VERIFIED |
| ending/meta exactly-once | VERIFIED |
| validation | NOT_COVERED for orphan/arbitrary-path/migration-alias subcases |

## Gate conclusion before gap-closure tests

The integrated A1–A6 implementation now proves the two major previously pending architecture domains: Activity and ending/meta exactly-once. The architecture gate nevertheless remains open because one mandatory migration behavior is directly absent and several validation/priority rows lack executable evidence.

Queue Item 2 must add tests only; it must not patch runtime to force the gate green. If those tests expose implementation failures, they remain documented failing evidence for the Lead.
