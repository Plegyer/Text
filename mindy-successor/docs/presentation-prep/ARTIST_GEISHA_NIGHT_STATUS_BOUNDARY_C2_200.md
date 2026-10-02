# C2-200 — Artist/Geisha night and status presentation boundary

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Runtime contract authority observed: `chat1/artist-geisha-complete-v16@73d328578f4d9c35e97675400edb14b2b1468493`
Producer head observed while preparing: `586a1388c06c306dcf9e0bbdcb915cceb6a72375`
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Current runtime authority

The runtime contract permits Artist-local evening opportunities only through existing typed Night machinery and explicitly forbids a NightFlow rewrite.

The contract currently exposes:
- career counter `night_opportunities`;
- the invariant that Artist night opportunities may use existing typed Night machinery only.

At the producer checkpoint observed for C2-200, no exact Artist-owned Night event id or Night command identity is yet published in the live runtime pack.

Therefore C2-200 creates no guessed Night presentation ID.

## Prepared night/status treatment

If frozen runtime later publishes exact Artist-local night identities, presentation may distinguish:
- rehearsal;
- private salon;
- patron dinner/contact;
- coworker gathering;
- voluntary professional relationship meeting.

These are visual treatment categories only until exact live IDs exist.

## Existing event separation

`artist-geisha.season.winter-salon` is already an exact Artist-local seasonal event identity in the runtime contract.

Its salon/evening appearance does not make it:
- a NightFlow phase;
- a voluntary-night command;
- a new lodging option;
- a new study command;
- a generic patron-system event.

Presentation keeps the seasonal event identity exact.

## Status boundary

Artist-local visual status may communicate:
- rehearsal completed/prepared;
- formal performance presence;
- professional contact;
- seasonal window;
- route/readiness evidence.

It must not imply:
- global reputation;
- social rank;
- universal patron status;
- Palace access;
- NightFlow state that runtime did not publish;
- ending eligibility.

## Time-choice boundary

The career draft describes night study competing with professional evening opportunities. Chat 2 does not implement that competition.

Presentation may show a scene selected by runtime, but may not:
- consume time;
- schedule an event;
- advance the date;
- spend Energy;
- block School;
- create NightFlow branches.

## Career separation

Evening Artist House visuals remain distinct from:
- Tavern night presentation;
- Satyr Maid night/service presentation;
- voluntary Prostitute night/client presentation;
- Palace presentation.

Shared evening lighting or formal interiors do not merge semantic identities.

## Final binding rule

C2-204 may bind night/status surfaces only to exact frozen production identities. If the frozen runtime still contains no Artist-owned Night event/command identity, no dedicated Artist Night presentation slot is published.

C2-200 changes no NightFlow mechanics, calendar state, lodging, School study, career facts, relationship state, Save/RNG, economy, ending behavior or Meta.
