# Lumber Legacy / Target Coexistence Audit v1

Status: Chat 3 production-proof audit.
Branch: `chat3/lumber-production-proof-next`.
Scope: data/save coexistence only; no shared runtime/schema/build/UI changes.

## Audited identities

Current legacy product definitions contain action:

- `lumber`

The target Lumber slice defines a distinct action:

- `lumber.shift`

These IDs are not aliases and must coexist without replacement.

The legacy action remains historical/prototype gameplay content with its own wage, legacy metric effects, scenes, and `actionCounts.lumber` history. The target action owns the new Lumber progression transaction and increments:

- career: `lumber`
- counter: `completed_shifts`
- amount: `+1`

No accepted contract currently migrates old `actionCounts.lumber` into target `completed_shifts`.

## Schema-4 save boundary

Schema 4 persists generic action history in:

`run.historyState.actionCounts`

The compatibility facade exposes the same map as:

`run.actionCounts`

`parseSave` validates action-count keys against action IDs present in the loaded catalog. Therefore a production catalog that intentionally contains both `lumber` and `lumber.shift` can continue to parse a schema-4 save that already contains `actionCounts.lumber`.

This is save compatibility, not progression migration.

A parsed legacy count such as:

`actionCounts.lumber = 50`

must remain only action history. It must not synthesize:

- `progression.careers.lumber`;
- `completed_shifts`;
- the first-shift milestone;
- Foreman relationship progress;
- Hard Work eligibility.

## Target career ownership

Target Lumber Hard Work reads exactly one condition:

`careerCounter(lumber, completed_shifts) >= 50`

It does not read:

- legacy `visits`;
- `actionCounts.lumber`;
- milestone state;
- relationship state;
- season;
- Forest state;
- School state.

Accordingly, an old save with 50 or more legacy Lumber visits remains below the target Hard Work gate until the player accumulates target `completed_shifts` through the target progression path.

No backfill rule is introduced by this audit.

## Presentation coexistence

The target semantic presentation namespace is derived from `lumber.shift` and its target scene IDs:

- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

Those semantic IDs are distinct from the legacy action's dotted media IDs such as `stage.lumber.spring`.

The legacy action may remain parseable/present while target UI/presentation activation routes the target action through the slash semantic namespace.

## Collision rule

Because `lumber` and `lumber.shift` are intentionally distinct, activation must add the target action rather than overwrite the legacy action.

If a future merge accidentally attempts to insert another action with exact ID `lumber`, that is a duplicate-ID integration error and must be rejected rather than treated as a migration.

## Locked Hard Work invariant

Hard Work remains:

- ending: `ending.lumber.hard-work`;
- eligibility: **ONLY** `completed_shifts >= 50`;
- A6 reward ID: exactly `hardWork:lumber`.

Legacy action history is not a Hard Work prerequisite or migration source.
