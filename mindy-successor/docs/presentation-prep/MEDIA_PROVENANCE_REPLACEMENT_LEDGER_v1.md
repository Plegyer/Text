# Media Provenance and Replacement Ledger v1

Purpose: define the mandatory per-asset production record used when real GIF/static media enters the repository.

This ledger does **not** infer provenance, ownership or permission. Unknown information stays explicitly unknown until a human/source record supplies it.

## One row per physical asset

A physical media file receives one asset record even when it is reused by multiple semantic presentation IDs.

Required fields:

| Field | Required | Meaning |
| --- | --- | --- |
| `assetPath` | YES | Canonical prototype-relative source path under `assets/`. |
| `mediaKind` | YES | `gif`, `svg`, `png`, `jpg/jpeg`, or `webp`. |
| `sha256` | YES for production acceptance | SHA-256 checksum of the exact repository bytes being approved. |
| `sourceType` | YES | e.g. internally produced, commissioned, licensed third-party, public-domain/CC source, or `UNKNOWN_PENDING_REVIEW`. |
| `creatorOrSource` | YES | Human/organization/source reference, or `UNKNOWN_PENDING_REVIEW` until established. |
| `sourceReference` | when available | Production ticket, commission record, source URL/reference, generator/export record, or other traceable source evidence. |
| `licensePermissionNote` | YES | Exact permission/license note or `UNKNOWN_PENDING_REVIEW`; unknown is not production approval. |
| `permissionVerifiedBy` | YES for production acceptance | Reviewer/person/process that verified permission. |
| `permissionVerifiedAt` | YES for production acceptance | Verification date/commit context. |
| `semanticOwners` | YES | Semantic presentation IDs that directly map to this asset. |
| `reuseOwners` | YES | Additional semantic IDs approved to reuse the same physical file. Empty array is valid. |
| `reuseRationale` | required when reused | Why visual reuse does not collapse gameplay identity or misstate context. |
| `candidateKeys` | for GIF pools | Stable locale-neutral candidate key(s) used by owning pools. |
| `ruAltKey` | YES for player-facing media | RU alt localization key. |
| `enAltKey` | YES for player-facing media | EN alt localization key. |
| `staticFallbackPath` | YES for GIF pool ownership | Real static fallback retained if animation is disabled/unavailable. |
| `replacementVersion` | YES | Presentation/media mapping version in which this asset becomes active. |
| `replacesAssetPath` | when replacement occurs | Previous physical asset, if any. |
| `rollbackTarget` | YES for replacement | Known-good prior mapping/path or explicit static fallback target. |
| `introducedCommit` | YES after integration | Commit that adds the physical file. |
| `activatedCommit` | YES after activation | Commit that activates mapping/pool. May differ from introduced commit. |
| `preflightEvidence` | YES for production acceptance | Preflight command/result or CI evidence for real-file/signature checks. |
| `acceptanceEvidence` | YES for production acceptance | Animations-on/off, RU/EN, semantic/reload and exact-head CI evidence. |
| `notes` | optional | Non-authoritative production notes only. |

## Status fields

Each record should carry two independent statuses.

### Provenance status

Allowed values:
- `UNKNOWN_PENDING_REVIEW`;
- `SOURCE_RECORDED`;
- `PERMISSION_VERIFIED`;
- `REJECTED`.

A real file with `UNKNOWN_PENDING_REVIEW` may be inspected or staged, but must not be promoted to production-ready solely because it passes technical preflight.

### Activation status

Allowed values:
- `FILE_INTAKE`;
- `PREFLIGHT_GREEN`;
- `MAPPING_STAGED`;
- `PRODUCTION_ACTIVE`;
- `REPLACED`;
- `ROLLED_BACK`;
- `REJECTED`.

Provenance and activation are not interchangeable. Technical validity does not establish legal/permission validity.

## Recommended machine-readable row shape

```json
{
  "assetPath": "assets/gif/example.gif",
  "mediaKind": "gif",
  "sha256": "UNKNOWN_PENDING_FILE",
  "provenance": {
    "status": "UNKNOWN_PENDING_REVIEW",
    "sourceType": "UNKNOWN_PENDING_REVIEW",
    "creatorOrSource": "UNKNOWN_PENDING_REVIEW",
    "sourceReference": null,
    "licensePermissionNote": "UNKNOWN_PENDING_REVIEW",
    "permissionVerifiedBy": null,
    "permissionVerifiedAt": null
  },
  "semanticOwners": [
    "job/example/shift/spring/default"
  ],
  "reuseOwners": [],
  "reuseRationale": null,
  "candidateKeys": [
    "example-01"
  ],
  "localization": {
    "ruAltKey": "presentation.example.01.alt.ru",
    "enAltKey": "presentation.example.01.alt.en"
  },
  "staticFallbackPath": "assets/stage-town.svg",
  "replacementVersion": 1,
  "replacesAssetPath": null,
  "rollbackTarget": "assets/stage-town.svg",
  "introducedCommit": null,
  "activatedCommit": null,
  "provenanceStatus": "UNKNOWN_PENDING_REVIEW",
  "activationStatus": "FILE_INTAKE",
  "preflightEvidence": null,
  "acceptanceEvidence": null,
  "notes": "Template example only; not a real asset record."
}
```

The example is deliberately marked unknown. It does not assert that `assets/gif/example.gif` exists.

## Replacement rules

When replacing a physical media file or pool mapping:

1. never change the gameplay/content ID to match a filename;
2. keep the semantic `presentationId` stable unless content identity itself was separately re-authored by its owner;
3. calculate and record the checksum of the new bytes;
4. preserve the old record as history rather than overwriting provenance;
5. record the exact previous asset/mapping as `rollbackTarget`;
6. re-run signature/path preflight;
7. re-check RU+EN alt coverage;
8. re-check every semantic owner and reuse owner;
9. verify animations-off fallback independently;
10. attach exact-head CI/acceptance evidence before `PRODUCTION_ACTIVE`.

## Reuse rule

A physical GIF may have multiple semantic owners only after explicit reuse approval.

Approval must confirm:
- each gameplay/event identity remains distinct;
- the visible action is compatible with every mapped context;
- no outcome/reward/choice is visually misrepresented;
- context-specific RU/EN alt text remains correct;
- replacing one mapping later will not require renaming gameplay identity.

## Current repository state

At the item-169 baseline, the repository contains **0 real GIF files**.

Therefore there are no real GIF provenance claims to populate yet.

Existing production SVG static files can be entered into this ledger when Lead needs a full historical media provenance pass, but this item does not invent their original source/license history.
