# Media Replacement Package Acceptance Plan v1

Purpose: define acceptance for a batch replacement/import package without changing runtime or gameplay.

The package may change media mappings only.

## 1. Package identity

Record:
- package name;
- package version;
- source/content authority;
- target semantic IDs;
- replacement scope;
- reviewer.

Acceptance:
- [ ] package version supported;
- [ ] authority current;
- [ ] target IDs canonical.

## 2. Semantic IDs unchanged

For every package row:
- semantic `presentationId` before import;
- semantic `presentationId` after import.

Required:
- IDs are identical;
- no filename-derived rename;
- no alias migration;
- no gameplay/content ID remap.

A media package that renames semantic identity is rejected.

## 3. Media mapping resolves

For every target ID:
- media kind matches file type;
- managed/portable reference resolves;
- reuse-group scope is intentional;
- alt/accessibility metadata is present;
- duplicate conflicting mappings reject.

Acceptance:
- intended media candidate becomes available;
- unrelated semantic IDs remain unchanged.

## 4. Missing asset fallback

Failure injection:
- remove or invalidate the package primary asset;
- resolve each target semantic ID.

Required:
- static fallback resolves when available;
- otherwise semantic/text-safe fallback resolves;
- gameplay identity remains unchanged;
- scene controls remain available according to gameplay state.

Missing media must be non-fatal.

## 5. Animations-off path

For animated replacements:
- disable animations;
- resolve each target slot.

Required:
- same semantic ID;
- static/semantic/text fallback is selected;
- gameplay controls unchanged;
- available actions unchanged;
- no animation-completion dependency.

## 6. Save / reload

Use representative boundaries from the package.

Verify:
- action/result identity preserved;
- pending eventId/variantId preserved;
- Night state preserved;
- Activity route/checkpoint preserved;
- ending state preserved;
- New Run/Meta state preserved where applicable.

No package may add save fields for:
- frame index;
- playback position;
- elapsed media time;
- loop count.

## 7. No gameplay timing/state from media

Search package data and implementation mapping for gameplay-state fields.

Forbidden responsibilities:
- Energy/money/stat mutation;
- inventory/capability mutation;
- RNG;
- conditions/effects;
- route availability;
- event resolution;
- ending eligibility;
- action availability;
- time/frame-driven mechanics.

Acceptance:
`gameplayMutationExpected = NO`

## 8. Rollback restores prior mappings

Rollback acceptance:
- remove/disable package;
- previous media mapping returns;
- shipped fallback remains valid;
- no orphan semantic target remains;
- unrelated mappings remain intact;
- deterministic package state is restored.

Test:
- one row;
- one reuse group;
- entire package.

## 9. Partial batch failure

Inject one invalid row into an otherwise valid package.

Examples:
- unknown semantic ID;
- invalid media kind;
- stale target;
- missing required alt;
- bad managed reference.

Required behavior:
- invalid row does not corrupt unrelated active mappings;
- either the whole package rejects atomically, or documented row-isolation behavior rejects only the invalid row;
- last known-good mappings remain intact;
- rollback remains possible.

The acceptance evidence must state which policy is implemented:
- `ATOMIC_BATCH`; or
- `ROW_ISOLATED`.

Silent partial corruption is never acceptable.

## 10. Reuse-group integrity

When one asset maps to multiple semantic IDs:
- every semantic ID remains distinct;
- package import does not replace IDs with the reuse-group key;
- per-slot text/alt remains context-correct;
- rollback scope is explicit.

If package replacement is shared at reuse-group level, that scope must be deliberate and documented.

## 11. Stale-content rejection

Before import:
- source gameplay/content ID still exists;
- semantic ID remains canonical;
- media brief is current;
- fallback still valid;
- no superseded content is targeted.

Stale targets reject before persistence.

## 12. Package checksum / drift check

Recommended:
- canonicalize package rows by semantic ID;
- record package version;
- record media refs;
- record fallback classes;
- record reuse groups;
- compute deterministic checksum.

On reload/reimport:
- checksum or canonical summary must match approved package unless an explicitly approved update occurred.

## 13. Acceptance evidence template

```text
packageName:
packageVersion:
targetCount:
policy: ATOMIC_BATCH | ROW_ISOLATED
semanticIdsUnchanged: PASS|FAIL
mediaMapping: PASS|FAIL
missingAssetFallback: PASS|FAIL
animationsOff: PASS|FAIL
saveReload: PASS|FAIL
gameplayTimingCoupling: PASS|FAIL
rollback: PASS|FAIL
partialFailureIsolation: PASS|FAIL
staleContentCheck: PASS|FAIL
checksum:
reviewer:
implementationCommit:
status: ACCEPTED|REJECTED|REBRIEF_REQUIRED
```

## 14. Final acceptance

A replacement/import package is accepted only when:

1. semantic IDs are unchanged;
2. media mappings resolve;
3. missing assets fall back safely;
4. animations-off remains valid;
5. save/reload is unaffected;
6. no gameplay timing/state derives from media;
7. rollback restores prior mappings;
8. partial batch failure does not corrupt unrelated mappings;
9. stale targets reject;
10. acceptance evidence is recorded.

No runtime or gameplay change is required merely to accept a new media package.
