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


## Queue v4 implementation ledger before combined CI

- C1D-25 COMPLETE — Day-1 audit recorded the gap: all ten ordinary career actions were executable because every later-career action had an empty condition list and both engine/UI used plain condition eligibility.
- C1D-26 COMPLETE — engine now uses one central `actionAvailable()` guard. Lumber, Satyr Maid and Undead Farm remain starter shifts; later ordinary career shifts with no authored conditions are rejected.
- C1D-27 COMPLETE — Work UI uses the same exported `actionAvailable()` contract; no duplicate career-unlock thresholds or UI-only state exists.
- C1D-28 COMPLETE — focused engine/UI regressions prove exactly the three starter shifts are executable on fresh Day 1 and still spend one Energy; the seven later careers remain visible but disabled and direct commands are rejected.
- C1D-29 COMPLETE — test-only synthetic world-fact condition proves that a later ordinary career reuses the existing action-condition evaluator when an approved non-empty unlock condition is eventually authored. No production threshold/value was added.
- C1D-30 BLOCKED/SKIPPED at this checkpoint — PR #85 repaired head `35c42c04a59a1c58d54d1bf0d331c7e734883318` has green repository CI, but Chat 4 C4-26 explicitly remains QA PAUSED until Chat 5 declares that exact SHA frozen. No School candidate content is consumed before QA acceptance.
- C1D-31 COMPLETE — selectively consumed QA-accepted Chat 3 PR #82 frozen head `b12667b1cb8453e13e3406f3fe9d589475f28c6f`: Forest terminal copy/localization, existing Lumber-return localization, and the approved Forest entry-context strings through the existing Activity UI localization seam. Escape/failure gain no new state effects.
- C1D-32 COMPLETE — selectively consumed QA-accepted Chat 2 PR #79 frozen head `fefdcb8337923e6d1407cdcc1674303abf2fe640`: current Lumber presentation registry bindings plus their exact accessibility localization keys. No media bytes or gameplay semantics were copied.
- C1D-33 COMPLETE — Satyr Maid inventory recorded above.
- C1D-34 COMPLETE — Undead Farm inventory recorded above.

## Preserved product boundaries

- starter careers are exactly Lumber, Satyr Maid and Undead Farm;
- no later ordinary career threshold, stat gate, calendar gate or year fallback is selected here;
- Lumber Hard Work remains exactly `completed_shifts >= 50`;
- no new Save field/layer;
- no new career state machine;
- no new ending framework;
- no School producer for `lumber.school.management-ready` is invented;
- Chat 3 escape/failure Forest outcomes remain content-return-only with no new Lumber facts;
- Chat 2 media remains presentation-only.

## C1D-35 candidate composition

This branch is the focused current-main starter-career candidate. It contains:
- starter-trio engine/UI availability guard and regressions;
- QA-accepted Chat 3 Forest/Lumber production-copy + shared presentation consumer subset;
- QA-accepted Chat 2 Lumber presentation binding/localization subset;
- Satyr Maid and Undead Farm integration inventories;
- no unaccepted Chat 5 content.

Full repository CI is required on one exact PR head before C1D-35 is complete.
