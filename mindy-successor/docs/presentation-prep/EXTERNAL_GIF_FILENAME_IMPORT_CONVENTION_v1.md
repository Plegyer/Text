# External GIF Filename / Import Convention v1

Purpose: define deterministic external asset naming derived from semantic presentation IDs while keeping filenames presentation-only.

A filename never becomes gameplay identity.

## 1. Canonical semantic source

Input:
`presentationId`

Example:
`job/satyr-maid/shift/spring/default`

The semantic ID is authoritative.

The filename is only a media-delivery convenience.

## 2. Canonical relative asset path

Recommended deterministic path:

`assets/presentation/<presentationId>.gif`

Example:

`job/satyr-maid/shift/spring/default`

becomes:

`assets/presentation/job/satyr-maid/shift/spring/default.gif`

Likewise:

`ending/lumber/hard-work`

becomes:

`assets/presentation/ending/lumber/hard-work.gif`

Do not flatten slashes unless the external delivery system requires it.

## 3. Flat-delivery fallback convention

When a producer can only deliver a flat directory, use:

`<presentationId with "/" replaced by "__">.gif`

Example:

`job__satyr-maid__shift__spring__default.gif`

During import, the manifest still maps back to the exact semantic ID.

Flat filenames are not canonical IDs.

## 4. Collision handling

Canonical semantic IDs must already be unique.

If two assets target the same semantic ID:
- they are competing revisions of one presentation mapping;
- do not invent filename suffixes to make both active.

Use revision metadata outside the semantic identity, for example:
- package version;
- asset revision;
- producer delivery version.

If two different semantic IDs flatten to the same filename under an external system:
- use the full double-underscore encoding;
- if the external filesystem still collides, append a short deterministic checksum of the full semantic ID to the filename only.

Example:
`<flat-name>--<8-char-sha256>.gif`

The import manifest remains authoritative.

## 5. Season/context suffixes

When the semantic ID already contains season/context, do not duplicate it.

Preferred:

`job/lumber/shift/spring/default.gif`

Avoid:

`job/lumber/shift/spring/default-spring.gif`

For a reusable media asset that intentionally serves multiple semantic IDs, use a reuse-group filename instead:

`assets/presentation/reuse/<reuseGroup>.gif`

Example:
`assets/presentation/reuse/satyr-service-loop.gif`

The import manifest maps that one asset to multiple semantic IDs.

## 6. Reusable-loop grouping

Reusable asset path:

`assets/presentation/reuse/<reuse-group>.gif`

Rules:
- reuse group is presentation metadata;
- reuse group does not replace semantic IDs;
- each semantic ID gets an explicit manifest row;
- context-specific alt text may differ per mapping;
- rollback scope must state whether the shared asset is replaced globally or per-slot.

## 7. Static companion convention

Optional static companion:

`assets/presentation/<presentationId>.webp`

or another supported static extension:
- `.svg`
- `.png`
- `.jpg`
- `.jpeg`
- `.webp`

For reusable groups:

`assets/presentation/reuse/<reuseGroup>.webp`

Existing shipped static assets do not need to be renamed merely to follow this convention.

## 8. Alt-text sidecar requirement

Every external delivery must include accessible meaning.

Recommended sidecar:

`<asset-file>.alt.txt`

Example:

`default.gif.alt.txt`

For reusable media, one file-level alt text may be insufficient.

The import manifest must allow per-semantic-ID alt text.

Therefore the sidecar is:
- a producer hint/default;
- not a substitute for context-specific manifest alt text.

## 9. Import manifest mapping

Required row:

```text
presentationId:
assetPath:
kind: gif
reuseGroup:
alt:
staticFallback:
sourceContentAuthority:
packageVersion:
```

Example:

```text
presentationId: job/satyr-maid/shift/spring/default
assetPath: assets/presentation/job/satyr-maid/shift/spring/default.gif
kind: gif
reuseGroup: satyr-service-loop
alt: <approved context-correct alt>
staticFallback: assets/stage-tavern.svg
sourceContentAuthority: PR34
packageVersion: <version>
```

## 10. Import validation

Reject:
- absolute paths;
- parent traversal;
- unsupported extension;
- unknown semantic ID;
- stale semantic ID;
- duplicate conflicting row;
- GIF mapped as static image;
- missing required alt/accessibility text.

Validate media first, persist second.

## 11. Replacement convention

Replacement targets:
`presentationId`

not:
- filename;
- source action path;
- gameplay ID guess;
- reuse group alone.

A new file revision may keep the same semantic ID.

Changing the media file must not change:
- gameplay action;
- event/variant;
- route;
- ending;
- save identity.

## 12. Rollback convention

Rollback records the previous mapping:

```text
presentationId:
previousAssetPath:
previousStaticFallback:
previousPackageVersion:
```

Removing a GIF mapping restores the shipped/static fallback.

Do not rename semantic IDs during rollback.

## 13. Starter-trio examples

### Lumber
`assets/presentation/job/lumber/shift/spring/default.gif`

### Satyr Maid
`assets/presentation/job/satyr-maid/shift/summer/default.gif`

### Undead Farm
`assets/presentation/job/undead-farm/shift/autumn/default.gif`

All remain presentation-only asset paths.

## 14. Core invariant

`semantic presentationId -> media mapping`

is the direction of authority.

Never invert it into:

`filename -> gameplay identity`.
