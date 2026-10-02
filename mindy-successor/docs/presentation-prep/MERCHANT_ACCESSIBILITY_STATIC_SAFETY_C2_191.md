# C2-191 — Merchant RU/EN accessibility and static-safety gate

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Final authority: exact frozen Merchant runtime required by C2-192.

## Required final properties

Every published Merchant presentation override must have:
- project-owned static media;
- RU non-empty alt;
- EN non-empty alt;
- RU non-empty caption;
- EN non-empty caption;
- deterministic semantic identity;
- animation-off static resolution;
- missing optional motion fallback to static;
- no locale/media mutation of Save state.

Focusable Merchant status/relationship/item UI added in the final binding must use visible `:focus-visible` styling and keyboard-reachable semantics. Presentation status must remain descriptive rather than mechanic-producing.

## Preparation regression

`merchant-presentation-v17-prep-c2-181-191.test.ts` now locks the current activation baseline:
- ordinary Merchant result + four seasonal shifts + Hard Work remain static-safe;
- current RU/EN alt/caption pairs are complete;
- provisional stage IDs are deterministic but only live `stall-hand` materializes;
- supplier/item/status semantics remain inactive until exact runtime backing exists;
- Merchant School event set stays empty;
- Hard Work remains the only public Merchant ending;
- repeated presentation resolution is deterministic;
- presentation resolution leaves a representative Save byte-for-byte unchanged.

## Final expansion at C2-192

After Chat 1 freezes Merchant runtime, the final regression must expand from the shipped/prep baseline to every exact live Merchant:
- career stage;
- supplier stage/event;
- trade/liquidity/crisis event;
- item/capability;
- cross-system event;
- readiness state;
- authorized School consumer event, if any;
- ending surface.

No production override may survive the final audit without one exact frozen runtime backing identity.

The final candidate must also verify that already shipped Lumber, Satyr Maid, Undead Farm, Tavern, Hunter, Guard, Forest/Activity, and full-roster Hard Work presentation consumers remain reachable.
