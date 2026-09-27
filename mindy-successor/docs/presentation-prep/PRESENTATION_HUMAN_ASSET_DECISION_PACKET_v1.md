# Presentation Human Asset Decision Packet v1

Purpose: list only the decisions a human/Product/content author must make before final art or GIF production.

This packet does not choose a visual style, art direction, palette, animation technique, or preferred asset.

## Decision 1 — seasonal Lumber shift GIF coverage

**Affected semantic IDs**
- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

**Content authoring first?**
No. Gameplay and semantic identities are already shipped.

**Current fallback**
`assets/stage-lumber.svg`

**Blocking?**
Polish only. Not blocking for current RC or authored product depth.

**Downstream replacement/import work**
If one or more GIFs are approved:
- validate each exact semantic ID;
- import via managed replacement workflow;
- preview animations on/off;
- preserve static Lumber fallback;
- save/reload smoke;
- rollback smoke.

## Decision 2 — Lumber career milestone animation

**Affected semantic ID**
`job/lumber/event/lumber-career-first-shift/default`

**Content authoring first?**
No. Event identity is shipped.

**Current fallback**
`assets/stage-lumber.svg`

**Blocking?**
Polish only.

**Downstream replacement/import work**
Optional accepted-hand GIF may be bound to this existing ID without changing event identity.

## Decision 3 — Foreman relationship / Night animation

**Affected semantic IDs**
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

**Content authoring first?**
No for current shipped scenes.

**Current fallback**
`assets/stage-lumber.svg`

**Blocking?**
Polish only.

**Downstream replacement/import work**
Optional GIFs may replace current static media after ordinary validation/preview/rollback.

## Decision 4 — logging-road-specific Forest art

**Affected semantic presentation**
Current:
`activity/forest/route/default`

Potential future family:
`activity/forest/route/logging-road/*`

**Content authoring first?**
Not strictly for a generic visual enhancement; yes before final route-specific variants/lore are bound.

**Current fallback**
`assets/stage-forest.svg`

**Blocking?**
Not blocking current RC. Route-specific product depth is optional presentation specialization once content scope is approved.

**Downstream replacement/import work**
Create exact authored semantic variants only after content decides whether route-specific presentation is desired.

## Decision 5 — Old Boundary-specific art

**Affected semantic presentation**
Current:
`activity/forest/route/default`

Potential future family:
`activity/forest/route/old-boundary/*`

**Content authoring first?**
Yes for final context-specific art.

Product still must settle token acquisition and retain/consume semantics before presentation should imply a specific authored Old Boundary experience.

**Current fallback**
`assets/stage-forest.svg`

**Blocking?**
Blocking only for final authored Old Boundary presentation depth, not for current presentation runtime.

**Downstream replacement/import work**
After Product authoring:
- receive exact approved content/semantic mapping;
- bind media without changing item/capability mechanics;
- preserve generic Forest fallback.

## Decision 6 — hunter-trail art

**Affected semantic presentation**
Potential future family:
`activity/forest/route/hunter-trail/*`

**Content authoring first?**
Yes.

Hunter-trail gameplay/content identity is not final.

**Current fallback**
`activity/forest/route/default -> assets/stage-forest.svg`

**Blocking?**
Blocking for hunter-trail authored depth; not blocking current RC.

**Downstream replacement/import work**
No final route-specific asset mapping until the route identity/content is authored.

## Decision 7 — Forest challenge-family visuals

**Affected semantic families**
- `activity/forest/challenge/navigation/*`
- `activity/forest/challenge/physical-obstacle/*`
- `activity/forest/challenge/interpretation-ritual-anomaly/*`

**Content authoring first?**
Yes.

**Current fallback**
`activity/forest/route/default -> assets/stage-forest.svg`

**Blocking?**
Blocking only for final authored challenge presentation depth.

**Downstream replacement/import work**
After challenge content is final, bind exact semantic variants to approved assets and run fallback/save/rollback checks.

## Decision 8 — seasonal Forest topology visuals

**Affected semantic family**
Potential shape:
`activity/forest/route/{route}/season/{spring|summer|autumn|winter}/*`

**Content authoring first?**
Yes.

Presentation must not infer seasonal story/topology meaning from calendar state alone.

**Current fallback**
`assets/stage-forest.svg`

**Blocking?**
Blocking only for final seasonal product depth, not current RC presentation.

**Downstream replacement/import work**
Only after seasonal topology/content is approved.

## Decision 9 — School teacher/presenter visual identities

**Affected semantic IDs**
All eight existing:
`school/<course-slug>/lesson/default`

**Content authoring first?**
Yes for teacher-specific visuals.

Human/Product must choose whether courses have:
- distinct teachers;
- shared teachers;
- presenter roles;
- narrator-only treatment;
- another approved model.

No option is preferred here.

**Current fallback**
`assets/stage-school.svg`

**Blocking?**
Teacher-specific art is presentation/content depth, not a runtime blocker.

**Downstream replacement/import work**
Existing course semantic IDs can receive approved media without changing paid lesson mechanics.

## Decision 10 — School management/accounting public-result visual

**Affected semantic ID**
Not assigned until the final School-owned provider/result is authored.

**Content authoring first?**
Yes.

**Current fallback**
School/town static context is available.

**Blocking?**
Blocking for final authored School -> Lumber public-result depth.

**Downstream replacement/import work**
Only after Product chooses:
- provider/result type;
- milestone/threshold;
- final public-result identity.

Then create the corresponding semantic presentation identity and asset mapping.

## Decision 11 — Arcana / Forest public-result visual

**Affected semantic IDs**
Existing lesson:
`school/arcana/lesson/default`

Distinct public-result ID:
unassigned until authoring.

**Content authoring first?**
Yes for the public-result visual.

**Current fallback**
School / Forest / town static context remains safe.

**Blocking?**
Blocking only for that authored cross-system content.

**Downstream replacement/import work**
Bind media after provider/milestone identity exists; do not invent a clue/capability/result ID from visual needs.

## Decision 12 — ending-specific polish

**Affected semantic IDs**
- `ending/lumber/hard-work`
- `ending/lumber/forewoman`
- `ending/lumber/forest`

**Content authoring first?**
No for generic dedicated art; yes if Product wants additional ending-specific narrative beats beyond currently authored endings.

**Current fallback**
`location/town/default -> assets/stage-town.svg` plus ending text.

**Blocking?**
Polish only for current RC.

**Downstream replacement/import work**
Dedicated static/animated media can be added under existing ending IDs, provided fallback and save/reload identity remain unchanged.

## Decision summary

Human/Product must decide **what content or media should exist**.

Presentation engineering already provides:

- semantic-ID routing;
- current static/text fallbacks;
- animation-off behavior;
- save/reload identity;
- safe replacement validation and rollback contracts.

No visual decision in this packet requires changing gameplay mechanics.
