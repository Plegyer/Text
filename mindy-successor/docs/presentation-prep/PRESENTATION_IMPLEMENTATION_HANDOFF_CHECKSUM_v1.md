# Presentation Implementation Handoff Checksum v1

Purpose: detect drift between approved content authoring and later media implementation.

This is a deterministic checklist/checksum-style handoff summary. It does not replace source-control history or content authority.

## Canonical handoff record

For each authored presentation surface, record exactly:

```text
sourceContentId
presentationId
mediaClass
primaryMediaRef
staticFallbackRef
semanticFallbackId
textFallbackClass
reuseGroup
replacementPackageVersion
unresolvedAssetClass
saveIdentityOwner
```

Do not include gameplay-state values.

## Canonical field rules

### sourceContentId
Exact approved gameplay/content identity.

### presentationId
Exact canonical semantic slash ID.

### mediaClass
One of:
- `GIF_PRIMARY`
- `STATIC_PRIMARY`
- `REUSE_EXISTING`
- `TEXT_ONLY_SAFE`
- `MEDIA_PENDING`

### primaryMediaRef
Managed media reference or `NONE`.

### staticFallbackRef
Managed static reference or `NONE`.

### semanticFallbackId
Canonical semantic fallback ID or `NONE`.

### textFallbackClass
One of:
- `REQUIRED`
- `AVAILABLE`
- `NOT_REQUIRED_WITH_REASON`

Do not checksum long authored prose directly unless the content pipeline explicitly version-controls that prose as part of the handoff.

### reuseGroup
Stable production-only reuse key or `NONE`.

### replacementPackageVersion
Exact package/version identifier or `NONE`.

### unresolvedAssetClass
One of:
- `NONE`
- `OPTIONAL_GIF`
- `OPTIONAL_STATIC_POLISH`
- `CONTENT_FIRST_THEN_ASSET`
- `PRODUCT_DECISION_PENDING`

### saveIdentityOwner
Gameplay-owned identity source:
- `lastAction`
- `pendingScene`
- `NightFlow`
- `Activity`
- `endingState`
- `RunResult`
- `NewRunLocation`
- another explicitly approved gameplay owner.

## Explicitly excluded fields

Never include:
- Energy;
- money;
- stats;
- inventory;
- capabilities;
- RNG state;
- route availability;
- event conditions/effects;
- ending eligibility;
- frame index;
- elapsed animation time;
- playback timestamp;
- loop count;
- transient preview state.

A handoff containing gameplay-state fields fails immediately.

## Deterministic ordering

Sort records by:
1. `presentationId`;
2. then `sourceContentId`.

For every record, serialize fields in this exact order:

```text
sourceContentId=<value>
presentationId=<value>
mediaClass=<value>
primaryMediaRef=<value>
staticFallbackRef=<value>
semanticFallbackId=<value>
textFallbackClass=<value>
reuseGroup=<value>
replacementPackageVersion=<value>
unresolvedAssetClass=<value>
saveIdentityOwner=<value>
```

Separate records with one blank line.

Use UTF-8 and LF line endings.

## Checksum recipe

Recommended digest:

`SHA-256(canonical UTF-8 handoff text)`

Record:

```text
handoffVersion=<version>
recordCount=<N>
sha256=<digest>
sourceAuthority=<commit/doc/package>
```

The checksum detects:
- added/removed semantic surfaces;
- silent presentationId rename;
- changed media mapping;
- changed fallback class;
- changed reuse group;
- changed replacement package version;
- changed unresolved-asset classification;
- changed save identity owner.

## Unresolved asset handling

Unresolved assets must still have deterministic records.

Example classes:
- optional GIF not yet produced;
- content-first route visual;
- Product-decision-dependent teacher visual.

Do not omit an authored semantic surface merely because its asset is not final.

## Reuse-group drift

If one media file is reused by multiple semantic IDs, each semantic ID gets its own checksum record.

This preserves semantic coverage even when:
- `primaryMediaRef` is identical;
- `reuseGroup` is identical.

Changing a reuse group should change the checksum because production replacement scope may have changed.

## Replacement package drift

When an external replacement/import package is versioned, include its exact package version.

Changing:
- package schema;
- manifest version;
- canonical export format

must update `replacementPackageVersion` and therefore the handoff checksum.

## Comparison procedure

Before media implementation:

1. generate canonical handoff summary;
2. record checksum;
3. implement/import media;
4. regenerate summary from implementation mappings;
5. compare record count and checksum.

If checksums differ:
- produce a field-level diff;
- identify whether content authority changed;
- reject accidental drift;
- accept only changes with explicit updated approval.

## Allowed post-handoff changes

A checksum change is acceptable when driven by approved:
- new authored content;
- semantic ID correction;
- media mapping approval;
- fallback change;
- reuse-group change;
- replacement package version change;
- unresolved asset resolution.

It is not acceptable when caused by:
- filename-based implicit remap;
- stale content;
- accidental semantic-ID rename;
- gameplay-state serialization.

## Minimal checksum summary table

| presentationId | sourceContentId | mediaClass | fallbackClass | reuseGroup | unresolvedAssetClass | packageVersion | saveOwner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| <id> | <source> | <class> | <class> | <group> | <class> | <version> | <owner> |

## Acceptance

A presentation implementation handoff passes checksum validation when:
1. all authored semantic surfaces are present;
2. ordering is canonical;
3. media/fallback/reuse metadata matches approval;
4. unresolved assets are explicit;
5. replacement package version is explicit;
6. no gameplay-state fields are present;
7. recorded SHA-256 matches the canonical summary.
