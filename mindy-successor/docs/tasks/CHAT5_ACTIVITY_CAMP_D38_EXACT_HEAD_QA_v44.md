# CHAT 5 — Activity + Camp + D38 exact-head focused QA v44

Status: **COMPLETE WITH INFRASTRUCTURE-LIMITED EXECUTION**
Owner: Chat 5
Date: 2026-10-06
Branch: `chat5/activity-camp-d38-preassembly-v43`

No full CI was run. No frozen producer branch was mutated.

## Frozen heads under this QA

- Activity / Restricted Sites cumulative v15: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- D38 cumulative v18 evidence head: `7ae7a9b273f1806ac04b566c318896783bab6595`
  - production runtime/content is v17 `df9ef5c3d04cfd8eb582c24838d971854e984218`;
  - v18 adds reachability evidence only.
- Camp cumulative executable-repair head: `efde0a38bf71a8946194402a9fc47abb168f2aff`

The D38 v16 mechanics head `3cf69d...` and v17 content head `df9ef5...` are strict ancestors of v18, so v18 is the correct cumulative exact-head representative for focused D38 execution.

## Structural runnable check

All three representative heads contain a full package tree and the required focused tests.

The exact `package-lock.json` blob is identical on Activity v15, D38 v18 and Camp v19:

`77b325bc6b2115499c475adf92d3bae218bf37a1`

This proves the three snapshots share the same dependency lock for the requested `npm ci` gate.

Required focused tests verified present:

Activity:
- `tests/activity.test.ts`
- `tests/item-capability-activity-closure.test.ts`
- `tests/forest-frontier-production-hardening-v12.test.ts`
- `tests/trade-corridor-production-v13.test.ts`
- `tests/anomalous-reach-production-v14.test.ts`
- `tests/restricted-sites-production-v15.test.ts`

D38:
- all Activity regional focused tests above;
- `tests/activity-ending-family-v16.test.ts`;
- `tests/activity-ending-content-presentation-v17.test.ts`.

Camp:
- `tests/activity-camp-persistence-v17.test.ts`;
- Activity regional focused tests;
- `tests/migration.test.ts`;
- `tests/qa-activity-option-reload.test.ts`;
- `tests/qa-exactly-once-reload.test.ts`;
- `tests/night-flow.test.ts`.

## Exact invariant inspection

### Activity v15

Exact frozen definitions show all four D36 regions with:

- `entryEnergyCost: 2`;
- `fieldTimeSegments: 6`.

Verified on:
- `lumber.forest`;
- `trade.corridor`;
- `anomalous.reach`;
- `restricted.sites`.

No universal Activity XP is introduced by the frozen Activity handoff.

### D38 v18

Exact frozen D38 definitions contain the canonical ending IDs:

- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

They bind to the canonical Specialist reward IDs:

- `specialist.activity.surveyors-atlas`;
- `specialist.activity.field-archive`;
- `specialist.activity.contact-network`.

v18 remains evidence-only relative to v17 and does not alter the production tree.

### Camp v19

Exact frozen Camp schema validates:

- `campPolicy.maxNights` in `1..2`;
- persisted `nightsUsed` in `0..2`;
- explicit `calendarAdvanceCommitted`;
- explicit `fieldTimeRefreshCommitted`;
- local `campStateVersion: 1`.

Exact content validation requires Camp only with:

- `timePolicy === "can_advance_days_internally"`;
- finite Field Time.

Exact engine code performs a forced consuming `nightPhase(before_lodging)` selection before the Camp calendar commit. If such a forced event wins, Camp hands off to NightFlow instead of advancing its own boundary. This preserves Secret Debt forced-Night priority.

## Existing exact Camp executable-green evidence

A prior QA-only workflow commit:

`d67635b8a5d2439b712bb981f934c3231f5d6c93`

changed only the Camp focused workflow so that it checked out exactly:

`efde0a38bf71a8946194402a9fc47abb168f2aff`.

Workflow run:

`37206785081`

Job:

`111449513323`

Runner:

self-hosted Windows X64.

The job log verifies:

- exact SHA guard: PASS;
- `npm ci`: PASS;
- `npm run typecheck`: PASS;
- `npm run validate`: PASS;
- `npm run build`: PASS;
- focused Activity + Camp + migration/reload + Night roster: **107 / 107 PASS**;
- required-check gate:
  - typecheck=success
  - validate=success
  - build=success
  - focused=success.

Therefore the frozen Camp authority `efde0a...` is **EXACT-HEAD EXECUTABLE GREEN** for the required Camp/Activity persistence scope.

## New Chat5 v44 exact-head harness

Chat5 added:

`.github/workflows/chat5-activity-camp-d38-preassembly-v44.yml`

The workflow contains no production source and checks out frozen SHAs directly. It requests, per head:

- exact SHA guard;
- `npm ci`;
- typecheck;
- validate;
- build;
- focused Activity / D38 / Camp suites.

No `npm test` all-suite and no `npm run check` / full CI is invoked.

### Harness attempts and classification

Initial attempt:
- run `37503146398`;
- cancelled by a deliberate QA-harness supersession before producer execution.

Windows guard repair attempt:
- run `37503593366`;
- exact Activity v15 checkout and SHA guard passed on self-hosted Windows;
- Node setup passed;
- `npm ci` completed successfully (322 packages);
- typecheck started;
- the run was then cancelled only because the harness was superseded while trying a hosted-runner fallback;
- this is **not** an Activity producer failure.

Hosted-runner fallback:
- run `37503811443`;
- all three matrix jobs failed before any workflow steps existed;
- job records have `steps: null`;
- no checkout, npm command, build command or producer test executed;
- classify as **HOSTED-RUNNER / INFRASTRUCTURE UNAVAILABLE**, not product failure.

Final Windows self-hosted attempt:
- run `37503918423`;
- exact same frozen heads / commands;
- queued at the time this v44 evidence was written because the single project self-hosted runner was not accepting a new job.

## v44 executable disposition

### Camp

**PASS — exact-head executable green.**

Frozen head:
`efde0a38bf71a8946194402a9fc47abb168f2aff`

Evidence:
run `37206785081`, job `111449513323`, 107/107 focused PASS.

### Activity v15

**STRUCTURALLY RUNNABLE; COMPLETE NEW EXECUTION INFRASTRUCTURE-BLOCKED.**

Evidence achieved in the superseded Windows attempt before cancellation:

- exact checkout: PASS;
- exact SHA guard: PASS;
- Node setup: PASS;
- `npm ci`: PASS;
- typecheck began but was cancelled by harness supersession.

There is no producer/test failure to repair.

### D38 v18 cumulative

**STRUCTURALLY RUNNABLE; COMPLETE NEW EXECUTION INFRASTRUCTURE-BLOCKED.**

The exact focused tests and package tree are present. No D38 producer step failed. The final Windows job is queued for the unavailable shared runner.

This must not be misreported as executable-green until a full exact-head run completes.

## Focused acceptance roster for Chat2

Regardless of historical exact-head status, current-main assembly must execute the following after selective composition.

Activity baseline:
- all four region definitions;
- entry exactly 2 Energy;
- Field Time exactly 6;
- save/reload and option checkpoint;
- regional success/failure/escape;
- specialized mini-game families;
- no universal Activity XP.

Camp:
- old-save neutral local migration;
- partial/incompatible Camp state rejection;
- save/reload before/after each staged commit;
- calendar advance exactly once;
- Field Time refresh exactly once;
- first and second field night persist;
- third field night unavailable;
- same-day Activity cannot Camp;
- forced Secret Debt Night preempts Camp;
- no duplicated lodging/Energy modifier/calendar processing.

D38:
- canonical three ending IDs;
- common 3/4 anchors;
- >=2 distinct mini-game families;
- meaningful extraction;
- resolved Network/contact requirement;
- ending-specific two marked-anchor exactness;
- explicit ending commit;
- canonical Specialist reward IDs;
- no extra Specialist capacity;
- no Palace/Hard Work substitution;
- content/localization/presentation coverage.

Adjacency:
- D51 bound Street floor preserves a legal 2-Energy Activity entry under the exact accepted pair of Street -1 + bound-Night -1;
- forced Secret Debt Night remains absolute over Camp;
- current-main save/migration chain owns final global schema;
- D38 reward registry composes with current Strong Meta registry without duplicate ownership paths.

## v44 conclusion

No structural or Product blocker was found in the frozen Activity/Camp/D38 package.

One executable distinction must remain explicit:

- Camp is exact-head executable-green;
- Activity/D38 are structurally runnable and statically consistent, but this Chat5 session could not complete a fresh exact-head executable run because the available runner path was unavailable after harness supersession.

This is an infrastructure evidence gap, not authorization to modify frozen production.

**v44 COMPLETE AS PREASSEMBLY QA — no producer repair requested.**
