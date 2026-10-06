# Chat 5 — Activity Regions v15 Exact-Head QA v31

Status: **EXACT-HEAD CLASSIFIED — REGION SEMANTICS ACCEPTED WITH REQUIRED v19 BASELINE REPAIR**  
Owner: Chat 5  
Branch: `chat5/activity-exact-head-qa-bundle-v31`

No frozen producer was modified.  
No full CI was run.

## Frozen source

Accepted four-region source:

`chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Documented implementation head:

`13f67618bbe63e2e089381aaf605adef173f94e9`

Independent comparison proves the implementation head -> final frozen head delta is only:

`mindy-successor/docs/tasks/CHAT3_RESTRICTED_SITES_PRODUCTION_v15.md`

There is no post-implementation prototype mutation.

## Exact-head strict QA

Workflow:

`Chat 5 Activity v31-v32 exact-head QA`

Strict run:

`37464942972`

Regions job:

`112273514832`

Runner:

self-hosted Windows X64

Node:

`22.18.0`

Verified checkout:

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Results:

- exact SHA guard — **PASS**
- `npm ci` — **PASS**
- `npm run typecheck` — **FAIL**
- later strict steps were skipped after the typecheck failure.

Exact typecheck failure:

`tests/item-capability-activity-closure.test.ts(124,23)`

The synthetic undeclared-capability option is missing the now-required:

`effects: []`

This is not a v15 Restricted Sites mechanic failure.

It is the inherited test-fixture defect already documented and repaired by the accepted Camp baseline repair v19.

## Complete exact-head diagnostic

Diagnostic run:

`37465314115`

Regions job:

`112274748974`

The diagnostic job used the same exact frozen checkout and continued after the known typecheck blocker so that the remaining source could be classified.

Observed:

- exact SHA guard — PASS;
- `npm ci` — PASS;
- typecheck underlying command — same known inherited fixture failure;
- `npm run validate` — **FAIL**;
- `npm run build` — **PASS**;
- selected four-region focused execution — **13 PASS / 6 FAIL**.

The validation failure is:

`read worldFact activity.forest-frontier.result.research-grade`

missing from the Forest capability manifest.

The six focused failures are file-level catalog-load failures caused by exactly that same missing typed-capability declaration:

- `anomalous-reach-production-v14.test.ts`
- `forest-frontier-production-hardening-v12.test.ts`
- `item-capability-activity-closure.test.ts`
- `qa-activity-option-reload.test.ts`
- `restricted-sites-production-v15.test.ts`
- `trade-corridor-production-v13.test.ts`

They do not identify six independent runtime regressions.

All six stop at catalog construction on the same Forest manifest read.

## Accepted repair authority

The exact repair source already accepted for final Activity assembly is:

`chat4/activity-camp-baseline-repair-v19`

Executable-green repair head:

`efde0a38bf71a8946194402a9fc47abb168f2aff`

Final repair branch head:

`8b5874faa23130208c83818af3f37431c1377caa`

Green evidence:

- run `37206785081`
- job `111449513323`
- exact SHA guard PASS
- `npm ci` PASS
- typecheck PASS
- validate PASS
- build PASS
- focused Activity/Camp/migration/region/NightFlow **107/107 PASS**
- Camp-specific **7/7 PASS**

v19 explicitly repairs the two blockers exposed by this exact-head QA:

1. test fixture:
   `effects: []`
   in `item-capability-activity-closure.test.ts`;
2. Forest capability manifest reads, including:
   `activity.forest-frontier.result.research-grade`
   and the subsequently exposed
   `forest.frontier.school-reflection-recorded`.

v19 also updates only stale cumulative test assumptions/fixtures needed to execute the already-authored v15 semantics.

Its handoff confirms the Activity runtime semantic firewall is unchanged.

Therefore Chat 2 must assemble the v15 region semantics together with the accepted v19 baseline repair instead of trying to make the historical v15 branch independently green.

## Region contract independently verified from frozen source/tests

The frozen v15 source and authored focused test explicitly require all four production regions:

- `lumber.forest`
- `trade.corridor`
- `anomalous.reach`
- `restricted.sites`

For each production region the v15 test asserts:

- entry Energy = **2**
- Field Time = **6**

Restricted Sites additionally proves:

- Year 3 + real preparation entry gate;
- entry Energy paid once;
- save/reload does not repay entry Energy;
- Infiltration/Suspicion persistence;
- Sealed Annex season/access anti-bypass;
- Context Wing anti-bypass;
- item/career/relationship preparation gates;
- success/failure/escape separation;
- meaningful extraction;
- Network/Preservation/Pathfinder seams;
- D38 readiness remains separate from ending commit.

The frozen test also explicitly asserts Restricted Sites production does not touch:

- `palace.access-granted`;
- `palace.d23-qualified`;
- lender / Secret Debt state;
- NightFlow;
- universal Activity XP.

No Activity capability is a Palace substitute.

## Forest / Trade / Anomalous compatibility

v15 is cumulative over v12/v13/v14.

Its handoff records that the pre-existing Activity definitions remain unchanged while Restricted Sites is added.

The later v19 executable repair demonstrates the cumulative v12-v15 region suite can run green after only baseline manifest/test repairs, without a v15 runtime semantic rewrite.

This is the appropriate executable proof for the old cumulative region source.

## Assembly rule

Chat 2 must not wholesale copy the historical v15 branch.

Selectively preserve:

- the four-region D36 definitions/content;
- shared finite Field Time model;
- Restricted Sites typed Suspicion extension;
- authored region/capability gates;
- exact 2-Energy entry;
- exact 6 Field Time;
- no Palace/Secret Debt bypass.

Also carry the accepted v19 baseline repairs.

## Stop conditions

Stop Activity assembly if:

- any production region entry cost differs from 2 Energy;
- any of the four production regions loses Field Time 6;
- a route/item/School/career/relationship gate is weakened;
- Activity becomes a Palace qualification/access substitute;
- Activity suppresses Secret Debt forced Night;
- universal Activity XP appears;
- v15 is copied without the accepted v19 manifest/test baseline repair;
- final assembled typecheck/validate/build or region focused suite fails.

## Disposition

The frozen v15 head is **not independently executable-green** because it carries two already-known inherited baseline QA defects.

Those defects are exactly covered by the accepted executable-green v19 repair and are not v15 region mechanic regressions.

The accepted region semantics remain valid for selective final assembly.

**READY FOR CHAT2 ASSEMBLY ONLY WITH v19 BASELINE REPAIR**
