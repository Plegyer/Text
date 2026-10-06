# Chat 5 — Final Merge and Regression Sequence v36

Status: **SEQUENCE FROZEN — READY FOR LEADER / CHAT2 EXECUTION**  
Owner: Chat 5  
Branch: `chat5/final-cross-tranche-readiness-v34`

Scope: final integration cadence only.

No runtime changes.  
No full CI.

---

# 1. Global cadence

For every remaining production stage, use exactly this sequence:

```text
current-main selective assembly
  ->
focused QA
  ->
typecheck / validate / build
  ->
one full branch CI
  ->
freeze exact candidate SHA
  ->
Leader review / merge
  ->
exact-main CI on merge SHA
  ->
only then decrement burn-down
  ->
start next production stage from that exact-main-green main
```

Do not skip or reorder these gates.

Producer/research branches do not own full CI.

Chat 2 is the sole current-main assembly/full-CI lane unless Leader explicitly changes ownership.

---

# 2. What each gate means

## Focused QA

Purpose:

prove the changed tranche and nearest shared-system firewalls before spending the full-CI gate.

Focused QA includes:

- exact domain tests;
- adjacent shared-engine/schema/save tests;
- cross-domain isolation sentinels required by the tranche.

If focused QA fails:

- stop;
- classify;
- repair on the assembly branch;
- rerun the failed/affected focused set;
- do not run full CI until focused is green.

## Typecheck / validate / build

These are required before full CI even when individual producer evidence previously passed.

The current composed branch is authoritative.

Required:

```text
npm run typecheck
npm run validate
npm run build
```

All must exit 0.

## Full branch CI

Authoritative workflow:

`.github/workflows/mindy-successor-check.yml`

For Chat 2 assembly branches the full repository check is permitted.

The workflow executes:

```text
npm ci
npm run check
```

where `npm run check` covers:

- typecheck;
- catalog validation;
- build;
- tests.

Run one full CI on the exact candidate after focused QA is green.

Do not consume repeated full-CI runs for known focused failures.

## Freeze exact candidate SHA

After full CI is green:

- record exact Chat 2 assembly SHA;
- record workflow run/job IDs;
- record test summary;
- stop changing that candidate.

Report:

`READY_FOR_LEADER_MERGE`

Chat 2 does not merge main.

## Leader merge

Leader verifies:

- correct accepted sources;
- focused evidence;
- full CI green on exact candidate;
- no unauthorized scope.

Leader then merges the frozen candidate.

## Exact-main CI

The main workflow automatically runs for prototype production changes.

Required:

- exact merged main SHA;
- `mindy-successor check`;
- conclusion SUCCESS.

Do not treat the branch full-CI run as exact-main evidence.

Do not decrement burn-down until exact-main is green.

## Burn-down decrement

Only after:

1. Leader merge;
2. exact-main CI SUCCESS.

Then decrement by exactly one broad stage.

If exact-main fails:

- stage remains open;
- burn-down does not change;
- repair from the failed exact-main state;
- repeat focused/full-CI/merge/exact-main as appropriate.

---

# 3. Current burn-down

Current broad burn-down:

**5**

Remaining stages:

1. Secret Debt + D51
2. Palace
3. Activity + Camp + D38
4. D46 + D47 + legacy
5. final closure

Expected decrements:

- after Stage 1 exact-main green: **5 -> 4**
- after Stage 2 exact-main green: **4 -> 3**
- after Stage 3 exact-main green: **3 -> 2**
- after Stage 4 exact-main green: **2 -> 1**
- after Stage 5 exact-main green: **1 -> 0**

Burn-down 0 means source-tree assembly is closed.

It does **not** by itself mean Windows 1.0 release acceptance is complete.

The packaged release gate follows.

---

# 4. Stage 1 cadence — Secret Debt + D51

Current branch:

`chat2/assembly-secret-debt-d51-current-main-v1`

## Assembly inputs

- Secret Debt v12;
- D51 producer v20;
- Secret Debt localization v27;
- accepted Secret Debt+D51 preflight/final packet.

## Focused gate

Must cover:

- full Secret Debt route;
- lender/trap timing;
- forced Night priority;
- Bound Life exactly 50 hidden shifts;
- Takeover explicit;
- endings exactly once;
- ordinary jobs locked while bound;
- School/Activity still available;
- D51 Street+bound pair floor 2;
- unrelated later Energy penalty may go below 2;
- NightFlow;
- save/reload;
- ending-meta / Strong Meta reward ownership;
- D42 preservation.

Then:

- typecheck;
- validate;
- build.

## Full CI

One full CI on exact Chat 2 candidate.

If green:

freeze candidate SHA and report ready.

## Merge gate

Leader merges.

Then exact-main CI on merge SHA.

Only after SUCCESS:

**burn-down 5 -> 4**

Then Palace may begin production assembly.

---

# 5. Stage 2 cadence — Palace + D39

## Pre-assembly dependency

Before Palace focused acceptance, freeze the current Chat 3 D39 live-consumer closure:

`chat3/palace-d39-live-consumer-closure-v39` through v41.

If no unique safe Formal Introduction or Source Method consumer exists:

**STOP**

Do not improvise consumer content.

## Assembly base

Use actual main after Stage 1 exact-main green.

## Focused gate

Must cover:

- Palace access/progression;
- duty ledger;
- Prince confrontation;
- four Palace endings;
- D39 reward lifecycle;
- Steady Practice;
- Formal Introduction mapped live consumer;
- Source Method mapped live consumer;
- save/reload;
- Source Method automatic knowledge;
- Specialist capacity remains 2;
- Secret Debt forced Night isolation;
- no ordinary-career/Activity leakage;
- presentation/localization/prose/media.

Then:

- typecheck;
- validate;
- build.

## Full CI

One full CI on frozen Palace candidate.

## Merge gate

Leader merge -> exact-main CI.

Only after SUCCESS:

**burn-down 4 -> 3**

Then Activity production assembly starts from that exact main.

---

# 6. Stage 3 cadence — Activity + Camp + D38

## Assembly base

Actual post-Palace exact-main-green main.

## Required accepted stack

- v15 four-region source;
- Camp v17 semantics;
- v19 executable baseline repair;
- D38 v16 mechanics;
- v17 content/presentation;
- v26 canonical D38 rewards;
- v27 authored mapping;
- v28 final assembly packet;
- D38/D39 collision contract;
- v36 Activity Network epilogue correction.

## Focused gate

Must include:

- all four Activity regions;
- entry Energy = 2;
- Field Time = 6;
- capability/route gates;
- Camp persistence;
- forced Secret Debt Night preemption;
- D51 isolation;
- D38 ending eligibility/explicit commit;
- canonical Strong Meta rewards;
- combined D38+D39 registry/runtime;
- exact 4/3/3 authored mapping;
- Atlas once-per-region cost behavior;
- Contact normal-route vs lateral-use charging;
- Field Archive source/derived durability;
- save/reload;
- presentation/localization;
- v36 Network copy.

Then:

- typecheck;
- validate;
- build.

No full CI if any focused assertion fails.

## Full CI

One full CI on exact Activity candidate.

## Merge gate

Leader merge -> exact-main CI.

Only after SUCCESS:

**burn-down 3 -> 2**

Then D46/D47/legacy begins from that exact main.

---

# 7. Stage 4 cadence — D46 + D47 + legacy retirement

## Assembly base

Actual post-Activity exact-main-green main.

## Focused gate

Must prove:

### D46

- fresh Lust 5;
- old stored Lust preserved;
- starting money 600;
- base Energy 3;
- Lumber wage base 35;
- other nine ordinary wages 37;
- ordinary wage cap 120;
- no cap leakage to Secret Debt/Palace/Activity.

### D47

- exact ten profession packages;
- package stat mapping;
- package atomicity;
- no Strong Meta slot consumption;
- Prostitute separate Lust +5;
- existing lives do not receive retroactive package application.

### Legacy

- no live `lumber-stay`;
- historical vitality normalization once;
- +1 daily Energy exactly once;
- no Hard Work/Forewoman/Forest fabrication;
- RunResult/history preserved;
- eligible-only/unfinished historical states handled safely.

### Final ending/presentation set

- exactly 40 canonical ordinary-career endings;
- live global ending set =
  pre-retirement set minus exactly `lumber-stay`;
- unrelated Secret Debt/Palace/Activity endings preserved;
- unrelated presentation slots preserved.

Then:

- typecheck;
- validate;
- build.

## Full CI

One full CI on exact Stage 4 candidate.

## Merge gate

Leader merge -> exact-main CI.

Only after SUCCESS:

**burn-down 2 -> 1**

Then final closure starts.

---

# 8. Stage 5 cadence — final closure

## Assembly base

Actual post-Stage-4 exact-main-green main.

No earlier branch snapshot is sufficient.

## Inputs

Final closure combines:

- save/migration refresh v28;
- 36-case combined matrix v29;
- regression partition v30;
- final localization/presentation authority;
- Chat 6 final player-facing audit v39-v41;
- latest accepted copy-only corrections;
- current authoritative accessibility/source-integrity tests.

## Focused final-closure gate

Run one authoritative final save/reload suite implementing the 36-case matrix.

Do not keep a duplicate old 23-case final suite as a second release requirement.

Required coverage includes:

- schema ladder;
- D40/D41 compatibility;
- Secret Debt/D51;
- Palace;
- Activity/Camp;
- D38+D39 mixed Strong Meta;
- D46/D47;
- lumber retirement;
- old Strong Meta snapshots;
- protected profile merge;
- exactly-once reward/payment/calendar boundaries;
- content stable-ID resolution.

Also run latest final:

- localization completeness;
- presentation;
- source integrity;
- locale/accessibility parity;
- generic localized ended-screen;
- one-save drift sentinel.

Then:

- typecheck;
- validate;
- build.

## Full CI

One full CI on exact final-closure candidate.

## Merge gate

Leader merge -> exact-main CI.

Only after SUCCESS:

**burn-down 1 -> 0**

Record that exact main SHA as the source-tree release candidate.

---

# 9. Final 1.0 gate after Stage 5

Burn-down 0 + exact-main green is necessary but not sufficient.

Use:

`mindy-successor/docs/qa-prep/WINDOWS_RELEASE_CHECKLIST_v1.md`

against the exact source-tree release candidate SHA.

## Source identity

Record:

- exact main SHA;
- Windows build/machine identity;
- Node/npm versions;
- final test count.

Working tree must be clean.

## Package command

Run:

`npm run dist:win`

Important:

`dist:win` already reruns the complete `npm run check`.

If source has not changed since exact-main CI, do not insert an additional redundant ad-hoc full test run immediately afterward.

Require:

- NSIS x64 build success;
- installer artifact under `release/`;
- installer filename/size;
- SHA-256.

## Installed-app gate

Test the generated installer, not `npm start`.

Require:

- default install;
- path with spaces/non-ASCII;
- installed launch without source checkout;
- create/save/reload;
- close/reopen persistence;
- uninstall safety.

## Clean-machine gate

Windows x64 machine/VM with:

- no Git checkout;
- no Node;
- no npm;
- no source tree.

Offline primary smoke:

- installer hash matches;
- install/launch succeeds;
- create run;
- action/save/reload;
- blocking event persistence;
- paid Night no duplicate charge;
- Activity no duplicate 2-Energy entry;
- ending/reward checkpoint idempotent.

## Mixed-state persistence smoke

Include one final mixed Strong Meta state:

- one D38 Specialist selected;
- one D39 Specialist selected;
- at least one run-local use in each family;
- save;
- close;
- reopen installed app.

Require:

- exact selected loadout preserved;
- runtime usage preserved;
- no third Specialist;
- no duplicate reward/use.

## Backup/recovery gate

Require:

- primary save valid;
- known-good backup;
- corrupt primary -> backup recovery;
- corrupt primary + backup -> safe load failure;
- corrupted sources not overwritten as valid;
- rapid saves do not leave accepted partial JSON.

## Update gate

Install a prior compatible build.

Create a representative save.

Install final candidate over it.

Require successful final migration/load.

## Media / no-development-path gate

Require:

- packaged relative media works;
- missing optional media stays mechanically neutral;
- installed app does not depend on:
  - source `src/`;
  - source `content/`;
  - original top-level assets path;
  - localhost;
  - npm;
  - TypeScript;
  - Git repository;
- bundled save validator works;
- offline launch succeeds.

## Manual player-facing smoke

Use final Chat 6 manual copy/presentation matrix.

Cover:

- all ending families;
- Night;
- Secret Debt;
- Activity;
- Palace;
- generic ending screen;
- RU/EN switch;
- alt/captions;
- retired-content absence;
- no raw keys/fallback labels.

---

# 10. What happens if final packaging fails

Do not automatically reopen gameplay mechanics.

Classify first:

- packaging;
- installer;
- filesystem/path;
- userData persistence;
- migration;
- media packaging;
- localization/presentation;
- genuine runtime source defect.

## If no source change is required

Fix/rebuild packaging configuration as appropriate and rerun the affected package gates.

## If source changes

The source-tree release candidate identity is invalidated.

Required again:

1. focused affected regression;
2. full branch CI;
3. Leader merge;
4. exact-main CI;
5. new exact release SHA;
6. rebuild installer;
7. rerun affected installed/clean-machine gates.

Do not ship an installer whose source SHA differs from the recorded exact-main-green candidate.

---

# 11. Evidence ledger required per stage

For each Stage 1-5 record:

- assembly branch;
- exact candidate SHA;
- accepted source refs;
- focused commands/tests;
- focused counts;
- typecheck result;
- validate result;
- build result;
- branch full-CI run ID/job ID;
- Leader merge SHA;
- exact-main run ID/job ID;
- exact-main conclusion;
- burn-down before/after.

For final 1.0 additionally record:

- release candidate main SHA;
- installer filename;
- installer size;
- installer SHA-256;
- clean-machine identity;
- installed-app smoke;
- mixed-state persistence;
- backup recovery;
- update migration;
- offline/no-source-tree result;
- manual copy/presentation result.

---

# 12. No-wait rule inside a stage

Once Chat 2 receives an active stage:

continue continuously through:

```text
compose
-> focused QA
-> repair if needed
-> typecheck/validate/build
-> full CI
-> freeze candidate
```

Do not stop between those substeps merely to wait for Leader.

The intentional stop is after a frozen full-CI-green candidate:

`READY_FOR_LEADER_MERGE`

Leader then owns merge and exact-main verification.

After exact-main green, Leader authorizes/starts the next stage.

---

# 13. Final sequence summary

```text
Stage 1 Secret Debt+D51
focused -> full CI -> Leader merge -> exact-main -> 5->4

Stage 2 Palace+D39
focused -> full CI -> Leader merge -> exact-main -> 4->3

Stage 3 Activity+Camp+D38
focused -> full CI -> Leader merge -> exact-main -> 3->2

Stage 4 D46+D47+legacy
focused -> full CI -> Leader merge -> exact-main -> 2->1

Stage 5 final closure
focused -> full CI -> Leader merge -> exact-main -> 1->0

Then exact SHA:
dist:win
-> installer hash
-> installed smoke
-> clean-machine
-> mixed-state persistence
-> backup/corruption
-> update migration
-> media/offline/no-dev-path
-> manual RU/EN/presentation smoke
-> 1.0 release acceptance
```

No broad burn-down decrement occurs before exact-main success.

No 1.0 release acceptance occurs before packaged-candidate gates pass.

**SEQUENCE READY FOR EXECUTION**
