# Production-Binding Presentation Candidate Handoff v1

Status: C2-72 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
Current-main base: `32e255f2371e8782c8ad832d7e0811f9afd086da`
Branch: `chat2/presentation-production-binding-c2-61-72`

The exact frozen candidate head and exact-head repository CI are recorded in PR metadata after CI completes. This file intentionally does not self-reference its own commit SHA.

## Queue scope

This candidate completes C2-61 through C2-71 and prepares C2-72 freeze.

Delivered:
- prepared-vs-active current-main presentation inventory;
- Tavern ending production-binding verification package;
- ordinary-poverty production-binding verification package;
- Forest result production-binding verification package;
- remaining ending gap re-audit;
- existing ending static/accessibility coverage lock;
- Work locked-state presentation refinement verification;
- School teacher fallback consistency fix;
- RU/EN locale accessibility parity v2;
- replacement/editor regression v2;
- registry collision/stale-ID regression v2.

## Current-main finding

The QA-passed C2-60 presentation wave is already merged into current main.

Therefore queue-v7 does not duplicate previously prepared production bindings.

Current selected active semantic presentation coverage:
- endings: **9 / 9**;
- Forest: **10 / 10**;
- ordinary poverty: **20 / 20**;
- School course surfaces: **8 / 8**.

Total selected semantic presentation slots: **47**.

Current Work controls audited: **10**.

Current School teacher catalog media surfaces: **8**.

Prepared-only semantic bindings remaining from the accepted C2-60 set: **0**.

## New production change in queue v7

The only production presentation/accessibility mutation introduced by C2-61..71 is School teacher locale fallback metadata.

For each of the eight existing teacher media identities, `content/localization.json` now adds:
- `media.<teacher-media-id>.alt` in RU and EN;
- `media.<teacher-media-id>.caption` in RU and EN.

The renderer already resolves catalog media alt text through `media.<mediaId>.alt`, so this closes the Russian-locale fallback gap without changing teacher media IDs, sources, School mechanics, or teacher content ownership.

## Ending status

Current gameplay ending identities: **9**.

Exact project-owned static ending overrides: **9 / 9**.

Previously documented `guild-life`, `scholar-life`, `lumber-stay`, and Tavern ending gaps are now active exact bindings on current main.

No absent gameplay ending ID is promoted into presentation.

## Work status

Current engine availability remains unchanged:
- starter trio available;
- seven later-career Work controls locked by the existing `actionAvailable` contract.

Current UI locked-state help/ARIA from the accepted prior presentation wave is verified, not re-authored.

No unlock logic or action conditions are changed.

## Validation

Focused queue-v7 regressions cover:
- RU/EN alt/caption parity across 47 selected semantic slots;
- RU/EN alt/caption parity for all 8 current School teacher media surfaces;
- bilingual locked-career accessibility help;
- presentation replacement by unchanged semantic ID;
- teacher media replacement by unchanged media ID;
- unchanged gameplay definitions and Save serialization during replacement;
- unique selected semantic IDs;
- current registry identity;
- exact production binding;
- project-owned source existence;
- current fallback chain;
- no prepared-only stale binding;
- current ending gameplay identity to presentation identity consistency.

## Ownership boundary

No gameplay mechanics, unlock rules, conditions/effects/rewards/economy, RNG, Save schema/identity, career/relationship/story canon, Activity mechanics, School mechanics, ending conditions, or shared runtime architecture are changed.

Secret Debt remains outside ordinary-poverty presentation scope.

## QA freeze

Once one exact PR head has a green required repository check, that exact head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`.

Any head movement after freeze invalidates exact-head QA/CI evidence.
