# TASK CHAT 2 — Presentation Registry / Migration Queue v1

Status: ACTIVE / CONTINUOUS.
Base: continuation of `chat2/phase-b-central-stage`.
Rule: do not edit files currently under Lead review in PR #15 unless Lead explicitly returns ownership.

## Queue item 1 — semantic registry fixture

Create a target-shaped presentation registry fixture and focused tests in NEW files only.

Allowed new files:
- `prior-work/astra/prototype-m3.2/content/presentation-target-registry.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/presentation-registry-fixture.test.ts`
- optional note under `docs/presentation-prep/`

Requirements:
- cover location, Lumber shift/result/event, School, relationship, Night, Activity and ending families;
- use locked semantic `presentationId` taxonomy;
- GIF primary, static/text fallback;
- no mechanics, RNG, Energy or effect data in presentation entries;
- explicit fallback chain, no cycles;
- include target-shaped IDs such as `job/lumber/shift/spring/default` and `ending/lumber/hard-work`;
- missing asset remains non-fatal.

## Queue item 2 — legacy-to-target presentation migration matrix

In new files only, add a migration mapping fixture/test from legacy M3.2 media IDs to semantic presentation IDs.

Requirements:
- deterministic mapping only;
- do not rename gameplay IDs;
- one legacy asset may map to multiple semantic slots when intentional;
- unknown legacy key must be reported as orphan/unsupported, never guessed;
- pending event/variant identity must remain unchanged;
- no GIF timing/frame persistence.

Forbidden:
- `src/core/presentation.ts`
- `src/ui/app.ts`
- `src/ui/editor.ts`
- `src/ui/style.css`
- existing PR #15 tests
until Lead releases those paths.

Acceptance: new files compile/test against the current continuation branch and do not change gameplay state semantics.
