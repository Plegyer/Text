# Chat 2 — D31 current-main reconstruction preflight — 2026-10-03

Status: **PREFLIGHT ONLY / NO PRODUCTION CHANGE**
Owner: Chat 2 / Integration + Assembly + Technical QA

## Authority

Frozen producer:
`chat3/seasonal-negative-target-map-implementation-v6@79ff36c66947a1f1273ab0bde7a3c7f1b797a2a7`

Exact producer dependency base:
`844aabdf9bf42c42e67961c75c0364ec7ea36aef`

Feature commits after that base:
1. `5bada1fa4bd7787eceef3a5d6519e892cc932da2` — implement D31 seasonal negative target map;
2. `79ff36c66947a1f1273ab0bde7a3c7f1b797a2a7` — align seasonal acceptance with D31.

Current-main audited for this preflight:
`9f9a3c5b27e972a35c07d09a8784e06597ba8a69`

Do not integrate D31 before Palace D23 consumer merges and the subsequent exact-main CI is green.

## Exact producer delta

The whole accepted D31 producer delta is exactly two files:

- modify `mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`;
- modify `mindy-successor/prior-work/astra/prototype-m3.2/tests/ordinary-work-seasonal-negative-tradeoffs.test.ts`.

Current main is byte-identical to the producer dependency base for both files:

- `definitions.json`: `a0277129aaaefe3ff9111d158835119715c5911a`;
- seasonal acceptance test: `7608f5e9ab8025b29985cad1d6377421520827c9`.

Therefore there is no unrelated current-main target-map drift to merge around.

## Semantic delta proof

A recursive JSON diff of dependency-base `definitions.json` against frozen D31 `definitions.json` contains exactly **19 leaf changes**.

Every changed JSON path is only:

`actions[...].seasonal.<season>[...].stat`

No other field changes.

In particular D31 does **not** change:

- action IDs;
- conditions/unlocks;
- wages;
- positive seasonal effects;
- event/scenes;
- effect kind;
- negative delta magnitude;
- Hard Work endings or 50-shift authority;
- Lust handling;
- New Start+ package semantics;
- Palace semantics.

The negative effect topology remains:

- exactly 10 ordinary careers;
- exactly 2 negative seasons per career;
- exactly 20 negative effects total;
- every negative is `modifyStat -1`;
- zero Lust negatives.

Only 19 target-stat cells change because Satyr Maid autumn Endurance -1 already matches D31.

## Final D31 target map

| Career | Negative season 1 | Negative season 2 |
| --- | --- | --- |
| Lumber | spring Dexterity -1 | winter Strength -1 |
| Satyr Maid | summer Sociability -1 | autumn Endurance -1 |
| Undead Farm | spring Reason -1 | autumn Strength -1 |
| Tavern | spring Reason -1 | summer Wits -1 |
| Hunter | spring Endurance -1 | winter Dexterity -1 |
| Guard | summer Manners -1 | winter Reason -1 |
| Merchant | summer Wits -1 | winter Manners -1 |
| Artist / Geisha | summer Manners -1 | autumn Dexterity -1 |
| Assassin | spring Reason -1 | winter Manners -1 |
| Prostitute | summer Sexuality -1 | winter Endurance -1 |

## Current-main collision map

### New Start+ UI

No file overlap.

Accepted New Start+ UI modifies presentation/UI files only; both D31 files remain byte-identical to the producer base on current main.

### Palace D23 consumer

No file overlap with the Palace production candidate.

Palace D23 touches:
- localization;
- Palace invitation pack;
- `engine.ts` by the approved hook;
- `palace.ts`;
- Palace focused test;
- Palace integration note.

D31 touches only `definitions.json` and seasonal acceptance QA, so Palace can merge first without semantic conflict.

### D35 / later coordination

Current-main changes observed after the D31 producer fork are coordination/product docs only with respect to the two D31 files.

No D35 production target-map change is present.

## Integration-side stale expectations to repair

The frozen producer updates the central seasonal acceptance test, but current main also contains exact preservation expectations authored for the prior seasonal map.

Known exact-map expectations that must be aligned to D31 during Chat 2 reconstruction:

1. `tests/assassin-runtime-invariants.test.ts`
   - spring Grooming -> Reason;
   - winter Sociability -> Manners.
2. `tests/chat3-artist-geisha-live-authored-v19.test.ts`
   - summer Endurance -> Manners;
   - autumn Reason -> Dexterity.
3. `tests/chat3-guard-live-authored-v17.test.ts`
   - summer Grooming -> Manners;
   - winter Sociability -> Reason.
4. `tests/chat3-hunter-live-authored-v16.test.ts`
   - spring Grooming -> Endurance;
   - winter Sociability -> Dexterity.
5. `tests/chat3-merchant-live-authored-v18.test.ts`
   - summer Endurance -> Wits;
   - winter Strength -> Manners.
6. `tests/chat3-tavern-live-authored-v15.test.ts`
   - spring Grooming -> Reason;
   - summer Endurance -> Wits.
7. `tests/prostitute-runtime-invariants.test.ts`
   - summer Grooming -> Sexuality;
   - winter Creativity -> Endurance.

The producer-owned `ordinary-work-seasonal-negative-tradeoffs.test.ts` must be reconstructed from the frozen producer head.

These are QA expectation repairs only. They must not change non-D31 production semantics.

## Focused gate after future reconstruction

Before any full CI on D31 assembly:

1. typecheck;
2. validate;
3. build;
4. frozen D31 `ordinary-work-seasonal-negative-tradeoffs.test.ts`;
5. all seven current-main stale exact-map preservation tests listed above;
6. ordinary Hard Work 50-shift/meta tests;
7. New Start+ UI package tests;
8. Palace D23 consumer/shared-predicate tests after Palace merge;
9. School D20 preservation;
10. Assassin/Prostitute natural/runtime acceptance;
11. content/schema validation proving only the D31 seasonal target stat leaves changed.

Mine all focused failures before using Chat 2's full-CI lane.

## Reconstruction rule

After Palace D23 merge + exact-main green:

- reconstruct the frozen D31 two-file producer delta on that fresh main;
- update only stale QA expectations required by the new locked D31 map;
- do not cherry-pick unrelated branch history;
- do not change wages/unlocks/positive effects/events/items/Hard Work gates;
- consume full CI only after focused green;
- freeze the exact integration SHA for Leader merge.

This branch is documentation/preflight only and contains no D31 production change.
