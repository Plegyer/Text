# Chat 1 Developer — starter-trio availability integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-25..C1D-36
Current-main baseline: `75cbd6f5aa2ae81fa7b677c7e47d8d16faa75892`

## C1D-25 — starter-trio runtime gap audit

Locked Day-1 starter careers:
- `lumber` / `lumber.shift`
- `satyr-maid` / `satyr-maid.shift`
- `undead-farm` / `undead-farm.shift`

Current-main gap before this branch:
- all ten ordinary career shift actions are present in `definitions.json`;
- all ten shift actions currently have empty action-level `conditions`;
- engine command execution checks only `eligible(action.conditions)`, so all ten are executable after arrival on a fresh run;
- Work UI renders the same ten actions, but its disabled state also checks only `eligible(action.conditions)`, so all ten appear executable on Day 1;
- therefore current main violates the locked starter-trio availability contract.

Existing seam to preserve:
- authored action-level `conditions` are already evaluated centrally by the engine;
- the late-career gate must reuse that condition path instead of introducing guessed stats/calendar thresholds;
- non-career actions must keep their current behavior.

Integrated worker state already on current main:
- PR #84 is merged;
- repaired Chat 5 PR #85 is merged as School handoff/fixture material, but it deliberately does not publish a natural `lumber.school.management-ready` producer because provider/milestone/threshold/publication decisions remain open;
- Lead PR #89 already integrated QA-accepted Chat 2 PR #79 and repaired Chat 3 PR #82 selective content;
- C1D-30..32 must therefore verify/use current-main integrated state rather than re-import historical PR branches.

Open design decisions that remain out of scope:
- exact later-career stat/calendar unlock thresholds;
- intermediate Lumber progression thresholds;
- any new School provider/milestone/threshold or public-result identity.

## Planned availability contract

One central engine helper will decide whether an action is currently available.

For ordinary career shifts:
- the three starter shifts remain available whenever their existing authored conditions pass;
- a non-starter ordinary career shift with no authored unlock conditions is unavailable;
- once approved conditions are authored on that action, availability is exactly the existing condition evaluation result.

For all other actions:
- availability remains exactly the existing action condition evaluation.

The Work UI will consume the same helper; it will not duplicate starter/late-career logic.
