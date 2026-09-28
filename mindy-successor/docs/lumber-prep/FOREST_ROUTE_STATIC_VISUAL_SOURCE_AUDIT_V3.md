# Forest Route Static Visual Source Audit v3

Status: re-audit of current/root and Chat 2 Forest route static SVG sources after PR #54.

No asset is activated by this audit.

## Classification

- **SAFE** — compatible with current established route semantics.
- **NEEDS_REVISION** — source is not an explicit Product claim but visually overstates current safe semantics.
- **PRODUCT_SEMANTICS_LEAK** — source directly depicts unresolved Product meaning.

## Current root default

Source:
`assets/presentation/forest-route-default-v1.svg`.

Current location:
root `main`.

Observed:
- generic forest trail;
- heroine/traveler;
- no route-specific marker;
- no result/outcome;
- no token/Hunter/challenge semantics.

Classification:
**SAFE**.

Use:
- before route selection;
- route-specific visual fallback.

## Chat 2 logging-road source

Source branch:
`chat2/presentation-replacement-next`.

Asset:
`assets/presentation/forest-route-logging-road.svg`.

Observed:
- broad worked road;
- log/timber form;
- ordinary road/work traces;
- no token;
- no Hunter sign;
- no magic;
- no outcome/reward.

Classification:
**SAFE**.

Activation still requires Lead/Chat2 integration and the route presentation seam.

The visual must remain presentation-only.

## Chat 2 old-boundary source

Source branch:
`chat2/presentation-replacement-next`.

Asset:
`assets/presentation/forest-route-old-boundary.svg`.

Observed:
- older forest route;
- older marks;
- central constructed crossbar/post-like shape.

Classification:
**NEEDS_REVISION**.

Reason:
the crossbar reads more like a built gate/checkpoint/barrier than the currently established old stones/marks/path-boundary semantics.

This is not classified **PRODUCT_SEMANTICS_LEAK** by itself because the SVG does not explicitly show:
- token insertion/consumption;
- Hunter ownership;
- magic;
- named challenge;
- reward.

But it is too specific for current Product authority.

## PRODUCT_SEMANTICS_LEAK check

No reviewed current/source SVG directly depicts:
- Old Boundary Token;
- token payment/turn-in;
- Hunter identity;
- School Arcana;
- magical activation;
- route challenge reward;
- hidden lore result.

Current count:
**0 PRODUCT_SEMANTICS_LEAK candidates**.

## Disposition table

| Source | Classification | Disposition |
| --- | --- | --- |
| default root SVG | SAFE | keep/use as neutral fallback |
| logging-road Chat2 SVG | SAFE | may integrate after route seam + normal review |
| old-boundary Chat2 SVG | NEEDS_REVISION | do not activate until corrected; use default fallback |

## Gameplay firewall

Visual source choice cannot change:
- route availability;
- old-boundary capability gate;
- route state;
- progress/endurance;
- RNG;
- Save;
- result continuation;
- Lumber Hard Work.

## Audit conclusion

Default and logging-road visual sources are semantically safe.

Old-boundary source needs a minimal visual correction before route-specific activation.
