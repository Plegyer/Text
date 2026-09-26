# Presentation Current Main Drift Audit v1

Current main: `7acbce7f8bdf911ce8ab3ed1a4b3e5e0902cd798`.

Reference Product Acceptance merge: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25` (PR #21).

## Main moved after PR21 without presentation runtime drift

The six commits after PR21 touch coordination/state documentation only:

- `docs/CURRENT_PROJECT_HANDOFF_v1.md`;
- `docs/DOCUMENT_AUTHORITY_AND_INDEX_v0.md`;
- `docs/PARALLEL_WORK_BOARD_v1.md`;
- `docs/PROJECT_STATE.md`.

No production runtime, presentation runtime, catalog, pack, schema, UI, asset, or test file changed between the PR21 merge and current main.

Therefore current production presentation behavior remains the PR20/PR21 shipped behavior while project-state documentation has advanced.

## Delta classification

### Already shipped

These branch assumptions are already production behavior and should not be proposed as new changes:

- slash semantic `presentationId` save/reload compatibility;
- semantic IDs on pending reactive scenes;
- all eight paid School lesson presentation slots;
- Forest Activity route/result semantic slots;
- shipped target Lumber/Foreman/Night image media;
- static-backed central presentation behavior;
- separation of presentation identity from animation frame/time.

### Useful branch-only QA

These remain useful because they add focused verification without demanding runtime changes:

- semantic ID drift detector;
- PA visible checkpoint matrix;
- fallback exhaustion adversarial suite;
- media-path preflight;
- deterministic replacement ordering;
- accessibility metadata checks;
- central-stage interaction contract;
- PR21-aligned fallback asset integrity;
- replacement-vs-shipped-catalog conflict matrix;
- post-PR21 presentation smoke;
- PA closure dependency classification.

### Stale / superseded

Historical artifacts are not defects merely because they differ from current main.

Notable examples:

- `presentation-production-patch-plan.fixture.json` was a pre-activation plan;
- `presentation-shipped-closure-inventory.fixture.json` predates shipped Product Activation;
- `presentation-production-smoke.fixture.json` predates the PR21 evidence path;
- `presentation-pa-scenario.fixture.json` is superseded by finer PA checkpoint/smoke evidence;
- `presentation-asset-consistency.fixture.json` reflects pre-activation School fallback assumptions for several courses and must not be treated as the authoritative current-main School media map;
- old target-only Lumber pack declarations under `content/packs/lumber-target/` are authoring/target evidence, not the current production pack surface.

The PR21-aligned `presentation-fallback-asset-integrity.fixture.json` is the stronger current shipped fallback source.

### Blocked by gameplay authoring

The remaining PA closure gaps are not presentation-runtime drift:

- Old Boundary Token acquisition/use;
- School management/accounting public result;
- deeper Forest route/challenge/season depth;
- item-driven Activity action-space behavior.

Presentation is either already ready to display the resulting state or independent of the missing mechanic.

## No historical-difference change requests

This audit does not request a runtime/catalog change because a historical fixture differs.

A change request is warranted only when a current-main behavior fails a current accepted presentation requirement.

## Current integration preference

Prefer the latest PR21-aware QA artifacts over historical pre-activation mirrors:

1. semantic drift;
2. PA checkpoints;
3. fallback exhaustion;
4. fallback asset integrity;
5. central-stage interaction;
6. post-PR21 smoke;
7. accessibility/security/replacement conflict tests.

Keep historical planning fixtures only as evidence of how the design converged.
