# C2-183 — Merchant career-stage presentation preparation

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/merchant-complete-v15@4276e52f9f6d588ea0efc1bbd9b00eb1e7a67273`
Final authority: exact frozen Merchant runtime required by C2-192.

## Published stage vocabulary

The current Merchant runtime contract publishes:
- `stall-hand`
- `independent-trader`
- `networked-merchant`
- `veteran`
- `merchant-house`
- `speculator-smuggler`
- `patron-of-routes`
- `outcome-ready`

These names are used only as preparation authority until Chat 1 freezes the runtime.

## Presentation semantics

Prepared semantic identity:
- `job/merchant/stage/<stage>`

`presentationSlots()` now materializes a Merchant stage slot only when the live catalog actually contains that exact stage. This prevents preparation-only IDs from becoming active presentation surfaces before runtime publication.

Every generated stage slot falls back to:
- `job/merchant/result/default`

This keeps stage presentation non-mechanical and static-safe while preserving the ordinary Merchant result as the visual fallback.

## Ending firewall

`merchant-house`, `speculator-smuggler`, `patron-of-routes`, `veteran`, and `outcome-ready` are career/status presentation states only.

They are not ending cards and do not create:
- public ending IDs;
- ending eligibility;
- reward IDs;
- Meta rewards;
- auto-commit behavior.

The only shipped Merchant ending remains `ending.merchant.hard-work`.

## Freeze rule

C2-192 must re-audit this list against the exact frozen runtime. If Chat 1 changes any stage before freeze, the final Chat 2 rebuild must use the frozen identity and discard stale preparation vocabulary.

No career progression, transition, Save, economy, reward, School, relationship, or ending mechanics are modified here.
