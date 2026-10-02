# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — VOLUNTARY PROSTITUTE / PREPARE READY_FOR_CHAT2**
Owner: Chat 4 / Full-Career Producer B
Branch: `chat4/prostitute-complete-reset-v1`
Current observed head before this coordination change: `8f06e840adcb92a379bcff5179bae54b1c4062e5`
Producer PR: #251

## Assignment

Finish the **voluntary Prostitute / Professional** ordinary career as one whole production slice under:
- `CAREER_PROSTITUTE_DRAFT_v0.md`;
- `USER_DECISIONS_LOCKED_v1.md`;
- current shipped main facts.

Historical Prostitute prep PRs #245/#240/#243/#239 are source-only.

## CI correction

Do **not** trigger more producer full-CI runs.

This branch already generated a sequence of full checks while still changing:
- #1090/#1092 failures;
- several cancelled stale attempts;
- #1096 SUCCESS on earlier head `1c640ff4de25f3739b33fc8f2e477a68688c0119`;
- #1103 is the final already-running producer CI at the time this rule was introduced.

Let #1103 finish; do not create another producer-triggered full run afterward.

After #1103:
- read the complete result once;
- if it fails, fix all known failures together without self-triggering another full run;
- if it succeeds, treat that as useful evidence, but still freeze the final producer SHA and hand it to Chat 2 because current-main collision/integration QA remains required.

When the profession is genuinely complete:
- freeze exact SHA;
- report `READY_FOR_CHAT2`;
- stop pushing until Chat 2 takes the single CI slot.

Chat 2 owns the next integration/full-CI gate.
