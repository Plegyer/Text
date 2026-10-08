# Leader 1 Stage 5 — two Secret Debt RU golden third-value decisions (2026-10-08)

**Status: LEADER-AUTHORIZED EXACT-KEY RESOLUTION.** This is a positive semantic decision after checking BOTH Stage 1 accepted exact-main and Stage 4 exact-main, not a generic last-write-wins exception. All other Golden contract requirements remain hard, no weakened validators or whole-file replacement.

## Evidence

- Accepted Stage1 exact-main `ff1dfe3ec3554eaecf068de655e7473dd3387b63`, `content/localization.json@c180f641844d0094ebd533d8939d0339469baadf`: both current RU labels already shipped.
- Stage2 `e38273a09e44e39733eeb74f3e622cc2b6428884`, Stage3 `55e283753705747f208290acd840da4740559aa7`, Stage4 `4e67da063716cde9c41aec3a6ae40cdfc96da962` preserve them unchanged.
- Chat6 frozen final-player-facing v54 Golden fixture blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14` calls both `operation: add` with alternate RU translations and exact same EN translation, without a predecessor value. These are true third values. Golden immutable source remains intact for audit; adapting a copied **test-only** fixture to an adjudicated exact final expectation is permitted only for the two keys below.

## Explicit decisions

1. `unlock.secret-debt.paid-freedom.earned-reserve-match.label`: preserve shipped Stage1 RU **«Сопоставление заработанного резерва»**, EN **Earned Reserve Match**. Golden alternate «Паритет заработанного резерва» is NOT authorized to replace shipped text.
2. `unlock.secret-debt.takeover.network-retainer.label`: preserve shipped Stage1 RU **«Сетевое содержание»**, EN **Network Retainer**. Golden alternate «Сетевой гонорар» is NOT authorized to replace shipped text.

No new gameplay or content ID, no changed meaning/conditions, no Secret Debt state/schema modifications. This only resolves final localized UI wording, keeping the accepted shipped vocabulary. **Chat2 MUST NOT write these two production keys.**

## Scoped Golden verification procedure

Chat2 on its new Stage5 branch may import the exact golden fixture `tests/fixtures/final-player-facing-golden-v54.json` from source blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14` and apply **exactly two test-only `localization.required[KEY].value.ru` changes** listed above. Keep EN, operation type, all tags/authorities/other 341 entries and all presentation/UI values unchanged. Add an explicit `leaderAdjudication` provenance record naming this document; never silently rewrite or suppress tests. In worker handoff compare exact imported fixture blob vs approved two-key adjusted fixture and report number of test-only deviations = 2. The original frozen source remains the audit input; updated copy becomes release-target expected final labels.

After this adjudication, expected localized final-state comparison becomes 243 exact, 90 absent, 10 predecessor, **zero unresolved third values**; presentation remains 34 exact/93 absent. If any further third value occurs, STOP and report it to Leader with exact key/hunk. Preserve all 17 forbidden live key and historical retained-key checks as mandatory.

**Leader 1 accepted decision marker: `STAGE5_TWO_SECRET_DEBT_RU_THIRD_VALUES_RESOLVED`.** Stage5 release gates still NOT RUN. No permission to merge or bypass test failures.
