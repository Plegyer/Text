# Leader 1 — Stage 5 FINAL GO / release closure (2026-10-08)

**FINAL DECISION: GO. Stage 1–5 CLOSED. Broad burn-down: 1 → 0.** This is the latest authoritative release/QA record, superseding successor transition notes and historical Stage5 OPEN checkpoints. All claims below are grounded in GitHub SHA-guarded Actions and exact-main push CI.

## Exact provenance and merge

- Repository `Plegyer/Text`. Integration **PR #303 MERGED**, https://github.com/Plegyer/Text/pull/303, merge commit `bb2a1c8649bf150b74611eda958ea874a8905952`.
- Final tested source and PR head at merge: `8ea2279a5097e6568d9d31e9137ca3feb1f1a4e1`; exact expected-head SHA was supplied to GitHub merge. The previous Undead Farm seasonal scene issue was fixed test-only in Leader branch, preserving all eight catalog-backed non-default seasonal slots and four canonical defaults.
- Chat2 #301 and Chat3 #302 were included as upstream provenance in #303. **Neither worker PR merged separately**.
- Post-merge workflow-only commit `db3cc892cb96cca43bec298a85e61f0e2c376bda` changes **only** `.github/workflows/mindy-successor-check.yml`, adding byte-exact reconstruction of original immutable Golden files on Windows before official main tests. GitHub compare `bb2a1c8... → db3cc89...`: one workflow file, +4/-0; **no game/test source changes**.

## Exact-source acceptance — full QA

- SHA-guarded Windows source CI v135 https://github.com/Plegyer/Text/actions/runs/37809954382 **COMPLETED SUCCESS**: exact checkout `8ea2279a5097e6568d9d31e9137ca3feb1f1a4e1` (workflow wrapper `a917d0cbd3cc1fc2514a9ab5f3b6e3f32663b8ea` is not the source SHA).
- Node 22.18.0; npm ci, typecheck, validate, build **PASS**.
- Independent Stage4 Golden A01–A32 **32/32 PASS**; strict Stage5 RU/EN player-facing Golden + UI source matrix + cross-contract **6/6 PASS**; executable Stage5 migrations (23 required + historic F1–F5 + immutable packages) **38/38 PASS**; C2-143 focused **4/4 PASS**.
- Full `npm run check`: **1354 PASS / 0 FAIL / 4 opt-in SKIP / 1358 total**. The four conditional skips are **not** counted as passing, and strict final-target tests were run separately with environment flags.
- Additional **actual Chromium-rendered** test `tests/stage5-rendered-ru-en-browser-smoke.mjs` **PASS for both RU and EN**: `html.lang`, navigable menu, keyboard focus, localized modal ARIA name, close button accessibility, Escape to close, rendered image alt. **Positive caption branch** also PASS in RU and EN: genuine published `job/lumber/result/default` media and RU/EN content inserted into the **browser-only intercepted content response** at the entry presentation, verifying nonempty rendered `.media-caption`, a rendered image's `aria-describedby` pointing at the caption ID, and localized `alt`. This proves browser DOM rendering under a controlled source-backed QA fixture, **not** a natural gameplay route/screenshot. Initial screen had no caption, and is not claimed to have been caption-tested.

## Exact-main acceptance — official CI

- Initial official push https://github.com/Plegyer/Text/actions/runs/37812155535 on merge SHA `bb2a1c8649bf150b74611eda958ea874a8905952`: **FAILED**, full **1353 PASS / 1 FAIL / 4 SKIP**. Single failure in `v64 accepted closure contracts agree`: Windows Git text checkout changed raw bytes of frozen v54 fixture (checked-out object hash `e898702faa92df5f6219a2fd3f56942a349395d4` vs immutable source blob `bc8617be68825543ed7617e9dd5c7d915f6b0e14`). This was a Windows checkout artifact, not a game-code regression; correct source CI had already reconstructed Git originals.
- Narrow **CI workflow-only** correction now applies the same exact `git show HEAD:<path>` byte restoration for six frozen authorities before npm checks. No Golden artifact changes.
- **Controlling official exact-main push** https://github.com/Plegyer/Text/actions/runs/37812797149: `completed/success`, workflow `mindy-successor check`, event `push`, exact main SHA `db3cc892cb96cca43bec298a85e61f0e2c376bda`, Node 22.18.0, Checkout/Setup/Restore Golden/Install/Full check all PASS. Full **1354 PASS / 0 FAIL / 4 optional SKIP / 1358 total**. This is the final official main CI authority.

## Frozen and semantic locks

- Original immutable Chat6 v54 Golden JSON Git blob **`bc8617be68825543ed7617e9dd5c7d915f6b0e14`**, original v55 test blob **`e40737f3c6d6da83d1e4692e4457c04936279d53`** verified at release source. v60 UI matrix, v57 migration Golden and Stage4 legacy artifacts preserved.
- **Exactly two** approved Secret Debt RU labels are preserved in production and receive only the narrow test-only Golden expectation overlay. **Exactly three** historical Tavern description RU/EN display texts are humanized under prior Leader adjudication; original frozen evidence unchanged.
- Only production files added/changed by #303 against Stage4 baseline are `content/localization.json` and `content/presentation.json`. No runtime/schema/gameplay/Strong Meta engine changes. Stage1–4 accepted semantics remain locked.
- Stage5 migration correctness, RU/EN localization/presentation, UI and accessible output, and frozen Golden controls are accepted for this release. No worker reactivation required.

## Release decision

**GO for Stage 5 closure** because (1) exact-source focused + full + rendered browser acceptance succeeded, (2) GitHub merged exact expected PR head, (3) final official exact-main push CI succeeded on the verified main code tree with a strictly CI-only Windows artifact correction. Stage 1–5 are **CLOSED** and broad burn-down is **0**. Chat2 and Chat3 remain **PARKED / no additional task**.

Historical failed run IDs remain preserved and are not represented as passing. These closure documents are administrative docs-only commits after accepted executable main SHA; when reading later, distinguish the latest docs HEAD from tested exact-main code SHA.
