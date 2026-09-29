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
