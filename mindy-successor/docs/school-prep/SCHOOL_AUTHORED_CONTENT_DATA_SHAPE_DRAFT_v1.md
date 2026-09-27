# School Authored Content Data Shape Draft v1

Status: content-facing, non-runtime draft. Shared runtime/schema stay unchanged.

## Core references

Each authored School unit should reference:
- `id`: stable authored-content ID;
- `courseId`: existing locked `school.course.*`;
- `trackId`: matching existing `school.track.*`;
- `presentationId`: stable semantic School presentation ID.

Do not duplicate tuition, Energy cost, stat packages, or Night-study mechanics in authored units.

## Optional authoring fields

Keep these absent or null until Product approves them:
- `teacherId`;
- `lessonVariants[]`;
- `milestoneRef`;
- `publicResultRef`;
- `relationshipHooks[]`;
- `careerHooks[]`;
- certificate/project/exam references;
- ending/Meta references;
- final media references.

## Repeatable lesson variant

A content variant may contain:
- stable variant ID;
- authored text;
- optional content-selection conditions;
- semantic presentation ID;
- optional media references.

Variants may alter presentation only. They do not change locked payment, Energy, stats, or progress behavior.

## Teacher / presenter reference

`teacherId` is optional and OPEN until a canonical presenter exists.

A teacher reference:
- must point to approved production content;
- must not create an ordinary paid-course prerequisite by itself;
- may link to presentation or separately owned relationship hooks.

## Milestone / public-result references

`milestoneRef` and `publicResultRef` are optional.

When present they must reference canonical production definitions. The authored unit does not own threshold/provider data or publication semantics merely by referencing them.

Fixture-only IDs are forbidden.

## Relationship / career hook references

Hook arrays may name approved downstream scenes/listeners/conditions.

They do not authorize School to write another domain's private state. Cross-system progression uses approved public state.

## Media fallback

Suggested content-facing fields:
- primary media;
- static fallback;
- text fallback;
- alt text where supported.

Media timing must not control gameplay transaction completion.

## Validation

Future authored units should validate:
- valid course/track mapping;
- unique stable IDs;
- semantic presentation grammar;
- existence of every non-null reference;
- no fixture-only references;
- usable fallback;
- no duplicated mechanics data;
- no private cross-domain writes.

## Runtime boundary

This shape is documentation for content authors only.

Runtime/schema work is justified only after Product approves concrete content, current surfaces cannot express it, and an integration test demonstrates the missing primitive.
