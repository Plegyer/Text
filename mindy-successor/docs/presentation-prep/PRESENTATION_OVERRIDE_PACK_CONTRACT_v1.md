# Presentation Override Pack Contract v1

Status: Chat 2 Phase B continuation contract.

## 1. Purpose

A presentation override pack is a portable, presentation-only bundle that replaces media for stable `presentationId` slots without editing gameplay content. It carries user-facing metadata plus GIF/static media references. It does not contain run state, mechanics, effects, RNG state, Energy, event resolution, ending state, or life-save payloads.

The pack is keyed by semantic `presentationId`. Asset names and storage paths are replaceable implementation details and never become gameplay IDs.

## 2. Version boundary

The portable format has its own versions:

- `formatVersion`: version of this portable pack envelope;
- `presentationSchemaVersion`: version of the presentation override entry contract.

These versions are independent from every life/run save schema version. Importing or exporting an override pack must not rewrite or migrate a life save.

A v1 consumer must reject an unsupported `formatVersion` before activation. A future presentation-schema migration may transform presentation entries only; it must not derive or mutate gameplay state.

## 3. Logical package shape

A v1 pack has this logical shape:

```json
{
  "format": "portal-life.presentation-override-pack",
  "formatVersion": 1,
  "presentationSchemaVersion": 1,
  "metadata": {
    "packId": "user.example",
    "name": "My presentation replacements",
    "description": "Optional human-readable note"
  },
  "activationPolicy": {
    "mode": "atomic",
    "unknownPresentationId": "quarantine",
    "invalidEntry": "reject-pack"
  },
  "entries": {
    "job/lumber/shift/spring/default": {
      "primary": {
        "kind": "gif",
        "ref": "media/lumber-shift.gif",
        "alt": "Лесорубы на весенней смене"
      },
      "static": {
        "kind": "image",
        "ref": "media/lumber-shift.webp",
        "alt": "Лесорубы на весенней смене"
      }
    }
  }
}
```

`entries` is a record keyed directly by `presentationId`. The key is the semantic identity. Media references never replace that identity.

## 4. Metadata

Required metadata:
- `packId`: stable identifier for the override pack itself;
- `name`: user-facing name.

Optional metadata may include description, author/display attribution, tool version, or other presentation-production information. Metadata must not include gameplay state or become a source of mechanics.

No field in metadata may override a `presentationId`, event ID, variant ID, condition, effect, RNG seed, resource cost, or save-state value.

## 5. Entry contract

Each entry may provide:
- `primary`: GIF media reference;
- `static`: non-animated PNG/JPEG/WebP reference;
- accessibility `alt` text on each present media reference.

At least one of `primary` or `static` must be present for an active override entry.

Primary media:
- `kind` is `gif`;
- `ref` resolves to a GIF payload in the imported pack.

Static media:
- `kind` is `image`;
- `ref` resolves to PNG, JPEG, or WebP payload in the imported pack.

Fallback relationships remain owned by the target presentation registry/runtime unless a later contract explicitly adds portable fallback overrides. v1 does not let a user pack redefine the gameplay-to-presentation mapping.

## 6. Portable media references

A v1 `ref` is a logical package-relative media reference such as `media/lumber-shift.gif`.

It is not:
- an absolute Windows, macOS, or Linux path;
- a `file://`, `http://`, or `https://` URL;
- a parent traversal such as `../`;
- a promise about the final desktop installation or user-data directory.

The importer may unpack, copy, cache, or otherwise materialize media in an application-managed location. That physical location is deliberately outside this contract. Export must reconstruct a portable logical reference rather than leaking machine-local paths.

## 7. Validation before activation

Import is a two-phase operation:

1. Parse and validate the full candidate pack into a staging representation.
2. Activate the validated known-target set atomically.

Validation includes:
- supported pack and presentation schema versions;
- unique, syntactically valid `presentationId` keys;
- every known target exists in the current presentation registry;
- media kind and extension agree;
- references are portable and do not escape the package;
- required alt text is present;
- each referenced payload exists and is decodable when payload validation is available;
- no gameplay/save fields are present.

Validation must not dispatch gameplay commands or mutate a run.

## 8. Unknown presentation IDs

Default v1 policy is `unknownPresentationId: "quarantine"`.

An unknown target:
- is never rebound to a similar-looking ID;
- is excluded from the active override set;
- is retained in import diagnostics/quarantine so the user can inspect or re-export it;
- does not alter gameplay or the requested semantic identity of another slot.

An implementation may additionally offer an explicit strict import mode that rejects the whole pack on unknown IDs. It must never guess.

## 9. Atomic activation

`activationPolicy.mode` is `atomic`.

The importer stages candidate overrides first. If any non-quarantined entry is invalid, activation fails and the previously active override set remains unchanged. There is no partial replacement of valid entries from a broken candidate pack.

When all known-target entries validate, the application may atomically replace the active presentation override set with the staged set. Quarantined unknown entries stay inactive.

Atomicity applies to presentation overrides only and must not lock or rewrite the life save.

## 10. Missing media after activation

A media failure is non-fatal presentation failure. Runtime behavior remains:

1. requested primary GIF;
2. same-slot static fallback when available;
3. registry/family/location fallback;
4. text-only central stage.

A missing/corrupt user asset does not roll back mechanics, reroll RNG, consume Energy, block a choice, or change ending/event eligibility.

## 11. Animation-disable behavior

When animation is disabled, the runtime must not require GIF playback. It prefers the active static override and then the normal registry fallback chain/text-only state.

The override pack stores no GIF frame, playback position, loop count, duration gate, or elapsed animation time.

## 12. Separation from life saves

A presentation override pack must never contain:
- heroine/run state;
- metrics, inventory, Energy, money, date, flags, visits, quests, relationships, careers, School progress, Activity state, ending commitment, Meta state, or RNG state;
- pending event/variant state;
- gameplay commands, conditions, effects, transitions, costs, rewards, or deltas;
- save slots, save checksums, or life-save schema payloads.

The active override pack/reference is application presentation configuration, not run-state history.

## 13. Import/export behavior

Export:
- serializes the portable envelope and presentation entries;
- includes or packages the referenced user media according to the chosen container implementation;
- writes logical package-relative refs;
- does not export a life save.

Import:
- parses into staging;
- validates targets and media;
- quarantines or rejects unknown targets according to policy;
- activates only after full known-target validation succeeds;
- reports quarantined/orphaned targets explicitly.

The container may later be a directory, archive, desktop-managed object, or another packaging mechanism. This contract intentionally does not select the final desktop filesystem location.

## 14. Acceptance

The v1 contract passes when:
1. replacements are keyed by stable `presentationId`;
2. GIF and static media can travel without machine-local source paths;
3. an unknown target is quarantined/rejected and never guessed;
4. an invalid known entry leaves the previous active set intact;
5. valid known entries activate as one presentation transaction;
6. pack versions are independent from life-save versions;
7. no run/mechanics/RNG/Energy data exists in the pack;
8. animation timing/frame state is absent;
9. missing media remains non-fatal through the central-stage fallback chain.
