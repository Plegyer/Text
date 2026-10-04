# CHAT4 — Activity Camp Baseline Repair v19

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
Repair branch: `chat4/activity-camp-baseline-repair-v19`

Frozen Camp producer:

`chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Exact executable-green repair SHA:

`efde0a38bf71a8946194402a9fc47abb168f2aff`

## Result

The v19 repair makes the frozen Camp candidate executable-green without changing Camp runtime semantics.

No full CI was run.

Focused GitHub Actions evidence:

- workflow: `Chat 4 Activity Camp baseline repair v19`
- workflow ID: `374615552`
- green run ID: `37206785081`
- green job ID: `111449513323`
- exact checked-out SHA: `efde0a38bf71a8946194402a9fc47abb168f2aff`

Required outcomes:

- exact SHA guard: **PASS**
- `npm ci`: **PASS**
- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused Activity / Camp / migration / regional / NightFlow suite: **107 / 107 PASS**
- aggregate required-check gate: **PASS**

Camp-specific suite inside the focused run:

- `activity-camp-persistence-v17.test.ts`: **7 / 7 PASS**

## Narrow baseline repairs

### 1. Inherited Activity test typing

File:

`tests/item-capability-activity-closure.test.ts`

The synthetic undeclared-item-capability option was missing the required typed `effects` field.

Repair:

```ts
effects:[]
```

The undeclared item-capability rejection assertion is unchanged.

### 2. Forest capability manifest

File:

`content/packs/forest-frontier-production.json`

Added required read declaration for:

`activity.forest-frontier.result.research-grade`

Executable validation then exposed one second omission of the same class in the same pack: the school-reflection event reads its own guard fact but the manifest had it only under writes.

Added required read declaration for:

`forest.frontier.school-reflection-recorded`

A static scan of all worldFact conditions in this pack after the repair found no remaining undeclared worldFact reads.

No Forest event mechanics, triggers, choices, rewards, D38 semantics or result IDs changed.

### 3. Camp synthetic Night fixture

File:

`tests/activity-camp-persistence-v17.test.ts`

Brought in only the fixture correction already proven by:

`03eab6f049011e81efcda0641a790eaed6ecd803`

The synthetic catalog now declares:

- existing NightFlow last-action identity `rest`;
- `stage.room`;
- `stage.outside`.

No production NightFlow code changed.

## Executable adjacency maintenance uncovered by v19

The v12-v15 producer handoffs explicitly documented that Node tests were not executed on those producer branches. Once v19 removed the catalog/type blockers, several stale cumulative test assumptions became executable for the first time.

Only test fixtures/assertions were repaired:

### Explore cumulative lists

Older v13/v14 tests expected Activity lists from their historical producer snapshot.

The v15 frozen base legitimately contains the cumulative Explore list:

`lumber.forest, trade.corridor, anomalous.reach, restricted.sites, hunter.expedition`

The old regex expectations were updated to the actual cumulative v15 list.

### Legacy Hunter Activity fixture

The v12 unlimited-Field-Time compatibility test attempted to enter `hunter.expedition` without satisfying the current typed Hunter entry contract.

The fixture now supplies the existing accepted Hunter stage/fact required for entry.

The assertion remains the same:

- no declared Field Time -> `fieldTimeRemaining === null`.

### Anomalous Reach Keeper fixture

The Keeper/Network test had Arcana 3 but did not satisfy the separate Rift interpretation prerequisite:

- Old Boundary item capability; or
- Magic >= 5.

The fixture now supplies Magic 5.

No Anomalous Reach option condition was changed.

### Activity-result feedback delivery

Trade Corridor, Anomalous Reach and Restricted Sites each can have several blocking feedback scenes eligible from one Activity result.

The resolver selects one blocking scene per boundary. The lower-priority producer events explicitly declare `dayStarted` fallback triggers.

Old tests drained only the current pending scene and then expected all lower-priority feedback immediately.

The focused tests now explicitly exercise the authored `dayStarted` fallback through `resolveReactions` before asserting:

- Merchant / Guard return facts;
- Supplier Network marker;
- Undead Farm / Arcana feedback;
- Keeper Network marker;
- Handler Network marker;
- Restricted Sites research-grade result.

No resolver code or event priority was changed.

## Runtime semantic firewall

Compared with frozen v17, the following production runtime files are byte-identical on the exact green SHA:

- `src/core/schema.ts`
  - blob `75d0cc41b7eb81f660f5c205608076c37b17047c`
- `src/core/engine.ts`
  - blob `4ff5c575031c0a82407adf12d24fe90668318074`
- `src/core/content.ts`
  - blob `36a0951264b02e6c91a1aaa917069909bf80bd0b`
- `content/definitions.json`
  - blob `de2b15bab80e1dfe181781b9458bbf09151e063d`

Therefore v19 does not change:

- Camp state machine semantics;
- two-night Camp cap;
- exactly-once calendar advance;
- exactly-once Field Time refresh;
- Activity 2-Energy entry;
- Secret Debt forced-Night priority;
- NightFlow production behavior;
- Palace / Strong Meta coupling;
- D38 ending semantics;
- universal Activity XP.

## Focused executable set

The green run executed:

- `activity-camp-persistence-v17.test.ts`
- `activity.test.ts`
- `item-capability-activity-closure.test.ts`
- `forest-frontier-production-hardening-v12.test.ts`
- `migration.test.ts`
- `qa-activity-option-reload.test.ts`
- `qa-exactly-once-reload.test.ts`
- `restricted-sites-production-v15.test.ts`
- `trade-corridor-production-v13.test.ts`
- `anomalous-reach-production-v14.test.ts`
- `night-flow.test.ts`

TAP result:

```text
tests 107
pass 107
fail 0
cancelled 0
skipped 0
todo 0
```

## Assembly guidance

Chat 2 should assemble from the exact green repair SHA:

`efde0a38bf71a8946194402a9fc47abb168f2aff`

The behavioral Camp implementation remains the frozen v17 implementation. The v19 delta is baseline manifest/test repair only.

Do not replace newer final-assembly runtime files wholesale with this older branch. Preserve the final branch's later Secret Debt / save-schema / D38 work and selectively carry the v19 baseline repair delta as appropriate.

**READY_FOR_CHAT2_ASSEMBLY**
