# C2-226 — Prostitute / Secret Debt presentation firewall

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media

## Core product separation

Voluntary ordinary Prostitute career:
- one of the 10 ordinary jobs;
- player-selected;
- preserves agency;
- ordinary work is not forced Night;
- ordinary career progression belongs to the heroine.

Secret Debt:
- separate hidden career;
- additional to the 10 ordinary jobs;
- debt/bound state;
- ordinary jobs blocked while bound;
- mandatory forced Night obligation;
- its own outcomes and presentation consumers.

Presentation must keep these identities visibly and semantically separate.

## Ordinary Prostitute presentation must not imply Secret Debt

The shipped ordinary surfaces:
- `job/prostitute/result/default`
- four `job/prostitute/shift/<season>/default`
- `ending/prostitute/hard-work`

must not visually imply:
- debt lock;
- lender/owner state;
- forced-night scheduling;
- blocked exits;
- mandatory escort;
- debt ledger;
- debt payment;
- inability to refuse;
- hidden-career activation;
- next-day forced-work penalty.

## Ordinary work imagery

Safe ordinary voluntary-career imagery:
- room/work-space preparation;
- professional greeting;
- terms/boundaries;
- ordinary professional reset;
- seasonal environment.

Unsafe Secret-Debt crossover unless exact hidden-career consumer exists:
- locked-door control;
- owner-issued schedule;
- compulsory Night board;
- debt balance as work condition;
- escorted mandatory departure;
- visible loss of ordinary-job choice.

## Night distinction

Voluntary Prostitute Night:
- future optional continuation;
- requires exact voluntary Night consumer;
- can be declined;
- remains `PENDING_RUNTIME_ID`.

Secret Debt forced Night:
- mandatory hidden-career obligation;
- separate NightFlow/runtime authority;
- exact mechanics not owned by Chat 2.

Do not reuse one semantic ID/media family for both.

## Adult/intimacy distinction

Adult/intimacy presentation does not erase the voluntary/forced distinction.

Future voluntary adult Prostitute media requires:
- exact voluntary consumer;
- adult-only gate;
- semantic presentation identity.

Secret Debt adult-themed presentation requires:
- exact Secret Debt consumer;
- hidden-career authority;
- separate semantic identity.

A sexually explicit or adult-only asset must never be used as the sole visual signal that distinguishes voluntary from forced context.

## Client vs owner/lender

Voluntary-career client:
- professional interaction concept;
- may be declined/renegotiated if future runtime says so;
- not automatically relationship/romance.

Secret Debt owner/lender:
- belongs to hidden-career state;
- must not be represented as an ordinary client;
- must not reuse recurring-client presentation identity.

## Items/documents

Voluntary-career:
- future contract/token/evidence items remain professional-route concepts.

Secret Debt:
- debt ledger/contract/control documents are hidden-career concepts.

Presentation must not visually convert a voluntary contract/token into debt ownership.

## Route outcomes

Voluntary draft routes:
- Independent House;
- Elite Clientele;
- Network / Protection.

Secret Debt outcomes:
- paid_freedom;
- bound_life;
- takeover.

These route families remain distinct.

C2-226 does not allow:
- Independent House == paid_freedom;
- Network / Protection == takeover;
- Elite Clientele == bound_life.

## Palace / ordinary Hard Work

Secret Debt outcomes do not count toward the 10 ordinary-career Palace Hard Work prerequisite.

Presentation must not imply that a Secret Debt ending replaces:
- `ending.prostitute.hard-work`
or any other ordinary-career Hard Work completion.

## Cross-system knowledge

The Prostitute draft mentions possible Secret Debt knowledge in a future Network/Protection route.

That does not authorize:
- Secret Debt state access;
- takeover readiness;
- debt clearing;
- hidden-career ending eligibility.

Any such future cross-system presentation requires an exact runtime consumer.

## Binding labels

Current ordinary Prostitute surfaces:
- `LIVE_BOUND`

Future voluntary adult/client/Night/route surfaces:
- `PENDING_RUNTIME_ID`

Secret Debt semantics attached to ordinary Prostitute presentation:
- `NO_AUTHORITY_NOT_BINDABLE`

## Firewall

C2-226 changes no Secret Debt state machine, ordinary-job lock, forced Night, debt values, owner/lender state, next-day modifiers, Save/RNG, economy, adult gate, ending eligibility/reward, Meta or Palace unlock.
