# C2-203 — Artist/Geisha RU/EN accessibility and static-safety gate

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Final authority: exact frozen Artist/Geisha runtime required by C2-204.

## Required final properties

Every published Artist/Geisha presentation override must preserve:
- project-owned static media;
- non-empty RU alt;
- non-empty EN alt;
- non-empty RU caption;
- non-empty EN caption;
- deterministic semantic identity;
- animation-off static resolution;
- missing optional motion fallback to static;
- zero locale/media mutation of Save state.

Any focusable Artist-specific status/relationship/item UI added at final binding must be keyboard reachable, have an accessible name and visible focus styling. C2-203 adds no new focusable Artist UI, so it preserves the existing keyboard/focus infrastructure rather than inventing controls.

## Preparation regression

`artist-geisha-presentation-v18-prep-c2-193-203.test.ts` verifies the activation baseline and preparation contract:
- ordinary result, four seasonal Work slots and Hard Work remain exact/static-safe;
- current RU/EN alt/caption pairs are complete;
- only live `novice` materializes from the prepared stage family on the activation baseline;
- mentor/item/readiness semantics stay inactive without live catalog backing;
- the exact four seasonal contract event IDs are preserved as preparation vocabulary;
- Artist School event set remains empty;
- three winter rehearsal source sequences are project-owned, export-ready source frames with `gifPath: null`;
- no fabricated GIF path is accepted;
- Court Invitation semantic IDs remain Artist-owned and not Palace IDs;
- no new public complex Artist ending is published;
- presentation resolution leaves a representative Save unchanged;
- existing global `:focus-visible`, focus-transfer and media-error fallback infrastructure remains present.

## Final expansion at C2-204

After Chat 1 freezes Artist/Geisha runtime, the final production regression must expand to every exact live:
- career stage;
- mentor relationship stage/event;
- item/capability;
- seasonal/performance/festival/salon event;
- exact Artist-local night/status event if one exists;
- advanced readiness fact;
- exact cross-system event if one exists;
- authorized School consumer event if one exists;
- Hard Work ending surface.

No final production override may survive without one exact frozen runtime backing identity.

## Preservation gate

Final C2-204 must also verify:
- Lumber presentation consumers remain reachable;
- Satyr Maid presentation consumers remain reachable;
- Undead Farm presentation consumers remain reachable;
- Tavern presentation consumers remain reachable;
- Hunter presentation consumers remain reachable;
- Guard presentation consumers remain reachable;
- Merchant frozen presentation namespace has zero exact collision;
- Forest/Activity presentation consumers remain reachable.

## Firewall

Accessibility/media behavior remains presentation-only. C2-203 changes no gameplay, Save/RNG, economy, School/NightFlow/Activity mechanics, relationship state, ending eligibility/reward or Meta.
