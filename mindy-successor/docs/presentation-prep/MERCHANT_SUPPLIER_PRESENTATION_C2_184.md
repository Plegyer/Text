# C2-184 — Merchant professional supplier relationship presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/merchant-complete-v15@4276e52f9f6d588ea0efc1bbd9b00eb1e7a67273`
Final authority: exact frozen Merchant runtime required by C2-192.

## Published relationship identity

Current Merchant runtime contract publishes:
- relationship id: `merchant.supplier`
- role: recurring supplier
- stages:
  - `introduced`
  - `professional-trust`
  - `conflict-open`
  - `utility-ready`
  - `route-resolved`

Published relationship facts include:
- `introduced-at-work`
- `professional-trust-earned`
- `conflict-opened`
- `conflict-resolved`
- `refusal-respected`
- `utility-ready`

These remain runtime-owned facts. Presentation reads them only after they exist in the live catalog/state.

## Presentation semantics

Prepared stage identity:
- `relationship/merchant-supplier/stage/<stage>`

`presentationSlots()` materializes supplier stage presentation only when the live catalog contains exact relationship `merchant.supplier` and the exact stage. Every relationship stage falls back to `job/merchant/result/default`.

No affinity meter, romance state, generic reputation score, credit privilege, price bonus, exclusive-supplier mechanic, or automatic route unlock is introduced.

## Conflict and refusal safety

Presentation may distinguish:
- conflict open;
- conflict resolved;
- professional trust;
- utility readiness;
- refusal respected.

Refusal is a professional choice state, not failure of ordinary Merchant progression. Presentation must not imply that refusing supplier utility:
- blocks `merchant.shift`;
- creates debt;
- removes money/items;
- closes Hard Work;
- commits an advanced route.

## Event-ID boundary

The published contract identifies the relationship and stages, but does not yet provide a complete authoritative list of relationship event IDs.

Therefore C2-184 does not reserve or publish guessed event semantic IDs. Exact relationship event presentation will be bound only from the frozen runtime catalog at C2-192. If live events use Merchant source-domain identities, their exact IDs must be audited from production before any override is registered.

No gameplay relationship writes, counters, choices, Save fields, economy rules, or ending behavior are modified here.
