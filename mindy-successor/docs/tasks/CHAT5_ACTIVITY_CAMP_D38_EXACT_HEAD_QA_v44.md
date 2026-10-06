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

## Diagnostic follow-up — completed

Chat5 diagnostic workflow revision:

`759733d46f45899545d72cc3f9d4cce8d8cfd071`

Run:

`37504871830`

It deliberately continued validate/build/focused after a failed typecheck and then failed the final required-check gate if any required command failed.

### Activity v15 diagnostic

Job `112410841740`:

- exact checkout / SHA guard: PASS;
- `npm ci`: PASS;
- typecheck outcome: **FAIL** on missing `effects` in `tests/item-capability-activity-closure.test.ts`;
- validate outcome: **FAIL**;
- build outcome: **PASS**;
- focused outcome: **FAIL**, 13 pass / 5 fail.

Validate and the five focused-file failures share the same catalog-load root cause:

`Недопустимая typed capability: read worldFact activity.forest-frontier.result.research-grade`

The failing focused files cannot initialize the shared catalog because the historical Forest pack does not declare that typed read capability.

### D38 v18 diagnostic

Job `112410841160`:

- exact checkout / SHA guard: PASS;
- `npm ci`: PASS;
- typecheck outcome: **FAIL** on the same missing-`effects` synthetic fixture;
- validate outcome: **FAIL** on the same undeclared Forest research-grade typed read;
- build outcome: **PASS**;
- focused outcome: **FAIL**, 13 pass / 6 fail.

The two D38 focused files fail during the same shared catalog initialization; no D38-specific assertion is reached before that inherited baseline failure.

### Camp v19 diagnostic

Job `112410841757`:

- exact checkout / SHA guard: PASS;
- `npm ci`: PASS;
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- focused: **107/107 PASS**;
- final required-check gate: PASS.

### Exact cumulative repair chain already in Camp v19

Camp v19 contains the baseline repairs needed to turn the shared Activity snapshot executable-green, including:

- `90f111c413e140fd47aeac271a7680989328009b` — add `effects: []` to the synthetic Activity option fixture;
- `8e6d658269c992562093d31974a4ad3c1d75b191` — declare Forest `activity.forest-frontier.result.research-grade` typed read capability;
- `c38ab2a67b7c029e7e656dbb89d37dfb194fdb17` — declare Forest `forest.frontier.school-reflection-recorded` typed read capability;
- later cumulative regional fixture repairs, including Anomalous, Restricted and Trade day-start feedback handling.

Therefore v44's exact classification is broader than one test line but remains a single lineage class:

**HISTORICAL ACTIVITY EXECUTABLE-BASELINE DEBT — ALREADY REPAIRED BY THE ACCEPTED CAMP v19 CUMULATIVE LINEAGE.**

The standalone Activity v15 and D38 v18 historical snapshots are buildable, but they are not typecheck/validate/focused green. Camp v19 is the accepted repaired cumulative Activity baseline and is fully exact-head green.

No frozen producer mutation is authorized or required. Chat2 must carry the Camp cumulative baseline repairs before treating D38 focused QA as executable.

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

There is one precise historical lineage class of executable blockers:

**HISTORICAL ACTIVITY EXECUTABLE-BASELINE DEBT — already repaired on the frozen Camp v19 cumulative lineage.**

It includes the stale synthetic test typing, missing Forest typed-read manifest declarations, and cumulative regional focused-fixture drift. Camp v19 resolves that baseline and passes typecheck/validate/build plus 107/107 focused tests.

Chat2 must assemble Activity first, then apply Camp (including those accepted cumulative baseline repairs), then D38. It must not use the standalone Activity/D38 historical snapshot as the final executable baseline.

**v44 COMPLETE — EXACT-HEAD COLLISION CLASSIFIED; NO FROZEN PRODUCER MUTATION.**
