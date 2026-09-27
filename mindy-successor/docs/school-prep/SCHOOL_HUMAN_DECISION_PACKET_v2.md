# School Human Decision Packet v2

Status: current School decisions requiring explicit human/Product input only.
Rule: no preferred answer is selected.

## Locked surrounding mechanics

These decisions must not reopen the current School baseline:
- exactly eight paid courses;
- stable course/track IDs;
- locked tuition and stat packages;
- exactly 1 current-day Energy per paid lesson;
- no ordinary Lust mutation;
- paid lesson -> `lessons_completed +1`;
- Night study -> `night_study_sessions +1`;
- Night tuition/current-day Energy = 0;
- Night +2 supported stat;
- next-day Energy -1;
- blocking School scene sequencing;
- save/reload exactly once;
- downstream domains read public School results, not private counters;
- Lumber Hard Work remains independent;
- Palace unlock remains based on Hard Work on all 10 ordinary careers only.

## Decision 1 — Management/accounting provider

Human answer required:
- which School-owned result provides management/accounting readiness.

Acceptable answer shape:
- lesson-count milestone;
- named School milestone;
- certificate;
- project;
- exam;
- School event/result;
- another explicitly School-owned authored result.

Downstream content affected:
- School provider content;
- School public-result publication;
- Lumber management/Forewoman continuation;
- milestone/result presentation.

Runtime affected:
- none by default;
- runtime change only if the chosen authored provider cannot be expressed by current typed conditions/state and a failing integration test proves it.

Tests affected:
- provider eligibility;
- publication exactly once;
- PA07/PA08 real authored path;
- reload before/after publication;
- no payment/progress replay;
- Hard Work independence.

Can proceed without answer:
- repeatable lesson authoring;
- teacher identity work;
- Night-study content/presentation;
- other tracks' content;
- generic publication QA/templates.

## Decision 2 — Management/accounting milestone form and value

Human answer required:
- milestone type;
- threshold/value if threshold-based;
- owning track if not implied by provider;
- whether Night study contributes;
- any additional School-owned conditions.

Acceptable answer shape:
- integer `lessons_completed` threshold;
- typed stat threshold set;
- project/exam/certificate completion;
- named milestone;
- explicit conjunction of School-owned requirements.

Downstream content affected:
- milestone definition;
- player-facing explanation;
- publication timing;
- management listener acceptance path.

Runtime affected:
- none by default.

Tests affected:
- below / at / above boundary;
- natural reachability;
- reload across threshold;
- one publication only.

Can proceed without answer:
- provider-neutral content templates;
- teacher batches;
- repeatable lessons;
- other career hook planning.

## Decision 3 — Arcana / Forest provider

Human answer required:
- whether this cross-system School path remains in product scope;
- if retained, which School-owned result provides Arcana/Forest knowledge.

Acceptable answer shape:
- Arcana lesson-count milestone;
- named Arcana milestone;
- certificate;
- project;
- exam;
- School event/result;
- another explicit School-owned knowledge result.

Downstream content affected:
- Arcana milestone/provider content;
- durable School publication;
- exact Forest option/condition/listener;
- Forest presentation/interpretation content.

Runtime affected:
- none by default if existing public-boundary + option/condition model expresses the choice.

Tests affected:
- real provider publication;
- Forest availability before/after result;
- reload stability;
- no private School counter read;
- Activity-result continuation remains separate.

Can proceed without answer:
- ordinary Arcana lesson variants;
- Arcana teacher content;
- generic Forest Activity work not depending on School;
- presentation assets for already-stable semantic IDs.

## Decision 4 — Arcana / Forest milestone form/value

Human answer required if the path is retained:
- milestone category;
- threshold/value;
- Magic/Reason or other typed-stat contribution;
- whether Night study contributes;
- direct Forest consumer/option.

Acceptable answer shape:
- `lessons_completed` threshold;
- typed stat threshold(s);
- project/exam/certificate completion;
- named milestone;
- explicit conjunction.

Downstream content affected:
- Arcana milestone definition;
- public result;
- Forest option/condition;
- player-facing explanation.

Runtime affected:
- none by default.

Tests affected:
- below/at/above eligibility where numeric;
- publication exactly once;
- reload before/after;
- Forest option persistence.

Can proceed without answer:
- base Arcana content;
- other course authoring;
- non-School Forest route work.

## Decision 5 — Teacher / presenter identities

Human answer required:
- canonical teacher/presenter identity per track or shared group;
- display name;
- world role;
- whether a relationship identity exists;
- broad lesson tone.

Acceptable answer shape:
- one teacher per track;
- one teacher shared by multiple tracks;
- presenter role without relationship state;
- course-specific narrator/presenter;
- another approved mixed model.

Downstream content affected:
- teacher-led lesson variants;
- teacher scenes;
- relationship hooks;
- portrait/static/GIF assets;
- milestone presentation where teacher participates.

Runtime affected:
- none for presentation/content-only authoring by default.

Tests affected:
- ID uniqueness;
- teacher/course mapping;
- semantic presentation stability;
- pending-scene reload;
- no paid mechanics change.

Can proceed without answer:
- teacher-neutral repeatable lesson variants;
- milestone/provider decision work;
- generic School QA;
- non-character presentation assets.

## Decision 6 — Certificates / projects / exams in minimum authored School

Human answer required:
- whether any of these forms participate in the minimum shipped authored School path.

Acceptable answer shape:
- none required for minimum path;
- certificate-based;
- project-based;
- exam-based;
- mixed authored progression.

If included, additional answers:
- canonical IDs;
- owning tracks;
- eligibility/completion;
- costs if any;
- public-result relation.

Downstream content affected:
- progression content;
- scenes/results;
- presentation;
- public-result provider if used.

Runtime affected:
- expected none by default; reserved School progression structure already anticipates these categories.

Tests affected:
- completion exactly once;
- explicit cost once;
- reload;
- no paid/Night counter cross-write;
- publication once if cross-system.

Can proceed without answer:
- paid lesson content;
- Night-study content;
- teacher authoring;
- public-result designs that Product chooses not to tie to these forms.

## Decision 7 — Truly blocking presentation priority

Current technical RC-blocking School presentation assets: none identified.

Human answer is required only if Product declares a specific presentation asset/content element release-blocking.

Acceptable answer shape:
- no School presentation asset is blocking;
- named teacher portrait/static asset is blocking;
- named lesson/milestone static asset is blocking;
- named GIF is blocking;
- named authored scene/copy is blocking.

Downstream content affected:
- presentation/media batch;
- asset registry/map;
- fallback content.

Runtime affected:
- none by default.

Tests affected:
- media resolution;
- static/text fallback;
- semantic ID stability;
- gameplay independence from media timing.

Can proceed without answer:
- all mechanics/QA;
- text/static fallback content;
- teacher/milestone decision work.

## Decision record template

For each answered decision record:
- Decision ID:
- Selected answer:
- Product owner:
- Date:
- Source:
- Canonical IDs introduced:
- Deferred sub-decisions:
- Downstream content owners:
- Tests required:
- Runtime change required:
- Notes:

## Independence rules

Answers may be made independently where dependencies allow.

Examples:
- teacher identities can be decided without management threshold;
- repeatable lesson prose can proceed teacher-neutral;
- management provider may be selected before its exact numeric threshold;
- Arcana/Forest path may be explicitly removed from scope without affecting ordinary Arcana paid mechanics;
- presentation polish can proceed without changing progression.

## No recommendation

This packet intentionally does not:
- rank milestone forms;
- choose a provider;
- choose a threshold;
- choose teachers;
- choose certificate/project/exam participation;
- declare optional GIF/static polish release-blocking.

It only states what human decisions remain and what each answer unlocks.
