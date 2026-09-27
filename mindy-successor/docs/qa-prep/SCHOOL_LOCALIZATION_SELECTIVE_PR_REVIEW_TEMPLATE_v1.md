# School Localization Selective PR Review Template v1

Status: QA review template
Queue item: Chat 4 item 146
Reference baseline when authored: current main `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

Use this checklist for the next Lead School localization PR. Replace the baseline SHA with the actual current main at PR creation time.

## Branch provenance

PASS only if:

- integration branch was created fresh from the then-current `main`;
- no whole-worker-branch merge is present;
- every copied Chat5 artifact/file is named explicitly in the PR;
- unrelated historical worker commits are absent.

Record:

- base main SHA: `<sha>`
- PR exact head SHA: `<sha>`
- selected source worker commits/blobs: `<exact refs>`

## Allowed scope

Expected safe scope may include:

- additive School RU+EN strings for current production identities;
- School panel/course UI localization lookup wiring;
- tests/fixtures proving locale-only behavior.

Reject scope that promotes:

- `school.night.exact.v3.*` worker events unless a separately reviewed production routing integration has actually landed;
- staged teacher/course-specific events merely because translations exist;
- proposed exact-course `schoolLessonCompleted` routing from item 150 without a separate approved runtime change;
- School management/accounting public result;
- School Arcana/Forest public result;
- any gameplay numbers, conditions, effects, rewards, RNG, Save schema or transaction behavior.

## Localization payload review

Require:

- Russian and English both non-empty for every newly shipped player-facing key;
- keys are locale-neutral;
- no duplicate gameplay event per locale;
- all eight current course IDs are represented where course UI is in scope;
- no staged teacher/course family leaks into production payload;
- existing localization keys are preserved unless the PR intentionally updates an exact reviewed value;
- missing English is classified as debt and not counted as complete RU+EN.

For event presentation keys, require the current runtime convention:

- `event.<eventId>.title`
- `event.<eventId>.variant.<variantId>.text`
- `event.<eventId>.choice.<choiceId>.label`
- `media.<mediaId>.alt`

Every referenced event/media ID must exist on the PR base/head production catalog.

## School UI consumption

This is a blocking review row.

Current pre-integration main still hard-codes the internal School panel/course strings. A localization payload alone is not sufficient.

The PR must prove rendered RU and EN consumption for the exact UI surfaces it claims to ship:

- panel title/help;
- all eight course labels/descriptions if included;
- tuition/Energy wording;
- paid lesson action label;
- Night-study context/action labels if included.

Values such as tuition, Energy cost and stat effects must continue to come from shared course/gameplay definitions. Localization strings may format those values but must not own a divergent numeric copy.

## Gameplay invariance

Run paired RU and EN flows from the same Save and assert:

- same `schoolLesson` command/course ID;
- same tuition charge;
- same current-day Energy charge;
- same stat/progression result;
- same rejected-lesson behavior;
- same generic reaction identity where current production routes it;
- same Night-study gameplay choice identity and next-day Energy behavior;
- no locale field added to life Save;
- no gameplay RNG divergence.

Language selection may live in presentation/local UI storage only.

## Pending presentation invariance

If a School event is pending during locale switch:

- event ID unchanged;
- variant ID unchanged;
- choice IDs unchanged;
- semantic presentation ID unchanged;
- selected GIF candidate key unchanged if a real pool exists;
- complete life Save unchanged;
- only title/body/choice/alt/caption presentation may change.

Do not use worker-only staged event identities as evidence of current-main reachability.

## Regression coverage

Minimum PR tests:

1. localization schema/content contract;
2. all eight course-key completeness where shipped;
3. UI RU rendering smoke;
4. UI EN rendering smoke;
5. RU↔EN gameplay-state equality;
6. pending-scene identity invariance for any School authored event in scope;
7. Save/reload under each locale;
8. existing PR41 localization regressions;
9. existing PR42 multi-GIF deterministic-selection regressions;
10. PR43 Forest localization regression to detect cross-subsystem breakage.

If the PR touches no media pool, real-GIF coverage is not required. If it adds a production pool, the real-asset gate applies: 3–5 real repo GIF blobs, RU+EN alt, static fallback, preflight and build/distribution proof.

## Exact-head CI gate

Before merge record the actual PR head SHA and require the full repository `npm run check` / configured CI floor on that exact SHA.

Do not accept:

- CI from an earlier PR head;
- worker-branch CI;
- handoff prose in place of a run on the integration head.

Record exact-head evidence:

- head SHA: `<sha>`
- workflow/run: `<link/id>`
- tests: `<count>`
- validator output: `<packs/events/actions/endings>`
- result: `PASS/FAIL`

## Merge and post-merge main

After merge:

- record merge SHA and new main SHA;
- require post-merge main CI on that exact main state;
- re-run/render at least one RU/EN School UI smoke;
- confirm no staged exact-course/teacher content became production-reachable unexpectedly;
- confirm Forest exact `activityResult` and Lumber Hard Work locks remain green.

Record:

- merge SHA: `<sha>`
- post-merge main SHA: `<sha>`
- main workflow/run: `<link/id>`
- result: `PASS/FAIL`

## Review verdict vocabulary

Use only evidence-based statuses:

- **GREEN_TO_MERGE** — selected current-main-safe files/wiring pass exact-head CI and all blocking rows;
- **NEEDS_FRESH_HEAD_CI** — content review passes but exact current head is not proven;
- **CHANGES_REQUIRED** — key/runtime/UI/invariance problem found;
- **STAGING_ONLY** — artifact is valid preparation but not current production;
- **PRODUCT_BLOCKED** — underlying Product decision is unresolved.

Never turn the review into a recommendation to merge the stale Chat5 branch as a whole.
