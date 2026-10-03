# C2-206 — Assassin ordinary seasonal Work preservation

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Prep branch: `chat2/assassin-presentation-prep-v19`

## Preserved ordinary surfaces

The shipped Assassin ordinary presentation set remains exactly:
- `job/assassin/result/default`
- `job/assassin/shift/spring/default`
- `job/assassin/shift/summer/default`
- `job/assassin/shift/autumn/default`
- `job/assassin/shift/winter/default`
- `ending/assassin/hard-work`

C2-206 does not add advanced contract or route presentation IDs.

## Static source preservation

Project-owned static sources:
- `assets/presentation/career-assassin-result.svg`
- `assets/presentation/career-assassin-shift-spring.svg`
- `assets/presentation/career-assassin-shift-summer.svg`
- `assets/presentation/career-assassin-shift-autumn.svg`
- `assets/presentation/career-assassin-shift-winter.svg`

Hard Work continues to reuse the ordinary result source.

## Ordinary Work semantics

`assassin.shift` remains:
- 1 Energy;
- ordinary paid city-side work;
- compatible with surveillance, delivery, route preparation, cleanup and similar low-level covert work;
- not automatically a lethal contract;
- not an Activity/infiltration run;
- not an advanced contract-phase command.

Seasonal presentation may show changes in:
- clothing;
- crowd density;
- visibility;
- route preparation;
- weather;
- ordinary equipment handling.

It must not convert an ordinary seasonal shift into:
- a target scene;
- a combat encounter;
- a contract execution scene;
- a Guard chase;
- a Palace infiltration;
- an advanced ending route.

## Existing accessibility intent

The current shipped seasonal alt text already enforces a useful visual boundary:
- equipment/preparation is shown;
- no target is depicted;
- season is visible in the environment;
- gameplay outcome is not redefined by presentation.

C2-206 preserves that contract.

## Future advanced-surface separation

If future Assassin runtime publishes exact contract/performance identities, those surfaces must be distinct from:
- `job/assassin/shift/<season>/default`

Advanced contract phases may reuse compatible visual motifs, but they must not replace ordinary Work slots or imply that every shift participates in a major contract.

## Motion boundary

Current project-owned animation-source manifest has no Assassin-specific motion sequence.

Therefore:
- all shipped Assassin ordinary Work remains static-safe;
- no GIF/video path is claimed;
- no placeholder motion path is introduced.

## Firewall

C2-206 changes no:
- work unlock;
- wage;
- Energy cost;
- stat effect;
- career counter;
- contract state;
- combat state;
- Save/RNG;
- Activity/NightFlow/School mechanics;
- ending eligibility/reward;
- Meta.
