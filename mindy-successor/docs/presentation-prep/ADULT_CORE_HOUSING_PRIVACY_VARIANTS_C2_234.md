# C2-234 — Adult core housing/privacy presentation variants

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future housing-adult consumers: PENDING_RUNTIME_ID

## Authority boundary

Current housing direction distinguishes:
- normal room;
- cheap lodging;
- street / no lodging.

Housing affects Night/privacy availability under product/balance authority.

Chat 2 presentation may render an already-resolved housing context. It does not decide:
- cost;
- availability;
- privacy access;
- relationship access;
- adult-content eligibility;
- Night-study access;
- penalties.

## Normal room

Prepared presentation context:
- private indoor room;
- predictable professional/private setting;
- storage/preparation-compatible environment.

Potential future adult/private presentation:
- only after an exact runtime consumer confirms both housing context and adult/private eligibility.

Must not imply:
- adult scene automatically available;
- relationship partner present;
- romance;
- free lodging;
- passive stat benefit.

Status:
- `PENDING_RUNTIME_ID`

## Cheap lodging

Prepared presentation context:
- paid but less private/shared/thin-partition environment;
- altered private-scene presentation where runtime allows.

Possible future presentation outcomes:
- public/common-area alternative;
- reduced-privacy private setup;
- unavailable private continuation reflected by safe non-adult fallback.

Chat 2 does not decide which content is blocked.

Must not imply:
- cheap lodging always forbids adult/relationship content;
- cheap lodging always allows it;
- reduced privacy changes gameplay stats by presentation alone.

Status:
- `PENDING_RUNTIME_ID`

## Street / no lodging

Prepared presentation context:
- outdoor/public/poverty Night;
- no normal private-room framing unless runtime explicitly supplies a separate location.

Adult/private relationship presentation must not silently use:
- bedroom/private-room imagery;
- paid-room fallback;
- indoor partner assumptions.

Possible future alternatives:
- public conversation;
- route-specific safe contact;
- no adult/private variant.

Status:
- `PENDING_RUNTIME_ID`

## Housing context vs adult eligibility

Housing context is not an adult-content router.

A future adult scene requires:
1. exact event/choice/route consumer;
2. exact resolved housing context where relevant;
3. adult-content authority;
4. exact semantic presentation identity.

Housing alone must never create an adult consumer.

## Privacy semantic axis

Prepared presentation-only labels:
- `privacy.private`
- `privacy.limited`
- `privacy.public`

These are architecture vocabulary, not runtime IDs.

They may help future fallback selection after runtime exposes an exact housing/privacy state.

Current status:
- `PENDING_RUNTIME_ID`

## Relationship/partner boundary

A resolved private room does not imply:
- partner present;
- romance;
- consent;
- relationship stage;
- adult scene.

Relationship identity must come from exact runtime authority.

## Prostitute boundary

Voluntary Prostitute work may use professional room imagery, but ordinary work presentation remains separate from housing/Night privacy.

Do not infer:
- current lodging;
- adult eligibility;
- Independent House;
from ordinary `job/prostitute/*` presentation assets.

## Secret Debt boundary

Street/no-lodging presentation can coexist with Secret Debt eligibility under separate runtime rules.

Chat 2 must not:
- display debt activation merely because street context is visible;
- treat debt/forced Night as a housing fallback;
- merge street adult context with dependency semantics.

## Safe fallback

Future housing-aware adult consumer fallback order:
1. exact semantic + exact housing context;
2. same adult semantic with compatible family/housing fallback;
3. safe static appropriate to resolved housing;
4. text-only only if no project-owned safe static exists.

Never fallback:
- street -> private-room adult image;
- cheap -> normal-room adult image if privacy meaning changes materially;
- dependency -> voluntary private scene.

## Candidate-number firewall

Housing balance numbers remain candidate/balance authority.

Presentation docs must not encode:
- room prices;
- Energy penalties;
- Grooming penalties;
- exact access thresholds.

## Firewall

C2-234 changes no lodging cost/payment, Night availability, privacy mechanic, street penalty, relationship availability, adult router, Secret Debt, Save/RNG, economy, ending or media sourcing.
