# School Milestone Presentation Dependency Map v1

Status: neutral dependency map for allowed School milestone forms.
Rule: this document identifies prerequisite decisions for presentation authoring; it does not select a milestone form.

## Shared presentation prerequisites

Before finalizing any milestone semantic presentation ID or final static/GIF asset, freeze:
- owning School track;
- milestone/provider category;
- canonical milestone/result ID;
- whether the scene is blocking, reactive, or presentation-only;
- whether a public result is published;
- teacher/presenter identity if the scene names one;
- player-facing title/copy direction;
- reload behavior and exactly-once completion boundary.

Locked paid course presentation IDs are not replaced by milestone IDs.

## Lesson-count milestone

### Decisions required first
- owning track;
- exact `lessons_completed` threshold;
- whether any additional School-owned condition applies;
- whether Night study contributes to the authored result;
- whether the threshold itself publishes a public result;
- teacher/presenter role, if any.

### Authoring required before semantic ID is final
- canonical milestone ID;
- milestone title;
- scene type;
- text/result copy;
- public-result relation;
- repeatability policy.

### Presentation ID can then be finalized
Recommended namespace shape must remain under School and track semantics, but exact ID is OPEN until canonical milestone ID is approved.

### Assets can be finalized after
- teacher/presenter visual identity is known;
- scene tone is approved;
- static/GIF priority is chosen;
- text fallback is complete.

### Reload acceptance
- threshold crossing occurs once;
- milestone scene/presentation survives reload;
- no paid lesson replay;
- no duplicate public publication.

## Exam milestone

### Decisions required first
- owning track;
- exam canonical ID;
- eligibility;
- pass/fail rule;
- explicit cost, if any;
- certificate/public-result relation;
- teacher/examiner identity if present.

### Authoring required before semantic ID is final
- exam intro;
- exam choice/interaction structure;
- pass/fail result copy;
- retry policy;
- completion transaction boundary.

### Assets can be finalized after
- examiner/room/presentation direction is approved;
- pass/fail visual variants are known;
- fallback copy is complete.

### Reload acceptance
- exam state deterministic across reload;
- costs commit once;
- pass/fail result commits once;
- certificate/public result cannot duplicate.

## Project milestone

### Decisions required first
- owning track;
- project canonical ID;
- entry conditions;
- completion requirements;
- explicit cost/resources, if any;
- teacher/sponsor identity if present;
- public-result relation.

### Authoring required before semantic ID is final
- project brief;
- progress/checkpoint model;
- completion scene;
- failure/abandon behavior if any;
- result/publication boundary.

### Assets can be finalized after
- project subject/output is authored;
- teacher/sponsor presence is known;
- progress/completion visual needs are known.

### Reload acceptance
- project progress stable;
- completion exactly once;
- explicit costs do not replay;
- public result, if any, publishes once.

## Certificate milestone

### Decisions required first
- owning track;
- certificate canonical ID;
- certificate name;
- eligibility;
- whether certificate is private School state only or paired with a public result;
- granting teacher/institution identity if any.

### Authoring required before semantic ID is final
- award scene;
- certificate/result copy;
- mechanical effect if approved;
- publication rule if cross-system.

### Assets can be finalized after
- certificate visual identity is approved;
- issuing teacher/institution is known;
- card/static/GIF priority is chosen.

### Reload acceptance
- certificate awarded once;
- award scene stable across reload;
- no duplicate public publication.

## Mixed authored gate

### Decisions required first
- owning track(s);
- all component conditions;
- canonical combined result ID;
- precedence/order of components;
- whether components have separate presentation;
- public-result relation;
- teacher/presenter ownership.

### Authoring required before semantic ID is final
- player-facing explanation of the combined gate;
- completion scene;
- component vs final-result presentation policy;
- exactly-once completion identity.

### Assets can be finalized after
- combined narrative meaning is approved;
- all named teachers/objects/results are known;
- final scene composition is stable.

### Reload acceptance
- partial components persist independently;
- no premature final presentation;
- final result occurs once;
- publication occurs once.

## Dependency matrix

| Milestone form | Product decision needed before semantic ID | Content needed before asset lock | Public-result decision dependency | Teacher dependency |
|---|---|---|---|---|
| lesson-count | track + threshold + canonical milestone ID | milestone scene/copy | only if cross-system | optional / OPEN |
| exam | exam ID + eligibility + pass/fail policy | exam/result content | only if cross-system | optional / OPEN |
| project | project ID + entry/completion policy | project brief/progress/result content | only if cross-system | optional / OPEN |
| certificate | certificate ID + eligibility + award policy | award/certificate content | private vs public must be decided | optional / OPEN |
| mixed gate | component set + combined result ID | component/final explanation and scene | required if downstream consumer exists | optional / OPEN |

## Asset finalization rule

Do not commission/finalize canonical GIF/static assets that encode:
- an unapproved teacher identity;
- an unapproved certificate;
- an unapproved project/exam subject;
- an unapproved threshold;
- an unapproved public-result identity.

Generic/reusable environment art may proceed if it does not imply those decisions.

## Semantic-ID rule

Milestone presentation IDs must:
- remain distinct from gameplay course IDs;
- remain within School semantic namespace;
- be stable across reload;
- map to one authored meaning;
- not be generated from fixture-only IDs.

## Non-decision

This map selects none of:
- lesson-count milestone;
- exam;
- project;
- certificate;
- mixed gate.

It only states what Product/content must freeze before presentation IDs and assets become canonical.
