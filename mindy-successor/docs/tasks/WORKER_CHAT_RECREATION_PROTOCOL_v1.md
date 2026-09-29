# Worker Chat Recreation Protocol v1

Status: ACTIVE COORDINATION PROTOCOL
Owner: Chat 1 / Lead
Repository: `Plegyer/Text`

## Purpose

Five worker chats are execution surfaces. Git is the durable coordination memory and the only detailed reporting channel.

The active workers are:
1. Chat 1 Developer / Integration Developer.
2. Chat 2 / Presentation & Media Worker.
3. Chat 3 / Forest + Poverty Content Bundles Worker.
4. Chat 4 / QA + Product Acceptance Gate.
5. Chat 5 / School + Text Localization Content Worker.

Chat 1 / Lead remains the only coordinator, integration-order owner, archivist and merge-decision owner.

## Recreating a deleted worker chat

A recreated worker must begin by reading, from current `main`:
1. its `CHAT*_MANDATORY_ROLE_PROMPT.md`;
2. its `CURRENT_CHAT*_TASK_POINTER.md`;
3. `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`;
4. `CANDIDATE_QA_FREEZE_PROTOCOL.md`;
5. the exact active queue named by its pointer.

Old chat prose is historical. Existing Git branches, PRs, merged work and exact task handoffs must be inspected before starting.

Do not restart a delivered or already-open candidate task.

## Queue depth

Each active worker receives up to 12 useful outstanding tasks when practical.

A 12-deep queue is not permission to invent filler work. Tasks with unmet dependencies remain queued but blocked; the worker proceeds to another independent allowed item if one exists.

The worker must not self-assign task 13 or broaden scope. Lead replenishes the queue in Git.

## Role isolation

One active owner per file/slice. A worker must not edit another worker's owned system merely to unblock itself.

If a task requires another role:
- record the exact dependency in Git;
- continue another independent assigned task;
- do not produce a long chat explanation.

## Detailed evidence lives in Git

For each completed task, put all technical evidence in the branch/PR/handoff as appropriate:
- task ID and scope;
- exact commit/head;
- files changed;
- checks and results;
- blockers/dependencies;
- selective-integration notes.

Do not paste those details into the personal chat unless Leader explicitly asks for them.

## Mandatory chat output

After completing one assigned task, the worker writes only:

`Задание выполнено`

Then immediately re-read the current pointer/queue in `main` and continue the next assigned, unblocked task without waiting for confirmation.

If there are no further assigned, unblocked tasks, write only:

`Задания выполнены`

No summaries, status tables, explanations, SHA lists or long reports in personal chat unless Leader explicitly requests them.

## Delivery states

A branch alone is not delivery.

Delivery states remain:
- draft branch;
- candidate PR + frozen exact head;
- QA accepted candidate;
- merged main.

## Durable handoff

Any candidate PR must include or reference a concise Git handoff containing:
- scope;
- current-main baseline;
- exact identities consumed;
- exact files;
- checks;
- open decisions not invented by the worker;
- selective integration notes where relevant.

Lead archives final truth in merged main and current task pointers.
