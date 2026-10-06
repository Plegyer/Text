# Chat 5 — Remaining Tranche Dependency Audit v34

Status: **AUDIT COMPLETE — ORDER SAFE WITH ONE REQUIRED PALACE INPUT DEPENDENCY**  
Owner: Chat 5  
Branch: `chat5/final-cross-tranche-readiness-v34`

Scope: cross-tranche research / release readiness only.

No runtime changes.  
No full CI.

## Audited remaining order

Leader's authoritative remaining burn-down is:

1. Secret Debt v12 + D51
2. Palace
3. Activity + Camp + D38
4. D46 + D47 + legacy retirement
5. final save/migration/UI/localization/presentation/regression closure

D42 is already merged and exact-main green.

## Executive verdict

The five-stage order is **safe and should not be reordered**.

It is also complete **provided one newly-opened Palace dependency is treated as a required input inside Stage 2**:

`chat3/palace-d39-live-consumer-closure-v39` through v41

must resolve and freeze the live-consumer mappings for:

- Formal Introduction;
- Source Method;

before Palace can be considered a complete production candidate.

This does not create a sixth burn-down stage.

It is a prerequisite artifact for Stage 2.

If Chat 3 concludes that no unique safe existing consumer mapping exists, Palace assembly must stop for Leader/Product review rather than invent a generic bypass.

---

# 1. Stage 1 — Secret Debt v12 + D51

Current Chat 2 branch:

`chat2/assembly-secret-debt-d51-current-main-v1`

Current implementation head observed during this audit:

`a02d4931087e0884756a6888354b8a69e0327b02`

Current Leader pointer requires selective current-main composition of:

- Secret Debt v12;
- D51 Street+bound Energy compatibility;
- canonical Strong Meta ending reward binding;
- Secret Debt ending localization v27;
- focused tests;
- typecheck / validate / build;
- one full CI.

## Upstream dependency

Only the already-closed D42 baseline is required.

That dependency is satisfied.

D42 exact-main is green.

## Why Stage 1 must remain first

Later Palace and Activity code both share high-pressure runtime/schema surfaces with:

- NightFlow;
- Energy start-day processing;
- ending transactions;
- Strong Meta reward ownership;
- save state.

Assembling Debt+D51 first establishes the final typed forced-Night and Energy-provenance contract that Palace and especially Activity/Camp must preserve.

Activity Camp explicitly queries the existing forced-Night resolver.

Therefore Activity before Debt+D51 would be unsafe.

## Stage 1 exit gate

Do not begin Palace production assembly until:

- Secret Debt focused QA is green;
- typecheck/validate/build are green;
- one branch full CI is green;
- Leader merges the frozen candidate;
- exact-main CI on the merge SHA is green.

Research/preflight work for later stages may proceed in parallel.

Production current-main assembly may not.

---

# 2. Stage 2 — Palace

Accepted frozen inputs already include:

- Palace mechanics/content;
- final prose/media;
- D39 reward producer;
- Palace cumulative assembly refresh.

D39 adds:

- Steady Practice;
- Formal Introduction;
- Source Method automatic knowledge.

## New required dependency: D39 live consumers

Current Chat 3 pointer is:

`chat3/palace-d39-live-consumer-closure-v39`

Tasks v39-v41 must identify exact existing legal consumers for:

### Formal Introduction

Must map to existing ordinary-career professional relationship content.

Forbidden targets:

- Palace;
- Activity;
- Secret Debt.

Must preserve original gates and may not become a generic relationship bypass.

### Source Method

Must map to information/provenance/cross-check-only scenes.

It may not:

- change resources;
- change progression stats;
- change counters/stages;
- grant ending progress;
- leak D49-reserved macro truth.

## Why this is a real dependency

The D39 producer proves the runtime helpers and reward lifecycle.

It does not by itself prove that accepted live authored content consumes the two new capabilities correctly.

A release candidate where the reward exists permanently but has no accepted live consumer is incomplete.

Therefore v39-v41 must be frozen before Stage 2 focused acceptance.

## Relation to Stage 1

This mapping work can proceed while Secret Debt assembly runs.

It does **not** block Stage 1.

It **does** block Palace completion.

## Palace exit gate

Before Activity production assembly begins:

- Secret Debt exact-main must already be green;
- D39 live-consumer closure must be resolved;
- Palace+D39 selective assembly must be focused-green;
- branch full CI must be green;
- Leader merge must complete;
- exact-main CI must be green.

---

# 3. Stage 3 — Activity + Camp + D38

Accepted stack:

- v15 four-region D36 source;
- Camp v17 semantics;
- executable-green Camp baseline repair v19;
- D38 ending mechanics v16;
- D38 content/presentation v17;
- canonical D38 reward producer v26;
- authored tag mapping v27;
- Activity final packet v28;
- Activity Network epilogue correction v36.

## Hard dependency on Palace exact-main

Activity must assemble **after** Palace because D38 and D39 independently modify the Strong Meta registry/runtime.

Standalone producer assumptions conflict at source-version/cardinality level:

- D38 standalone registry;
- D39 standalone registry;

are both historical forks from the same earlier Strong Meta base.

Final assembly requires a semantic union against the **actual post-Palace registry**.

Required combined contract after both families:

- 25 reward IDs;
- 22 Specialists;
- 3 Keystones;
- global Specialist capacity 2;
- Source Method remains automatic knowledge;
- cap-200 remains a normal Specialist.

If Activity assembled first, Palace would later face the same collision in reverse and the accepted v28 guidance would no longer match its expected post-Palace base.

The Leader order is therefore correct.

## Stage-local dependencies

The following are legitimate Stage 3 selective-assembly work and do not require a new prior stage:

- carry the v19 baseline repairs with v15-v17 historical source;
- materialize exact v27 authored tags;
- add executable 4/3/3 mapping assertions;
- wire Atlas/Archive/Contact runtime;
- implement carried-result durability;
- prevent unsupported research-grade durability after an unsecured result is lost;
- apply Chat 6 v36 Network epilogue after v17 localization.

These are merge-time composition responsibilities.

## Secret Debt dependency

Camp must preserve absolute forced-Night priority.

D51 remains owned by NightFlow/start-day provenance logic.

Activity must not reimplement D51 internally.

This is another reason Stage 1 must already be exact-main green before Stage 3.

## Activity exit gate

D46/D47/legacy may not begin production assembly until Activity:

- focused QA green;
- typecheck/validate/build green;
- branch full CI green;
- Leader merged;
- exact-main green.

---

# 4. Stage 4 — D46 + D47 + legacy retirement

Accepted frozen producers:

- D46 economy/start balance;
- D47 ten Hard Work packages;
- lumber-stay retirement.

## Why Stage 4 belongs after Activity

D46 and legacy retirement touch shared high-pressure files including:

- `engine.ts`;
- `definitions.json`;
- save/migration;
- ending/presentation surfaces.

Running this tranche after Activity provides the strongest isolation proof because wage, Energy and retired-ending changes can be tested against the already-finalized:

- Secret Debt;
- Palace;
- Activity/Camp.

## Base-relative ending dependency

Legacy retirement removes exactly one live obsolete ending:

`lumber-stay`

The absolute Product invariant is:

**40 canonical ordinary-career endings**

Historical snapshot totals such as:

- 42 global endings;
- 8 exact-static presentation slots;

are not final invariants after later non-ordinary families are assembled.

Therefore Stage 4 must inspect the actual post-Activity base and assert:

- post-retirement live ending set =
  pre-retirement set minus exactly `lumber-stay`;
- canonical ordinary ending count = 40;
- unrelated Secret Debt/Palace/Activity endings survive;
- unrelated current presentation slots survive.

Doing legacy retirement before Activity would make that final set-preservation test weaker and would invite stale absolute-count assumptions.

## Wage/Hard Work isolation dependency

Because Stage 4 runs late, focused QA can prove D46/D47 do not alter:

- Secret Debt hidden-work wage;
- Palace duty economics;
- Activity rewards;
- Strong Meta slot capacity.

This order is safer than moving D46/D47 earlier.

---

# 5. Stage 5 — final closure

Final closure must remain last.

It owns combined assertions that cannot be authoritative earlier:

- final save/migration matrix;
- final player-facing localization/UI audit;
- presentation/source integrity;
- regression partition;
- Windows packaging/persistence smoke.

## Save/migration dependency

Accepted Chat 5 refresh defines:

- 36 top-level semantic save/reload cases;
- mixed D38+D39 states;
- bound Secret Debt + Activity/Camp;
- Palace progress + later Debt binding;
- legacy lumber + modern Meta;
- old Strong Meta snapshots;
- protected profile merge;
- exactly-once reward transactions.

These cases require all four production tranches to exist together.

Running the final closure suite before Stage 4 would not prove the release candidate.

## Player-facing dependency

Current Chat 6 branch:

`chat6/final-player-facing-release-audit-v39`

may produce:

- no-op closure; or
- localization/presentation-only fixes for P0/P1 issues.

Any such accepted final copy/presentation delta belongs in Stage 5 unless an earlier owning tranche explicitly needs it for its focused acceptance.

Runtime/UI-logic findings from Chat 6 require Leader routing and must not be silently fixed as copy.

## Final packaging dependency

Installed-app persistence, backup recovery, update compatibility and clean-machine smoke require the fully assembled source candidate.

They are not substitutes for source-tree CI.

---

# 6. Dependency graph

The production dependency chain is:

```text
D42 exact-main green
  ->
Secret Debt + D51
  ->
Palace + D39
  ->
Activity + Camp + D38
  ->
D46 + D47 + legacy
  ->
final closure
```

Additional prerequisite edges:

```text
D39 live-consumer closure v39-v41
  -> Palace focused acceptance

Camp v19 executable baseline repair
  -> Activity historical v15-v17 composition

D38/D39 semantic-union contract
  -> Activity focused acceptance

Activity v36 Network copy correction
  -> final Activity/localization value

Chat6 final player-facing audit v39-v41
  -> final closure
```

These edges do not require changing the five burn-down stages.

---

# 7. Parallel work that is safe

The following may happen before their production stage without violating order:

- research/preflight;
- exact-head QA;
- mapping audits;
- conflict maps;
- localization audits;
- test-plan authoring.

In particular:

- Chat 3 D39 live-consumer mapping may run while Chat 2 assembles Secret Debt;
- Chat 4 D46/D47/legacy preassembly work may run before Stage 4;
- Chat 6 final player-facing audit may run before Stage 5.

What may **not** happen out of order is current-main production merge ownership.

---

# 8. Unsafe reorderings

## Palace before Secret Debt+D51 exact-main

Unsafe because Palace would integrate against a Night/Energy/ending transaction base that is about to change.

## Activity before Palace exact-main

Unsafe because D38 Strong Meta must union with actual D39 registry/runtime state.

## D46/D47/legacy before Activity exact-main

Not Product-invalid in isolation, but unsafe for final release integration because:

- legacy set-preservation would be tested against an incomplete ending/presentation catalog;
- late engine/economy isolation would not cover final Activity/Camp.

## Final closure before Stage 4 exact-main

Unsafe because combined save/migration and presentation assertions would not represent the final candidate.

---

# 9. No extra stage required

The audit found no dependency that requires:

- moving one of the five stages;
- adding a sixth broad burn-down stage;
- reopening D42;
- merging worker branches directly.

The only newly explicit prerequisite is D39 live-consumer closure inside the Palace stage.

All other unresolved risks fit naturally inside their existing selective-assembly stage or final closure.

---

# 10. Stop conditions

Stop progression to the next production stage if:

- previous stage is merged but exact-main CI is not green;
- D39 live-consumer mapping remains unresolved when Palace candidate assembly reaches focused acceptance;
- Activity begins from anything other than actual post-Palace main;
- D38 assembly attempts to preserve standalone registry cardinality/version instead of current semantic union;
- v19 Activity baseline repair is omitted;
- legacy retirement relies on stale global ending/presentation counts;
- final closure begins before Stage 4 exact-main green;
- a worker research branch is treated as current-main assembly authority.

---

# 11. Disposition

The Leader's five-stage order is correct.

No reorder is required.

One dependency must be added explicitly to Stage 2:

**D39 live-consumer closure v39-v41 must be resolved before Palace focused acceptance/merge.**

Everything else is already correctly placed as:

- prior-stage exact-main dependency;
- selective-assembly work;
- or final-closure work.

**READY FOR LEADER / CHAT2 USE**
