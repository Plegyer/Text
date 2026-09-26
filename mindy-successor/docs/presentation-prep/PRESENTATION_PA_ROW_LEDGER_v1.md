# Presentation PA Row Ledger v1

Baseline: current main `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`.

This ledger maps **presentation requirements only** for PA00–PA26. It is not a replacement for gameplay acceptance.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/presentation-pa-row-ledger.fixture.json`

## Status rule

Presentation evidence never upgrades an OPEN gameplay row to PASS.

The ledger uses four gameplay-row labels:

- `SHIPPED_EVIDENCE` — the shipped PA evidence exercises the row directly;
- `SHIPPED_EVIDENCE_WITH_ALLOWED_ACCELERATOR` — the repetition-heavy ending setup uses the explicitly permitted acceptance accelerator;
- `ACCELERATED_EVIDENCE_ONLY` — presentation/result behavior is observed only after injecting a capability that is itself still missing from the natural product path;
- `OPEN_GAMEPLAY_AUTHORING` — the full row remains open because required gameplay/content authoring is absent.

## OPEN rows

Presentation is already ready for the visible state, but these rows remain OPEN:

- PA07–PA09: final School management/accounting public result and downstream capability authoring;
- PA14: natural Forest entry is blocked without the missing capability path;
- PA16: required deeper Forest route/challenge/season depth is missing;
- PA17: item-driven Activity action-space behavior is missing.

## Accelerated-only Forest evidence

PA15, PA18, PA19 and PA20 have useful presentation/reload evidence, but it is reached after capability injection. They remain labeled `ACCELERATED_EVIDENCE_ONLY`; this ledger does not call them full PA passes.

## Presentation invariants

Across all rows:

- semantic `presentationId` is independent from GIF/static filename;
- animation-off keeps the same semantic identity;
- save/reload never needs animation frame/time/playback state;
- presentation does not apply mechanics, costs, rewards, progression, or action availability;
- fallback remains static/text-safe.

The exact per-row slot, fallback, reload expectation, animation-off behavior, and gameplay status are in the fixture.
