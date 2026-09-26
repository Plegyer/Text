# Presentation Replacement Bundle Migration v1

Status: presentation-only version migration contract. It does not migrate life saves, gameplay state, or gameplay IDs.

## Scope

This contract governs only portable presentation replacement bundles.

Current target envelope:

- `format = "portal-life.presentation-replacement-bundle"`
- `formatVersion = 1`
- `presentationSchemaVersion = 1`

Life-save versions are outside this contract.

## Core rule: semantic keys are identity

A replacement bundle is keyed by semantic `presentationId`.

Migration may change envelope structure, field names, or media-reference representation. It must never infer or rename a semantic key from:

- gameplay action/event/course/ending IDs;
- asset filenames;
- dotted media IDs;
- School underscore gameplay IDs;
- similar-looking presentation IDs.

A known semantic key survives migration byte-for-byte.

## Supported migration path

### v0 -> v1

Legacy v0 is treated as a presentation-only transport shape:

```json
{
  "format": "portal-life.presentation-replacement-bundle",
  "formatVersion": 0,
  "presentationSchemaVersion": 1,
  "metadata": {
    "bundleId": "example",
    "name": "Example"
  },
  "entries": [
    {
      "presentationId": "job/lumber/shift/spring/default",
      "fallbackMediaId": "stage.lumber.spring",
      "fallbackAssetPath": "assets/stage-lumber.svg",
      "futureGifTarget": "media/lumber/shift-spring.gif",
      "declaredMediaId": "job.lumber.shift.spring.default"
    }
  ]
}
```

The v1 migrator:

1. validates the v0 envelope;
2. checks each `presentationId` against the known current semantic-slot set;
3. copies known semantic IDs exactly;
4. converts each known entry to v1 `replacements[presentationId]`;
5. adds the v1 preflight policy;
6. moves unknown semantic IDs to an explicit orphan report;
7. never guesses a replacement target for an orphan.

No gameplay identifier is rewritten.

## Orphan policy

Unknown old semantic IDs are not normalized by resemblance.

Examples that must remain orphaned/rejected unless a future contract adds an explicit reviewed mapping:

- `job.lumber.shift.spring.default`
- `school/literacy_and_numbers/lesson/default`
- `ending.lumber.hardwork`
- any unknown old namespace or deleted semantic slot.

Dots are not converted to slashes. School underscores are not converted to kebab-case during bundle migration. Those transformations would be guesses and could bind user media to the wrong semantic slot.

The migration result contains an explicit `orphans` collection with the original key and reason. Orphans are inactive.

## Atomicity

Migration and activation are separate phases.

A successful structural migration does not activate media. The migrated v1 bundle still goes through normal v1 preflight.

If a known v0 entry is malformed, the migration fails; no partially migrated bundle is activated.

Unknown semantic IDs may be collected as orphans without mutating known entries.

## No life-save migration

Forbidden migration inputs/outputs include:

- run state;
- event/variant progress;
- course progression;
- ending commitments/results;
- RNG state;
- Energy, resources, inventory, stats;
- conditions/effects/transitions/rewards;
- save slots, checksums, or save schema versions.

Presentation bundle migration is independent from life saves.

## Forward versions

A bundle with `formatVersion > 1` is rejected as unsupported by this v1 contract. No down-conversion guessing is allowed.

A future migration contract must explicitly define any new version edge.

## Acceptance

The contract is accepted when tests prove:

1. v0 -> v1 preserves every known semantic `presentationId` exactly;
2. media/fallback payload is structurally converted without gameplay fields;
3. dotted-vs-slash and School underscore-vs-kebab lookalikes are orphaned, not normalized;
4. arbitrary unknown old semantic IDs are orphaned/rejected;
5. unsupported future versions reject;
6. no life-save fields enter the migrated bundle.
