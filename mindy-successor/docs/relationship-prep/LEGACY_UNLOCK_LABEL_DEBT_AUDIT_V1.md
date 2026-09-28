# Legacy Unlock-Label Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`

## Current Legacy consumer

The Legacy panel reads names from the hardcoded `labels` dictionary by unlock ID. It does not use localization keys, so locale switching cannot localize these names.

## Current generated unlock IDs

Current engine/reward behavior can place these IDs in `meta.unlocks`:

- `guild`
- `scholar`
- `host`
- `mediator`
- `court`
- `vitality`
- `lumber.forewoman.compat`
- `lumber.forest.compat`
- `palace`

The first eight come from current ending reward behavior. `palace` is added after all 10 ordinary Hard Work careers are completed.

## Legacy-supported ID

`calendar` is still a current legacy compatibility identity and can be preserved in existing saves, although no current ending generates it.

## Current fallback coverage

`labels.ts` has Russian fallback names for:
- `guild`
- `scholar`
- `calendar`
- `host`
- `mediator`
- `court`
- `vitality`

It has no fallback label for:
- `lumber.forewoman.compat`
- `lumber.forest.compat`
- `palace`

Current root localization has no `unlock.*.label` keys.

## Hard Work distinction

`ending.lumber.hard-work` carries the compatibility reward string `lumber.hardwork.compat`, but it also has an explicit typed Hard Work meta reward. Current engine therefore records Hard Work progress rather than adding `lumber.hardwork.compat` to `meta.unlocks`.

For that reason, `lumber.hardwork.compat` is excluded from the exact unlock-label fixture.

## Palace separation

`palace` is an unlock only, not a profession or career.

## Recommended key form

`unlock.<unlockId>.label`

The underlying unlock ID remains unchanged in Save.

## Boundary

Presentation only. No ending reward, meta reward, Hard Work, Palace condition, migration, Save, or RNG changes.
