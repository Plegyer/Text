# Current project-owned static coverage v5

Status: COMPLETE / CURRENT_MAIN_82_MAPPINGS

Current main:
`2ad9fb8b0572f8903bbf57d144c8c5938023a440`
(PR60 safe old-boundary static merge).

Root presentation blob:
`d403fe7b367ba4a578ac156a60d03dd301c42281`.

## Active project-owned root mappings

Current root semantic static mappings under:
`assets/presentation/*.svg`

= `82`.

Unique active physical project-owned sources:
`81`.

The one active physical source shared by two semantic slots remains:
`school-day-study.svg`.

Therefore:
- semantic mappings: 82;
- unique active physical sources: 81.

## Established baseline target

The established non-route-specific/current fallback target remains:
`80 / 80`
semantic IDs.

It includes the neutral:
`activity/forest/route/default`
slot.

PR59 added one route-specific logging-road mapping.

PR60 adds one route-specific old-boundary mapping.

Thus current total:
`80 baseline + 2 route-specific = 82 semantic static mappings`.

## Forest route static breakdown

### Neutral default

`activity/forest/route/default`
-> `assets/presentation/forest-route-default-v1.svg`.

Role:
- pre-route neutral presentation;
- fallback if a route-specific media override is absent/invalid.

### Logging road

`activity/forest/route/logging-road`
-> `assets/presentation/forest-route-logging-road.svg`.

Shipped by PR59.

### Old boundary

`activity/forest/route/old-boundary`
-> `assets/presentation/forest-route-old-boundary-v3.svg`.

Shipped by PR60.

Both route-specific statics retain the neutral route/default fallback in the presentation catalog.

## Route-specific physical coverage

Current route-specific current route identities:
`2`.

Current route-specific root physical media:
`2 / 2`.

This is static visual coverage only.

It does not imply:
- new route gameplay;
- token lifecycle;
- challenge/reward;
- animation coverage.

## Physical asset directory

Current main `assets/presentation/` files:
`91`.

Active physical files referenced by root project-owned static slots:
`81`.

Retained inactive/source-history files:
`10`.

Inactive list:
- `foreman-night-professional.svg`;
- `foreman-professional.svg`;
- `forest-result-escape.svg`;
- `forest-result-failure.svg`;
- `forest-result-success.svg`;
- `poverty-cheap-lodging.svg`;
- `poverty-pressure.svg`;
- `poverty-recovery-help.svg`;
- `poverty-street.svg`;
- `school-night-study.svg`.

Old-boundary v3 is now active and therefore is not in the inactive list.

## Accessibility

Current root localization remains:
`664` bilingual keys.

Missing RU:
`0`.

Missing EN:
`0`.

Route-specific accessibility:
- logging-road alt/caption: shipped RU+EN;
- old-boundary alt/caption: shipped RU+EN.

PR60 reuses the already-shipped PR59 old-boundary accessibility keys rather than inventing duplicates.

## Locale/media invariance

Accepted PR60 exact-head run #119 verifies:
- route-specific media is semantically narrow;
- both Forest routes resolve reviewed project-owned static media;
- neutral fallback metadata remains;
- route localization remains presentation-only;
- Save/RNG/result/Hard Work regressions remain green.

## Animation coverage

Current real project-owned production GIFs:
`0`.

Current production GIF candidate pools:
`0`.

Static coverage:
`82 semantic / 81 unique physical`
must not be described as animation coverage.

## Current verdict

Current project-owned static state:
- baseline target: `80/80`;
- route-specific static extension: `2/2`;
- total active semantic mappings: `82`;
- unique active physical sources: `81`;
- neutral route/default fallback: retained;
- real production GIFs: 0.
