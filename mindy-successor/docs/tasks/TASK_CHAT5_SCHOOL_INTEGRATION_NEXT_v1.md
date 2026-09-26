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
