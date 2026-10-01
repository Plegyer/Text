# Chat 3 Forest + Poverty v11 Production Candidate Handoff

Status: C3-120 candidate handoff — repaired after red exact-head CI.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Candidate base: `main@5394983a69560b24be7aa2af7069b327be10da0b`.

C3-109 through C3-119 now promote only content that fits current production identities.

Forest route continuity is live through the existing route-entry localization keys. Route option help, route IDs, the `enter_old_boundary` gate, Activity tuning and result effects stay unchanged. Each terminal Forest event keeps exactly one `default` variant; only its text is refreshed through the existing success/escape/failure `activityResult` boundary.

Ordinary-poverty street/cheap continuity replaces text on existing event/variant IDs only. Recovery/help continuity uses existing default variants, while brief contact flavor uses an already-live poverty-depth key. No new ordinary-poverty event, variant, Night intercept, housing rule, relationship/contact state or recovery state is introduced.

Current main has no ordinary-poverty normal-housing event identity, so normal-room continuity remains blocked/preparation-only instead of adding a new blocking Night surface.

Only four unambiguous single-variant result identities are promoted: summer errand, short cleanup, anonymous coin help and herb bundle. The shared `take-small-task` result remains common to `market-closing` and `late-shade`.

Ordinary poverty remains independent from Secret Debt. No hidden debt state, lender identity, trigger chance, amount, delay, penalty, threshold or reward is introduced.

No shared runtime/UI, Save schema, gameplay RNG, School mechanics, ending framework or Forest mechanics are changed.

Regression sources:
- `tests/chat3-production-promotion-parity-v11.test.ts`
- `tests/chat3-production-promotion-no-mechanics-v11.test.ts`
- `tests/chat3-poverty-promotion-long-run-v11.test.ts`

Exact frozen head and exact-head repository CI are recorded in PR #146 only after the repaired head is green.
