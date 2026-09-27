# Stale Worker Selective-Copy Checklist v2

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Specialized integration procedure for long-lived worker branches roughly 75+ commits behind current main.

Default rule:
DO NOT MERGE THE BRANCH WHOLESALE.

Use exact deliverable-file selective copy or re-author the files on a fresh current-main branch.

## 1. Record divergence

Before integration record:
- worker branch;
- worker head;
- current main;
- merge base;
- ahead count;
- behind count;
- task file and queue items.

If behind is large enough that multiple runtime/content milestones landed after the merge base, treat every assumption as potentially stale.

## 2. Identify exact deliverables

Build an item-to-file manifest.

For every queue item:
- required path;
- optional path;
- observed path;
- worker commit;
- status.

Copy only the files required by the reviewed integration bundle.

Do not copy unrelated historical worker artifacts.

## 3. Never bulk-merge long-lived prep branches

For branches about 75+ commits behind:
- no full branch merge;
- no “merge because Git has no conflict” shortcut;
- no wholesale cherry-pick range.

Preferred:
1. fresh Lead branch from current main;
2. copy/recreate exact reviewed files;
3. validate on current code;
4. exact-head CI;
5. merge only that fresh integration branch.

## 4. Inspect dependency assumptions

For each selected file list dependencies on:
- engine commands;
- schema fields;
- condition/effect kinds;
- content IDs;
- presentation IDs;
- media IDs;
- helper/test APIs.

Confirm every dependency exists on current main.

## 5. Compare current APIs

Reject or update stale assumptions involving:
- removed/renamed commands;
- old schema defaults;
- obsolete capability ownership;
- old Activity route behavior;
- legacy School action paths;
- old presentation-ID rules;
- outdated ending transaction behavior.

## 6. Compare semantic IDs

Before copying content:
- list pack IDs;
- event IDs;
- presentation IDs;
- item/capability IDs;
- career/relationship IDs.

Check them against current main for:
- duplicate IDs;
- namespace collision;
- changed canonical identity;
- new production package already owning the same semantic slot.

## 7. Check namespace ownership

Every copied pack/event must stay inside its current accepted namespace.

Do not introduce:
- ordinary poverty IDs under Secret Debt;
- School IDs under Lumber;
- worker fixture IDs into production namespaces.

Run catalog validation after copy.

## 8. Preserve worker provenance

For every selectively copied artifact record:
- original branch;
- original worker commit;
- original task item;
- any modifications made during current-main adaptation.

This preserves authorship/history without carrying stale branch history.

## 9. Recreate when safer than copy

Prefer re-authoring on current main when:
- file format changed;
- imports/helpers changed substantially;
- current production already contains a stronger equivalent;
- stale test expectations would need many edits;
- old fixture embeds obsolete IDs.

## 10. Review Product decisions again

A stale worker branch may predate a lock or later decision.

Before integration check:
- current locked decisions;
- current human-decision packet;
- current authority/index;
- current project handoff.

Do not grandfather old assumptions.

## 11. Keep tuning non-locked

If a worker content pack labels numbers as INITIAL_TUNING:
- preserve that label;
- avoid exact-value regression assertions unless structurally required;
- do not convert worker examples into Product locks during copy.

## 12. Preserve natural-path evidence

If the worker claims natural reachability:
- ensure the current-main path still exists;
- run the test on current main;
- do not replace it with direct state injection to make stale tests pass.

## 13. Revalidate save/reload

Every copied stateful test/content package must be checked against current:
- save schema;
- parser defaults;
- pending-scene representation;
- Activity/Night/ending state;
- exactly-once semantics.

## 14. Presentation revalidation

For copied presentation material:
- semantic IDs still valid;
- fallback IDs still exist;
- media paths still ship;
- no GIF timing dependency;
- optional media remains optional.

## 15. Fixture separation

Before integration search selected files for:
- fixture IDs;
- synthetic facts;
- direct counter setup;
- temporary capabilities;
- direct ending state.

Keep those clearly test-only.

Never copy a fixture-only authoring file into shipped catalog inclusion by accident.

## 16. Test-only file review

For each copied test:
- imports compile on current main;
- helper APIs current;
- expected IDs current;
- negative assertions still valid;
- test is not redundant with a stronger current-main test.

## 17. Production content review

For each copied production pack:
- schema validates;
- capabilities declared;
- conditions/effects supported;
- free/safe exits satisfy loader rules;
- no cross-domain private-state access;
- explicit inclusion plan known.

## 18. Exact-head CI

After selective copy onto fresh main:
- npm ci;
- npm run check;
- targeted tests;
- record exact test count;
- require GitHub Actions success on exact integration head.

Worker-side old CI does not prove fresh-main integration.

## 19. Post-merge push CI

For production/runtime/content integration:
- record merge SHA;
- verify main push workflow;
- keep post-merge count/result where available.

## 20. Selective-copy disposition

Use one:
- COPY_AS_IS_AFTER_VALIDATION
- COPY_WITH_CURRENT_MAIN_ADAPTATION
- REAUTHOR_ON_CURRENT_MAIN
- KEEP_AS_EVIDENCE_ONLY
- SUPERSEDED_DO_NOT_COPY

## 21. Current Chat3 example

chat3/lumber-production-proof-next is about 80 commits behind current main.

Its ordinary-poverty packs are candidates for selective copy because:
- they use current generic Night/event primitives;
- worker docs correctly request selective integration;
- no shared runtime edit is required.

They still require current-main validation and CI.

## 22. Current Chat5 example

chat5/school-pa-gate-next is also about 80 commits behind.

Teacher/text/presentation authoring should be selective-copy only.

A documentation counter-ownership error found by Chat4 must be corrected before that audit is promoted.

## Required handoff block

For every stale-worker integration record:

Worker branch:
Worker head:
Current main:
Behind/ahead:
Selected files:
Original item/commit:
Current-main adaptations:
Locked-decision review:
Namespace review:
Targeted tests:
Full check:
Exact-head CI:
Merge SHA:
Post-merge CI:
Superseded worker files:
Evidence-only files:

No production runtime/UI/content file was modified by Chat 4.
