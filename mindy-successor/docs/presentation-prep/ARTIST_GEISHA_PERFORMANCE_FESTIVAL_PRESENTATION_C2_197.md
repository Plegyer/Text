# C2-197 — Artist/Geisha performance, festival and salon presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/artist-geisha-complete-v16@73d328578f4d9c35e97675400edb14b2b1468493`
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Exact contract seasonal windows

The current runtime contract publishes four Artist-local event identities:
- `artist-geisha.season.spring-program`
- `artist-geisha.season.summer-evening`
- `artist-geisha.season.autumn-festival`
- `artist-geisha.season.winter-salon`

These are Artist-local calendar windows, not a global festival or contest subsystem.

## Deterministic fallback treatment

Presentation preparation now recognizes `sourceDomain: artist-geisha` events as Artist House surfaces.

When a live catalog eventually contains one of these exact events, its generated event presentation falls back to:
- `job/artist-geisha/result/default`

This creates a deterministic static-safe path without publishing an override for an event that is not yet live on the preparation baseline.

Exact event presentation IDs still come from the live catalog/variant identity through the shared event presentation mapper.

## Visual distinction

Prepared treatment:
- Spring Program: rehearsal/program preparation, ordinary professional staging;
- Summer Evening: evening performance context without creating NightFlow semantics;
- Autumn Festival: performance/festival framing without rank, bracket or contest score;
- Winter Salon: small formal salon/performance context without patron-system or Palace implications.

The four surfaces must remain visually distinct from ordinary seasonal Work IDs:
- `job/artist-geisha/shift/<season>/default`

Advanced event cards may reference the same season but may not replace ordinary Work slots.

## No global contest semantics

Presentation must not imply:
- contest rank;
- universal reputation meter;
- global festival schedule;
- tournament/bracket state;
- hidden score;
- guaranteed patron gain;
- automatic route transition;
- ending eligibility.

The runtime contract explicitly leaves `contestSubsystem` unresolved/null.

## Salon/Night boundary

`artist-geisha.season.winter-salon` is an Artist-local event identity. Its visual may be evening/salon themed, but C2-197 does not make it a NightFlow phase, voluntary-night command or new nighttime mechanic.

C2-200 owns the stricter Night/status presentation boundary.

## Static safety

Until project-owned advanced static assets are assigned, exact live Artist event surfaces fall back to the shipped Artist House ordinary-result static source through the semantic registry.

No fabricated GIF/video path is introduced.

## Firewall

C2-197 changes no seasonal trigger, event conditions/effects, counters, calendar rules, contest mechanics, Save/RNG, career progression, School/NightFlow/Activity state, ending eligibility/reward or Meta.
