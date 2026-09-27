# School PR27 Main Reconciliation v1

Status: current-main reconciliation after merged PR #26, merged PR #27, and the direct post-merge documentation commits on `main`.

Current `main`: `3eb9aed34dc00724832b68f615bedc69ec2dc28b`.

## Technical RC floor

The current technical release-candidate floor is **221/221 tests passing**.

PR #27 merge commit `6cd990f45d368291b4a288f9f48c569f6e0b207f` records a merge-ref `npm run check` pass across:
- typecheck;
- validate;
- build;
- **221/221 tests**.

PR #27 adds compatibility QA only. It does not change production School runtime, content, or UI.

## Schema-4 compatibility after PR #27

Current main directly tests a schema-4 Save with missing `run.progression.school`.

Expected parse result:
```ts
run.progression.school === {tracks:{}}
```

This compatibility default:
- preserves careers;
- preserves quests;
- preserves relationships;
- preserves worldFacts;
- preserves money;
- preserves current-day Energy.

It does **not** weaken School ownership rules.

Once School track state exists, School continues to own:
- per-track counters;
- School facts;
- School milestones;
- School certificates;
- School choices.

Lumber and other domains must not write School-private counters or stages.

## Locked paid-lesson contract

Still locked:
- exactly eight paid courses;
- stable gameplay course IDs;
- locked tuition;
- exactly one current-day Energy per paid lesson;
- locked full stat packages;
- no ordinary School Lust mutation;
- first-class `schoolLesson`;
- per-track `lessons_completed` exactly once;
- semantic paid presentation IDs.

Current merged one-Save/RC evidence still uses Arcana:
- tuition 500;
- Energy -1;
- Magic +4;
- Reason +4;
- Creativity +2;
- `school.track.arcana.lessons_completed +1`.

## Blocking School scene contract

Still locked:
- a paid School lesson may legitimately open the shipped blocking School scene;
- the shipped first scene is `base.school`;
- save/reload preserves that pending scene;
- NightFlow cannot begin while it remains unresolved;
- resolving the scene does not re-charge tuition;
- resolving the scene does not re-spend Energy;
- resolving the scene does not duplicate typed School progress.

PR #25/PR #27 do not replace this contract.

## Night-study contract

Still locked:
- 24 course/stat Night-study choices across the eight courses;
- only a stat supported by the chosen course;
- selected stat +2;
- tuition 0;
- current-day Energy cost 0;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1` exactly once;
- `lessons_completed +0`;
- normal/cheap housing contract preserved;
- street restriction preserved.

Schema-4 omission defaulting to `{tracks:{}}` does not grant Night progress or create phantom School state.

## Management/accounting public result remains OPEN

Current main still has no approved School-side provider or private threshold for the management/accounting result.

The Lumber-side consumer concept/listener exists, but that does not select:
- owning School provider;
- milestone type;
- exact threshold;
- certificate/project/exam definition;
- School publication timing beyond the existing public-boundary contract.

No legacy `metrics.lessons` threshold and no QA fixture threshold becomes production authority.

## Arcana/Forest public result remains OPEN

Current main still has no approved School-side Arcana/Forest provider or private threshold.

Still OPEN:
- provider/milestone category;
- exact threshold/value;
- final School-owned public result identity;
- exact direct Forest consumer/unlock if the durable School-result path is retained.

The current Forest Activity/result runtime remains separate from this unresolved School authoring choice.

## Reconciliation conclusion

After PR #26, PR #27, and the direct post-merge docs updates:
- technical RC floor: **221/221**;
- schema-4 missing School state safely defaults to `{tracks:{}}`;
- School private ownership remains unchanged;
- paid lesson, blocking-scene, and Night-study contracts remain locked;
- management/accounting public-result authoring remains OPEN;
- Arcana/Forest public-result authoring remains OPEN;
- no production School runtime/UI/content change is required by this reconciliation document.
