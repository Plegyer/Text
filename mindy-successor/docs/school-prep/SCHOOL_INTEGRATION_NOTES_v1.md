# School Integration Notes v1

Status: Chat 5 handoff notes for later Product Slice integration.
Scope: integration expectations only; no shared core/UI/content files are changed here.

## 1. Files prepared for integration

Mechanical/reference inputs prepared on this branch:

- docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md
- docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md
- docs/school-prep/SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md
- workstreams/chat5/school/school_draft_v1.json

The JSON is intentionally non-loaded. It is a draft source for Chat 1, not an active content pack.

## 2. Baseline lesson wiring

Chat 1 should preserve all eight stable course IDs, tuition values, and stat packages exactly.

Ordinary School lesson transaction:

1. validate course availability;
2. validate current-day Energy >= 1;
3. validate enough money for tuition;
4. charge tuition exactly once;
5. charge exactly 1 current-day Energy;
6. apply the full course stat package as one atomic effect batch;
7. increment the School track's lessons_completed counter;
8. emit reaction facts for lesson completion and changed stats;
9. run the Event Resolver after the complete state update;
10. allow eligible reactive career/relationship progression to resolve at 0 additional Energy.

Do not split one multi-stat lesson into separately resolved stat actions. Resolver observation should see the authoritative post-lesson state after the complete package has landed.

Progression stats remain clamped by the authoritative Character stat rules. Lust is not part of the ordinary School stat catalog.

## 3. Stable course IDs and prices

Integration should consume the prepared IDs rather than inventing new aliases:

- school.course.literacy_and_numbers — 300 currency
- school.course.arcana — 500
- school.course.rhetoric_and_social — 300
- school.course.etiquette_and_presentation — 400
- school.course.field_craft — 400
- school.course.physical_training — 400
- school.course.arts_and_performance — 500
- school.course.body_confidence — 400

1 WU = 50 currency is only a documentation conversion. Runtime should have one authoritative money unit, not two charges.

The exact effect packages are recorded in SCHOOL_TRACK_DATA_MAP_v1.md and school_draft_v1.json.

## 4. Expected resolver facts after stat gains

The shared resolver/condition system owns the final canonical reaction-fact vocabulary. School integration should map into that vocabulary rather than create an incompatible parallel event bus.

At minimum, the post-lesson boundary must make these facts observable to the resolver:

- the School action completed;
- the specific course/track completed one paid lesson;
- which authoritative progression stats changed;
- the resulting authoritative stat values;
- any School counter/fact/milestone condition that became true.

Recommended conceptual shapes, subject to Chat 1's canonical typed resolver API:

- action.completed.school_lesson(courseId, trackId)
- stat.changed(statId, previousValue, currentValue)
- school.counter.changed(trackId, lessons_completed, currentValue)
- school.fact.added(factId)
- school.milestone.eligible(milestoneId) only if the shared resolver contract models eligibility as a reaction fact

Do not persist redundant "career unlocked because of School" booleans when career availability is derivable from current stats/calendar. A discovery/notified fact may be persisted if the career contract requires it.

## 5. Cross-system consequences

School -> career:
- a stat package may satisfy a career gate immediately;
- a School certificate/public fact may satisfy a later career condition;
- any resulting reactive career scene is 0 additional Energy.

School -> relationship:
- stat changes, public School facts, certificates, or authored School milestones may satisfy relationship conditions;
- relationship state remains relationship-owned;
- a resulting reactive relationship scene is 0 additional Energy unless a separate explicit action says otherwise.

Career/relationship -> School:
- use typed public facts/conditions to unlock School projects, exams, or milestones;
- do not let another domain write School internal track stage directly.

All cross-domain reads/writes should follow the accepted typed condition/effect contracts, not arbitrary save paths.

## 6. School progression state

The preparation assumes a School-owned typed per-track state:

- trackId
- counters
- facts
- milestones
- certificates
- optional choices

Baseline local counters:

- lessons_completed
- night_study_sessions
- projects_completed
- exam_attempts

These names are preparation IDs. Chat 1 may adapt representation to the final typed schema, but should preserve their semantic separation.

In particular, night_study_sessions must not silently increment lessons_completed. Later authored milestones may explicitly count one, the other, or both.

## 7. Night study integration

Night study belongs to Night flow, not the daytime School action list.

Accepted relation:

- current-day Energy cost: 0;
- ordinary tuition: 0;
- consumes the Night slot;
- chosen stat must be supported by a known/enrolled School track;
- chosen stat gains +2;
- add next-day Energy delta -1 through the shared NextDayModifier lifecycle;
- increment night_study_sessions for the relevant track;
- do not auto-complete a certificate.

The next-day Energy modifier must apply exactly once across save/reload. It should not be implemented as an immediate subtraction from current-day Energy.

Night-study presentation uses the reserved namespace:
- school/night_study/<track_slug>/default

## 8. Special stat-conversion service

The accepted School design requires a deterministic late correction valve with the candidate ratio:

- source progression stat -2N;
- different destination progression stat +N;
- Lust excluded.

The isolated draft records the atomic 2:1 unit ratio but intentionally leaves these decisions open:

- successor fiction/NPC;
- unlock condition;
- money cost;
- exact visit/action cost;
- whether batch multipliers such as x1/x2/x3 are exposed.

Chat 1 should not hard-code unresolved authorial values while wiring the Product Slice. The service can remain disabled/unavailable until those values are locked, provided ordinary eight-course access already covers all 12 progression stats.

## 9. Presentation integration

School should use the same persistent central media window as Work, relationships, Night, and results.

Ordinary lessons have stable IDs such as:
- school/arcana/lesson/default

Milestone/project/exam/certificate slots use stable namespaces recorded in SCHOOL_PRESENTATION_SLOT_CATALOG_v1.md.

Presentation replacement must not apply gameplay effects and must not add Energy cost. Missing media must safely fall back to static/location/text rendering.

Teacher presentation slots remain placeholders and do not define canon.

## 10. Authorial/open decisions not to invent during wiring

Still OPEN after this prep packet:

- teacher names, identities, appearances, personalities, and lore;
- School relationship NPC roster;
- milestone thresholds;
- project and exam fiction/requirements;
- certificate names, narrative meaning, and exact mechanical effects;
- School-specific endings;
- special conversion-service fiction/NPC;
- conversion-service unlock, money price, and exact action cost;
- final GIF/static assets and authored presentation variants;
- whether special conversion exposes x1/x2/x3 batching.

These are not required to wire the eight baseline repeatable lessons into the Product Slice.

## 11. Product Slice acceptance focus

For the immediate integration slice, the key observable sequence is:

School lesson
-> exactly 1 Energy and exact tuition charged once
-> exact multi-stat package applied
-> School progress counter updated
-> resolver re-runs on final authoritative state
-> newly satisfied career/relationship event may appear
-> reactive event costs 0 additional Energy
-> central presentation can switch without changing mechanics.

That sequence is the integration-critical handoff from Chat 5.
