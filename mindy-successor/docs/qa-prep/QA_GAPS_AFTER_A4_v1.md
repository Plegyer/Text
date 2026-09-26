# QA Gaps After A4 v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Audit base: 42de07be793d0f5ef0b59ea2c8acf9f0c4c80125

## Scope rule

This document lists only gaps supported by the repository state inspected on the audit base. A “gap” here may be an intentionally pending package or missing acceptance evidence; it is not automatically an implementation bug. Locked product decisions are treated as test or implementation targets, not reopened for redesign.

A1–A4 are recorded as implemented/green in the repository and have focused tests. The next architecture package on the base is A5. Separate active A5 branches exist in the repository, but their unmerged work is outside this audit base and is not used to upgrade any status here.

## Architecture gaps

### A5 Activity Envelope is not part of the audit base

The full architecture gate requires a resumable versioned Activity envelope, but no A5 implementation package or integrated Activity acceptance tests exist on this base. Therefore the following remain pending rather than failed:

- one-time 2-Energy Activity entry cost;
- separation of daily Energy from Activity-internal endurance/moves/HP;
- persisted activityId, definitionVersion, checkpoint/internal state and Activity RNG;
- save/reload inside Activity;
- distinct success/escape typed results;
- Activity exit result feeding Event Resolver without another ordinary action;
- adapter validation of unknown results and adapter-version migration.

These are the highest-risk A5 areas because they combine a committed cost, resumable nested state and a cross-system Resolver boundary.

### A6 RunResult / Meta exactly-once is not part of the audit base

No A6 package/integrated implementation is present on the audit base. Existing legacy ending tests demonstrate compatibility behavior only and must not be treated as proof of the target completion contract.

Still pending:

- eligibility while run remains active;
- explicit ending commitment;
- central completion producing a stable RunResult/result identity;
- exactly-once Meta application proof;
- reload after commitment before completion/reward;
- reload after reward before New Run;
- New Run preserving Meta while resetting Run domains;
- visible Meta effect in the next run.

The highest-risk A6 boundary is commit -> completion -> RunResult -> Meta applied -> New Run, especially reloads between each pair of stages.

### Focused architecture acceptance coverage still missing after A4

The following requirements are not A5/A6 implementation work, but no sufficiently direct focused acceptance test was found:

- legacy progression flag -> typed target fact migration fixture;
- full simultaneous priority matrix covering terminal, forced, critical progression and optional candidates;
- direct least-recently-shown resolver tie-break test;
- orphan/unreachable state-machine stage validation;
- explicit forged arbitrary save-path write rejection test;
- migration alias collision rejection;
- removed/renamed content-ID migration behavior across contentVersion;
- focused Work cost/wage exactly-once test across save/reload.

These should be treated as acceptance-evidence gaps. Do not label them runtime defects unless a test is added and actually fails.

## Product/content gaps on the audit base

The Architecture Slice intentionally used synthetic content. Passing A1–A4 therefore does not prove the Product Acceptance Slice.

The integrated A4-era base does not yet provide repository evidence for the complete product path requiring:

- Lumber as a full target career with its required cross-system depth;
- Satyr Maid and Undead Farm as the other visible Day-1 target career alternatives;
- Foreman as a production relationship that starts through Work, has an optional night beat, reacts to an external fact, and supports a professional non-romance route;
- School with a track, teacher/presentation, progress and a milestone/public fact that affects Lumber;
- Forest Activity with 3 route contexts, separate internal resource, 3 challenge families, season difference, save/resume and success/escape difference;
- a work tool, route item and Activity extraction/tool capability that changes available actions rather than only numbers;
- simultaneous Lumber Hard Work + one complex Lumber ending;
- a central A6 completion flow and visible next-run Meta effect;
- product media for ordinary shift, milestone, relationship, Activity and ending.

The existing M3.2 Lumber chain, seasonal scenes and legacy endings remain useful regression material, but they are not substitutes for those target product requirements.

## Presentation/media QA gaps

Current source evidence provides a generic missing-media placeholder and an image/GIF onerror fallback. However:

- no focused automated regression test was found for a missing packaged GIF;
- no focused automated regression test was found for the generic no-media placeholder;
- the A4-era source review did not show a matching video.onerror fallback;
- the full Product Acceptance media set is not yet integrated on the audit base.

These are coverage/product-integration gaps. The Windows release checklist contains explicit installed-build tests for them.

## Save/migration QA gaps

Strong existing evidence covers schema-3 migration, pending variant/RNG preservation, protected Meta merge, invalid future schema and machine ID/stage validation. Still missing as focused fixtures:

- paid Work before/after checkpoint exact-once;
- removed event/stage/item content-ID migration across a changed contentVersion;
- migration alias collision;
- future Activity definition-version migration;
- A6 committed/rewarded RunResult checkpoints.

The adversarial matrix in SAVE_RELOAD_ADVERSARIAL_MATRIX_v1.md defines the required procedure for each.

## Windows/release verification gap

The prototype README/STATUS documents how to run npm run dist:win but explicitly notes that the Windows installer was not verified in the earlier environment. Repository configuration proves that an NSIS x64 build is intended; it does not prove clean-machine installation or launch.

Still required before release acceptance:

- build npm run dist:win on the release candidate;
- install generated NSIS package;
- run on a clean Windows x64 machine without Node/npm/repository;
- verify userData save persistence and backup recovery;
- verify packaged GIF/media paths and missing-media fallback;
- verify no source/development-path dependency;
- execute a representative Product Acceptance smoke on the installed build.

See WINDOWS_RELEASE_CHECKLIST_v1.md.

## What is already strong after A4

The following areas have concrete focused evidence and should not be reopened as design questions merely because later packages remain pending:

- schema-v4 authoritative state ownership and locked 160-day calendar;
- deterministic supported migration of safe legacy fields, pending variant/RNG and protected Meta;
- typed Condition/Effect domains, named transitions and capability enforcement;
- transactional rollback on invalid target transitions;
- cross-system School -> Career -> Quest Resolver cascade;
- persisted Resolver reaction epochs, optional/latched/scheduled behavior, pending choice snapshots and cascade cap;
- resumable NightFlow, exactly-once lodging payment/calendar advance, forced intercepts and next-day modifiers;
- storage-level serialized atomic writes with backup fallback.

Future QA should extend these mechanisms into A5/A6 and the product slice rather than replacing them with new parallel ownership models.

## Priority for the Lead

1. Integrate A5 and execute Activity save/reload + result-boundary adversarial cases first.
2. Integrate A6 and execute every commitment/completion/reward reload boundary before product content scaling.
3. Close the small architecture-evidence gaps listed above with focused tests.
4. Integrate the Lumber Product Acceptance content and run the exact execution plan.
5. Build/install the Windows candidate and execute the clean-machine checklist.

No item in this list changes a locked product decision; it only identifies missing implementation or acceptance evidence on the audited base.
