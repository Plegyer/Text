# Chat 2 — School D20 Post-Assassin Current-Main Assembly QA

Status: **STATIC INTEGRATION PASS / EXACT-CURRENT-MAIN CI PENDING**
Date: 2026-10-02
Owner: Chat 2 / Integration + Assembly + Technical QA

## Authority
- frozen School producer PR #254: `877927cf747ba9f69a53ddccf4373b795561f3a0`
- shipped Assassin current main: `176d879f01edea725a331ffe7fb2fb17fb316889`
- historical pre-Assassin School assembly #259: `56aea9e012cb614d4ea09219545ba2e7ddb59c1f`
- historical School CI #1112 / `37052581818`: **972/972 pass**.

PR #259 was returned to draft after Assassin shipped because both packages touch `content/localization.json`. The old green run remains useful D20 evidence but is not final current-main integration evidence.

## Post-Assassin collision analysis
Of the six frozen School files:
- five have no Assassin overlap and are copied as exact producer blobs;
- only `content/localization.json` overlaps shipped Assassin.

School D20 changes exactly one localization key:
`school.course.body_confidence.description`.

The post-Assassin localization assembly:
1. starts from shipped main localization blob `1257d6bb6b5e1033de2c571103b08d0f19ad4e25`, which already contains Artist + Prostitute + Assassin localization;
2. replaces only the exact D20 Body Confidence description value from frozen #254;
3. produces merged localization blob `37ba9973570096198bdf20b3d377f8dab452c5d6`.

Thus all shipped Assassin/Prostitute/Artist localization keys are preserved and D20 adds only its authorized copy delta.

## D20 mechanics preserved
Exact producer blobs retained:
- School save/reload expectation fixture
- `src/core/school.ts`
- D20 focused test
- School engine adapter test
- School target test.

Previously verified behavior remains:
- paid Body Confidence lesson => Lust +2 in the same paid School transaction;
- Lust remains separate from Sexuality;
- exactly-once persistence through repeated save/reload;
- existing Lust cap 100;
- no Lust on other paid courses;
- Body Confidence Night Study does not inherit paid-lesson Lust;
- no engine, Save schema/migration, Secret Debt, profession, RNG, Meta or ending change.

## Gate
This branch is shipped Assassin current main + five exact frozen School producer blobs + one-key collision-safe localization merge + this evidence file.

Open the CI-consuming PR only after exact-main Assassin CI #1115 releases the single self-hosted runner.
Then consume exactly one School post-Assassin full CI run.
If green, report `READY_FOR_LEADER_MERGE`.
Chat 2 does not merge main.
