# Team Topology Reset — 2026-10-02

This document is the durable authority for the worker reset requested by the user.

## Active team

- Leader 1 — sole project leader, final scope/QA/merge authority.
- Chat 2 — Integration / Assembly + Technical QA.
- Chat 3 — Full-Career Producer A.
- Chat 4 — Full-Career Producer B.
- Chat 5 — Full-Career Producer C.
- Chat 6 — Full-Career Producer D.

Worker Chat 1 is retired.

## Why

The prior model split each profession across runtime, presentation, authored-content and School lanes. That produced cross-chat coupling, multiple sibling PRs per profession and expensive integration/CI coordination.

The reset changes the unit of ownership from **technical layer** to **whole profession**.

## Non-destructive reset

This is an organizational reset, not a history deletion:
- old branches and PRs remain;
- frozen/accepted candidates remain valid evidence;
- not-started old queues are superseded;
- old chat transcripts do not grant current ownership.

## CI model

GitHub remains source of truth.
Self-hosted Windows runners are interchangeable compute machines.
Full CI is reserved for executable product changes/candidate heads and exact-main verification; coordination docs/pointers do not consume a full product run.

## First transition package

Artist #229/#237 already have executable exact-head SUCCESS and move to new Chat 2 for technical QA/integration.
Chats 3..6 intentionally start unassigned until Leader 1 performs a fresh Git audit and issues four non-overlapping profession assignments.
