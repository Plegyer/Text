# GIF Reuse / Variant Production Taxonomy v1

Purpose: support a one-person-style full-game asset workflow while minimizing asset count without collapsing distinct gameplay identities.

## Core rule

**Semantic presentation identity and media reuse are separate.**

Multiple semantic `presentationId` values may point to the same GIF/static asset when the visual motion/setting is genuinely reusable.

A shared GIF never means:
- shared gameplay ID;
- shared event identity;
- shared route/outcome;
- shared save identity.

## 1. Reusable loops

Use for motions/settings that are visually generic across several authored scenes.

Examples of reuse classes:
- manual work loop;
- indoor service loop;
- counter/logistics loop;
- patrol/walking loop;
- outdoor travel/search loop;
- performance loop;
- classroom/study loop;
- lodging/sleep loop;
- street/night exterior loop;
- farm/production loop;
- court/service loop.

Reuse is appropriate when the visual communicates activity/setting rather than a unique narrative beat.

Each gameplay scene still keeps its own semantic presentation ID.

## 2. Seasonal variants

Use seasonal variants only where season materially changes visible context.

Production shape:
- base reusable loop where season is visually irrelevant;
- seasonal overlay/replacement where weather, clothing, harvest, lighting or environment materially changes;
- unique season-only GIF only for authored season-specific content.

Do not multiply every scene by four automatically.

Existing shipped Lumber seasonal semantic IDs remain distinct even if two seasons temporarily reuse the same media.

## 3. Career-stage variants

A career may reuse one base work loop through several stages.

Create a stage-specific variant only when authored content changes something visible, for example:
- role/status;
- location;
- equipment;
- work responsibility;
- NPC presence.

Do not create stage-specific GIFs solely because a career counter increased.

## 4. Relationship variants

Relationship media should be split by meaningful authored context, not raw affection numbers.

Useful production distinctions:
- professional;
- friendly/personal;
- conflict;
- intimate/romantic where explicitly authored;
- mentor/patron;
- rival.

One relationship GIF may serve several events if the visual context is the same, while every event/variant retains its semantic ID.

## 5. Night variants

Night presentation is a context layer, not a mechanics layer.

Reusable groups:
- normal lodging;
- cheap lodging;
- street sleep;
- study;
- professional meeting;
- social meeting;
- forced obligation.

Night GIF completion never advances the NightFlow.

Different gameplay states must remain semantically distinct even if they reuse one night setting.

## 6. Result / ending variants

Result and ending media should emphasize outcome meaning.

Reuse categories:
- ordinary work result;
- milestone result;
- success/escape/failure;
- career Hard Work;
- relationship/power outcome;
- hidden-career outcome;
- Meta/New Run transition.

Dedicated ending media is desirable after content lock but not required when static/text fallback already communicates the outcome.

## 7. Static/text fallback

Every production slot needs a fallback strategy independent from GIF availability.

Preferred order:
1. approved GIF/video primary where used;
2. shipped or approved static image;
3. semantic fallback slot;
4. text-safe terminal.

No production scene may become mechanically blocked because an animation is missing.

## 8. Reuse-group metadata

For production planning, each authored presentation slot should record:

- semantic `presentationId`;
- `reuseGroup`;
- intended primary media kind;
- static fallback;
- text fallback;
- variant dimensions used by this slot:
  - season;
  - career stage;
  - relationship context;
  - Night context;
  - result/outcome.

The reuse group is media metadata only.

## 9. When to split a GIF

Create a distinct asset when at least one is true:
- unique narrative reveal;
- visually distinct location;
- important named relationship context;
- product-critical route distinction;
- ending/outcome needs unique recognition;
- season materially changes the scene;
- accessibility would otherwise become misleading.

## 10. When to reuse

Prefer reuse when:
- the same physical motion communicates the scene;
- only text/effects differ;
- a background/setting is shared;
- the unique gameplay identity is already clear through text/UI;
- content is still in production and placeholder-safe presentation is sufficient.

## 11. Anti-collision rule

Never merge semantic IDs because two scenes share media.

Example:
- ordinary street sleep;
- Secret Debt lender offer;
- delayed debt activation

may reuse a street/night background, but they must remain separate semantic identities once authored.

Likewise:
- School paid lesson;
- blocking School event;
- teacher-specific milestone

may reuse School media without becoming one presentation ID.

## Production objective

Minimize **unique commissioned assets**, not semantic coverage.

A healthy full-game presentation catalog may have many semantic IDs pointing to a smaller, carefully managed reusable media library.
