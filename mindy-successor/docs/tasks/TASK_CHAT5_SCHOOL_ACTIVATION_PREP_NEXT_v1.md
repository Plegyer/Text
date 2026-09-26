# TASK CHAT 5 — School Activation Prep Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat5/school-progression-next`.
Previous checkpoint is frozen for Lead review.

Locked:
- exactly eight paid courses and their current tuition/stat packages;
- each paid lesson costs 1 daytime Energy exactly once;
- no ordinary School Lust gain;
- Night study: Night slot, zero tuition, +2 supported stat, next-day Energy -1;
- gameplay course IDs unchanged;
- presentation IDs kebab-case semantic namespace.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — School progression ownership contract audit

Create NEW files:
- `docs/school-prep/SCHOOL_PROGRESSION_OWNERSHIP_AUDIT_v1.md`
- optional `prior-work/astra/prototype-m3.2/tests/school-progression-ownership-audit.test.ts`

Use locked docs and current runtime to audit the requirement for School-owned progression, including `lessons_completed`.

Document:
- what School progress is currently persisted;
- what is only legacy `metrics.lessons` / action counting;
- what typed School-owned progress is still missing;
- what public cross-system fact mechanism exists today;
- which management/certificate threshold remains OPEN and must NOT be invented.

If adding a test, make it pass by proving the current boundary only. Do not patch schema/runtime.

## Queue item 2 — complete Night-study choice catalog contract

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-night-choice-catalog.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-night-choice-catalog.test.ts`

Generate/verify the complete Night-study choice surface from the locked eight courses:
- unique choice IDs;
- each choice points only to a stat supported by that course;
- exactly +2 selected stat;
- zero tuition;
- no daytime Energy cost;
- next-day Energy delta exactly -1;
- no Lust mutation;
- stable mapping back to course ID and semantic presentation family where applicable;
- no unsupported course/stat pair.

Do not modify `src/core/school.ts` or shared NightFlow. After item 1 commit immediately continue to item 2.
