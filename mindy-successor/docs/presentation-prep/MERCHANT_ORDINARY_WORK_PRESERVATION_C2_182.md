# C2-182 — Merchant ordinary seasonal work preservation audit

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline: `chat2/merchant-presentation-v17@f5a37ebd997fa1c399b3d72b795a2fbc769017be`

## Preserved shipped slots

The Merchant ordinary-work presentation set remains exactly:
- `job/merchant/result/default`
- `job/merchant/shift/spring/default`
- `job/merchant/shift/summer/default`
- `job/merchant/shift/autumn/default`
- `job/merchant/shift/winter/default`
- `ending/merchant/hard-work`

No additional Merchant presentation slot exists on this baseline.

## Project-owned static sources

All ordinary work sources exist in-repository:
- `assets/presentation/career-merchant-result.svg`
- `assets/presentation/career-merchant-shift-spring.svg`
- `assets/presentation/career-merchant-shift-summer.svg`
- `assets/presentation/career-merchant-shift-autumn.svg`
- `assets/presentation/career-merchant-shift-winter.svg`

No external or fabricated media is required for the preserved baseline.

## Ordinary-work visual contract

The four seasonal slots continue to mean ordinary Merchant work only. They may depict routine market/stall goods, records, deliveries, customers, or negotiation context already implied by `merchant.shift`, but must not visually claim any advanced runtime state.

Future advanced presentation added after the runtime freeze must remain semantically distinct from these seasonal IDs:
- no crisis card may reuse `job/merchant/shift/<season>/default`;
- no House/Speculator/Patron readiness card may replace an ordinary shift slot;
- no relationship, School, cross-system, capability, or ending presentation may be encoded by swapping an ordinary seasonal asset;
- ordinary result remains the generic post-shift fallback.

The current seasonal scenes are gameplay-owned by `merchant.shift`. Presentation does not reinterpret their stat/economy effects and does not claim that a static illustration determines the result.

## Accessibility preservation

Current RU/EN localization exists for:
- ordinary result alt/caption;
- all four seasonal shift alt/caption pairs;
- Merchant Hard Work alt/caption.

C2-191 will add the focused regression that requires this parity and static safety to survive the later advanced binding.

## Freeze boundary

No gameplay file, economy rule, seasonal effect, Save/RNG behavior, career transition, ending rule, or Meta reward is changed by this audit.

Advanced Merchant work/trade/crisis presentation remains deferred until exact frozen runtime identities exist.
