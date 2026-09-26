# Presentation Override Rollback Contract v1

Status: presentation-only rollback contract. No editor/runtime implementation is added here.

## Goal

A bad or unwanted presentation override must be removable without changing gameplay identity or damaging the shipped fallback path.

Rollback operates on the override layer keyed by semantic `presentationId`.

It does **not** roll back:

- event/course/activity/ending gameplay state;
- progression;
- Energy, money, inventory or stats;
- RNG;
- save schema versions;
- semantic gameplay IDs.

## Safe rollback transaction

For one semantic slot:

1. identify the exact canonical `presentationId`;
2. verify the active override belongs to that exact slot;
3. remove the override entry from the staged presentation override set;
4. preflight the remaining override set;
5. atomically persist the new override set;
6. resolve the semantic slot again;
7. confirm the shipped static/text fallback becomes active;
8. reload and verify gameplay identity is unchanged.

If remaining override preflight fails, persistence must not change.

## Shipped fallback restoration

Removing an override never removes the base catalog slot.

After rollback the resolver must use the original shipped presentation chain, for example:

- Lumber -> shipped Lumber static asset;
- School -> shipped School static asset;
- Forest -> shipped Forest static asset;
- ending -> semantic town fallback -> shipped town static asset.

The semantic `presentationId` remains the same before and after rollback.

## Orphan behavior

Unknown/stale override entries are inactive.

Rollback or import cleanup must not leave an orphan entry active under a guessed replacement ID.

No dotted-to-slash, underscore-to-kebab, renamed route, or similar-looking-ID guessing is allowed during rollback.

## Save/gameplay boundary

Rollback changes presentation override metadata only.

A save that references gameplay/event/course/activity/ending identity must remain valid regardless of whether an override exists.

No animation frame/time/playback state is migrated or restored.

## Deterministic import/export

After removal:

- remaining override keys export in canonical lexical order;
- duplicate keys remain invalid;
- import/export round trip preserves the exact remaining semantic keys;
- removing one slot cannot reorder the semantic meaning of another slot.

## Acceptance

Rollback passes when:

1. a valid override can be removed;
2. the original shipped fallback resolves again;
3. gameplay/save state is byte-equivalent before/after the presentation rollback operation;
4. stale/orphan entries are not activated;
5. export remains deterministic.
