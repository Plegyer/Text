# Presentation Hardening v8 Candidate Handoff

Status: C2-84 CANDIDATE HANDOFF
Owner: Chat 2 / Presentation & Media
Final current-main base: `f4de3b01a4369417ae9eff4b384f755790f75279`
Branch: `chat2/presentation-hardening-c2-73-84`

The exact frozen candidate head and exact-head CI are recorded in PR metadata after repository checks complete.

## Queue scope

This candidate completes C2-73 through C2-83 and prepares C2-84 freeze.

Delivered:
- active presentation reachability audit;
- animation-off coverage v3;
- deterministic missing-media fallback regression;
- editor/replacement persistence regression;
- locked Work keyboard/focus accessibility refinement;
- ending eligible/committed/completed presentation consistency;
- School course/teacher presentation alignment after School v7;
- project-owned media provenance audit;
- RU/EN alt-caption parity v3 across active and fallback media;
- dead asset/source-manifest audit v3;
- cross-domain presentation regression v3.

## Current-main resync

The candidate was selectively refreshed after queue-v7 PR #125 and School generic Night v7 PR #127 merged.

Only Presentation-owned queue-v8 artifacts were carried forward.

No queue-v7 payload is duplicated, and no gameplay/state file is changed to resolve main drift.

## Active presentation coverage

Selected live semantic presentation IDs: **47**:
- endings: 9;
- Forest: 10;
- ordinary poverty: 20;
- School courses: 8.

Current Work action controls audited: **10**.

Current School teacher media identities audited: **8**.

All selected semantic surfaces have exact project-owned static production bindings and animation-off coverage.

## Production presentation changes

This candidate makes two narrow UI/accessibility presentation refinements:
- locked ordinary-career reason text is keyboard-focusable while existing disabled action state and `actionAvailable` logic remain unchanged;
- `ending_committed` receives a distinct localized presentation title and resolves the exact existing committed ending semantic media instead of falling through to the time-expired presentation label.

Presentation localization adds:
- `ui.run.endingCommitted` RU/EN;
- RU/EN alt + caption metadata for generic catalog fallback media used by the selected queue-v8 surfaces.

No gameplay condition, ending rule, unlock rule, effect, reward, RNG or Save identity is changed.

## Fallback and provenance

Missing optional dynamic/static candidates retain deterministic resolver order into existing registry/catalog fallback.

Project-owned provenance requires selected sources to:
- live under local `assets/`;
- exist in source and built `dist/`;
- match built/source bytes;
- remain attached to a live semantic or media identity.

## Dead source audit

The audit currently records eight unreferenced legacy presentation assets without deleting them. Active production presentation overrides resolving to missing assets: **0**. Selected source-manifest rows with stale semantic IDs: **0**.

## Validation

Focused regressions include:
- `presentation-animation-off-coverage-v8.test.ts`;
- `presentation-missing-media-fallback-v8.test.ts`;
- `presentation-replacement-persistence-v8.test.ts`;
- `work-locked-focus-accessibility-v8.test.ts`;
- `ending-state-presentation-consistency-v8.test.ts`;
- `presentation-media-provenance-v8.test.ts`;
- `presentation-alt-caption-parity-v8.test.ts`;
- `presentation-dead-asset-source-audit-v8.test.ts`;
- `cross-domain-presentation-regression-v8.test.ts`.

## Ownership boundary

No gameplay mechanics, progression, Save/RNG, career facts, relationship/story canon, Activity mechanics, School mechanics, ending rules or shared runtime architecture are changed.

## QA freeze

After exact-head required repository CI is green, that exact head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`.

Any head movement after freeze invalidates prior exact-head QA/CI evidence.
