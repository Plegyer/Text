# Presentation Operator Smoke v2

Representative slot:

`job/lumber/shift/spring/default`

This smoke exercises the operator-facing replacement lifecycle without editing repository source paths.

## 1. Import

Choose a GIF through the operator/import surface and attach it to the exact semantic `presentationId`.

The operator does **not** type or edit:

- repository paths;
- gameplay IDs;
- source code;
- event/course/ending identity.

## 2. Validate

Preflight must confirm:

- the semantic slot exists;
- media kind is GIF;
- imported media reference is managed/portable;
- alt text is non-empty;
- static fallback remains valid;
- payload contains no mechanics/save progression state.

Validation failure leaves the active override set unchanged.

## 3. Preview

Preview the replacement in the same semantic slot.

Preview must not:

- spend Energy or money;
- apply event effects;
- advance School/Activity/ending state;
- commit save state.

## 4. Persist

Persist atomically as presentation override metadata only.

The semantic identity remains:

`job/lumber/shift/spring/default`.

## 5. Reload

Reload and reopen the semantic slot.

Expected:

- same presentationId;
- same gameplay identity;
- no replayed action effects;
- no frame/time/playback state restored.

## 6. Animations off

Disable animations.

Expected:

- GIF is not required;
- shipped static Lumber fallback is used;
- semantic presentationId stays unchanged;
- gameplay controls stay unchanged.

## 7. Rollback

Remove the override for the exact semantic slot.

Expected:

- shipped fallback becomes active again;
- no orphan override remains;
- gameplay/save state is untouched.

## Pass condition

All seven steps complete without source-path editing and without changing gameplay identity.
