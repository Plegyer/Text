# Presentation-Ready Content Acceptance Template v1

Purpose: define when an authored gameplay content unit is stable enough to enter GIF/static presentation production.

This template prevents art production from running ahead of unstable content identity.

## 1. Content identity

**Gameplay/content ID**
`<exact approved source ID>`

**Subsystem**
`<career | school | poverty | night | activity | palace | ending | meta | other approved domain>`

Acceptance:
- [ ] source ID exists in current authoritative content;
- [ ] ID is not provisional or superseded;
- [ ] variant/outcome/route identity is explicit where needed.

If the source ID is not stable, stop before presentation production.

## 2. Choices / effects stability

Record:
- authored choices;
- visible result/outcome meaning;
- gameplay effects relevant to scene context;
- any known Product decisions still capable of changing the scene identity.

Acceptance:
- [ ] choices/effects are stable enough that the media brief will not target a materially different scene;
- [ ] presentation work does not need to invent missing mechanics;
- [ ] future balance tuning will not rename the content identity.

Presentation does not need all balance numbers frozen if they do not change the visible content identity.

## 3. Semantic presentationId

**presentationId**
`<exact canonical slash semantic ID>`

Acceptance:
- [ ] assigned from approved content identity;
- [ ] collision-checked;
- [ ] not filename-derived;
- [ ] not dotted alias;
- [ ] not underscore/kebab alias of another slot;
- [ ] does not rename a shipped ID.

If content identity is still open, use:
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`
and do not start final asset production.

## 4. Text fallback

**Text/accessibility fallback**
`<approved meaning>`

Acceptance:
- [ ] scene remains understandable without GIF;
- [ ] essential gameplay meaning is present;
- [ ] no frame timing is needed to understand choices/outcome;
- [ ] text is context-correct for reused media.

## 5. Media requirement

**Visual dependency**
`REQUIRED_FOR_AUTHORED_DEPTH | OPTIONAL_POLISH | REUSE_EXISTING`

**Primary media target**
`gif | image | none`

**Reuse group**
`<group or NONE>`

Acceptance:
- [ ] required vs optional status is explicit;
- [ ] reuse does not collapse semantic identities;
- [ ] no aesthetic preference is mistaken for a gameplay dependency.

## 6. Fallback readiness

**Static fallback**
`<asset or semantic fallback>`

Acceptance:
- [ ] fallback exists;
- [ ] fallback graph is cycle-free;
- [ ] animations-off path is known;
- [ ] missing-primary behavior is non-fatal.

## 7. Owner / replacement scope

**Owning subsystem**
`<exact owner domain>`

**Replacement scope**
`PER_SLOT | SHARED_REUSE_GROUP | NOT_REPLACEABLE`

Acceptance:
- [ ] operator knows whether media replacement affects one mapping or a shared media group;
- [ ] replacement metadata is separate from gameplay state;
- [ ] rollback target is known.

## 8. Save identity owner

Choose:
- `lastAction`
- `pendingScene`
- `NightFlow`
- `Activity`
- `endingState`
- `RunResult`
- `NewRunLocation`
- another explicitly authored gameplay owner

**saveIdentityOwner**
`<value>`

Acceptance:
- [ ] gameplay state owns reload identity;
- [ ] filename/reuse group does not own save identity;
- [ ] no frame/time/playback state is persisted.

## 9. Product decisions

**Unresolved Product decisions**
`NONE | <explicit list>`

Acceptance:
- [ ] no unresolved decision can materially change the semantic content identity;
- [ ] unresolved optional polish decisions are clearly separated;
- [ ] provider/threshold/character/route identity is not invented for Presentation.

If a remaining Product decision can change source identity, the unit is not ready.

## 10. Approval evidence

Record:
- content-authoring approval reference;
- Product decision reference where required;
- current commit/document authority;
- reviewer/owner.

Acceptance:
- [ ] authority is traceable;
- [ ] media producer does not need to infer missing content.

## 11. Readiness outcome

Choose one:

### PRESENTATION_READY
All required identity, fallback and ownership fields are stable.

### READY_FOR_PLACEHOLDER_ONLY
Content is playable but not stable enough for final unique media. Use safe reusable/static/text fallback only.

### NOT_READY_CONTENT_IDENTITY_OPEN
Gameplay/content identity is still unresolved. Do not assign final semantic ID or commission unique media.

## Final acceptance checklist

A content unit can enter final GIF/static production only when:
- [ ] gameplay ID approved;
- [ ] choices/effects stable enough for presentation;
- [ ] semantic presentationId assigned;
- [ ] text fallback exists;
- [ ] static/semantic fallback exists;
- [ ] owner subsystem known;
- [ ] replacement scope known;
- [ ] save identity owner known;
- [ ] unresolved Product decisions are absent or non-identity-changing;
- [ ] approval evidence exists.

Art production must not be used to force a decision that content authoring has not yet made.
