# C2-220 — Prostitute adult/intimacy semantic family inventory

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Production adult/intimacy consumer IDs: PENDING_RUNTIME_ID

Adult/intimacy presentation is an intended first-class content family, but current runtime/content authority does not publish exact adult Prostitute consumer IDs. This inventory therefore prepares reusable semantic families without reserving gameplay or presentation IDs.

## Authority boundary

Authoritative production today:
- six shipped ordinary Prostitute presentation surfaces;
- no adult-only Prostitute runtime/content consumer;
- no Prostitute-specific animation sequence in the production animation-source manifest.

Planning-only sources:
- `GIF_ASSET_SHOPPING_LIST_v1.txt`
- current-main `GIF_ASSET_SHOPPING_LIST_v2.txt`

Shopping-list filenames are asset-planning labels only. They do not create:
- runtime IDs;
- presentation IDs;
- client state;
- Night state;
- relationship state;
- adult-routing conditions.

## First-class adult/intimacy families

### Professional work — reusable adult variants

Prepared semantic family:
- voluntary adult professional-work scene;
- reusable visual variants A/B/C/D or later equivalents;
- client identity may remain anonymous unless a future runtime publishes one.

Required future gate:
- exact adult-only work consumer;
- explicit content eligibility/router owned by runtime/content authority;
- exact semantic presentation ID.

Must not bind to:
- `job/prostitute/shift/<season>/default`
- `job/prostitute/result/default`

without an authoritative adult-only gate.

Status:
- `PENDING_RUNTIME_ID`

### New-client adult variant

Prepared semantic family:
- first/new adult client;
- distinct from the generic professional-work pool only if runtime publishes an exact client category.

Must not imply:
- recurring relationship;
- romance;
- permanent client record;
- reputation change.

Status:
- `PENDING_RUNTIME_ID`

### Regular-client adult variant

Prepared semantic family:
- repeat professional client;
- reusable adult presentation pool distinct from generic anonymous work.

Must not imply:
- romance;
- friendship;
- exclusivity;
- patronage;
- consent persistence.

Status:
- `PENDING_RUNTIME_ID`

### Elite/high-status adult variant

Prepared semantic family:
- adult scene attached to a future exact high-status/elite-client consumer.

Must not imply:
- Palace access;
- universal status;
- court privilege;
- romance;
- automatic Elite Clientele route readiness.

Status:
- `PENDING_RUNTIME_ID`

### Seasonal-demand adult variant

Prepared semantic family:
- future season-specific adult presentation chosen only after an exact adult work consumer and seasonal condition both exist.

Examples of planning categories:
- festival/high-demand context;
- winter recurring-client context.

Season alone must never convert the ordinary seasonal default slot into an adult scene.

Status:
- `PENDING_RUNTIME_ID`

### Private-room adult variant

Prepared semantic family:
- adult private-work scene after a future exact professional flow reaches a private-work consumer.

Must not imply:
- ownership of a room;
- private-room key capability;
- Independent House;
- forced confinement.

Status:
- `PENDING_RUNTIME_ID`

### Voluntary Night adult variant

Prepared semantic family:
- separate optional Night continuation;
- reusable Night adult variants.

Required future gate:
- exact voluntary Night choice/consumer;
- explicit adult-only gate;
- preserved ordinary NightFlow semantics.

Must not inherit Secret Debt forced-night semantics.

Status:
- `PENDING_RUNTIME_ID`

### Relationship adult variant

Prepared semantic family:
- adult scene attached to a future exact relationship route.

Required future authority:
- exact relationship ID;
- exact stage/choice;
- exact adult-content consumer.

Must not infer a relationship from a client interaction.

Status:
- `PENDING_RUNTIME_ID`

### Adult ending-layer variant

Prepared semantic family:
- optional adult visual layer after an exact future ending commitment, only where that ending family explicitly authorizes such presentation.

It must not:
- create ending eligibility;
- replace the ending identity;
- create a reward;
- turn Hard Work into an adult ending automatically.

Status:
- `PENDING_RUNTIME_ID`

## Non-explicit companion families

The adult family must coexist with non-explicit presentation so production has robust fallback/choice coverage.

Prepared companion semantics:
- room preparation;
- client arrival;
- terms discussion;
- boundary check;
- result/reset;
- departure;
- aftermath/reset;
- house management;
- elite arrival;
- protection-network coordination;
- private-room ambient.

These are useful even when adult presentation is unavailable, disabled, unsupported, or not selected by an exact future consumer.

## Reusable-variant rule

A future adult presentation family may expose multiple media variants under one exact semantic consumer, provided:
- all variants represent the same runtime outcome;
- selection is deterministic under the presentation system's existing rules;
- variant choice does not change gameplay;
- every variant has an accessible fallback;
- no variant silently changes client/relationship/ending identity.

## Adult-only gating requirements

Before any adult media is production-bound, future authority must supply:
1. an exact runtime/content consumer;
2. an explicit adult-only presentation gate;
3. a semantic presentation ID derived from that consumer;
4. a non-adult static or neutral fallback where required;
5. RU/EN accessibility metadata;
6. deterministic resolution;
7. Save-neutral presentation behavior.

C2-220 does not decide the gate implementation.

## Ordinary-default protection

The following current IDs remain neutral:
- `job/prostitute/result/default`
- `job/prostitute/shift/spring/default`
- `job/prostitute/shift/summer/default`
- `job/prostitute/shift/autumn/default`
- `job/prostitute/shift/winter/default`

No adult shopping-list asset may be attached to those defaults merely because the career is adult-themed.

## Secret Debt firewall

Voluntary adult/intimacy families must remain distinct from:
- debt activation;
- forced Night;
- owner control;
- locked route;
- debt payment ledger;
- mandatory aftermath/fatigue.

Secret Debt adult-themed planning assets do not authorize voluntary-career consumers, and voluntary-career assets do not authorize Secret Debt consumers.

## No invented IDs

C2-220 does not reserve production IDs for:
- adult work;
- new client;
- regular client;
- elite client;
- seasonal adult work;
- private-room adult work;
- Night adult continuation;
- relationship adult scene;
- adult ending layer.

Every one remains:
- `PENDING_RUNTIME_ID`

## Firewall

C2-220 creates no gameplay/content router, Lust rule, client/relationship/consent state, NightFlow mechanic, Secret Debt state, Save/RNG rule, economy rule, ending eligibility/reward, Meta or Palace access.
