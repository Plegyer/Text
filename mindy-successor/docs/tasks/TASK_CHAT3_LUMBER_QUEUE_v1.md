# Chat 3 — Lumber Live Slice Queue v1

Base: `1a15f79ba74ba3ef82bc8997d2458fe5a571bedb`
Branch: `chat3/lumber-live-slice`

The corrected prep is now in main. Locked correction: Lumber Hard Work eligibility is exactly 50 completed Lumber shifts, with no milestone/season/relationship/Forest prerequisite.

## No-idle rule

Complete Item 1, run its tests, then continue Item 2 without waiting for Lead review.

## Queue Item 1 — Schema-valid Lumber production fixture

Convert the corrected isolated Lumber draft into schema-valid target content that can be exercised by tests.

Allowed writes:
- new Lumber-specific files under `content/packs/`
- Lumber-specific fixture/definition files under `content/`
- new `tests/lumber-target*.test.ts`
- Lumber prep docs only when implementation reality requires correction

Do not modify shared core or UI.

Must prove in executable tests:
- ordinary Lumber shift costs 1 Energy;
- seasonal package matches the locked matrix exactly;
- career shifts increment exactly once;
- reactive career/Foreman scene costs 0 extra Energy;
- professional non-romance route remains possible;
- Hard Work becomes eligible at exactly 50 shifts and requires nothing else;
- A6 Meta reward is one `hardWork:lumber` reward;
- presentation IDs are semantic and asset-independent.

If the current catalog shape prevents fully loading the fixture without a shared definition edit, keep the fixture executable through a dedicated test catalog builder instead of blocking.

## Queue Item 2 — Cross-system Lumber acceptance fixture

Immediately after Item 1:
- add School-result -> Lumber reaction fixture;
- add item capability opening a Lumber/Forest option;
- add A5 `activityResult` -> Lumber continuation fixture;
- allow at least two Lumber ending eligibilities simultaneously;
- verify eligibility does not auto-commit.

Use synthetic/open parameters only where existing docs explicitly leave values OPEN. Do not invent final lore or balance locks.

## Handoff

Commit stable checkpoints; report only SHA, changed paths, tests, blockers.
