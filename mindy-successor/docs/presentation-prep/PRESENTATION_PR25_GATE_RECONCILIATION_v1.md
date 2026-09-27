# Presentation PR25 Gate Reconciliation v1

Current main baseline: `4c86946167bf424665a499875c597afeb340ab8f`.

PR #25 is a **QA-only release-candidate acceptance gate**. It adds no production runtime/content/UI presentation identity.

## School ordering

The merged presentation order remains:

`school/arcana/lesson/default -> pending base.school / lesson -> listen -> NightFlow`.

Ownership remains:

- paid lesson result: `lastAction`;
- blocking School scene: `pendingScene`;
- Night lodging/choice flow: `NightFlow`.

Resolving the blocking scene after reload does not repeat tuition, daytime Energy cost, or typed School progress.

## Activity / ending ownership

PR25 does not change presentation ownership:

- active Forest traversal: Activity state;
- ending eligible/committed: ending state;
- completed ending: RunResult;
- New Run: fresh location/day context.

## No timing coupling

PR25 introduces no presentation rule in which:

- animation completion applies mechanics;
- frame index is saved;
- playback time is saved;
- command availability depends on animation state.

Gameplay flow state continues to own blocking and command availability.

## No new production presentation identity

PR25 changed QA/fixture material only.

Its School compatibility fixture preserves the already-shipped paid lesson identity:

`school/arcana/lesson/default`.

The production School blocking scene remains:

`location/town/event/base-school/lesson`.

No PR25 QA artifact authorizes a new production semantic presentation slot.

## Conclusion

Presentation-side PR25 reconciliation is green:

- School result -> blocking scene -> NightFlow ordering preserved;
- state ownership unchanged;
- animation timing remains non-mechanical;
- current production RC semantic identity set remains the reconciled post-PR24 set.
