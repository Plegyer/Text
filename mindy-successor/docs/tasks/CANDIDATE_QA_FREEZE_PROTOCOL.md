# Candidate / QA Freeze Protocol

Status: ACTIVE PROJECT PROTOCOL
Repository: `Plegyer/Text`
Applies to: Lead, Chat 1 Developer, Chat 2, Chat 3, Chat 4, Chat 5 and any future worker that opens a PR.

## Purpose

Prevent workers and QA from chasing a moving PR head and prevent repeated rebases caused only by unrelated `main` documentation/task-pointer commits.

## State machine

A candidate moves through:

`WORKING -> PR_OPEN -> CANDIDATE_FROZEN -> QA -> ACCEPTED`

If QA or required CI finds a blocker:

`QA -> BLOCKED -> AUTHOR_FIX -> CANDIDATE_FROZEN(new SHA) -> QA_RESTART`

## Producer rules

Before handoff to QA, the producer may update the branch normally.

Once the exact PR head SHA is handed to Chat 4:
- the candidate head is **FROZEN**;
- do not rebase or force-push merely because `main` advanced with unrelated role/task/docs commits;
- do not make cleanup, formatting or opportunistic changes;
- push again only for a concrete QA/CI blocker or explicit Lead request;
- after any push, report the new exact head SHA and reason;
- every head change invalidates previous exact-head QA/CI evidence.

Base drift alone is not permission to rebase. Rebase only when:
- Git reports an actual merge conflict;
- the candidate overlaps materially with newly merged production files;
- or Lead explicitly requests it.

## QA rules

Chat 4 audits one frozen exact head at a time.

If the candidate head changes during QA:
- stop using the old result;
- do **not** continuously chase successive heads;
- mark the candidate `UNSTABLE / QA PAUSED`;
- wait for the producer or Lead to declare one new frozen exact head;
- restart exact-head CI/diff checks only once that head is frozen.

A head movement caused by an approved blocker fix is allowed, but requires a full exact-head re-gate.

## Main movement

Unrelated `main` changes under `mindy-successor/docs/tasks/` or coordination-only documentation do not by themselves require candidate rebasing.

QA still checks current mergeability and semantic overlap against current `main`.

## Ownership

QA reviewing a producer PR is not duplicate implementation.

However:
- producer changes content/code;
- QA verifies it;
- QA must not independently implement the same slice while the producer owns the blocker;
- if QA writes a fix, Lead must explicitly transfer that narrow fix ownership first.

## Gate

A candidate is merge-ready only when:
- the PR head is frozen;
- required CI/checks are green on that exact head;
- QA has completed against the same exact head;
- no unresolved material base conflict exists.
