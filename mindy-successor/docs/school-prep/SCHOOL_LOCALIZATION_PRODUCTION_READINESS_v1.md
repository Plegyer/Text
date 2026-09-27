# School Localization Production Readiness v1

Status: localization production-readiness audit after Queue items 118–133.
Scope: player-facing School text only. Mechanics remain locale-neutral and unchanged.

Classification:
- **SHIPPED** — already integrated in production runtime/catalog with RU+EN presentation available.
- **SAFE_TO_INTEGRATE** — authoring/routing is ready, but shared localization runtime/catalog integration is still required.
- **STAGED_ROUTING_BLOCKED** — RU+EN content exists, but exact paid-course routing or another content-routing dependency is still missing.
- **PRODUCT_BLOCKED** — underlying gameplay/content meaning is not decided and must not be invented.

## Summary

| Text family | Status | Reason |
|---|---|---|
| Existing School paid-course mechanics | SHIPPED | Gameplay mechanics already exist and are language-neutral; this is not a new bilingual text asset. |
| Eight-course RU+EN UI labels/descriptions | SAFE_TO_INTEGRATE | Item 130 provides complete RU+EN authoring with locked numbers; shared localization runtime/UI wiring is still needed. |
| Generic post-paid-lesson content | SAFE_TO_INTEGRATE | Current `actionCompleted:school` routing is already sufficient; RU+EN bundle exists. |
| Exact Night-study content | SAFE_TO_INTEGRATE | Existing exact Night-choice IDs already route unambiguously; RU+EN bundle covers all 24 routes. |
| Teacher identity text | STAGED_ROUTING_BLOCKED | RU+EN identities exist, but teacher/course-specific paid-lesson routing is not naturally reachable yet. |
| Repeatable exact-course lesson text | STAGED_ROUTING_BLOCKED | 56 RU+EN lesson variants exist; exact paid-course public routing is still missing. |
| Teacher/course presentation captions/alt text | STAGED_ROUTING_BLOCKED | Localized authoring exists; automatic exact-course presentation remains staged. |
| Generic peer/post-lesson classroom text | SAFE_TO_INTEGRATE | Course-neutral text can use generic School completion routing. |
| Track-specific peer/classroom text | STAGED_ROUTING_BLOCKED | Track-specific automatic selection needs exact course identity or another explicit authored route. |
| Teacher relationship scenes | STAGED_ROUTING_BLOCKED | Draft RU/EN migration is required before shipping, and canonical relationship route IDs/stages are not integrated. |
| Management/accounting milestone/result text | PRODUCT_BLOCKED | Provider, threshold/form, canonical result identity and publication semantics remain OPEN. |
| Arcana/Forest School result text | PRODUCT_BLOCKED | Scope/provider/threshold/public-result/consumer decisions remain OPEN. |
| Certificates/projects/exams | PRODUCT_BLOCKED | Participation and exact authored semantics remain OPEN. |
| Education endings / Meta School text | PRODUCT_BLOCKED | Product rules are not frozen. |
| Final teacher/course GIF assets | STAGED_ROUTING_BLOCKED | Reusable bilingual media mapping exists, but exact paid-course routing and final art approval are not complete. |
| Management/Arcana result art | PRODUCT_BLOCKED | Underlying result semantics are not decided. |

## SHIPPED

No new RU+EN localization bundle from items 118–133 is claimed as production-shipped.

The only SHIPPED row above refers to the existing School gameplay mechanics being language-neutral already.

Do not interpret this audit as proof that:
- runtime locale selection exists;
- bilingual packs are in production catalog inclusion;
- tests/CI have passed.

## SAFE_TO_INTEGRATE

### Eight-course UI RU+EN

Source:
- `prior-work/astra/prototype-m3.2/content/school-ui-ru-en-v1.fixture.json`

Ready authoring:
- 8 course labels;
- concise descriptions;
- tuition/Energy wording template;
- all supported-stat display terms;
- exact locked tuition/Energy/stat amounts.

Blocked only by:
- shared project localization/UI integration.

### Generic post-paid-lesson RU+EN

Sources:
- `school-generic-reachable-v2.json`
- `school-generic-reachable-bilingual-v1.json`
- `school-generic-localization-v2.fixture.json`

Why safe:
- generic public route exists now;
- event is course-neutral;
- choices/effects are presentation-only;
- one gameplay event identity serves RU and EN.

Required before production:
- shared localization lookup;
- explicit catalog inclusion;
- run routing/reload/full School tests.

### Exact Night RU+EN

Sources:
- `school-night-exact-v3.json`
- `school-night-exact-bilingual-v1.json`
- `school-night-localization-v2.fixture.json`

Why safe:
- all 24 Night choice IDs are exact and locale-neutral;
- RU+EN payload is keyed to the same gameplay routes;
- locked Night mechanics are not duplicated in localized content.

Required before production:
- shared localization lookup;
- explicit catalog inclusion;
- run exact Night/reload/full School tests.

### Generic peer/classroom aftermath

Generic course-neutral presentation may share:
- `actionCompleted:school`;
- generic classroom localization/media identity.

It must remain:
- teacher-neutral;
- course-neutral;
- effect-free.

## STAGED_ROUTING_BLOCKED

### Teacher identities

Source:
- `SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md`
- `school-teacher-course-localization-v2.fixture.json`

Content readiness:
- all 8 teacher IDs;
- RU+EN name/role/bio;
- shared visual identity.

Blocker:
- exact paid-course automatic routing is not yet exposed by the public School reaction fact.

### Repeatable paid-lesson content

Source:
- `SCHOOL_REPEATABLE_LESSONS_RU_EN_v1.md`
- `school-teacher-course-localization-v2.fixture.json`

Content readiness:
- 56 bilingual semantic lesson variants;
- 7 per track.

Blocker:
- exact paid course identity is unavailable to authored reaction routing.

### Teacher/course presentation

Source:
- `SCHOOL_BILINGUAL_MULTI_GIF_MAPPING_v1.md`
- `SCHOOL_MULTI_GIF_REACHABLE_STAGED_SPLIT_v2.md`

Blockers:
- exact paid-course route;
- final art/GIF approval.

Static/text fallback remains available.

### Teacher relationships

Current authored relationship material is optional and must never gate ordinary paid lessons.

Additional blockers:
- canonical relationship IDs;
- route/stage policy;
- bilingual production conversion;
- relationship-owned state integration.

## PRODUCT_BLOCKED

### Management/accounting

Still OPEN:
- School provider;
- owning track;
- threshold/form/value;
- Night contribution policy;
- canonical public-result ID/rule;
- result presentation content.

### Arcana / Forest

Still OPEN:
- whether route remains in scope;
- provider;
- threshold/form/value;
- public-result ID/rule;
- exact direct Forest consumer.

### Certificates / projects / exams

Do not localize a final award/result scene until Product decides:
- which types exist;
- provider/eligibility;
- exact canonical ID;
- gameplay consequence.

### Education endings / Meta

Do not create localization keys/content for unresolved endings/Meta rewards as if they were approved gameplay.

## Localization-runtime dependency

Current strict School content schema still stores single strings for:
- title;
- text;
- choice label/text;
- media alt.

Items 121/122/128/131/132/133 intentionally keep bilingual authoring as sidecar/fixture data.

Minimum shared runtime integration must preserve:
- one gameplay event identity;
- one RNG/materialized variant identity;
- one Save identity;
- locale-selected presentation only.

## Routing-runtime dependency

Exact course-specific paid-lesson content requires the minimal seam documented in:
- `SCHOOL_EXACT_COURSE_ROUTING_SEAM_PROPOSAL_v1.md`;
- `SCHOOL_EXACT_COURSE_ROUTING_LOCALIZATION_COMPATIBILITY_v1.md`.

Generic School and exact Night content do not depend on that seam.

## Readiness evidence

Authoring/contract artifacts:
- `SCHOOL_LOCALIZATION_KEY_INVENTORY_v1.md`;
- `school-bilingual-migration-v1.fixture.json`;
- `school-localization-migration-v1.test.ts`;
- `school-ui-ru-en-v1.fixture.json`;
- `school-generic-localization-v2.fixture.json`;
- `school-night-localization-v2.fixture.json`;
- `school-teacher-course-localization-v2.fixture.json`.

This audit does not claim those tests were executed.

## Promotion rule

A text family moves to **SHIPPED** only after:
1. shared localization runtime/UI exists;
2. its gameplay routing is production-reachable;
3. explicit production inclusion is committed;
4. RU and EN completeness validation passes;
5. cross-locale save/reload acceptance passes;
6. no School mechanics differ by locale.
