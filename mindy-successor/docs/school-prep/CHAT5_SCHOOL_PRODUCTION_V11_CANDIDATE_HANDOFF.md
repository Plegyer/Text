# Chat 5 School Production Queue v11 Candidate Handoff

Owner: Chat 5 / School + Text Localization Content Worker  
Queue: C5-109 through C5-120  
Baseline: `main@6f0e8803ea327b55c5079afb137b5aa016f614ec`  
Branch: `chat5/school-production-v11`

## Goal

Promote already-safe School writing into reachable production content on the existing eight-course runtime without inventing unresolved School milestone, threshold, producer/public-result, career-state, Save, or NightFlow mechanics.

## Production scope changed

- `content/localization.json`
- `content/packs/school-lesson-content-v1.json`
- `content/packs/school-life-content-v1.json`

No shared runtime/source file, Save schema, RNG, NightFlow implementation, career/Activity state, economy, curriculum, course/teacher canon, presentation registry, or media asset is changed.

## C5-109 — exact live inventory

Added:
- `content/school-production-v11-live-inventory.fixture.json`
- `docs/school-prep/SCHOOL_PRODUCTION_V11_LIVE_INVENTORY.md`

Current exact live identities remain:
- 8 paid School courses;
- 8 existing teacher identities;
- 24 exact Night-study choices;
- 2 generic paid-lesson reaction events;
- 3 current School production packs.

Safe promotion sources were selected from current-main prepared material only.

## C5-110 — teacher presence for all eight tracks

The eight current course-card descriptions now include the existing assigned teacher in RU/EN.

This is reachable through the existing School panel and does not add teacher state, teacher events, relationships, thresholds, or curriculum.

## C5-111 — paid-course lesson/result variation

Added:
- `content/school-paid-course-result-variation-v11.fixture.json`
- `docs/school-prep/SCHOOL_PAID_COURSE_RESULT_VARIATION_V11.md`

Each paid course keeps:
- its exact localized course title;
- its existing course mechanics;
- its exact course presentation identity;
- the shared localized `ui.school.lessonResult` result body.

Course-specific paid-lesson reaction events were not invented because the shared runtime currently emits only `actionCompleted: school`, not an exact course fact.

## C5-112 — repeatable generic after-School promotion

The existing generic paid-lesson production events remain the only paid-lesson reaction consumers.

`school-lesson-content-v1.after-school` now has:
- `default`
- `settle-the-lesson`
- `one-clear-note`
- `leave-a-question`

`school-life-content-v1.after-paid-lesson` now has:
- `default`
- `practice-not-proof`
- `cost-already-counted`
- `back-to-the-day`

All promoted variants are RU/EN localized and effect-free.

## C5-113 — exact Night-study production content

The existing 24 exact `school.night_study.*` identities now each have one reachable School-life production event keyed to that exact `nightChoiceCompleted(choice)` fact.

The old generic `school-life-content-v1.after-night-study` identity remains in the pack only for compatibility with historical saved queued instances. The production validator requires every event to retain a trigger, so this compatibility event keeps one known Night-study trigger with an exact zero-chance policy (`base=0`, `perPoint=0`, `max=0`). It remains resolvable for historical queued instances without creating new offers.

Every exact Night-study event:
- uses an existing exact choice ID;
- has one exact reaction trigger;
- has RU/EN title/body/outcome localization;
- uses existing School-life fallback media;
- has an effect-free continue choice.

Locked Night-study mechanics remain unchanged:
- tuition 0;
- current-day Energy 0;
- selected stat +2;
- `night_study_sessions` +1;
- next-day Energy -1.

## C5-114 — reachable journal/result localization

Added:
- `content/school-journal-result-localization-v11.fixture.json`
- `docs/school-prep/SCHOOL_JOURNAL_RESULT_LOCALIZATION_V11.md`

Content-side reachable localization is complete for:
- visible paid-lesson result title/body;
- both generic after-School event outcomes;
- all 24 exact Night-study event scenes/outcomes.

Two shared-runtime journal limitations remain explicit and are not hidden by Chat 5:
1. `executeSchoolLesson()` writes a raw English action-journal line and `journalRefs.push(null)`;
2. shared event-scene logging writes raw event title/variant fallback text without a localization ref before the localized choice outcome.

No shared runtime or Save change is included.

## C5-115 — accessible course/teacher text parity

Added:
- `docs/school-prep/SCHOOL_ACCESSIBILITY_TEXT_PARITY_V11.md`

School-owned localization corrects current reachable accessibility text:
- canonical RU `Грамотность и счёт`;
- canonical RU `Этикет и самопрезентация`;
- `An Arcana...`;
- `An Etiquette & Presentation...`;
- `An Arts & Performance...`.

The corresponding existing teacher-media RU alt/caption strings use canonical course naming.

No presentation slot, media path, fallback ID, asset, or presentation selection logic is modified.

## C5-116 — locale / Save invariance

Added:
- `tests/school-production-v11-locale-save.test.ts`
- `docs/school-prep/SCHOOL_LOCALE_SAVE_INVARIANCE_REGRESSION_V11.md`

The regression checks:
- locale lookup is presentation-only;
- exact Night-study queued identity survives Save reload;
- localized exact Night-study event outcome refs survive Save round-trip.

## C5-117 — unresolved producer-fact firewall

Added:
- `tests/school-production-v11-firewall.test.ts`
- `docs/school-prep/SCHOOL_PRODUCER_FACT_FIREWALL_V11.md`

Production School packs are forbidden from leaking:
- `lumber.school.management-ready` as a School producer;
- `lumber.forest.truth-known` as a School result;
- `addWorldFact`;
- career transitions/writes;
- selected School thresholds/public-producer fields.

Allowed routing stays limited to current generic `actionCompleted: school` and exact `nightChoiceCompleted(choice)`.

## C5-118 — live repetition / voice / terminology

Added:
- `tests/school-production-v11-content-quality.test.ts`
- `docs/school-prep/SCHOOL_LIVE_REPETITION_VOICE_TERMINOLOGY_V11.md`

The regression validates:
- all eight teacher/course pairs in reachable RU/EN course cards;
- generic paid-lesson variation remains generic and teacher-agnostic;
- 24 exact Night-study events each have RU/EN title/body/outcome;
- canonical accessibility terminology remains consistent.

## C5-119 — exact live vs preparation-only manifest

Added:
- `content/school-production-manifest-v11.json`
- `tests/school-production-v11-manifest.test.ts`
- `docs/school-prep/SCHOOL_PRODUCTION_V11_MANIFEST_HANDOFF.md`

Live production is explicitly separated from preparation-only School target packs, milestone-depth fixtures, career transfer atlases, and teacher response/tone preparation.

The manifest marks `school-life-content-v1.after-night-study` compatibility-only and records 24 exact reachable Night-study production events.

## Regression scope

Added:
- `docs/school-prep/SCHOOL_PRODUCTION_V11_REGRESSION_SCOPE.md`

Focused v11 coverage:
- locale/save invariance;
- exact Night-study identity routing;
- effect-free School presentation choices;
- producer-fact/threshold firewall;
- teacher/course voice parity;
- terminology/accessibility parity;
- exact live/preparation manifest truth;
- reload compatibility for exact Night-study offers.

## Explicit unresolved dependencies

This candidate does not invent:
- exact paid-course reaction identity in shared runtime;
- exact paid-lesson teacher event routing;
- School milestone/certificate thresholds;
- Lumber management School producer/publication;
- Arcana/Forest School producer/public result;
- paid-lesson raw journal localization plumbing;
- event-scene raw journal localization plumbing.

## C5-120 candidate rule

Open one focused PR from this branch. Freeze only the exact head that passes repository `mindy-successor check`. Any later head movement requires a concrete CI/QA blocker or explicit Lead request and a complete exact-head re-gate.
