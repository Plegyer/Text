# Starter Careers + School Presentation Candidate Handoff v1

Status: C2-24 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
Branch: `chat2/starter-school-presentation-c2-13-24`
Current-main baseline: `b56628a81098146e7a2fc2c70b193e2587b9f025`

The frozen exact candidate head and exact-head repository check are recorded in the candidate PR after CI completes. This file intentionally does not self-reference its own commit SHA.

## Scope

This candidate completes C2-13 through C2-24 for current Satyr Maid, Undead Farm, starter-career and School presentation coverage.

Delivered:
- current Satyr Maid presentation inventory;
- current Undead Farm presentation inventory;
- verified project-owned seasonal shift coverage for Satyr Maid and Undead Farm;
- starter-trio result presentation consistency regression;
- starter-trio RU/EN accessibility + safe static fallback regression;
- eight-course School presentation inventory;
- School course + teacher static fallback regression;
- one starter/School source manifest;
- semantic-ID replacement/editor compatibility regression;
- aggregate manifest/source/fallback/accessibility validator.

## Production behavior

No gameplay/content/runtime semantics are changed.

No new presentation slot is invented for absent Satyr Maid or Undead Farm events, relationships or endings.

No School curriculum, teacher prose, progression, conditions, effects, rewards, Save identity/schema or RNG is changed.

No new image/video bytes are introduced. The candidate records and validates presentation/media already present on current main.

## Selected semantic presentation set

The source manifest contains 26 current semantic presentation IDs:
- 15 starter-career slots: Lumber, Satyr Maid and Undead Farm seasonal/result presentation;
- 8 existing School course lesson presentation IDs;
- 3 existing School event presentation IDs.

All selected semantic slots require:
- an existing presentation registry identity;
- a project-owned local static source;
- an exact `content/presentation.json` static binding;
- RU/EN alt metadata;
- RU/EN caption metadata;
- safe static resolution with animations enabled or disabled.

The manifest also records 8 existing School teacher media identities. These are catalog media surfaces rather than standalone semantic `presentationId` slots and currently use `assets/stage-school.svg` as their static image fallback.

## Existing identity boundaries

Satyr Maid current presentation identities are limited to:
- `job/satyr-maid/shift/{spring|summer|autumn|winter}/default`;
- `job/satyr-maid/result/default`.

Undead Farm current presentation identities are limited to:
- `job/undead-farm/shift/{spring|summer|autumn|winter}/default`;
- `job/undead-farm/result/default`.

Current career transitions `first-shift` / `first-shift-complete` are gameplay identities but are not separately emitted presentation slots. Chat 2 does not create presentation IDs for them.

There are currently no Satyr Maid / Undead Farm relationship or ending definitions and no career-domain event surfaces for those careers. Future presentation work remains dependency-bound to exact Integration/content identities.

## School boundary

The eight existing course presentation IDs and their current project-owned SVGs are inventoried in:
`docs/presentation-prep/SCHOOL_PRESENTATION_INVENTORY_V1.md`.

School player-facing text remains Chat 5 ownership. Chat 2 only validates presentation/media sources and presentation-specific accessibility already present on current main.

## Validation

Focused regressions:
- `tests/starter-career-result-presentation-consistency.test.ts`;
- `tests/starter-career-presentation-accessibility.test.ts`;
- `tests/school-presentation-fallback-coverage.test.ts`;
- `tests/starter-school-presentation-replacement-compatibility.test.ts`;
- `tests/starter-school-presentation-source-manifest-v1.test.ts`.

The aggregate validator requires:
- unique known semantic presentation IDs;
- exact manifest -> production static binding;
- source asset existence;
- built `dist/` asset copy;
- RU/EN alt + caption parity for semantic slots;
- animation-mode-independent static resolution;
- unique existing School teacher media IDs with valid static image fallback;
- Presentation/Media-only ownership invariants.

## Integration / QA freeze

This branch was recreated on current main after main moved during C2-13, before any candidate handoff.

Once the candidate PR publishes a green repository check on one exact head, that head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`. Unrelated later main drift is not a reason to move the frozen head.
