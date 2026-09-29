# Chat 1 Developer v4 starter-trio integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-25..C1D-36
Current-main baseline: `32f48d15708a543ee26b90b78761da63b3363da2`

## C1D-25 — Starter-trio runtime gap audit

Locked starter careers:
- `lumber` / action `lumber.shift`
- `satyr-maid` / action `satyr-maid.shift`
- `undead-farm` / action `undead-farm.shift`

Current Day-1 gap on baseline:
- the Work panel renders all ten ordinary career shift actions;
- all ten shift actions have empty `conditions`;
- engine action dispatch checks only `eligible(a.conditions,...)`, so all ten are executable after arrival on a fresh run;
- UI `disabled(a)` duplicates the same plain condition check and therefore also enables all ten;
- existing `tests/ui.test.ts` explicitly asserts that all ten are available at start;
- existing `tests/remaining-seven-base-careers.test.ts` directly dispatches the seven later-career shifts from a fresh started save.

Later ordinary careers that must stay locked until authored unlock conditions exist:
- `tavern.shift`
- `hunter.shift`
- `guard.shift`
- `merchant.shift`
- `artist-geisha.shift`
- `assassin.shift`
- `prostitute.shift`

Required implementation boundary:
- one shared engine availability function is the source of truth for both command execution and UI;
- the three starter shifts remain available when their ordinary action conditions pass;
- a later ordinary shift with no authored conditions is unavailable;
- once an approved non-empty action condition list is authored later, the same existing condition evaluator can unlock that shift;
- no stat threshold, calendar threshold, year fallback, world fact, meta unlock, new Save field, or parallel career state is invented.

Worker candidate state at this checkpoint:
- Chat 3 PR #82 repaired exact head `b12667b1cb8453e13e3406f3fe9d589475f28c6f`: repository CI green and QA C4-21 PASS-WITH-NOTES / accepted.
- Chat 2 PR #79 exact head `fefdcb8337923e6d1407cdcc1674303abf2fe640`: repository CI green and QA C4-20 PASS / accepted.
- Chat 5 PR #85 is not yet consumable: previous exact head was QA-blocked; repaired head/CI/QA acceptance must be rechecked before C1D-30.

No earlier C1D-01..24 implementation is restarted here.


## C1D-33 — Satyr Maid integration inventory

Current production state:
- action: `satyr-maid.shift`;
- Day-1 starter career;
- cost: 1 Energy, 0 money;
- typed write: `completed_shifts += 1`;
- existing first-shift transition is executed by the action itself;
- career machine: `new-maid -> known-face` through transition `first-shift`;
- transition condition: existing `completed_shifts >= 1`;
- transition effect: existing career fact `first-shift-complete`;
- existing seasonal scenes: Spring / Summer / Autumn / Winter;
- existing semantic result/seasonal presentation slots are already present in the base presentation registry.

Current missing production seams:
- no dedicated Satyr Maid production event pack;
- no Satyr Maid relationship machine;
- no Satyr Maid quest machine;
- no Satyr Maid Activity;
- no Satyr Maid ending identity;
- no approved post-`known-face` stages/transitions;
- no approved later thresholds/rewards/cross-system gates.

Integration rule:
- preserve the existing first-shift typed progression;
- do not invent later Satyr Maid stages, events, ending IDs, thresholds, School hooks, Forest hooks, or media/content owned by other workers.

## C1D-34 — Undead Farm integration inventory

Current production state:
- action: `undead-farm.shift`;
- Day-1 starter career;
- cost: 1 Energy, 0 money;
- typed write: `completed_shifts += 1`;
- existing first-shift transition is executed by the action itself;
- career machine: `new-hand -> reliable-helper` through transition `first-shift`;
- transition condition: existing `completed_shifts >= 1`;
- transition effect: existing career fact `first-shift-complete`;
- existing seasonal scenes: Spring / Summer / Autumn / Winter;
- existing semantic result/seasonal presentation slots are already present in the base presentation registry.

Current missing production seams:
- no dedicated Undead Farm production event pack;
- no Undead Farm relationship machine;
- no Undead Farm quest machine;
- no Undead Farm Activity;
- no Undead Farm ending identity;
- no approved post-`reliable-helper` stages/transitions;
- no approved later thresholds/rewards/cross-system gates.

Integration rule:
- preserve the existing first-shift typed progression;
- do not invent later Undead Farm stages, events, ending IDs, thresholds, School hooks, Forest hooks, or presentation/content beyond approved worker handoffs.
