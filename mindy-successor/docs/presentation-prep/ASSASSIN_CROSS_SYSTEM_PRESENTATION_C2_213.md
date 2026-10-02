# C2-213 — Assassin Guard / Tavern / Merchant cross-system presentation preparation

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation & Media
Assassin cross-system consumer IDs: PENDING_RUNTIME_ID

This preparation uses only identities already shipped by the existing Guard, Tavern, and Merchant runtimes. It does not create an Assassin consumer or event.

## Shipped Guard input vocabulary

Exact shipped Guard identity:
- career: `guard`
- evidence fact: `cargo-pass-evidence`
- access items remain Guard-owned:
  - `guard_badge`
  - `guard_sealed_pass`

Safe presentation concept:
- formal-event security context;
- document/pass review;
- route/access evidence observed from the Assassin side only if a future runtime explicitly consumes it.

Must not imply:
- Guard authority granted to Assassin;
- Guard item ownership;
- wanted/crime system;
- arrest/combat state;
- Palace access.

Future Assassin consumer/event:
- `PENDING_RUNTIME_ID`

## Shipped Tavern input vocabulary

Exact shipped Tavern identity:
- career: `tavern`
- information fact: `rumour-confirmed`
- existing information remains Tavern-owned route evidence, not a global currency.

Safe presentation concept:
- confirmed rumour;
- neutral meeting point;
- route timing or public information.

Must not imply:
- Assassin owns Tavern information state;
- automatic handler/informant relationship;
- paid intelligence market;
- guaranteed target identity;
- generic reputation or rumour currency.

Future Assassin consumer/event:
- `PENDING_RUNTIME_ID`

## Shipped Merchant input vocabulary

Exact shipped Merchant identities available as existing context include:
- career: `merchant`
- fact: `delivery-recorded`
- Merchant cross-system inputs already consume exact shipped Guard/Tavern facts without transferring ownership.

Safe Assassin presentation concept:
- delivery timing;
- material movement;
- manifest/document context;
- public trade route observation.

Must not imply:
- Merchant inventory transfer;
- universal black-market shop;
- Assassin credit/debt;
- illegal-goods law;
- generic patron/economy system.

Future Assassin consumer/event:
- `PENDING_RUNTIME_ID`

## Existing presentation consumer preservation

Assassin prep must not replace or relabel:
- `job/guard/result/default`
- `job/tavern/result/default`
- `job/merchant/result/default`
- their existing stage / relationship / item / state / event presentation namespaces.

A future Assassin cross-system presentation ID must be Assassin-owned and derive from one exact future runtime event identity.

## Palace firewall

None of the shipped Guard/Tavern/Merchant identities above grants Assassin Palace access.

In particular:
- `cargo-pass-evidence` is Guard-local evidence;
- Merchant delivery context is not a Palace credential;
- Tavern rumour is not a Palace invitation;
- ordinary Assassin work does not unlock Palace.

C2-213 reserves no:
- `palace/*` presentation ID;
- Palace event;
- court credential;
- covert Palace route.

## Production binding rule

A future production cross-system Assassin surface requires:
1. exact future Assassin event/consumer ID;
2. exact shipped input identity;
3. exact runtime condition linking them.

Without all three, the matrix state remains:
- `PENDING_RUNTIME_ID`

## Firewall

C2-213 creates no cross-career gameplay fact, contract state, Guard authority, Tavern information system, Merchant economy rule, Palace state, combat/crime mechanic, Save/RNG, ending eligibility/reward or Meta.
