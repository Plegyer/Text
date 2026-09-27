# Poverty Production Media-Pool Mapping v2

Authority:
- PR #37 merged;
- ordinary-poverty production packs are now on current main;
- this mapping uses only actual PR37 event + variant identities.

## Critical rule

Gameplay selects:

`eventId + variantId + choice/outcome`

first.

Presentation then selects one of 3–5 visual candidates under the already-fixed semantic `presentationId`.

A GIF candidate must never choose or alter:
- helpful vs neutral vs pressure meaning;
- event variant;
- choices;
- effects;
- next-day modifiers;
- money/item outcomes.

## Production surfaces

| Family | Event ID | Variant | Semantic presentationId | Current fallback | Initial GIF count | Gameplay meaning owner |
| --- | --- | --- | --- | --- | ---: | --- |
| street | `poverty-street-production.helpful-summer` | `default` | `location/town/event/poverty-street-production-helpful-summer/default` | assets/stage-outside.svg | 3 | helpful |
| street | `poverty-street-production.neutral-autumn` | `default` | `location/town/event/poverty-street-production-neutral-autumn/default` | assets/stage-outside.svg | 3 | neutral |
| street | `poverty-street-production.pressure-winter` | `default` | `location/town/event/poverty-street-production-pressure-winter/default` | assets/stage-outside.svg | 3 | pressure |
| cheap lodging | `poverty-cheap-production.shared-quiet-autumn` | `default` | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | assets/stage-room.svg | 3 | neutral lodging |
| recovery/help | `poverty-recovery-production.small-coin-help` | `default` | `location/town/event/poverty-recovery-production-small-coin-help/default` | assets/stage-outside.svg | 3 | recovery/help |
| recovery/help | `poverty-recovery-production.short-cleanup` | `default` | `location/town/event/poverty-recovery-production-short-cleanup/default` | assets/stage-outside.svg | 3 | recovery/help |
| recovery/help | `poverty-recovery-production.herb-bundle` | `default` | `location/town/event/poverty-recovery-production-herb-bundle/default` | assets/stage-outside.svg | 3 | recovery/help |
| pressure/bad-luck | `poverty-pressure-production.cold-rain` | `default` | `location/town/event/poverty-pressure-production-cold-rain/default` | assets/stage-outside.svg | 3 | pressure/bad-luck |
| pressure/bad-luck | `poverty-pressure-production.noisy-loading` | `default` | `location/town/event/poverty-pressure-production-noisy-loading/default` | assets/stage-outside.svg | 3 | pressure/bad-luck |
| pressure/bad-luck | `poverty-pressure-production.muddy-splash` | `default` | `location/town/event/poverty-pressure-production-muddy-splash/default` | assets/stage-outside.svg | 3 | pressure/bad-luck |


Total mapped production surfaces: **10**.

## Street pools

### Helpful summer errand

`location/town/event/poverty-street-production-helpful-summer/default`

Initial 3-candidate pool:
- closed-stall / crate-carry context;
- quiet street-market closing context;
- short anonymous errand context.

Current fallback:
`assets/stage-outside.svg`.

The media candidate does not decide whether the player takes the errand or keeps resting.

### Neutral autumn corner

`location/town/event/poverty-street-production-neutral-autumn/default`

Initial 3-candidate pool:
- awning/dry-pavement context;
- quiet after-closing street context;
- sheltered autumn-night context.

No candidate may imply a reward or penalty that the gameplay event does not apply.

### Winter pressure

`location/town/event/poverty-street-production-pressure-winter/default`

Initial 3-candidate pool:
- cold stone / overhang;
- sheltered curb context;
- winter street movement context.

The candidate never selects between `take-shelter` and `keep-moving`.

## Cheap lodging pool

### Shared quiet autumn

`location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

Initial 3-candidate pool:
- shared cheap-room settling loop;
- thin-wall / early-quiet interior loop;
- belongings / cramped-room context.

Current fallback:
`assets/stage-room.svg`.

This remains neutral presentation around the authored cheap-lodging event.

## Recovery / help pools

### Small coin help

`location/town/event/poverty-recovery-production-small-coin-help/default`

Pool ideas:
- public ledge / bread parcel;
- loose coins beside food;
- quiet market-side recovery context.

The GIF does not select `take-coins` vs `leave-them`.

### Short cleanup

`location/town/event/poverty-recovery-production-short-cleanup/default`

Pool ideas:
- stacking stools;
- short sweep;
- carrying bucket to drain.

All three are presentation variants of the same authored event.

### Herb bundle

`location/town/event/poverty-recovery-production-herb-bundle/default`

Pool ideas:
- tied herb bundle beside crate;
- market closing still-life;
- ordinary found-item context.

The candidate cannot grant the herb; only the authored choice effect can.

## Pressure / bad-luck pools

### Cold rain

`location/town/event/poverty-pressure-production-cold-rain/default`

Pool ideas:
- rain reaching curb;
- deeper doorway;
- wet shelter edge.

The candidate cannot apply fatigue or grooming loss.

### Noisy loading

`location/town/event/poverty-pressure-production-noisy-loading/default`

Pool ideas:
- early carts;
- crates and wheels;
- noisy pre-dawn loading corner.

The candidate cannot apply the next-day Energy penalty.

### Muddy splash

`location/town/event/poverty-pressure-production-muddy-splash/default`

Pool ideas:
- cart crossing puddle;
- muddy curb splash;
- dirty-clothing aftermath.

The candidate cannot apply grooming loss.

## Pool failure behavior

Per semantic event+variant slot:
- one GIF missing -> choose among remaining candidates;
- all GIFs missing -> current static fallback;
- animations off -> static/text fallback;
- save/reload -> same eventId + variantId;
- no gameplay RNG is used by media selection.

## Secret Debt firewall

PR37 ordinary-poverty media pools do not authorize:
- lender offer;
- delayed debt activation;
- hidden Slave career;
- forced Secret Debt Night;
- Secret Debt endings.

No reuse-group or filename should imply those hidden-career identities.

## Production status

These 10 event+variant semantic surfaces are now **CONTENT_AUTHORED** on current main.

They are ready for presentation-pool production once the Lead-owned multi-GIF runtime extension exists.

Until then, their existing static media remains sufficient and mechanically complete.
