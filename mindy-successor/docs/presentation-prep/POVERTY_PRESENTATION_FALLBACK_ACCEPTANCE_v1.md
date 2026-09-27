# Poverty Presentation Fallback Acceptance v1

Scope:
- normal room;
- cheap lodging;
- street sleep;
- ordinary street events;
- future Secret Debt / Slave scenes.

This acceptance contract protects presentation behavior without inventing final poverty events, semantic IDs, prose or assets.

## Core invariants

1. Semantic presentation identity remains gameplay-owned.
2. GIF media is optional.
3. Static/text fallback must keep the scene understandable.
4. Animations-off never changes lodging/event availability or mechanics.
5. Save/reload never depends on media timing.
6. Reused poverty media never collapses distinct gameplay identities.

## Normal room

Presentation acceptance:
- gameplay/housing state owns the visible context;
- semantic presentation identity must come from the authored housing/content identity;
- if no dedicated GIF exists, a static room/town fallback is sufficient;
- text must still communicate the lodging state;
- disabling animations must not change normal Night choices;
- reload must preserve the lodging/Night state independently of media playback.

## Cheap lodging

Presentation acceptance:
- cheap lodging remains a distinct authored housing state from normal room;
- the same interior media may be reused if visually appropriate;
- semantic identity must remain distinct when gameplay identity is distinct;
- static/text fallback must preserve meaning if GIF is absent;
- animations-off must not expand or reduce the limited Night option set;
- save/reload depends on Night/housing state, not animation state.

## Street sleep

Presentation acceptance:
- street sleep remains its own gameplay-owned presentation context;
- street-night GIF is optional;
- static street/town image or text-safe fallback is valid during implementation;
- animations-off must not alter next-day penalty logic, street-event eligibility or Secret Debt encounter eligibility;
- no frame/time state is persisted.

## Ordinary street events

Presentation acceptance:
- each authored event/variant keeps its own semantic identity;
- multiple events may reuse one street background or loop;
- event text/choices remain context-correct under reused media;
- fallback chains are independent per semantic slot;
- missing media never removes or changes event choices;
- reload preserves eventId/variantId and does not depend on media timing.

## Future Secret Debt / Slave scenes

Required distinct authored surfaces may include:
- one-time lender offer;
- delayed activation/reveal;
- hidden daytime work;
- forced Night obligation;
- outcome scenes.

Presentation acceptance:
- final semantic IDs must follow authored gameplay/content identities;
- ordinary street-sleep identity must not be reused as the lender-offer identity;
- daytime hidden-career work and forced Night remain distinct semantic identities;
- GIF may be absent;
- static/text fallback remains sufficient until approved assets exist;
- animations-off must not alter job lock, Night forcing, debt progression or ending availability;
- save/reload remains gameplay-state driven.

## Reuse acceptance

One GIF/static asset may be reused across multiple poverty/Secret Debt semantic IDs only when all of the following hold:
- semantic IDs remain distinct;
- event/lodging text remains correct;
- choices remain correct;
- alt/accessibility text is context-correct;
- each slot keeps a valid fallback;
- rollback of one mapping does not corrupt the others;
- save identity does not derive from filename or reuse group.

## Failure acceptance

If a primary GIF is missing:
- resolve static fallback;
- otherwise resolve semantic/text-safe fallback;
- keep gameplay identity and availability unchanged.

If static media is also missing:
- text-safe terminal is acceptable provided the authored scene remains understandable.

If an override is invalid or stale:
- reject it before persistence;
- keep the last known-good fallback mapping active.

## Save/reload acceptance

No poverty presentation state may persist:
- frame index;
- elapsed media time;
- playback timestamp;
- loop count;
- animation-complete flag.

Persisted gameplay identity remains the source of truth.

## Release condition

A poverty/Secret Debt presentation surface is acceptable when:
1. semantic identity is gameplay-owned;
2. missing GIF is non-fatal;
3. static/text fallback is usable;
4. animations-off leaves mechanics unchanged;
5. save/reload is media-timing independent;
6. media reuse never merges distinct event/lodging identities.
