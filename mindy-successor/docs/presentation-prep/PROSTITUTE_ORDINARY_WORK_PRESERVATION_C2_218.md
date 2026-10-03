# C2-218 — Prostitute ordinary voluntary Work preservation

Status: COMPLETE
Owner: Chat 2 / Presentation + Media
Production binding: existing shipped ordinary Work only

## Preserved production surfaces

The ordinary voluntary Prostitute presentation set remains exactly:
- `job/prostitute/result/default`
- `job/prostitute/shift/spring/default`
- `job/prostitute/shift/summer/default`
- `job/prostitute/shift/autumn/default`
- `job/prostitute/shift/winter/default`
- `ending/prostitute/hard-work`

C2-218 does not add client-flow, adult/intimacy, Night, relationship, item, route, School or advanced-ending production IDs.

## Ordinary Work identity

`prostitute.shift` remains:
- ordinary voluntary career work;
- selectable rather than forced;
- 1 Energy;
- independent of Secret Debt forced-night semantics;
- compatible with explicit player agency and boundaries;
- not automatically a Night continuation;
- not automatically a recurring-client scene;
- not automatically romance;
- not automatically an adult/intimacy media consumer.

## Seasonal visual preservation

### Spring
Existing semantic surface:
- `job/prostitute/shift/spring/default`

Safe visual meaning:
- room/work-space preparation;
- changing client/traveler season implied only by environment;
- professional setup.

Must not imply:
- specific client;
- adult scene;
- romance;
- forced work;
- Secret Debt.

### Summer
Existing semantic surface:
- `job/prostitute/shift/summer/default`

Safe visual meaning:
- ordinary room/work-space preparation;
- seasonal demand/crowd context can be environmental only.

Must not imply:
- high-demand gameplay bonus;
- adult-only route;
- Night consumption;
- elite-client gate.

### Autumn
Existing semantic surface:
- `job/prostitute/shift/autumn/default`

Safe visual meaning:
- ordinary preparation;
- formal/event-season context may be suggested without asserting status or client identity.

Must not imply:
- elite-client state;
- Palace access;
- formal-attire capability;
- adult-only content.

### Winter
Existing semantic surface:
- `job/prostitute/shift/winter/default`

Safe visual meaning:
- ordinary preparation in a quieter/private work setting;
- winter environment only.

Must not imply:
- economic coercion;
- poverty-forced work;
- regular-client state;
- debt lock;
- forced Night.

## Ordinary result

`job/prostitute/result/default` remains the neutral completion surface for ordinary voluntary work.

It may communicate:
- shift complete;
- room reset;
- professional routine;
- return to ordinary day flow.

It must not communicate:
- client satisfaction score;
- romance;
- consent-state persistence;
- explicit adult outcome;
- Night continuation;
- debt ownership.

## Hard Work separation

`ending/prostitute/hard-work` remains the only shipped public ending presentation.

It reuses the ordinary result static source and stays distinct from future draft routes:
- Independent House;
- Elite Clientele;
- Network / Protection.

C2-218 does not reinterpret Hard Work as any of those routes.

## Adult-media gate

Future adult/intimacy media is a first-class planned presentation family, but it is not attached to ordinary default Work IDs by this prep.

A future production adult-media consumer must have:
1. an exact authoritative runtime/content consumer;
2. an explicit adult-only presentation gate;
3. a distinct semantic presentation identity;
4. static/accessibility fallback appropriate to that exact consumer.

Without those, the status remains:
- `PENDING_RUNTIME_ID`

## Static fallback preservation

Required project-owned static sources remain:
- `career-prostitute-result.svg`
- `career-prostitute-shift-spring.svg`
- `career-prostitute-shift-summer.svg`
- `career-prostitute-shift-autumn.svg`
- `career-prostitute-shift-winter.svg`

No shipped static source is replaced by a shopping-list GIF path.

## Secret Debt firewall

Ordinary seasonal presentation must never visually imply:
- owner control;
- debt ledger binding;
- locked career access;
- mandatory Night;
- next-day forced-work penalty;
- inability to leave.

Those semantics belong to a separate Secret Debt system if/when its exact runtime presentation consumers exist.

## Firewall

C2-218 changes no:
- action cost/unlock/wage;
- career counter;
- client state;
- consent mechanics;
- NightFlow;
- Secret Debt;
- Save/RNG;
- economy;
- School;
- ending eligibility/reward;
- Meta;
- Palace access.
