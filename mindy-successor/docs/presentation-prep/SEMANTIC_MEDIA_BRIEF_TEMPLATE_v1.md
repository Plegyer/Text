# Semantic Media Brief Template v1

Purpose: define the smallest brief needed to produce one GIF/static asset for an already-authored semantic `presentationId`.

The asset producer receives visual context without needing gameplay mechanics or source-code knowledge.

---

## 1. Semantic identity

**presentationId**
`<exact canonical semantic ID>`

**Source content reference**
`<approved gameplay/content ID + authority reference>`

Requirements:
- semantic ID already exists or is explicitly approved;
- no filename-derived identity;
- no provisional/superseded content.

---

## 2. Gameplay/content context

Describe only what the asset producer must understand visually.

**Context summary**
`<short authored scene description>`

Include:
- location/context;
- visible participants only if authoritatively defined;
- broad scene purpose;
- visible outcome/state if relevant.

Do not include:
- hidden mechanics;
- thresholds;
- RNG;
- resource formulas;
- implementation details.

---

## 3. Visual subject / action

**Primary visual subject**
`<approved subject>`

**Primary visible action**
`<approved action/motion>`

**Camera / framing constraints**
`<only if approved/required>`

Keep the brief focused on visible communication.

---

## 4. Reusable loop vs dedicated asset

Choose one:

### REUSABLE_LOOP
Use when the visible motion/setting can safely serve multiple semantic IDs.

**reuseGroup**
`<stable media reuse key>`

List expected semantic mappings if known:
`<id-1, id-2, ...>`

### DEDICATED_ASSET
Use when the scene needs unique recognition because of:
- distinct authored narrative beat;
- named relationship context;
- unique route/outcome;
- ending;
- product-critical reveal;
- materially different location.

Do not choose dedicated merely because the semantic ID is unique.

---

## 5. Season / context variants

Only include authored variants.

**Season**
`none | spring | summer | autumn | winter`

**Career stage**
`none | <approved stage>`

**Relationship context**
`none | <approved context>`

**Night context**
`none | <approved context>`

**Route/challenge context**
`none | <approved identity>`

Do not invent variants to make the asset set look complete.

---

## 6. Primary media target

**Kind**
`gif | image`

**Target use**
`primary | reusable primary | optional polish`

**Looping**
`loop | non-loop | producer-choice-within-approved-brief`

Looping behavior must not affect gameplay progression.

---

## 7. Static fallback

**Static fallback**
`<existing asset / approved static target / semantic fallback ID>`

The final asset must remain optional from a gameplay perspective.

If the GIF fails or animations are disabled, the fallback must still communicate the scene.

---

## 8. Text fallback

**Text fallback / scene meaning**
`<approved concise text>`

This text describes essential meaning without relying on animation.

The asset producer does not rewrite gameplay choices or outcomes.

---

## 9. Accessibility alt

**Alt / accessible meaning**
`<context-correct description>`

Requirements:
- describes the visible scene;
- does not depend on animation speed/frame order;
- does not expose stale content;
- can differ between semantic IDs even when media is reused.

---

## 10. Prohibited gameplay/timing coupling

The asset must not require:
- animation-end callback to unlock controls;
- specific frame to apply an effect;
- exact playback duration for mechanics;
- loop count for progression;
- frame/time state in save data;
- asset filename as gameplay identity.

**Mechanical dependency**
`NONE`

This field is mandatory.

---

## 11. Animations-off acceptance

State the expected behavior:

```text
animationsOff:
  semanticId: unchanged
  fallback: <static/semantic/text>
  gameplayControls: unchanged
  mechanics: unchanged
```

---

## 12. Approval / authority

**Content authority**
`<doc / commit / authored package>`

**Visual approval owner**
`<Product/content/art owner>`

**Brief version**
`<version>`

**Approved for production**
`YES | NO`

No final media production begins while approval is NO.

---

## Compact brief

```text
presentationId:
sourceContent:
context:
subject:
action:
assetMode: REUSABLE_LOOP | DEDICATED_ASSET
reuseGroup:
season/contextVariants:
mediaKind:
staticFallback:
textFallback:
alt:
animationsOff:
mechanicalDependency: NONE
contentAuthority:
visualApproval:
briefVersion:
```

---

## Brief acceptance checklist

A semantic media brief is production-ready when:

- [ ] presentationId is canonical;
- [ ] source content identity is approved;
- [ ] visible context is clear;
- [ ] visual subject/action is defined;
- [ ] reusable vs dedicated is explicit;
- [ ] only authored variants are listed;
- [ ] static fallback is known;
- [ ] text fallback is known;
- [ ] alt/accessibility meaning is present;
- [ ] mechanical dependency is NONE;
- [ ] animations-off behavior is defined;
- [ ] approval/source-content reference is traceable.

The producer should be able to create the asset from this brief without seeing gameplay mechanics or editing source code.
