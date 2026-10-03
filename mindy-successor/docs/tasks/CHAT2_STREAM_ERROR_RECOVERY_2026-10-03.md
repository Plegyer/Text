# Chat 2 context-loss recovery — 2026-10-03

Git is the source of truth.

## Current state

Strong Meta current-main assembly is COMPLETE and frozen.

Branch:
`chat2/assembly-strong-meta-current-main-20261003-v1`

Frozen head:
`22ea03a5028d8c5c1818f802f836f67b2b640fdb`

PR:
#277

QA:
- focused #1154: SUCCESS;
- schema6 fixture-repair QA #1156: SUCCESS;
- full CI #1157 on exact frozen head: SUCCESS.

Do not restart the assembly.
Do not rerun unchanged head.
Do not modify the frozen head.
Do not merge main.

## Recovery steps for a new Chat 2 context

Read in order:

1. `mindy-successor/docs/tasks/CHAT2_STREAM_ERROR_RECOVERY_2026-10-03.md`
2. `mindy-successor/docs/tasks/CURRENT_CHAT2_TASK_POINTER.md`
3. `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`

Then requery:
- branch `chat2/assembly-strong-meta-current-main-20261003-v1`;
- PR #277;
- workflow run #1157.

If branch head is still
`22ea03a5028d8c5c1818f802f836f67b2b640fdb`
and #1157 is still SUCCESS, treat it as frozen and complete.

If the branch somehow moved after that SHA, inspect the delta before acting and do not discard newer commits.

## What is complete

The assembly safely lands the frozen Strong Meta v7 semantics on current-main structure:
- schema6;
- Strong Meta registry/runtime;
- 0..1 Keystone + 0..2 Specialists;
- cap-200 as a normal Specialist;
- Hard Work packages outside slot capacity;
- run-local resolved snapshot;
- D30/D32 reward runtime support;
- D23 run-local Palace qualification preserved;
- no permanent Palace unlock;
- no legacy `ensurePalaceUnlock(s.meta)`;
- D31 preserved.

The full-CI repair updated stale schema5/hand-built test fixtures only and did not weaken runtime invariants.

## Required handoff after recovery

Do not continue production.

Report to Leader exactly:

`READY_FOR_LEADER_MERGE`

Branch:
`chat2/assembly-strong-meta-current-main-20261003-v1`

Frozen SHA:
`22ea03a5028d8c5c1818f802f836f67b2b640fdb`

PR:
#277

QA:
- #1154 SUCCESS
- #1156 SUCCESS
- #1157 SUCCESS

Then wait for the next Leader assignment.
