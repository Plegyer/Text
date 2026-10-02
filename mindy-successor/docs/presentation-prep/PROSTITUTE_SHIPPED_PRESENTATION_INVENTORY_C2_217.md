# C2-217 — Prostitute shipped presentation and media inventory

Status: COMPLETE
Owner: Chat 2 / Presentation + Media
Branch: `chat2/prostitute-presentation-prep-v20`
Queue: C2-217..228
Activation checkpoint: `8c8b88e2518549cf43e1373638216e4a072c0484`

This inventory records only identities and media already shipped on the activation checkpoint. Future adult/intimacy, client, Night, item, route and advanced-ending consumers remain non-authoritative until an exact future runtime/content activation publishes them.

## Shipped gameplay identity

Action:
- `prostitute.shift`
- label: Professional shift
- mode: normal
- Energy cost: 1
- money cost: 0
- voluntary ordinary-career description explicitly preserves player agency and boundaries
- unlock:
  - Sexuality >= 55
  - Charm >= 40
  - Sociability >= 35
  - OR calendar Year >= 3
- wage:
  - base 15
  - Sexuality factor 0.35
  - Charm factor 0.30
  - Manners factor 0.20
  - Endurance factor 0.15
- current effect:
  - increments `prostitute.completed_shifts`
- shipped seasonal scene IDs:
  - `spring.default`
  - `summer.default`
  - `autumn.default`
  - `winter.default`

Career:
- career id: `prostitute`
- label: Professional
- initial/current shipped stage: `new-independent-worker`
- shipped stages: only `new-independent-worker`
- shipped transitions: none

Ending:
- `ending.prostitute.hard-work`
- shipped condition: 50 completed Prostitute shifts
- reward: `prostitute.hardwork.compat`
- Meta reward: `hardWork:prostitute`
- this is the only shipped public Prostitute ending identity at this checkpoint

## Shipped presentation identities

Ordinary result:
- `job/prostitute/result/default`
- static: `assets/presentation/career-prostitute-result.svg`
- accessibility key: `presentation.static.career.prostitute.result.alt`

Seasonal ordinary Work:
- `job/prostitute/shift/spring/default`
  - static: `assets/presentation/career-prostitute-shift-spring.svg`
- `job/prostitute/shift/summer/default`
  - static: `assets/presentation/career-prostitute-shift-summer.svg`
- `job/prostitute/shift/autumn/default`
  - static: `assets/presentation/career-prostitute-shift-autumn.svg`
- `job/prostitute/shift/winter/default`
  - static: `assets/presentation/career-prostitute-shift-winter.svg`

Hard Work:
- `ending/prostitute/hard-work`
- static: `assets/presentation/career-prostitute-result.svg`
- accessibility key: `presentation.static.prostitute-ending-hard-work.alt`

Current production presentation authority therefore contains exactly six Prostitute semantic surfaces:
- one ordinary result;
- four seasonal ordinary Work surfaces;
- one Hard Work ending surface.

## Fallback map

Current required fallback behavior:
- ordinary seasonal Work -> its exact project-owned seasonal static;
- ordinary result -> `career-prostitute-result.svg`;
- Hard Work -> reuses `career-prostitute-result.svg`;
- no advanced client/Night/route/adult semantic surface exists in production to receive a fallback.

Future adult/intimacy media must not be attached directly to:
- `job/prostitute/result/default`;
- `job/prostitute/shift/<season>/default`;
unless a future authoritative runtime/content gate explicitly makes that consumer identity adult-only.

## Accessibility state

Current production localization already contains RU/EN alt and caption pairs for:
- ordinary result;
- Spring shift;
- Summer shift;
- Autumn shift;
- Winter shift;
- Hard Work ending.

The shipped ordinary seasonal descriptions are non-explicit room/work-space preparation. They do not assert:
- a client identity;
- romance;
- a consent state machine;
- a Night continuation;
- Secret Debt;
- forced work;
- a late-career route.

## Current project-owned media

Project-owned Prostitute static media exists for:
- ordinary result;
- Spring;
- Summer;
- Autumn;
- Winter.

The current project-owned animation source manifest contains no Prostitute-specific animation sequence.

Therefore C2-217 claims:
- no production GIF/video path;
- no adult motion binding;
- no client motion binding;
- no Night motion binding.

## GIF inventory boundary

`docs/GIF_ASSET_SHOPPING_LIST_v1.txt` is a planning aid only.

It names candidate future Prostitute assets including:
- room preparation;
- adult client greeting / terms;
- boundary check;
- house management;
- elite arrival;
- protection network;
- private-room ambient;
- adult/intimacy variants;
- regular-client / elite-client variants;
- voluntary Night continuation;
- arrival / aftercare-reset;
- advanced ending concepts.

None of those shopping-list filenames is a production presentation ID, runtime consumer, or shipped media binding.

## Current School preparation authority

Existing School material:
- `docs/school-prep/SCHOOL_PROSTITUTE_PREPARATION_V1.md`
- `docs/school-prep/SCHOOL_PROSTITUTE_REACTIVE_DEPTH_V1.md`

Prepared existing School identities:
- Rhetoric & Social;
- Literacy & Numbers;
- Etiquette & Presentation;
- Arts & Performance;
- Body Confidence.

Current School preparation explicitly keeps:
- confidence/presentation distinct from consent;
- no Lust rule;
- no consent mechanic;
- no client state;
- no NightFlow change;
- no career gate;
- no numeric threshold/public result;
- no wage/progression mechanic.

## Draft-only vocabulary

`docs/CAREER_PROSTITUTE_DRAFT_v0.md` is design context only.

Draft-only concepts include:
- Known Professional;
- Established;
- Veteran;
- Independent House;
- Elite Clientele;
- Network / Protection;
- Outcome-ready;
- recurring clients and client tiers;
- optional Night continuation;
- Formal Attire;
- Staff/private-room key;
- Contract/token;
- Evidence/document;
- advanced Independent House / Elite Clientele / Network-Protection outcomes;
- explicit adult presentation.

C2-217 does not reserve runtime or production presentation IDs for any of these concepts.

## Secret Debt separation

The shipped ordinary Prostitute presentation is voluntary ordinary-career presentation.

C2-217 must not visually or semantically merge it with Secret Debt:
- no debt lock;
- no owner state;
- no forced Night;
- no next-day Energy penalty;
- no coercive default;
- no debt-specific presentation reuse.

## Binding state

LIVE_BOUND:
- six shipped Prostitute presentation surfaces listed above.

PENDING_RUNTIME_ID:
- all future adult/intimacy consumers;
- client-flow consumers;
- recurring-client / elite-client / relationship consumers;
- Night continuation consumers;
- late-route consumers;
- item/capability consumers;
- School reaction consumers;
- advanced public ending consumers.

NO_AUTHORITY_NOT_BINDABLE:
- ordinary-career Secret Debt lock/owner/forced-night presentation;
- universal consent state machine;
- universal reputation/status system;
- automatic romance;
- Palace access;
- generic patron system.

## Ownership firewall

C2-217 changes no:
- gameplay conditions/effects/rewards;
- career state/progression;
- client state;
- consent mechanics;
- Secret Debt;
- NightFlow;
- School mechanics;
- Save/RNG;
- economy;
- ending eligibility/reward;
- Meta;
- Palace access.
