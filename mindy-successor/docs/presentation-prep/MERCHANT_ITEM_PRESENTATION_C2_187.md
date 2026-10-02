# C2-187 — Merchant items / capabilities presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/merchant-complete-v15@4276e52f9f6d588ea0efc1bbd9b00eb1e7a67273`
Final authority: exact frozen Merchant runtime required by C2-192.

## Published item identities

Current runtime contract publishes:
- `merchant_appraisal_scales` -> capability `merchant_appraise_goods`
- `merchant_manifest_case` -> capability `merchant_verify_manifest`
- `merchant_sample_kit` -> capability `merchant_handle_samples`

Presentation prepares semantic item slots:
- `job/merchant/item/merchant-appraisal-scales`
- `job/merchant/item/merchant-manifest-case`
- `job/merchant/item/merchant-sample-kit`

A slot materializes only if the live catalog actually contains the exact item identity.

All item presentation falls back to `job/merchant/result/default` until exact frozen-runtime overrides are audited.

## Capability meaning boundary

These capabilities are narrow Merchant-local affordances. Presentation must not imply:
- universal or infallible appraisal;
- guaranteed price discovery;
- inventory-capacity expansion;
- automatic legal permission;
- immunity from Guard/law consequences;
- permanent price, wage, or margin bonuses;
- free ownership of unrelated goods;
- automatic debt/credit access.

Appraisal Scales may communicate that an appraisal option/check is available when runtime permits it, not certainty of value.

Manifest Case may communicate record/manifest verification capability, not legal immunity or guaranteed delivery.

Sample Kit may communicate safer or more structured sample handling, not unlimited storage or universal item identification.

## Runtime gating

`presentationSlots()` now checks `definitions.itemDefinitions` before publishing any Merchant item slot. Contract-only names therefore cannot become active presentation identities on the preparation baseline.

C2-192 must re-audit the exact frozen item/capability set before final production binding.

No item acquisition, capability rule, inventory, economy, Save/RNG, ending, School, or Meta mechanics are changed here.
