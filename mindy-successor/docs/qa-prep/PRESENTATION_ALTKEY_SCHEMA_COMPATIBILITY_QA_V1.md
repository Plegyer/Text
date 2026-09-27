# Presentation altKey schema compatibility QA v1

Status: COMPLETE / GREEN_BACKWARD_COMPATIBLE

Reviewed Lead head:
`5ea2a18e214fca6d656a8751ff5c2dd1f4abce31`

## Schema shape

Lead adds optional `altKey` to:
- static slot override;
- GIF primary override;
- GIF pool candidate;
- resolved presentation media.

The field is optional and validated as a locale-neutral localization key.

Existing embedded `alt` remains required and remains the fallback.

Legacy root `media` overrides keep their previous schema unchanged.

## Backward compatibility

Old slot overrides without `altKey` still parse.

Lead regression explicitly parses a legacy static override:
- existing asset path;
- embedded `alt`;
- no `altKey`.

Therefore older custom presentation JSON is not forced to add localization keys.

## Editor/custom override compatibility

Current editor code does not depend on `altKey` and was not changed by Lead.

Because the new field is optional:
- existing editor-generated/custom slot overrides remain valid;
- existing imported presentation JSON without `altKey` remains valid;
- root `media` override shape remains unchanged.

No migration is required.

## Locale-neutral identity

`altKey` affects only resolved accessibility text.

It does not alter:
- presentationId;
- asset src;
- pool candidate key;
- mediaId;
- occurrence key;
- Save;
- gameplay identity.

Renderer behavior:
- if `altKey` exists, resolve localized text;
- otherwise use catalog/media fallback path;
- embedded `alt` remains fallback text.

## GIF deterministic-selection protection

Pool selection seed remains based on:
`presentationId | occurrenceKey | poolVersion`.

`altKey` is not part of the selection seed.

Lead regression creates a 3-candidate GIF pool with altKey values and resolves the same occurrence twice, requiring:
- same selected candidateKey;
- same selected altKey.

Thus adding localization metadata does not reroll GIF selection.

## Save / gameplay RNG

No `altKey` field is added to Save/schema/gameplay state.

No gameplay RNG call is introduced.

The field exists only inside presentation configuration/resolution.

## Verdict

`GREEN_BACKWARD_COMPATIBLE`.

Optional altKey is a presentation-only additive schema extension. Existing overrides remain valid, locale does not alter asset/candidate identity, and GIF deterministic selection is unchanged.
