# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — D42 FINAL TWO-TEST REPAIR**
Owner: Chat 2 / sole current-main assembly + full-CI lane

Current assembly branch:
`chat2/assembly-d42-night-current-main-20261004-v1`

Authoritative production head under repair:
`8e3f854a2607d103d1b22bd5da564089efedfc15`

Leader hold commits after it are coordination only.

Authoritative final triage:
`chat4/d42-postrepair-failure-triage-v22@339edc2b9da00332782df8b7b29f722fdd00a192`

Verdict:
- only 2 failures remain;
- both are stale Guard test assertions;
- production D42 behavior/content/presentation is correct;
- **zero production changes are needed**.

Required repair:
1. in `tests/guard-presentation-v16-c2-169-179.test.ts`
   - keep total Guard source-domain expected set at 29;
   - restore old generic `job/guard/event/*` namespace count to 28;
   - explicitly acknowledge `night/guard/guard-night-case-debrief` as the 29th Guard-source presentation outside the generic job namespace.
2. in `tests/guard-production-presentation-reachability-c2-180.test.ts`
   - keep total Guard source-domain expected set at 29;
   - generic `job/guard/event/*` count remains 28;
   - explicitly assert the D42 Night presentation ID exists in the expected set.

Do not change production files.

Then:
- run both Guard suites;
- run D42 Night focused suite;
- run presentation/source-integrity focused checks;
- run typecheck / validate / build;
- run one full CI.

If full CI is green:
freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

Do not merge main.
