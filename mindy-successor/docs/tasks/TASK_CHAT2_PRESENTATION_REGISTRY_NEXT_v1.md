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


## Queue item 3 — presentation registry adversarial coverage

Create NEW test files only:
- `prior-work/astra/prototype-m3.2/tests/presentation-registry-adversarial.test.ts`

Cover:
- duplicate semantic IDs;
- fallback-to-missing target;
- fallback cycle;
- animation-off with no static media reaches safe inherited/text fallback;
- registry entries contain no mechanics/effects/RNG/Energy fields;
- changing asset source does not change semantic ID.

Do not modify runtime/editor files.

## Queue item 4 — portable override-pack contract

Create NEW files only:
- `docs/presentation-prep/PRESENTATION_OVERRIDE_PACK_CONTRACT_v1.md`
- optional `prior-work/astra/prototype-m3.2/content/presentation-override-pack.fixture.json`
- optional focused schema/fixture test in a new test file.

Define/verify a portable user override pack keyed by `presentationId`: metadata + GIF/static references, no gameplay save data, unknown IDs quarantined/rejected, atomic activation, versioned separately from life saves. Do not choose a final desktop filesystem location.
