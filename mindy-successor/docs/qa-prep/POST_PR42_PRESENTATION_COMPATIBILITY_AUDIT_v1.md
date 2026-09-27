# Post-PR42 Presentation Compatibility Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed PR42 head: 41ebf0377c5b50b2ef298009562d5ba9fde56f18
Merge SHA: 55adc69dcda4c41c71548cd146756896fa5976d0
Exact-head CI: 295/295 PASS
Post-merge main CI: run 36318839497 — 295/295 PASS

## Scope

Audit compatibility of the new multi-GIF pool extension with the presentation system that existed before PR42.

PR42 is additive:
- pool is optional;
- legacy primary/static/fallback fields remain;
- presentation schema version stays 1;
- gameplay Save schema is unchanged.

## 1. Old presentation.json parses

Legacy slot shape remains valid:
- primary GIF override;
- static image override;
- fallbackId.

New pool is optional.

Targeted PR42 test explicitly parses old primary + static shape.

Full pre-existing presentation suite remains green inside the 295/295 exact-head run.

PASS.

## 2. Existing text overrides remain compatible

PR42 does not change:
- presentation.texts structure;
- textFields mapping;
- applyPresentation text mutation rules.

Existing presentation text replacement remains separate from gameplay mechanics.

PASS.

## 3. Existing media overrides remain compatible

Legacy presentation.media record remains unchanged:
- image;
- gif;
- video.

PR42 pool lives under slot override and does not replace legacy media overrides.

Existing media validation tests remain green.

PASS.

## 4. Editor still works

Editor continues to:
- edit presentation text separately from life Save;
- select semantic presentationId;
- upload custom GIF primary;
- upload static fallback;
- preview;
- export/import presentation.json;
- reset overrides.

Existing editor/UI tests remain green in exact-head CI.

PASS.

## 5. Custom primary replacement safely replaces pool

Critical compatibility behavior in editor:

When user uploads a custom primary GIF:
- current slot is read;
- pool is explicitly removed;
- new primary is written.

This avoids invalid primary+pool coexistence and gives the legacy/custom replacement a clear result.

Classification:
SAFE_POOL_TO_PRIMARY_REPLACEMENT.

PASS.

## 6. Static fallback edit with pool

Static upload preserves current slot fields and updates static.

Therefore a pool may keep a custom static Animation-Off/failure fallback.

PASS.

## 7. Clearing primary does not destroy unrelated fields

Clear-GIF behavior removes primary while retaining:
- static;
- pool if one exists;
- fallbackId.

This is backward-compatible for existing primary workflows.

PASS.

## 8. Catalog GIF fallback

Resolver still appends base catalog GIF candidates when animations are enabled.

New pool candidates are considered before base catalog GIFs for a slot with a pool, but catalog media remain available as fallback.

PASS.

## 9. Catalog image fallback

Resolver still appends base catalog image candidates regardless of animations.

Animation Off:
- skips GIF pool;
- uses override static if present;
- still reaches catalog images/fallback slots.

PASS.

## 10. Catalog video fallback

When animations are enabled, base catalog video candidates are still appended.

PR42 does not remove video support from legacy catalog media.

PASS.

## 11. Missing presentationId safe fallback

resolvePresentation still handles unknown presentationId by:
- recording diagnostic;
- falling back to location/town/default if available;
- returning textOnly if no candidate exists.

Existing test:
unknown or media-less presentation remains non-fatal

passes in PR42 exact-head CI.

PASS.

## 12. Fallback chain validation

Existing fallbackId validation remains.

Cycle detection remains in validateSlotOverrides.

Existing tests for:
- unknown presentation target;
- fallback cycles

remain green.

PASS.

## 13. Duplicate media suppression

Resolved candidate list is still deduplicated by:
kind + src.

This applies across:
- selected pool candidate;
- remaining pool candidates;
- static;
- catalog;
- fallback slot chain.

Meaning:
same actual asset reused through two sources will not render twice in the final candidate sequence.

PASS.

## 14. Candidate order and failure behavior

For pool-enabled slot:
1. deterministic selected pool candidate;
2. remaining pool candidates;
3. static override if configured;
4. catalog GIF/image/video according to animation mode;
5. semantic fallback slot candidates.

UI still advances mediaIndex on media load error.

No gameplay action is dispatched by media failure.

PASS.

## 15. Animation Off

With animations disabled:
- override pool omitted;
- primary omitted;
- override static used;
- catalog images remain;
- fallback chain remains.

Targeted PR42 test explicitly verifies pool absence and static selection.

PASS.

## 16. Import compatibility

presentationSchema remains version 1 and accepts legacy shape.

Editor import still:
- parses presentation JSON;
- applyPresentation validates it;
- commits presentation patch separately from life Save.

A new invalid primary+pool combination is rejected rather than ambiguously interpreted.

PASS.

## 17. Save compatibility

PR42 modifies no Save schema/engine migration.

Presentation patch remains stored separately:
portal-life.presentation.v1

Life Save remains:
portal-life.v1

UI multi-GIF smoke verifies locale switch/reload does not touch life Save.

PASS.

## 18. Localization compatibility

PR41 locale runtime and PR42 media runtime remain separate.

Locale:
- changes translated text;
- is not in pool seed;
- does not change presentationId;
- does not change selected candidate for the same occurrence.

Latest UI smoke passes.

PASS.

## 19. Compatibility caveats

The current editor can:
- replace a pool with one custom primary GIF;
- set static fallback.

It does not yet provide a full UI authoring experience for editing all 3–5 pool candidates individually.

This is an editor feature gap, not backward-compatibility break.

Classification:
EDITOR_POOL_AUTHORING_UI_OPEN.

## Final audit

Old presentation.json parse:
PASS.

Old text overrides:
PASS.

Old media overrides:
PASS.

Editor:
PASS.

Custom primary replaces pool safely:
PASS.

Catalog GIF/image/video fallback:
PASS.

Unknown presentationId safe fallback:
PASS.

Animation Off:
PASS.

Save separation:
PASS.

Locale compatibility:
PASS.

Full pool authoring UI:
OPEN FEATURE DEPTH.

Exact-head CI:
295/295 PASS.

Post-merge main CI:
295/295 PASS.

Merge status:
MERGED / COMPATIBILITY GREEN.

No Chat 4 production runtime/UI/content file was modified.
