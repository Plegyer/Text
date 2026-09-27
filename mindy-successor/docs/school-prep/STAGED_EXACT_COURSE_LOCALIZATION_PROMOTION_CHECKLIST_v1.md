# Staged Exact-Course Localization Promotion Checklist v1

Status: promotion gate for staged School teacher/course localized content.
Scope: content may enter root production only after every required gate below is satisfied.

## 1. Exact paid-course routing seam shipped

Required:
- exact successful paid lesson exposes the canonical existing `school.course.*` identity to authored reactions;
- generic `actionCompleted:school` remains backward-compatible;
- rejected lessons emit no exact-course completion fact;
- one successful lesson emits the exact-course fact once;
- no Save migration is required solely to reconstruct an already materialized reaction.

Evidence:
- shared runtime commit/PR;
- exact-course routing tests;
- eight-course positive/negative routing matrix.

## 2. Localization runtime shipped

Required:
- one gameplay/event/variant identity serves RU and EN;
- localization lookup happens after gameplay routing/materialization;
- missing required RU/EN string is validated;
- language switch does not reroll variants;
- language is presentation state, not School gameplay state.

Evidence:
- shared localization runtime tests;
- RU -> EN and EN -> RU pending-scene reload tests.

## 3. No duplicate generic + specific transaction

Generic and exact-course presentation may coexist only under an explicit content policy.

For every paid course declare:
- `GENERIC_ONLY`;
- `EXACT_SUPERSEDES_GENERIC`; or
- `INTENDED_BOTH`.

Regardless of policy:
- tuition is charged once;
- current-day Energy is charged once;
- stat package applies once;
- `lessons_completed` increments once;
- ordinary Lust does not change;
- presentation choices contain no duplicate transaction effects.

Fail if:
- generic and exact content both replay payment/progress;
- an exact event is created by performing a second School action;
- generic fallback remains unintentionally duplicated after exact presentation.

## 4. RU+EN completeness

For each promoted teacher/course family verify:
- teacher name RU + EN;
- teacher role RU + EN;
- teacher bio RU + EN;
- every promoted repeatable lesson variant RU + EN;
- choice labels/text RU + EN;
- media alt/caption RU + EN.

Current staged source:
- `school-teacher-course-localization-v2.fixture.json`;
- `SCHOOL_TEACHER_IDENTITIES_RU_EN_v1.md`;
- `SCHOOL_REPEATABLE_LESSONS_RU_EN_v1.md`.

No promoted key may remain source-fallback unless Product explicitly accepts fallback policy for shipped content.

## 5. Locale-neutral gameplay IDs

Must remain shared:
- course ID;
- track ID;
- teacher content ID;
- event ID;
- variant ID;
- choice ID;
- presentation ID;
- public reaction trigger;
- Save identity.

Forbidden:
- duplicate `.ru` and `.en` gameplay events;
- locale suffix in School course/track IDs;
- locale-specific progress/public facts.

## 6. Presentation IDs stable

Before production inclusion freeze:
- paid semantic course presentation ID;
- exact teacher/course event presentation IDs;
- media semantic IDs;
- fallback chain.

Acceptance:
- RU/EN resolve the same presentation slot;
- language switch keeps the same selected pool candidate/variant occurrence;
- static fallback remains valid;
- GIF candidate identity is shared.

## 7. Multi-GIF pool ready

If exact-course content uses PR42 multi-GIF pools:
- pool has 3–5 candidates;
- candidate keys unique;
- deterministic selection;
- asset paths exist before production patch is enabled;
- RU+EN alt localization exists;
- static fallback exists;
- animation-off mode remains usable.

Draft mappings may exist before assets, but production promotion requires resolvable assets or an explicit static-only configuration.

## 8. Course-to-teacher mapping exact

Required matrix:
- Literacy & Numbers -> Mara Fen;
- Arcana -> Ilyra Venn;
- Rhetoric & Social -> Cassian Reed;
- Etiquette & Presentation -> Eliane Marrow;
- Field Craft -> Rowan Pike;
- Physical Training -> Tovan Kest;
- Arts & Performance -> Nessa Lark;
- Body Confidence -> Sera Vey.

Every course must reject the other seven teacher/course event families.

## 9. Paid mechanics regression green

All eight courses must preserve:
- locked tuition;
- current-day Energy 1;
- locked stat package;
- no ordinary Lust mutation;
- paid `lessons_completed +1`;
- Night `night_study_sessions +0` for paid lessons.

Exact localized presentation must not modify any of these.

## 10. Night regression green

Exact paid-course routing must not affect Night study.

Night remains:
- 24 exact choice IDs;
- tuition 0;
- current-day Energy 0;
- supported stat +2;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`.

## 11. Save / reload green

For each promoted exact-course family test:
- reload after paid transaction but before opening presentation;
- reload with exact teacher/course presentation queued;
- reload with blocking School scene pending where applicable;
- reload after presentation resolution;
- RU save -> EN reload;
- EN save -> RU reload.

Required invariants:
- same event ID;
- same variant ID;
- same choice IDs;
- same presentation slot/pool candidate identity;
- no repeated payment/progress;
- no locale-specific gameplay state.

## 12. Production inclusion explicit

Promotion requires:
- strict production pack/content files;
- explicit root catalog/bootstrap inclusion;
- no recursive fixture glob;
- no authoring sidecar loaded as a runtime pack;
- staged files removed from or clearly excluded from production load if superseded.

## 13. Tests green

Minimum required green set:
- localization migration/delta contract;
- exact-course routing matrix;
- generic backward-compatibility;
- teacher/course localization completeness;
- paid mechanics parity;
- Night parity;
- save/reload;
- multi-GIF presentation;
- full School regression.

“Tests authored” is not enough for promotion; execution must be recorded by Lead/CI.

## 14. Product-blocked semantics remain absent

Promotion of teacher/course presentation must not silently add:
- management/accounting provider/threshold/result;
- Arcana/Forest result;
- certificate/project/exam completion;
- teacher relationship stage progression;
- education ending/Meta effects.

Those remain separate Product decisions.

## 15. Final promotion record

Before moving a staged family to root production record:
- course ID:
- teacher ID:
- exact-route runtime commit:
- localization runtime commit:
- production pack path:
- localization keys/bundle:
- presentation IDs:
- multi-GIF/static assets:
- generic/exact coexistence policy:
- tests/CI run:
- reviewer:
- date:
- remaining deferred content:

Only after this record is complete may the family move from `STAGED_ROUTING_BLOCKED` to production-ready/shipped classification.
