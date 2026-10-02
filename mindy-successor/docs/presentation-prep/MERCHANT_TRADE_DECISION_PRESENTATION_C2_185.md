# C2-185 — Merchant trade and route decision presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/merchant-complete-v15@4276e52f9f6d588ea0efc1bbd9b00eb1e7a67273`
Final authority: exact frozen Merchant runtime required by C2-192.

## Published trade event vocabulary

Current contract publishes these Merchant-local event identities:
- `merchant.trade.appraisal`
- `merchant.trade.records`
- `merchant.trade.delivery`
- `merchant.trade.shortage`

Related published qualitative facts include:
- `appraisal-recorded`
- `manifest-verified`
- `delivery-recorded`
- `shortage-handled`
- `risk-accepted`

Presentation prepares semantic state surfaces under:
- `job/merchant/state/<state>`

A state slot appears only when the live runtime catalog actually contains the backing identity.

## Event fallback

Live events with `sourceDomain: "merchant"` now use `job/merchant/result/default` as their presentation fallback rather than the generic town fallback.

This keeps Merchant event presentation visually tied to the career while still requiring exact live event IDs before production overrides are added.

## Decision-language boundary

Presentation may communicate:
- appraisal uncertainty;
- record/manifest verification;
- delivery timing;
- supplier or route pressure;
- shortage context;
- a narrow risk choice.

Presentation must not imply that any of these surfaces are:
- a global price simulation;
- a hidden market index;
- a universal profit forecast;
- a persistent inventory-capacity system;
- a credit/debt subsystem;
- a law/crime subsystem;
- guaranteed margin or guaranteed delivery success.

The player-facing distinction is qualitative decision context, not invented economy mechanics.

## Contract and supplier wording

“Contract” or “manifest” copy may describe terms, records, obligations, or evidence already present in the event. It must not create a legal immunity, automatic payment, enforceable price lock, or Palace privilege absent from runtime.

## Freeze rule

Exact event IDs, variants, choices, media overrides, and localized event copy must be re-audited from the frozen production catalog at C2-192. Preparation constants do not by themselves authorize production event overrides.

No gameplay effects, money writes, inventory writes, price calculation, debt, Save/RNG, ending eligibility, or Meta behavior is changed here.
