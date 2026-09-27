# Ordinary Poverty EN Copyedit v1

Status: text-only editorial pass over the full 84-key ordinary-poverty English localization payload, checked against the Russian source and item-173 source-copy recommendations.

Source:
`prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`.

Review scope:
- 14 event titles;
- 20 variant bodies;
- 24 choice labels;
- 24 choice-resolution texts;
- 2 media alts;
- 84/84 EN entries reviewed.

No gameplay ID, condition, effect, reward, tuning value, RNG rule, NightFlow rule, media identity, or save-state field changes in this document.

## Editorial goals

English should read as natural game prose rather than literal implementation notes. The primary cleanup removes internal phrases such as “initial tuning”, “locked economy value”, “Product lock”, “mechanical penalty”, “context event”, and “inventory item” from player-facing resolution copy.

The translation keeps the Russian source’s restraint: ordinary poverty may be tiring, exposed, cramped, or occasionally helpful without implying Secret Debt, coercive ownership, or moral judgment.

## Exact-key replacements

Only the keys below need replacement. Every other EN entry in the 84-key payload is approved unchanged by this pass.

| Exact key | Replacement EN |
| --- | --- |
| `event.poverty-street-production.helpful-summer.variant.default.text` | Before the street settles for the night, a nearby stall needs one last crate moved under the awning. It is a brief job with no questions and no obligations attached. |
| `event.poverty-street-production.helpful-summer.choice.take-errand.text` | You carry the crate under cover and earn a small payment for a few minutes of work. |
| `event.poverty-street-production.neutral-autumn.choice.settle-in.text` | You keep the dry corner. The night passes without unexpected help and without a new problem. |
| `event.poverty-street-production.pressure-winter.variant.default.text` | The stones hold the cold longer than the daylight. You can remain under the overhang or keep walking and give up part of your rest. |
| `event.poverty-street-production.pressure-winter.choice.take-shelter.text` | You stay beneath the overhang and keep as much rest as the night allows. |
| `event.poverty-street-production.pressure-winter.choice.keep-moving.text` | You trade rest for movement and reach morning more tired. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.market-closing.text` | As the market shutters come down, someone needs a canvas rolled and tied before the evening rain. The job is brief and binds you to nothing. |
| `event.poverty-street-production-v2.helpful-summer-shade.variant.late-shade.text` | A strip of shade remains beside a closed stall. You can take one last small task or keep the quiet place for the night. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.take-small-task.text` | You finish the brief job and receive a small payment. |
| `event.poverty-street-production-v2.helpful-summer-shade.choice.keep-place.text` | You keep your resting spot and let the small job pass. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.variant.drizzle.text` | A light autumn drizzle sends late pedestrians beneath the arcade. They pass without comment, leaving wet footprints and sharing the shelter with you for a few minutes. |
| `event.poverty-street-production-v2.neutral-autumn-crossing.choice.wait-out-night.text` | You let the street settle around you. The night brings neither help nor a new problem. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.crosswind.text` | A hard crosswind cuts through the lane and strips the warmth from every exposed corner. A recessed doorway nearby offers shelter. |
| `event.poverty-street-production-v2.pressure-winter-wind.variant.long-gusts.text` | Long gusts rattle shutters along the lane. You can stay sheltered or keep walking and give up some of tomorrow’s strength. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.use-recess.text` | You settle into the recessed doorway and wait out the strongest gusts. |
| `event.poverty-street-production-v2.pressure-winter-wind.choice.keep-walking.text` | You keep moving until the wind eases and feel the lost rest more sharply by morning. |
| `event.poverty-cheap-production.shared-quiet-autumn.variant.default.text` | The cheap lodging settles early. Thin walls carry coughs, footsteps, and the rustle of belongings, so the shared room gradually drops to a whisper. |
| `event.poverty-cheap-production.shared-quiet-autumn.choice.settle-quietly.text` | You make a little space, keep your belongings close, and let the room gradually settle. |
| `event.poverty-cheap-production-v2.shared-room-seasons.title` | A Shared Room Through the Seasons |
| `event.poverty-cheap-production-v2.shared-room-seasons.variant.shared-room.text` | The cheap shared room is plain and crowded, but it still has a roof, a door, and a place to wait out the night in relative quiet. |
| `event.poverty-cheap-production-v2.shared-room-seasons.choice.settle-in.text` | You tidy your place and let the shared room gradually wind down. |
| `event.poverty-recovery-production.small-coin-help.choice.take-coins.text` | You take only the loose coins and leave the bread where it is. The small amount makes the next few expenses a little easier. |
| `event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text` | The work takes only a few minutes. You stack the stools, sweep around the stall, and receive a small payment. |
| `event.poverty-recovery-production.herb-bundle.variant.default.text` | A small tied bundle of ordinary herbs lies beside an empty market crate. Nobody is nearby, and nothing suggests that someone is coming back for it. |
| `event.poverty-recovery-production.herb-bundle.choice.take-herb.text` | You keep the bundle of ordinary herbs and tuck it in with your things. |
| `event.poverty-recovery-production.herb-bundle.choice.leave-herb.text` | You leave the bundle where it is and continue settling in for the night without it. |
| `event.poverty-pressure-production.cold-rain.variant.default.text` | Cold spring rain reaches the curb and creeps beneath the edge of your shelter. A deeper doorway nearby offers a drier place to move. |
| `event.poverty-pressure-production.cold-rain.choice.take-doorway.text` | You move into the deeper doorway, where the rain barely reaches your clothes. |
| `event.poverty-pressure-production.cold-rain.choice.wait-it-out.text` | You stay where you are. By morning, the damp has taken more out of you and left you looking rougher. |
| `event.poverty-pressure-production.noisy-loading.choice.move-corner.text` | You leave the familiar spot and find a corner farther from the wheels, crates, and shouted counts. |
| `event.poverty-pressure-production.noisy-loading.choice.stay-put.text` | You keep your place, but the loading never lets you get proper rest before dawn. |
| `event.poverty-pressure-production.muddy-splash.variant.default.text` | A late cart clips a puddle at the wrong angle. Mud spatters the edge of your clothes before the driver even notices. |
| `event.poverty-pressure-production.muddy-splash.choice.wipe-down.text` | You spend a few minutes wiping away the worst of the mud before it can dry. |
| `event.poverty-pressure-production.muddy-splash.choice.leave-for-morning.text` | You leave the mud until morning. By the start of the new day, your clothes and appearance are noticeably worse. |
| `media.stage.outside.alt` | Street sleeping spot beneath the open sky. |
| `media.stage.room.alt` | Crowded cheap shared room used for overnight lodging. |

## Approved unchanged after review

All remaining 48 EN keys are approved unchanged.

This includes:
- titles and labels whose English is already natural and semantically faithful;
- spring/summer/winter cheap-room variants;
- neutral scene bodies that already avoid implementation language;
- concise action labels such as “Keep moving”, “Wait quietly”, and “Leave it”.

## Terminology consistency

Preferred English terminology:
- **lodging** for the system-facing place-to-sleep concept;
- **shared room** for cheap-lodging scene prose;
- **street night / sleeping outside** only where context requires it;
- **Energy** only when explicitly referring to the named stat;
- otherwise use concrete prose such as **rest**, **strength**, **fatigue**, or **tired**.

Avoid in player-facing copy:
- “initial tuning”;
- “locked balance”;
- “Product lock”;
- “mechanical penalty”;
- “context event”;
- “inventory item”;
- “required job route” unless the design itself is explicitly being explained outside the game.

## Fidelity notes

The replacements preserve the source distinctions:
- accepting a small task still reads as optional, paid, and ordinary;
- declining work remains consequence-free where the production choice is effect-free;
- free shelter remains a safer option without implying a new reward;
- bad-luck resolutions describe fatigue, Energy pressure, or Grooming pressure without inventing values;
- no lender, hidden debt, delayed obligation, or forced work is introduced.

## Mechanics firewall

These are localization-copy recommendations only. They do not alter:
- existing PR37 conditions/effects;
- money/item amounts;
- next-day modifiers;
- event history;
- cooldowns;
- RNG;
- NightFlow;
- housing state;
- Secret Debt separation.

English remains a full second locale for the same locale-neutral gameplay identities.
