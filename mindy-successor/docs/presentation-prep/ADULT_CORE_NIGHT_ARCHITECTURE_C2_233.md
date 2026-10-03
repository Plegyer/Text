# C2-233 — Adult core Night semantic architecture

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future adult Night IDs: PENDING_RUNTIME_ID

## Runtime ownership

Night timing/priority belongs to the Night lifecycle contract.

Target runtime phases:
- EndDayRequested
- PreLodgingForcedCheck
- LodgingResolution
- PostLodgingForcedCheck
- VoluntaryNightChoice
- NightEventResolution
- NextDayModifiersFinalized
- CalendarAdvance
- StartDay

Exact forced intercept points:
- `before_lodging`
- `after_lodging`
- `after_choice`

Chat 2 presentation consumes the runtime-selected event/choice. It does not choose or reorder these phases.

## before_lodging presentation context

Meaning:
- forced event intercepts before ordinary lodging resolution where exact runtime policy says so.

Presentation may reflect:
- lodging has not yet been resolved;
- a dependency/forced context if the event says so.

Presentation must not infer:
- rent paid;
- room privacy;
- voluntary Night availability;
- housing-specific adult scene.

Future adult/dependency consumer:
- `PENDING_RUNTIME_ID`

## after_lodging presentation context

Meaning:
- lodging context is already resolved before the forced event.

Presentation may consume exact resolved housing context only if runtime exposes it to the presentation consumer.

Presentation must not:
- duplicate lodging payment;
- choose a different housing tier;
- infer private-scene availability from asset choice.

Future adult/dependency consumer:
- `PENDING_RUNTIME_ID`

## after_choice presentation context

Meaning:
- a voluntary Night choice may already have been selected before an exact forced/interrupting event.

Presentation must preserve:
- exact runtime-selected choice/event order;
- exactly-once Night consumption;
- no duplicate event resolution.

It must not:
- substitute a different voluntary adult choice;
- silently discard runtime state;
- advance the calendar.

Future adult consumer:
- `PENDING_RUNTIME_ID`

## VoluntaryNightChoice adult family

A future voluntary adult Night choice requires:
1. exact Night choice ID;
2. exact event/consumer identity;
3. adult-content authority;
4. exact semantic presentation ID.

Presentation may provide:
- non-explicit setup;
- adult/intimacy variant;
- aftermath/reset;
- safe static fallback.

It may not:
- mutate next-day Energy;
- apply lodging payment;
- advance day;
- write relationship facts.

Status:
- `PENDING_RUNTIME_ID`

## Forced Night adult/dependency family

Forced/dependency Night remains separate from voluntary adult Night.

Required future authority:
- exact forced event;
- exact intercept point;
- suppression policy;
- exact consumer identity.

Presentation must not romanticize or relabel it as a voluntary partner/client scene.

Status:
- `PENDING_RUNTIME_ID`

## Existing exact precedents

Current shipped Night presentation already demonstrates exact runtime-owned voluntary choices, including:
- Lumber foreman professional Night;
- Satyr Maid recurring-guest Night;
- Tavern recurring-traveler Night;
- Undead Farm keeper Night.

These are non-adult precedents and remain unchanged.

## Housing coupling

Night presentation may show normal/cheap/street context only after the runtime has resolved that context.

Chat 2 does not decide:
- availability;
- payment;
- privacy eligibility;
- relationship availability;
- street penalties.

## Exactly-once rule

Presentation may render repeatedly after reload, but must remain idempotent.

It must not perform:
- calendar advance;
- rent payment;
- next-day modifier application;
- relationship progression;
- adult-router state mutation.

## Fallback

Future Night adult consumers use:
1. exact Night semantic asset;
2. Night-adult family fallback matching voluntary/dependency classification;
3. safe Night static.

Never fallback from:
- voluntary Night -> coercive/dependency;
- coercive/dependency -> voluntary Night.

## Firewall

C2-233 changes no NightFlow phase, intercept point, suppressLodgingPayment, suppressVoluntaryMenu, consumesNight, next-day effects, housing state, relationship state, Save/RNG, calendar advance or media binding.
