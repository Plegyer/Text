# Presentation Post-Decision Asset Integration Checklist v1

Use this checklist only after Product/content decisions are approved.

## 1. Receive approved mapping

Input must identify:
- approved authored content identity;
- exact semantic `presentationId` or approved new semantic family member;
- approved asset file/media kind;
- required alt/text fallback;
- whether the asset is required for authored depth or optional polish.

Do not derive gameplay identity from filenames.

## 2. Validate semantic IDs

Confirm:
- existing IDs match shipped slash taxonomy exactly;
- new IDs are explicitly authorized by authored content;
- no dotted/slash aliasing;
- no underscore/kebab ambiguity;
- no duplicate canonical ID;
- no stale or removed slot.

If semantic identity is unresolved, stop before import.

## 3. Validate fallback preservation

Before replacement:
- record current static fallback;
- record text fallback;
- verify fallback chain has no cycle;
- verify fallback target exists;
- confirm removing the new asset would still leave the slot understandable.

Do not remove a safe shipped fallback merely because richer media is added.

## 4. Import replacement media

Use the presentationId-based operator/import workflow.

Do not edit source paths manually.

Validate:
- media kind matches file type;
- reference is managed/portable;
- path contains no traversal or external unsafe reference;
- alt text is non-empty;
- payload contains no gameplay state.

## 5. Preview

Preview the exact semantic slot with:
- animations enabled;
- animations disabled;
- primary media intentionally unavailable when practical.

Check:
- correct scene/context;
- correct alt/text meaning;
- no duplicate media candidate;
- no gameplay effect from preview.

## 6. Persist atomically

Persist presentation override metadata only.

Persistence must not include:
- Energy/money/inventory;
- conditions/effects;
- route/action availability;
- ending eligibility;
- event progression;
- GIF frame index;
- elapsed media time;
- playback timestamp.

If validation fails, active override state remains unchanged.

## 7. Animations-on/off verification

Animations on:
- approved dynamic media may be selected.

Animations off:
- same semantic `presentationId`;
- static/text fallback remains valid;
- command availability and mechanics remain identical.

## 8. Save/reload smoke

At a representative real boundary:
- save;
- reload;
- verify gameplay identity unchanged;
- verify semantic presentation identity stable where persisted;
- verify no cost/effect/reward replays;
- verify no animation timing state was serialized.

For reactive scenes, verify eventId + variantId remain authoritative.

For Activity, verify route/checkpoint gameplay state remains authoritative.

For endings, verify ending identity remains authoritative.

## 9. Rollback smoke

Remove the override for the exact semantic ID.

Verify:
- shipped fallback becomes active;
- no orphan override remains;
- export order remains deterministic;
- save/gameplay state is unchanged.

## 10. Zero gameplay-state mutation proof

Compare gameplay state before and after:
- import;
- preview;
- persist;
- animations-off;
- rollback.

Presentation-only asset work must not change:
- resources;
- stats;
- progression;
- inventory;
- RNG;
- available actions;
- ending state;
- transaction IDs.

## Completion rule

An asset integration is complete only when:
1. semantic identity is approved;
2. fallback is preserved;
3. import validates;
4. preview passes;
5. animations-off passes;
6. save/reload passes;
7. rollback passes;
8. zero gameplay-state mutation is confirmed.
