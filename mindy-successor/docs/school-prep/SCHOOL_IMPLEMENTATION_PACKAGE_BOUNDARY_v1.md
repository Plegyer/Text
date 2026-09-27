# School Implementation Package Boundary v1

Status: future implementation/content package boundary for School.

Purpose: split remaining work into the smallest independently reviewable packages and keep human decisions, content authoring, QA, and runtime changes separate.

## Package A — Teacher identity / lesson content

### Human decisions
- canonical teacher/presenter identity per selected track;
- world role;
- tone/voice;
- relationship-hook policy;
- approved presentation depth.

### Content authoring
- teacher/presenter definitions;
- lesson text variants;
- relationship-aware variants where approved;
- semantic presentation hooks;
- static/GIF/text fallback.

### QA
- course/track mapping unchanged;
- semantic presentation ID stable;
- reload preserves pending scene/presentation;
- no recharge of tuition/Energy;
- no duplicate School progress;
- missing media does not alter mechanics.

### Runtime changes
None by default.

Runtime work is justified only if an approved presentation behavior cannot be represented by the current scene/presentation system and a concrete failing test demonstrates the gap.

## Package B — Management/accounting public result

### Human decisions
- School-owned provider type;
- owning track;
- milestone type;
- threshold/value;
- Night-study contribution, if any;
- final durable public result identity/rule.

### Content authoring
- private School provider definition;
- milestone/project/exam/certificate content if selected;
- publication definition;
- result presentation;
- downstream management listener mapping.

### QA
- exact threshold/provider boundary;
- exactly-once publication;
- reload before/after publication;
- immediate downstream reaction;
- no direct career read of School-private counters;
- no tuition/Energy/progress replay;
- Hard Work unchanged.

### Runtime changes
None by default.

Use existing School typed progress + durable public boundary unless the selected authored provider needs an unsupported primitive.

## Package C — Arcana / Forest public result

### Human decisions
- whether the path remains in product scope;
- School-owned Arcana provider;
- threshold/milestone type and value;
- Night-study contribution, if any;
- final durable public result identity;
- exact direct Forest consumer/option/listener.

### Content authoring
- Arcana provider/milestone content;
- publication definition;
- Forest option/interpretation condition;
- optional teacher/milestone presentation;
- downstream Forest/Lumber content.

### QA
- exactly-once School publication;
- reload-stable Forest option visibility;
- no direct Forest read of private School counters;
- Arcana paid lesson remains locked;
- no duplicate `lessons_completed`;
- Activity result continuation remains owned by Forest/Lumber.

### Runtime changes
None by default.

Only add runtime work if the approved Forest consumer shape cannot be represented by existing conditions/options/Resolver boundaries.

## Package D — Milestone / certificate / project / exam content

### Human decisions
For each authored unit:
- which form ships;
- owning track;
- eligibility;
- costs, if any;
- completion result;
- certificate relation, if any;
- public-result relation, if any.

### Content authoring
- canonical IDs/names;
- eligibility definitions;
- scenes/choices/results;
- presentation hooks;
- public publication where approved.

### QA
- private ownership;
- save/reload before and after completion;
- explicit costs commit once;
- completion rewards do not replay;
- no paid/Night counter cross-write;
- public result, if any, publishes once.

### Runtime changes
Reserved School state is already prepared conceptually. Do not add runtime/schema changes until a selected authored behavior proves a missing primitive.

## Package E — Cross-career integration

### Human decisions
- which careers receive a School dependency;
- which approved School public result each career consumes;
- exact career-owned response.

### Content authoring
- career condition/listener/event;
- career-owned stage/fact/counter transition;
- player-facing continuation content.

### QA
Use `SCHOOL_CAREER_HOOK_VALIDATION_CHECKLIST_v1.md`.

Mandatory:
- public boundary only;
- no private School counter leakage;
- save/reload idempotency;
- no School payment/progress replay;
- no accidental Hard Work prerequisite;
- presentation identity stability.

### Runtime changes
None by default.

Careers with no authored School dependency remain independent.

## Package F — Presentation assets

### Human/art decisions
- which School scenes need final assets;
- static vs GIF;
- teacher portraits;
- course/lesson/milestone/certificate art priorities.

### Content production
- approved media assets;
- media IDs;
- alt text;
- semantic presentation mapping;
- text/static fallbacks.

### QA
- asset resolves;
- fallback resolves;
- missing GIF does not break gameplay;
- media timing does not drive mechanics;
- presentation ID stable across reload.

### Runtime changes
None unless a separately approved presentation feature requires a new media primitive.

## Package ordering dependencies

Can begin immediately after decisions:
- teacher content package;
- management provider package;
- Arcana/Forest package if retained;
- independent milestone/project/certificate units.

Must wait for provider decisions:
- cross-career consumers that need a new School public result.

Can proceed independently:
- optional static/GIF presentation assets attached to already-stable semantic IDs.

## Change-control rule

Every future work item should declare exactly one primary category:

1. **HUMAN_DECISION** — selects provider/threshold/identity/content policy.
2. **CONTENT_AUTHORING** — implements an approved decision in data/docs/assets.
3. **QA** — proves the approved content/mechanics/reload boundary.
4. **RUNTIME_CHANGE** — adds a missing primitive demonstrated by a failing integrated test.

Do not bundle a speculative runtime rewrite into a content package.

## Locked mechanics outside these packages

These packages must not silently change:
- eight paid courses;
- course/track IDs;
- locked tuition/stat packages;
- one current-day Energy per paid lesson;
- no ordinary Lust gain;
- paid `lessons_completed`;
- Night `night_study_sessions`;
- Night +2 supported stat / zero tuition / zero current-day Energy / next-day Energy -1;
- blocking School scene sequencing;
- save/reload exactly-once behavior;
- public/private domain ownership;
- Lumber Hard Work = 50 completed shifts only.

Any change to those requires a separate explicit mechanics task.
