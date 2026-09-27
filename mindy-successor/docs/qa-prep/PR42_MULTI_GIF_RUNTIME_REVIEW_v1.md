# PR42 Multi-GIF Runtime Review v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
PR: #42 — Lead: add deterministic multi-GIF presentation pools
Reviewed head: 41ebf0377c5b50b2ef298009562d5ba9fde56f18
Base: 974d6e077ffc511e304a64aef32f2aab81167f41

## Final disposition

GREEN on the reviewed exact head.

PR status at review time:
OPEN / NOT MERGED.

Exact-head CI:
- run 36318743007
- 295 tests
- 295 pass
- 0 fail
- validation: 16 packs, 43 events, 35 actions, 9 endings

## Rerun history

Earlier PR42 attempts were red for test-only issues:
- initial multi-GIF test helper typing failed TypeScript;
- after typing fix, UI smoke raced against presentation initialization and saw an empty candidate key.

Latest head fixes the UI smoke to inspect the intended town presentation slot after the app is ready.

Final head:
295/295 PASS.

## Pool bounds 3..5

Schema requires:
- candidates min 3;
- max 5.

Tests verify:
- 3 accepted;
- 5 accepted;
- 2 rejected;
- 6 rejected.

PASS.

## Stable unique candidate keys

Each pool candidate requires:
- key;
- GIF kind;
- GIF source;
- alt text;
- optional positive finite weight.

Candidate key schema is stable/locale-neutral.

Pool validation rejects duplicate candidate keys.

PASS.

## Primary + pool ambiguity

Slot schema permits:
- legacy primary;
- new pool;
- static;
- fallbackId.

But validation rejects a slot defining both primary and pool.

This avoids ambiguous precedence.

PASS.

## Deterministic selection

selectPresentationPoolIndex uses a stable hash of:
- presentationId;
- occurrenceKey, falling back to presentationId;
- poolVersion.

Unweighted selection:
hash modulo candidate count.

Weighted selection:
deterministic ticket derived from the same stable hash.

No random API is used.

PASS.

## No gameplay RNG consumption

The selector is a pure presentation helper.

It:
- does not import engine RNG;
- does not mutate Save;
- does not dispatch gameplay;
- hashes strings only.

PR42 changed no engine RNG file.

PASS.

## Occurrence-key plumbing

UI derives occurrence keys from current persisted gameplay owners.

Pending event:
- run ID;
- event ID;
- variant ID;
- reaction epoch.

Ending:
- run ID;
- result transaction/committed ending;
- presentation ID.

Activity:
- run ID;
- activity ID;
- started day;
- checkpoint;
- steps;
- route.

Night:
- run ID;
- started day;
- phase;
- selected Night choice;
- selected lodging.

Action/result:
- run ID;
- action ID;
- action count;
- presentation ID.

Town/default:
- run ID;
- elapsed day;
- presentation ID.

Locale is not part of occurrence key.

PASS.

## No Save migration

Changed files:
- presentation.ts
- app.ts
- editor.ts
- presentation-multi-gif-runtime.test.ts
- ui.test.ts

No:
- engine.ts;
- schema.ts;
- Save migration file.

No media candidate key/frame/time is added to authoritative life Save.

PASS.

## Reload stability

Final UI smoke:
- applies a 3-GIF pool to location/town/default;
- waits for actual town presentation slot;
- captures selected candidate key;
- switches locale;
- verifies same candidate;
- preserves life Save;
- reloads app;
- returns to town slot;
- verifies same candidate again.

PASS on final exact head.

## RU <-> EN switch stability

Candidate selector seed contains no locale.

Final UI test verifies locale switch keeps the selected candidate key.

Life Save remains unchanged.

PASS.

## Animation Off

Runtime resolver:
- excludes pool GIFs when animations are disabled;
- uses static override;
- preserves fallback chain.

Targeted test verifies static becomes selected and pool candidates disappear.

PASS.

## Old primary/static override compatibility

Schema keeps old primary/static/fallback fields optional.

Targeted test verifies old primary + static shape still parses.

Existing presentation suite remains green in full 295-test run.

PASS.

## Editor compatibility behavior

When a user chooses a custom primary GIF in the existing editor:
- editor removes any current pool from that slot;
- writes the new primary.

This makes custom primary replacement explicit rather than leaving primary+pool ambiguity.

Static fallback editing remains supported.

PASS.

## Media error fallback

UI continues to use:
mediaIndex

and advances index on image/video onerror.

Pool resolver orders:
- deterministic selected pool candidate first;
- remaining pool candidates;
- static;
- catalog/fallback candidates.

A failed selected GIF can therefore fall through without gameplay mutation.

PASS by unchanged UI failure pattern plus new candidate ordering.

## Semantic identity

Pool candidate key is metadata inside a semantic presentation slot.

Gameplay presentationId remains the owner.

No gameplay event/action/ending ID is duplicated for candidates.

PASS.

## Current limitations

PR42 provides runtime mechanics, not final media assets.

Still separate:
- real 3–5 GIF asset production;
- RU+EN alt/caption migration for final pools;
- adoption manifests per career/School/poverty/Forest;
- post-merge main CI after Lead merges PR42.

## Final matrix

- pool 3..5: PASS
- unique keys: PASS
- primary+pool rejected: PASS
- deterministic selector: PASS
- no gameplay RNG: PASS
- occurrence key stable: PASS
- no Save migration: PASS
- reload candidate stability: PASS
- RU/EN switch candidate stability: PASS
- Animation Off static fallback: PASS
- old overrides compatible: PASS
- exact-head CI: 295/295 PASS
- merged: NO at review time

Final:
GREEN.

No Chat 4 production runtime/UI/content file was modified.
