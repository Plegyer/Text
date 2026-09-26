# School Runtime Integration Wiring v1

Status: integration-ready handoff from Chat 5.
Scope: smallest shared-file wiring needed to activate the isolated School runtime module. No shared files are modified by this branch.

## Prepared runtime source

Use:
- `src/core/school.ts` as the single School balance/runtime source;
- `tests/school-target.test.ts` as the transaction/save/reload fixture.

The module owns:
- all eight stable course IDs;
- exact tuition values;
- exact 1-Energy lesson cost;
- exact multi-stat packages;
- presentation IDs;
- direct-coverage helpers;
- atomic School precheck;
- lesson effect construction;
- injected-runtime executable lesson helper;
- Night-study choice construction and enumeration.

Do not re-copy those numeric constants into engine/UI code.

## Shared edit 1 — src/core/engine.ts

This is the only unavoidable shared core edit for paid lessons.

Add imports:

```ts
import {
  SCHOOL_ACTION_ID,
  assertSchoolLessonAvailable,
  getSchoolCourse,
  schoolLessonEffects,
  type SchoolCourseId
} from './school.ts';
```

Extend `Command`:

```ts
| {type:'schoolLesson';courseId:SchoolCourseId}
```

Inside `dispatch`, after character creation/status/current-flow guards and before the generic action branch, add a School branch that uses the existing mutable effect/resolver boundary rather than duplicating School constants:

```ts
if(command.type==='schoolLesson'){
  const course=getSchoolCourse(command.courseId);
  assertSchoolLessonAvailable(s,course);

  applyEffectsMutable(s,schoolLessonEffects(command.courseId),cat,true);

  s.run.historyState.actionCounts[SCHOOL_ACTION_ID]=Math.min(
    1_000_000,
    (s.run.historyState.actionCounts[SCHOOL_ACTION_ID]??0)+1
  );

  register(s,cat);
  runResolverBoundary(
    s,
    input,
    cat,
    [{kind:'actionCompleted',action:SCHOOL_ACTION_ID}],
    true
  );
  return s;
}
```

Why use the engine-local mutable path for final integration instead of simply returning `executeSchoolLesson(...)`:
- `register` remains part of the canonical engine boundary;
- `runResolverBoundary` already collects all changed stats/resources/Energy from the full post-lesson state;
- career/relationship/endings observation therefore happens after the complete multi-stat batch;
- the module still remains the single source for price/effect constants and prechecks.

The isolated `executeSchoolLesson` helper is retained for direct runtime/fixture use and for adapters outside `dispatch`.

## Shared edit 2 — active catalog bootstrap for Night study

Night study must remain a real Night choice, not a daytime School command.

At the point where raw definitions are prepared before `loadCatalog`, append generated School choices from the runtime module:

```ts
import {schoolNightStudyChoices} from '../core/school.ts';

const definitions={
  ...raw.definitions,
  nightChoices:[
    ...(raw.definitions.nightChoices??[]),
    ...schoolNightStudyChoices()
  ]
};

baseCatalog=loadCatalog(definitions,raw.packs);
```

In the current prototype this bootstrap is in `src/ui/app.ts` around the `loadCatalog(raw.definitions, raw.packs)` call.

This avoids duplicating:
- `+2` study gain;
- next-day Energy `-1`;
- supported track/stat pairs.

Later enrollment/known-track filtering should be represented as authored/typed conditions once School progression state is wired. Do not change the mechanical Night-study values.

## Legacy action quarantine

Current `content/definitions.json` still contains the old prototype `action.id === "school"` with obsolete 18-coin/legacy-intelligence mechanics.

Do not route production School UI through that generic action after `schoolLesson` is wired.

For compatibility, the Lead may temporarily keep the legacy action definition so old action counters remain parseable, but the product School selector must dispatch `schoolLesson` with a stable `SchoolCourseId`.

Removing or rewriting the legacy action requires a save-compatibility decision and is therefore not part of this isolated branch.

## Presentation/result wiring

The course record already exposes `presentationId`.

The engine/UI integration should use that stable ID for School result presentation when the central-stage presentation layer is ready. Media lookup must not apply mechanics.

No additional School balance data should be copied into presentation JSON.

## Transaction guarantees supplied by this slice

The dedicated fixture covers:
- insufficient money rejection without mutation;
- insufficient Energy rejection without mutation;
- tuition and 1 Energy applied once;
- complete multi-stat package visible before Resolver event selection;
- free reactive career event after School without Work;
- repeated save/reload preserving the already-paid state without another charge;
- Night study as a separate Night-slot choice with zero tuition, +2 supported stat and next-day Energy -1;
- no ordinary Night-study certificate/milestone side effect.

## No new authorial state

This wiring does not define:
- teachers;
- certificates;
- milestones;
- exams/projects;
- School endings;
- conversion-service fiction/economics.

Those remain separate authorial/system work.
