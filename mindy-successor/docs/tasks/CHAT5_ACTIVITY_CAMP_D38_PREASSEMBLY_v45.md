# CHAT 5 — Activity + Camp + D38 preassembly handoff v45

Status: **BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**
Owner: Chat 5
Date: 2026-10-06
Branch: `chat5/activity-camp-d38-preassembly-v43`

This is the final Chat5 preassembly handoff for the Activity + Camp + D38 package.

It is **not** a production candidate and must not be merged as one. No synthetic cumulative source tree was created. Frozen producer branches were not mutated. No full CI was run. `main` was not merged.

## Final live checkpoint

Final re-query before this handoff:

- live `main`: `99e52051845ce966a769939521d01687830a3240`;
- prior live-main checkpoint used during v43: `1a3b00a37a3cda23a9e6163ec79774e3ddcaef4d`;
- the eight commits from `1a3b00...` to `99e520...` change only worker task/pointer documentation, not the Activity/Camp/D38 production surfaces audited by v43;
- Chat5 head immediately before this v45 commit: `27d248901a681682bacda13081e73bd632595e46`.

Chat 2 remains the sole current-main assembly/full-CI lane.

## Evidence documents

v43 lineage/collision audit:

`mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_LINEAGE_COLLISION_AUDIT_v43.md`

v44 exact-head focused QA evidence:

`mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_EXACT_HEAD_QA_v44.md`

## Frozen authorities

### Activity cumulative baseline

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

This is not a one-file Restricted Sites patch. It is the cumulative four-region v12-v15 Activity line:

`main@ecaf2af...`
→ Forest v12
→ Trade v13
→ Anomalous v14
→ Restricted Sites v15 `ab378d...`.

Protected runtime identities:

- Activity entry = **2 Energy**;
- Field Time = **6**;
- no universal Activity XP.

Exact frozen definitions confirm 2 Energy + 6 Field Time for:

- `lumber.forest`;
- `trade.corridor`;
- `anomalous.reach`;
- `restricted.sites`.

### Camp cumulative authority

`efde0a38bf71a8946194402a9fc47abb168f2aff`

Camp is a cumulative branch from Activity v15.

Protected contract:

- explicit local `campStateVersion=1`;
- persisted staged boundary;
- `maxNights <= 2`;
- first and second field nights can persist;
- third field night cannot be committed;
- calendar advance exactly once;
- Field Time refresh exactly once;
- ordinary Camp does not become city NightFlow;
- eligible Secret Debt forced `nightPhase(before_lodging)` preempts Camp;
- Camp never suppresses forced Night.

Exact executable evidence:

- QA-only workflow commit: `d67635b8a5d2439b712bb981f934c3231f5d6c93`;
- workflow run: `37206785081`;
- job: `111449513323`;
- exact checkout guard: `efde0a38bf71a8946194402a9fc47abb168f2aff`;
- `npm ci`: PASS;
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- focused Activity/Camp/save-reload/Night: **107/107 PASS**.

### D38 mechanics

`3cf69d7cb3df1a58d68908159d0acc14736435c4`

Strict descendant of Activity v15.

Canonical endings:

- `ending.activity.pathfinder`;
- `ending.activity.preservation`;
- `ending.activity.network`.

Canonical Specialist rewards:

- `specialist.activity.surveyors-atlas`;
- `specialist.activity.field-archive`;
- `specialist.activity.contact-network`.

### D38 content / presentation

`df9ef5c3d04cfd8eb582c24838d971854e984218`

Strict descendant of D38 mechanics.

Adds the accepted D38 content/localization/presentation/UI layer on top of v16 mechanics.

### D38 reachability audit

`7ae7a9b273f1806ac04b566c318896783bab6595`

Strict descendant of v17. Its delta from v17 is documentation/pointer only; production tree is unchanged.

Accepted reachability identity remains:

- 3/4 regional anchors common baseline;
- >=2 distinct mini-game families;
- meaningful extraction;
- resolved contact/network thread;
- ending-specific marked-anchor exactness;
- explicit ending commit;
- <=10 Activity entries is a healthy ceiling;
- about 5 entries is a credible prepared reference;
- Day 120 is a reference target, not a hard gate;
- Camp is not required by the current same-day four-region D38 paths.

The historical v18 warning about bound Street Energy stacking is now governed by the later accepted D51 rule. Assembly must verify the exact D51 floor behavior rather than re-open Product design.

## Lineage classification

### Cumulative lines

Activity:

`v12 -> v13 -> v14 -> v15 ab378d...`

D38:

`ab378d... -> 3cf69d... -> df9ef5... -> 7ae7a9...`

Camp:

`ab378d... -> Camp v17 -> Camp v19 efde0a...`

### Parallel lines

After `ab378d...`, Camp and D38 are parallel.

GitHub compare shows D38 v18 and Camp v19 diverge with exact merge-base:

`ab378d68765f7c9bbff43abf3b4b41e24df82e01`.

When both are reduced to their true authored deltas relative to that common ancestor, the D38 and Camp changed-path sets have **zero direct intersection**.

This does **not** make whole-branch integration safe. Each branch carries stale ancestral snapshots of the other lane's missing work.

## Collision map

### Activity/current-main high-risk shared files

Never copy whole historical snapshots of:

- `content/definitions.json`;
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/ui/app.ts`.

These have changed independently on current main since the historical Activity fork.

### Camp/current-main high-risk files

- `src/core/engine.ts`;
- `src/core/schema.ts`.

These are save/runtime authority surfaces and have independently changed on current main.

Camp also changes:

- `src/core/content.ts`;
- `content/packs/forest-frontier-production.json`;
- several cumulative Activity focused tests.

Even where current-main compare did not report an independent modification, use selective semantic application only.

### D38/current-main high-risk files

Never copy whole historical snapshots of:

- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- `src/ui/app.ts`.

All have independently changed on current main since the historical fork.

### D38/Camp collision identity

There is no direct same-path authored-delta collision relative to Activity v15.

The collision is **lineage/snapshot**, not same-file authored intent:

- D38 whole tree contains pre-Camp Activity core snapshots;
- Camp whole tree contains no D38 ending/content additions.

Therefore:

- no branch merge;
- no directory copy;
- no whole-file overwrite from either historical tree.

## Exact recommended selective assembly order

Chat2 should use its current-main full tree as the only assembly target.

### 1. Activity cumulative semantic delta

Bring the accepted four-region v12-v15 Activity contract into current main.

Do not replace current schema/runtime/UI files wholesale.

Immediately verify:

- four regions exist;
- each entry is exactly 2 Energy;
- each finite Field Time is 6;
- regional success/failure/escape;
- mini-game families;
- save/reload;
- no universal Activity XP.

### 2. Camp delta `ab378d... -> efde0a...`

Fold only Camp-owned runtime/schema/content/test changes into the current Activity tree.

Special handling:

- preserve the current global schema/migration chain;
- integrate Camp as local `campStateVersion=1`;
- preserve current Secret Debt start-day activation after a Camp calendar advance;
- preserve current NightFlow;
- preserve D51 Energy behavior;
- use the Camp-repaired Activity test versions where v19 repaired cumulative fixtures.

Run Camp/save/Night focused QA before adding D38.

### 3. D38 mechanics `ab378d... -> 3cf69d...`

Transplant D38 ending definitions, reward bindings and focused tests.

Do not replace core engine/schema/content files from the D38 historical snapshot.

### 4. D38 content `3cf69d... -> df9ef5...`

Key/record-level merge into current:

- definitions;
- localization;
- presentation;
- UI.

Preserve newer current-main registry/accessibility/content entries.

### 5. D38 v18 evidence

No production patch expected.

Use v18 as the reachability/pacing acceptance contract.

### 6. Current-main adjacency

Only after all layers are selectively composed:

- Activity + D51 bound Street Energy;
- Camp + Secret Debt forced Night;
- Camp + current save/migration chain;
- D38 + current Strong Meta registry;
- D38 + current ending completion lifecycle;
- Activity/D38 + current UI/localization/presentation.

## Focused executable roster for Chat2

Before Chat2 full CI, run:

`npm ci`

`npm run typecheck`

`npm run validate`

`npm run build`

Then at minimum:

```text
node --experimental-strip-types --test
tests/activity.test.ts
tests/item-capability-activity-closure.test.ts
tests/forest-frontier-production-hardening-v12.test.ts
tests/trade-corridor-production-v13.test.ts
tests/anomalous-reach-production-v14.test.ts
tests/restricted-sites-production-v15.test.ts
tests/activity-camp-persistence-v17.test.ts
tests/migration.test.ts
tests/qa-activity-option-reload.test.ts
tests/qa-exactly-once-reload.test.ts
tests/night-flow.test.ts
tests/activity-ending-family-v16.test.ts
tests/activity-ending-content-presentation-v17.test.ts
```

If current-main test names were intentionally superseded, preserve the same assertions rather than reviving obsolete test APIs.

Also include current-main tests for:

- D51 bound Street floor2 under exactly the Street -1 + bound-Night -1 pair;
- Secret Debt start-day activation on calendar advancement;
- Strong Meta Specialist capacity = 2;
- ending permanent reward exactly-once lifecycle;
- current save schema migration and profile merge.

## Save / migration stop conditions

Stop assembly and classify before any repair if:

1. integrating Camp would require downgrading/replacing the current global schema version;
2. Camp migration would infer progress from `startedDay`, checkpoint, calendar day, route, Field Time or housing instead of neutral old-save defaults;
3. partial/unsupported Camp persisted state becomes silently accepted;
4. Camp calendar commit can replay after reload;
5. Camp Field Time refresh can replay after reload;
6. a third field night is reachable;
7. current Secret Debt start-day trap activation is skipped after a Camp calendar advance;
8. forced Secret Debt Night can be bypassed/suppressed/delayed by Camp;
9. bound Street + forced-Night interaction leaves Activity below the accepted D51 legal 2-Energy floor in the exact protected pair;
10. D38 reward integration creates a third Specialist slot or a hidden free Activity slot;
11. D38 eligibility auto-commits an ending;
12. current-main IDs conflict with canonical D38 ending/reward IDs;
13. any proposed repair introduces universal Activity XP.

## v44 execution note

Camp is exact-head executable-green.

A fresh Chat5 exact-head matrix for Activity/D38 was attempted. The Windows runner proved that Activity v15 can be checked out exactly, passes the exact SHA guard, and completes `npm ci`; that attempt was intentionally cancelled while the QA harness was being corrected. GitHub-hosted fallback jobs failed before any workflow steps existed. The final Windows run `37503918423` remained queued at the final handoff checkpoint.

Therefore:

- do not call Activity v15 or D38 v18 newly executable-green from this Chat5 session;
- do not call either failed;
- classify the missing fresh execution as **runner/infrastructure evidence gap**;
- no producer repair is requested on that basis;
- Chat2 must execute the focused roster on its actual current-main assembly regardless.

## Producer-repair blockers

**None identified.**

No Product ambiguity or frozen-producer structural defect was found that requires reopening Activity, Camp, or D38 production before Chat2 assembly prep.

Any failure during Chat2 selective current-main assembly should first be classified as one of:

- current-main semantic collision;
- save/migration composition conflict;
- stale test API/fixture;
- true producer defect.

Do not repair frozen historical branches in place.

## Product invariants to preserve verbatim

- Activity entry = **2 Energy**;
- Field Time = **6**;
- Camp maximum = **2 field nights**;
- Camp never suppresses Secret Debt forced Night;
- no universal Activity XP;
- accepted D38 ending IDs and marked-anchor reachability;
- D51 floor2 remains only for the exact Street -1 + bound-Night -1 pair and is not a global Energy floor;
- D28 Strong Meta Specialist capacity remains 2.

## Chat2 handoff decision

The package is sufficiently mapped for current-main selective assembly preparation.

Chat2 should not start from any frozen producer branch. It should start from its then-current full current-main tree and replay the exact semantic deltas in the order above.

No full CI belongs to this Chat5 branch.

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**
