# C2-219 — Prostitute professional/client-flow presentation vocabulary

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Production client-flow IDs: PENDING_RUNTIME_ID

This file prepares presentation vocabulary only. It does not create a client state machine, consent system, relationship state, payment flow, NightFlow rule, or adult-media binding.

## Prepared professional flow

Conceptual sequence:
- arrival
- terms
- boundaries
- work
- result
- departure
- aftermath

Every phase remains `PENDING_RUNTIME_ID` until future runtime/content authority publishes an exact consumer.

## Arrival

Presentation meaning:
- adult client arrival;
- professional greeting;
- room/work-space readiness;
- transition from public to private professional context.

May show:
- doorway/reception;
- coat or personal-item handoff;
- room preparation;
- neutral professional body language.

Must not imply:
- automatic acceptance of the client;
- romance;
- explicit adult content;
- recurring-client identity;
- payment completion;
- consent persistence.

## Terms

Presentation meaning:
- discussion of scope, timing, privacy, price/conditions or practical expectations.

May show:
- seated conversation;
- written note;
- schedule;
- payment/contract token as neutral context only if future authority publishes such an item/flow.

Must not imply:
- exact price rule;
- haggling system;
- binding contract mechanic;
- client tier;
- consent state machine;
- adult-media gate.

## Boundaries

Presentation meaning:
- professional confirmation of limits and conditions before any private continuation.

May show:
- pause;
- verbal check-in;
- changed arrangement;
- cancellation/decline.

Must not imply:
- universal consent meter;
- permanent consent flag;
- romance;
- Lust mechanic;
- morality judgment;
- automatic failure for refusal.

Boundaries are presentation semantics only until runtime authority publishes exact choices/state.

## Work

Presentation meaning:
- professional private work phase.

Default prep behavior:
- keep production-neutral;
- no adult media attached to ordinary `prostitute.shift` defaults;
- future adult/intimacy media requires a distinct authoritative adult-only consumer.

Possible future visual families:
- non-explicit private work;
- adult/intimacy variant;
- regular-client variant;
- elite-client variant.

All remain:
- `PENDING_RUNTIME_ID`

## Result

Presentation meaning:
- private work phase complete;
- practical result or transition back to professional routine.

May show:
- room reset;
- note/payment handling;
- schedule update;
- neutral post-work state.

Must not imply:
- satisfaction score;
- reputation gain;
- relationship progression;
- adult-content completion flag;
- Night continuation.

The shipped ordinary result `job/prostitute/result/default` remains separate and authoritative.

## Departure

Presentation meaning:
- client leaves;
- worker closes or resets the room;
- ordinary session boundary.

May show:
- doorway;
- coat/item return;
- room closure;
- schedule note.

Must not imply:
- relationship ending;
- romance;
- client ban;
- Night ending mechanics;
- forced departure.

## Aftermath

Presentation meaning:
- professional reset/reflection/administration after a client interaction.

May show:
- cleaning/reset;
- bookkeeping;
- safety note;
- scheduling;
- support/contact check.

Must not imply:
- trauma state;
- coercion;
- reputation meter;
- debt;
- forced Night;
- automatic relationship write.

## Refusal-safe behavior

Any future refusal/cancel presentation should remain a valid professional branch.

Presentation must not label refusal as:
- failure;
- immorality;
- romance rejection;
- lost career;
- debt trigger;
- Secret Debt activation.

## Adult-media gate

The conceptual Work phase is the only phase where future adult/intimacy media may be relevant by default, but only after exact authority exists.

Required future binding:
1. exact runtime/content consumer ID;
2. explicit adult-only gate;
3. exact semantic presentation ID;
4. appropriate static/accessibility fallback;
5. clear separation from ordinary default Work and from Secret Debt forced-night semantics.

Arrival, Terms, Boundaries, Result, Departure and Aftermath remain independently useful non-explicit presentation surfaces.

## Reuse rule

Reusable visual families may share project-owned media where semantics match, but semantic IDs must remain exact-runtime-derived.

C2-219 does not reserve IDs such as:
- `prostitute.client.arrival`;
- `prostitute.client.terms`;
- `prostitute.client.boundaries`;
- `prostitute.client.work`;
- `prostitute.client.result`;
- `prostitute.client.departure`;
- `prostitute.client.aftermath`.

All such concepts remain:
- `PENDING_RUNTIME_ID`

## Secret Debt separation

This voluntary professional flow must not inherit:
- owner control;
- debt-lock visuals;
- mandatory scheduling;
- forced Night;
- next-day debt penalty;
- inability to leave.

Those belong to a separate system and require separate exact consumers.

## Firewall

C2-219 creates no gameplay/client/consent/payment/relationship/Night/Secret-Debt state, Save/RNG, economy rule, ending eligibility/reward, Meta or Palace access.
