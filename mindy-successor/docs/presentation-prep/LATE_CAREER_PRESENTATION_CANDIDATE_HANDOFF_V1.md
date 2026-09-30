# Late-Career Presentation Candidate Handoff v1

Status: C2-36 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
Branch: `chat2/late-career-presentation-c2-25-36`
Current-main baseline: `05fa2d1084a48cab20d42f23885e19ee627d3d09`

The frozen exact candidate head and exact-head repository check are recorded in the candidate PR after CI completes. This file intentionally does not self-reference its own commit SHA.

## Scope

This candidate completes C2-25 through C2-36 for the seven current non-starter ordinary careers:
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist-Geisha;
- Assassin;
- Prostitute / Professional.

Delivered:
- late-career presentation inventory;
- verified project-owned static shift/result coverage for all seven careers;
- non-explicit Professional-career presentation boundary;
- ordinary Work/result fallback audit across all ten ordinary careers;
- RU/EN presentation alt/caption coverage for the 35 selected late-career slots;
- semantic-ID/source/fallback/editor-replacement regression.

## Production behavior

No gameplay/content/runtime semantics are changed.

No new image/video bytes are introduced. This candidate records and validates project-owned presentation/media already present on current main.

No career stage, transition, unlock condition, effect, reward, economy value, Save identity/schema, RNG rule, story/relationship fact, event, or ending is authored.

## Selected late-career presentation set

The source manifest contains **35 current semantic shift/result presentation IDs**:
- 7 careers;
- 4 seasonal shift slots per career;
- 1 result slot per career.

All 35 selected semantic slots require:
- an existing presentation registry identity;
- a project-owned local static SVG;
- an exact `content/presentation.json` static binding;
- RU/EN alt metadata;
- RU/EN caption metadata;
- safe static resolution with animations enabled or disabled.

Selected animation/video sources: **0**.

## Ordinary Work/result fallback audit

Across all ten ordinary careers, current main has:
- 40 seasonal Work semantic slots;
- 10 result semantic slots;
- 50 exact project-owned static overrides;
- 0 missing Work/result static overrides;
- 0 stale ordinary Work/result overrides.

Current result fallback is compatibility-sensitive: Lumber, Tavern, and Guard use `job/<career>/result/default -> job/<career>/shift/default -> location/town/default` because their legacy base actions register the shared result slot first. Satyr Maid, Undead Farm, Hunter, Merchant, Artist-Geisha, Assassin, and Prostitute use `job/<career>/result/default -> job/<career>/shift/spring/default -> location/town/default`. Every seasonal shift slot falls back to `location/town/default`.

Normal resolution does not reach that generic chain because all 50 audited Work/result semantic IDs have exact static overrides.

## Existing identity boundaries

Current gameplay contains three Tavern endings:
- `tavern-stay`;
- `tavern-guild`;
- `tavern-court`.

The registry derives `ending/tavern-stay`, `ending/tavern-guild`, and `ending/tavern-court`, but current `content/presentation.json` has no static overrides for those ending identities.

C2-26 is explicitly limited to Tavern shift/result presentation. The candidate documents these real missing ending overrides but does not invent ending art or broaden the queue.

No current career-domain event or relationship identity exists for the seven late-career domains.

## Safety boundary

Professional-career presentation remains voluntary-work-context presentation and non-explicit:
- seasonal sources show room/work-space preparation;
- result source shows completed work without explicit sexual content;
- presentation accessibility text remains explicitly non-explicit.

Assassin presentation remains target-free preparation/equipment presentation.

## Files

- `docs/presentation-prep/LATE_CAREER_PRESENTATION_INVENTORY_V1.md`
- `docs/presentation-prep/ORDINARY_WORK_PRESENTATION_FALLBACK_AUDIT_V1.md`
- `content/presentation-drafts/late-career-presentation-source-manifest-v1.json`
- `tests/late-career-presentation-accessibility.test.ts`
- `tests/late-career-presentation-replacement-validator.test.ts`

## Validation

Focused regressions require:
- unique late-career semantic IDs;
- exact current registry presence;
- exact manifest -> production static binding;
- source asset existence;
- correct registry fallback IDs;
- RU/EN alt + caption parity;
- animation-mode-independent static resolution;
- editor replacement by the same semantic ID;
- unchanged gameplay definitions;
- unchanged Save serialization during presentation replacement;
- non-explicit Professional-career presentation metadata.

## Integration / QA freeze

The branch was created from current main `05fa2d1084a48cab20d42f23885e19ee627d3d09`.

Once the candidate PR publishes a green repository check on one exact head, that head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`. Unrelated later main drift is not a reason to move the frozen head.
