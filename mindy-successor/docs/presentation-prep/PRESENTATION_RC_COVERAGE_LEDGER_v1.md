# Presentation RC Coverage Ledger v1

Current-main baseline: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/presentation-rc-coverage.fixture.json`

## Purpose

This is the single deduplicated release-candidate ledger for production-facing presentation semantic slots after PR21.

It covers:

- location / shared central context;
- four Lumber shift slots;
- Lumber result and shipped Lumber events;
- Foreman relationship and Night;
- all eight paid School lesson slots;
- School Night study through the existing shared central context;
- Forest Activity route and all shipped result outcomes;
- Lumber endings.

## School Night study

Current School Night study choices do **not** own a dedicated semantic presentation slot in the shipped presentation registry.

They continue to use the shared central context `location/town/default`.

This ledger does not invent a `school/night-study/...` namespace. A dedicated Night-study semantic slot should be added only if product authoring explicitly requires distinct visible presentation identity.

## Blocker classes

`none` means no current gameplay authoring blocker affects the semantic slot.

`gameplay-authoring` means the presentation slot/fallback exists, but the natural PA path depends on still-open gameplay/content work.

Presentation coverage never upgrades those rows to PASS.

## Future GIF status

Only the seven already-defined optional Lumber/Foreman GIF targets are marked `planned-optional`.

All others remain static/text-backed with no invented future asset requirement.

## Fallback rule

Every row records current shipped media IDs and the concrete shipped static asset path.

Semantic identity is independent from those media IDs/filenames.
