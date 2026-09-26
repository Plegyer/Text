# Presentation Save Boundary Audit v1

Status: Chat 2 continuation audit of the current `chat2/presentation-boundary-next` codebase.

## Scope

This audit covers only the persisted presentation identity field at:

`run.flow.pendingScene.presentationId`

It does not change runtime, save schema, gameplay content, or presentation resolution.

## Current semantic contract

Canonical production presentation IDs use slash-separated semantic taxonomy, for example:

`job/lumber/event/lumber-career-first-shift/default`

The identity describes the scene slot, not an asset filename, GIF path, animation frame, or gameplay event identity.

## Current persisted schema behavior

The current save schema defines the generic gameplay `id` validator as:

`^[a-z][a-z0-9_.-]{1,79}$`

That validator allows lowercase letters, digits, underscore, dot, and hyphen after the first character. It does **not** allow `/`.

`pendingSceneSchema` currently declares:

`presentationId: id.optional()`

Therefore a canonical slash presentation ID is structurally incompatible with the current persisted `pendingScene.presentationId` field.

Concrete result:

- `job/lumber/event/lumber-career-first-shift/default` is rejected by `saveSchema`;
- an id-shaped legacy value such as `job.lumber.event.lumber-career-first-shift.default` passes this specific schema boundary;
- this is a persistence-schema mismatch, not a presentation resolver failure.

## Save/reload behavior

`parseSave()` ultimately executes `saveSchema.parse(raw)` before its later catalog-level pending-scene checks.

As a result, a schema-v4 save containing a slash semantic value at `run.flow.pendingScene.presentationId` fails during reload before the later check that verifies `eventId` and `variantId` against the catalog.

Current behavior is therefore:

**slash semantic presentationId: rejected on reload**

The focused test added with this audit asserts the exact failing path and also proves that an otherwise equivalent id-shaped presentation value can survive schema parsing/reload.

## Event and variant identity

Presentation identity must remain orthogonal to mechanical pending-scene identity.

The persisted mechanical identity remains:

- `eventId`
- `variantId`

The audit test constructs one valid catalog event/variant snapshot, round-trips it with an accepted id-shaped presentation value, and verifies that `eventId` and `variantId` are unchanged.

A future fix for semantic presentation persistence must not rewrite either field.

## Media and animation state persistence

`pendingSceneSchema` contains only:

- `eventId`
- `variantId`
- optional `presentationId`
- optional `reactionEpochId`
- optional `allowedChoiceIds`

It contains no GIF source, asset bytes, filename, frame index, playback timestamp, loop count, duration, or animation elapsed time.

The focused audit test explicitly verifies that presentation playback data is absent from the persisted pending-scene object.

This is the correct separation: reloading a scene may restart presentation playback, while mechanical event/variant identity remains fixed.

## Exact blocking seam

The primary blocking seam is in `src/core/schema.ts`:

1. generic `id` is defined with a regex that excludes slash;
2. `pendingSceneSchema.presentationId` reuses that generic gameplay `id`;
3. `saveSchema` includes `run.flow.pendingScene`;
4. `parseSave()` in `src/core/engine.ts` calls `saveSchema.parse(raw)`.

Therefore canonical slash IDs cannot currently cross the save boundary.

A future implementation should use a dedicated presentation-ID validator for this field rather than weakening the generic gameplay `id` validator. This audit intentionally does not apply that change.

## Secondary runtime observation

On this branch, the event resolver's pending-scene construction currently persists `eventId`, `variantId`, `reactionEpochId`, and `allowedChoiceIds`; it does not itself assign `presentationId` in that construction path.

That is a separate production/wiring seam from the schema rejection documented above. Even when a caller supplies a semantic `presentationId`, the current save schema still rejects slash taxonomy.

## Audit conclusion

Current persisted behavior is internally consistent but incompatible with the locked semantic presentation taxonomy.

- Semantic slash taxonomy: required by presentation contract.
- Current persisted presentation field: generic gameplay `id`.
- Slash save/reload: rejected.
- Mechanical event/variant identity: preserved when the pending scene otherwise validates.
- GIF source/timing/frame state: not persisted.

No schema or runtime change is made by this audit.
