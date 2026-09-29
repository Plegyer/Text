# Lead integration handoff — PRs #79 and #82

Status: INTEGRATION CANDIDATE

Current integration intent:
- preserve merged PR #84 Lumber/poverty integration;
- preserve merged PR #85 repaired School content/handoff;
- selectively integrate QA-accepted Chat 2 PR #79;
- selectively integrate QA-accepted Chat 3 PR #82.

Source frozen heads:
- Chat 2 PR #79: `fefdcb8337923e6d1407cdcc1674303abf2fe640`;
- Chat 3 PR #82: `b12667b1cb8453e13e3406f3fe9d589475f28c6f`.

Shared files were merged onto current-main content rather than replaced wholesale.

Candidate-only Chat 3 ownership-baseline regression artifacts are intentionally excluded from main integration because their fixed worker-baseline fingerprints are not valid after legitimate Lead/Chat 2 integration changes.

No School provider/threshold, Lumber intermediate threshold, Save/RNG architecture or new gameplay identity is introduced here.

Required acceptance:
- exact PR head must pass the repository `mindy-successor check` against the latest main merge ref before Lead merge.
