# Ordinary Street Event Authoring Template v1

Status: reusable content-authoring unit for ordinary poverty/street events.

Do not use this template to author the one-time Secret Debt lender encounter. Secret Debt is a separate exceptional hook/state machine.

## Event identity

Required fields:
- stable event ID;
- semantic `presentationId`;
- content family: `ordinary-street`;
- optional season/context tags;
- repeatability/cooldown policy;
- authoring owner.

Do not lock canonical IDs in this template.

## Eligibility context

An event definition should declare only accepted authoritative inputs, for example:
- housing context = street;
- run/day/season context;
- money/resource state;
- public relationship fact/stage;
- owned item/capability;
- prior event history/cooldown;
- optional condition/status.

Do not read unrelated system-private counters directly.

Required invariant:
- event remains optional relative to core anti-softlock recovery;
- absence of this event cannot make the run impossible.

## Season hook

Optional but supported:
- `spring`;
- `summer`;
- `autumn`;
- `winter`;
- all-season.

Season may affect:
- eligibility;
- variant selection;
- outcome family availability;
- presentation.

Do not encode hidden random season rules outside authored conditions/history.

## Outcome family

Every ordinary street event must select at least one authored outcome from these structural families:

### Helpful

May:
- grant modest money/resource/help;
- reduce immediate poverty pressure;
- expose relationship/help hook;
- create a later opportunity.

Must not:
- become the only universal recovery path;
- silently grant Secret Debt state;
- create an unapproved permanent Meta effect.

### Neutral

May:
- trade one resource/context for another;
- reveal information;
- create relationship/story state without direct economic gain/loss;
- offer an optional next action.

### Bad

May:
- remove money/resource;
- add accepted short-term condition/next-day pressure;
- restrict a local option;
- create a follow-up problem.

Anti-softlock guard:
- cannot eliminate all reachable income/sleep progression;
- cannot force Secret Debt acceptance;
- cannot create an inevitable permanent downward spiral.

## Effect categories

Allowed only where the corresponding system already accepts the effect:
- money delta;
- inventory item add/remove;
- public/world/relationship fact publication;
- accepted short-term condition;
- next-day modifier;
- relationship hook;
- follow-up event eligibility;
- presentation-only result.

Exact magnitudes remain balance/content values and are not part of this template.

## Relationship hook

Optional fields:
- public relationship condition;
- public fact emitted;
- relationship-owned follow-up ID;
- whether relationship support is repeatable.

Ownership rule:
- street event may publish/use accepted public relationship state;
- it must not directly mutate unrelated relationship-private progression unless that relationship system owns the effect.

## Item/resource hook

Optional fields:
- item/capability eligibility;
- explicit item add/remove effect;
- resource sale/barter interaction only if separately accepted;
- exactly-once transaction ID/history.

Do not invent a generic shop or sale system from this template.

## Anti-softlock guard

Every authored event must answer:
1. Can the player still reach the next day after this outcome?
2. Does at least one reachable income/recovery path remain?
3. Does the event avoid requiring money/item the player cannot possibly obtain?
4. Does reload preserve the same committed outcome?
5. Can the event duplicate a grant/removal on retry?

If any answer is unsafe, the event is not acceptance-ready.

## Save/reload contract

Persist enough state to guarantee:
- eligibility is deterministic from authoritative state;
- selected/random variant does not reroll after commitment;
- money/resource/item effects apply once;
- cooldown/repeatability history survives reload;
- pending choice survives reload;
- next-day modifier applies once.

## Presentation contract

Required:
- semantic `presentationId` tied to event meaning, not an asset filename;
- static fallback;
- text fallback;
- optional GIF/animated asset.

Mechanics must not depend on:
- GIF presence;
- frame count;
- animation timing;
- asset-load success.

Route/event semantics remain stable if media is replaced.

## Suggested authoring shape

```text
OrdinaryStreetEvent
  id
  presentationId
  season/context conditions
  repeatability/cooldown
  eligibility[]
  variants/outcomes[]
    family = helpful | neutral | bad
    conditions[]
    effects[]
    nextDayModifiers[]
    relationshipHooks[]
    itemResourceHooks[]
  antiSoftlock
  fallbackPresentation
```

This is an authoring template, not a schema lock.

## Acceptance checklist

Before an event is promoted to production:
- ordinary street context is real and reachable;
- outcome family is explicit;
- all effects use accepted system-owned primitives;
- exact numbers have Product/balance authority where needed;
- anti-softlock guard passes;
- save/reload/idempotency is tested;
- presentation fallback exists;
- Secret Debt remains separate.

## Explicit non-goals

This template does not define:
- a canonical street event;
- lender/Secret Debt content;
- exact chance/weights;
- exact money/resource deltas;
- NPCs/prose;
- a poverty ending;
- final art.
