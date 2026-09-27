# Chat5 Completed-Wave Reconciliation v1

Status: QA / Git reconciliation
Queue item: Chat 4 item 140
Current main: `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
Chat5 branch: `chat5/school-pa-gate-next`
Chat5 head reviewed: `9ced850e9a510e2a6042f53cf1f4fb5f39b90524`

This reconciliation is based on files actually fetched from Git. All Chat5 queue items 137–150 exist on the branch. The branch is stale relative to current main and is not a merge candidate.

## Reconciliation

| Item | Exact file | Git presence | Classification | Current-main interpretation |
|---|---|---|---|---|
| 137 | `prior-work/astra/prototype-m3.2/content/school-localization-main-delta-v1.fixture.json` | present, blob `4cd2237…` | **SUPERSEDED** | Older broad delta: 151 strings. Item 146 is the later curated production patch with 142 strings and removes nine caption keys. Keep 137 as history/source only. |
| 138 | `prior-work/astra/prototype-m3.2/tests/school-localization-main-delta-v1.test.ts` | present, blob `43c54ef…` | **SUPERSEDED** | Older contract for item 137. Item 147 is the later production-patch contract. |
| 139 | `docs/school-prep/SCHOOL_UI_COPY_RU_EN_v2.md` | present, blob `420b2b4…` | **SAFE_TO_INTEGRATE_NOW** | Bilingual copy source only. It changes no gameplay. Lead may selectively use it when wiring current School UI localization. |
| 140 | `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-night-multigif-adoption-v1.json` | present, blob `9c8f50e…` | **STAGING_ONLY** | Self-declared presentation draft; asset paths are proposed. Real repo GIF requirement is not met by this artifact. |
| 141 | `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-generic-multigif-adoption-v1.json` | present, blob `256f27f…` | **STAGING_ONLY** | Self-declared presentation draft; proposed assets and worker-side generic identities are not proof of shipped current-main media. |
| 142 | `docs/school-prep/STAGED_EXACT_COURSE_LOCALIZATION_PROMOTION_CHECKLIST_v1.md` | present, blob `15299a1…` | **QA_EVIDENCE_ONLY** | Correct promotion gate; does not itself ship routing or content. |
| 143 | `docs/school-prep/SCHOOL_LOCALIZATION_NATURAL_PATH_SMOKE_v1.md` | present, blob `8ce6f67…` | **QA_EVIDENCE_ONLY** | Useful future smoke plan. Its exact-Night assumptions are not current-main production proof. |
| 144 | `docs/school-prep/SCHOOL_LOCALIZATION_COVERAGE_LEDGER_v2.md` | present, blob `dede254…` | **QA_EVIDENCE_ONLY** | Useful inventory, but any “reachable” claims must be rechecked against current main. Current main still hard-codes School internal UI and lacks worker exact-Night event IDs. |
| 145 | `docs/school-prep/SCHOOL_LOCALIZATION_INTEGRATION_HANDOFF_v14.md` | present, blob `67e2093…` | **SUPERSEDED** | Targets “current main after PR42”; current main is post-PR43 and item 139 QA found reachability/key-convention drift. Do not use as current integration authority. |
| 146 | `prior-work/astra/prototype-m3.2/content/school-localization-production-patch-v1.fixture.json` | present, blob `193752f…` | **STAGING_ONLY** | RU+EN complete and gameplay-free, but not a drop-in current-main patch for all claimed event surfaces. School UI is not wired to these keys and worker event key namespaces/IDs do not match current production identities. Safe text payload may be extracted selectively. |
| 147 | `prior-work/astra/prototype-m3.2/tests/school-localization-production-patch-v1.test.ts` | present, blob `de26f9b…` | **QA_EVIDENCE_ONLY** | Useful content-contract checks. Must be adapted to the exact current-main selective patch and include runtime consumption/reachability assertions. |
| 148 | `prior-work/astra/prototype-m3.2/content/school-ui-locale-smoke-v1.fixture.json` | present, blob `b0cc5de…` | **QA_EVIDENCE_ONLY** | Expected RU/EN pairs plus mechanics references. Mechanics values are assertions only, not localization payload. |
| 149 | `prior-work/astra/prototype-m3.2/content/school-reachable-event-localization-key-map-v1.fixture.json` | present, blob `2f6fa69…` | **STAGING_ONLY** | File says `SAFE_REACHABLE_KEY_MAP`, but its one generic `school.generic.reachable.v2.*` event and 24 `school.night.exact.v3.*` events are absent from current-main School production packs. Classification in the file is stale relative to Git reality. |
| 150 | `prior-work/astra/prototype-m3.2/content/school-exact-course-routing-v2.fixture.json` | present, blob `59c7632…` | **STAGING_ONLY** | Correctly self-declared `STAGING_EVIDENCE_ONLY`; no production triggers attached and teacher/lesson promotion remains staged. |

## Product-blocked check

None of the reviewed 137–150 files should be used to close the still-open School management/accounting public result or School Arcana/Forest public result. Item 150 explicitly leaves those decisions unselected. Accordingly no file is classified as a production implementation of Product-blocked mechanics.

The Product-blocked state itself remains unchanged; staged localization text cannot close a gameplay/content decision.

## Current safe integration surface

The only file that is directly safe to copy as-is without implying production reachability is the bilingual copy-bank document in item 139. Item 146 contains a safe RU+EN text payload, but the file as a whole remains staging for current-main production because its event namespaces/reachability assumptions need Lead remapping and UI wiring.

Tests and smoke/checklist documents may be selectively copied as QA evidence, but a green worker test is not enough to prove current-main runtime consumption.

## Stale evidence recorded

The following worker statements are stale against current main and must not be propagated as current fact:

- item 145 targeting “current main after PR42”;
- item 149 self-label `SAFE_REACHABLE_KEY_MAP`;
- generic event identity `school.generic.reachable.v2.after.school` described as current reachable;
- `school.night.exact.v3.*` described as current reachable.

Current main production School event identities remain the `school-lesson-content-v1.*` and `school-life-content-v1.*` families until a separate exact-routing/event integration changes that fact.

## Integration rule

Never merge `chat5/school-pa-gate-next` wholesale. Lead should branch from current main, copy only the reviewed School localization text/tests needed for the selected integration, remap to current IDs/key convention, keep exact-course routing and proposed media pools staged, and run exact-head CI plus post-merge main CI.
