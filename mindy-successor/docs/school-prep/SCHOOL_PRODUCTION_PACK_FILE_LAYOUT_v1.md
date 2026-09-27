# School Production Pack File Layout v1

Status: future production layout plan only.
Rule: no current production file is modified by this plan. Fixture-only IDs/data must never become production authoring by copy.

## Goals

The future School content layout should:
- keep the locked eight-course mechanics centralized;
- split authored content into reviewable domain-sized packs;
- support one-file-one-owner parallel work;
- require explicit inclusion by the production bootstrap/catalog;
- keep cross-career reactions owned by the downstream domain where practical;
- keep media mapping separate from mechanics;
- avoid one giant School pack;
- exclude QA fixtures from production inclusion.

## Proposed top-level layout

```text
content/
  packs/
    school/
      school-base-lessons.json
      teachers/
        <teacher-or-track-pack>.json
      milestones/
        <milestone-family-pack>.json
      public-results/
        <public-result-family-pack>.json
      presentation/
        school-presentation-map.json

    career-cross/
      <career>-school-reactions.json
```

Names above are layout examples, not canonical new production IDs.

## 1. Base repeatable lesson variants

Suggested owner pack:
`content/packs/school/school-base-lessons.json`

Owns:
- repeatable lesson text variants;
- course-local presentation selection;
- optional neutral narrator variants;
- references to locked course IDs/presentation families.

Does not own:
- tuition;
- Energy cost;
- stat packages;
- typed School counter semantics;
- final milestone thresholds;
- cross-career private state;
- fixture-only events/facts.

Keep mechanics in the existing authoritative School runtime/data source.

## 2. Teacher-specific packs

Suggested directory:
`content/packs/school/teachers/`

Split by stable ownership boundary, for example:
- one teacher pack when a teacher spans multiple courses;
- one track-specific teacher pack when identity/content is track-local.

Owns:
- canonical teacher/presenter identity after approval;
- teacher-led lesson variants;
- teacher presentation scenes;
- optional relationship-aware presentation hooks;
- teacher media references.

Does not own:
- ordinary paid lesson cost/stat mechanics;
- relationship-private state;
- unapproved milestone thresholds.

A relationship subsystem may have its own downstream listener/content rather than embedding relationship state transitions in the teacher pack.

## 3. Milestone packs

Suggested directory:
`content/packs/school/milestones/`

Split by authored result family or track.

Owns:
- milestone/project/exam/certificate definition content;
- private School eligibility authored after Product decision;
- milestone scenes;
- completion presentation;
- School-owned completion effects.

Does not own:
- downstream career state transitions;
- final public result unless the same pack also owns that explicit publication definition and this ownership is approved.

Do not mix unrelated tracks into one milestone pack merely for convenience.

## 4. Public-result packs

Suggested directory:
`content/packs/school/public-results/`

Owns:
- stable approved School public result IDs;
- private provider -> publication mapping;
- publication timing;
- exactly-once publication content/effects;
- School-side result presentation if any.

Recommended split:
- management/accounting family;
- Arcana/Forest family if retained;
- future independently approved School public-result families.

Do not create these packs until Product freezes provider/result identities.

## 5. Cross-career reaction packs

Suggested directory:
`content/packs/career-cross/`

Downstream domain owns its reaction.

Examples:
- Lumber School reaction pack;
- Guard School reaction pack;
- Tavern School reaction pack;
- Palace School reaction pack.

Owns:
- listener/condition on approved School public result;
- career-owned scene;
- career-owned stage/fact/counter transition;
- downstream presentation.

Does not own:
- School-private counters;
- School milestone state;
- School certificate arrays;
- School publication proof.

This keeps `School -> public boundary -> downstream consumer` explicit.

## 6. Presentation / media mapping

Suggested owner:
`content/packs/school/presentation/school-presentation-map.json`

Owns:
- semantic presentation ID -> media mapping;
- static fallback;
- optional GIF mapping;
- alt text/reference metadata where the production format supports it.

Does not own gameplay mechanics.

If media ownership is already handled by another central registry, this file may become an index plan rather than a separate runtime pack.

## 7. Explicit inclusion

Every production pack must be deliberately included by the production catalog/bootstrap.

Requirements:
- no glob that accidentally includes `*.fixture.json`;
- no test directory inclusion;
- no `school.fixture.*` ID accepted as authored content;
- pack ID is explicit;
- read/write capabilities are explicit;
- dependency order is documented where needed.

Recommended inclusion phases:
1. locked base runtime/data;
2. repeatable School content;
3. teacher content;
4. approved milestone/public-result packs;
5. downstream career reaction packs;
6. presentation/media registry.

## 8. Fixture isolation

QA fixtures remain under existing fixture/test locations such as:
`prior-work/astra/prototype-m3.2/content/*.fixture.json`

Production inclusion must reject:
- fixture-only public facts;
- synthetic teacher IDs;
- synthetic milestone IDs;
- direct prebuilt School counter state;
- synthetic downstream events used only for Resolver tests.

A fixture may inspire a test shape, never a canonical production ID.

## 9. One-file-one-owner parallelism

During an authoring batch:
- one owner edits a pack;
- shared ID contracts are frozen before parallel work;
- teacher pack owners do not edit milestone/public-result packs unless assigned;
- downstream career owners do not edit School-private packs;
- presentation owners do not alter gameplay mechanics.

When two features require the same public result:
- freeze the result ID/provider in the public-result pack first;
- then let downstream packs integrate independently.

## 10. Suggested package boundaries after decisions

Management/accounting:
- School provider/milestone pack;
- School public-result pack;
- Lumber downstream reaction pack;
- presentation entries;
- integrated tests.

Arcana/Forest:
- Arcana provider/milestone pack;
- School public-result pack;
- explicit Forest consumer pack/condition;
- presentation entries;
- integrated tests.

Teacher content:
- teacher pack(s);
- base lesson variants where needed;
- presentation/media mapping;
- relationship reaction content only in separately owned downstream packs.

## 11. Validation per pack

Every production pack should pass:
- schema/content validation;
- unique stable IDs;
- declared capabilities/read-write ownership;
- save/reload deterministic behavior;
- no duplicate payment/progress/publication;
- no private-state leakage;
- semantic presentation stability;
- static/text fallback where media is optional.

Cross-career packs additionally use `SCHOOL_CAREER_HOOK_VALIDATION_CHECKLIST_v1.md`.

## 12. Locked mechanics remain outside authoring layout

This layout must not fork or duplicate:
- eight course IDs;
- tuition;
- paid Energy cost;
- stat packages;
- Night-study numeric mechanics;
- typed counter ownership.

Those remain authoritative in existing School mechanics/data.

## 13. No current production edit

This document is a future layout plan.

It does not:
- create any production pack;
- rename any existing pack;
- alter bootstrap inclusion;
- move current files;
- choose teacher/milestone/public-result IDs.
