# School Localization Natural-Path Smoke v1

Status: natural-path UI smoke plan for School RU+EN after localization integration.

Goal:
prove that a real School play path changes presentation language only, while paid-course and Night-study gameplay state stay identical.

## Preconditions

Use a build that contains:
- shared RU+EN localization runtime/UI;
- School main localization delta;
- eight-course UI localization;
- generic reachable School post-lesson content;
- exact Night-study localized content;
- unchanged School paid/Night mechanics.

Do not seed:
- School-private counters;
- synthetic world facts;
- synthetic event instances.

Use an ordinary fresh/compatible Save with enough money and Energy to buy the selected paid lesson.

## Smoke A — RU School panel

1. Set locale to RU.
2. Open town School panel.
3. Verify title/help are Russian.
4. Verify all eight course labels/descriptions resolve in Russian.
5. Verify exact shared tuition/Energy numbers.
6. Verify supported-stat amounts.
7. Record selected test course ID.

Suggested test course:
- `school.course.arcana`

Expected Arcana mechanics:
- tuition 500;
- current-day Energy 1;
- Magic +4;
- Reason +4;
- Creativity +2.

Pass:
- UI copy RU;
- course ID remains locale-neutral;
- no action occurs from opening/switching locale alone.

## Smoke B — natural paid lesson

From the RU School panel:
1. choose the paid lesson using the normal School button;
2. do not use direct counter/stat setup;
3. record money, Energy, relevant stats, Lust, typed School progress before/after.

Expected:
- tuition charged once;
- Energy charged once;
- full stat package applied once;
- ordinary Lust unchanged;
- paid `lessons_completed` increments once where active;
- no Night counter increment.

## Smoke C — generic authored follow-up

After the paid lesson:
1. let the normal Resolver process `actionCompleted:school`;
2. confirm generic School follow-up materializes naturally if its pack is included;
3. record:
   - event ID;
   - variant ID;
   - instance/reaction identity;
   - allowed choice IDs;
   - presentation/media identity.

Expected:
- generic event is course-neutral;
- no specific teacher is asserted solely from generic routing;
- opening/resolving the follow-up has no School mechanics effects.

## Smoke D — switch to EN with pending follow-up

Before resolving the generic follow-up:
1. switch language RU -> EN;
2. keep the same Save/state;
3. open the existing materialized event.

Expected:
- same event ID;
- same variant ID;
- same instance ID;
- same allowed choice IDs;
- same selected media/pool candidate identity;
- title/text/choice/alt switch to EN;
- no reroll;
- no duplicate event;
- no additional tuition/Energy/stat/progress.

## Smoke E — save/reload in EN

1. save while the localized follow-up is pending or immediately after resolution;
2. reload with EN active;
3. compare School gameplay state with the pre-language-switch snapshot.

Expected unchanged:
- money;
- current-day Energy;
- all 12 stats;
- Lust;
- typed School progress;
- world facts;
- unrelated career/relationship/quest state.

If the event is still pending:
- same event/variant/choice identity remains.

## Smoke F — Night flow natural entry

Continue through the ordinary end-of-day/Night flow.

1. select valid lodging normally;
2. enter the voluntary Night-choice step;
3. choose an exact School Night-study identity.

Suggested route:
- `school.night_study.arcana.reason`

Do not inject the Night event directly.

Expected locked mechanics:
- tuition 0;
- current-day Energy cost 0;
- Reason +2;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`.

## Smoke G — exact Night localized presentation

After the real Night-study choice:
1. allow the exact `nightChoiceCompleted` route to materialize the matching authored event;
2. verify only the exact matching Night event is routed;
3. record event/variant/presentation identity.

For `school.night_study.arcana.reason`, reject:
- Arcana Magic event;
- Arcana Creativity event;
- every other course/stat Night event.

Expected:
- EN text shown while EN is active;
- exact gameplay choice ID stays locale-neutral;
- presentation adds no second mechanics effect.

## Smoke H — switch back to RU

With the exact Night presentation pending:
1. switch EN -> RU;
2. open or reload the same presentation.

Expected:
- same event ID;
- same variant ID;
- same instance/reaction identity;
- same media semantic ID/pool candidate;
- RU presentation text/alt;
- no replay of +2 stat;
- no second next-day Energy penalty;
- no second Night counter increment.

## Smoke I — final state comparison

Compare the final Save against the mechanically expected path.

The only locale-sensitive differences may be:
- active UI locale preference outside School gameplay state;
- rendered text;
- localized alt/captions.

School gameplay state must be identical to the same action sequence performed without language switching.

## Required evidence

Record:
- build/commit;
- locale runtime commit;
- School localization delta commit;
- screenshots of RU School panel and EN School panel;
- paid lesson before/after state;
- generic event ID/variant before and after switch;
- Save/reload comparison;
- exact Night choice ID;
- exact Night event ID/variant;
- Night before/after state;
- proof no duplicate effect occurred.

## Failure conditions

Smoke fails if:
- RU/EN chooses different gameplay course/choice IDs;
- switching language changes availability;
- paid lesson applies twice;
- generic follow-up rerolls;
- Night exact route changes;
- Night mechanics replay on presentation;
- a localized event duplicates its gameplay event;
- locale switch changes School progress/world facts;
- staged teacher/course content appears without exact-course routing.

## Out of scope

This smoke does not approve or test unresolved:
- management/accounting School result;
- Arcana/Forest School result;
- certificates/projects/exams;
- teacher relationship progression;
- education endings/Meta.

Those remain Product-blocked.
