# Lumber PR25 Final-Gate Reconciliation v1

Status: reconciliation against merged PR #25.

PR #25:
- title: `Lead: integrate final release-candidate acceptance gates`;
- merge commit: `961208ea995ca034e8dfe896337a38828db52415`;
- production runtime/content/UI changes: none;
- merge-ref gate: typecheck PASS, validate PASS, build PASS, 218/218 tests PASS.

## PR25 scope

PR25 adds QA-only artifacts:
- `content/school-blocking-scene-compat.fixture.json`;
- `tests/school-blocking-scene-compat.test.ts`;
- `tests/qa-minimal-rc-acceptance-gate-v2.test.ts`.

It does not modify shipped Lumber definitions, core runtime, schema, UI, or target Lumber packs.

## Hard Work

PR25 re-locks the exact production contract:

`ending.lumber.hard-work`

Only condition:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`

No School, Forest, item, relationship, Night, milestone or season prerequisite is added.

## Inventory-derived item capability

PR25 QA asserts that a legacy/test worldFact alone does not grant `enter_old_boundary`.

With no inventory item:
- adding `lumber.capability.enter-old-boundary` worldFact does not make `hasItemCapability(...,'enter_old_boundary')` true.

With actual inventory:
- `old_boundary_token = 1` makes `enter_old_boundary` available.

Therefore the authoritative capability remains inventory-derived.

## Legacy Activity compatibility

PR25 keeps schema4 pre-option Activity compatibility:
- missing `optionModelVersion` restores as version 0;
- available actions remain `advance` and `escape`;
- existing active saves do not require a newly authored route choice.

Future Forest content must not weaken this boundary.

## One-Save logging-road path

PR25 QA repeats the merged one-Save RC path and keeps Forest on the natural shipped route:

`forest.route.logging-road`

Without token ownership:
- logging road is available;
- old-boundary route is unavailable;
- no item/capability accelerator is required for the normal Forest success path.

The path then reaches:
- exact Forest success;
- `lumber-cross.activity-forest-return`;
- real 49-not-eligible state;
- one real 50th `lumber.shift`;
- explicit ending commitment/completion;
- exact `hardWork:lumber` once;
- New Run Meta persistence.

## School blocking-scene ordering

PR25 locks the real School boundary:
- School lesson may produce `base.school`;
- `listen` resolves it;
- resolving the scene does not duplicate tuition, Energy, or typed `lessons_completed`.

The path still verifies that `lumber.school.management-ready` is absent.

Therefore the School management/accounting public-result authoring remains OPEN.

## Old Boundary authoring remains OPEN

PR25 does not select:
- acquisition source;
- acquisition timing/requirements;
- retained vs consumed/turn-in policy;
- repeatability;
- presentation details.

PR25 proves runtime semantics, not product authoring.

Seeded `old_boundary_token` inventory is still not a natural PA09 pass.

## Reconciliation result

PR25 strengthens the technical RC gate without changing Lumber product contracts.

Shipped/runtime state remains GREEN.

Remaining Lumber work is human decision/content authoring only:
1. Old Boundary Token Product decisions;
2. School management public-result authoring;
3. Hunter trail / three challenge families / seasonal Forest depth.

Hard Work remains fully independent.
