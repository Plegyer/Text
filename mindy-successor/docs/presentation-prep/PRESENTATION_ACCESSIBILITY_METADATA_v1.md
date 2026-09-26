# Presentation Accessibility Metadata v1

Status: non-mechanical metadata contract for shipped and replacement presentation media.

## Purpose

Presentation media must remain understandable when animation is unavailable, paused, reduced, missing, or not perceivable. Accessibility metadata is presentation-only and must never affect gameplay state, RNG, Energy, conditions, effects, eligibility, rewards, or save identity.

## Required metadata per semantic slot

Every shipped presentation slot must provide:

- a stable semantic `presentationId`;
- a human-readable semantic slot label;
- human-readable alt text for every concrete media candidate;
- a text fallback that communicates the scene meaning without depending on the media;
- a non-animated safe candidate or text-safe terminal fallback;
- no essential information conveyed only through animation timing, loop timing, frame order, flashing cadence, or transient motion.

## Alt text

Alt text must:

- describe the scene/context, not the filename;
- be non-empty human-readable text;
- not repeat a raw media path as its description;
- not encode gameplay mechanics that are unavailable elsewhere;
- remain valid whether animation is enabled or disabled.

Examples of acceptable current static alt text include descriptive stage labels such as Lumber, School, Forest, and Town stage context.

## Text fallback

Each semantic slot needs text that can stand on its own if no media resolves.

Text fallback must preserve the narrative/context meaning needed to understand what is being presented, but it must not become a hidden mechanics channel.

## Semantic slot label

A slot label is a human-facing description of the semantic presentation role, for example:

- Lumber shift — spring;
- School lesson — Arcana;
- Foreman Night — professional route;
- Forest Activity — return success;
- Ending — Lumber Hard Work.

The label is metadata. The canonical identity remains `presentationId`.

## Animation independence

No required information may exist exclusively in:

- a particular animation frame;
- animation duration;
- timing between frames;
- loop count;
- playback timestamp;
- frame order;
- motion speed.

With animations disabled, the player must still receive the same semantic scene identity and text meaning, with a static or text-safe presentation.

## Representative audit set

The companion test audits representative slots from:

- Lumber shift/result;
- School lesson;
- Foreman Night;
- Forest Activity;
- Lumber ending.

The audit cross-checks shipped stage alt text and the existing production patch-plan text fallback.

## Non-mechanical boundary

Accessibility metadata may change text/description/media labeling only. It cannot change:

- event/course/activity/ending IDs;
- gameplay conditions or effects;
- money or Energy;
- progression state;
- RNG;
- ending eligibility/commitment;
- save/reload identity.

## Acceptance

A representative slot passes when:

1. `presentationId` is semantic and slash-based;
2. slot label is non-empty and human-readable;
3. concrete media alt text is non-empty and not a raw path;
4. text fallback is non-empty;
5. a static/text-safe path remains available with animations disabled;
6. no timing/frame field is required to interpret the slot.
