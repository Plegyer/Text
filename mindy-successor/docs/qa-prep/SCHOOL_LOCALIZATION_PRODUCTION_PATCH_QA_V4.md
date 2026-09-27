# School Localization Production Patch QA v4

Status: QA / PRODUCT ACCEPTANCE
Queue item: Chat 4 item 139
Review baseline: current `main` `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`
PR43 production merge: `326c7d495720147f17b40056369987f515363899`
Chat5 branch reviewed: `chat5/school-pa-gate-next`
Chat5 reviewed head: `9ced850e9a510e2a6042f53cf1f4fb5f39b90524`

## Scope

This review covers Chat5 items 146–150 only:

- `content/school-localization-production-patch-v1.fixture.json`
- `tests/school-localization-production-patch-v1.test.ts`
- `content/school-ui-locale-smoke-v1.fixture.json`
- `content/school-reachable-event-localization-key-map-v1.fixture.json`
- `content/school-exact-course-routing-v2.fixture.json`

The worker branch is stale relative to current main. Nothing in this review recommends merging that branch. Lead integration, if any, must copy reviewed artifacts or payloads selectively onto a fresh branch from current main.

## Current-main facts relevant to acceptance

Current main already has the RU/EN localization runtime from PR41 and generic localized event/activity/media presentation consumption from PR43. Current `src/ui/app.ts` still renders the School panel, the eight School course labels/stat rows/cost rows, lesson button, and Night UI with hard-coded source strings rather than `ui.school.*` localization keys. Current `content/localization.json` has no `ui.school.*` or `school.*` entries.

The production School packs currently present on main use identities such as:

- `school-lesson-content-v1.after-school`
- `school-life-content-v1.after-paid-lesson`
- `school-life-content-v1.after-night-study`

and the target pack copies use the same production event identities plus authored libraries. Current main does not contain the worker-only event IDs `school.generic.reachable.v2.after.school` or `school.night.exact.v3.*`.

Therefore a worker artifact describing those latter IDs as “current reachable” is stale evidence relative to current main.

## Item 146 — production localization patch

File: `content/school-localization-production-patch-v1.fixture.json`

Observed structure:

- top level is localization-only: `version`, `defaultLocale`, `strings`;
- 142 string keys;
- every included string has non-empty `ru` and `en`;
- all eight paid course IDs have both label and description entries;
- no teacher-specific / exact-course staged keys were found;
- no conditions, effects, rewards, RNG, Save identity, counters, triggers or other gameplay fields were found;
- none of its keys currently overlap existing `main` localization keys, so it is an additive payload rather than a conflicting replacement.

Acceptance: **CONDITIONALLY SAFE PAYLOAD**.

The UI/course-copy subset is safe for selective integration. However the generic/Night event text uses worker namespaces such as `school.generic.*` and `school.night.*`; current PR43 event localization consumption resolves `event.<eventId>.*` and `media.<mediaId>.alt`. Those strings are not automatically live merely by copying this fixture into `localization.json`.

Lead must map only identities that exist on fresh current main to the current runtime key convention. Do not copy worker-only “reachable” event identities into production and call them shipped.

## Item 147 — patch contract test

File: `tests/school-localization-production-patch-v1.test.ts`

Acceptance: **QA_EVIDENCE_ONLY / REUSABLE AFTER REBASE**.

The test is useful for RU+EN completeness, eight-course coverage, staged-content exclusion and no-gameplay-field checks. It must be rebased against the exact payload selected for current main. A green worker-branch run would not prove that the selected keys are consumed by current main UI or that the worker event IDs are reachable.

Required Lead-side augmentation before treating the School localization integration as production-green:

1. assert the copied keys use current runtime key conventions;
2. assert referenced production event/media IDs exist on fresh current main;
3. render the School panel in RU and EN;
4. prove locale switch leaves the `schoolLesson` command ID, tuition, Energy cost, School progress, Save gameplay state and RNG behavior unchanged.

## Item 148 — School panel locale UI smoke fixture

File: `content/school-ui-locale-smoke-v1.fixture.json`

Acceptance: **QA_EVIDENCE_ONLY**.

The RU/EN expected text pairs are useful. The fixture also contains `mechanicsReference` values for tuition, Energy cost and stat effects. Those are reference assertions, not localization payload and must not be copied into production localization data.

The fixture does not itself prove production UI consumption because current main still hard-codes School panel/course strings.

## Item 149 — reachable event localization key map

File: `content/school-reachable-event-localization-key-map-v1.fixture.json`

Acceptance: **STAGING_ONLY / STALE_CURRENT_MAIN_REACHABILITY CLAIM**.

The file excludes teacher-specific and other Product-blocked families and keeps locale-neutral identity. That part is correct. However its mapped events are:

- one `school.generic.reachable.v2.after.school`;
- 24 `school.night.exact.v3.*` events.

None of those event IDs is present in the current-main School production packs reviewed for this gate. The current production School result identities are the `school-lesson-content-v1.*` / `school-life-content-v1.*` identities above.

Therefore item 149 must not be copied as a production reachability map. It can remain staging evidence for a future exact-routing integration.

## Item 150 — exact-course routing fixture v2

File: `content/school-exact-course-routing-v2.fixture.json`

Acceptance: **STAGING_ONLY**.

The artifact correctly self-declares `STAGING_EVIDENCE_ONLY`. It covers all eight paid courses, keeps the proposed exact reaction identity locale-neutral, marks every production trigger as unattached, keeps teacher and lesson events staged, forbids transaction/progress replay, requires no Save migration, and does not select the still-open School management or Arcana/Forest public result.

This file must not be promoted as shipped routing and must not be used to justify teacher/course-specific production localization.

## Locked invariants checked

This wave does not justify any change to gameplay mechanics. Selective localization integration must preserve:

- one locale-neutral gameplay identity;
- locale outside life Save;
- no locale-specific RNG or GIF candidate choice;
- no locale-specific conditions/effects/rewards/timing;
- paid School transaction semantics unchanged;
- Night-study semantics unchanged;
- no School management/accounting public result selected;
- no School Arcana/Forest public result selected;
- no staged teacher/course event promoted merely because RU+EN text exists.

## Selective integration recommendation

**Do not merge `chat5/school-pa-gate-next` as a branch.**

Safe next Lead action on a fresh branch from current main:

1. extract the item-146 RU+EN School UI/course copy;
2. wire current School UI text through the existing localization runtime without changing command IDs or mechanics;
3. map only current-main reachable School production event/media IDs to the PR43 key convention;
4. port/adapt item-147 and item-148 as acceptance evidence;
5. keep items 149 and 150 staging-only until the exact routing seam is separately reviewed and integrated.

## Verdict

**PARTIAL_GREEN_FOR_SELECTIVE_COPY**.

The localization text bank is complete RU+EN for its included safe surfaces and contains no gameplay payload. It is not yet a drop-in production patch for all claimed reachable School events because current-main IDs and runtime key consumption differ from the worker mapping. Exact-course routing remains correctly staged. No Save/RNG/mechanics divergence is accepted or required.
