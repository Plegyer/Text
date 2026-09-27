# RC Human Decisions Required v1

Date: 2026-09-27
Purpose: enumerate Product/content decisions still required after the green PR #25 technical gate.

This document is neutral. It does not select a preferred option.

## Decision 1 — Old Boundary Token acquisition source

Already locked:
- item: `old_boundary_token`
- capability: `enter_old_boundary`
- old-boundary route consumes the capability as an eligibility input, not as an automatic item-removal transaction.

Choose an authored source family, for example:
- explicit event/reward;
- shop/action purchase;
- relationship outcome;
- quest/progression reward;
- another accepted production source.

Required answer:
- canonical source ID/type;
- eligibility/timing;
- whether grant is repeatable.

Runtime status: **READY**.

Affected PA:
- PA09;
- PA14/PA17 ordered reachability.

## Decision 2 — Old Boundary Token retain/consume policy

Choose:
- retained indefinitely;
- consumed on route use;
- turned in at another explicit transaction;
- another explicit policy.

Required answer:
- commit boundary for removal, if any;
- whether route access persists after removal;
- reacquisition policy.

Runtime status: **READY for simple add/remove policy**.

Do not cache hidden capability after inventory becomes zero unless permanent access is explicitly authored.

## Decision 3 — Hunter-trail unlock identity

Locked:
- third Forest route concept = hunter trail.

Still choose:
- canonical route ID if not finalized;
- unlock/clue/capability identity;
- whether unlock is item capability, public/progression fact, relationship condition, School result, or another accepted typed condition;
- acquisition/provider authoring.

Runtime status: **MOSTLY READY**.

Do not invent a fake item or clue ID.

## Decision 4 — School management/accounting provider

Existing consumer concept:
`lumber.school.management-ready`

Still choose:
- owning course/track/provider;
- milestone type: lesson threshold, project, exam, certificate, event, or another accepted School-owned result;
- canonical public publication rule.

Runtime status: **READY for ordinary typed progression + public fact/event provider**.

Synthetic `school.lumber-management` must remain excluded from production.

Affected PA:
- PA07;
- PA08.

## Decision 5 — School management/accounting threshold

If the chosen provider is threshold-based, choose:
- exact `lessons_completed` threshold;
- whether Night study contributes;
- whether other School requirements apply.

No threshold is currently approved.

Runtime status: **MOSTLY READY**.

## Decision 6 — School Arcana/Forest public result

If this cross-system path remains in target scope, choose:
- provider/course/track;
- canonical public result ID;
- threshold/milestone type;
- whether Night study contributes;
- Forest consumer behavior.

Runtime status: **READY/MOSTLY READY depending on authored output shape**.

Do not infer a threshold from QA fixtures.

## Decision 7 — Forest full content-depth target

Accepted Product Acceptance depth still expects:
- three route contexts;
- navigation challenge family;
- physical obstacle challenge family;
- interpretation/ritual anomaly challenge family;
- at least one meaningful deterministic seasonal topology/option difference.

Already shipped:
- logging road;
- old-boundary route;
- generic route/option runtime;
- save/reload;
- success/escape result boundary.

Still author:
- hunter trail;
- concrete challenge instances;
- route/challenge placement;
- season-dependent topology/availability;
- final presentation/content text.

Runtime status: **PARTIALLY TO MOSTLY READY**.

Only add new runtime primitives if accepted content proves the current option model cannot express the design.

## Decision 8 — Presentation polish priorities

RC-blocking presentation assets: **0**.

Human/art decisions remain optional:
- which future GIFs to author first;
- final visuals for new Forest routes/challenges;
- School teacher/content visuals;
- ending polish.

These are not technical RC blockers while current static/text fallbacks remain valid.

## Locked decisions that must not be reopened

### Hard Work
- ending: `ending.lumber.hard-work`
- ONLY condition: `completed_shifts >= 50`
- exact reward: `hardWork:lumber`

No School, Forest, item, relationship, season or milestone prerequisite.

### Forest continuation
Exact reactive boundary:
`activityResult(lumber.forest, success, lumber.forest.success)`

### School baseline
- exactly eight paid courses;
- locked tuition/stat packages;
- one daytime Energy each;
- typed `lessons_completed`;
- Night study separate;
- no ordinary School Lust gain.

### Presentation baseline
- central stage;
- semantic `presentationId`;
- GIF optional;
- static/text fallback;
- no timing coupling.

## Decision order when Product is ready

These decisions may be made independently where possible, but the cleanest implementation order is:
1. Token source + retain/consume policy.
2. School management provider + threshold.
3. Hunter-trail unlock identity.
4. Forest challenge/season authoring.
5. Optional Arcana/Forest School result if retained.
6. Presentation/art polish.

This is an implementation dependency order, not a recommendation among product choices.
