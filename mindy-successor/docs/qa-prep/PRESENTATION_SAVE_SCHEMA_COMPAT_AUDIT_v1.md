# Presentation Save-Schema Compatibility Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/activation-gate-next`  
Current-main baseline reviewed: `9e0be0a33402166d72f125b74c29fd345e74c6fd`

## Result

**FAILED — explicit canonical semantic `pendingScene.presentationId` is not save-schema compatible.**

The runtime has two different validators for the same conceptual identifier family:

- persisted pending-scene field uses the generic gameplay `id` schema, which rejects slash characters;
- presentation runtime uses a semantic presentation-ID schema that explicitly allows slash-separated IDs.

Therefore a pending scene carrying the canonical semantic ID required by the Phase B presentation contract cannot currently survive `parseSave`.

The present runtime often avoids the failure only because Resolver-created pending scenes do **not** populate `presentationId`; UI derives it again from saved `eventId + variantId`. That is a deterministic fallback, but it is not proof that the persisted presentation seam works.

## 1. Exact persisted field

File:

`prior-work/astra/prototype-m3.2/src/core/schema.ts`

Field:

`run.flow.pendingScene.presentationId`

Current schema:

```ts
const pendingSceneSchema=z.object({
  eventId:id,
  variantId:id,
  presentationId:id.optional(),
  reactionEpochId:id.optional(),
  allowedChoiceIds:z.array(id).max(16).optional()
}).strict();
```

The field is therefore validated by the shared generic `id` schema.

## 2. Exact regex used by the persisted field

Same file:

`src/core/schema.ts`

Generic ID validator:

```ts
const id = z.string().regex(/^[a-z][a-z0-9_.-]{1,79}$/);
```

Allowed characters after the first letter are:

- lowercase ASCII letters;
- digits;
- underscore;
- dot;
- hyphen.

**Slash is not allowed.**

That validator is suitable for gameplay IDs such as:

- `lumber.career-first-shift`;
- `ending.lumber.hard-work`;
- `lumber.foreman`.

It is not compatible with the accepted semantic presentation taxonomy.

## 3. Canonical semantic presentation-ID schema

File:

`prior-work/astra/prototype-m3.2/src/core/presentation.ts`

Presentation-specific validator:

```ts
const presentationIdSchema=z.string()
  .min(1)
  .max(240)
  .regex(/^[a-z0-9][a-z0-9/._-]*$/,'Некорректный presentationId.');
```

This validator intentionally allows `/`.

Examples produced by current presentation helpers include:

- `job/lumber/shift/spring/default`;
- `job/lumber/result/default`;
- `job/lumber/event/lumber-career-first-shift/default`;
- `relationship/lumber-foreman/lumber-foreman-notice/default`;
- `school/field-craft/lesson/default`;
- `ending/lumber/hard-work`;
- `location/town/event/<event>/<variant>`.

These are canonical slash semantic IDs and cannot satisfy the generic persisted `id` regex.

## 4. Exact save API behavior

File:

`prior-work/astra/prototype-m3.2/src/core/engine.ts`

API:

`parseSave(text, catalog, currentMeta?)`

After migration handling, the function executes:

```ts
const parsed=saveSchema.parse(raw) as unknown as Save;
```

Since `saveSchema` contains `run.flow.pendingScene -> pendingSceneSchema`, an explicit slash semantic `presentationId` is rejected by Zod before the later pending-event consistency checks can establish that the event/variant themselves are valid.

`src/core/persistence.ts` simply re-exports this `parseSave`; it does not provide a separate compatibility layer.

## 5. Minimal reproducible sequence

A minimal reproduction does not require changing mechanics or rerolling anything.

Given a catalog and a valid pending scene:

1. Reach a valid pending event normally so the save contains:
   - valid `eventId`;
   - valid `variantId`;
   - valid `reactionEpochId`;
   - valid `allowedChoiceIds`.
2. Derive the canonical semantic ID using the shipped presentation API:
   ```ts
   const semanticId =
     presentationIdForEvent(cat,pending.eventId,pending.variantId);
   ```
3. Store it in the field that the save schema explicitly exposes:
   ```ts
   state.run.flow.pendingScene!.presentationId = semanticId;
   ```
4. Serialize:
   ```ts
   const text = JSON.stringify(state);
   ```
5. Reload using the authoritative API:
   ```ts
   parseSave(text,cat);
   ```
6. The parse fails because `semanticId` contains `/` and `pendingScene.presentationId` uses the generic `id` regex.

Concrete target example:

```text
job/lumber/event/lumber-career-first-shift/default
```

This value is valid under `presentationIdSchema` and invalid under the persisted generic `id` schema.

## 6. Does a pending semantic ID survive save/reload?

### Explicit persisted semantic ID

**No.**

A canonical slash ID written to `pendingScene.presentationId` is rejected by `parseSave`.

### Current Resolver-created pending scene without explicit field

**Yes, but only indirectly.**

Current Resolver code constructs pending scenes as:

```ts
s.run.pending={
  eventId:c.event.id,
  variantId:c.variantId,
  reactionEpochId:ensureReactionEpoch(s),
  allowedChoiceIds:[...c.allowedChoiceIds]
};
```

and the optional-offer path uses the same shape without `presentationId`.

Therefore current generated saves normally omit the field.

The UI then renders:

```ts
p.presentationId ?? presentationIdForEvent(catalog,e.id,v.id)
```

so after reload it can deterministically re-derive the same semantic ID from the saved mechanical event/variant identity.

That fallback avoids rerolling and preserves current visuals when mappings are deterministic. It does **not** satisfy the stronger contract that the persisted presentation seam itself accepts and retains a semantic `presentationId`.

## 7. Compatibility implication

The current state has two different behaviors:

| Save shape | `parseSave` | Presentation after reload |
|---|---|---|
| pending scene with no `presentationId` | passes if other pending fields are valid | UI derives semantic ID from event + variant |
| pending scene with generic dot/hyphen `presentationId` | schema may pass | field survives, but it is not the accepted slash taxonomy |
| pending scene with canonical slash semantic `presentationId` | **fails** | reload cannot complete |

This matters most if presentation mapping becomes independently replaceable or migrated and the exact slot identity must be frozen at pending-scene resolution time rather than recalculated later.

## 8. Product Acceptance reload impact

Rows with a save/reload checkpoint while a scene is pending are directly affected by this seam.

### PA05 — pending career milestone

Checkpoint:

`pending-milestone`

Expected target presentation ID:

`job/lumber/event/lumber-career-first-shift/default`

If persisted explicitly, current save schema rejects it.

### PA08 — pending School → Lumber continuation

Checkpoint:

`pending-school-continuation`

Expected target semantic family:

`job/lumber/event/lumber-cross-school-management-return/default`

Once the School→Lumber wiring exists, explicit persistence of this slash ID would hit the same schema failure.

### PA12 — pending Foreman Night relationship scene

Checkpoint:

`pending-night-relationship`

Expected presentation ID:

`relationship/lumber-foreman/lumber-night-foreman-professional/default`

Explicit persistence currently fails.

### PA18 — pending post-Activity Lumber continuation

Checkpoint:

`pending-post-activity`

Expected presentation ID:

`job/lumber/event/lumber-cross-activity-forest-return/default`

Explicit persistence currently fails.

### Other PA checkpoints

Rows such as PA03/PA04 action-result reloads and PA23 committed-ending reload do not depend on `pendingScene.presentationId` specifically. They may use semantic presentation IDs through other derived paths, but this exact schema mismatch is a pending-scene problem.

## 9. Existing test evidence and missing direct proof

Current presentation tests prove:

- semantic slash IDs are produced;
- target-shaped action/ending IDs follow the taxonomy;
- fallback behavior works;
- presentation changes are mechanics-neutral.

Current pending/reload tests prove mechanical event/variant identity survives reload.

There is no direct current-main test proving:

```text
pendingScene.presentationId = canonical/slash/id
-> JSON.stringify
-> parseSave
-> exact same presentationId
```

With the current schema, such a positive test should fail.

## 10. Gate disposition

For production activation, the gate:

**“semantic presentation IDs save/reload correctly in pending scenes”**

must be considered **FAILED** on the audited main baseline.

Exact responsible seam:

- schema/type: `src/core/schema.ts -> pendingSceneSchema.presentationId`;
- conflicting semantic validator: `src/core/presentation.ts -> presentationIdSchema`;
- authoritative reload API: `src/core/engine.ts -> parseSave`;
- UI fallback masking the issue: `src/ui/app.ts -> p.presentationId ?? presentationIdForEvent(...)`.

No runtime/schema fix is made by Chat 4 in this audit.
