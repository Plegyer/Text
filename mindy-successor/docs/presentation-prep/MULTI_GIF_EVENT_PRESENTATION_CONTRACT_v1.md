# Multi-GIF Event Presentation Contract v1

Purpose: define how one authored gameplay/content event may own a pool of **3–5 visual variants** without turning media selection into gameplay.

## 1. One gameplay/content identity

A media pool belongs to one already-authored gameplay/content identity.

Examples of gameplay owners:
- one repeatable career shift;
- one event + gameplay variant;
- one School lesson surface;
- one poverty event;
- one Activity result;
- one ending.

The pool must not create:
- extra gameplay event IDs;
- extra choices;
- extra effects;
- extra eligibility rules.

## 2. One semantic presentationId

A visual pool is addressed by one semantic `presentationId`.

Example:

`job/lumber/shift/spring/default`

may own several visual candidates while remaining exactly one semantic presentation surface.

Media candidate filenames, reuse-group names and pool-member IDs do not become semantic presentation IDs.

## 3. Multiple media candidates under the same identity

A pool contains normally **3–5** candidate media items.

Each candidate may have:
- media reference;
- kind;
- alt/accessibility text;
- optional presentation-only weight;
- production metadata.

Candidate selection changes only what is shown.

It must not change:
- gameplay effects;
- choices;
- event outcome;
- action cost;
- eligibility;
- save progression;
- result identity.

## 4. Media-pool selection is not gameplay variant selection

These two concepts are distinct.

### Gameplay event variant selection

Selects authored gameplay/content meaning.

It may legitimately change:
- text;
- choices;
- effects;
- eligibility;
- event outcome.

Its identity belongs to gameplay state, for example:
`eventId + variantId`.

### Media-pool selection

Selects one visual representation of the already-selected gameplay/content identity.

It must not change any gameplay behavior.

A media candidate is never a substitute for `variantId`.

## 5. Selection between occurrences

A presentation pool may select different visual candidates on separate occurrences of the same semantic scene.

Allowed policies include:
- deterministic rotation;
- presentation-only random selection;
- weighted presentation-only selection;
- reusable candidate preference.

The policy is presentation metadata only.

Gameplay RNG must not be consumed merely to choose a GIF unless Product explicitly provides a separate presentation RNG contract.

## 6. Materialized/pending scene reload

If the current architecture persists a chosen presentation instance for an already materialized/pending scene, reload must preserve that chosen visual candidate.

It must not silently reroll while the same pending gameplay scene remains active.

If current architecture persists only semantic `presentationId` and does **not** persist a chosen media candidate, then the implementation must choose one of two explicit policies before pool rollout:

1. **stable materialization policy** — persist a presentation-only candidate key for the pending instance; or
2. **rerender-safe policy** — selection is deterministic from already-persisted non-media scene identity without changing gameplay RNG/state.

Do not accidentally reroll due to reload timing.

## 7. Completed/non-pending occurrences

For a new occurrence of the same semantic ID, another pool candidate may be selected.

That variation remains visual-only.

No candidate may represent a different mechanical result unless that result already has a different authored gameplay/content identity.

## 8. Animation-off behavior

When animations are disabled:
- the semantic presentationId remains unchanged;
- GIF candidates are skipped;
- approved static fallback remains available;
- semantic fallback may continue;
- text remains sufficient;
- gameplay controls/choices/effects remain unchanged.

A pool is optional presentation enhancement.

## 9. Missing one GIF

If one GIF candidate is unavailable:
- skip that candidate;
- try remaining valid candidates;
- then static fallback;
- then semantic/text-safe fallback.

One broken file must not invalidate:
- the semantic slot;
- the event;
- the action;
- the result.

## 10. Missing all GIFs

If every animated candidate is unavailable:
- resolve static fallback;
- otherwise semantic fallback;
- otherwise text-safe terminal.

Gameplay remains playable.

## 11. Invalid candidate

Reject an invalid candidate before active persistence when it has:
- unsupported kind;
- invalid managed path;
- stale semantic target;
- missing required alt text;
- unsafe external reference.

If batch policy is atomic, reject the package.

If row/candidate isolation is supported, reject only the invalid media candidate while keeping known-good mappings.

The policy must be explicit.

## 12. Pool ordering / weighting

### Ordered pool
May be used for deterministic rotation or author-controlled preference.

### Unordered pool
May be used when every candidate is equally suitable.

### Optional weights
Weights are allowed only when explicitly presentation-only.

Weights must not:
- alter event chance;
- consume gameplay RNG;
- encode mechanics;
- alter save eligibility.

## 13. Accessibility

Each candidate has context-correct alt/accessibility text.

A candidate may reuse the same visual file across semantic IDs, but each mapping may require different accessible meaning.

Essential gameplay meaning must not depend on which GIF was selected.

## 14. Save boundaries

Media pools must never store:
- GIF frame index;
- playback timestamp;
- loop count;
- animation completion state.

If candidate-instance stability is implemented, only a small presentation-only candidate identifier/index may be persisted for the materialized scene, and only if architecture/product explicitly adopts that policy.

That value must not drive gameplay.

## 15. Replacement / rollback

Replacement targets the semantic presentation slot and media pool membership.

Rollback may:
- remove one candidate;
- restore previous candidate set;
- restore shipped static-only behavior.

Rollback must not:
- rename the semantic ID;
- change gameplay event identity;
- replay effects;
- alter pending choices.

## 16. Current runtime relationship

Current presentation primitives already support:
- semantic presentation slots;
- multiple catalog media candidates when a slot owns multiple base media IDs;
- animation filtering;
- static/semantic fallback;
- media candidate de-duplication.

Current override schema is centered on:
- one optional GIF `primary`;
- one optional static fallback;
- one optional semantic fallback.

Therefore a deliberate 3–5 candidate override/import pool needs an explicit presentation-only extension rather than overloading gameplay event variants.

## Acceptance invariants

A multi-GIF pool is acceptable only when:

1. one gameplay/content identity remains authoritative;
2. one semantic presentationId remains authoritative;
3. 3–5 candidates are presentation-only;
4. candidate selection never changes choices/effects/timing/eligibility;
5. pending reload does not accidentally reroll a materialized scene;
6. animations-off remains safe;
7. one missing GIF falls through safely;
8. all missing GIFs still preserve static/text fallback;
9. save data contains no GIF frame/time state;
10. media-pool selection is explicitly distinct from gameplay variant selection.
