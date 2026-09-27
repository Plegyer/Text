# Ordinary Poverty Content Batch Plan v1

Status: independent production batches for ordinary poverty authoring.

No canonical prose, NPC identity or final numeric balance is authored here.

## Shared prerequisites

All batches assume:
- NightFlow lodging/payment/save contracts remain stable;
- money/inventory/public-fact systems remain authoritative;
- street is the zero-money fallback structure;
- Secret Debt remains a separate exceptional route;
- semantic `presentationId` + static/text fallback remains the presentation contract;
- balance values may stay parameterized until simulation/approval.

## Batch A — normal-room content

Purpose:
- make normal room a meaningful baseline housing context beyond payment.

Prerequisites:
- lodging selection/payment;
- normal housing context;
- voluntary Night menu;
- relationship/private-scene eligibility.

Owned future output files:
- `content/poverty/housing-normal.content.json`;
- `tests/poverty-housing-normal.test.ts`;
- optional presentation mapping file owned by presentation/content integration.

Authoring content:
- normal sleep variant(s);
- private/relationship access slots;
- storage/preparation-compatible hooks where accepted;
- ordinary no-poverty presentation.

Validation:
- atomic payment;
- full ordinary Night options appear where conditions allow;
- no poverty penalty is applied merely for normal room;
- reload does not duplicate payment/event.

Parameterized values:
- nightly price;
- optional content reward/effect magnitudes.

## Batch B — cheap-lodging content

Purpose:
- create a strategic lower-cost housing alternative with meaningful non-price tradeoffs.

Prerequisites:
- lodging system;
- housing-context option filtering;
- next-day modifiers/events.

Owned future output files:
- `content/poverty/housing-cheap.content.json`;
- `tests/poverty-housing-cheap.test.ts`.

Authoring content:
- cheap-lodging sleep/context variants;
- reduced/private-menu alternatives;
- small contextual event/pressure hooks;
- optional study/relationship variants if accepted.

Validation:
- cheaper relation to normal room is represented through parameterized balance data;
- cheap is viable but not identical to normal;
- no accidental universal heavy penalty;
- reload/idempotency.

Parameterized values:
- price;
- any Grooming/condition pressure;
- event weights/effects.

## Batch C — repeatable street events

Purpose:
- ordinary poverty content independent from Secret Debt.

Prerequisites:
- street housing context;
- ordinary street-event template;
- event history/RNG persistence;
- anti-softlock guard.

Owned future output files:
- `content/poverty/street-events-core.content.json`;
- `tests/poverty-street-events-core.test.ts`.

Authoring content target:
- multiple helpful outcomes;
- multiple neutral outcomes;
- multiple bad outcomes;
- relationship/item/resource hooks where accepted;
- no lender/Secret Debt event in this batch.

Validation:
- event only in accepted street context;
- committed variant does not reroll on reload;
- effects are exactly once;
- every bad outcome retains a practical recovery path;
- ordinary events do not set Secret Debt state.

Parameterized values:
- event weights;
- money/resource deltas;
- condition/next-day modifiers;
- cooldowns.

## Batch D — seasonal street variants

Purpose:
- make street poverty respond to calendar/season without changing core recovery rules.

Prerequisites:
- Batch C event host;
- calendar season condition;
- deterministic variant history.

Owned future output files:
- `content/poverty/street-events-seasonal.content.json`;
- `tests/poverty-street-events-seasonal.test.ts`.

Authoring content:
- season-specific eligibility/variants;
- seasonal helpful/neutral/bad alternatives;
- season presentation tags.

Validation:
- season condition is deterministic;
- reload cannot change season-selected committed variant;
- no season creates unavoidable softlock;
- base street fallback remains available.

Parameterized values:
- seasonal weights;
- seasonal penalty/reward magnitudes.

## Batch E — recovery/help hooks

Purpose:
- broaden normal recovery without a mandatory rescuer.

Prerequisites:
- public relationship/fact boundaries;
- economy/item effects;
- event authoring.

Owned future output files:
- `content/poverty/recovery-help.content.json`;
- `tests/poverty-recovery-help.test.ts`.

Authoring content:
- small paid-event opportunities;
- public relationship favor/help hooks;
- generic resource assistance hooks;
- follow-up eligibility.

Validation:
- no single hook is mandatory;
- helper absence cannot softlock run;
- help effects commit once;
- relationship ownership is respected;
- Secret Debt is not used as default recovery.

Parameterized values:
- help amount/value;
- cooldown/frequency;
- eligibility thresholds.

## Batch F — relationship/resource specialization

Purpose:
- attach authored poverty recovery to specific accepted relationships/items/resources after those identities exist.

Prerequisites:
- Batch E generic hooks;
- accepted relationship/item IDs;
- any accepted sale/barter rule.

Owned future output files:
- `content/poverty/recovery-specialized.content.json`;
- `tests/poverty-recovery-specialized.test.ts`.

Authoring content:
- relationship-specific help variants;
- item/resource-specific uses;
- sale/barter variants only if Product has accepted that economy path.

Validation:
- private relationship state is not read ad hoc;
- inventory transactions exactly once;
- missing optional specialized source does not remove baseline recovery.

Parameterized values:
- item/resource values;
- favor frequency;
- barter/sale values.

## Batch G — presentation/GIF follow-up

Purpose:
- specialize visuals after gameplay/content identities are stable.

Prerequisites:
- authored semantic event/housing identities from prior batches.

Owned future output files:
- presentation mapping/asset files assigned to presentation owner;
- presentation parity tests for poverty semantic IDs.

Authoring content:
- housing context visuals;
- street event families;
- seasonal variants;
- recovery/help presentation.

Validation:
- semantic `presentationId` stable;
- static/text fallback always works;
- GIF absence does not affect mechanics;
- replacement media does not change event IDs/outcomes.

Parameterized values:
- none required for mechanics;
- art production budget remains separate.

## Batch independence rules

- A/B can proceed independently once lodging context exists.
- C can proceed without Secret Debt implementation.
- D depends on C host semantics, not on final C prose.
- E can proceed with generic public hooks before specialized F identities.
- F waits for accepted relationship/item/economy identities.
- G waits for semantic content identity, not final balance lock.

## Shared validation gate

Every content batch must preserve:
- zero-money next-day progression;
- at least one reachable income/recovery path;
- save/reload idempotency;
- no Secret Debt requirement for ordinary poverty;
- no invented final numbers.
