# Media Producer Acceptance Card Template v1

Purpose: give an external GIF/static producer the smallest safe brief needed to produce one presentation asset.

The producer does not need gameplay mechanics, thresholds, save logic, or source-code access.

---

## Asset card

**Semantic ID**
`<exact presentationId>`

**Source approval**
`<approved content/product reference>`

**Scene context**
`<short visible-context summary>`

**Visible subject**
`<approved subject or environment>`

**Action / motion**
`<approved visible action>`

**Asset mode**
`REUSABLE_LOOP | DEDICATED_ASSET | STATIC_ONLY`

**Reuse group**
`<group or NONE>`

**Loop expectation**
`LOOP | NON_LOOP | PRODUCER_CHOICE_WITHIN_BRIEF`

**Season / context**
`<spring|summer|autumn|winter|night|relationship-context|route-context|none>`

**Visual exclusions**
`<things that must not appear because they are un-authored, misleading, or outside approved content>`

**Static fallback**
`<existing fallback asset or semantic fallback>`

**Alt text**
`<approved accessible meaning>`

**Delivery format**
`gif | png | webp | svg | jpg`

**Suggested delivery path**
`<presentation-only path from filename/import convention>`

**Approval status**
`APPROVED_FOR_PRODUCTION | HOLD_CONTENT_OPEN`

---

## What the producer should understand

The card should answer only:
- what is visibly happening;
- where it happens;
- whether the asset loops;
- whether it is reusable or dedicated;
- which season/context is represented;
- what must not be invented;
- what alt/accessibility meaning is required.

## What the producer must not need

Do not include:
- Energy costs;
- money rewards;
- stat deltas;
- RNG;
- event conditions;
- route unlock rules;
- relationship thresholds;
- ending eligibility;
- save schema;
- frame-trigger mechanics;
- action availability logic.

If a visual brief cannot be written without exposing unresolved mechanics, the content identity is not ready for final media production.

## Media cannot drive mechanics

Mandatory statement on every card:

`MEDIA_CANNOT_DRIVE_GAMEPLAY_TIMING_OR_STATE`

Meaning:
- animation completion does not unlock controls;
- frame index does not trigger effects;
- playback time is not saved;
- loop count has no gameplay meaning;
- missing media falls back safely.

## Reusable-loop card guidance

For `REUSABLE_LOOP`, provide:
- one neutral visible action/motion;
- environment/context boundaries;
- list of semantic IDs expected to reuse it, if known;
- exclusions that prevent misleading context.

Do not ask the producer to merge semantic IDs.

## Dedicated-asset card guidance

Use `DEDICATED_ASSET` only when the approved scene needs unique visual recognition.

Examples of legitimate reasons:
- authored narrative reveal;
- authored named relationship beat;
- unique route/outcome;
- ending;
- product-critical scene distinction.

Do not use dedicated mode merely because a semantic ID is unique.

## Static fallback guidance

The producer does not replace the fallback contract.

The card records the current fallback so production can verify:
- new GIF is optional from a mechanics perspective;
- animations-off remains usable;
- asset delivery failure does not block the scene.

## Alt-text requirement

Alt text must:
- describe visible meaning;
- match the exact semantic context;
- avoid un-authored NPC names/details;
- remain understandable without motion;
- avoid mechanics/threshold language unless it is itself visibly authored content.

## Visual exclusions

Use exclusions to stop accidental invention.

Examples:
- no named NPC appearance until identity is approved;
- no un-authored costume/rank symbol;
- no route-specific landmark before route content exists;
- no implied romance when scene is professional-only;
- no outcome symbol that implies a different ending.

Exclusions are content-safety constraints, not style instructions.

## Compact producer card

```text
presentationId:
sourceApproval:
sceneContext:
subject:
actionMotion:
assetMode:
reuseGroup:
loopExpectation:
seasonContext:
visualExclusions:
staticFallback:
alt:
deliveryFormat:
suggestedPath:
approvalStatus:
mandatoryInvariant: MEDIA_CANNOT_DRIVE_GAMEPLAY_TIMING_OR_STATE
```

## Producer delivery acceptance

A delivered asset is acceptable for import when:
1. it matches the semantic card;
2. file kind is correct;
3. visible context is not misleading;
4. visual exclusions are respected;
5. alt/accessibility meaning is usable;
6. it can fail or be disabled without affecting gameplay;
7. the import manifest maps it to the exact semantic ID.
