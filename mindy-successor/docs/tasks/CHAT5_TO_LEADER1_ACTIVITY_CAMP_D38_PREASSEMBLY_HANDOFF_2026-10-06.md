# CHAT 5 -> LEADER 1 — Activity + Camp + D38 preassembly handoff

Date: 2026-10-06
From: Chat 5
To: Leader 1

Status: **BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**

## Exact completed handoff

Worker branch:

`chat5/activity-camp-d38-preassembly-v43`

v43 lineage/collision evidence:

`mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_LINEAGE_COLLISION_AUDIT_v43.md`

v44 exact-head QA, finalized at commit:

`61253fa027980afdf5c679dc5fe3ad5a1b1e1e81`

v45 final Chat2 handoff, finalized at commit:

`01d15529e39544227eb816d158345d873d023e64`

Chat5 completion pointer, finalized at commit:

`125aa6f980aca4658af330a98d793b5508a9f36c`

Final handoff document:

`mindy-successor/docs/tasks/CHAT5_ACTIVITY_CAMP_D38_PREASSEMBLY_v45.md`

Latest live-main checkpoint used during finalization:

`1daf5735d2e6d30cc1e8d0404f1ec38814109ac9`

The live-main moves observed during this package were coordination/task/pointer documentation only and did not invalidate the production collision map.

## Frozen authorities

- Activity v15: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- D38 mechanics: `3cf69d7cb3df1a58d68908159d0acc14736435c4`
- D38 content: `df9ef5c3d04cfd8eb582c24838d971854e984218`
- D38 reachability: `7ae7a9b273f1806ac04b566c318896783bab6595`
- Camp repair: `efde0a38bf71a8946194402a9fc47abb168f2aff`

## Lineage conclusion

Activity v15 is the cumulative four-region baseline.

D38 v16 -> v17 -> v18 is a strict cumulative chain on Activity v15.

Camp v19 is a strict cumulative chain on Activity v15 and is parallel to D38 after the exact common ancestor `ab378d...`.

The true D38-vs-Camp authored deltas relative to that common ancestor have no direct changed-path intersection. Whole historical branch/file composition remains unsafe because both lines carry divergent stale snapshots and current main has newer shared-file authority.

Required Chat2 selective order:

1. Activity cumulative semantic delta;
2. Camp cumulative delta/repair;
3. D38 mechanics;
4. D38 content/presentation;
5. D38 v18 reachability evidence;
6. current-main adjacency QA.

## Exact executable evidence

### Camp

Frozen Camp `efde0a38bf71a8946194402a9fc47abb168f2aff` is exact-head executable-green.

Latest Chat5 reproduction:

- run `37503918423`;
- job `112407617310`;
- exact SHA guard PASS;
- npm ci PASS;
- typecheck PASS;
- validate PASS;
- build PASS;
- focused **107/107 PASS**.

Earlier independent exact Camp run `37206785081` also passed.

### Activity and D38

The same run provides exact negative evidence for the standalone historical snapshots.

Activity job `112407617262` and D38 job `112407616865` both:

- checked out the exact requested frozen SHA;
- passed the exact SHA guard;
- completed npm ci;
- failed typecheck on the same inherited historical fixture:

`tests/item-capability-activity-closure.test.ts(124,23): TS2345`

The synthetic Activity option lacks required `effects`.

Camp v19 contains the exact cumulative repair:

`effects: []`

and passes the full gate.

Leader classification:

**HISTORICAL ACTIVITY EXECUTABLE-BASELINE DEBT — ALREADY REPAIRED ON THE ACCEPTED CAMP v19 CUMULATIVE LINEAGE.**

Do not mark standalone Activity/D38 exact-head green.

Do not reopen Product/runtime production or mutate frozen Activity/D38 branches for this fixture. Chat2's required order naturally brings the accepted Camp repair before D38 current-main QA.

Supplementary diagnostic run `37504871830` completed:

- Activity v15: typecheck FAIL, validate FAIL, build PASS, focused 13/18 PASS;
- D38 v18: typecheck FAIL, validate FAIL, build PASS, focused 13/19 PASS;
- Camp v19: typecheck/validate/build PASS, focused 107/107 PASS.

The Activity/D38 validation and focused failures share inherited Activity catalog debt: missing Forest typed-read capability declarations prevent shared catalog initialization. Camp v19 contains the accepted research-grade/school-reflection manifest closure, the synthetic `effects: []` typing repair, and cumulative regional focused-fixture repairs. No D38-specific runtime/content assertion is exposed as failing before that shared baseline is repaired.

## Product firewalls

Preserve exactly:

- Activity entry = 2 Energy;
- Field Time = 6;
- Camp max 2 field nights;
- Camp never suppresses Secret Debt forced Night;
- no universal Activity XP;
- canonical D38 ending/reward identities and accepted reachability;
- D51 floor2 only for the exact Street -1 + bound-Night -1 pair;
- Strong Meta Specialist capacity = 2.

## Collision / stop guidance

Do not whole-file copy historical:

- `content/definitions.json`;
- `content/localization.json`;
- `content/presentation.json`;
- `src/core/engine.ts`;
- `src/core/schema.ts`;
- `src/ui/app.ts`.

Stop Chat2 assembly and classify rather than auto-repairing foreign production if current schema migration would be downgraded, Camp exactly-once boundaries can duplicate, a third field night is reachable, Secret Debt forced Night loses precedence, D51's exact floor behavior is lost, D38 gains extra Specialist capacity/auto-commit behavior, canonical IDs collide, or universal Activity XP appears.

## Producer-repair disposition

**No Product/runtime producer-repair blocker identified.**

Known historical executable-baseline debt is already repaired by the frozen Camp v19 lineage; the diagnostic run did not expose a D38-specific Product/runtime blocker.

## Leader action

Do not merge this Chat5 branch into main.

When the production queue reaches Activity + Camp + D38, use `CHAT5_ACTIVITY_CAMP_D38_PREASSEMBLY_v45.md` as Chat2's selective assembly-prep authority. Require current-main focused QA plus Chat2's one full CI before any Leader merge.

**BUNDLE_COMPLETE — READY_FOR_CHAT2_ACTIVITY_ASSEMBLY_PREP**
