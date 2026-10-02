# C2-186 — Merchant poverty / liquidity presentation boundary

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/merchant-complete-v15@4276e52f9f6d588ea0efc1bbd9b00eb1e7a67273`
Final authority: exact frozen Merchant runtime required by C2-192.

## Published poverty identity

Current runtime contract publishes:
- event: `merchant.poverty.liquidity-response`
- facts:
  - `low-liquidity-handled`
  - `poverty-response-recorded`

Presentation prepares qualitative state surfaces:
- `job/merchant/state/low-liquidity-handled`
- `job/merchant/state/poverty-response-recorded`

They materialize only when the live runtime contains the backing identities.

## Player-facing boundary

Presentation may acknowledge:
- cheap/street living context already present in the save;
- limited liquid cash;
- commission or barter framing if the live event text uses it;
- that a low-liquidity situation was handled or recorded.

Presentation must not imply:
- free or automatic debt clearing;
- guaranteed profit;
- a loan, credit line, or hidden balance sheet;
- housing payment forgiveness;
- Secret Debt progress/clearance;
- inventory-capacity relief;
- money mutation caused by the presentation itself.

## Ownership firewall

Merchant presentation reads context; it does not own poverty mechanics. The runtime contract explicitly keeps the event free of money, housing, debt, Secret Debt, credit, or lock-state writes.

Accordingly, visual/status language must remain qualitative. “Liquidity handled” means the Merchant-local event state was resolved, not that the player became solvent or debt-free.

## Static fallback

Both qualitative states fall back to `job/merchant/result/default` until exact frozen-runtime presentation overrides are audited.

No economy, housing, debt, Save/RNG, ending, Meta, School, or career mechanics are modified here.
