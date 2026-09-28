# Ordinary Poverty Depth Current-Main Rebase Audit v3

Status: exact current-main rebase audit for the 26-key v2 depth patch.

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Source patch:
`prior-work/astra/prototype-m3.2/content/ordinary-poverty-localization-depth-v2.fixture.json`.

## Classification rule

- **ADDITIVE** — exact key is absent from current root localization.
- **IDENTICAL** — exact key is already present with the same RU+EN value.
- **CONFLICT** — exact key is present with a different value.
- **SUPERSEDED** — exact depth key is no longer needed because an active current-main presentation consumer owns the same depth seam under a different reviewed key.

## Exact 26-key audit

| Key | Classification |
| --- | --- |
| `presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.market-closing.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text` | **ADDITIVE** |
| `presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text` | **ADDITIVE** |


## Totals

- ADDITIVE: **26**
- IDENTICAL: **0**
- CONFLICT: **0**
- SUPERSEDED: **0**

## Supersession check

No current root `presentation.poverty.depth.*` consumer/key family replaces these 26 depth candidates.

Current shipped `event.<eventId>.variant.<variantId>.text` remains the fallback/core body, not a replacement for the optional depth layer.

Therefore none of the 26 v2 keys is classified SUPERSEDED.

## Current-main conclusion

All 26 v2 depth keys remain cleanly **ADDITIVE** against exact current main.

There are:
- zero root collisions;
- zero already-integrated identical keys;
- zero superseded keys;
- zero gameplay/runtime edits in this audit.

A Lead integration branch must re-run this exact-key check immediately before applying the patch.
