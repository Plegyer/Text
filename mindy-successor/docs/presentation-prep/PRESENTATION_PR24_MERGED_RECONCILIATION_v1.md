# Presentation PR24 Merged Reconciliation v1

Status: reconciled against merged PR #24 and post-merge main.

The earlier pre-fix Chat 2 PR24 presentation audit skipped a real blocking School scene. That assumption is now corrected.

## Final merged one-Save School boundary

The merged path is:

`school/arcana/lesson/default -> pending base.school / lesson -> choice listen -> NightFlow`.

Exact presentation identities:

- paid School result: `school/arcana/lesson/default`;
- blocking School event: `location/town/event/base-school/lesson`;
- blocking scene media: `base.workshop -> assets/workshop.svg`;
- then, after `listen`, the pending scene clears and NightFlow may begin.

The School scene is owned by `pendingScene`, not by the lesson result and not by NightFlow.

## Transaction boundary

The paid lesson transaction is already committed before the blocking scene:

- tuition;
- daytime Energy;
- stat gains;
- typed `lessons_completed`.

Reloading and choosing `listen` must not repeat any of those effects.

## Presentation boundary

The School result and School blocking event are two distinct visible presentation boundaries.

The event semantic ID is generated from the real event/variant identity:

- eventId: `base.school`;
- variantId: `lesson`;
- presentationId: `location/town/event/base-school/lesson`.

It uses shipped workshop static media and remains safe with animations disabled.

## Hard Work accelerator

The merged PR24 test also proves:

- `completed_shifts=49` is still not eligible after reload;
- a real ordinary 50th `lumber.shift` crosses the threshold.

That accelerator is gameplay test setup only and introduces no presentation authoring.

## Reconciliation conclusion

The pre-fix assumption “School result goes directly to NightFlow” is superseded.

Final presentation evidence must include the blocking `base.school -> listen` scene before NightFlow.
