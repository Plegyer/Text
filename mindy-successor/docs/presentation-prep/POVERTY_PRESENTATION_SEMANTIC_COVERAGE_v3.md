# Poverty Presentation Semantic Coverage v3

Scope: shipped **ordinary poverty** production from PR37 only.

**Secret Debt is excluded.**

Real GIF inventory on current repo baseline: **0**.

## Production identities

| Family | Source event ID | Semantic presentation ID | Current static fallback | Real GIFs | Real 3–5 pool ready | Missing to 3 / 5 |
| --- | --- | --- | --- | ---: | --- | ---: |
| street | `poverty-street-production.helpful-summer` | `location/town/event/poverty-street-production-helpful-summer/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| street | `poverty-street-production.neutral-autumn` | `location/town/event/poverty-street-production-neutral-autumn/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| street | `poverty-street-production.pressure-winter` | `location/town/event/poverty-street-production-pressure-winter/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| cheap lodging | `poverty-cheap-production.shared-quiet-autumn` | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | `assets/stage-room.svg` | 0 | NO | +3 / +5 |
| recovery/help | `poverty-recovery-production.small-coin-help` | `location/town/event/poverty-recovery-production-small-coin-help/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| recovery/help | `poverty-recovery-production.short-cleanup` | `location/town/event/poverty-recovery-production-short-cleanup/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| recovery/help | `poverty-recovery-production.herb-bundle` | `location/town/event/poverty-recovery-production-herb-bundle/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| pressure/bad-luck | `poverty-pressure-production.cold-rain` | `location/town/event/poverty-pressure-production-cold-rain/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| pressure/bad-luck | `poverty-pressure-production.noisy-loading` | `location/town/event/poverty-pressure-production-noisy-loading/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |
| pressure/bad-luck | `poverty-pressure-production.muddy-splash` | `location/town/event/poverty-pressure-production-muddy-splash/default` | `assets/stage-outside.svg` | 0 | NO | +3 / +5 |

## Real-asset and reuse assessment

There is no real poverty GIF to reuse today.

Current safe reuse is limited to static fallback media:
- `assets/stage-outside.svg` is already reused across street, recovery/help and pressure/bad-luck presentation identities;
- `assets/stage-room.svg` is the static fallback for the cheap-lodging identity.

That reuse is presentation-only. The distinct event and semantic IDs remain separate.

For future GIF production, generic exterior loops may be reusable across multiple exterior poverty identities only when the depicted action does not imply a different gameplay outcome. For example, a neutral street ambience loop could potentially be mapped to more than one compatible exterior semantic ID, but a loop that visually encodes receiving money, receiving herbs, cold-rain pressure, or another specific result must not be used to blur those gameplay identities.

## Deficit

Every listed identity currently has:
- **0** real GIF candidates;
- **3** missing candidates to become a valid minimum PR42 pool;
- **5** missing candidates to become a full five-candidate pool.

Across 10 identities, that is:
- **30 candidate assignments** to reach minimum 3-wide coverage;
- **50 candidate assignments** to reach five-wide coverage.

These are assignment counts, not necessarily unique-file counts. Safe reuse can reduce the number of unique new GIF files without merging semantic identities.

## Production rule

Media candidate selection must never choose or change:
- helpful / neutral / pressure meaning;
- event outcome;
- effects or rewards;
- lodging availability;
- save identity.

No placeholder path is counted as an asset, and no Secret Debt identity is introduced by this audit.
