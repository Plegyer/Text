# School Progression Structure v1

Status: isolated typed progression proposal constrained to the accepted School v2 model.
Scope: School-domain data shape only; no core/schema edits and no active content integration.

## 1. Separation of reliable lessons from track progression

A repeatable lesson and a track milestone are different layers.

Repeatable lesson:
- remains available according to ordinary School access rules;
- costs exactly 1 current-day Energy plus the course tuition;
- applies the accepted stat package immediately;
- increments School-owned progress data;
- can trigger the Event Resolver because stats changed.

Track progression:
- records School-specific counters, facts, milestones, projects/exams, and certificates;
- may unlock School story/system content;
- must not block the basic repeatable stat source;
- must not silently change tuition or stat gains.

This preserves the baseline rule: lesson = reliable stats; milestone = systemic/story unlock.

## 2. School-owned typed state

Recommended per-track state shape:

SchoolTrackState
- trackId: stable School track ID
- counters: typed non-negative integer counters
- facts: typed School fact IDs
- milestones: typed completed milestone IDs
- certificates: typed earned certificate IDs
- choices: optional typed School choice IDs when authorial content later requires them

No generic global flags bag is required.

Baseline generic counters may use these local IDs:
- lessons_completed
- night_study_sessions
- projects_completed
- exam_attempts

Additional counters are allowed only when a concrete School mechanic needs them. Each counter remains owned by its School track or by the School domain.

## 3. Facts

School facts are public only when another domain needs a stable condition.

Namespace shape:
- school.fact.<track_slug>.<placeholder>
- school.fact.global.<placeholder>

Examples are intentionally placeholders rather than canon:
- school.fact.<track_slug>.project_completed_placeholder
- school.fact.<track_slug>.exam_passed_placeholder

A School fact should mean a durable event/result, not duplicate a stat value that already exists in CharacterState.

## 4. Milestones, projects, exams, certificates

Milestone IDs:
- school.milestone.<track_slug>.<placeholder>

Project IDs:
- school.project.<track_slug>.<placeholder>

Exam IDs:
- school.exam.<track_slug>.<placeholder>

Certificate IDs:
- school.certificate.<track_slug>.<placeholder>

Exact thresholds, project requirements, exam rules, certificate names, and certificate effects remain OPEN. They must be authored later without changing the eight baseline lesson packages.

Certificates should be durable typed School facts/results that careers, relationships, endings, or meta systems can read through public contracts. External domains should not write School internal stage directly.

## 5. Repeatable lessons and progression coexistence

A paid lesson should be one atomic action:
1. validate availability, Energy, and tuition;
2. charge tuition and 1 Energy;
3. apply every stat delta in the selected course package;
4. increment lessons_completed for that track;
5. emit reaction facts for the completed action and each changed stat;
6. run the Event Resolver after the full effect batch.

The resolver can then discover a career or relationship gate satisfied by the new authoritative state. Any reactive career/relationship scene remains 0 additional Energy unless that content explicitly has a separate cost.

Track milestones may become eligible from lesson counters, School facts, public external facts, or stat thresholds, but milestone resolution must not retroactively alter the lesson package.

## 6. Night study relationship to track progression

Night study is not a free daytime School lesson.

Accepted mechanical relation:
- no normal tuition;
- 0 current-day Energy;
- consumes the Night slot;
- chosen stat must be supported by a known/enrolled track;
- chosen stat gains +2;
- add next-day Energy delta -1 through the Night/NextDayModifier lifecycle;
- does not auto-complete a certificate.

night_study_sessions is kept separate from lessons_completed so later milestone authors can decide explicitly whether a milestone counts paid lessons, night study, or both. No such threshold is fixed by this prep packet.

## 7. Teacher placeholders

No final teacher identities or lore are defined here.

Each track may reserve:
- school.teacher.<track_slug>.primary.placeholder
- school.teacher.<track_slug>.secondary.placeholder

These are presentation/content attachment points only. Replacing a placeholder with authored canon must not change course price/effect mechanics.

## 8. External career and relationship hooks

School -> career:
- stat changes can satisfy career gates immediately;
- certificates or explicit public School facts may become career conditions;
- resolver reactions remain free after the paid lesson.

Career -> School:
- career-owned public facts may unlock a School project, exam, or milestone;
- School must not read arbitrary internal career fields when a public fact is the correct interface.

School -> relationship:
- a public certificate, milestone fact, or lesson/stat boundary may unlock a relationship event;
- the relationship domain owns its own stage and counters.

Relationship -> School:
- relationship-owned public facts may unlock School content;
- relationship content must not mutate School track stage directly.

Cross-system integration should use typed conditions/effects and public facts, not arbitrary save paths.

## 9. Authorial fields intentionally left open

This structure does not decide:
- teacher names, personalities, or lore;
- milestone thresholds;
- project/exam fiction;
- certificate names or narrative meaning;
- School relationship characters;
- School endings;
- conversion-service fiction, NPC, money cost, or exact unlock;
- final GIF/static assets.
