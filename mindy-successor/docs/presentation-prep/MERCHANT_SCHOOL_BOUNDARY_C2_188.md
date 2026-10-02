# C2-188 — Merchant School presentation boundary

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media

## School authority

Merchant School presentation remains subordinate to Chat 5 School authority.

Current prepared Merchant tracks:
- Literacy & Numbers
- Rhetoric & Social
- Etiquette & Presentation
- Arcana

Existing preparation fixtures keep:
- numeric thresholds: null
- selected public fact ids: null

Chat 5 draft PR #224 likewise records Merchant School source preparation without choosing price/credit/inventory mechanics, Palace privilege, reputation, universal valuation, or direct career-transition rules.

## Presentation rule

`MERCHANT_SCHOOL_EVENT_IDS` remains intentionally empty on the preparation branch.

Chat 2 must not publish guessed `merchant.school.*` presentation identities merely because the Merchant runtime contract names School-ready facts or consumers.

The current runtime contract publishes School-ready facts:
- `school-literacy-ready`
- `school-rhetoric-ready`
- `school-etiquette-ready`
- `school-arcana-ready`

It also names candidate consumers in already-owned Merchant surfaces:
- `merchant.routes.house-ready`
- `merchant.relationship.trust`
- `merchant.trade.appraisal`
- no Etiquette consumer

These are not permission to invent a separate Merchant School event namespace.

## Consumer rule

At C2-192, exact frozen production events may receive normal Merchant presentation only if the runtime actually contains those exact consumers.

If the frozen runtime still contains no dedicated Merchant School event consumer, Merchant School presentation remains unbound and the empty set is preserved.

## Null-threshold firewall

Presentation must not infer:
- lesson counts;
- grade/certificate thresholds;
- School-produced Merchant facts;
- Palace access;
- discounts or trade bonuses;
- automatic route completion.

No School, NightFlow, Activity, career, economy, Save/RNG, ending, or Meta mechanics are changed here.
