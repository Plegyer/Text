# Poverty Multi-GIF Event Pool Plan v1

Source authority:
- Chat 3 `poverty-street-production-v2.json`;
- Chat 3 `poverty-cheap-production-v2.json`;
- Chat 3 production/reload tests.

Status:
these are worker production-authoring packages awaiting selective integration/current-main validation. Revalidate semantic IDs after Lead integration.

## Critical identity rule

A poverty gameplay **event variant** owns one semantic presentation identity.

The media pool sits **under that exact event+variant presentationId**.

Therefore:
- a media reroll may choose a different GIF;
- it may **not** choose a different gameplay variant;
- it may **not** change choices/effects;
- it may **not** switch helpful/neutral/pressure outcome meaning.

The current presentation resolver maps non-career/non-relationship poverty events to:

`location/town/event/<clean-event-id>/<variant-id>`

## Pool size

Initial production target: **3 GIF candidates per semantic event variant**.

Recommended composition:
- 2 reusable environment/context loops;
- 1 variant-specific visual candidate.

A fourth/fifth candidate may be added later without changing gameplay.

---

# Street — helpful summer shade

Gameplay event:
`poverty-street-production-v2.helpful-summer-shade`

This remains one gameplay event with two authored gameplay variants.

## market-closing

Semantic presentationId:

`location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`

Target pool:
- reusable summer street/market-closing loop A;
- reusable summer street/market-closing loop B;
- dedicated canvas/task context candidate.

Current media/fallback source:
`stage.outside` / shipped outside static media.

Gameplay meaning remains:
the authored market-closing variant and its existing choices/effects.

## late-shade

Semantic presentationId:

`location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade`

Target pool:
- reusable summer street/shade loop A;
- reusable quiet closed-stall loop B;
- dedicated late-shade context candidate.

The GIF choice cannot decide whether the player takes the small task or keeps the place.

---

# Street — neutral autumn crossing

Gameplay event:
`poverty-street-production-v2.neutral-autumn-crossing`

## drizzle

Semantic presentationId:

`location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`

Target pool:
- reusable autumn street loop A;
- reusable arcade/shelter loop B;
- dedicated drizzle-footsteps context candidate.

Fallback:
`stage.outside`.

## dry-arcade

Semantic presentationId:

`location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade`

Target pool:
- reusable autumn street loop A;
- reusable dry arcade loop B;
- dedicated quiet-night context candidate.

The visual pool does not turn the neutral event into a reward or penalty.

---

# Street — winter pressure

Gameplay event:
`poverty-street-production-v2.pressure-winter-wind`

## crosswind

Semantic presentationId:

`location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`

Target pool:
- reusable winter street loop A;
- reusable sheltered-doorway loop B;
- dedicated crosswind context candidate.

Fallback:
`stage.outside`.

The GIF selected cannot change the authored safe-choice availability.

## long-gusts

Semantic presentationId:

`location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts`

Target pool:
- reusable winter street loop A;
- reusable shutter/gust context loop B;
- dedicated long-gusts candidate.

The optional authored next-day pressure belongs to the **choice effect**, never to media selection.

---

# Cheap lodging — shared room seasons

Gameplay event:
`poverty-cheap-production-v2.shared-room-seasons`

Current media:
`stage.room`.

All choices in this event are contextual/no-effect.

## spring-window

Semantic presentationId:

`location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`

Target pool:
- reusable cheap-room interior loop A;
- reusable shared-room routine loop B;
- dedicated spring-window context candidate.

## summer-heat

Semantic presentationId:

`location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`

Target pool:
- reusable cheap-room loop A;
- reusable shared-room loop B;
- dedicated summer-heat context candidate.

## winter-stove

Semantic presentationId:

`location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`

Target pool:
- reusable cheap-room loop A;
- reusable shared-room loop B;
- dedicated stove/winter-room context candidate.

## shared-room

Semantic presentationId:

`location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room`

Target pool:
- reusable cheap-room loop A;
- reusable shared-room routine loop B;
- dedicated generic shared-room candidate.

Fallback:
existing room static media.

---

# Gameplay variant vs media candidate

Example:

`helpful-summer-shade / market-closing`

is selected by gameplay/content conditions.

Only **after** that identity is fixed may presentation choose:
- GIF A;
- GIF B;
- GIF C.

Presentation must never choose `late-shade` as a “visual variant” of `market-closing`.

The gameplay variant and media candidate are different layers.

# No Secret Debt bleed

These pools are ordinary poverty only.

Do not include:
- lender;
- delayed debt;
- hidden Slave career;
- forced Secret Debt Night;
- Secret Debt outcomes.

No candidate asset, filename, alt text or reuse-group name may imply Secret Debt content.

# Reload stability

For a pending poverty scene:
- `eventId` and `variantId` remain authoritative;
- reload must preserve that gameplay identity;
- a future materialized candidate policy must not silently choose a different gameplay variant.

If candidate identity itself is persisted later, it is presentation-only.

# Missing GIF / animations off

For every semantic variant slot:
- one missing candidate -> try remaining pool members;
- all GIFs missing -> current `stage.outside` or `stage.room` static presentation;
- animations off -> static/text fallback;
- gameplay choices/effects remain identical.

# Production summary

| Family | Gameplay events | Semantic variant slots | Target candidates/slot | Static family |
| --- | ---: | ---: | ---: | --- |
| street helpful | 1 | 2 | 3 | outside |
| street neutral | 1 | 2 | 3 | outside |
| street pressure | 1 | 2 | 3 | outside |
| cheap lodging v2 | 1 | 4 | 3 | room |

Total planned semantic pool slots: **10**.

All media variation remains presentation-only.
