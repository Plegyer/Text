# TASK CHAT 3 — Lumber Integration Prep Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat3/lumber-product-next`.
Previous checkpoint is frozen for Lead review.

Locked forever for this slice:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- no milestone/relationship/season/Forest prerequisite;
- A5 boundary = `activityResult`;
- A6 rewardId = exactly `hardWork:lumber`.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — real item-capability integration audit

Create NEW files:
- `docs/lumber-prep/LUMBER_ITEM_CAPABILITY_INTEGRATION_AUDIT_v1.md`
- optional NEW test `prior-work/astra/prototype-m3.2/tests/lumber-item-capability-integration-audit.test.ts`

Compare the locked `Old Boundary Token / enter_old_boundary` design against current main:
- current `items` enum/inventory model;
- current Lumber fixture adapter worldFact;
- Forest Activity entry condition;
- acquisition/use/capability APIs actually present.

State exactly what is production-ready and what remains blocked.
Do NOT silently promote `old_boundary_token` or invent acquisition/pricing/consume rules.
If adding a test, it must pass by asserting the current boundary accurately.

## Queue item 2 — Lumber ending independence matrix

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/lumber-ending-independence.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-ending-independence.test.ts`

Cover Hard Work, Forewoman and Forest ending families independently.

Prove:
- Hard Work false at 49, true at exactly 50 with no other prerequisite;
- Forewoman route can require its own professional/School-result facts without affecting Hard Work;
- Forest ending can require Forest facts without affecting Hard Work;
- completing Forewoman/Forest does not grant `hardWork:lumber`;
- completing Hard Work grants exactly `hardWork:lumber` once;
- save/reload preserves independence and exactly-once behavior.

Do not edit existing merged Lumber definitions/runtime. After item 1 commit immediately continue to item 2.
