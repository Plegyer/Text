# TASK CHAT 5 — School Reachability Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: completed `chat5/school-save-compat-next`.
Previous checkpoint is frozen for Lead review.

Locked School mechanics remain unchanged:
- exactly eight paid courses with current tuition/stat packages;
- each paid lesson costs 1 current-day Energy exactly once;
- ordinary School does not mutate Lust;
- Night study consumes the Night slot, costs 0 tuition/current-day Energy, gives +2 supported stat and next-day Energy -1;
- gameplay course IDs remain unchanged;
- presentation IDs remain semantic kebab-case.

Do not edit Lead-owned shared runtime/schema/build/UI while `lead/product-activation-school-lumber-v2` is active.

## Queue item 1 — School production reachability scenario

Create NEW files only:
- `prior-work/astra/prototype-m3.2/content/school-production-reachability.fixture.json`
- `prior-work/astra/prototype-m3.2/tests/school-production-reachability.test.ts`

Represent an executable reachability contract from an arrived active run through:
- opening School;
- selecting any of the eight paid courses;
- paying tuition + 1 Energy atomically;
- full stat package application;
- typed `lessons_completed` increment;
- deterministic semantic presentationId;
- save/reload after the lesson;
- end-day -> lodging -> Night study;
- typed `night_study_sessions` increment;
- next-day Energy -1 exactly once;
- save/reload after Night completion.

For every step name the exact existing API/command expected after production activation. If a UI seam is not yet shipped, mark it explicitly as activation-dependent rather than inventing one.

## Queue item 2 — School -> Lumber public-boundary readiness contract

Create NEW files only:
- `docs/school-prep/SCHOOL_LUMBER_PUBLIC_BOUNDARY_READINESS_v1.md`
- `prior-work/astra/prototype-m3.2/tests/school-lumber-public-boundary-readiness.test.ts`

Separate what is already executable from what is still authoring-OPEN:
- physical/stat School changes may trigger Lumber through normal `statChanged` reaction facts;
- School-owned typed progress remains School-owned;
- cross-system durable facts must cross through public facts/worldFacts or a future domain-public equivalent;
- final management/accounting public fact ID remains OPEN;
- final Arcana/forest School fact ID remains OPEN;
- no certificate/milestone threshold may be invented;
- Hard Work eligibility must remain completely independent of School.

The focused test should prove current locked boundaries and fail if a fixture silently invents a management/certificate threshold or adds a School prerequisite to Hard Work.

After item 1 commit immediately continue to item 2 without waiting for Lead review.
