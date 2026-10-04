# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D42 NIGHT CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Previous production gate:
- D41 assembly frozen head: `325f439cc4977745d80ce1a38962763f7be43804`;
- full CI #1199 / run `37204412669`: **SUCCESS**;
- Leader merge: `f36de067ae2e82518360dbe045f71c700e200805`;
- exact-main CI #1200 / run `37204724787`: **SUCCESS**.

## Current assembly

Accepted D42 Night producer:
`chat4/night-content-gap-producer-v10@9305d1da055203c51137041a78a345cbc64339c0`

Accepted Product authority:
D42 in `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`.

New assembly branch:
`chat2/assembly-d42-night-current-main-20261004-v1`

Production base:
`main@f36de067ae2e82518360dbe045f71c700e200805`

## D42 exact scope

Assemble exactly the 12 accepted ordinary-career Night surfaces:
- Lumber personal/social continuation;
- Hunter professional debrief;
- Hunter Senior Guide/companion;
- Guard professional case debrief;
- Guard Partner;
- Merchant professional ledger plan;
- Merchant Supplier;
- Assassin handler/informant;
- Prostitute personal continuation;
- Satyr Maid recurring guest private-space seed;
- Tavern recurring traveler private-space seed;
- Prostitute recurring client private-space seed.

Exactly the three D35 seed branches require `housingTier=normal`.

Preserve:
- D16 explicit ending commit;
- merged D40/D41 mechanics;
- canonical Strong Meta schema6;
- Secret Debt forced Night absolute priority;
- cheap lodging keeps School Night Study and public/workplace Night;
- refusal/back-out cannot publish success;
- ordinary Prostitute never inherits Secret Debt semantics;
- one completed global Night advances calendar exactly once;
- no broad affinity subsystem;
- no Palace bypass;
- D35 private-space rules.

Do not merge the historical producer wholesale if it would overwrite newer current-main runtime/schema/content. Selectively compose D42 on current main.

## D42 localization/accessibility closure from Chat 6 v25

Before freezing D42, also close the accepted non-mechanical v25 gaps:
- add RU/EN caption pairs for all 12 D42 presentation alt keys;
- align the two private-conversation EN labels with the explicit conversation wording already used in RU/body copy:
  - Satyr Maid recurring guest;
  - Tavern recurring traveler.

These are content/accessibility repairs only. Do not change Night mechanics, consent semantics, housing gates, or presentation engine.

## Gate

Before full CI:
- typecheck;
- validate;
- build;
- D42 focused Night tests;
- Night save/reload / exactly-once calendar tests;
- D35 private-space tests;
- Secret Debt forced-Night precedence;
- School Night Study compatibility;
- D40/D41 adjacent ending regressions;
- localization/presentation parity.

Only after focused green:
1. run one full CI;
2. freeze exact assembly SHA;
3. report `READY_FOR_LEADER_MERGE`.

Do not merge main.
