# School → Lumber Public Fact Authoring Packet v1

Status: smallest accepted cross-system authoring seam.
Scope: School-owned publication into the existing Lumber listener.

## Existing Lumber listener

The Lumber cross-system pack already listens for exactly:

`lumber.school.management-ready`

Listener event:

`lumber-cross.school-management-return`

Reaction trigger:

`worldFactAdded(lumber.school.management-ready)`

Additional listener condition:

- Foreman relationship stage must be `route-professional`.

When resolved through choice `apply`, Lumber owns and writes its own career facts:

- `management-school-ready`;
- `forewoman-problem-resolved`.

Those facts are then part of the separate Forewoman ending path.

## Smallest accepted School authoring boundary

School needs to do exactly one public cross-system thing:

> after an accepted School-owned progression result is earned, publish the durable world fact `lumber.school.management-ready` exactly once.

The School side owns:

- the private School progress that makes the result eligible;
- the decision that the result is earned;
- publishing the public fact.

The Lumber side owns:

- listening to that public fact;
- its reaction scene;
- its career facts;
- Forewoman ending conditions.

School must not write Lumber career state directly.

Lumber must not write School counters, milestones or certificates directly.

## What remains OPEN

This packet intentionally does **not** decide:

- which School course emits the fact;
- which School track owns the threshold;
- required `lessons_completed`;
- stat threshold;
- milestone ID;
- project ID;
- exam ID;
- certificate ID;
- teacher or fiction;
- whether multiple School paths may eventually emit the same public result.

These are School authoring decisions.

## What must not be used

Synthetic fixture action:

`school.lumber-management`

is not a production provider.

Legacy `metrics.lessons` is not the School-owned threshold.

Generic action counting is not the School-owned threshold.

No legacy “three lessons” rule may be imported as target canon.

## Save/reload contract

The public boundary is durable.

### Before publication

School-private progress may already satisfy whatever future authored rule exists, but:

`lumber.school.management-ready`

is absent.

### Publication transaction

The School-owned transaction adds the world fact exactly once.

Resolver may immediately select:

`lumber-cross.school-management-return`

if the professional Foreman condition is satisfied.

### Reload with pending Lumber listener

Save/reload must preserve:

- the world fact;
- pending event ID;
- pending variant/choice snapshot;
- School-owned progress;
- Foreman route.

Reload must not:

- republish the fact;
- charge School tuition/Energy again;
- duplicate School progress;
- duplicate Lumber career facts before the Lumber choice resolves.

### After Lumber continuation

Resolving `apply` adds the two Lumber career facts once.

A later reload must preserve them without replaying the School transaction.

## Public ownership contract

Public fact storage:

`run.progression.worldFacts`

Writer:

School-owned accepted progression transaction.

Reader:

Lumber `lumber-cross` pack.

Lumber pack declared read:

`lumber.school.management-ready`

Lumber does not need access to School-private counters to react.

## Presentation / timing

The School transaction may have its own School presentation.

The Lumber reaction uses its own Lumber semantic event presentation identity.

Cross-system reaction is reactive and must not consume another Lumber Work shift or extra daytime Energy merely to notice an already-earned School result.

## Hard Work isolation

This public fact is **not** a Hard Work prerequisite.

Hard Work remains only:

`completed_shifts >= 50`

and exact reward:

`hardWork:lumber`.
