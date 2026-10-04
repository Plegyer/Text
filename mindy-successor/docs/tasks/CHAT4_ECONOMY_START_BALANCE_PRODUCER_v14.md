# Chat 4 — D46 Economy / Start-Balance Producer v14

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
Branch: `chat4/economy-start-balance-producer-v14`

Authority:
- `D46` in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`
- source Product packet: `chat4/product-economy-balance-closure-v13@285b0de5189350131cb34b210357112da04bca3b`

## Implemented

D46 is implemented exactly through the existing runtime/content seams:

- fresh new-life Lust = **5**;
- existing/in-progress saves preserve stored Lust during migration;
- Lumber ordinary wage base = **35**;
- the other nine ordinary wage bases = **37**;
- the existing per-career wage stat weights are unchanged;
- ordinary shift wages use one shared final cap = **120**;
- the cap applies only to the ten ordinary career shift identities;
- the ordinary wage is committed from the pre-shift wage inputs, then existing D31 seasonal effects apply;
- starting money remains **600**;
- base Energy remains **3**;
- lodging remains **100 / 50 / 0** with no year escalation;
- all paid School tuition/gain packages remain unchanged;
- Body Confidence remains exactly **+2 Lust**;
- School Night Study remains unchanged.

No Secret Debt hidden-work wage, Palace wage, D32 reward cap, D26 cadence, D31 weight, lodging semantic, or Strong Meta slot semantic was changed.

## Runtime seams

### New-life Lust

`freshSave()` now creates a new run with:

```
lust: 5
```

No migration path overwrites an already stored target-schema Lust value.

### Ordinary wage

Shared ordinary wage helper:

```
ordinaryShiftWage(action, save)
```

returns:

```
min(
  120,
  round(
    action.wage.base
    + sum(current pre-shift wage stat * existing factor)
  )
)
```

only for one of the ten ordinary `<career>.shift` actions.

Non-ordinary wage actions return `null` from this seam and keep their prior wage handling.

### Content bases

- Lumber: 13 -> **35**
- Satyr Maid: 15 -> **37**
- Undead Farm: 15 -> **37**
- Tavern: 15 -> **37**
- Hunter: 15 -> **37**
- Guard: 15 -> **37**
- Merchant: 15 -> **37**
- Artist-Geisha: 15 -> **37**
- Assassin: 15 -> **37**
- Prostitute: 15 -> **37**

All existing wage weights are preserved byte-for-byte in meaning.

## Focused QA

Tested runtime candidate:

`ebc57577d1830d1d0fe115e02d01db079af57fe2`

Focused workflow run:

`37147051068`

Result:

- typecheck: **PASS**
- validate: **PASS**
- build: **PASS**
- focused regressions: **59 / 59 PASS, 0 FAIL**

Focused coverage includes:

- fresh Lust 5;
- schema-5 migration preserving stored Lust;
- exact all-1 starter wage anchors **36 / 38 / 38**;
- starter gross **112**;
- runtime payment from pre-shift wage inputs;
- cap-200 ordinary wage <= **120**;
- non-ordinary wage isolation;
- lodging **100 / 50 / 0** across Days 1 / 41 / 81 / 121;
- exact School tuition/gain packages;
- Body Confidence +2 Lust;
- School Night Study +2 / next-day Energy -1;
- D24 cap semantics;
- D26/Hard Work lifecycle adjacency;
- D32 Strong Meta money/Work Rhythm boundaries;
- Palace integration adjacency.

Full CI was **not run**, per task instruction.

## Diff boundary

Production/test changes before this handoff are limited to:

- `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`
- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/engine.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/economy-start-balance-v14.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/hard-work-stat-cap-d24.test.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/ordinary-hard-work-meta-production.test.ts`

This file is a documentation-only handoff commit after the green tested runtime candidate.

## Assembly note

Chat 2 should assemble the frozen v14 branch head as reported by Chat 4.

Do not reimplement D46 in the assembly branch and do not change:

- D26 same-career daily cadence;
- D31 per-career wage weights or seasonal packages;
- D32 1000/1000 money caps or Work Rhythm 20-day cap;
- D35 housing/private-space semantics;
- D43 Palace wage;
- D44 Secret Debt wage/career lock;
- D24 stat-cap semantics.

**READY_FOR_CHAT2_ASSEMBLY**
