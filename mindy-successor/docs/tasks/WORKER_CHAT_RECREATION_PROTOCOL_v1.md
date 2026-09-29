# Worker Chat Recreation Protocol v1

Status: ACTIVE COORDINATION PROTOCOL
Owner: Chat 1 / Lead
Repository: `Plegyer/Text`

## Purpose

Five worker chats are disposable execution surfaces. Git is the durable coordination memory.

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

The worker must not self-assign task 13 or broaden scope. Lead replenishes the queue.

## Role isolation

One active owner per file/slice. A worker must not edit another worker's owned system merely to unblock itself.

If a task requires another role:
- record the exact dependency;
- continue another independent task;
- report the blocker to Lead.

## Mandatory report to Lead

After every completed queue item, and immediately on any blocker, report:
- worker/chat;
- queue item ID;
- branch;
- exact commit SHA;
- PR number if any;
- exact files changed;
- checks actually run and exact result;
- gameplay/content result;
- remaining blocker or dependency;
- next queue item selected.

Never report a branch as delivered. Delivery states are:
- draft branch;
- candidate PR + frozen exact head;
- QA accepted candidate;
- merged main.

## Durable handoff

Any candidate PR must include or reference a concise handoff containing:
- scope;
- current-main baseline;
- exact identities consumed;
- exact files;
- checks;
- open decisions not invented by the worker;
- selective integration notes where relevant.

Lead archives final truth in merged main and current task pointers.
