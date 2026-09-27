# Presentation Forest Content-Depth Asset Matrix v1

This matrix maps presentation dependencies for still-open Forest product depth without inventing content.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/presentation-forest-content-depth-asset-matrix.fixture.json`

## Classification rule

- **SHIPPED_IDENTITY_READY** — gameplay/result identity already exists; presentation can safely remain on current semantic slot/static fallback, with optional later specialization.
- **AUTHORING_DECISION_REQUIRED** — enough identity exists to discuss presentation, but Product/content decisions still affect the final authored treatment.
- **CONTENT_FIRST_THEN_ASSET** — do not finalize presentation IDs/lore/media until gameplay/content identity exists.
- **OPTIONAL_POLISH** — no product dependency; current presentation is already release-safe.

## Route depth

### Logging road — SHIPPED_IDENTITY_READY

Gameplay route identity is shipped. Current presentation remains:

`activity/forest/route/default`

with Forest static fallback.

A future route-specific family may use:

`activity/forest/route/logging-road/*`

but unique art is optional.

### Hunter trail — CONTENT_FIRST_THEN_ASSET

Hunter-trail gameplay/content identity is still open.

Do not invent:

- unlock/clue/capability identity;
- final route event IDs;
- lore;
- final route-specific presentation variants.

Current generic Forest route fallback is safe.

### Old Boundary — AUTHORING_DECISION_REQUIRED

The route identity exists, but Product still owns unresolved acquisition / retain-consume decisions around the Old Boundary Token.

Presentation can remain generic until those decisions are authored.

## Challenge families

Navigation, physical obstacle, and interpretation/ritual anomaly are all **CONTENT_FIRST_THEN_ASSET**.

Their final challenge content must exist before final presentation variants/assets are bound.

Current generic Forest presentation remains safe.

## Seasonal topology

Season-specific route/topology visuals are **CONTENT_FIRST_THEN_ASSET**.

Presentation should not infer seasonal story meaning merely because the calendar has a season. Final seasonal media requires authored seasonal topology/content.

## Result surfaces

Success, escape, and failure already have shipped semantic identities:

- `activity/forest/return/success`
- `activity/forest/return/escape`
- `activity/forest/return/failure`

All are **SHIPPED_IDENTITY_READY** and static-safe today.

Dedicated result art remains optional polish.

## Separation rule

Gameplay identity answers “what happened.”

Presentation media answers “how it is shown.”

A filename, GIF, or static image must never create or define:

- route availability;
- challenge mechanics;
- token ownership;
- capability ownership;
- outcome;
- season topology.

## Current RC implication

No missing Forest-specific art blocks the current technical RC.

The open work is content depth first, then optional/specific asset authoring.
