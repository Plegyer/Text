# Chat 2 — Stage 2 Palace Base Reconstruction Recovery v69

Status: **RESUME NOW — RECONSTRUCT ACCEPTED v15 -> v16 -> v18 CUMULATIVE PALACE BASE**
Owner: Chat 2 / sole current-main production assembly + full-CI lane

## Why this recovery exists

The original v68 task incorrectly assumed that the accepted Palace v15/v16 production base was already present on post-Stage1 main.

It is not.

The blocker reported by Chat 2 is valid.

At blocker time the work branch contained **no production changes** relative to main, so do not reset or replace the branch.

Continue on:

`chat2/assembly-palace-d39-d48-current-main-v68`

## Exact accepted cumulative authority

### v15 Palace runtime/base

Branch:

`chat6/palace-rich6-runtime-producer-v15`

Exact accepted head:

`40623a9de8b5a11ac9493b865c9f3fadd0435e1c`

Handoff:

`CHAT6_PALACE_RICH6_RUNTIME_PRODUCER_v15.md`

v15 is the missing mechanical base.

It owns the cumulative Palace runtime for:

- run-local typed Palace progression;
- exact six Palace stages;
- exact 15 structural duties;
- exact milestone counts 2 / 5 / 8 / 12 / 15;
- one structural duty/day;
- one support action/day;
- Energy 1 duty/support semantics;
- bounded Palace wage;
- route-prep state;
- non-True finalize events/endings;
- Return Home eligibility seam.

### v16 Palace UI

Branch:

`chat6/palace-player-facing-ui-v16`

Exact accepted head:

`65b9e668ff7112c86681905d62f723b6cf95cec0`

v16 is an exact descendant of v15.

It adds the accepted Palace player-facing UI layer.

### v18 Palace Prince / D45 narrative

Branch:

`chat6/palace-prince-narrative-producer-v18`

Exact accepted head:

`67f948d185883d8e706dad522e5010bff8e2bd48`

v18 is an exact descendant of v16.

It adds Prince confrontation + D45 narrative on top of the v15/v16 base.

## Proven ancestry

Accepted cumulative order:

`v15@40623a9d -> v16@65b9e668 -> v18@67f948d1`

Do not attempt to apply only the v16->v18 delta to current main.

First reconstruct the accepted v15 runtime/base semantically, then v16 UI, then v18.

## v15 reconstruction — direct-add Palace-only files

These are absent on current main and may be added from exact v15 authority after path-existence confirmation:

- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`
- `tests/palace-rich6-runtime-v15.test.ts`

Do not repair the known three missing outcome-finalize read capabilities yet.
That belongs to Chat4 after v18 assembled head is frozen.

## v15 reconstruction — shared semantic union only

Do NOT whole-file replace these from v15:

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/palace.ts`
- `content/definitions.json`
- `content/localization.json`

Port only the accepted v15 Palace-owned semantics.

### schema.ts

Add/merge only the typed:

`run.progression.palace`

state and its Palace-specific fields/defaults/invariants required by v15.

Preserve all current schema-5 save/migration fields, Secret Debt state, D51-adjacent state and later current-main fields.

Do not create `progression.careers['palace']`.

### engine.ts

Port only Palace duty/support transaction behavior required by v15.

Preserve current:

- Secret Debt;
- D51 provenance and next-day Energy ordering;
- forced Night precedence;
- Activity;
- School;
- current Strong Meta;
- current ending/migration transactions.

### palace.ts

Merge the cumulative v15 Palace runtime helpers/constants/state validation needed by v15.

Do not restore deprecated permanent Palace unlock behavior.

### definitions.json

Merge only stable Palace definitions from v15:

- Palace career machine;
- 15 duty actions;
- 6 support actions;
- Palace endings/seams required by v15.

Preserve all current non-Palace definitions.

### localization.json

Merge only exact v15 Palace localization keys.

Never replace the file.

## v16 reconstruction

v16 exact delta over v15 is UI/localization-only.

### direct add

Current main lacks:

`src/ui/palaceUi.ts`

Add its accepted v16 base from exact v16 authority.

Also add exact v16 focused tests if absent:

- `tests/palace-player-facing-ui-v16.test.ts`
- `tests/palace-player-facing-ui-renderer-v16.test.ts`

### semantic union

For:

- `src/ui/app.ts`
- `content/localization.json`

port only v16 Palace UI/localization semantics.

Preserve current Secret Debt/D51/Night/Activity/Strong Meta/shared UI.

Never replace `app.ts` or localization wholesale.

## v18 composition after v15/v16 base exists

### direct add

Add if absent:

- `content/packs/palace-prince-confrontation.json`
- `tests/palace-prince-narrative-producer-v18.test.ts`
- `tests/palace-prince-narrative-renderer-v18.test.ts`

### Palace pack semantic updates

Apply the exact v18 Palace-owned delta to:

- `content/packs/palace-invitation.json`
- `content/packs/palace-progression.json`
- `content/packs/palace-outcome-finalize.json`

Preserve pack IDs and accepted mechanics.

### definitions.json

Merge v18 Palace-only additions/updates:

- confrontation quest;
- `palace.confront-prince` action;
- required Palace ending/D45 epilogue semantics.

Preserve current non-Palace definitions.

### palace.ts

Add only v18 Prince/confrontation readiness/constants/helpers over reconstructed v15.

### palaceUi.ts

Add only v18 confrontation availability/defeated presentation state over v16.

### app.ts

Surgically add only v18 Palace/D45 presentation surfaces.

Preserve all current non-Palace UI.

### localization.json

Merge v18 Palace/D45 keys by exact key only.

## Current-main firewall

The cumulative Palace reconstruction must preserve all Stage 1 production behavior:

- Secret Debt v12;
- D51 exact pair floor/provenance behavior;
- forced Night absolute priority;
- ordinary poverty separation;
- current schema/migrations;
- current Strong Meta registry/capacities;
- Activity;
- School;
- Night;
- shared UI/localization/presentation.

Any ambiguity against current main is a STOP condition, not permission to use an older whole-file blob.

## Palace invariants that must hold after v15/v16/v18

- D23 access stays the 10 permanent Hard Work + 10 current-life package gate;
- explicit invitation acceptance;
- exactly 15 structural duties;
- max 1 structural duty/day;
- duty cost exactly 1 Energy;
- support max 1/day;
- no 16th paid duty;
- Palace does not become an ordinary-career domain;
- bound Secret Debt daytime Palace remains legal;
- Prince readiness = exactly 12 progression stats >=91;
- Lust excluded;
- confrontation cost 0 money / 0 Energy;
- deterministic 4 phases;
- retryable;
- no RNG;
- no automatic ending commit;
- only phase-4 success writes `palace.prince-defeated`;
- Return Home stays explicit;
- successor world remains real;
- displacement cause remains unknown.

## Known Chat4 repair — still deferred

After cumulative v18 head is frozen, Chat4 must add exactly these reads to:

`content/packs/palace-outcome-finalize.json -> capabilities.reads.worldFacts`

- `palace.outcome.service-life-ready`
- `palace.outcome.court-power-ready`
- `palace.outcome.inner-truth-ready`

Historical Palace tests may also need strict typing adaptation.

Chat 2 must not change mechanics to hide those known failures.

## Gate sequence for this tranche

After v15 -> v16 -> v18 cumulative composition:

1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. v8 D23 focused test
6. v15 Palace runtime test
7. v16 Palace UI/model + renderer tests
8. v18 runtime/content + renderer tests
9. current Secret Debt/D51 adjacency tests

Classify reds exactly.

Do not run full CI yet.

## Stop condition

Freeze the cumulative v18 assembled SHA and report:

`PALACE_V18_READY_FOR_CHAT4_REPAIR`

Include exact changed files and gate results.

Do not proceed to v19, D39, Strong Meta UI or D48 before Leader1 clears the Chat4 repair.


## Leader1 localization unblock v70

The large-file connector issue is resolved.

Current Stage-1 localization source was read by blob SHA:
`c180f641844d0094ebd533d8939d0339469baadf`

Exact Palace cumulative localization union was derived from historical pre-v15 base -> accepted v18:
- total Palace keys changed: **202**
- added: **198**
- modified: **4**
- removed: **0**
- conflicts against current Stage-1 localization: **0**

Manifest:
`CHAT2_PALACE_LOCALIZATION_UNION_v70.json`

Leader1 already applied this union to the Chat2 work branch:
commit `d61dd0abdf4bd93e6376df8adab39dc262beee7b`

Resulting localization blob:
`0f2a0ef46e68379b654227a0dd35c81417e3795c`

Verification:
- Palace authority mismatches: **0**
- changes outside Palace key set: **0**

Chat2 must **not redo or replace localization** during v15/v16/v18 reconstruction.
Continue with schema/engine/palace/definitions/app and direct-add Palace-only files.
