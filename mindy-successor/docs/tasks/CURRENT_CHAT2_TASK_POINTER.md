# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D31 FULL-CI NATURAL-ROUTE REPAIR**
Owner: Chat 2 / sole full-CI integration lane

## #1139 diagnosis

Assembly head:
`6055275c1e5de1856e93f57b2c152741d72d5315`

Focused QA #1138:
**SUCCESS**

Full CI #1139:
**FAILURE — 1028 pass / 2 fail**

Failures are only:
1. `tavern-natural-acceptance.test.ts`
   - old hard-coded winter logging route fails at `forest.challenge.logging-navigation`;
   - D31's live Tavern Reason pressure makes the prior stat assumption stale.

2. `undead-farm-natural-acceptance.test.ts`
   - logging navigation succeeds;
   - season-specific logging obstacle becomes unavailable after D31 stat pressure.

Production D31 semantics are not to be changed.

Both career consumers accept any successful typed:
`lumber.forest.success`.

### Required Tavern repair

Use authored preparation, not direct state/stat injection:
- current test already obtains `forest.school-field-notes` through `forest.collect-field-kit`;
- obtain real `forest.hunter-outfitter` prep:
  - Rope Kit / `cross_rough_route`;
  - hunter-trail clue;
- schedule the Forest Activity in summer or autumn;
- use:
  1. `forest.route.hunter-trail`
  2. `forest.challenge.hunter-navigation`
  3. `forest.challenge.hunter-rough-crossing`
  4. `forest.challenge.hunter-preserve-sample`
  5. normal advances to success.

Do not restore Reason artificially.
Do not weaken logging navigation.

### Required Undead Farm repair

Keep the legitimate logging-navigation behavior.

Use authored capability prep:
- acquire `forest.hunter-outfitter` Rope Kit;
- wait to winter;
- enter `lumber.forest`;
- use logging road + logging navigation;
- cross `forest.challenge.logging-winter-ruts` via `cross_rough_route`;
- preserve sample;
- advance normally to success.

Do not weaken seasonal obstacle gates.
Do not inject stats directly.
Do not change D31 map.

### Gate before another full CI

Create a real new repair commit.

Run focused:
- typecheck;
- validate;
- build;
- existing D31 focused set;
- `tavern-natural-acceptance.test.ts`;
- `undead-farm-natural-acceptance.test.ts`.

Only after all green:
- push new assembly head;
- rerun full CI once;
- freeze exact SHA;
- report `READY_FOR_LEADER_MERGE`.

No rerun on unchanged head.
Do not merge main.

---

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
