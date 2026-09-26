# School PR24 One-Save State Audit v1

Status: Chat 5 audit of the current Lead shipped one-Save E2E.
Evidence source: `lead/release-candidate-smoke-v2` at `aa32928321cec70b5927edd1219ad877d93651b7`.
Primary evidence:
- `docs/qa-prep/RELEASE_CANDIDATE_SHIPPED_E2E_v1.md`;
- `prior-work/astra/prototype-m3.2/tests/release-candidate-shipped-e2e.test.ts`;
- Lead first-class `schoolLesson` dispatcher/schema integration on that branch.

The shipped one-Save path is:

`Lumber shift -> career milestone -> professional Foreman -> paid Arcana lesson -> first School blocking scene -> NightFlow -> normal lodging -> Foreman Night -> Forest logging-road -> Forest success -> Lumber continuation -> 49-shift accelerator -> ordinary Lumber shift -> Hard Work commit -> complete -> reload/retry -> New Run`.

This audit is School-facing only. It does not reinterpret fixture-only School evidence as product authoring.

## Arcana paid lesson transaction

The one-Save E2E dispatches:

`{type:'schoolLesson', id:'school.course.arcana'}`.

Locked Arcana transaction:
- tuition: **500** exactly once;
- current-day Energy: **-1** exactly once;
- Magic: **+4**;
- Reason: **+4**;
- Creativity: **+2**;
- School track: `school.track.arcana`;
- typed counter: `lessons_completed +1`;
- semantic paid presentation: `school/arcana/lesson/default`.

The Lead E2E asserts the complete stat package after one command boundary. No partial per-stat School transaction is used.

## Exactly-once School progress

After the Arcana lesson the shipped E2E observes:

`run.progression.school.tracks['school.track.arcana'].counters.lessons_completed === 1`.

The lesson is not replayed during the following save/reload or blocking-scene resolution.

No Night-study action occurs in this shipped one-Save path, so the audit does not infer any `night_study_sessions` change.

## First School blocking scene before NightFlow

The paid lesson legitimately opens the shipped blocking event:

`base.school`.

The one-Save path then:
1. reloads the pending scene;
2. resolves choice `listen`;
3. verifies the pending scene is cleared;
4. verifies `school.enrolled === true`;
5. only then begins NightFlow.

Therefore the School transaction and the blocking scene are separate state transitions:
- tuition/Energy/stat/progress commit at the paid lesson;
- the scene is resolved afterward;
- NightFlow must not begin while the School scene remains pending.

## Semantic presentation persistence

The paid School result exposes:

`school/arcana/lesson/default`.

This identity belongs to the paid Arcana transaction and must remain stable across the following save/reload/scene-resolution sequence.

The blocking event itself is a separate event identity; resolving it must not rewrite or replay the paid lesson presentation identity.

## No fabricated management/accounting public fact

The Lead one-Save test explicitly asserts that:

`lumber.school.management-ready`

is **absent** after the paid Arcana lesson and remains absent in the New Run.

This is correct. The final management/accounting School public-result provider, private threshold, milestone type and canonical fact identity remain human authoring decisions.

The Arcana lesson must not fabricate that public fact merely because School progress exists.

## Unrelated Lumber/Forest/Meta state survives School

Before School:
- Lumber first shift has already completed;
- the first Lumber milestone has resolved;
- Foreman professional relationship route is active.

The School transaction must preserve those states while changing only School-owned/character/economy fields that belong to the lesson and any legitimate Resolver output.

After School and Night, the same Save continues through:
- Forest Activity;
- Forest success;
- Lumber continuation;
- Hard Work threshold;
- explicit ending completion;
- exactly-once Meta reward;
- New Run.

The shipped E2E therefore demonstrates that the School transaction does not reset or duplicate unrelated Lumber/Forest/Meta state in the long Save.

## School-facing PR24 verdict

Verified from the current Lead shipped E2E:
- Arcana tuition 500 exactly once;
- paid lesson current-day Energy -1 exactly once;
- full +4 Magic / +4 Reason / +2 Creativity atomically;
- typed Arcana `lessons_completed` becomes 1;
- semantic `school/arcana/lesson/default` is the paid result identity;
- shipped `base.school` blocking scene is resolved before NightFlow;
- no management/accounting School public fact is fabricated;
- the same Save continues through Lumber, Forest, ending completion and New Run.

Still OPEN and not closed by PR24:
- final management/accounting public-result authoring;
- final Arcana/Forest School public-result authoring;
- teacher identities/content depth;
- certificate/project/milestone thresholds not otherwise authored.
