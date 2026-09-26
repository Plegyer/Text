# Presentation Override Import / Export Contract v1

Status: presentation-only portability contract. No runtime/UI import-export implementation is added by this document.

## Purpose

This contract defines a deterministic portable payload for presentation replacements. It is keyed only by semantic `presentationId` and is versioned independently from life-save schemas.

The contract does not contain or mutate gameplay state, event outcomes, course progress, ending eligibility, RNG, Energy, conditions, effects, inventory, resources, or save history.

## Envelope

A v1 payload has this logical shape:

```json
{
  "format": "portal-life.presentation-override-portable",
  "formatVersion": 1,
  "presentationSchemaVersion": 1,
  "metadata": {
    "bundleId": "user.example",
    "name": "Example presentation replacements"
  },
  "policy": {
    "activation": "atomic",
    "unknownPresentationId": "quarantine"
  },
  "replacements": {
    "job/lumber/shift/spring/default": {
      "primaryGif": {
        "ref": "media/lumber/shift-spring.gif",
        "alt": "Spring Lumber shift"
      },
      "static": {
        "ref": "media/lumber/shift-spring.webp",
        "alt": "Spring Lumber shift without animation"
      }
    }
  }
}
```

`replacements` is keyed directly by semantic `presentationId`. Asset filenames and filesystem locations never become semantic identity.

## Versioning

- `formatVersion` versions the portable envelope.
- `presentationSchemaVersion` versions presentation replacement semantics.
- Neither version is a life-save schema version.
- Import/export must never migrate or rewrite a life save.

Unsupported presentation payload versions are rejected before activation.

## Portable references

Portable media references:

- are package-relative, e.g. `media/lumber/shift-spring.gif`;
- must not be absolute Windows/macOS/Linux paths;
- must not use `file://`, `http://`, or `https://`;
- must not use parent traversal (`../`);
- must not embed a username, home directory, or machine-specific installation path.

The application may materialize these logical refs into app-managed storage. That physical storage location is outside this contract.

## Preflight

Import is two-phase:

1. parse and validate the complete candidate payload into staging;
2. atomically activate the staged known-slot set.

Preflight validates:

- supported versions;
- duplicate semantic IDs are rejected;
- every known replacement key is a valid semantic `presentationId`;
- unknown slot IDs are either quarantined or rejected by explicit policy;
- media refs are portable;
- required alt text is present;
- no gameplay/save payload exists.

Unknown IDs are never guessed or rebound to similar-looking slots.

## Atomicity

Activation is atomic.

If any known-slot entry is invalid, the previous active override set remains unchanged. No valid subset from a broken candidate payload may be partially applied.

Quarantined unknown slots remain inactive and are reported separately.

## Export

Export:

- sorts replacement keys deterministically;
- writes only portable logical media refs;
- preserves semantic `presentationId` keys exactly;
- preserves presentation payload versions;
- excludes life-save/gameplay state.

A deterministic export of the same normalized replacement set must produce the same JSON text.

## Round trip

For any valid normalized v1 payload:

`import(export(payload))`

must preserve:

- the exact set of semantic `presentationId` keys;
- the replacement media refs and alt text;
- the presentation payload versions;
- policy-relevant quarantine/atomic semantics.

Round trip must not derive a different event ID, course ID, ending ID, or gameplay identity because those identities are outside this payload.

## Separation from life saves

Forbidden fields/payloads include:

- run/save state;
- event or variant resolution state;
- course progression;
- ending commitment/result state;
- RNG seed/state;
- Energy, money, inventory, stats, conditions, effects, transitions, rewards, deltas;
- animation frame, elapsed playback time, loop count, or playback timestamp.

Presentation import/export is application presentation configuration only.

## Acceptance

The contract is accepted when:

1. payloads are keyed only by semantic `presentationId`;
2. versioning is independent from life saves;
3. absolute/user filesystem paths are impossible in valid payloads;
4. duplicates reject;
5. unknown slot IDs quarantine or reject, never guess;
6. invalid known entries leave active overrides unchanged;
7. export/import round trip preserves semantic identity deterministically;
8. gameplay content is absent from the payload.
