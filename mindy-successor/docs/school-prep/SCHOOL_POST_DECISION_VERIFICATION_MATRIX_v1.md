# School Post-Decision Verification Matrix v1

Status: validation plan for School decisions after Product/authoring makes them.
Rule: this matrix does not pre-author any provider, threshold, teacher, certificate, project, exam, public result, or Forest unlock.

## Verification baseline

Every post-decision implementation must preserve the current locked School floor:
- eight paid courses and stable gameplay/track IDs;
- locked tuition and stat packages;
- exactly 1 current-day Energy per paid lesson;
- no ordinary School Lust mutation;
- paid lessons increment only `lessons_completed`;
- Night study increments only `night_study_sessions`;
- blocking School scene remains reload-safe and must resolve before NightFlow;
- no reload-driven duplicate payment/progress/publication;
- Lumber/Forest reads public School results, not private School counters;
- Hard Work remains independent of School;
- semantic School presentation IDs remain stable.

## Matrix

| Human decision | Production content expected to change | Resolver/public-result validation | Save/reload validation | No-double-charge / no-duplicate-progress validation | Lumber/Forest integration validation | Presentation semantic-ID validation |
|---|---|---|---|---|---|---|
| Management/accounting provider | New/selected School production authoring content under `prior-work/astra/prototype-m3.2/content/packs/`; `content/packs/lumber-cross-production.json` only if the consumer transport key/listener contract changes | Prove the chosen School-owned provider commits before one durable public publication; verify `worldFactAdded` or approved typed-public equivalent reaches `lumber-cross.school-management-return` | Reload before publication may publish once later; reload after publication cannot re-emit fact/reaction; pending Lumber scene survives reload | Paid lesson still charges tuition/Energy once and increments `lessons_completed` once; resolving management reaction cannot replay School transaction | Professional Foreman route consumes public result only; resulting Lumber facts occur once; Hard Work gate unchanged | Existing lesson semantic ID remains unchanged; authored milestone/result presentation uses a declared semantic ID and survives reload |
| Management/accounting threshold / milestone type | Same selected School production authoring content; no shared runtime edit unless chosen condition type is not representable | Test exact authored eligibility boundary below/at/above threshold or before/after completion; no QA fixture threshold accepted as authority | Persist private eligibility and publication proof across reload; threshold crossing after reload produces at most one publication | Rechecking eligibility cannot increment `lessons_completed` or `night_study_sessions`; no tuition/Energy replay | Lumber listener must not read the threshold/counter directly | Threshold/milestone scene, if any, must route through declared presentation ID without changing paid lesson ID |
| Arcana/Forest provider | New/selected School Arcana authoring content; Forest consumer condition/option in `content/definitions.json` or another explicitly selected production Forest pack; `content/packs/lumber-cross-production.json` only for downstream listener changes | Prove one School-owned publication; prove the selected Forest consumer reacts to the public result; no direct private School read | Reload before/after publication preserves one publication; unlocked Forest option/interpretation stays equivalent after reload | Arcana paid lesson remains 500 / 1 Energy / +4 Magic / +4 Reason / +2 Creativity exactly once; publication cannot duplicate `lessons_completed` | Selected `lumber.forest` consumer becomes available only through the authored public boundary; later `lumber-cross.activity-forest-return` remains Activity-result driven | Arcana paid semantic ID stays `school/arcana/lesson/default`; new interpretation/result presentation gets a declared semantic ID |
| Arcana/Forest threshold / milestone type | Same selected Arcana authoring content plus exact Forest condition content if threshold result gates an option | Test exact private authored boundary and one publication; verify Night-study contribution only if explicitly chosen | Private eligibility, publication proof, and Forest availability remain stable after reload | Threshold evaluation never spends tuition/Energy and never changes paid/Night counters by itself | Forest path must not become available from direct counter injection in production; public result is the cross-domain input | Any milestone/result scene preserves semantic identity across reload and does not replace Arcana lesson presentation |
| Teacher identities / content depth | Selected School presentation/content pack under `content/packs/`; media registration in the production pack that owns the teacher/lesson assets; no mechanics file unless Product separately approves a mechanic | No new progression fact is required merely by adding a teacher; if teacher scene is blocking, Resolver ordering must be explicitly tested | Pending teacher/lesson scene and media/presentation identity survive reload; no scene reroll | Teacher scene cannot charge tuition/Energy again or duplicate School progress | Teacher content must not directly mutate Lumber/Forest private state | Course semantic paid ID stays stable; teacher/presenter presentation hook and static/GIF fallback are validated |
| Certificate/project/exam inclusion | New/selected School production authoring content; any certificate/project/exam presentation/media pack chosen by Product | Test completion/result boundary and, if public, exactly-once publication; certificate/project/exam must remain School-owned | In-progress/completed state and publication proof are deterministic across reload | Completion cannot replay the paid lesson or increment the wrong School counter; explicit new costs, if authored, commit once | Any Lumber/Forest effect crosses only the public boundary; no new Hard Work prerequisite | New semantic presentation IDs are declared, stable, and independent from gameplay IDs |

## Exact post-decision tests to update or add

For management/accounting decisions:
- extend `school-public-boundary-exactly-once.test.ts` with the real authored provider;
- extend the integrated PA07/PA08 path;
- keep `school-rc-no-false-green-v2.test.ts` rejecting fixture-only/direct-state shortcuts;
- add below/at/above threshold tests if a numeric threshold is selected;
- verify `lumber-cross.school-management-return` consumes the real public result once.

For Arcana/Forest decisions:
- extend the real School publication test with the selected Arcana provider;
- test the exact Forest option/condition listener before and after publication;
- test reload before and after School publication;
- test reload inside `lumber.forest` after the option becomes available;
- verify `lumber-cross.activity-forest-return` remains driven by `lumber.forest.success`, not by School-private counters.

For teacher/content decisions:
- add presentation catalog/pack validation for canonical teacher/presenter IDs;
- verify static/text fallback for every authored visual;
- verify reload preserves semantic presentation IDs;
- verify teacher content cannot change tuition/Energy/stat/counter behavior.

For certificate/project/exam decisions:
- test ownership and completion idempotency;
- test any explicit cost exactly once;
- test save/reload before and after completion;
- test public publication exactly once if the result is cross-system;
- verify no legacy prototype exam threshold becomes implicit authority.

## Runtime-change gate

Do not request a runtime/schema change simply because a Product decision was made.

A runtime change is justified only if:
1. the chosen authored behavior cannot be expressed by the current typed School/public-result/presentation surfaces; and
2. a concrete failing integration test demonstrates the missing primitive.

Otherwise the post-decision work is production content + QA.

## Decision-neutral completion rule

This matrix becomes actionable only after Product fills the corresponding decision fields in:
- `SCHOOL_MANAGEMENT_RESULT_DECISION_SCHEMA_v1.md`;
- `SCHOOL_ARCANA_FOREST_RESULT_DECISION_SCHEMA_v1.md`;
- `SCHOOL_CONTENT_DEPTH_AUTHORING_TEMPLATE_v1.md`.

Until then, all provider/threshold/content fields remain OPEN.
