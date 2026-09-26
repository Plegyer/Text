# TASK CHAT 5 — School Product Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: current main after PR #19.
Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber` is active.

Locked School rules remain:
- exactly eight paid courses;
- tuition values/packages unchanged;
- each paid lesson costs 1 daytime Energy exactly once;
- ordinary School does not change Lust;
- Night study uses Night slot, zero tuition, +2 supported stat, next-day Energy -1;
- gameplay course IDs stay unchanged;
- presentation IDs use kebab-case semantic namespace.

## Queue item 1 — full School production UI/data manifest

Create NEW files:
- `prior-work/astra/prototype-m3.2/content/school-production-ui.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-production-ui-fixture.test.ts`

Manifest exact data needed by a production School picker:
- all eight course IDs;
- labels;
- tuition;
- 1 Energy cost;
- complete stat package;
- semantic presentationId;
- supported Night-study stats per course.

Verify:
- all 12 progression stats have paid School coverage;
- no ordinary course effect targets Lust;
- no duplicate course/presentation IDs;
- no underscore inside presentation namespace segments;
- no teacher/milestone/ending lore or thresholds are invented.

Do not modify `src/core/school.ts` or UI.

## Queue item 2 — exhaustive School reload matrix

Create NEW test file:
- `prior-work/astra/prototype-m3.2/tests/school-full-reload-matrix.test.ts`

Using current School module and isolated fixture catalogs:
- run every one of the eight paid courses through save/reload;
- prove tuition and 1 Energy are committed exactly once;
- prove full stat package persists;
- prove Resolver sees the full package;
- prove no Lust mutation;
- exercise representative Night study for every course and supported-stat family;
- prove Night study zero tuition, +2 chosen supported stat, next-day Energy -1 exactly once;
- unsupported course/stat combinations reject atomically;
- post-Night save/reload catalogs must declare all persisted IDs/media correctly.

No shared runtime/schema edits. After item 1 commit immediately continue to item 2.
