# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D31 SEASONAL TARGET CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / sole full-CI integration lane

## Gate cleared

Palace D23 consumer:
- PR #269 merged;
- merge SHA: `6d021eedb6f8ffec2188490564dcc6390e89f056`;
- branch full CI #1135: SUCCESS;
- exact-main CI #1136: SUCCESS.

D31 preflight is frozen:
`chat2/preflight-d31-current-main-20261003-v1@b1877c2b8162dd90f8b3b4424b33c3c5808f5b34`

Frozen D31 producer:
`chat3/seasonal-negative-target-map-implementation-v6@79ff36c66947a1f1273ab0bde7a3c7f1b797a2a7`

Producer dependency base:
`844aabdf9bf42c42e67961c75c0364ec7ea36aef`

New assembly branch:
`chat2/assembly-d31-seasonal-map-20261003-v1`

## Reconstruction

Reconstruct the accepted D31 semantics on fresh current main.

Production delta:
- `content/definitions.json` only;
- exactly 19 target-stat leaf replacements;
- Satyr Maid autumn Endurance already matches and therefore is not changed.

Preserve exact D31 map:

- Lumber: spring Dexterity -1; winter Strength -1
- Satyr Maid: summer Sociability -1; autumn Endurance -1
- Undead Farm: spring Reason -1; autumn Strength -1
- Tavern: spring Reason -1; summer Wits -1
- Hunter: spring Endurance -1; winter Dexterity -1
- Guard: summer Manners -1; winter Reason -1
- Merchant: summer Wits -1; winter Manners -1
- Artist/Geisha: summer Manners -1; autumn Dexterity -1
- Assassin: spring Reason -1; winter Manners -1
- Prostitute: summer Sexuality -1; winter Endurance -1

Do not change:
- wages;
- costs;
- unlocks;
- positive seasonal effects;
- events;
- action IDs;
- Hard Work 50;
- D26 cadence;
- Lust negatives (there are none);
- New Start+ semantics;
- Palace semantics.

## QA expectation repair

Reconstruct frozen producer seasonal acceptance test.

Align only stale exact-map expectations in the seven known current-main tests identified by preflight:
- Assassin;
- Artist/Geisha;
- Guard;
- Hunter;
- Merchant;
- Tavern;
- Prostitute.

Those are test expectation updates, not production semantic changes.

## Focused gate before full CI

Run:
1. typecheck;
2. validate;
3. build;
4. D31 seasonal acceptance;
5. all seven stale-map preservation tests;
6. ordinary Hard Work/meta;
7. New Start+ package/UI preservation;
8. Palace D23 consumer/shared predicate;
9. School D20;
10. Assassin/Prostitute natural/runtime checks.

Mine all failures first.

Only after focused green:
- open current-main assembly PR;
- use Chat 2's one full-CI slot;
- freeze exact head;
- report `READY_FOR_LEADER_MERGE`.

Do not merge main.
