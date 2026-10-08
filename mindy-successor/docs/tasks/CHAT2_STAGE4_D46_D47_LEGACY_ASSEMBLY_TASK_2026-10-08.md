# CHAT 2 — STAGE 4 D46 + D47 + LEGACY LUMBER-STAY PRODUCTION ASSEMBLY

Status: **ASSIGNED / NOT ACTIVE until user manually resumes Chat2**.
Owner: Chat2 — **production assembly only**.
Leader 1 retains focused QA, full CI, exact-main CI and sole merge authority.

## Base and prerequisite

Stage 3 is CLOSED: exact production merge `55e283753705747f208290acd840da4740559aa7`, official main-push run `37776012058` SUCCESS 1287/1287. Broad burn-down 2. Re-query live `main` on activation, record exact SHA, create a fresh Stage 4 branch from it. Do not layer onto the old Stage 3 worker branch or a frozen D46/D47 producer tree.

## Frozen authorities

- D46 producer `a0c5f855b63d3bb85556f5b2780aaaabb58fbced`; QA and reachability `bb79be1f39c55e6297287cd071e1e8268005148a`.
- D47 combined D46+D47 authority `252dc26c514e24f4ab0f0cc0da7694254282e4c4` (focused 75/75 on exact producer).
- Legacy ending retirement implementation `cbeae73e8559d43fcce24213d6f5606b682b3e7d`; verified target `39912e7435c3707d98f96fe550d697c20ac0bedb` (focused 79/79).
- Accepted Chat4 exact-head analysis: `chat4/d46-d47-legacy-exact-head-qa-v47`, doc `CHAT4_D46_D47_LEGACY_EXACT_HEAD_QA_v49.md`.
- Accepted Chat4 golden selective manifest: `chat4/d46-d47-legacy-golden-manifest-v53`, `CHAT4_D46_D47_LEGACY_GOLDEN_MANIFEST_v55.md`, operations `CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json`, golden gate `CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json`. Read manifests before edits.
- Supplemental collision and assembly packet `chat5/d46-d47-legacy-assembly-preflight-v18`, `chat3/d46-d47-legacy-final-assembly-packet-v29` when available. Freeze current-main third values rather than trusting dated snapshot SHA.

## Produce exactly this semantic delta

1. D46 fresh/new-life Lust default **5** while migrated/current-save Lust stays untouched. Ordinary wage bases: Lumber **35**, other nine ordinary career shifts **37**; ordinary shift wage cap **120**. Only the ten ordinary `*.shift` IDs use the capped helper; compute wage from pre-shift state. Never capture Palace, Secret Debt, School, Activity or other non-ordinary reward paths.
2. D47 all ten canonical career Hard Work packages, selection `arbitrary-earned-subset`, including none/all earned; packages whole-only, earned-only, applied exactly once at character creation, clipped to resolved stat cap, outside Strong Meta Keystone/Specialists. Prostitute package's Lust +5 stays outside 12 progression stats. Ordinary Hard Work requirement stays exactly **50 completed shifts**; ordinary hard-work ownership remains separate from D38/D39/Palace.
3. Retire live `lumber-stay` ending and generic `vitality` unlock only. Preserve historical `lumber-stay` run/transaction evidence, including completed, eligible-only, committed-but-unfinished and old pre-RunResult cases. Normalize historical completed ending / generic vitality / legacy perk to **one** `legacy.lumber-stay.vitality`; the legacy perk grants **+1 Energy exactly once**, without modern new-run acquisition, Hard Work fabrication, Strong Meta ownership or Palace shortcut.
4. Preserve exact listed historical localization labels and display-only legacy UI. Remove only the five live retirement localization keys and the `ending/lumber-stay` live presentation slot described in v55. Historical UI cannot expose a live accept action.

## Mandatory collision firewall

**Never wholesale copy** producer `definitions.json`, `engine.ts`, `schema.ts`, `content.ts`, `hardWorkMeta.ts`, `localization.json`, `presentation.json`, `app.ts`. Compose by stable IDs and symbols per v53. Preserve Stage3 four-region Activity/Field Time/Camp/D38, Stage2 Palace/D39/Strong Meta UI/D48, Stage1 Secret Debt/D51, schema6 migrations, NightFlow, existing endings, localization/media/UI and current-main test expectations. If any third-value collision cannot be resolved from authority, STOP and document it rather than guessing.

The standalone `src/core/lumberStayLegacy.ts` may be exact-copied from the verified retirement authority if not already present. Perform ID-superset/required-deletion audits and check all shared files for accidental regressions.

## Deliverable / stop marker

Commit a **fresh Stage 4 production assembly candidate** on Chat2 branch with focused production tests and a handoff recording: exact main base SHA, integrated production SHA, manifest operations actually applied, collisions/third values, file/ID preservation audit, focused runnable test roster and any real blockers. Do not run the full suite, do not merge main and do not claim Stage4 closure. Return `STAGE4_D46_D47_LEGACY_PRODUCTION_READY_FOR_LEADER`.

After handoff, Leader 1 will independently run focused regression, exact-source full CI, merge to latest main and official exact-main CI, and only then decrement broad burn-down from 2 to 1.
