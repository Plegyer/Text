# Presentation Stale / Dead Binding Regression v4

Status: C2-95 COMPLETE
Owner: Chat 2 / Presentation & Media

The v4 regression gates four stale/dead failure classes.

## Production registry rows

Allowed production slot IDs absent from the live semantic registry: **0**.

Allowed production local sources missing from the repository: **0**.

## Selected source manifests

Selected presentation manifests checked: **8**.

Allowed manifest `presentationId` rows absent from the live registry: **0**.

Allowed referenced local source/frame paths missing from the repository: **0**.

## Fallback graph

Unknown fallback targets are rejected.

Fallback cycles are rejected.

An unknown requested semantic ID is not treated as a live binding; resolver diagnostics explicitly route it to the existing safe town fallback.

No stale binding is repaired by inventing gameplay identity.
