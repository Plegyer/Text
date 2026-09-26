# Lumber Release Readiness v1

Status: Chat 3 release-readiness snapshot.
Branch: `chat3/lumber-production-proof-next`.
Scope: Lumber target contracts, fixtures, Product Acceptance mapping, and known production dependencies.

This document does **not** claim that Lead-owned shared catalog/UI activation has already shipped. It separates:

- **EXECUTABLE** — works in current isolated target fixtures/tests;
- **CONTRACT READY** — production identity/behavior is locked and integration-safe;
- **PARTIAL** — executable boundary exists but product wiring/depth is incomplete;
- **OPEN / BLOCKED** — a production owner or authorial value is genuinely unresolved.

## Area status

| Area | Executable evidence | Contract / identity status | Production readiness | Remaining dependency |
| --- | --- | --- | --- | --- |
| Lumber Work | `lumber.shift` target definition executes, costs 1 daytime Energy, increments `completed_shifts`, applies seasonal packages | CONTRACT READY; legacy `lumber` coexistence proven; semantic shift IDs are `job/lumber/shift/<season>/default` | READY FOR LEAD ACTIVATION | shared catalog/UI activation is Lead-owned; do not overwrite legacy `lumber` |
| Career milestone | `lumber.career-first-shift` reacts to `careerCounterChanged(lumber,completed_shifts)` and advances `lumber` via `accept-hand` | CONTRACT READY | READY FOR LEAD ACTIVATION | target pack activation only |
| Foreman professional route | `lumber.foreman-notice` opens `lumber.foreman`; professional choice reaches `route-professional` with 0 extra daytime Energy | CONTRACT READY; no romance prerequisite | READY FOR LEAD ACTIVATION | target pack activation only |
| Foreman Night | `lumber-night.foreman-professional` plus isolated `lumber.foreman.night` builder proves visibility, one Night slot, 0 daytime Energy, exactly-once lodging/payment and reload stability | EVENT CONTRACT READY; stable Night hook ID is `lumber.foreman.night` | PARTIAL | production Night-choice definition and normal-lodging integration are not owned by this fixture |
| Forest Activity | `lumber.forest` enters for 2 daytime Energy, persists ActivityEnvelope checkpoints, supports success/escape/failure, and resumes deterministically | Activity core contract READY; A5 success continuation READY | PARTIAL / BLOCKED AT PRODUCTION ENTRY | real `old_boundary_token -> enter_old_boundary` acquisition/use path; deeper Forest route/challenge/season authoring |
| Forest continuation | `lumber-cross.activity-forest-return` reacts immediately to success without another shift | exact A5 boundary is `activityResult(lumber.forest,success,lumber.forest.success)` | CONTRACT READY | depends on production Forest entry being reachable |
| Hard Work ending | `ending.lumber.hard-work` eligibility, commit, completion, reload and repeated completion are executable | **LOCKED / READY** | READY FOR LEAD ACTIVATION; **NOT an OPEN authoring dependency** | no content prerequisite remains; only normal production integration |
| Forewoman ending | `ending.lumber.forewoman` is independently executable in fixture state using professional route + Lumber career facts | ending identity/conditions READY | BLOCKED FOR PRODUCT FLOW | final School-owned management/accounting public fact ID/provider/threshold remains OPEN |
| Forest ending | `ending.lumber.forest` becomes eligible after exact Forest continuation facts and is independently completable | ending identity/conditions READY | PARTIAL | production Forest entry/item path and full Forest authoring remain OPEN |
| Legacy schema-4 saves | `actionCounts.lumber` parses with coexistence catalog; target `completed_shifts` remains separate | CONTRACT READY; no implicit migration | READY | no migration should be added without a separate accepted contract |
| Media / presentation | semantic Lumber slots resolve; packaged `assets/stage-lumber.svg` and `assets/stage-forest.svg` exist | semantic IDs READY; dotted media IDs remain asset IDs | PARTIAL but non-fatal | target GIF paths under `assets/lumber/*.gif` are future/missing and must not be labeled shipped |
| PA00–PA26 mapping | every row is mapped in `LUMBER_PRODUCT_ACCEPTANCE_ROW_MAP_v1.md` | mapping READY | PARTIAL overall | rows depending on School/item/deeper Forest/normal lodging remain OPEN/PARTIAL |

## Hard Work — release-ready locked contract

Hard Work is not waiting on School, Forest, Foreman, season, item acquisition, milestone authoring, or legacy migration.

Exact ending ID:

`ending.lumber.hard-work`

Exact and only eligibility condition:

`careerCounter(lumber, completed_shifts) >= 50`

Exact A6 reward ID:

`hardWork:lumber`

There are no additional conditions.

Completion applies the reward exactly once through RunResult/Meta proof. Reload after commitment or completion cannot duplicate it.

The current Lumber Hard Work Meta effect in a new life remains:

- +3 starting Strength;
- +3 starting Endurance.

## Work / milestone / Foreman readiness

The core Lumber professional path is internally coherent:

1. execute `lumber.shift`;
2. increment `completed_shifts`;
3. Resolver opens `lumber.career-first-shift`;
4. `continue` advances career to `accepted-hand`;
5. Resolver opens `lumber.foreman-notice`;
6. `professional` reaches `lumber.foreman:route-professional`.

Reactive milestone/relationship scenes cost 0 extra daytime Energy.

No romance state is required.

## Night readiness

Ready and proven:

- stable hook ID `lumber.foreman.night`;
- event `lumber-night.foreman-professional`;
- professional-route-only visibility;
- 0 daytime Energy;
- one Night slot;
- lodging paid once;
- pending Night scene survives reload;
- relationship progress is not duplicated;
- semantic presentation ID `relationship/lumber-foreman/lumber-night-foreman-professional/default`.

Still not claimed shipped by this worker:

- final production Night-choice definition placement;
- final normal-lodging definition ID/wiring.

The isolated Night builder is acceptance evidence, not a substitute for shared production ownership.

## Forest readiness

Ready and proven:

- Activity ID `lumber.forest`;
- entry Energy cost exactly 2;
- no repeated daily-Energy cost inside Activity;
- save/resume envelope;
- result IDs:
  - `lumber.forest.success`;
  - `lumber.forest.escape`;
  - `lumber.forest.failure`;
- exact A5 success continuation;
- no extra shift required after success;
- escape/failure do not grant success continuation facts.

### OPEN Forest production dependencies

1. **Old Boundary Token capability source/use**
   - locked item: `old_boundary_token`;
   - locked capability: `enter_old_boundary`;
   - current worldFact bridge is test-only;
   - production acquisition/use/retain-or-consume semantics remain OPEN.

2. **Deeper Forest authoring**
   - full PA asks for richer route/challenge/season depth;
   - exact deeper encounters/balance/lore remain OPEN;
   - do not replace or alter the already locked three result IDs.

These Forest dependencies must never become Hard Work prerequisites.

## School cross-system readiness

Current Lumber fixture proves the reaction shape through:

- fixture world fact `lumber.school.management-ready`;
- event `lumber-cross.school-management-return`;
- Lumber-owned continuation facts used by the Forewoman family.

But production School ownership is still OPEN for:

- final management/accounting public fact ID;
- exact School provider;
- any lesson/milestone/certificate threshold;
- final Arcana/Forest public fact ID and threshold if activated.

Do **not** promote synthetic action:

`school.lumber-management`

Do **not** infer a management/certificate threshold from legacy School content.

## Ending family readiness

### Hard Work

**READY CONTRACT.**

Only `completed_shifts >= 50`.
Exact reward `hardWork:lumber`.

### Forewoman

**IDENTITY READY / PRODUCT FLOW BLOCKED.**

Conditions remain:

- Lumber career fact `management-school-ready`;
- Lumber career fact `forewoman-problem-resolved`;
- Foreman relationship stage `route-professional`.

It grants no Hard Work Meta reward.

Blocker: final School-owned production public fact/provider/threshold.

### Forest

**IDENTITY READY / PRODUCT FLOW PARTIAL.**

Conditions remain:

- Lumber career fact `forest-truth-known`;
- Lumber career fact `forest-problem-resolved`.

It grants no Hard Work Meta reward.

Blockers: production Forest entry capability path and deeper PA authoring.

## Media readiness

Pack media IDs are approved asset identities, for example:

- `job.lumber.shift.spring.default`;
- `job.lumber.event.accepted-hand`;
- `relationship.lumber.foreman.professional`;
- `job.lumber.event.forest-return`;
- `relationship.lumber.foreman.night.professional`.

Their declared GIF paths under `assets/lumber/*.gif` are currently not packaged on this branch.

Therefore:

- missing future GIFs are **non-fatal** to the contract;
- missing GIF paths are **not shipped assets**;
- packaged static assets `assets/stage-lumber.svg` and `assets/stage-forest.svg` exist as real fallback material;
- semantic presentation IDs remain slash-based and separate from dotted media asset IDs.

## Release checklist

### Contract-complete / no authoring blocker

- [x] target `lumber.shift` identity and one-Energy cost;
- [x] seasonal shift mechanics;
- [x] legacy `lumber` coexistence / schema-4 save compatibility;
- [x] `completed_shifts` target ownership;
- [x] first-shift career milestone;
- [x] professional Foreman route without romance;
- [x] exact A5 `activityResult` Forest continuation;
- [x] Hard Work eligibility = ONLY `completed_shifts >= 50`;
- [x] exact A6 reward ID `hardWork:lumber`;
- [x] Hard Work reward exactly-once reload behavior;
- [x] separate Forewoman / Forest ending identities;
- [x] PA00–PA26 Lumber row map;
- [x] semantic presentation identity contracts.

### Integration / authoring still required

- [ ] Lead-owned shared catalog/UI activation for target Lumber definitions/packs;
- [ ] real `old_boundary_token` production acquisition/use capability path;
- [ ] final School management/accounting public fact/provider/threshold;
- [ ] final Arcana/Forest School public fact/provider/threshold if used;
- [ ] production normal-lodging and Foreman Night-choice data wiring;
- [ ] deeper Forest route/challenge/season authoring required for full PA depth;
- [ ] future Lumber GIF assets, if desired; absence is non-fatal when fallback presentation remains usable.

## Overall readiness statement

The Lumber **mechanical contracts and Hard Work path are integration-ready**.

The full Product Acceptance slice is **not yet completely release-ready** because item-capability acquisition/use, School public-fact ownership, production Night/lodging data wiring, and deeper Forest authoring remain unresolved or outside Chat 3 ownership.

Those OPEN items are isolated from Hard Work. Hard Work remains ready with exactly one eligibility condition and exact reward ID `hardWork:lumber`.
