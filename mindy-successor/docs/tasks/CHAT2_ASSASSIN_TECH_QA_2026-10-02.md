# Chat 2 — Assassin Technical QA / Current-Main Assembly

Status: **STATIC TECHNICAL QA PASS / ASSEMBLY CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Exact authority

Producer PR #252:
- frozen producer head: `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642`
- producer base: `931ea69d1caa37f2845be00be788c92eefc4c711`
- final producer workflow #1106: **SKIPPED** by CI-slot guard
- producer head remains unchanged.

Assembly base:
- fresh current main: `04d1c0afff2dbb776fde4842d1fea6041fef4061`

Current main already contains shipped Artist and Prostitute. Exact-main workflow #1108 on shipped Prostitute main `6a6029df8e9c007227da0173eb499d59ba51648e` is **SUCCESS**. Subsequent drift to the assembly base is docs/task-pointer only.

## Collision analysis

PR #252 changes 17 files.

Only three overlap with shipped Prostitute production:
- `content/definitions.json`
- `content/localization.json`
- `src/core/schema.ts`

The other 14 producer files are copied into this assembly as exact Git blobs from frozen #252.

### definitions.json

Assassin vs Prostitute semantic-ID intersection: **0**.

Exact Assassin deltas applied onto current main:
- copy-only seasonal scene update for existing `assassin.shift`; shipped unlock, Energy cost, wage and seasonal stat tuning remain unchanged;
- Assassin career machine;
- `assassin.contract` quest;
- `assassin.handler` relationship;
- four Assassin item definitions;
- voluntary `assassin.night.review-notes`;
- `assassin.infiltration` Activity.

Current-main Prostitute definitions are preserved exactly.

### localization.json

- Assassin changed keys: **260** = 257 added + 3 existing Assassin keys updated;
- current-main Prostitute changed keys: **177**;
- semantic key intersection: **0**.

The assembly preserves all current-main localization values and applies the exact Assassin key deltas.

### schema.ts

The only Assassin schema delta and the only Prostitute schema delta are additions to the existing item-ID enum.
The assembly contains both four Assassin IDs and four Prostitute IDs.
No Save schema, migration, RNG, NightFlow, Activity schema, or engine behavior is changed.

## Technical QA

- `assassin.shift` retains the shipped unlock, 1 Energy cost, wage formula and seasonal stat tuning.
- `ending.assassin.hard-work` remains the only public Assassin ending and still requires exactly 50 completed shifts with `hardWork:assassin`.
- all eight Assassin packs write only Assassin-local career/quest/relationship/inventory state.
- Guard/Tavern/Merchant hooks are read-only inputs with Assassin-local writes.
- School integration reads five shipped tracks and has `writes: {}`; no School threshold or producer fact is invented.
- no global Morality, crime/fallout meter, black-market system, generic network subsystem, Palace unlock/bypass, housing write, Secret Debt ownership, forced Night policy, or advanced Assassin ending/reward is introduced.
- `refusal-chain-ready` remains Product-open: it is consumed as authority but no Assassin pack produces it.
- optional Assassin Night has zero next-day Energy/stat penalty.
- Assassin Activity reuses shipped `counter.v1`; the frozen Hunter literal `activityEntryList(['lumber.forest','hunter.expedition'])` remains intact and Assassin is exposed by a separate consumer call.

## Historical failure closure

Legacy #1102 had three Assassin-related failures:
1. natural acceptance timing;
2. profession Assassin description fixture;
3. Hunter Activity consumer literal.

Legacy #1104 already passed items 2 and 3 and had one remaining failure only: the artificial 12-shift contract-close deadline.

Final frozen head differs from #1104 only in `tests/assassin-natural-acceptance.test.ts`: the artificial deadline was removed and contract closure is asserted on the natural 50-shift Hard Work path. No Product threshold was added.

## Assembly construction

Assembly = fresh current main + 14 exact producer blobs + collision-safe merges of the three shared files + this QA evidence file.

Next gate: exactly one full assembly CI run. If green, freeze the exact assembly SHA and hand it to Leader 1. Chat 2 does not merge main.
