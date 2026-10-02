# C2-181 — Merchant shipped identity inventory

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Preparation baseline: `main@d7dad76d47d71144a5788f762cedd72d9fc95ae5`
Work branch: `chat2/merchant-presentation-v17`
Merchant runtime producer branch at this checkpoint: `chat1/merchant-complete-v15@d7dad76d47d71144a5788f762cedd72d9fc95ae5`

This inventory records only identities already shipped on the activation baseline. Advanced Merchant presentation binding remains blocked until Chat 1 publishes and freezes the Merchant runtime contract.

## Shipped gameplay identities

Action:
- `merchant.shift`
- ordinary shift cost: 1 Energy
- shipped scene identities: `spring.default`, `summer.default`, `autumn.default`, `winter.default`
- presentation ownership does not alter the shipped availability, wage, stat, counter, economy, or seasonal gameplay effects.

Career:
- career id: `merchant`
- initial stage: `stall-hand`
- shipped stages: `stall-hand`
- shipped transitions: none.

Ending:
- `ending.merchant.hard-work`
- this remains the only shipped Merchant ending identity at this checkpoint.
- presentation does not alter the existing 50-shift requirement, reward, Meta record, eligibility, commitment, or completion behavior.

## Shipped presentation identities

Ordinary result:
- `job/merchant/result/default`
- static source: `assets/presentation/career-merchant-result.svg`
- accessibility key: `presentation.static.career.merchant.result.alt`

Seasonal ordinary work:
- `job/merchant/shift/spring/default` -> `assets/presentation/career-merchant-shift-spring.svg`
- `job/merchant/shift/summer/default` -> `assets/presentation/career-merchant-shift-summer.svg`
- `job/merchant/shift/autumn/default` -> `assets/presentation/career-merchant-shift-autumn.svg`
- `job/merchant/shift/winter/default` -> `assets/presentation/career-merchant-shift-winter.svg`

Hard Work:
- `ending/merchant/hard-work`
- current static source: `assets/presentation/career-merchant-result.svg`
- accessibility key: `presentation.static.merchant-ending-hard-work.alt`

Current shipped Merchant presentation authority therefore contains six semantic slots: one ordinary result, four seasonal ordinary-work slots, and the existing Hard Work ending.

## Existing preparation sources

Design draft:
- `docs/CAREER_MERCHANT_DRAFT_v0.md`
- useful only as non-authoritative design context until exact runtime identities are published.

School preparation:
- `docs/school-prep/SCHOOL_MERCHANT_PREPARATION_V1.md`
- `content/school-merchant-preparation-v1.fixture.json`
- four prepared tracks: Literacy & Numbers, Rhetoric & Social, Etiquette & Presentation, Arcana
- `selectedThreshold: null`
- `selectedPublicFactId: null`
- no Merchant mechanics/economy/public fact publication in the fixture.

School reactive depth:
- `docs/school-prep/SCHOOL_GUARD_MERCHANT_REACTIVE_DEPTH_V1.md`
- `content/school-guard-merchant-reactive-depth-v1.fixture.json`
- Merchant reactive copy exists for the same four School mappings
- thresholds/public facts remain null
- no price, credit, inventory, Palace-access, career-transition, or presentation identity is created by the fixture.

## Identities intentionally absent at C2-181

Until the frozen Merchant runtime contract publishes exact identities, presentation must treat all of the following as absent:
- recurring Merchant relationship id and relationship stages;
- Merchant-owned item ids and capability ids;
- Merchant career events beyond the ordinary shift scenes;
- trade/appraisal/contract/supplier/delivery/liquidity crisis event ids;
- cross-system Merchant event ids;
- Merchant House, Speculator/Smuggler, or Patron-of-Routes readiness ids;
- Merchant School event consumer ids;
- any Palace/future-career Merchant event id;
- any new public Merchant complex ending id.

The draft terms “Merchant House”, “Speculator / Smuggler”, “Patron of Routes”, supplier, rival, buyer, caravan leader, lender, scales, manifests, permits, and sample kits are descriptive design vocabulary only at this checkpoint. They are not presentation/gameplay identifiers and must not be reserved as semantic IDs.

## Presentation firewall

C2-181 is read-only inventory work. It changes no gameplay conditions/effects/rewards, Save/RNG, career state, School/NightFlow/Activity mechanics, economy rules, ending eligibility/rewards, Meta, or localization architecture.

Final advanced presentation binding and production reachability remain deferred to C2-192 on the exact frozen Merchant runtime head.
