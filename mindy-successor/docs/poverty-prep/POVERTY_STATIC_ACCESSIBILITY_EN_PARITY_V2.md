# Poverty Static Accessibility EN Parity v2

Status: full English parity for the exact Russian source in
`POVERTY_STATIC_ACCESSIBILITY_RU_SOURCE_V2.md`.

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Scope:
- the same 10 current ordinary-poverty static assets;
- the same 20 alt/caption keys;
- visible-scene description only;
- Secret Debt excluded.

## Final English replacements

| Key | Final EN |
| --- | --- |
| `presentation.static.poverty-street-helpful-summer.alt` | A summer city street at sunset: the heroine stands between simple buildings near a closing stall and a crate. |
| `presentation.static.poverty-street-helpful-summer.caption` | A summer evening beside a closing stall. |
| `presentation.static.poverty-street-neutral-autumn.alt` | A quiet autumn street at sunset: the heroine stands between buildings with fallen leaves scattered across the stones. |
| `presentation.static.poverty-street-neutral-autumn.caption` | A quiet autumn street with fallen leaves. |
| `presentation.static.poverty-street-pressure-winter.alt` | A cold winter street: the heroine stands between dark buildings under light falling snow. |
| `presentation.static.poverty-street-pressure-winter.caption` | A winter evening on a cold street. |
| `presentation.static.poverty-cheap-shared-quiet-autumn.alt` | A cramped low-cost room with a simple bed and sparse furnishings; the heroine stands near the side of the room. |
| `presentation.static.poverty-cheap-shared-quiet-autumn.caption` | A quiet shared room with a simple bed. |
| `presentation.static.poverty-recovery-small-coin-help.alt` | The heroine stands on a city street beside two coins and a small parcel. |
| `presentation.static.poverty-recovery-small-coin-help.caption` | Coins and a small parcel by the road. |
| `presentation.static.poverty-recovery-short-cleanup.alt` | The heroine stands beside a broom and a box on a city street after a short cleanup. |
| `presentation.static.poverty-recovery-short-cleanup.caption` | A broom and box after cleanup. |
| `presentation.static.poverty-recovery-herb-bundle.alt` | The heroine stands beside a tied bundle of herbs and a small box. |
| `presentation.static.poverty-recovery-herb-bundle.caption` | A tied bundle of herbs beside a box. |
| `presentation.static.poverty-pressure-cold-rain.alt` | The heroine stands on a dark city street under slanting cold rain while water gathers on the stones. |
| `presentation.static.poverty-pressure-cold-rain.caption` | Cold rain on a dark street. |
| `presentation.static.poverty-pressure-noisy-loading.alt` | The heroine stands on a city street beside stacked crates and a loading area. |
| `presentation.static.poverty-pressure-noisy-loading.caption` | Crates at an early street loading area. |
| `presentation.static.poverty-pressure-muddy-splash.alt` | The heroine stands on a wet city street beside muddy puddles and splashes. |
| `presentation.static.poverty-pressure-muddy-splash.caption` | Muddy puddles and splashes on the street. |


## Parity rules

English preserves the Russian source meaning:
- same visible objects;
- same weather/season;
- same degree of specificity;
- no extra gameplay implication.

No English string introduces:
- reward/penalty information;
- event-outcome claims;
- hidden effects;
- event identity terminology;
- Secret Debt semantics.

## Locale invariance

RU and EN share:
- the same static asset;
- the same localization key;
- the same gameplay event/variant identity.

Only the localized alt/caption text changes.

## Final disposition

Use these exact EN values together with item 331 RU values in
`poverty-static-accessibility-v2.fixture.json`.
