# C2-190 — Merchant Hard Work / ending presentation boundary

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media

## Public ending authority

The only public Merchant ending identity authorized in the shipped game and current runtime contract is:
- `ending.merchant.hard-work`

Presentation semantic identity remains:
- `ending/merchant/hard-work`

Current static fallback remains:
- `assets/presentation/career-merchant-result.svg`

Current RU/EN accessibility keys remain:
- `presentation.static.merchant-ending-hard-work.alt`
- `presentation.static.merchant-ending-hard-work.caption`

## Advanced-route firewall

The following are career/readiness states only:
- Veteran
- Merchant House
- Speculator / Smuggler
- Patron of Routes
- Outcome-ready

No presentation code may create:
- `ending.merchant.merchant-house`
- `ending.merchant.speculator-smuggler`
- `ending.merchant.patron-of-routes`
- any equivalent public complex ending ID

unless the exact frozen Merchant runtime explicitly publishes it. The current runtime contract sets all three complex ending identities to null.

Readiness cards must not imply:
- ending eligibility;
- auto-commit;
- completion;
- reward;
- Meta reward;
- New Run persistence.

## Hard Work preservation

Presentation does not alter the existing Hard Work gameplay identity, including its 50 completed Merchant shifts, reward id, hardWork Meta record, explicit ending commitment, or completion lifecycle.

`MERCHANT_PUBLIC_ENDING_IDS` therefore contains exactly `ending.merchant.hard-work` on the preparation branch.

C2-192 must verify the frozen runtime still has this exact public-ending boundary before final production binding.
