# TASK CHAT 5 — School Integration Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: continuation of `chat5/school-runtime-slice`.
Rule: PR #17 files are frozen for Lead review; next work uses NEW files only.

## Queue item 1 — School engine-facing fixture adapter

Create isolated target fixture/data and tests that exercise the existing School module through current engine-compatible boundaries without modifying shared engine/schema.

Allowed new files:
- `prior-work/astra/prototype-m3.2/content/school-target-definitions.fixture.json`
- `prior-work/astra/prototype-m3.2/content/packs/school-target/school-production.pack.json`
- `prior-work/astra/prototype-m3.2/tests/school-engine-adapter.test.ts`
- optional note under `docs/school-prep/`

Requirements:
- exactly the locked 8 School packages;
- tuition + 1 Energy exactly once;
- atomic failure for insufficient money/Energy;
- Resolver can observe complete stat package after lesson;
- save/reload cannot recharge tuition/Energy;
- presentation identity is semantic and stable;
- no Lust gain from ordinary School unless already locked elsewhere.

## Queue item 2 — Night study isolated fixture

Add NEW fixture/test files for School Night study:
- Night slot;
- zero tuition;
- +2 selected supported stat;
- next-day Energy -1;
- exactly-once across save/reload;
- no daytime Energy spend for the Night action itself.

Forbidden:
- existing PR #17 files;
- shared engine/schema/content loader;
- Chat 2 presentation runtime files.

Acceptance: isolated fixtures/tests only; no reopening of School catalog decisions.


## Queue item 3 — School Product Acceptance manifest

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-product-acceptance.fixture-manifest.json`
- `prior-work/astra/prototype-m3.2/tests/school-pa-manifest.test.ts`

Map the locked eight courses, their tuition/Energy semantics, supported stats, Night-study hooks and stable semantic presentation IDs. Do not invent teachers/milestones/endings.

## Queue item 4 — School adversarial transaction suite

Create NEW test file only:
- `prior-work/astra/prototype-m3.2/tests/school-transaction-adversarial.test.ts`

Prove across representative single-stat and multi-stat packages:
- insufficient money is atomic;
- insufficient current-day Energy is atomic;
- reload after lesson does not recharge;
- Resolver sees the full stat package, not a partial write;
- Night study is zero tuition, +2 supported stat, next-day Energy -1 exactly once;
- unsupported Night-study stat/course combinations reject atomically.

Do not modify shared engine/schema or existing PR #17 files.


## Lead integration correction — School presentation identity

Gameplay course IDs remain unchanged (for example `school.course.field_craft`).

Presentation IDs use the merged Chat 2 kebab-case namespace:
- `school/literacy-and-numbers/lesson/default`;
- `school/rhetoric-and-social/lesson/default`;
- `school/etiquette-and-presentation/lesson/default`;
- `school/field-craft/lesson/default`;
- `school/physical-training/lesson/default`;
- `school/arts-and-performance/lesson/default`;
- `school/body-confidence/lesson/default`.

Do not use underscores inside presentation namespace segments in new manifests/tests.

- Night tests must establish the normal precondition `story.arrived = true` before calling `endDay`; do not weaken NightFlow to accommodate an incomplete fixture.
