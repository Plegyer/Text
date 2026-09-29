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


## Task ledger through C1D-34

- C1D-25 COMPLETE — audit commit `05c9f96e6fe776d7af2b1f5f962afc544f13dae5`.
- C1D-26 COMPLETE — central command gate commit `7ea93b29afc86ba2c069ae2068117a7c7e303352`.
  - added `starterCareerIds`, `ordinaryCareerForShiftAction`, and `actionAvailable` in the engine;
  - command dispatch now uses `actionAvailable` rather than raw action-condition evaluation;
  - starter shifts remain condition-driven and available;
  - late ordinary career shifts with zero authored unlock conditions are blocked.
- C1D-27 COMPLETE — Work UI commit `bbc2cf08268c0ed4e3211ed4e1ca1bee0f7c9bdc`.
  - Work buttons consume the same engine `actionAvailable` helper;
  - no second unlock rule exists in UI.
- C1D-28 COMPLETE — engine/UI regression commits `a36b7761ca408fd7637015951f802c603315563a` and `26375346b458335242d2e8d8a37c6faf87868332`.
  - Day 1 starter actions: Lumber, Satyr Maid, Undead Farm available;
  - remaining seven ordinary career shifts unavailable;
  - starter shifts still execute and persist typed counters;
  - browser Work panel reflects the same availability.
- C1D-29 COMPLETE — covered by `starter-trio-availability.test.ts`.
  - a synthetic test-only world-fact condition proves a later ordinary career becomes executable only when an authored action condition passes;
  - no product stat/calendar/year threshold is selected.
- C1D-30 COMPLETE AS SELECTIVE NO-OP.
  - repaired School candidate PR #85 was QA-accepted at `35c42c04a59a1c58d54d1bf0d331c7e734883318` and is already merged on current main;
  - its accepted contract explicitly proves that the natural School management publisher is still absent and keeps provider/milestone/threshold/publication decisions OPEN;
  - therefore no production School→career publisher can be added by Integration without inventing a decision.
- C1D-31 COMPLETE — commits `18a5652b160c5a9a94a68a6c6150cbd07da204b5`, `4b9b301dc95d6df8c353e84781b741d65b41d700`, `d2c412b7c1be42a92f629e16337c97be718b3dc8`.
  - repaired Chat 3 Forest candidate was QA-accepted and integrated into main through Lead PR #89;
  - Integration consumes only its approved optional Forest entry presentation seam;
  - three handoff RU/EN entry strings are promoted into root localization;
  - active `lumber.forest` Activity renders default/logging-road/old-boundary narrative from existing route state;
  - no Activity mechanics, conditions, effects, results, Save fields, RNG or media identities change.
- C1D-32 COMPLETE AS CURRENT-MAIN VERIFICATION.
  - QA-accepted Chat 2 Lumber presentation candidate PR #79 is already integrated into main through Lead PR #89;
  - current presentation registry/media bindings are therefore consumed from current main;
  - no historical presentation branch is re-imported and no media ownership is duplicated.
- C1D-33 COMPLETE — `C1D_33_SATYR_MAID_INTEGRATION_INVENTORY.md` at commit `1b6168bc4ef45eeec5dd22ab6a2d2576d126a06b`.
- C1D-34 COMPLETE — `C1D_34_UNDEAD_FARM_INTEGRATION_INVENTORY.md` at commit `aee1df9d8443f30ce610c1082233a29d617156b4`.

## Current unresolved starter-career findings

Satyr Maid and Undead Farm both have a current repeatability seam: their base shift action always applies the one-time `first-shift` transition, while the engine correctly rejects that same transition after the career has already reached its second stage. The queue assigns inventory, not a content/progression redesign, so this is recorded rather than silently changing transition semantics.

No later career unlock threshold is selected by this branch.
No new Satyr Maid / Undead Farm ending, relationship, event pack or progression stage is authored.

## C1D-35 candidate composition

This branch is the focused current-main starter-career integration candidate. Production implementation changes are limited to:
- central ordinary-career action availability in `src/core/engine.ts`;
- Work UI consumption of that exact helper in `src/ui/app.ts`;
- approved Forest entry localization + optional Activity narrative consumer.

Focused tests cover:
- Day-1 command availability;
- Day-1 Work UI availability;
- future authored-condition unlock seam;
- approved Forest entry consumer and save invariance.

C1D-35 requires one full repository check on the exact PR head before completion.

## C1D-36 freeze requirements

After green exact-head CI:
- freeze one exact head;
- keep current unresolved decisions explicit;
- hand the candidate to QA;
- do not move the head for unrelated main drift.
