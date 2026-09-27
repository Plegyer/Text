# School Product Decision Intake Template v1

Status: fill-in Product decision form. This document records decisions and impact; it does not select them.

## Locked baseline — do not edit through this form

- exactly eight paid School courses;
- stable course/track IDs;
- locked tuition and stat packages;
- exactly 1 current-day Energy per paid lesson;
- no ordinary Lust mutation;
- paid lessons increment only `lessons_completed`;
- Night study increments only `night_study_sessions`;
- Night tuition/current-day Energy = 0;
- Night selected supported stat +2;
- next-day Energy -1;
- one Night slot;
- semantic presentation IDs remain stable;
- downstream careers read public School results, not private counters;
- Lumber Hard Work remains 50 completed shifts only.

## Decision A — Management/accounting provider

- Decision status: OPEN
- Chosen provider category: OPEN
- Owning track: OPEN
- Canonical provider ID: OPEN
- Why this provider fits Product intent: OPEN

Downstream content impact:
- School milestone/project/exam/certificate content: OPEN
- School public-result publication definition: OPEN
- Lumber management listener mapping: OPEN
- presentation content: OPEN

Runtime impact:
- Expected: none if current typed School/public-result surfaces express the choice
- Runtime change required: OPEN — only with failing integration evidence

Test impact:
- provider eligibility
- exactly-once publication
- PA07/PA08 real authored path
- reload before/after publication
- no double tuition/Energy/progress
- Hard Work independence

## Decision B — Management/accounting milestone / threshold

- Decision status: OPEN
- Milestone type: OPEN
- Threshold/value shape: OPEN
- Exact value: OPEN
- Does Night study contribute: OPEN
- Additional School-owned requirements: OPEN

Downstream content impact:
- provider definition: OPEN
- public result timing: OPEN
- player-facing explanation: OPEN

Runtime impact:
- Expected: no runtime change for currently supported typed conditions
- Missing primitive, if any: OPEN

Test impact:
- below / at / above boundary
- reload across threshold
- one publication only
- listener reacts only to public result

## Decision C — Arcana / Forest provider

- Decision status: OPEN
- Path retained in target scope: OPEN
- Provider category: OPEN
- Canonical provider ID: OPEN
- Final public result ID: OPEN
- Exact direct Forest consumer/option/listener: OPEN

Downstream content impact:
- Arcana School authoring: OPEN
- Forest option/condition: OPEN
- presentation/result content: OPEN
- post-Activity Lumber continuation changes required: OPEN

Runtime impact:
- Expected: none if existing conditions/options/public boundary express the design
- Missing primitive, if any: OPEN

Test impact:
- School publication exactly once
- Forest availability before/after publication
- reload stability
- no private School counter reads
- `lumber.forest.success` continuation remains result-driven

## Decision D — Arcana / Forest milestone / threshold

- Decision status: OPEN
- Milestone type: OPEN
- Threshold/value shape: OPEN
- Exact value: OPEN
- Magic/Reason requirements: OPEN
- Night-study contribution: OPEN
- Additional School requirements: OPEN

Downstream content impact:
- Arcana provider definition: OPEN
- Forest consumer condition: OPEN

Runtime impact:
- Expected: none by default
- Missing primitive, if any: OPEN

Test impact:
- exact authored eligibility boundary
- save/reload before/after publication
- no duplicate `lessons_completed`
- no paid/Night counter cross-write

## Decision E — Teacher identities

Repeat per track.

- Track: OPEN
- Teacher/presenter canonical ID: OPEN
- Display name: OPEN
- World role: OPEN
- Shared across tracks: OPEN
- Relationship identity/hook: OPEN
- Lesson tone: OPEN
- Presentation assets priority: OPEN

Downstream content impact:
- lesson variants
- teacher/presenter scenes
- semantic presentation mapping
- optional relationship reactions

Runtime impact:
- Expected: none for content/presentation-only teacher authoring
- New runtime behavior requested: OPEN

Test impact:
- semantic ID stability
- pending scene reload
- no mechanics change
- fallback presentation

## Decision F — Certificate / project / exam participation

- Decision status: OPEN
- Certificates included: OPEN
- Projects included: OPEN
- Exams included: OPEN
- Minimum PA path depends on any of these: OPEN

For each included type:
- canonical ID(s): OPEN
- owning track(s): OPEN
- eligibility/completion rule: OPEN
- explicit cost, if any: OPEN
- public-result relation: OPEN
- presentation requirement: OPEN

Runtime impact:
- Expected: content authoring on existing/reserved School progression surfaces
- Missing primitive, if any: OPEN

Test impact:
- completion exactly once
- save/reload
- explicit cost exactly once
- no paid/Night counter cross-write
- public result exactly once if applicable

## Decision G — Content priorities

Rank or select the next content production priorities:

- Teacher identity batch: OPEN
- Repeatable lesson variant batch: OPEN
- Milestone/project/exam batch: OPEN
- Management public-result batch: OPEN
- Arcana/Forest batch: OPEN
- Career integration batch: OPEN

Target tracks/careers: OPEN

Desired production batch size: OPEN

This is planning input, not a mechanics lock.

## Decision H — Presentation priorities

- Teacher portraits: OPEN
- Course stills: OPEN
- Lesson/result stills: OPEN
- Night-study stills: OPEN
- GIF loops: OPEN
- Milestone/certificate cards: OPEN

Priority order: OPEN

Static/text fallback requirement remains locked.

Runtime impact:
- none unless a separately approved presentation feature requires a missing primitive.

## Decision record

- Product decision owner: OPEN
- Decision date: OPEN
- Source/link: OPEN
- Approved items: OPEN
- Explicitly deferred items: OPEN
- Rejected options: OPEN
- Notes: OPEN

## Post-decision handoff

After filling this form:
1. update the corresponding neutral decision schema;
2. assign one-file-one-owner production batches;
3. author School content units;
4. update public-result/career consumers only where approved;
5. run `SCHOOL_POST_DECISION_VERIFICATION_MATRIX_v1.md`;
6. keep locked course/Night mechanics unchanged unless separately approved.
