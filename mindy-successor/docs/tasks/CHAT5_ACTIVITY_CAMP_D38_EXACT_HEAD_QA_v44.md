# CHAT 5 — Activity + Camp + D38 exact-head focused QA v44

Status: **COMPLETE — EXACT-HEAD COLLISION CLASSIFIED**
Owner: Chat 5
Date: 2026-10-06
Branch: `chat5/activity-camp-d38-preassembly-v43`

No full CI was run. No frozen producer branch was mutated.

## Frozen heads under verification

- Activity / Restricted Sites cumulative v15: `ab378d68765f7c9bbff43abf3b4b41e24df82e01`
- D38 cumulative v18 evidence head: `7ae7a9b273f1806ac04b566c318896783bab6595`
  - production content/runtime is v17 `df9ef5c3d04cfd8eb582c24838d971854e984218`;
  - v18 adds reachability evidence only.
- Camp cumulative executable-repair head: `efde0a38bf71a8946194402a9fc47abb168f2aff`

The three heads contain a full package tree. Their `package-lock.json` blob is identical:

`77b325bc6b2115499c475adf92d3bae218bf37a1`

## Exact static invariants

Activity v15 exact definitions preserve:

- `entryEnergyCost: 2` for Forest Frontier, Trade Corridor, Anomalous Reach and Restricted Sites;
- `fieldTimeSegments: 6` for all four regions;
- no universal Activity XP.

D38 exact definitions preserve the canonical ending IDs:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

and the canonical Specialist reward IDs:

- `specialist.activity.surveyors-atlas`
- `specialist.activity.field-archive`
- `specialist.activity.contact-network`.

Camp exact schema/runtime preserves:

- local `campStateVersion=1`;
- `campPolicy.maxNights` and persisted `nightsUsed` capped at 2;
- separate exactly-once `calendarAdvanceCommitted` and `fieldTimeRefreshCommitted`;
- Camp only for `timePolicy === "can_advance_days_internally"` with finite Field Time;
- forced consuming `nightPhase(before_lodging)` resolution before Camp calendar commit;
- handoff to NightFlow when a forced Night wins.

## Exact executable run 37503918423

Chat5's Windows self-hosted matrix checked out each frozen SHA directly and verified `git rev-parse HEAD` before executing npm commands.

### Camp v19 — PASS

Job: `112407617310`

Exact frozen head:
`efde0a38bf71a8946194402a9fc47abb168f2aff`

Results:

- exact checkout / SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- focused Activity + Camp + migration/reload + Night suite: **107/107 PASS**.

This independently reproduces the earlier exact Camp green evidence from run `37206785081`, job `111449513323`.

Disposition:

**CAMP EXACT-HEAD EXECUTABLE GREEN.**

### Activity v15 — exact-head typecheck FAIL

Job: `112407617262`

Exact frozen head:
`ab378d68765f7c9bbff43abf3b4b41e24df82e01`

Results before the gate stopped:

- exact checkout / SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: **FAIL**.

Exact error:

`tests/item-capability-activity-closure.test.ts(124,23): TS2345`

The synthetic `forest.route.unknown-capability` Activity option fixture omits the now-required `effects` field.

This is not a Product invariant failure and not evidence of a runtime Activity defect. It is a stale shared test fixture on the historical v15 snapshot.

### D38 v18 — same exact-head typecheck FAIL

Job: `112407616865`

Exact frozen head:
`7ae7a9b273f1806ac04b566c318896783bab6595`

Results before the gate stopped:

- exact checkout / SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: **FAIL**.

The exact error is the same `tests/item-capability-activity-closure.test.ts(124,23): TS2345` stale synthetic fixture inherited from Activity v15.

D38 v16-v18 did not author this test defect. It is ancestral baseline debt.

## Exact repair lineage

The Camp v19 frozen head contains the minimal cumulative repair to that same test fixture:

```ts
enduranceCost: 0,
effects: [],
setRoute: 'unknown-route'
```

Activity v15 and D38 v18 lack `effects: []` at the same location.

Therefore the exact classification is:

- Activity v15 standalone historical snapshot: **NOT exact-head green because of one stale shared test fixture**;
- D38 v18 standalone historical snapshot: **NOT exact-head green for the same inherited fixture**;
- Camp v19 cumulative snapshot: **contains the fixture repair and is exact-head green**.

This is a lineage/collision fact that Chat2 must preserve during selective assembly. Do not repair or rewrite the frozen Activity/D38 branches.

## Diagnostic follow-up

Chat5 authored a final diagnostic workflow revision at:

`759733d46f45899545d72cc3f9d4cce8d8cfd071`

It keeps validate/build/focused execution alive after typecheck so a future runner slot can reveal whether anything lies behind the known fixture error, while still failing the final required-check gate if any required step fails.

Run:

`37504871830`

At the final v44 checkpoint it remained queued with no active project runner job. Its completion is not required to classify the exact-head blocker above: run `37503918423` already provides deterministic exact-head evidence of the stale fixture, and Camp provides the accepted repaired cumulative baseline.

If the diagnostic run later executes, its output is supplementary evidence only. It must not mutate frozen producers or supersede current-main Chat2 assembly QA.

## Focused roster for Chat2 assembly

After selective current-main composition, Chat2 should run:

- `npm ci`;
- `npm run typecheck`;
- `npm run validate`;
- `npm run build`;
- Activity regional focused tests;
- `tests/item-capability-activity-closure.test.ts` using the Camp-v19 repaired fixture or newer current-main equivalent;
- `tests/activity-camp-persistence-v17.test.ts`;
- migration / option-reload / exactly-once reload tests;
- `tests/night-flow.test.ts`;
- `tests/activity-ending-family-v16.test.ts`;
- `tests/activity-ending-content-presentation-v17.test.ts`;
- current D51 bound-Street floor test;
- current Strong Meta Specialist-capacity and ending-lifecycle tests.

Required Product adjacency remains:

- Activity entry exactly 2 Energy;
- Field Time exactly 6;
- Camp max 2 field nights;
- Secret Debt forced Night outranks Camp;
- no universal Activity XP;
- D38 canonical endings/rewards and marked-anchor reachability remain intact;
- D51 floor2 remains only for the exact Street -1 + bound-Night -1 pair;
- Strong Meta Specialist capacity remains 2.

## v44 conclusion

There is **no newly discovered Product/runtime producer blocker**.

There is one precise historical executable blocker:

**STALE SHARED TEST FIXTURE — already repaired on the frozen Camp v19 cumulative lineage.**

Chat2 must assemble Activity first, then apply Camp (including the repaired baseline test fixture), then D38. It must not use the standalone Activity/D38 historical test snapshot as a final executable baseline.

**v44 COMPLETE — EXACT-HEAD COLLISION CLASSIFIED; NO FROZEN PRODUCER MUTATION.**
