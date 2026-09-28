# Current Chat 1 Developer task pointer

Status: **CANDIDATE_FROZEN / QA_PENDING**
Owner: Chat 1 Developer / Integration Developer
Role contract: `mindy-successor/docs/tasks/CHAT1_DEVELOPER_MANDATORY_ROLE_PROMPT.md`
Freeze protocol: `mindy-successor/docs/tasks/CANDIDATE_QA_FREEZE_PROTOCOL.md`

## Active production candidate

Foreman semantic localization is complete as a candidate and is now frozen for QA.

Only active PR for this slice:
- PR **#65**
- branch: `chat1-dev/foreman-semantic-localization-v3`
- frozen exact head: `85076aa452ac624340406503b2b6ecf551c72e87`
- changed files: 4
- required workflow run: `36422933185`
- repository `mindy-successor check`: PASS on the frozen head

Historical PR #63 is closed as a superseded duplicate and must not be reopened unless Lead explicitly requests it.

## Ownership lock

Do not create another Foreman semantic-localization PR.
Do not rebase/force-push PR #65 because coordination/task documentation advanced on `main`.
Do not make cleanup or opportunistic edits while QA is active.

A new head is allowed only for:
- a concrete Chat 4 QA blocker;
- a required CI blocker;
- explicit Lead request.

If any of those occurs:
1. fix only the blocker;
2. report the new exact head SHA;
3. freeze the candidate again;
4. require full exact-head QA re-gate.

Until then, wait for Chat 4 / Lead.
