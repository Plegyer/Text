# Presentation Wave v6 Candidate Handoff

Status: C2-60 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
Final candidate branch: `chat2/presentation-wave-v6-c2-49-60-final`
Final current-main base: `f3a684448b0681c355452b7d24d836e3926cb594`

The exact frozen candidate head and exact-head CI evidence are recorded in PR metadata after the repository check completes.

## Queue scope

This candidate completes C2-49 through C2-59 and prepares C2-60 freeze.

Delivered:
- Work-panel available-versus-locked career presentation audit;
- locked-career RU/EN accessibility/help presentation without unlock-logic changes;
- ending eligibility/commitment/completed-state presentation audit;
- exact static/accessibility coverage for all nine current ending semantic IDs;
- Forest route/result/event presentation re-audit and depth lock;
- exact static/accessibility coverage for all twenty current ordinary-poverty semantic IDs;
- eight-course/eight-teacher School presentation consistency audit;
- animation-off and missing-optional-dynamic static fallback regression;
- stale/dead presentation semantic-ID and source-manifest validator.

## Current selected presentation set

Queue-v6 source manifest:
- 10 Work controls;
- 9 ending semantic presentation slots;
- 10 Forest semantic presentation slots;
- 20 ordinary-poverty semantic presentation slots;
- 8 School course semantic presentation slots;
- 8 School teacher catalog media surfaces.

Selected semantic presentation slots: **47**.

All selected semantic slots have project-owned static coverage and are validated for animation-off resolution.

## Ending coverage

All nine current ending semantic IDs now have exact project-owned static overrides and RU/EN alt + caption metadata.

New assets are limited to existing ending identities:
- `ending/guild-life`;
- `ending/scholar-life`;
- `ending/lumber-stay`.

The three Tavern ending assets were already merged from the prior Chat 2 preparation wave and are now bound to their existing semantic IDs.

No ending conditions, rewards, commitment mechanics or RunResult behavior are changed.

## Work accessibility

The current engine availability contract remains unchanged:
- Lumber, Satyr Maid and Undead Farm are available starter careers;
- seven later-career shift controls remain locked because their unlock requirements are not yet authored by gameplay owners.

The UI now exposes a neutral localized locked-state explanation and an associated accessible description while preserving the exact disabled state from `actionAvailable`.

## Forest, poverty and School

Forest:
- 10 / 10 selected current semantic slots exact/static/localized;
- no Activity mechanics changed.

Ordinary poverty:
- 20 / 20 current semantic event-variant slots exact/static/localized;
- Secret Debt excluded.

School:
- 8 / 8 current course semantic slots exact/static/localized;
- 8 / 8 current teacher catalog media identities source-backed;
- no new teacher semantic/gameplay identity invented.

## Validation

Focused regressions cover:
- locked-career UI accessibility and RU/EN help;
- selected semantic static resolution with animations disabled;
- valid static fallback when optional dynamic media is missing;
- production slot registry membership;
- active presentation source-manifest semantic-ID liveness;
- project-owned source existence;
- Work action and School teacher media identity liveness;
- presentation-only ownership invariants.

## Ownership boundary

No gameplay mechanics, unlock rules, conditions/effects/rewards/economy, RNG, Save schema/identity, career facts, relationship/story canon, Activity mechanics, School mechanics or shared runtime architecture are changed.

## QA freeze

Once one exact PR head has green required repository CI, that exact head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`.
