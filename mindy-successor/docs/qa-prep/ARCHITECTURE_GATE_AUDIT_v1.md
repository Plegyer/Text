# Architecture Gate Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Audit base: `42de07be793d0f5ef0b59ea2c8acf9f0c4c80125`  
Branch: `chat4/acceptance-audit`

## Purpose and evidence rule

This document audits the mandatory architecture gate in `docs/ARCHITECTURE_MIGRATION_SLICE_v1.md` against repository evidence available on the audit base. It does not modify or reinterpret the implementation.

Status meanings are strict:

- **VERIFIED** — concrete repository test/source evidence exists for the requirement on the audit base.
- **PENDING_A5** — the requirement belongs to Activity Envelope work and is not present on this audit base.
- **PENDING_A6** — the requirement belongs to ending/RunResult/Meta completion work and is not present on this audit base.
- **NOT_COVERED** — the requirement is not A5/A6-specific, but no sufficiently direct acceptance evidence was found.

A package document saying “implemented” is useful supporting evidence, but a **VERIFIED** result below is anchored to a concrete test or source behavior wherever possible. This audit did not re-run the Node suite; repository status records A4 as green with `npm run check` and 84/84 tests. The coordination commit used as the audit base has no directly accessible CI status through the connected GitHub integration.

## Gate summary

The architecture gate is **not yet closable** on this base. A1–A4 have substantial executable evidence, while Activity (A5) and central ending/meta completion (A6) are explicitly pending. Several smaller validation/migration assertions also remain without direct focused acceptance coverage and are marked `NOT_COVERED` rather than inferred.

## A1 — state ownership and migration

| Requirement | Status | Concrete evidence | Audit note |
|---|---|---|---|
| Target state has a single authoritative owner for money, Energy, stats and calendar | VERIFIED | `prior-work/astra/prototype-m3.2/tests/engine.test.ts` — `schema4 JSON has one authoritative owner for money energy stats and calendar` | Serialized schema-v4 JSON explicitly has no legacy `metrics/day/flags/inventory/pending` owners. |
| Fresh state has 12 progression stats, separate Lust, 10 creation points, money 600 and Energy 3 | VERIFIED | `tests/engine.test.ts` — `creation: twelve low stats, ten points, separate lust, no play before completion` | Matches current locked baseline. |
| Target calendar is 4×40 days with 10-day seasons / 160 days total | VERIFIED | `tests/engine.test.ts` — `calendar: ten-day seasons across four forty-day years` | Boundary assertions cover day 0/9/10/39/40/159. |
| Schema-3 migration separates resources/stats and moves Energy to DayState | VERIFIED | `tests/migration.test.ts` — `schema3 migration maps only safe target stats and quarantines ambiguous prototype metrics` | Asserts money, Energy, calendar and safe stat mapping in target owners. |
| Ambiguous legacy fields are not silently invented into target stats | VERIFIED | Same migration test | Prototype-only metrics are retained in `legacyCompat`; unknown target stats remain baseline values. |
| Pending legacy event preserves selected event/variant | VERIFIED | `tests/migration.test.ts` — `schema3 pending variant and RNG survive roundtrip without reroll` | Event ID and variant ID survive target roundtrip. |
| Legacy RNG survives migration/reload | VERIFIED | Same migration test | RNG is asserted before/after roundtrip. |
| Protected Meta is not lost or rolled back by older imported saves | VERIFIED | `tests/migration.test.ts` — `protected meta merge unions progress and never lowers run counters` | Completed endings, unlocks and hard-work progress are merged; counters do not decrease. |
| Unsupported historical calendar state is rejected rather than silently wrapped | VERIFIED | `tests/migration.test.ts` — `old prototype dates outside target 160-day calendar are rejected instead of wrapped` | Explicit incompatibility behavior. |
| Known legacy progression flags are migrated into typed target facts rather than retained only through compatibility access | NOT_COVERED | Existing migration fixtures preserve legacy behavior, but no focused test was found that asserts a legacy progression flag becomes a typed Career/Quest/World fact | Required by Architecture Migration Slice §4; needs a focused migration fixture before the full gate closes. |

## A2 — typed Condition / Effect v2 and transactions

| Requirement | Status | Concrete evidence | Audit note |
|---|---|---|---|
| Typed conditions read target owners: stat/resource/item/calendar/career/quest/relationship/world/meta | VERIFIED | `tests/typed-effects.test.ts` — `typed conditions read target owners and virtual initial machine stages` | Covers all major owner families; career counter is also exercised by the transition condition in the same file. |
| `all/any/not` remain composable | VERIFIED | `tests/engine.test.ts` — `all/any/not conditions still compose` | Direct composition test. |
| Typed effects write target owners without raw legacy progression flags | VERIFIED | `tests/typed-effects.test.ts` — `typed effect batch writes target owners and uses documented ordering before transition` | Covers stat/resource/item/world/career/next-day writes. |
| Effect ordering lets counters/facts satisfy a later named transition in the same atomic batch | VERIFIED | Same typed effect batch test | Counter is incremented before `advanceCareer`, and transition succeeds. |
| Invalid transition ID and wrong source stage roll back atomically | VERIFIED | `tests/typed-effects.test.ts` — `invalid transition id and wrong-stage transition are atomic` | Caller save JSON is asserted unchanged on failure. |
| Quest and relationship progression use named state-machine transitions | VERIFIED | `tests/typed-effects.test.ts` — `quest and relationship effects use named machine transitions` | Direct stage/counter assertions. |
| Typed pack cross-domain reads/writes require declared capabilities | VERIFIED | `tests/typed-effects.test.ts` — `typed pack capabilities are required for declared reads and writes` | Missing read/write capability is rejected at load. |
| Unknown machine stages/transitions are rejected | VERIFIED | `tests/typed-effects.test.ts` — `unknown machine stages and nested transitions are rejected at catalog load`; atomic transition test | Covers missing destination stage, nested transitions and runtime transition errors. |
| Contradictory simple target thresholds are rejected | VERIFIED | `tests/typed-effects.test.ts` — `contradictory target thresholds are rejected` | Stat and resource contradictions are both exercised. |
| Ordinary content cannot directly mutate MetaState | VERIFIED | `tests/typed-effects.test.ts` — `meta is readable by typed conditions but has no ordinary mutation effect` | Meta condition is readable; attempted Meta mutation effect shapes are rejected. |
| Next-day modifier applies once and clears | VERIFIED | `tests/typed-effects.test.ts` — `next-day modifier applies once at sleep and then clears` | Exact-once modifier behavior is asserted. |
| No generic arbitrary save-path write can be authored | NOT_COVERED | A2 package states no arbitrary save-path API was introduced; no dedicated adversarial test such as a forged path-write effect was found | Add a direct schema/loader rejection test to turn this into acceptance evidence. |
| Declared but unreachable/orphan state-machine stage is rejected | NOT_COVERED | No focused orphan-stage graph validation test found | Unknown stages are covered; graph reachability is a separate requirement in Architecture Migration Slice §14. |

## A3 — Event Resolver, cross-system reaction and deterministic cascade

| Requirement | Status | Concrete evidence | Audit note |
|---|---|---|---|
| School stat gain can trigger career progression without another Work command | VERIFIED | `tests/resolver.test.ts` — `school stat gain triggers career scene without another work action, then choice cascades through quest fact` | The test also asserts no Work count was added. |
| Choice effects can immediately trigger a second blocking event via typed quest fact | VERIFIED | Same resolver test | Career choice adds QuestFact and the follow-up event appears immediately. |
| Resolver reruns after choice without an intervening normal action | VERIFIED | Same resolver test | Direct proof of reactive cascade. |
| Same save + RNG + command yields the same pending result | VERIFIED | `tests/resolver.test.ts` — `same save and RNG produce identical probabilistic pending; reload does not reroll it` | Full state deep-equality asserted for two executions. |
| Reload of an already pending probabilistic scene does not reroll chance/variant | VERIFIED | Same test; `tests/night-flow.test.ts` also covers forced-night pending reload | Variant and RNG remain stable. |
| Failed chance is attempted at most once inside one reaction epoch | VERIFIED | `tests/resolver.test.ts` — `failed probabilistic event is attempted only once inside one epoch` | Second resolution keeps RNG unchanged and reports already-attempted. |
| Pending scene snapshots legal choices and blocks incompatible actions | VERIFIED | `tests/resolver.test.ts` — `pending scene blocks incompatible actions and snapshots allowed choices` | Tampered choice snapshot is rejected on load. |
| Optional offers do not block ordinary work | VERIFIED | `tests/resolver.test.ts` — `optional offer does not block ordinary work and can be opened explicitly` | Direct non-blocking behavior. |
| Latched/scheduled delivery survives condition changes or expires deterministically | VERIFIED | `tests/resolver.test.ts` — latched and scheduled tests | Both delivery policies have focused tests. |
| Higher priority class beats an arbitrarily high numeric lower-class priority | VERIFIED | `tests/resolver.test.ts` — `priority class beats arbitrary numeric priority from lower class` | Critical progression beats optional world. |
| Same-class ties are deterministic with stable event ID | VERIFIED | `tests/resolver.test.ts` — `same-class ties use stable event ID regardless of input order` | Direct stable-ID tie test. |
| Oldest latched eligibility participates in deterministic ordering | VERIFIED | `tests/resolver.test.ts` — `older latched eligibility wins before newer equal-priority candidate` | Direct oldest-first proof. |
| Full simultaneous terminal/forced/critical/optional ordering matrix is exercised | NOT_COVERED | No single focused test was found that makes all required classes simultaneously eligible | Core class precedence is partly proven, but the Architecture Slice §12 matrix should get an explicit table-driven test. |
| Least-recently-shown tie-break is exercised directly | NOT_COVERED | No focused acceptance test found | Package A3 documents the ordering, but no direct test was found for this tie-break step. |
| Deterministic A→B→A cascade is capped and failure is atomic | VERIFIED | `tests/resolver.test.ts` — `cascade limit catches deterministic A-B-A loop without mutating caller on failure` | Depth 16 is reached; next choice throws; caller save remains byte-for-byte equivalent JSON. |
| Resolver emits diagnostic trace with facts/rejections/selection | VERIFIED | `tests/resolver.test.ts` — `resolver trace records facts, rejections and selected event` | Required debug trace behavior is directly asserted. |
| Committed ending suppresses normal progression candidates | VERIFIED | `tests/resolver.test.ts` — `committed ending suppresses normal progression candidates` | This verifies only the A3 suppression hook, not A6 completion/reward semantics. |

## A4 — resumable NightFlow and exactly-once night behavior

| Requirement | Status | Concrete evidence | Audit note |
|---|---|---|---|
| Forced event may intercept before lodging and suppress rent/menu | VERIFIED | `tests/night-flow.test.ts` — `before-lodging forced event can replace lodging and voluntary menu without charging rent` | Money remains unchanged and flow completes once. |
| Normal paid lodging charges exactly once | VERIFIED | `tests/night-flow.test.ts` — `normal paid night charges exactly once and survives reload after payment` | Reload after payment cannot select/pay lodging again. |
| Cheap/street lodging use their own target behavior | VERIFIED | `tests/night-flow.test.ts` — cheap lodging and street tests | Street modifier is applied once at StartDay. |
| Night study gives immediate progress and next-day Energy -1 | VERIFIED | `tests/night-flow.test.ts` — `night study gives immediate stat progress and only penalizes next-day Energy` | Does not consume current daytime Energy as an action. |
| Relationship night consumes Night slot without daytime Energy cost | VERIFIED | `tests/night-flow.test.ts` — `voluntary relationship night consumes night slot but no daytime Energy` | Pending relationship scene resumes NightFlow. |
| Post-lodging forced event happens after one committed payment | VERIFIED | `tests/night-flow.test.ts` — `post-lodging forced event happens after one payment and reload does not charge again` | Exact payment ordering is asserted. |
| Pending forced night scene survives reload without RNG reroll | VERIFIED | `tests/night-flow.test.ts` — `probabilistic pending forced night survives reload without reroll` | Variant/RNG stability is explicit. |
| One NightFlow advances calendar exactly once and blocks daytime actions while active | VERIFIED | `tests/night-flow.test.ts` — `NightFlow advances calendar exactly once and blocks daytime actions while active` | Second night-choice attempt cannot advance the same night again. |
| Persisted NightFlow rejects invalid references/impossible phase state | VERIFIED | `tests/night-flow.test.ts` — `invalid persisted night references and impossible phase state are rejected` | Save validation evidence. |
| Legacy `sleep(payment)` is only a compatibility path over NightFlow behavior | VERIFIED | `tests/night-flow.test.ts` — `legacy sleep compatibility uses the same NightFlow outcome`; `docs/IMPLEMENTATION_PACKAGE_A4_v1.md` | Compatibility remains green without a second authoritative night path. |

## A5 — Activity Envelope

| Requirement | Status | Required future acceptance evidence |
|---|---|---|
| Activity entry costs exactly 2 daily Energy once | PENDING_A5 | Entry transaction + reload/retry test. |
| Internal endurance/moves/HP are separate from daily Energy | PENDING_A5 | Internal-step test showing daily Energy unchanged after entry. |
| `ActivityEnvelope` is persisted and has `definitionVersion` | PENDING_A5 | Schema/roundtrip test. |
| Save/resume inside Activity restores exact checkpoint/internal state/RNG | PENDING_A5 | In-activity reload fixture. |
| Success emits typed result/QuestFact and reruns Event Resolver | PENDING_A5 | Activity-exit → Resolver continuation test. |
| Escape returns a distinct declared result and reruns Event Resolver | PENDING_A5 | Escape-result integration test. |
| Unknown Activity result is rejected by adapter/catalog validation | PENDING_A5 | Negative validation test. |
| Activity adapter migration is version-gated | PENDING_A5 | Old definitionVersion migration/incompatibility fixture. |

## A6 — Ending / RunResult / Meta exactly-once

| Requirement | Status | Required future acceptance evidence |
|---|---|---|
| Ending eligibility does not end the active run | PENDING_A6 | Eligible-state test with normal play still allowed. |
| Ending commitment is an explicit separate command | PENDING_A6 | Commit-state transition test. |
| Central completion creates a stable RunResult identity | PENDING_A6 | RunResult schema/transaction test. |
| Meta reward is awarded exactly once for a RunResult | PENDING_A6 | Repeat-click + reload idempotency test. |
| Reload after commitment but before reward does not lose or duplicate completion | PENDING_A6 | Adversarial checkpoint test. |
| Reload after reward but before New Run cannot re-award reward | PENDING_A6 | Applied-result proof test. |
| New Run preserves Meta and resets Run domains | PENDING_A6 | Full reset/preserve assertions. |
| Eligibility alone never awards Meta | PENDING_A6 | Negative reward assertion. |

Legacy M3.2 ending tests in `tests/engine.test.ts` are compatibility evidence only and are deliberately **not** used to mark A6 verified.

## Cross-cutting validation requirements

| Requirement | Status | Concrete evidence / gap |
|---|---|---|
| Illegal undeclared cross-domain write is rejected | VERIFIED | `tests/typed-effects.test.ts` capability test and `tests/content.test.ts` undeclared-writes test. |
| Unknown stage/transition is rejected | VERIFIED | `tests/typed-effects.test.ts` unknown-stage/nested-transition and atomic invalid-transition tests. |
| Missing referenced media/content IDs are rejected where covered | VERIFIED | `tests/content.test.ts` rejects missing media; `tests/typed-effects.test.ts` rejects unknown persisted machine IDs/stages. |
| Duplicate IDs are rejected | VERIFIED | `tests/content.test.ts` — `duplicate event IDs are rejected`; loader also enforces uniqueness for multiple target ID families. |
| Impossible simple threshold contradiction is rejected | VERIFIED | `tests/typed-effects.test.ts` contradiction test; legacy content contradiction test also exists. |
| Activity result unknown to adapter is rejected | PENDING_A5 | Requires adapter/result schema. |
| Migration alias collision is rejected | NOT_COVERED | No focused collision fixture/test found on audit base. |
| Transaction rollback protects caller state on target failures | VERIFIED | Typed transition atomicity and Resolver cascade-cap atomicity tests. |
| Save storage uses serialized writes, validates before replace, keeps fallback backup | VERIFIED | `tests/storage.test.ts` — `atomic disk saves, fallback backup and serialized writes`; `desktop/save-store.cjs`. |
| Corrupt/invalid save values are rejected rather than silently normalized into play | VERIFIED | `tests/engine.test.ts` — `invalid save values and incompatible version are rejected`; UI corrupt-save test keeps bad source untouched and locks controls. |

## Gate decision for the Lead

Do not scale production content on the claim that the full Architecture Migration Slice is complete yet. On this audit base, A1–A4 mechanisms have strong executable coverage, but the formal gate remains open until A5 and A6 are integrated and their adversarial reload/exactly-once tests pass. Before final gate sign-off, add focused coverage for legacy flag→typed-fact migration, full priority-class matrix, least-recent tie-break, orphan-stage validation, arbitrary-path rejection, and migration-alias collision, or explicitly revise the governing architecture spec if those requirements are intentionally superseded.

This audit does not assert implementation bugs for the `NOT_COVERED` rows; it records missing acceptance evidence.
