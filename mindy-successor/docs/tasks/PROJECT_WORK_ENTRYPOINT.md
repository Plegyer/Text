# Project Work Entry Point

Status: ACTIVE
Repository: `Plegyer/Text`

## Source of truth

For active coordination use, in order:

1. `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
2. `CURRENT_CHAT1_DEVELOPER_TASK_POINTER.md`
3. `CURRENT_CHAT2_TASK_POINTER.md`
4. `CURRENT_CHAT3_TASK_POINTER.md`
5. `CURRENT_CHAT4_TASK_POINTER.md`
6. `CURRENT_CHAT5_TASK_POINTER.md`
7. current `main` code/tests and merged PR history

## Historical documents

The following types of documents are historical context only unless referenced by an active task pointer:

- old status snapshots;
- superseded parallel work boards;
- old M3.2 planning notes;
- completed handoff documents from merged slices.

Historical documents must not override current ownership or active task pointers.

## Current priorities

Priority order:

1. playable gameplay loops and player-facing systems;
2. professions with stages and outcomes;
3. School milestones affecting career progression;
4. expedition challenges with meaningful outcomes;
5. localization and presentation improvements in parallel;
6. cleanup/documentation only when it removes an active blocker.

## Work packaging rule

Small related edits should be grouped into a single implementation package with:

- clear input files;
- allowed output files;
- gameplay result or acceptance condition;
- required verification.

Do not split trivial text-only corrections into artificial task counts.

## Integration rule

Existing branches, merged PRs and handoffs must be inspected before creating new work. Do not restart completed queues.
