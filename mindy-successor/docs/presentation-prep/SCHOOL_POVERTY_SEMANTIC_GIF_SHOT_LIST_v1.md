# School / Poverty Semantic GIF Shot List v1

Scope:
- eight paid School lesson surfaces;
- Night study presentation;
- normal room;
- cheap lodging;
- street sleep;
- ordinary poverty event families;
- future Secret Debt surfaces where structural identity is already known.

GIF production remains independent from mechanics.

## Readiness legend

- **MEDIA_READY_IDENTITY** — semantic ID already authoritative.
- **REUSE_EXISTING** — current shared semantic/static presentation is sufficient.
- **CONTENT_AUTHORING_FIRST** — final source/semantic identity is not ready.
- **PRODUCT_DECISION_REQUIRED** — structural content is known, but a Product/content decision must settle final identity or visual scope first.

---

# School paid lessons

All eight paid lesson semantic IDs are already authoritative.

## S1 — Literacy and Numbers

**presentationId**
`school/literacy-and-numbers/lesson/default`

**Context**
Paid Literacy and Numbers lesson result.

**Asset mode**
Reusable School/classroom loop.

**Static fallback**
`assets/stage-school.svg`

**Text fallback**
Existing course/result meaning.

**Status**
MEDIA_READY_IDENTITY.

---

## S2 — Arcana

**presentationId**
`school/arcana/lesson/default`

**Context**
Paid Arcana lesson result.

**Asset mode**
Reusable School/classroom loop; dedicated Arcana-specific media is optional.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

## S3 — Rhetoric and Social

**presentationId**
`school/rhetoric-and-social/lesson/default`

**Context**
Paid rhetoric/social lesson result.

**Asset mode**
Reusable School/classroom/presentation loop.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

## S4 — Etiquette and Presentation

**presentationId**
`school/etiquette-and-presentation/lesson/default`

**Context**
Paid etiquette/presentation lesson result.

**Asset mode**
Reusable School/classroom/presentation loop.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

## S5 — Field Craft

**presentationId**
`school/field-craft/lesson/default`

**Context**
Paid Field Craft lesson result.

**Asset mode**
Reusable School/practical-training loop; dedicated field-practice media is optional.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

## S6 — Physical Training

**presentationId**
`school/physical-training/lesson/default`

**Context**
Paid Physical Training lesson result.

**Asset mode**
Reusable training loop or School fallback.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

## S7 — Arts and Performance

**presentationId**
`school/arts-and-performance/lesson/default`

**Context**
Paid Arts and Performance lesson result.

**Asset mode**
Reusable performance/practice loop; dedicated performance media optional.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

## S8 — Body Confidence

**presentationId**
`school/body-confidence/lesson/default`

**Context**
Paid Body Confidence lesson result.

**Asset mode**
Reusable training/presentation loop; content-specific media should follow approved authored visual treatment.

**Static fallback**
`assets/stage-school.svg`

**Status**
MEDIA_READY_IDENTITY.

---

# School blocking scene

Although not a separate requested course row, the shipped School flow includes a real blocking event.

**presentationId**
`location/town/event/base-school/lesson`

**Context**
Blocking `base.school / lesson` scene after a paid lesson, before NightFlow.

**Asset mode**
Reuse existing workshop/classroom media.

**Static fallback/current media**
`assets/workshop.svg`

**Status**
MEDIA_READY_IDENTITY / REUSE_EXISTING.

This scene must remain distinct from the paid lesson result semantic ID.

---

# Night study

## N1 — Night study shared presentation

**Current semantic presentation**
`location/town/default`

**Context**
Night study occurs inside the existing Night flow. No dedicated School Night-study semantic slot is currently authoritative.

**Asset mode**
Reuse existing Night/town context until Product/content explicitly authors a distinct visible Night-study presentation identity.

**Static fallback**
`assets/stage-town.svg`

**Status**
REUSE_EXISTING.

**Dedicated GIF readiness**
PRODUCT_DECISION_REQUIRED only if a distinct Night-study visual identity is desired.

No gameplay mechanics need to wait for that decision.

---

# Ordinary poverty / housing

Final production semantic IDs for the housing ladder are not yet authoritative.

## P1 — Normal room

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Ordinary normal lodging / room.

**Asset mode**
Reusable lodging interior.

**Current safe fallback**
`location/town/default`

**Status**
CONTENT_AUTHORING_FIRST.

**Open dependency**
Final housing/lodging content identity.

---

## P2 — Cheap lodging

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Cheaper lodging with its own authored Night context and limitations.

**Asset mode**
Reusable lodging interior or cheaper-lodging variant.

**Current safe fallback**
`location/town/default`

**Status**
CONTENT_AUTHORING_FIRST.

**Open dependency**
Final cheap-lodging gameplay/content identity.

---

## P3 — Street sleep

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Street sleep / ordinary poverty Night context.

**Asset mode**
Reusable street-night exterior loop.

**Current safe fallback**
`location/town/default`

**Status**
CONTENT_AUTHORING_FIRST.

**Open dependency**
Final street-sleep gameplay/content identity.

---

# Ordinary poverty event families

The product structure already expects repeatable ordinary poverty events, but final event IDs are not authoritative.

## P4 — Helpful ordinary street event family

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Context**
Helpful ordinary poverty/street event.

**Asset mode**
Reusable street-night setting with event-specific text/choices.

**Current safe fallback**
Town/static/text fallback.

**Status**
CONTENT_AUTHORING_FIRST.

---

## P5 — Neutral ordinary street event family

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Context**
Neutral ordinary poverty/street event.

**Asset mode**
Reusable street-night setting.

**Current safe fallback**
Town/static/text fallback.

**Status**
CONTENT_AUTHORING_FIRST.

---

## P6 — Bad ordinary street event family

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Context**
Negative ordinary poverty/street event.

**Asset mode**
Reusable street-night setting or dedicated exception after event authoring.

**Current safe fallback**
Town/static/text fallback.

**Status**
CONTENT_AUTHORING_FIRST.

---

## P7 — Seasonal ordinary poverty event variants

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Context**
Seasonally authored housing/street events.

**Asset mode**
Base street/lodging loop with seasonal variant only where authored visible context requires it.

**Status**
CONTENT_AUTHORING_FIRST.

Do not create four seasonal assets automatically.

---

# Secret Debt / Slave structural shot list

The route structure is known in design, but final production semantic IDs are not authoritative.

## D1 — One-time lender offer

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Rare one-time lender encounter during street sleep.

**Asset mode**
Reusable street-night setting or dedicated lender scene.

**Fallback**
Town/street static-text fallback.

**Status**
CONTENT_AUTHORING_FIRST.

The lender offer must not reuse the ordinary street-sleep semantic ID.

---

## D2 — Delayed debt activation / reveal

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Delayed reveal that opens the hidden debt/career state.

**Asset mode**
Dedicated reveal or reusable debt/night setting.

**Fallback**
Town/static-text fallback.

**Status**
CONTENT_AUTHORING_FIRST.

It remains semantically distinct from the original offer.

---

## D3 — Hidden daytime work

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Repeatable hidden-career daytime work after debt activation.

**Asset mode**
Reusable hidden-work loop.

**Fallback**
Static/text implementation fallback.

**Status**
CONTENT_AUTHORING_FIRST.

---

## D4 — Forced Night obligation

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Structural context**
Forced Night scene while bound.

**Asset mode**
Reusable forced-Night setting; dedicated variants only after authored content exists.

**Fallback**
Night/town static-text fallback.

**Status**
CONTENT_AUTHORING_FIRST.

This identity must remain distinct from hidden daytime work.

---

## D5 — Secret Debt outcomes

Known structural outcome families:
- paid freedom;
- bound life;
- takeover.

**presentationId**
`UNASSIGNED_UNTIL_CONTENT_AUTHORED`

**Asset mode**
Dedicated ending/outcome media or shared epilogue/result asset after exact ending identities are authored.

**Fallback**
Town/static/text ending fallback.

**Status**
PRODUCT_DECISION_REQUIRED + CONTENT_AUTHORING_FIRST.

Final ending IDs, exact Product policy and final outcome content must be authoritative before unique media is commissioned.

---

# Shared reuse opportunities

Safe media reuse candidates:
- School classroom loop across paid lessons;
- School workshop/blocking-scene setting;
- town/Night context;
- lodging interior;
- street-night exterior;
- hidden-work loop;
- ending/epilogue result.

Reuse does not merge semantic IDs.

# Production conclusion

## Ready now
- all eight paid School lesson semantic surfaces;
- real `base.school / lesson` blocking scene;
- shared Night/town presentation.

## Content authoring first
- normal room;
- cheap lodging;
- street sleep;
- ordinary poverty events;
- lender offer;
- debt activation;
- hidden work;
- forced Night.

## Product/content decisions still required
- whether Night study deserves a distinct visual semantic identity;
- final Secret Debt outcome identity/media scope.

All not-yet-ready surfaces remain safe with static/text fallback during implementation.
