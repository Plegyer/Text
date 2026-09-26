# Release Candidate QA Gate v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Activation baseline: PR20 merged  
Activation merge commit: `9b427d75dc22021cd3373aa7dd3521782e54152d`  
Current main milestone commit observed during gate preparation: `d255ded647b97087892d80a755496da6282be0d1`

## Purpose

This is the exact QA gate to apply to the first release candidate after production activation.

PR20 successfully activates the School/Lumber vertical slice and its merge record states a green merge-ref:

`npm run check -> 187/187 tests`.

That is the activation merge gate.

It is not, by itself, the final Product Acceptance or release-candidate gate.

Release candidate approval requires all sections below to be satisfied from the same integrated main/release candidate or from explicitly identified, non-stale evidence.

---

# Gate A — exact release-candidate revision

Record:

- main SHA;
- release-candidate SHA/tag if different;
- content version;
- package version;
- build environment / Node version.

All later evidence must identify the exact revision it covers.

If main changes after a gate run, rerun the affected gate.

---

# Gate B — full repository check

From:

`mindy-successor/prior-work/astra/prototype-m3.2`

run:

```bash
npm ci
npm run check
```

Required:

- typecheck PASS;
- validate PASS;
- build PASS;
- full tests PASS;
- zero skipped tests that hide required activation coverage.

Capture:

- exact test total/pass/fail;
- validation catalog counts;
- build completion line;
- candidate SHA.

PR20's recorded 187/187 is valid evidence for the activation merge revision, but the release candidate must rerun after integrating any worker checkpoint tests or QA gates.

---

# Gate C — shipped dist smoke

Run after build:

`tests/qa-shipped-dist-smoke-contract.test.ts`

or the equivalent integrated shipped-dist contract.

Required assertions:

- `dist/content.json` exists;
- dist definitions equal production source definitions;
- dist presentation equals production source presentation;
- exact expected production pack set;
- target Lumber definitions present;
- synthetic `school.lumber-management` absent;
- fixture-only `school-production` pack absent;
- target endings present;
- exact Hard Work condition;
- exact `hardWork:lumber`;
- Night/Activity definitions present;
- production media paths exist in built assets;
- semantic presentation derivation remains valid.

A source-level content test cannot replace the built artifact check.

---

# Gate D — schema-4 compatibility

Execute the compatibility cases defined by:

`PRODUCT_ACTIVATION_SAVE_EDGE_MATRIX_v1.md`.

Required PASS:

1. pre-activation schema-4 save without School state;
2. old pending scene without presentationId;
3. canonical slash pending presentationId roundtrip;
4. representative legacy Lumber action count/lastAction;
5. representative legacy School action count/lastAction;
6. active Activity reload;
7. NightFlow before lodging;
8. NightFlow after paid lodging;
9. paid School lesson reload;
10. ending committed reload;
11. completed Hard Work reload;
12. older ended schema-4 compatibility result idempotency.

No load may replay costs, rewards, RNG or calendar movement.

---

# Gate E — activation regression subset

Run:

`tests/qa-product-activation-regression-subset.test.ts`

after rebasing/integrating it onto post-PR20 main.

Required PASS:

- target Lumber shift;
- milestone/Foreman professional route;
- paid School transaction;
- School reload;
- Night lodging/reload;
- Foreman Night/reload;
- Forest A5 entry/reload/result using the explicitly labeled QA capability adapter;
- Forest continuation;
- simultaneous Forest + Hard Work eligibility in prepared state;
- 49 -> real 50th shift;
- ending commit/reload;
- completion/reload;
- one `hardWork:lumber`.

Important:

this regression subset is architecture/integration evidence, not proof that the missing production item acquisition path exists.

---

# Gate F — worker checkpoint integration

Use:

`WORKER_CHECKPOINT_INTEGRATION_AUDIT_v1.md`.

Before release candidate approval, integrate or explicitly disposition the high-value branch-only regressions.

Priority A:

1. Chat 3 Lumber ending independence;
2. Chat 3 Forest acceptance depth;
3. Chat 5 School schema-4 typed-state compatibility;
4. Chat 5 full School reload matrix, updated for PR20 semantics;
5. Chat 5 full School Night-choice catalog, updated for typed Night counter;
6. Chat 2 presentation activation acceptance, updated for positive semantic persistence.

Each must be one of:

- **INTEGRATED_AND_GREEN**
- **SUPERSEDED_BY_NAMED_TEST**
- **DEFERRED_WITH_EXPLICIT_REASON**

No worker test may disappear silently.

Do not merge stale negative expectations merely because they were previously green.

Examples that must be rewritten or superseded:

- old slash-presentation rejection test;
- old missing-target-media expectation;
- pre-arrival School fixture assumptions.

---

# Gate G — fault injection

Execute representative failure/recovery cases from:

`PRODUCT_ACTIVATION_FAULT_INJECTION_v1.md`.

Minimum required release-candidate cases:

- School insufficient money;
- School insufficient Energy;
- crash/reload after successful School transaction;
- failed lodging choice atomicity;
- crash/reload after lodging payment;
- Night-study reload exactly once;
- active Activity checkpoint reload;
- incompatible Activity envelope rejection;
- ending commit at 49 rejects atomically;
- reload after ending commit has no reward;
- completion/reload preserves one reward transaction;
- missing presentation media changes presentation only.

Every case must assert state recovery, not just error text.

---

# Gate H — post-merge product smoke

Run:

`PRODUCT_ACTIVATION_POST_MERGE_SMOKE_v1.md`

against the actual built candidate.

Required route:

```text
startup
-> creation
-> arrival
-> target Lumber
-> paid School
-> NightFlow
-> School Night study
-> Forest
-> 49/50 Hard Work
-> commit
-> completion
-> reload
```

At each declared checkpoint record:

- normalized save;
- HUD state;
- pending/flow state;
- presentationId;
- transaction proof where applicable.

If Forest cannot be entered legitimately because the item/capability acquisition path is still absent, the smoke is **BLOCKED**, not PASS.

Do not inject the QA capability adapter into a manual production smoke and call the product requirement complete.

---

# Gate I — Product Acceptance final blocker ledger

Use:

`PRODUCT_ACCEPTANCE_FINAL_BLOCKERS_v1.md`.

At the current post-PR20 state the remaining blocker categories are:

## BLOCKED_BY_OPEN_AUTHORING

- Day-1 Satyr Maid / Undead Farm visible alternatives;
- Lumber shift wage/economy contract as written by the execution plan;
- School milestone/public fact;
- School -> Lumber authored fact/threshold;
- Forest 3 route contexts / 3 challenge families / season depth.

## BLOCKED_BY_RUNTIME

- real item/capability resolver/acquisition;
- legitimate Forest entry capability path;
- item-dependent Activity action-space change.

## NEEDS_LIVE_EVIDENCE

- Lumber context-entry interpretation;
- in-production Activity reload after legitimate entry;
- production success -> Lumber continuation after legitimate entry;
- simultaneous target ending eligibility from a production-path state.

The release candidate cannot claim the full Product Acceptance Slice complete while any required row remains blocked.

---

# Gate J — Hard Work immutable contract

On the exact release candidate, assert production:

`ending.lumber.hard-work`

has exactly one condition:

```json
{
  "kind":"careerCounter",
  "career":"lumber",
  "counter":"completed_shifts",
  "op":"gte",
  "value":50
}
```

and exact reward:

```json
{
  "kind":"hardWork",
  "rewardId":"hardWork:lumber",
  "career":"lumber"
}
```

Executable boundary:

- 49: unavailable;
- one real `lumber.shift`;
- 50: eligible;
- eligibility does not complete run;
- commit does not grant reward;
- completion grants once;
- reload does not duplicate.

Any extra prerequisite or reward-ID change fails the gate.

---

# Gate K — semantic presentation contract

Required representative semantic IDs:

- `location/town/default`
- `job/lumber/shift/spring/default`
- `job/lumber/result/default`
- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `school/arcana/lesson/default`
- `night/lodging/default`
- `night/choice/default`
- `activity/forest/route/default`
- `job/lumber/event/lumber-cross-activity-forest-return/default`
- `ending/lumber/hard-work`.

Required invariants:

- slash IDs survive persistence;
- gameplay IDs remain slash-free;
- persisted pending/result presentation IDs are consumed by UI;
- missing optional media falls back without mechanical mutation;
- Animation Off remains presentation-only.

---

# Gate L — OPEN authoring ledger

Release notes/QA handoff must not hide intentionally open product work.

At minimum keep visible:

- Satyr Maid / Undead Farm starting alternatives;
- School teacher/certificate/milestone authoring;
- School public fact threshold for Lumber;
- real Old Boundary Token acquisition/capability;
- work tool + extraction/tool capability;
- Forest route/challenge/season depth;
- Lumber economy/wage decision if the PA execution plan remains unchanged.

These are not bugs to be silently patched by QA.

They require product/design implementation and then new executable evidence.

---

# Release-candidate disposition levels

## ACTIVATION_GREEN

May be used when:

- PR20 activation is merged;
- full activation check is green;
- production definitions/UI/packs are active.

This status is already represented by the merged PR20 milestone.

It does **not** mean Product Acceptance complete.

## RC_TECHNICALLY_GREEN

Requires:

- Gates A–G and J–K PASS;
- worker checkpoint integration disposition complete;
- no schema/save/reload blocker;
- no full-check failure.

Product authoring blockers may still prevent Product Acceptance completion.

## PRODUCT_ACCEPTANCE_GREEN

Requires additionally:

- Gate H complete without fixture-only bypasses;
- every PA00–PA26 row is PASS;
- no `BLOCKED_BY_OPEN_AUTHORING`;
- no `BLOCKED_BY_RUNTIME`;
- no unresolved `NEEDS_LIVE_EVIDENCE`;
- Gate L open items required by this Product Acceptance slice are closed.

---

# Current disposition

At the time this gate is written:

- PR20 production activation: **MERGED / ACTIVATION_GREEN milestone recorded**;
- PR20 merge record: **187/187**;
- Chat 4 shipped-dist test: **branch-only, must be integrated/run post-build**;
- Chat 4 PA regression subset: **branch-only, must be integrated/run**;
- worker checkpoint high-value tests: **not yet integrated into main**;
- fault-injection execution: **not yet captured**;
- post-merge live product smoke: **not yet captured**;
- Product Acceptance open authoring/runtime blockers: **still present**.

Therefore:

**Release candidate is not yet PRODUCT_ACCEPTANCE_GREEN.**

This is a gate result, not a request to change production files from Chat 4.

No production runtime/UI/content file was modified by Chat 4.
