# Chat 5 — Final Release Blocker Register v35

Status: **CURRENT BLOCKERS ONLY**  
Owner: Chat 5  
Branch: `chat5/final-cross-tranche-readiness-v34`

Scope: concise release blocker register.

No runtime changes.  
No full CI.

This register intentionally excludes historical issues that are already repaired, accepted, or superseded.

---

# A. Must fix before next assembly

## B1 — Secret Debt + D51 current-main candidate is not yet closed

Current assembly branch:

`chat2/assembly-secret-debt-d51-current-main-v1`

Observed current implementation head:

`a02d4931087e0884756a6888354b8a69e0327b02`

This is the active Stage 1 production assembly.

It is not yet a frozen green candidate.

Before Palace production assembly starts, Stage 1 must complete:

- canonical Secret Debt mechanics/schema/content composition;
- D51 Street+bound Energy compatibility;
- canonical Strong Meta reward binding;
- localization v27;
- focused QA;
- typecheck/validate/build;
- one branch full CI;
- Leader merge;
- exact-main CI.

This is a release gate, not evidence of a semantic defect.

**Owner:** Chat 2 -> Leader exact-main gate.

---

## B2 — D39 live-consumer closure is unresolved

Current research branch:

`chat3/palace-d39-live-consumer-closure-v39`

Required before Palace focused acceptance:

- one legal existing ordinary-professional consumer mapping for Formal Introduction;
- one legal information-only consumer mapping for Source Method;
- exact stable IDs;
- focused test guidance;
- no Palace/Activity/Secret Debt target leakage;
- no generic relationship/access bypass;
- no D49 macro-truth leak.

The accepted D39 runtime/reward producer exists, but release completeness requires accepted live authored consumers.

If Chat 3 finds no unique safe mapping, this becomes a real Leader/Product blocker and Palace assembly must stop.

**Owner:** Chat 3 mapping -> Chat 2 Palace assembly.

---

# B. Can fix during selective assembly

These are real unresolved integration items, but they do not require a new prior stage or Product reopening if the accepted contracts can be implemented as written.

## B3 — Secret Debt current-base shared-file reconciliation

The current Stage 1 candidate still must prove the accepted semantics on current main across:

- shared engine/schema;
- ending transactions;
- Strong Meta;
- NightFlow;
- D51 Energy provenance;
- localization.

No current focused/full-CI green candidate has been frozen yet.

Resolve in the active Secret Debt selective assembly.

**Owner:** Chat 2 Stage 1.

---

## B4 — Palace current-base D39 consumer wiring

After B2 freezes exact mappings, Chat 2 must wire them into the actual post-Secret-Debt Palace candidate while preserving:

- original event/relationship/scene gates;
- D39 run-local use;
- slot model;
- save/reload;
- Palace/Activity/Secret Debt firewalls.

This is an assembly task, not a separate producer requirement.

**Owner:** Chat 2 Stage 2.

---

## B5 — D38 + D39 Strong Meta semantic union

Activity is assembled after Palace.

Standalone D38 and D39 producers represent different historical registry forks.

Final combined state must preserve:

- 25 reward IDs;
- 22 Specialists;
- 3 Keystones;
- Specialist capacity 2;
- Source Method as automatic knowledge;
- cap-200 as normal Specialist;
- both runtime families;
- old active snapshot compatibility.

Do not wholesale replace post-Palace `strongMeta.ts` with the standalone D38 producer.

**Owner:** Chat 2 Stage 3.

---

## B6 — Activity historical v15-v17 source requires accepted v19 baseline repair

Independent v31/v32 exact-head QA confirmed the historical v15/v16/v17 heads inherit:

- one synthetic Activity test typing defect;
- Forest capability-manifest read omissions.

These are **not new active defects** because accepted v19 already repairs them and is executable-green at 107/107.

The unresolved release requirement is simply:

**carry the accepted v19 repair during selective Activity assembly.**

Do not attempt to ship the raw historical baseline without it.

**Owner:** Chat 2 Stage 3.

---

## B7 — D38 authored tags are mapped but not yet assembled

Research v27 defines exact production mapping:

- Atlas: 4 options;
- Archive: 3 result IDs;
- Contact Network: 3 contact options.

The final catalog still needs those tags applied and executable assertions proving exact 4/3/3 membership.

Normal Contact route availability must remain independent of Specialist ownership.

**Owner:** Chat 2 Stage 3.

---

## B8 — Field Archive durability must cover derived facts

Current accepted Activity source can publish secure-eligible extraction facts before final Activity outcome.

Anomalous/Restricted reactions may derive research-grade facts.

Final assembly must prevent an unsecured source result lost on later escape/failure from leaving unsupported durable research-grade progression behind.

Preferred:

- defer durable projection until source durability is known.

Acceptable:

- dependency-aware rollback.

Do not make research-grade itself Archive-eligible.

**Owner:** Chat 2 Stage 3.

---

## B9 — Activity Network v36 copy override must win over v17

Final authoritative key:

`ending.ending.activity.network.epilogue`

must use the accepted Chat 6 v36 RU/EN value.

This is a one-key content merge requirement.

It must not change mechanics.

**Owner:** Chat 2 Stage 3 or final localization composition, but must be present before final closure.

---

## B10 — D46/D47/legacy must use current-base set preservation

Stage 4 must not use stale historical global counts.

Required final rules:

- exactly 40 canonical ordinary-career endings;
- remove exactly one live `lumber-stay`;
- preserve every unrelated current ending;
- preserve every unrelated current presentation slot;
- preserve Secret Debt/Palace/Activity;
- historical vitality remains +1 daily Energy exactly once.

D46/legacy shared engine/definitions edits must be manually composed onto the post-Activity base.

**Owner:** Chat 2 Stage 4.

---

# C. Final closure only

## B11 — final 36-case combined save/reload suite is not yet the release candidate gate

Accepted matrix:

`CHAT5_FINAL_COMBINED_SAVE_MATRIX_v29.md`

Final closure must exercise:

- 36 top-level semantic cases;
- D38+D39 mixed selection/runtime;
- bound Secret Debt + Activity/Camp;
- Palace progress + later Debt binding;
- legacy lumber + modern Meta;
- old Strong Meta snapshots;
- protected profile merge;
- exactly-once rewards.

This cannot be closed meaningfully before Stages 1-4 are merged and exact-main green.

**Owner:** Chat 2 Stage 5.

---

## B12 — final player-facing audit may still produce P0/P1 content fixes

Current Chat 6 branch:

`chat6/final-player-facing-release-audit-v39`

Audit scope includes:

- Night;
- Secret Debt;
- Activity;
- Palace;
- School;
- Strong Meta;
- save/load notices;
- ending screen;
- generic UI labels;
- alt/captions.

If it finds content-only P0/P1 issues, the accepted correction must be included before release.

Runtime/UI-logic findings require Leader routing.

**Owner:** Chat 6 audit -> Chat 2 Stage 5 / Leader if runtime.

---

## B13 — final packaged Windows persistence gate remains open

After Stage 5 exact-main green, release still requires packaged-candidate evidence:

- `dist:win`;
- installer SHA-256;
- installed launch;
- save/reload;
- mixed D38+D39 runtime persistence;
- backup recovery;
- corrupted-primary behavior;
- corrupted-primary+backup safe failure;
- compatible installer update;
- offline / no-source-tree launch;
- media/fallback smoke.

Source-tree CI cannot prove these behaviors.

**Owner:** final release QA.

---

# Not active blockers

The following are explicitly **closed / superseded** and must not be carried as active release blockers:

- D42 old Guard presentation assertion failures;
- D42 exact-main pending state;
- historical v15/v16/v17 standalone typecheck/validation failures as independent defects;
  - accepted v19 covers them;
- Camp 6/7 historical fixture failure;
  - v19 Camp is 7/7 and cumulative 107/107;
- D38 reward producer uncertainty;
  - exact-head QA is 79/79;
- D39 reward producer uncertainty;
  - focused QA is 59/59;
- D46 producer uncertainty;
  - focused QA green;
- D47 producer uncertainty;
  - exact-head QA green;
- lumber-stay producer readiness;
  - focused-green;
- old Secret Debt localization QA baseline issue;
  - classified as baseline, not producer failure;
- global presentation old Guard namespace mismatch;
  - repaired before D42 closure;
- stale global ending total `42`;
  - not a release invariant;
- stale exact-static presentation total `8`;
  - not a release invariant;
- the v17 Activity Network four-direction wording as final copy;
  - superseded by accepted v36.

---

# Release blocker summary

## Must fix before next assembly

1. finish Secret Debt+D51 through exact-main green;
2. freeze safe D39 live-consumer mappings before Palace acceptance.

## Can fix during selective assembly

3. current Secret Debt shared-file reconciliation;
4. Palace D39 consumer wiring;
5. D38+D39 Strong Meta union;
6. carry Activity v19 repair;
7. apply/test exact D38 authored tags;
8. implement Field Archive derived-fact durability;
9. apply v36 Network copy override;
10. perform D46/D47/legacy current-base semantic composition and set preservation.

## Final closure only

11. 36-case combined save/reload closure;
12. final player-facing audit corrections, if any;
13. packaged Windows persistence/update/backup smoke.

No other known open issue currently justifies blocking the five-stage Leader order.

**REGISTER CURRENT — READY FOR LEADER USE**
