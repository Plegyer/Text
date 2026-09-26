# TASK CHAT 3 — Lumber Production Proof Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat3/lumber-pa-scenario-next`.
Previous checkpoint is frozen for Lead review.

Locked:
- Hard Work eligibility = ONLY `completed_shifts >= 50`;
- no milestone / relationship / season / Forest / School prerequisite;
- A5 continuation boundary = `activityResult`;
- A6 rewardId = exactly `hardWork:lumber`.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — legacy/new Lumber coexistence audit

Create NEW files only:
- `docs/lumber-prep/LUMBER_LEGACY_TARGET_COEXISTENCE_AUDIT_v1.md`
- `prior-work/astra/prototype-m3.2/tests/lumber-legacy-target-coexistence.test.ts`

Audit current main contracts for coexistence of legacy action `lumber` and target action `lumber.shift`.

Prove/document:
- they are distinct action IDs and must not overwrite each other;
- old schema-4 saves with actionCounts for `lumber` remain parseable while target activation introduces `lumber.shift`;
- target career counter `completed_shifts` is not silently inferred from legacy actionCounts;
- target semantic presentation for `lumber.shift` remains `job/lumber/shift/<season>/default`;
- Hard Work reads only target `completed_shifts`, never legacy visit/action count.

Do not implement migration between old/new Lumber progress unless an accepted contract already exists.

## Queue item 2 — shipped Lumber pack parity contract

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-shipped-pack-parity.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-shipped-pack-parity.test.ts`

Build an exact parity manifest for the three approved Lumber production event families:
- career / Foreman progression;
- School/Forest cross-system return;
- Foreman Night continuation.

For each family record:
- pack id;
- event IDs;
- read/write capability domains;
- required media IDs;
- semantic presentation IDs;
- required target definitions.

Verify:
- synthetic `school.lumber-management` is not a production requirement;
- no event adds a second Hard Work prerequisite;
- Forest success continuation is driven by exact `activityResult`;
- exact `hardWork:lumber` survives unchanged.

No shared production file edits. After item 1 commit immediately continue to item 2.


## Queue item 3 — Lumber shipped activation expectation matrix

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-shipped-activation-expectations.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-shipped-activation-expectations.test.ts`

Record the exact production expectations for:
- legacy `lumber` coexistence;
- target `lumber.shift`;
- career machine;
- Foreman relationship;
- Forest Activity;
- Lumber endings;
- the three approved Lumber event pack families.

Synthetic `school.lumber-management` must be explicitly excluded.

## Queue item 4 — Lumber schema-4 legacy save compatibility fixture

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-schema4-legacy-save.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-schema4-legacy-save.test.ts`

Prove at the fixture/contract level:
- a pre-target save may contain legacy actionCount `lumber`;
- target `lumber.shift` progress is separate;
- no implicit conversion to `completed_shifts`;
- old unrelated progression remains unchanged;
- Hard Work cannot become eligible from legacy actionCount alone.

Do not implement migration.

## Queue item 5 — Lumber cross-system reload chronology

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/lumber-cross-system-reload-chronology.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-cross-system-reload-chronology.test.ts`

Cover save/reload boundaries across:
- shift result;
- reactive career milestone;
- Foreman route;
- Night meeting;
- Forest entry/checkpoint/result;
- Hard Work commit/completion;
- separate complex ending.

No duplicated Energy, lodging payment, progress or meta reward.

## Queue item 6 — Lumber unresolved dependency ledger

Create NEW files only:
- `docs/lumber-prep/LUMBER_UNRESOLVED_DEPENDENCY_LEDGER_v1.md`
- optional `prior-work/astra/prototype-m3.2/tests/lumber-unresolved-dependency-ledger.test.ts`

Track only genuine OPEN production dependencies:
- Old Boundary Token capability acquisition/use source;
- School management/accounting public fact ID/threshold;
- Arcana/forest School public fact ID/threshold;
- any deeper Forest authoring not already locked.

For each dependency state what is already executable and what must not be invented.

Hard Work is NOT an open dependency and must remain ONLY `completed_shifts >= 50`.

Continue sequentially through items 3–6 without waiting for Lead review.
