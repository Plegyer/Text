# Adult Content Core Direction v1

Status: **PRODUCT DIRECTION**
Date: 2026-10-02

This document records product direction for future authored/presentation planning. It does not itself create runtime IDs, thresholds, conditions, mechanics, consent state, Lust state, NightFlow rules, ending eligibility, or media bindings.

## Core direction

Adult/intimacy content is a **core presentation and authored-content family** for the intended game, not a rare side category.

Expected high-level routing:
- most non-killing endings should have adult/intimacy payoff presentation;
- work events above an authoritative future Lust/content-routing threshold commonly route to adult/intimacy variants;
- Night events commonly have adult/intimacy variants;
- voluntary-career, relationship and route-specific adult scenes should have enough authored/presentation variation that the game does not collapse to a few generic repeated scenes.

## Authority boundary

This direction does **not** choose:
- exact Lust thresholds;
- exact runtime event IDs;
- exact scene counts;
- exact partner/creature identities;
- exact consent-state mechanics;
- exact explicit presentation gating;
- exact ending IDs/rewards/Meta;
- exact NightFlow ownership.

Those remain runtime/design authority and must be marked `PENDING_RUNTIME_ID` / `OPEN` until separately published.

## Content-model rule

Separate at least:
- ordinary safe/non-explicit context;
- adult/intimacy context;
- route-specific adult/intimacy variants;
- ending adult/intimacy payoff;
- voluntary Night adult/intimacy variants;
- coercive/dependency routes, which must never be silently treated as equivalent to voluntary adult content.

For authored-content planning, use neutral production labels and non-graphic descriptions. The purpose is coverage, routing and semantic identity, not erotic prose.

## Reuse rule

Reuse is allowed for nearby semantically equivalent scenes, but adult/intimacy content must not be compressed into a tiny handful of generic assets or copy blocks if that would erase route, partner, profession, Night or ending distinctions.

## Current implementation state

Current Git may expose only a subset of dedicated adult/intimacy consumers. Missing future consumers should be represented as planning identities with `PENDING_RUNTIME_ID`; do not bind them to unrelated existing production IDs merely to avoid a pending state.
