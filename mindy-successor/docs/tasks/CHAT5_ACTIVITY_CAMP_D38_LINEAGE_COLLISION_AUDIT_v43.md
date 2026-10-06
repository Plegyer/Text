# CHAT 5 — Activity + Camp + D38 lineage / collision audit v43

Status: **COMPLETE — PREASSEMBLY EVIDENCE**
Owner: Chat 5
Date: 2026-10-06
Branch: `chat5/activity-camp-d38-preassembly-v43`

This audit is preassembly only. It does not create a cumulative production candidate, does not mutate frozen producer branches, does not merge `main`, and does not run full CI.

## Live checkpoint used by this audit

Re-query after context recovery showed:

- live `main`: `1a3b00a37a3cda23a9e6163ec79774e3ddcaef4d`;
- Chat5 branch before the v44 QA-workflow commit: `bc89596980edd04e9ec06a747775de009cca5a71`;
- Chat5 v44 focused-QA workflow commit: `f2fd9f4be07a5a7dabfe2f6ce35883debba58044`.

The worker branch was 3 commits ahead / 8 behind live main at the recovery checkpoint. No production source was present on the Chat5 branch.

## Frozen authorities

- Activity / Restricted Sites baseline: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- D38 mechanics: `3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 content / presentation: `df9ef5c3d04cfd8eb582c24838d971854e984218`
- D38 reachability audit: `7ae7a9b273f1806ac04b566c318896783bab6595`
- Camp executable-repair lineage head: `efde0a38bf71a8946194402a9fc47abb168f2aff`

## Product invariants protected by the audit

The selective assembly must preserve all of the following:

- Activity entry costs exactly **2 Energy**;
- finite regional Field Time is **6**;
- Camp permits at most **2 field nights**;
- Camp never suppresses or outranks an eligible Secret Debt forced Night;
- there is no universal Activity XP layer;
- D38 ending identities stay:
  - `ending.activity.pathfinder`
  - `ending.activity.preservation`
  - `ending.activity.network`;
- D38 accepted marked-anchor semantics and v18 reachability conclusions remain intact.

## 1. Exact Activity cumulative lineage

The frozen Activity baseline is itself cumulative.

Known exact chain:

1. Forest Frontier hardening v12
   - base: `main@ecaf2af5de0932b3c9bd4d87b62533c74ed1e61e`
   - frozen v12 handoff head used by v13: `d151e4b99378d56bf17397cc0df8aa0fffa9d68a`
2. Trade Corridor v13
   - exact base: `d151e4b99378d56bf17397cc0df8aa0fffa9d68a`
   - frozen v13 handoff head used by v14: `d176dea7c640d34e12dbb3abf94c9b7895fd43bb`
3. Anomalous Reach v14
   - exact base: `d176dea7c640d34e12dbb3abf94c9b7895fd43bb`
   - frozen v14 handoff head used by v15: `266f1de7cc9afdccff36d8360771a059d9d19e65`
4. Restricted Sites v15
   - exact base: `266f1de7cc9afdccff36d8360771a059d9d19e65`
   - frozen authority: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Therefore `ab378d...` is a cumulative four-region Activity baseline, not an isolated Restricted Sites patch.

### Activity cumulative production surface from historical base `ecaf2af...`

Production/runtime/content files changed by the cumulative v12-v15 line:

- `content/definitions.json`
- `content/packs/anomalous-reach-production.json`
- `content/packs/forest-frontier-production.json`
- `content/packs/restricted-sites-production.json`
- `content/packs/trade-corridor-production.json`
- `src/core/content.ts`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`
- `tests/anomalous-reach-production-v14.test.ts`
- `tests/chat3-forest-authored-depth-v13.test.ts`
- `tests/forest-frontier-production-hardening-v12.test.ts`
- `tests/restricted-sites-production-v15.test.ts`
- `tests/trade-corridor-production-v13.test.ts`

All paths above are under `mindy-successor/prior-work/astra/prototype-m3.2/`.

### Activity snapshots already stale against current main

Since the historical Activity fork point, live main has independently changed at least:

- `content/definitions.json`
- `src/core/engine.ts`
- `src/core/schema.ts`
- `src/ui/app.ts`

This is a hard stop on whole-file replacement from the frozen Activity branch.

## 2. Exact D38 cumulative lineage

GitHub compare establishes a strict cumulative chain:

`Activity v15 ab378d...`
→ `D38 mechanics v16 3cf69d...`
→ `D38 content/presentation v17 df9ef5...`
→ `D38 reachability v18 7ae7a9...`

Exact compare facts:

- `ab378d... -> 3cf69d...`: **ahead 4 / behind 0**, merge-base exactly `ab378d...`;
- `3cf69d... -> df9ef5...`: **ahead 3 / behind 0**, merge-base exactly `3cf69d...`;
- `df9ef5... -> 7ae7a9...`: **ahead 2 / behind 0**, merge-base exactly `df9ef5...`.

The v18 delta from v17 is documentation/pointer only; it changes no production runtime/content. Therefore the runnable production tree at `7ae7a9...` is the v17 production tree plus the accepted v18 reachability evidence.

### D38 authored delta relative to Activity v15

Production files:

- add `content/activity-ending-family-v16.fixture.json`
- add `content/activity-ending-missing-assets-v17.json`
- modify `content/definitions.json`
- modify `content/localization.json`
- modify `content/presentation.json`
- modify `src/ui/app.ts`
- add `tests/activity-ending-family-v16.test.ts`
- add `tests/activity-ending-content-presentation-v17.test.ts`

The D38 lineage does **not** author changes to `src/core/engine.ts`, `src/core/schema.ts`, or `src/core/content.ts` after Activity v15.

### D38 snapshots already stale against current main

Since the historical fork, live main independently changed every shared D38 production snapshot that is modified in-place:

- `content/definitions.json`
- `content/localization.json`
- `content/presentation.json`
- `src/ui/app.ts`

Therefore Chat2 must transplant D38-owned records/hunks semantically into current-main files. Copying any of those whole files from `7ae7a9...`, `df9ef5...` or `3cf69d...` is unsafe.

## 3. Exact Camp lineage

GitHub compare establishes:

`Activity v15 ab378d...`
→ Camp v17 implementation / migration line
→ Camp baseline executable-repair line
→ frozen Camp authority `efde0a38bf71a8946194402a9fc47abb168f2aff`

Compare `ab378d... -> efde0a...` is **ahead 21 / behind 0**, with merge-base exactly `ab378d...`.

The v17 handoff states that its implementation head before the handoff was `5bef0a22498f533d537245038d520742e57e9c9e`. Later v19 repair commits repair cumulative Activity fixtures/tests without changing the locked Camp Product contract.

### Camp authored delta relative to Activity v15

Production/runtime files:

- modify `content/packs/forest-frontier-production.json` with narrow read-capability declarations required by cumulative validation;
- modify `src/core/content.ts`;
- modify `src/core/engine.ts`;
- modify `src/core/schema.ts`;
- add `tests/activity-camp-persistence-v17.test.ts`;
- repair cumulative Activity focused tests:
  - `tests/anomalous-reach-production-v14.test.ts`
  - `tests/forest-frontier-production-hardening-v12.test.ts`
  - `tests/item-capability-activity-closure.test.ts`
  - `tests/restricted-sites-production-v15.test.ts`
  - `tests/trade-corridor-production-v13.test.ts`.

The Camp producer does not author D38 endings/content.

### Camp snapshots already stale against current main

Since the historical fork, live main independently changed at least:

- `src/core/engine.ts`
- `src/core/schema.ts`

These are high-risk save/runtime collision files. They must never be replaced wholesale by the historical Camp versions.

`src/core/content.ts` and the Forest pack were not reported as independently changed in the exact historical-base -> current-main compare used by this audit, but they still must be applied selectively because the Camp branch is historical and current main can move again before assembly.

## 4. D38 versus Camp: parallel lineage classification

D38 and Camp are **parallel after Activity v15**.

Compare facts:

- D38 v18 -> Camp v19: **diverged**, merge-base `ab378d...`;
- D38 v17 -> Camp v19: **diverged**, merge-base `ab378d...`;
- Activity v15 -> Camp v19: strict **ahead**, merge-base `ab378d...`.

Most important collision result:

**The authored deltas relative to their common Activity v15 ancestor have zero direct changed-path intersection.**

That means there is no same-file authored D38-vs-Camp patch collision when each lane is reduced to its true delta from `ab378d...`.

However there is a serious **lineage/snapshot collision**:

- the D38 branch contains pre-Camp snapshots of Activity core/runtime and baseline tests through ancestry;
- the Camp branch contains no D38 ending/content additions;
- merging/copying either whole historical branch after the other can silently remove the other lane's work.

This is exactly why branch merges and whole-file copies are forbidden for this stage even though the true authored deltas are path-disjoint.

## 5. Recommended selective current-main assembly order

Chat2 should assemble only onto its current-main full tree.

Recommended order:

1. **Activity cumulative v12-v15 semantic delta**
   - reconstruct from the accepted Activity cumulative lineage, not from whole-file snapshots;
   - preserve current-main schema/runtime/UI changes around Activity-owned hunks;
   - run Activity focused baseline immediately.

2. **Camp delta from common ancestor `ab378d...` to `efde0a...`**
   - fold Camp schema/state into the current public save schema instead of replacing global schema history;
   - preserve current-main NightFlow and Secret Debt activation/start-day hooks;
   - preserve max 2 field nights and forced-Night absolute precedence;
   - include v19 cumulative fixture/test repairs as test/content-capability deltas, not historical whole files;
   - run Camp persistence/save-reload/Night adjacency immediately.

3. **D38 mechanics delta `ab378d... -> 3cf69d...`**
   - transplant ending definitions/reward bindings/tests into the now-current Activity tree;
   - no core engine replacement.

4. **D38 content/presentation delta `3cf69d... -> df9ef5...`**
   - semantically merge localization/presentation/UI records with current main;
   - do not overwrite current localization/presentation registries.

5. **D38 reachability evidence `df9ef5... -> 7ae7a9...`**
   - evidence/docs only; no production patch is expected;
   - use v18 route/pacing expectations as focused QA acceptance criteria.

6. **Current-main adjacency pass**
   - Secret Debt + Street + Activity 2-Energy availability;
   - forced Night vs Camp boundary;
   - current save/migration chain;
   - D38 explicit commit and reward registry adjacency;
   - no universal Activity XP.

This order is chosen to place high-risk save/runtime composition before D38 data/presentation composition and to make failures attributable to one layer at a time. It does not create or imply a synthetic cumulative producer candidate.

## 6. Collision map for Chat2

| Surface | Activity | Camp | D38 | Current-main risk | Required handling |
|---|---|---|---|---|---|
| `src/core/schema.ts` | yes | yes after Activity | no authored post-v15 delta | changed on main | semantic/hunk merge; preserve latest global schema |
| `src/core/engine.ts` | yes | yes after Activity | no authored post-v15 delta | changed on main | semantic/hunk merge; preserve Debt/Night hooks |
| `src/core/content.ts` | yes | yes after Activity | no authored post-v15 delta | historical | selective Camp validator additions |
| `src/ui/app.ts` | yes | no Camp delta | yes | changed on main | merge Activity/D38 UI additions into current UI |
| `content/definitions.json` | yes | no Camp delta | yes | changed on main | record-level merge; never whole-file copy |
| `content/localization.json` | no v12-v15 cumulative delta reported | no | yes | changed on main | key-level merge |
| `content/presentation.json` | no v12-v15 cumulative delta reported | no | yes | changed on main | key-level merge |
| Forest pack | Activity add | narrow Camp repair | no D38 delta | historical | keep Activity content + Camp capability additions |
| Activity baseline tests | Activity add | several repaired by Camp v19 | D38 inherits snapshots only | lineage collision | use Camp-repaired versions where same test exists |
| D38 focused tests | no | no | add | additive | bring intact, then adapt only for current-main APIs if necessary |

## 7. Save / migration stop conditions

Chat2 must stop and request a producer/current-main repair instead of guessing if any of these occur:

- Camp local `campStateVersion=1` cannot be integrated without downgrading/replacing the current global schema chain;
- existing current-main save migrations would infer Camp progress from calendar/checkpoint data;
- a partial/unsupported Camp persisted state becomes silently accepted;
- Camp calendar advancement bypasses the current start-day Secret Debt activation hook;
- an eligible Secret Debt forced Night can be skipped, delayed, or suppressed by Camp;
- a Camp boundary can duplicate calendar advance or Field Time refresh after reload;
- current-main Activity entry can no longer remain exactly 2 Energy under the accepted D51 floor behavior;
- D38 record IDs collide with newer authoritative current-main IDs;
- D38 reward registration would create an extra Specialist slot or bypass D28 capacity;
- a proposed repair requires inventing universal Activity XP.

## 8. v43 disposition

The lineage is sufficiently mapped for Chat2 preassembly.

Key classification:

- Activity v15: **cumulative historical baseline**;
- D38 v16-v18: **strict cumulative chain on Activity v15**;
- Camp v19: **strict cumulative chain on Activity v15, parallel to D38**;
- D38 vs Camp true deltas: **path-disjoint**;
- D38 vs Camp whole historical snapshots: **unsafe to merge/copy because of divergent ancestry**;
- current main: **newer authority for shared schema/runtime/UI/content registries**.

**v43 COMPLETE.**
