# Ordinary Poverty Localization Source Inventory v2

Status: item 136 inventory of the **merged PR #37 ordinary-poverty production slice** on current `main`.

Scope excludes Secret Debt entirely.

Observed integration:
- PR #37 merge commit: `9c994934152c2195ed17e6a18fdd1a301e27852c`;
- production packs: 6;
- ordinary-poverty event identities: 14;
- event variant identities: 20;
- existing static fallback references: street -> `stage.outside`, cheap lodging -> `stage.room`.

## Localization classification

The PR #37 packs predate the RU+EN Product lock and are English-only.

Classification in this inventory:
- **RU_READY** — a Russian source string already exists for the production identity.
- **EN_READY** — the existing PR #37 English string is suitable as the English locale source.
- **FALLBACK_DEBT** — a required locale is absent from the production content and must rely on migration fallback until authored.

At this snapshot:
- every inventoried PR #37 player-facing string is **EN_READY**;
- Russian source coverage is **FALLBACK_DEBT** for all 82 localized text fields;
- no current PR #37 event field is classified RU_READY yet;
- item 137 is the bounded migration that removes this Russian fallback debt without touching mechanics.

Russian remains the authoritative source language for new/rewritten content after migration.

## Deterministic localization key convention

Use the Lead localization bundle shape from merged PR #41:

`strings[key] = { ru, en }`.

Keys are derived from existing locale-neutral gameplay identity:

- event title: `event.<eventId>.title`;
- variant text: `event.<eventId>.variant.<variantId>.text`;
- choice label: `event.<eventId>.choice.<choiceId>.label`;
- choice text: `event.<eventId>.choice.<choiceId>.text`.

No localized gameplay event is created.

## Semantic presentation convention

Existing ordinary-poverty event variants resolve to:

`location/town/event/<clean-event-id>/<variant-id>`.

The semantic presentation identity is locale-neutral and survives localization unchanged.


# Street

## Pack `poverty-street-production`

Source: `prior-work/astra/prototype-m3.2/content/packs/poverty-street-production.json`  
Git blob: `5f8b58050b7724007aea4c990748052cf4020cba`

### `poverty-street-production.helpful-summer`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-street-production.helpful-summer.title` | A small paid errand | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-street-production.helpful-summer.variant.default.text` | Before the street settles for the night, a nearby stall needs one last crate carried under cover. The work is brief and anonymous. | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-errand` label | `event.poverty-street-production.helpful-summer.choice.take-errand.label` | Take the short errand | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-errand` text | `event.poverty-street-production.helpful-summer.choice.take-errand.text` | You move the crate and receive a small payment. The amount is initial tuning rather than a locked economy value. | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-resting` label | `event.poverty-street-production.helpful-summer.choice.keep-resting.label` | Keep your place | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-resting` text | `event.poverty-street-production.helpful-summer.choice.keep-resting.text` | You keep the safer sleeping spot and let the errand pass. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-street-production-helpful-summer/default`;

### `poverty-street-production.neutral-autumn`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-street-production.neutral-autumn.title` | A quiet corner after closing | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-street-production.neutral-autumn.variant.default.text` | A shop awning leaves a dry strip of pavement after closing. Nobody offers help and nobody drives you away; for tonight, that is enough. | EN_READY / FALLBACK_DEBT(ru) |
| choice `settle-in` label | `event.poverty-street-production.neutral-autumn.choice.settle-in.label` | Settle in quietly | EN_READY / FALLBACK_DEBT(ru) |
| choice `settle-in` text | `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | You keep the dry corner without gaining or losing anything beyond the ordinary street-night cost. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-street-production-neutral-autumn/default`;

### `poverty-street-production.pressure-winter`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-street-production.pressure-winter.title` | Cold pavement | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-street-production.pressure-winter.variant.default.text` | The stones keep the day's cold. You can stay tucked beneath an overhang or keep moving and arrive at morning more exhausted. | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-shelter` label | `event.poverty-street-production.pressure-winter.choice.take-shelter.label` | Stay under the overhang | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-shelter` text | `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | You choose the free, safer resolution and avoid adding another penalty to the ordinary street-night pressure. | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-moving` label | `event.poverty-street-production.pressure-winter.choice.keep-moving.label` | Keep moving | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-moving` text | `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | You trade rest for motion. The added next-day Energy pressure is initial tuning, not a locked balance value. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-street-production-pressure-winter/default`;

## Pack `poverty-street-production-v2`

Source: `prior-work/astra/prototype-m3.2/content/packs/poverty-street-production-v2.json`  
Git blob: `59f5928be3b1d08fe118b97d781811a30135e64e`

### `poverty-street-production-v2.helpful-summer-shade`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-street-production-v2.helpful-summer-shade.title` | Shade before the shutters close | EN_READY / FALLBACK_DEBT(ru) |
| variant `market-closing` text | `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | As the market shutters come down, someone needs a canvas rolled and tied before the evening heat turns to rain. It is a short, anonymous job. | EN_READY / FALLBACK_DEBT(ru) |
| variant `late-shade` text | `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | A strip of shade survives beside a closed stall. A last small task is still available, but keeping the quiet place for the night is equally possible. | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-small-task` label | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.label` | Take the small task | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-small-task` text | `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | You finish the brief job and receive a small payment. Its amount is initial tuning, not a locked economy value. | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-place` label | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.label` | Keep your place | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-place` text | `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | You keep the resting spot and let the small job pass without cost. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing`;
- `location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade`;

### `poverty-street-production-v2.neutral-autumn-crossing`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-street-production-v2.neutral-autumn-crossing.title` | Footsteps under the arcade | EN_READY / FALLBACK_DEBT(ru) |
| variant `drizzle` text | `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | A light autumn drizzle sends late pedestrians beneath the arcade. They pass without comment, leaving only wet footprints and a little borrowed shelter. | EN_READY / FALLBACK_DEBT(ru) |
| variant `dry-arcade` text | `event.poverty-street-production-v2.neutral-autumn-crossing.variant.dry-arcade.text` | The arcade stays dry tonight. Shops are closed, footsteps fade, and the street offers a rare hour that asks nothing from you. | EN_READY / FALLBACK_DEBT(ru) |
| choice `wait-out-night` label | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.label` | Wait quietly | EN_READY / FALLBACK_DEBT(ru) |
| choice `wait-out-night` text | `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | You let the street settle around you. Nothing is gained, but nothing extra is taken either. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle`;
- `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade`;

### `poverty-street-production-v2.pressure-winter-wind`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-street-production-v2.pressure-winter-wind.title` | Wind through the lane | EN_READY / FALLBACK_DEBT(ru) |
| variant `crosswind` text | `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | A hard crosswind cuts through the lane and makes every exposed corner feel colder. A recessed doorway nearby offers the safer choice. | EN_READY / FALLBACK_DEBT(ru) |
| variant `long-gusts` text | `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | Long gusts rattle shutters along the lane. You can stay tucked away or keep moving and pay for it in tomorrow's energy. | EN_READY / FALLBACK_DEBT(ru) |
| choice `use-recess` label | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.label` | Use the recessed doorway | EN_READY / FALLBACK_DEBT(ru) |
| choice `use-recess` text | `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | You choose the free sheltered option and avoid adding more pressure to the ordinary street-night penalty. | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-walking` label | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.label` | Keep walking | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-walking` text | `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | You stay in motion until the wind eases. The extra next-day Energy pressure is initial tuning rather than a Product lock. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind`;
- `location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts`;

# Cheap lodging

## Pack `poverty-cheap-production`

Source: `prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production.json`  
Git blob: `8bb1eb6b4bbc8de8e39f9327fdeb2bb8f8801aa1`

### `poverty-cheap-production.shared-quiet-autumn`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-cheap-production.shared-quiet-autumn.title` | Thin walls, early quiet | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | The cheap lodging settles early. Thin walls carry every cough and footstep, so the shared room agrees on quiet before anyone starts an argument. | EN_READY / FALLBACK_DEBT(ru) |
| choice `settle-quietly` label | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.label` | Keep the shared quiet | EN_READY / FALLBACK_DEBT(ru) |
| choice `settle-quietly` text | `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | You make space, keep your belongings close, and let the room settle without adding another cost or penalty. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-cheap-production-shared-quiet-autumn/default`;

## Pack `poverty-cheap-production-v2`

Source: `prior-work/astra/prototype-m3.2/content/packs/poverty-cheap-production-v2.json`  
Git blob: `87f84d06254afa78fc297728a354048e61ba520e`

### `poverty-cheap-production-v2.shared-room-seasons`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-cheap-production-v2.shared-room-seasons.title` | A room shared by the season | EN_READY / FALLBACK_DEBT(ru) |
| variant `spring-window` text | `event.poverty-cheap-production-v2.shared-room-seasons.variant.spring-window.text` | Spring air slips through a cracked window in the shared room. Someone has wedged it open with a chipped cup, and nobody wants to argue with the first mild night. | EN_READY / FALLBACK_DEBT(ru) |
| variant `summer-heat` text | `event.poverty-cheap-production-v2.shared-room-seasons.variant.summer-heat.text` | The cheap room holds the day's summer heat. Bedrolls are spaced as far apart as the floor allows, and everyone agrees that the open window belongs to everybody. | EN_READY / FALLBACK_DEBT(ru) |
| variant `winter-stove` text | `event.poverty-cheap-production-v2.shared-room-seasons.variant.winter-stove.text` | A small stove ticks in the corner while winter coats hang from every spare peg. The room is crowded, warm enough, and quieter than the street outside. | EN_READY / FALLBACK_DEBT(ru) |
| variant `shared-room` text | `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | The cheap shared room is plain and crowded, but it is still a roof, a door, and a place to sleep without adding another street-night risk. | EN_READY / FALLBACK_DEBT(ru) |
| choice `settle-in` label | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.label` | Settle in | EN_READY / FALLBACK_DEBT(ru) |
| choice `settle-in` text | `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | You keep your space tidy and let the shared room wind down. No extra cost or penalty is added by this context event. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window`;
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat`;
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove`;
- `location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room`;

# Recovery/help

## Pack `poverty-recovery-production`

Source: `prior-work/astra/prototype-m3.2/content/packs/poverty-recovery-production.json`  
Git blob: `b3463d81753576410aa0ac38061ea540e3d8350f`

### `poverty-recovery-production.small-coin-help`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-recovery-production.small-coin-help.title` | Coins left with the bread | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-recovery-production.small-coin-help.variant.default.text` | A paper parcel of yesterday's bread has been left on a public ledge with a few loose coins beside it and no name attached. | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-coins` label | `event.poverty-recovery-production.small-coin-help.choice.take-coins.label` | Take the loose coins | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-coins` text | `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | You take only the loose coins. The small amount is initial tuning and is not required for ordinary recovery. | EN_READY / FALLBACK_DEBT(ru) |
| choice `leave-them` label | `event.poverty-recovery-production.small-coin-help.choice.leave-them.label` | Leave them | EN_READY / FALLBACK_DEBT(ru) |
| choice `leave-them` text | `event.poverty-recovery-production.small-coin-help.choice.leave-them.text` | You leave the coins for whoever needs them next and keep your place for the night. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-recovery-production-small-coin-help/default`;

### `poverty-recovery-production.short-cleanup`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-recovery-production.short-cleanup.title` | One last sweep | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-recovery-production.short-cleanup.variant.default.text` | A closing stall has one small cleanup left: stack two stools, sweep a narrow strip, and carry a bucket to the drain. | EN_READY / FALLBACK_DEBT(ru) |
| choice `do-cleanup` label | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.label` | Do the short cleanup | EN_READY / FALLBACK_DEBT(ru) |
| choice `do-cleanup` text | `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | The work takes only a few minutes and pays a small tunable amount without becoming a required job route. | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-resting` label | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.label` | Keep resting | EN_READY / FALLBACK_DEBT(ru) |
| choice `keep-resting` text | `event.poverty-recovery-production.short-cleanup.choice.keep-resting.text` | You decline the extra work and preserve your resting spot without penalty. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-recovery-production-short-cleanup/default`;

### `poverty-recovery-production.herb-bundle`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-recovery-production.herb-bundle.title` | A forgotten herb bundle | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-recovery-production.herb-bundle.variant.default.text` | A small tied bundle of ordinary herbs has been forgotten beside an empty market crate. Nothing marks it as anyone's special property. | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-herb` label | `event.poverty-recovery-production.herb-bundle.choice.take-herb.label` | Take the herb bundle | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-herb` text | `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | You keep the ordinary herb bundle. Its count is initial tuning and uses the existing inventory item only. | EN_READY / FALLBACK_DEBT(ru) |
| choice `leave-herb` label | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.label` | Leave it | EN_READY / FALLBACK_DEBT(ru) |
| choice `leave-herb` text | `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | You leave the bundle where it is and continue the night without relying on item assistance. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-recovery-production-herb-bundle/default`;

# Pressure/bad-luck

## Pack `poverty-pressure-production`

Source: `prior-work/astra/prototype-m3.2/content/packs/poverty-pressure-production.json`  
Git blob: `ac9f7acbd6a4f4206be6993350f954eeebc5e451`

### `poverty-pressure-production.cold-rain`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-pressure-production.cold-rain.title` | Cold rain at the curb | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-pressure-production.cold-rain.variant.default.text` | Cold spring rain reaches the curb and creeps beneath the edge of your shelter. A deeper doorway remains open if you move now. | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-doorway` label | `event.poverty-pressure-production.cold-rain.choice.take-doorway.label` | Move to the deeper doorway | EN_READY / FALLBACK_DEBT(ru) |
| choice `take-doorway` text | `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | You take the safer free option and avoid adding another penalty to the ordinary street night. | EN_READY / FALLBACK_DEBT(ru) |
| choice `wait-it-out` label | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.label` | Wait it out | EN_READY / FALLBACK_DEBT(ru) |
| choice `wait-it-out` text | `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | You stay where you are. The extra fatigue and rough appearance are initial tuning, not locked balance. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-pressure-production-cold-rain/default`;

### `poverty-pressure-production.noisy-loading`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-pressure-production.noisy-loading.title` | Loading carts before dawn | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-pressure-production.noisy-loading.variant.default.text` | A loading crew starts earlier than expected. Wheels, crates, and shouted counts make the corner useless for quiet sleep. | EN_READY / FALLBACK_DEBT(ru) |
| choice `move-corner` label | `event.poverty-pressure-production.noisy-loading.choice.move-corner.label` | Move to a quieter corner | EN_READY / FALLBACK_DEBT(ru) |
| choice `move-corner` text | `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | You give up the familiar spot but avoid adding more fatigue. | EN_READY / FALLBACK_DEBT(ru) |
| choice `stay-put` label | `event.poverty-pressure-production.noisy-loading.choice.stay-put.label` | Stay put | EN_READY / FALLBACK_DEBT(ru) |
| choice `stay-put` text | `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | You keep the spot and lose some rest. The added Energy pressure is initial tuning. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-pressure-production-noisy-loading/default`;

### `poverty-pressure-production.muddy-splash`

Event classification: **EN_READY + FALLBACK_DEBT(ru)**.  
Conditions/effects/Night policy are not localization data and remain untouched.

| Field | Deterministic key | Current PR37 English | Coverage |
| --- | --- | --- | --- |
| title | `event.poverty-pressure-production.muddy-splash.title` | Mud from a passing cart | EN_READY / FALLBACK_DEBT(ru) |
| variant `default` text | `event.poverty-pressure-production.muddy-splash.variant.default.text` | A late cart catches a puddle at the wrong angle. Mud spatters the edge of your clothes before the driver even notices. | EN_READY / FALLBACK_DEBT(ru) |
| choice `wipe-down` label | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.label` | Clean up now | EN_READY / FALLBACK_DEBT(ru) |
| choice `wipe-down` text | `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | You spend a little time cleaning the worst of it and take no extra mechanical penalty. | EN_READY / FALLBACK_DEBT(ru) |
| choice `leave-for-morning` label | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.label` | Leave it for morning | EN_READY / FALLBACK_DEBT(ru) |
| choice `leave-for-morning` text | `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | You leave the mess until morning. The Grooming pressure is initial tuning and remains non-terminal. | EN_READY / FALLBACK_DEBT(ru) |

Presentation identities:
- `location/town/event/poverty-pressure-production-muddy-splash/default`;

# Coverage totals

Inventory totals from the six merged PR #37 packs:

- event identities: **14**;
- variant identities: **20**;
- localizable event fields: **82**;
- EN_READY fields: **82**;
- RU_READY fields at pre-migration source snapshot: **0**;
- FALLBACK_DEBT fields requiring Russian authoring: **82**.

The 82 fields consist of:
- 14 event titles;
- 20 variant body texts;
- 24 choice labels;
- 24 choice body texts.

## Static fallback boundary

The PR #37 packs contain no local media declarations. They reference existing catalog media:

- street/recovery/pressure -> `stage.outside`;
- cheap lodging -> `stage.room`.

Those shared assets are not duplicated per locale.

Their bespoke ordinary-poverty GIF adoption and RU/EN alt-key plan belongs to item 139.

## Mechanics firewall

Localization must not alter:
- `housingTier` conditions;
- calendar/season/day-in-year conditions;
- NightFlow trigger `nightPhase(after_lodging)`;
- `nightPolicy`;
- cooldown/maxShows/priority;
- money/item/next-day effects;
- initial-tuning values;
- event history or reload behavior.

The current values remain the PR #37 mechanics/tuning state. Translation is not authority to rebalance them.

## Ordinary poverty / Secret Debt boundary

This inventory includes only:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

It includes no:
- lender;
- debt state;
- hidden Secret Debt career;
- forced Secret Debt Night;
- Secret Debt outcome;
- Secret Debt Meta reward.

Ordinary poverty remains independently playable.

## Migration acceptance for item 137

A complete bundle should:
1. provide non-empty `ru` and `en` for all 82 deterministic keys;
2. preserve every event/variant/choice ID;
3. preserve all mechanics by keeping localization outside the pack definitions;
4. leave Secret Debt absent;
5. be projectable directly into Lead `content/localization.json` without inventing a second gameplay event.
