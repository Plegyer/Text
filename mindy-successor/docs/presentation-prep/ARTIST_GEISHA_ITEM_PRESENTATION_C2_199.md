# C2-199 — Artist/Geisha item and capability presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/artist-geisha-complete-v16@73d328578f4d9c35e97675400edb14b2b1468493`
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Exact contract items

Current runtime contract publishes:
- `artist_formal_attire` -> capability `artist_formal_presence`
- `artist_performance_kit` -> capability `artist_performance_ready`
- `artist_invitation_token` -> capability `artist_handle_invitation`

Prepared semantic identity:
- `job/artist-geisha/item/<itemId>`

Presentation registry creates one of these item surfaces only when the live catalog actually contains that exact item id.

Every materialized Artist item surface falls back to:
- `job/artist-geisha/result/default`

No item override is published against preparation-only content.

## Formal Attire boundary

`artist_formal_attire` may visually communicate formal Artist House performance presence.

It must not imply:
- Palace access;
- universal social status;
- automatic Etiquette success;
- permanent reputation;
- guaranteed patron access;
- ending eligibility.

The contract explicitly states that `artist_formal_presence` never grants Palace access.

## Performance Kit boundary

`artist_performance_kit` may communicate readiness for exact Artist-local performance opportunities.

It must not imply:
- a generic contest engine;
- global performance rank;
- universal skill bonus;
- inventory expansion;
- automatic festival success;
- Master Artist eligibility by itself.

## Invitation Token boundary

`artist_invitation_token` is Artist-local invitation/contact evidence.

Its presentation must not imply:
- Palace unlock;
- a valid Palace credential;
- court office;
- legal immunity;
- automatic Court Invitation route completion;
- a public ending.

The contract explicitly keeps Palace access unresolved/null.

## Visual separation

Item visuals must remain separate from:
- career-stage cards;
- relationship cards;
- seasonal Work;
- Court Invitation readiness;
- Palace presentation.

A formal-looking asset cannot silently change the semantic identity of the item or route.

## Final binding rule

C2-204 must verify:
- exact item ids exist in the frozen catalog;
- exact capabilities match the frozen definitions;
- no extra Artist item presentation slot exists without runtime backing.

If an item/capability changes before freeze, stale preparation mapping must be discarded.

C2-199 changes no inventory amount, item grant condition, capability behavior, gameplay effects, economy, Save/RNG, School/NightFlow, ending eligibility/reward or Meta.
